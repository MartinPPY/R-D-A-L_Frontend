import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Skeleton, Spinner } from "./ui"
import { AreaFieldForm, FechaFieldForm, HorasFieldForm } from "./user-form"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { createActivity, getAreas } from "@/api"
import type { FormValues, RequestBody } from "@/models"
import { parseDate } from "@/helpers"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"


export const UserFormSection = () => {

    const queryClient = useQueryClient()
    const areasQuery = useQuery({ queryKey: ["areas"], queryFn: getAreas })
    const mutation = useMutation({
        mutationFn: createActivity,
        onSuccess: async () => {
            toast.success("Actividad registrada exitosamente", { position: "top-center" })
            reset()                                                        
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: ["activities"] }),
                queryClient.invalidateQueries({ queryKey: ["resumen-usuario"] })
            ])
        },
        onError: (error:any) => {
            if(error.response.data.non_field_errors[0]){
                toast.error(error.response.data.non_field_errors[0], { position: "top-center" })
            }else{
                toast.error("Error al registrar la actividad", { position: "top-center" })
            }
        }
    })
    const { register, handleSubmit, formState: { errors }, control, reset } = useForm<FormValues>({
        defaultValues: {
            date: new Date(),
            startTime: "",
            endTime: "",
            area: ""
        }
    })
    const onSubmit = async (data: FormValues) => {

        const fecha = parseDate(data.date)
        const body: RequestBody = {
            fecha: fecha,
            hora_inicio: data.startTime,
            hora_fin: data.endTime,
            area_id: parseInt(data.area)
        }
        mutation.mutate(body)
    }

    return (
        <div className="px-12">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Card>
                    <CardHeader>
                        <CardTitle>Formulario de horas</CardTitle>
                        <CardDescription>Formulario para registrar horas</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-6">
                        <FechaFieldForm control={control} errors={errors} />
                        <HorasFieldForm register={register} errors={errors} />
                        {areasQuery.isLoading ? <Skeleton className="h-10 w-full" /> : <AreaFieldForm control={control} errors={errors} areas={areasQuery.data || []} />}
                        {areasQuery.isError && <p>Error: {areasQuery.error.message}</p>}
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" disabled={mutation.isPending}>
                            {mutation.isPending ? <> <Spinner /> Registrando... </> : "Registrar"}
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </div>
    )
}
