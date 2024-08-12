import { useState } from "react"
import { Link } from "react-router-dom"
import useLogin from "../../hooks/useLogin"


const LogIn = () => {

    const [inputs,setInputs] = useState({
        email: "",
        password: "",
    })

    const {loading, login} = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(inputs)
    }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        LogIn
                    </h1>
                    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            <input 
                            value={inputs.email}  
                            onChange={(e) => setInputs({...inputs, email: e.target.value})}
                            type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""/>
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input 
                            value={inputs.password}
                            onChange={(e) => setInputs({...inputs, password: e.target.value})}  
                            type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                        </div>
                        <button className='btn btn-block btn-sm mt-2' disabled={loading}>
                          {loading ? <span className='loading loading-spinner '></span> : "Login"}
                        </button>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Already dont have an account? <Link to="/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">SignUp here</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </section>
  )
}

export default LogIn