import { AdminActivityTable } from "@/components/AdminActivityTable";
import { AdminCardSection } from "@/components/AdminCardSection";
import { AdminPagosTable } from "@/components/AdminPagosTable";
import { AdminActivityDataMobile } from "@/components/mobile/AdminActivityDataMobile";
import { UserLayout } from "@/layouts/UserLayout"
import type { Menu } from "@/models";
import { getActivities } from "@/services/actividadService";
import { getResumenMensualAdmin } from "@/services/resumenService";
import { useQuery } from "@tanstack/react-query";
//import { BookOpen, CreditCard, Home } from "lucide-react";

export const Admin = () => {

    const activitiesQuery = useQuery({ queryKey: ["activities"], queryFn: getActivities })
    const resumenQuery = useQuery({ queryKey: ["resumen-admin"], queryFn: getResumenMensualAdmin })

    const title = "R-D-A-L Administracion"
    const menus: Menu[] = [
        /*{ title: "Inicio", icon: <Home /> },
        { title: "Gestionar Actividades", icon: <BookOpen /> },
        { title: "Gestionar ordenes de pago", icon: <CreditCard /> },*/
    ]

    return (
        <UserLayout menus={menus} title={title}>
            <div className="flex flex-col gap-20 p-4">
                <AdminCardSection resumen={resumenQuery.data || { usuarios: 0, cantidad_horas: 0, cantidad_orden_compra: 0 }} />
                <AdminActivityTable actividades={activitiesQuery.data || []} />
                <AdminActivityDataMobile activity={activitiesQuery.data || []} />
                <AdminPagosTable />
            </div>
        </UserLayout>
    )
}
