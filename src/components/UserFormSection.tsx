import {Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,Spinner} from "./ui"
import { toast } from "sonner"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { getAreas, createActivity, getActivities, getResumenMensualAlumno } from "@/services"
import type { Activity, Area, FormValues, RequestBody, ResumenMensualUser } from "@/models"
import { parseDate } from "@/helpers"
import { AreaFieldForm, FechaFieldForm, HorasFieldForm } from "./user-form"

interface Props {
    setActividades: React.Dispatch<React.SetStateAction<Activity[]>>;
    setResumenMensual: React.Dispatch<React.SetStateAction<ResumenMensualUser>>;
}

export const UserFormSection = ({ setActividades, setResumenMensual }: Props) => {

    const [areas, setAreas] = useState<Area[]>([])
    const [loading, setLoading] = useState(false)

    const { register, handleSubmit, formState: { errors }, control, reset } = useForm<FormValues>({
        defaultValues: {
            date: new Date(),
            startTime: "",
            endTime: "",
            area: ""
        }
    })


    useEffect(() => {

        const fetchAreas = async () => {
            const response = await getAreas()
            setAreas(response.data.areas)
        }

        fetchAreas()

    }, [])

    const onSubmit = async (data: FormValues) => {

        const fecha = parseDate(data.date)

        const body: RequestBody = {
            fecha: fecha,
            hora_inicio: data.startTime,
            hora_fin: data.endTime,
            area_id: parseInt(data.area)
        }

        try {

            setLoading(true)
            await createActivity(body)
            toast.success("Actividad registrada exitosamente", {
                duration: 3000,
                position: "top-center"
            })

            const response = await getActivities()
            setActividades(response)
            const resResumenMensual = await getResumenMensualAlumno()
            setResumenMensual(resResumenMensual)

        } catch (error: any) {

            console.error(error.response)
            toast("Error al registrar actividad", {
                position: "top-center"
            })

        } finally {
            setLoading(false)
            reset()
        }
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
                        <AreaFieldForm control={control} errors={errors} areas={areas} />

                    </CardContent>
                    <CardFooter>
                        <Button type="submit" disabled={loading}>
                            {loading ? <> <Spinner /> Registrando... </> : "Registrar"}
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </div>
    )
}
