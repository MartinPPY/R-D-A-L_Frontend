import { getPermisos, verifyAuth } from "@/services/authService";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, type ReactNode } from "react";

interface Props {
    children: ReactNode
}

interface User {
    user: string;
}

interface AuthContextType {
    authenticated: boolean;
    loading: boolean;
    user: User | null;
    rol: string;
    //setAuthenticated: (authenticated: boolean) => void;
    //setRol: (rol: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export const AuthProvider = ({ children }: Props) => {

    const { data, isLoading } = useQuery({
        queryKey: ["auth-user"],
        queryFn: async () => {
            try {
                const authResponse = await verifyAuth();

                if (!authResponse) return null;

                // Solo si hay auth, buscamos los permisos (en paralelo o secuencia)
                const rolResponse = await getPermisos();

                return {
                    user: authResponse.user,
                    rol: rolResponse.data.permisos[0][1],
                    authenticated: true
                };
            } catch (error) {
                // Si falla cualquier llamada, devolvemos null (no autenticado)
                return null;
            }
        },
        staleTime: 1000 * 60 * 10, // Considerar sesión fresca por 10 min
        retry: false, // No reintentar en errores de auth (401/403)
    })

    const authValue: AuthContextType = {
        user: data?.user ?? null,
        rol: data?.rol ?? "",
        authenticated: !!data?.authenticated,
        loading: isLoading,
    };

    return (
        <AuthContext.Provider
            value={authValue}
        >
            {children}
        </AuthContext.Provider>
    );
};