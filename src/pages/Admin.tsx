import { AdminPagosTable } from "@/components/AdminPagosTable";
import { Activity } from "@/features/activities/components";
import { ResumenMensual } from "@/features/resumen/components/ResumenMensual";
import { UserLayout } from "@/layouts/UserLayout"
import type { Menu } from "@/models";
//import { BookOpen, CreditCard, Home } from "lucide-react";

export const Admin = () => {    

    const title = "R-D-A-L Administracion"
    const menus: Menu[] = [
        /*{ title: "Inicio", icon: <Home /> },
        { title: "Gestionar Actividades", icon: <BookOpen /> },
        { title: "Gestionar ordenes de pago", icon: <CreditCard /> },*/
    ]

    return (
        <UserLayout menus={menus} title={title}>
            <div className="flex flex-col gap-20 p-4">
                <ResumenMensual/>
                <Activity/>                
                <AdminPagosTable />
            </div>
        </UserLayout>
    )
}
