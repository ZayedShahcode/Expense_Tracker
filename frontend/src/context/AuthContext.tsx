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
    }, []);

    const login = (token: string) => {
        localStorage.setItem("token", token);
        setAuth(token);
    };

    const logout = () => {
        localStorage.removeItem("token");
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