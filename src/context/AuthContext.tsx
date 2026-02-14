import { getPermisos, verifyAuth } from "@/services/authService";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

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
    rol:string;
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
    const [authenticated, setAuthenticated] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [user, setUser] = useState<User | null>(null);
    const [rol, setRol] = useState<string>("");

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await verifyAuth();               
                if (response) {
                    setAuthenticated(true);
                    setUser(response.user);
                } else {
                    setAuthenticated(false);
                    setUser(null);
                }

                const rolResponse = await getPermisos()                
                setRol(rolResponse.data.permisos[0][1]);
            } catch {
                setAuthenticated(false);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                authenticated,
                loading,
                user,
                rol,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};