import { UserCardsSection } from "@/components/UserCardsSection"
import { UserFormSection } from "@/components/UserFormSection"
import { UserTable } from "@/components/UserTable"
import { UserLayout } from "@/layouts/UserLayout"
import { getActivities } from "@/services/actividadService"
import { getResumenMensualAlumno } from "@/services/resumenService"
import { CirclePlus, Clock,Home as HomeIcon } from "lucide-react"
import { useEffect, useState } from "react"

interface Activity {
  id: number;
  fecha: string;
  hora_inicio: string;
  hora_fin: string;
  area: {
    id: number,
    name: string
  };
}

interface ResumenMensual{
  horas_acumuladas:number;
  total_acumulado:number;
  horas_aprobadas:number;
}

interface Menu{
  title:string;
  icon:React.ReactNode;
}

export const Home = () => {

  const menus:Menu[] = [
    {title:"Inicio",icon:<HomeIcon />},
    {title:"Registrar una actividad",icon:<CirclePlus />},
    {title:"Ver mis horas de trabajo",icon:<Clock />},
  ]

  const [actividades, setActividades] = useState<Activity[]>([])
  const [resumen,setResumenMensual] = useState<ResumenMensual>({
    horas_acumuladas: 0,
    total_acumulado: 0,
    horas_aprobadas: 0
  })

  useEffect(() => {

    const fetchActivities = async () => {
      const response = await getActivities()
      setActividades(response)
    }

    const fetchResumen = async () => {
      const response = await getResumenMensualAlumno()
      setResumenMensual(response)
    }

    fetchActivities()
    fetchResumen()

  }, [])

  return (
    <UserLayout menus={menus} title="R-D-A-L">
      <div className="flex flex-col gap-20 p-4">
        <UserCardsSection resumen={resumen} />
        <UserFormSection setActividades={setActividades}  setResumenMensual={setResumenMensual} />    
        <UserTable actividades={actividades} />
      </div>
    </UserLayout>
  )
}
