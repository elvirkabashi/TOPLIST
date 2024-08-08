import Page from '../models/page.js'; 

export const createPage = async (req, res) => {
  const {
    title,
    slogan,
    banner_url,
    url,
    description
  } = req.body;

  const {categoryId} = req.params;
  const userId = req.user.id

  try {
    const newPage = await Page.create({
      user_id: userId,
      title,
      slogan,
      category_id: categoryId,
      banner_url,
      url,
      description
    });

    res.status(201).json({
      message: 'Page created successfully',
      page: newPage
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserPages = async (req, res) => {
    const userId = req.user.id;
  
    try {
      const pages = await Page.findAll({
        where: { user_id: userId }
      });
  
      res.json(pages);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};
  
export const getPageById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const page = await Page.findByPk(id);
  
      if (!page) {
        return res.status(404).json({ message: 'Page not found' });
      }
  
      res.json(page);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};
  
// export const getPageEmbedCode = async (req, res) => {
    
// };
  

// export const getPageStats = async (req, res) => {

// };
  


export const updatePage = async (req, res) => {
    const { id } = req.params;
    const { title, slogan, banner_url, url, description } = req.body;
  
    try {
      const page = await Page.findByPk(id);
  
      if (!page) {
        return res.status(404).json({ message: 'Page not found' });
      }
  
      page.title = title || page.title;
      page.slogan = slogan || page.slogan;
      page.banner_url = banner_url || page.banner_url;
      page.url = url || page.url;
      page.description = description || page.description;
  
      await page.save();
  
      res.json({
        message: 'Page updated successfully',
        page
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};
  
  

export const deletePage = async (req, res) => {
    const { id } = req.params;
  
    try {
      const page = await Page.findByPk(id);
  
      if (!page) {
        return res.status(404).json({ message: 'Page not found' });
      }
  
      await page.destroy();
  
      res.json({ message: 'Page deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
