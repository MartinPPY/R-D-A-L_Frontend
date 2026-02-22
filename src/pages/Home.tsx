import { UserCardsSection } from "@/components/UserCardsSection"
import { UserFormSection } from "@/components/UserFormSection"
import { UserTable } from "@/components/UserTable"
import { UserLayout } from "@/layouts/UserLayout"
import { getActivities } from "@/services/actividadService"
import { getResumenMensualAlumno } from "@/services/resumenService"
import { useQuery } from "@tanstack/react-query"
//import { CirclePlus, Clock,Home as HomeIcon } from "lucide-react"

interface Menu{
  title:string;
  icon:React.ReactNode;
}

export const Home = () => {

  const activitiesQuery = useQuery({ queryKey: ["activities"], queryFn: getActivities })
  const resumenQuery = useQuery({ queryKey: ["resumen-usuario"], queryFn: getResumenMensualAlumno })

  const menus:Menu[] = [
    /*{title:"Inicio",icon:<HomeIcon />},
    {title:"Registrar una actividad",icon:<CirclePlus />},
    {title:"Ver mis horas de trabajo",icon:<Clock />},*/
  ]

  return (
    <UserLayout menus={menus} title="R-D-A-L">
      <div className="flex flex-col gap-20 p-4">
        <UserCardsSection resumen={resumenQuery.data || { horas_acumuladas: 0, total_acumulado: 0, horas_aprobadas: 0 }} />
        <UserFormSection />    
        <UserTable actividades={activitiesQuery.data || []} />
      </div>
    </UserLayout>
  )
}
