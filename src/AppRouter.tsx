import { Route } from "react-router-dom"
import { RoutesWithNotFound } from "./components/RoutesWithNotFound"
import { Home } from "./pages/Home"
import { Login } from "./pages/Login"
import { ForgotPassword } from "./pages/ForgotPassword"
import { Admin } from "./pages/Admin"
import { PrivateGuard } from "./guards/PrivateGuard"

export const AppRouter = () => {
    return (
        <RoutesWithNotFound>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route element={<PrivateGuard rolProp="usuario" />}>
                <Route path="/home" element={<Home />} />
            </Route>
            <Route element={<PrivateGuard rolProp="moderador" />}>
                <Route path="/admin" element={<Admin />} />
            </Route>
        </RoutesWithNotFound>
    )
}
