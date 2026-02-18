import { Controller, type Control, type FieldErrors } from "react-hook-form"
import { Label, Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui"
import type { Area, FormValues } from "@/models";

interface Props{
    control:Control<FormValues>;
    errors:FieldErrors<FormValues>;
    areas:Area[];
}


export const AreaFieldForm = ({control, errors, areas}:Props) => {
    return (
        <div className="flex flex-col gap-2">
            <Label> Area de trabajo: </Label>
            <Controller
                name="area"
                control={control}
                rules={{ required: "El área de trabajo es requerida" }}
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
                                    <SelectItem key={index} value={area.id.toString()}>
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
    )
}
