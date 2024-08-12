import { useState } from "react";
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useAuthContext } from "../context/AuthContext";

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const login = async ({ email, password }) => {
        const success = handleInputErrors({ email, password });
        if (!success) return;

        setLoading(true);
        try {
            const res = await axios.post("/api/user/login", { email, password });

            const data = res.data;
            if (data.error) {
                throw new Error(data.error);
            }

            localStorage.setItem("user", JSON.stringify(data.user));
            setAuthUser(data.user);
            toast.success("Login successful!");
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'An error occurred during login';
            if (errorMessage === 'User not found') {
                toast.error('User does not exist');
            } else if (errorMessage === 'Invalid credentials') {
                toast.error('Invalid credentials');
            } else {
                toast.error(errorMessage);
            }
        } finally {
            setLoading(false);
        }
    };

    return { loading, login };
};

export default useLogin;

function handleInputErrors({ email, password }) {
    if (!email || !password) {
        toast.error('Please fill in all required fields');
        return false;
    }
    return true;
}
