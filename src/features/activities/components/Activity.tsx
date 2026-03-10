import { useActivities } from "../hooks/useActivities"
import { ActivityList } from "./ActivityList"
import { ActivityTable } from "./ActivityTable"
import { useState } from "react"
import { useAuth } from "@/context/AuthContext"
import { Card, CardDescription, CardHeader, CardTitle, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui"

export const Activity = () => {
    const { rol } = useAuth()
    const { data } = useActivities()
    const [statusFilter, setStatusFilter] = useState("all")

    const filteredActivities = (data || []).filter(activity => {
        if (statusFilter === "all") return true
        if (statusFilter === "approved") return activity.aprobado === true
        if (statusFilter === "pending") return activity.aprobado === false
        return true
    })

    const FilterUI = () => (
        <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Filtrar:</span>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    <SelectItem value="approved">Aprobadas</SelectItem>
                    <SelectItem value="pending">Pendientes</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )

    return (
        <div className="flex flex-col gap-6">
            <Card className="mx-4 lg:mx-12">
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>{rol === "moderador" ? "Actividades de usuarios" : "Mis actividades"} </CardTitle>
                        <CardDescription>{rol === "moderador" ? "Registro de actividades de los usuarios" : "Registro de mis actividades"}</CardDescription>
                    </div>
                    <FilterUI />
                </CardHeader>
            </Card>

            {/* Vista de desktop */}
            <div className="hidden lg:block px-12">
                <ActivityTable activities={filteredActivities} />
            </div>

            {/* Vista de mobile */}
            <div className="block lg:hidden px-4">
                <ActivityList activities={filteredActivities} />
            </div>
        </div>
    )
}
