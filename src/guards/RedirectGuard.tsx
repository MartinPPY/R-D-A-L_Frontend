import { useAuth } from "@/context/AuthContext"
import { Navigate } from "react-router-dom"

export const RedirectGuard = () => {
    const { rol,loading } = useAuth()

    if(loading) return <div>Cargando...</div>

    if(rol === "usuario") return <Navigate to="/home" />
    if(rol === "moderador") return <Navigate to="/admin" />
    if(!rol) return <Navigate to="/login" />

}
