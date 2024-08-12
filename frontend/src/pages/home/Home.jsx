import axios from 'axios';
import { useEffect, useState } from 'react';
import { getAuthToken } from '../../utils/Cookies';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function Home() {
  const [toplist, setToplist] = useState([]); 
  const token = getAuthToken();
  const headers = {
    Authorization: `Bearer ${token}`, 
  };
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/toplist')
      .then(response => {
        if (response.data && Array.isArray(response.data.data)) {
          setToplist(response.data.data); 
        } else {
          console.error('Unexpected response format:', response.data);
        }
      })
      .catch(error => {
        console.error('Error fetching toplist:', error);
        
      });
  }, []); 

  const handleHitIn = async (pageId) => {
    try {
      await axios.post('/api/hit', { pageId, type: 'in' }, { headers });
      // Navigate to the details page after hitting the API
      navigate(`/details/${pageId}`);
    } catch (error) {
      console.error('Error updating hit:', error);
      toast.error('Error on hit')
    }
  };

  return (
    <div className="container mt-10">
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr className="text-center">
              <th className="text-black">Rank</th>
              <th className="text-black">Link / Description</th>
              <th className="text-black">Hits In</th>
              <th className="text-black">Hits Out</th>
            </tr>
          </thead>
          <tbody>
            {toplist.map((item, index) => (
              <tr
              key={item.id}
              className="text-center odd:text-black odd:bg-white odd:dark:bg-gray-200 even:text-white1 even:bg-gray-50 even:dark:bg-gray-300 border-b dark:border-gray-700 cursor-pointer"
              onClick={() => handleHitIn(item.id)}
            >
                <th>{index + 1}</th> 
                <td className="flex justify-center items-center flex-col">
                  <h3>{item.title}</h3>
                  <img width={200} src={item.banner_url} alt={`${item.title} banner`} />
                  <p>{item.description}</p>
                </td>
                <td>{item.hits_in}</td> 
                <td>{item.hits_out}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
