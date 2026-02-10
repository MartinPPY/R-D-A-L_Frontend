import { UserCardsSection } from "@/components/UserCardsSection"
import { UserFormSection } from "@/components/UserFormSection"
import { UserTable } from "@/components/UserTable"
import { UserLayout } from "@/layouts/UserLayout"
import { getActivities } from "@/services/actividadService"
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


export const Home = () => {

  const [actividades, setActividades] = useState<Activity[]>([])

  useEffect(() => {

    const fetchActivities = async()=>{
      const response = await getActivities()
      setActividades(response)
    }
    fetchActivities()

  },[])

  return (
    <UserLayout>
      <div className="flex flex-col gap-20 p-4">
        <UserCardsSection />
        <UserFormSection setActividades={setActividades} />
        <UserTable actividades={actividades}/>
      </div>
    </UserLayout>
  )
}
