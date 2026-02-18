import type { FieldErrors, UseFormRegister } from "react-hook-form"
import { Input, Label } from "../ui"
import type { FormValues } from "@/models"

interface Props {
    register: UseFormRegister<FormValues>;
    errors: FieldErrors<FormValues>;
}


export const HorasFieldForm = ({ register, errors }: Props) => {
    return (
        <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
            <div className="flex flex-col gap-2">
                <Label>Hora de inicio: </Label>
                <Input type="time" {...register("startTime", { required: "La hora de inicio es requerida" })} />
                {errors.startTime && <p className="text-red-500">{errors.startTime.message}</p>}
            </div>
            <div className="flex flex-col gap-2">
                <Label>Hora de fin: </Label>
                <Input type="time" {...register("endTime", { required: "La hora de fin es requerida" })} />
                {errors.endTime && <p className="text-red-500">{errors.endTime.message}</p>}
            </div>
        </div>
    )
}
