import { useState } from "react"
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useAuthContext } from "../context/AuthContext"

const useSignup = () => {
    
    const [loading,setLoading] = useState(false)
    const { setAuthUser} = useAuthContext()

    const signup = async({username,email,password,confirmPassword}) => {

        const success = handleInputErrors({username,email,password,confirmPassword})
        if(!success)return;

        setLoading(true);
        try {
            const response = await axios.post("/api/user/signup", {
                username,
                email,
                password,
                confirmPassword,
            });

            const data = response.data; 

            if (data.error) {
                throw new Error(data.error);
            }

            localStorage.setItem("user", JSON.stringify(data))


            setAuthUser(data)


            toast.success('Signup successful!');
        } catch (error) {
            toast.error(error.response?.data?.error || 'Signup failed!');
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return {loading,signup}
}

export default useSignup


function handleInputErrors({ username, email, password, confirmPassword }) {
    if (!username || !email || !password || !confirmPassword) {
        toast.error('Please fill in all required fields');
        return false;
    }

    if (password !== confirmPassword) {
        toast.error('Passwords do not match!');
        return false;
    }

    return true;
}
