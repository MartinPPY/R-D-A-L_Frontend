import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { /*Link ,*/useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { Spinner } from "@/components/ui/spinner"
import { Eye, EyeOff, InfoIcon } from "lucide-react"
import { getPermisos, login } from "@/services/authService"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { toast } from "sonner"
import { useMutation, useQueryClient } from "@tanstack/react-query"

interface FormValues {
    username: string
    password: string
}

export const Login = () => {

    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: (data: FormValues) => login(data.username, data.password),
        onSuccess: async () => {

            queryClient.invalidateQueries({ queryKey: ["auth-user"] })
            
            const response = await getPermisos()

            if (response.data.permisos[0][1] === "moderador") {
                navigate("/admin")
            } else {
                navigate("/home")
            }

            reset()
        },
        onError: (error) => {
            console.error(error)
            toast.error(error.message || "Ha ocurrido un error. Verifica tus credenciales", { position: "top-center" })
        }
    })

    const [showPassword, setShowPassword] = useState(false)

    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
        defaultValues: {
            username: "",
            password: ""
        }
    })

    const navigate = useNavigate()

    const onSubmit = async (data: FormValues) => {
        mutation.mutate(data)
    }


    return (
        <main className="w-full h-screen flex items-center justify-center">
            <section className="w-full max-w-md p-6 space-y-8">
                <h1 className="text-2xl font-bold text-center">Sistema de registro R-D-A-L</h1>

                <div className="mb-4 mt-4 space-y-2 text-sm bg-muted p-3 rounded-lg" >
                    <h2 className="text-lg font-semibold">Usuarios de prueba:</h2>
                    <p>Usuario: moderador.rda | Contraseña: Choco.123</p>
                    <p>Usuario: alumno.rda | Contraseña: Choco.123</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Iniciar sesión</CardTitle>
                            <CardDescription>Ingresa tus credenciales para acceder al sistema</CardDescription>
                        </CardHeader>

                        <CardContent>
                            <div className="space-y-4">
                                <Label>Nombre de usuario</Label>
                                <Input type="text" {...register("username", {
                                    required: "Este campo es requerido"
                                })} />
                                {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
                            </div>
                            <div className="space-y-4 mt-4 relative">
                                <Label>Contraseña</Label>
                                <Input type={showPassword ? "text" : "password"} {...register("password", {
                                    required: "Este campo es requerido"
                                })} className="pr-10" />

                                <button
                                    type="button"
                                    className="absolute inset-y-3 top-1/3 right-0 flex items-center px-2 text-muted-foreground hover:text-foreground"
                                    tabIndex={-1}
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff /> : <Eye />}
                                </button>
                                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                            </div>
                            {/*<div className="space-y-4 mt-4 flex justify-end">
                                <Link to={loading ? "#" : "/forgot-password"} className="text-sm text-black hover:underline" >¿Olvidaste tu contraseña?</Link>
                            </div>*/}
                        </CardContent>

                        <CardFooter className="flex gap-2">
                            <Button className="w-full" type="submit" disabled={mutation.isPending}>
                                {mutation.isPending ? <><Spinner /> Cargando...</> : "Iniciar sesión"}
                            </Button>
                        </CardFooter>
                    </Card>

                </form>

                {
                    mutation.error !== null && (
                        <Alert variant="destructive">
                            <InfoIcon />
                            <AlertTitle>Ha ocurrido un error</AlertTitle>
                            <AlertDescription>
                                {mutation.error.message}
                            </AlertDescription>
                        </Alert>
                    )
                }

            </section>
        </main>
    )
}
