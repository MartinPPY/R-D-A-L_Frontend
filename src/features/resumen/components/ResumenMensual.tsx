import { useAuth } from "@/context/AuthContext"
import { ResumenUser } from "./ResumenUser"
import { ResumenAdmin } from "./ResumenAdmin"


export const ResumenMensual = () => {
    const { rol } = useAuth()    

    return rol === "usuario" ? <ResumenUser /> : <ResumenAdmin/>

}
