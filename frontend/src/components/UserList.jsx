import { useState, useEffect } from 'react';
import axios from 'axios';
import { getAuthToken } from '../utils/Cookies';

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = getAuthToken();
  const headers = {
        Authorization: `Bearer ${token}`, 
 };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/admin/users',{headers});
        console.log('API Response:', response.data); 
        
        if (Array.isArray(response.data)) {
          setUsers(response.data);
        } else {
          setError('Unexpected data format.');
        }
      } catch (err) {
        setError('Failed to fetch user data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
      <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">ID</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Username</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Email</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Role</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Status</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">LastLogin</th>
              <th className="px-6 py-3 border-b-2 border-gray-300"></th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  <div className="flex items-center">
                    <div>
                      <div className="text-sm leading-5 text-gray-800">{user.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  <div className="text-sm leading-5 text-blue-900">{user.username}</div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">{user.email}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">{user.role}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                  <span className={`relative inline-block px-3 py-1 font-semibold leading-tight ${user.status === 'active' ? 'text-green-900' : 'text-red-900'}`}>
                    <span aria-hidden className={`absolute inset-0 opacity-50 rounded-full ${user.status === 'active' ? 'bg-green-200' : 'bg-red-200'}`}></span>
                    <span className="relative text-xs">{user.status}</span>
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5">{new Date(user.last_login).toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5">
                  <button className="px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none">View Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserList;
