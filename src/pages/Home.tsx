import { UserFormSection } from "@/components/UserFormSection"
import { Activity } from "@/features/activities/components"
import { ResumenMensual } from "@/features/resumen/components/ResumenMensual"
import { UserLayout } from "@/layouts/UserLayout"
//import { CirclePlus, Clock,Home as HomeIcon } from "lucide-react"

interface Menu {
  title: string;
  icon: React.ReactNode;
}

export const Home = () => {  

  const menus: Menu[] = [
    /*{title:"Inicio",icon:<HomeIcon />},
    {title:"Registrar una actividad",icon:<CirclePlus />},
    {title:"Ver mis horas de trabajo",icon:<Clock />},*/
  ]

  return (
    <UserLayout menus={menus} title="R-D-A-L">
      <div className="flex flex-col gap-20 p-4">
        <ResumenMensual/>
        <UserFormSection />
        <Activity />
      </div>
    </UserLayout>
  )
}
