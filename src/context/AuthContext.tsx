import { createContext, useContext, useState, useEffect } from "react";


export interface User{
    username: string;
    email: string;
    createdAt: Date;
}

interface AuthContextType {
    auth: string | null;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [auth, setAuth] = useState<string | null>(localStorage.getItem("token"));
   
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setAuth(storedToken);
        }
        const expiry = localStorage.getItem("expiry");
        if (expiry && new Date(expiry) < new Date()) {
            logout();
        }
    }, []);

    const login = (token: string) => {
        localStorage.setItem("token", token);
        localStorage.setItem("expiry",new Date(Date.now() + 10*60*1000).toISOString()); // Set expiry to 1 hour later
        setAuth(token);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("expiry");
        setAuth(null);
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};