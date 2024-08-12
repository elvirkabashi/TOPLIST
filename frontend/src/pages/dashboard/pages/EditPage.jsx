import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getAuthToken } from '../../../utils/Cookies';
import toast from 'react-hot-toast';


function EditPage() {
  const { id } = useParams(); // Get the page ID from the URL
  const navigate = useNavigate();
  const token = getAuthToken();

  const [pageData, setPageData] = useState({
    title: '',
    slogan: '',
    banner_url: '',
    url: '',
    description: ''
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the existing page data
    const fetchPageData = async () => {
      try {
        const response = await axios.get(`/api/pages/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.data) {
          setPageData(response.data);
          setLoading(false);
        }
      } catch (err) {
        setError('Failed to fetch page data');
        setLoading(false);
        console.error(err);
      }
    };

    fetchPageData();
  }, [id, token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPageData({ ...pageData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/pages/${id}`, pageData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success('Updated successfully')
      navigate(`/dashboard`);
    } catch (err) {
      setError('Failed to update the page');
      toast.error('Failed to update the page')
      console.error(err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Edit Page</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={pageData.title}
            onChange={handleInputChange}
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Slogan</label>
          <input
            type="text"
            name="slogan"
            value={pageData.slogan}
            onChange={handleInputChange}
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Banner URL</label>
          <input
            type="text"
            name="banner_url"
            value={pageData.banner_url}
            onChange={handleInputChange}
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">URL</label>
          <input
            type="text"
            name="url"
            value={pageData.url}
            onChange={handleInputChange}
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={pageData.description}
            onChange={handleInputChange}
            className="textarea textarea-bordered w-full"
          />
        </div>
        <button type="submit" className="btn btn-primary">Update Page</button>
      </form>
    </div>
  );
}

export default EditPage;
