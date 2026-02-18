import { useAuth } from "@/context/AuthContext"
import { Navigate, Outlet } from "react-router-dom"

export const PrivateGuard = ({rolProp}: {rolProp: string}) => {
    const { loading, authenticated, rol } = useAuth()

    if (loading) {
        return <div>Cargando...</div>
    }

    if (authenticated === false) {
        <Navigate  to="/login" />
    }

    return rol === rolProp ? <Outlet /> : <div>No tienes permiso para acceder a esta página</div>
}
