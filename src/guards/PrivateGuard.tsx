import { useAuth } from "@/context/AuthContext"
import { Outlet } from "react-router-dom"

export const PrivateGuard = ({rolProp}: {rolProp: string}) => {
    const { loading, authenticated, rol } = useAuth()

    if (loading) {
        return <div>Cargando...</div>
    }

    if (!authenticated) {
        return <div>No autenticado</div>
    }

    return rol === rolProp ? <Outlet /> : <div>No tienes permiso para acceder a esta página</div>
}
