import { AdminActivityTable } from "@/components/AdminActivityTable";
import { AdminCardSection } from "@/components/AdminCardSection";
import { AdminPagosTable } from "@/components/AdminPagosTable";
import { UserLayout } from "@/layouts/UserLayout"
import { getActivities } from "@/services/actividadService";
import { getResumenMensualAdmin } from "@/services/resumenService";
import { BookOpen, CreditCard, Home } from "lucide-react";
import { useEffect, useState } from "react";

interface Menu {
    title: string;
    icon: React.ReactNode;
}

interface Resumen {
    usuarios: number;
    cantidad_horas: number;
    cantidad_orden_compra: number;
}

interface Actividad {
    id: number;
    area: {
        id: number;
        name: string;
    };
    user: {
        id: number;
        first_name: string;
        last_name: string;
    };
    fecha: string;
    hora_inicio: string;
    hora_fin: string;
    aprobado: boolean;
}

export const Admin = () => {

    const [actividades, setActividades] = useState<Actividad[]>([])
    const [resumen, setResumen] = useState<Resumen>({
        usuarios: 0,
        cantidad_horas: 0,
        cantidad_orden_compra: 0
    })

    const title = "R-D-A-L Administracion"
    const menus: Menu[] = [
        { title: "Inicio", icon: <Home /> },
        { title: "Gestionar Actividades", icon: <BookOpen /> },
        { title: "Gestionar ordenes de pago", icon: <CreditCard /> },
    ]

    useEffect(() => {

        const fetchResumen = async () => {
            const response = await getResumenMensualAdmin()
            setResumen(response)
        }

        const fetchActividades = async () => {
            const response = await getActivities()
            setActividades(response)
        }

        fetchResumen();
        fetchActividades();

    }, [])

    return (
        <UserLayout menus={menus} title={title}>
            <div className="flex flex-col gap-20 p-4">
                <AdminCardSection resumen={resumen} />
                <AdminActivityTable actividades={actividades} setResumen={setResumen} />
                <AdminPagosTable />


            </div>
        </UserLayout>
    )
}
