import { Link } from "react-router-dom"


function AdminDashboard() {
  return (
    <div className="container text-black">
      <h1 className="text-xl">Admin Dashboard</h1>
      <Link to='/users' className="btn btn-primary m-5">Users</Link>
    </div>
  )
}

export default AdminDashboard