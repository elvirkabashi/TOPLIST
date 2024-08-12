import Navbar from './components/Navbar'
import { Navigate, Route, Routes } from "react-router-dom"
import SignUp from "./pages/signup/SignUp"
import { Toaster } from 'react-hot-toast'
import CreatePage from './pages/dashboard/pages/CreatePage'
import { useAuthContext } from "./context/AuthContext"
import LogIn from './pages/login/LogIn'
import Home from './pages/home/Home'
import PageDetails from './components/PageDetails'
import UserDashboard from './pages/dashboard/UserDashboard'
import AdminDashboard from './pages/dashboard/AdminDashboard'
import EditPage from './pages/dashboard/pages/EditPage'
import UserList from './components/UserList'



function App() {

  const {authUser} = useAuthContext()

  const userRole = authUser?.role;

  return (
    <>
    <Toaster/>
    <Navbar/>
     <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/createpage' element={authUser ? <CreatePage/> :<Navigate to='/login' /> }/>
        <Route path='/details/:id' element={ <PageDetails/>}/>
        <Route path='/editPage/:id' element={ authUser ? <EditPage/> :<Navigate to='/login' />}/>

        <Route path='/dashboard' element={authUser ? userRole === 'admin' ? <AdminDashboard/> : <UserDashboard/> : <Navigate to='/login' />}/>
        <Route path='/users' element={authUser ? userRole === 'admin' ? <UserList/> : <Navigate to='/' /> : <Navigate to='/login' />}/>

        <Route path='/signup' element={authUser ? <Navigate to='/' /> : <SignUp/>} />
        <Route path='/login' element={authUser ? <Navigate to='/' /> : <LogIn/>} /> 
        {/* <Route path='/' element={authUser ? userRole === 'admin' ? <Navbar/> : 'test' : <Navigate to='/login' />} /> */}
     </Routes>
    </>
  )
}

export default App
