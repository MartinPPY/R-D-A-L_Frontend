import { CalendarIcon } from "lucide-react"
import { Button } from "./ui/button"
import { Calendar } from "./ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Label } from "./ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Input } from "./ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select"


export const UserFormSection = () => {
    return (
        <div className="px-12">
            <form>
                <Card>
                    <CardHeader>
                        <CardTitle>Formulario de horas</CardTitle>
                        <CardDescription>Formulario para registrar horas</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <Label> Fecha de actividad: </Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="data-[empty=true]:text-muted-foreground w-full justify-start text-left font-normal"
                                    >
                                        <CalendarIcon />
                                        <span>Indica una fecha</span>
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar mode="single" />
                                </PopoverContent>
                            </Popover>
                        </div>

                        <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
                            <div className="flex flex-col gap-2">
                                <Label>Hora de inicio: </Label>
                                <Input type="time" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label>Hora de fin: </Label>
                                <Input type="time" />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label> Area de trabajo: </Label>
                            <Select>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Theme" />
                                </SelectTrigger>
                                <SelectContent >
                                    <SelectGroup>
                                        <SelectItem value="light">Light</SelectItem>
                                        <SelectItem value="dark">Dark</SelectItem>
                                        <SelectItem value="system">System</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        <Button>Registrar</Button>

                    </CardContent>
                </Card>
            </form>
        </div>
    )
}
