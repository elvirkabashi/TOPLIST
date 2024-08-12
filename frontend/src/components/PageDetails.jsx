import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

import toast from 'react-hot-toast';
import { getAuthToken } from '../utils/Cookies';

function PageDetails() {
  const { id } = useParams();
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = getAuthToken();
  const headers = {
        Authorization: `Bearer ${token}`, 
    };

    const navigate = useNavigate();

  useEffect(() => {
    const fetchPageDetails = async () => {
      try {
        const response = await axios.get(`/api/pages/${id}`,{headers});
        setPage(response.data);
      } catch (err) {
        setError('Failed to fetch page details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPageDetails();
  }, [id]);

  const handleHitOut = async (pageId) => {
    try {
      await axios.post('/api/hit', { pageId, type: 'out' }, { headers });
      navigate(`/`);
    } catch (error) {
      console.error('Error updating hit:', error);
      toast.error('Error on out')
    }
  };

  const handleVote = async (pageId) => {
    try {
      const response = await axios.post(`/api/vote/${pageId}`,{} ,{ headers});
      toast.success(response.data.message);


      setPage((prevPage) => ({
        ...prevPage,
        votes: prevPage.votes + 1,
      }));
    } catch (error) {
      console.error('Error voting:', error);
      if (error.response && error.response.status === 429) {
        toast.error('You can only vote once every 24 hours per IP.');
      } else {
        toast.error('An error occurred while recording your vote.');
      }
    }
  };

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error) return <div className="text-center py-4 text-red-500">{error}</div>;

  return (
    page && (
     <div>
        <div className='m-10'>
            <a onClick={() => handleHitOut(page.id)}
                className="inline-flex items-center border border-indigo-300 px-3 py-1.5 rounded-md text-indigo-500 hover:bg-indigo-50">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16l-4-4m0 0l4-4m-4 4h18">
                    </path>
                </svg>
                <span className="ml-1 font-bold text-lg">Back to toplist</span>
            </a>
        </div>
        <div className="max-w-4xl mx-auto mt-5 p-4 bg-white shadow-md rounded-lg">
            <img
            src={page.banner_url}
            alt={page.title}
            className="w-full h-64 object-cover rounded-t-lg mb-4"
            />
            <h1 className="text-2xl font-bold mb-2">{page.title}</h1>
            <h2 className="text-xl text-gray-600 mb-4">{page.slogan}</h2>
            <p className="text-gray-800 mb-4">{page.description}</p>
            <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-semibold">Category ID: {page.category_id}</span>
            <span className="text-lg font-semibold">Votes: {page.votes}</span>
            </div>
            <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-semibold">Hits In: {page.hits_in}</span>
            <span className="text-lg font-semibold">Hits Out: {page.hits_out}</span>
            </div>
            <a
            href={page.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
            >
            Visit Page
            </a>
            <button onClick={() => handleVote(page.id)}
               className="mt-4 px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600"
            >Vote</button>
        </div>
     </div>
    )
  );
}

export default PageDetails;
