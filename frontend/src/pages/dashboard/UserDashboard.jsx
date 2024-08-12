// components/UserDashboard.js
import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { getAuthToken } from '../../utils/Cookies';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function UserDashboard() {
  const [pages, setPages] = useState([]);
  //const [votes, setVotes] = useState([]);
  const [hits, setHits] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = getAuthToken()
    const headers = useMemo(() => ({
        Authorization: `Bearer ${token}`,
      }), [token]);

      const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
          try {
            const [pagesRes, hitsRes] = await Promise.all([
              axios.get('/api/pages', { headers }),
              //axios.get('/api/user/votes', { headers }),
              axios.get('/api/hits', { headers })
            ]);
      
            
            if (pagesRes && Array.isArray(pagesRes.data)) {
              setPages(pagesRes.data);
            } else {
              console.error('Unexpected pages response:', pagesRes.data);
            }
      
            // if (votesRes.data && Array.isArray(votesRes.data.data)) {
            //   setVotes(votesRes.data.data);
            // } else {
            //   console.error('Unexpected votes response:', votesRes.data);
            // }
      
            if (hitsRes.data && Array.isArray(hitsRes.data.data)) {
              setHits(hitsRes.data.data);
            } else {
              console.error('Unexpected hits response:', hitsRes.data);
            }
          } catch (error) {
            console.error('Error fetching user data:', error);
          } finally {
            setLoading(false);
          }
        };
      
        fetchData();
      }, [headers]);

      const handleDelete = (id) => {
        try{
            axios.delete(`/api/pages/${id}`, {headers})
            toast.success("Deleted successfully")
            navigate('/')
        }catch(err){
            console.log(err);
            toast.error('Delete error')
        }
      }

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-4 container text-black">
    <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
    <Link to='/createpage' className='btn btn-primary my-5'>Create Page</Link>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Pages */}
      <div className="bg-white p-4 shadow rounded">
        <h2 className="text-xl font-semibold mb-10">My Pages</h2>
        <ul>
          {pages.length > 0 ? (
            pages.map(page => (
              <li key={page.id} className='mt-5'>
                <h3 className="font-semibold">{page.title} </h3>
                <div>
                    <a className='btn btn-error btn-sm' onClick={() => handleDelete(page.id)}>delete</a>
                    <a className='btn btn-success btn-sm ms-2' href={`/editPage/${page.id}`}>edit</a>
                </div>
                <p>URL: <a href={page.url} className="text-blue-600">{page.url}</a></p>
                <p>Description: {page.description}</p>
                <hr/>
              </li>
              
            ))
          ) : (
            <p>No pages found</p>
          )}
        </ul>
      </div>
      
      {/* Votes */}
      {/* <div className="bg-white p-4 shadow rounded">
        <h2 className="text-xl font-semibold">Page Votes</h2>
        <ul>
          {votes.length > 0 ? (
            votes.map(page => (
              <li key={page.id}>
                <h3 className="font-semibold">{page.title}</h3>
                <p>Votes: {page.votes}</p>
              </li>
            ))
          ) : (
            <p>No votes found</p>
          )}
        </ul>
      </div> */}

      {/* Hits */}
      <div className="bg-white p-4 shadow rounded">
        <h2 className="text-xl font-semibold">Page Hits</h2>
        <ul>
          {hits.length > 0 ? (
            hits.map(page => (
              <li key={page.id}>
                <h3 className="font-semibold">{page.title}</h3>
                <p>Hits In: {page.hitsIn}</p>
                <p>Hits Out: {page.hitsOut}</p>
              </li>
            ))
          ) : (
            <p>No hits found</p>
          )}
        </ul>
      </div>
    </div>
  </div>
  );
}

export default UserDashboard;
