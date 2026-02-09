import { CalendarIcon } from "lucide-react"
import { Button } from "./ui/button"
import { Calendar } from "./ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Label } from "./ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Input } from "./ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { useEffect, useState } from "react"
import { getAreas } from "@/services/areaService"
import { Controller, useForm } from "react-hook-form"

interface Area {
    id: number;
    name: string;
}

interface FormValues {
    date: Date;
    startTime: string;
    endTime: string;
    area: string;
}

export const UserFormSection = () => {

    const [areas, setAreas] = useState<Area[]>([])
    const { register, handleSubmit, formState: { errors }, control } = useForm<FormValues>({
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
        console.log(data)
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
                        <div className="flex flex-col gap-2">
                            <Label> Fecha de actividad: </Label>
                            <Controller
                                name="date"
                                control={control}
                                rules={{required:"La fecha es obligatoria!"}}
                                render={({ field }) => (
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className={`w-full justify-start text-left font-normal ${!field.value && "text-muted-foreground"
                                                    }`}
                                            >
                                                <CalendarIcon />
                                                {field.value
                                                    ? field.value.toLocaleDateString()
                                                    : <span>Indica una fecha</span>}
                                            </Button>
                                        </PopoverTrigger>

                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                )}
                            />

                            {errors.date && <p className="text-red-500">{errors.date.message}</p>}

                        </div>

                        <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
                            <div className="flex flex-col gap-2">
                                <Label>Hora de inicio: </Label>
                                <Input type="time" {...register("startTime",{required: "La hora de inicio es requerida"})} />
                                {errors.startTime && <p className="text-red-500">{errors.startTime.message}</p>}
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label>Hora de fin: </Label>
                                <Input type="time" {...register("endTime",{required: "La hora de fin es requerida"})} />
                                {errors.endTime && <p className="text-red-500">{errors.endTime.message}</p>}
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label> Area de trabajo: </Label>
                            <Controller
                                name="area"
                                control={control}
                                rules={{required: "El área de trabajo es requerida"}}
                                render={({ field }) => (
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Selecciona un área" />
                                        </SelectTrigger>

                                        <SelectContent>
                                            <SelectGroup>
                                                {areas.map((area, index) => (
                                                    <SelectItem key={index} value={area.name}>
                                                        {area.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.area && <p className="text-red-500">{errors.area.message}</p>}
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button>Registrar</Button>
                    </CardFooter>
                </Card>
            </form>
        </div>
    )
}
