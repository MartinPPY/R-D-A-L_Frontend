import { Controller, type Control, type FieldErrors } from "react-hook-form"
import { Button, Calendar, Label, Popover, PopoverContent, PopoverTrigger } from "../ui"
import { CalendarIcon } from "lucide-react"
import type { FormValues } from "@/models"
import { es } from "date-fns/locale";

interface Props{
    control:Control<FormValues>;
    errors:FieldErrors<FormValues>; 

}

export const FechaFieldForm = ({control, errors}:Props) => {
    return (
        <div className="flex flex-col gap-2">
            <Label> Fecha de actividad: </Label>
            <Controller
                name="date"
                control={control}
                rules={{ required: "La fecha es obligatoria!" }}
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
                                locale={es}
                            />
                        </PopoverContent>
                    </Popover>
                )}
            />

            {errors.date && <p className="text-red-500">{errors.date.message}</p>}

        </div>
    )
}
