import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export const ForgotPassword = () => {
    return (
        <main className="w-full h-screen flex items-center justify-center">
            <section className="w-full max-w-md p-6 space-y-8">
                <form action="">
                    <Card>
                        <CardHeader>
                            <CardTitle>Recuperar contraseña</CardTitle>
                            <CardDescription>Ingresa tu correo electrónico para recibir un enlace de recuperación</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <Label>Correo electrónico</Label>
                                <Input type="email" />
                            </div>
                        </CardContent>
                        <CardFooter className="flex gap-2">
                            <Button className="w-full" >Enviar</Button>
                        </CardFooter>
                    </Card>
                </form>
            </section>
        </main>
    )
}
