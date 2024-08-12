import { createContext, useContext, useState, useEffect } from "react";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const useAuthContext = () => {
    return useContext(AuthContext);
}

export const AuthContextProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(() => {
        const user = JSON.parse(localStorage.getItem('user')) || null;

        const token = Cookies.get('jwt');
        const decodedToken = token ? jwtDecode(token) : null;

        return user ? { ...user, role: decodedToken?.role } : null;
    });

    useEffect(() => {
        const token = Cookies.get('jwt');
        if (token) {
            const decodedToken = jwtDecode(token);
            setAuthUser((prevUser) => ({
                ...prevUser,
                role: decodedToken?.role,
            }));
        }
    }, []);

    return <AuthContext.Provider value={{ authUser, setAuthUser }}>
        {children}
    </AuthContext.Provider>;
}
