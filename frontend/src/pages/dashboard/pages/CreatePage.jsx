import { useEffect, useState } from "react";
import axios from "axios";
import { getAuthToken } from "../../../utils/Cookies";
import { useNavigate } from "react-router-dom";

function CreatePage() {
  const token = getAuthToken();
  const headers = {
        Authorization: `Bearer ${token}`, 
 };
  const [categories, setCategories] = useState([]);
  const [inputs, setInputs] = useState({
    title: "",
    slogan: "",
    category_id: "",
    banner_url: "",
    url: "",
    description: ""
  });

  const navigate = useNavigate()

  useEffect(() => {
    axios.get('/api/categories')
      .then(response => {
        setCategories(response.data); // Assuming the API returns an array of categories
      })
      .catch(error => {
        console.error("There was an error fetching the categories!", error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    axios.post('/api/pages', inputs, {headers})
      .then(response => {
        console.log("Page created successfully", response.data);
        navigate('/dashboard')
      })
      .catch(error => {
        console.error("There was an error creating the page!", error);
      });
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create page
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                <input 
                  value={inputs.title} 
                  onChange={handleInputChange}
                  type="text" name="title" id="title" 
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                  placeholder="Page title"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Slogan</label>
                <input 
                  value={inputs.slogan}  
                  onChange={handleInputChange}
                  type="text" name="slogan" id="slogan" 
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                  placeholder="Slogan"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Choose category</label>
                <select 
                  value={inputs.category_id} 
                  onChange={handleInputChange} 
                  name="category_id" 
                  id="category_id" 
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Banner url</label>
                <input 
                  value={inputs.banner_url}  
                  onChange={handleInputChange}
                  type="text" name="banner_url" id="banner_url" 
                  placeholder="Banner url" 
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                  required=""
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">URL</label>
                <input 
                  value={inputs.url}  
                  onChange={handleInputChange}
                  type="text" name="url" id="url" 
                  placeholder="URL" 
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                  required=""
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                <input 
                  value={inputs.description}  
                  onChange={handleInputChange}
                  type="text" name="description" id="description" 
                  placeholder="Description" 
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                  required=""
                />
              </div>
              <button type="submit" className="btn btn-block btn-sm mt-2">
                Create Page
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CreatePage;
