import Page from '../models/page.js'; 
import Hit from '../models/hit.js'; 

export const createPage = async (req, res) => {
  const {
    title,
    slogan,
    category_id,
    banner_url,
    url,
    description
  } = req.body;

  const userId = req.user.id

  try {
    const newPage = await Page.create({
      user_id: userId,
      title,
      slogan,
      category_id,
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

export const addHit = async (req, res) => {
  const { pageId, type } = req.body;

  try {
    const today = new Date().toISOString().split('T')[0];


    let hit = await Hit.findOne({ where: { page_id: pageId, date: today } });

    if (!hit) {
      hit = await Hit.create({
        page_id: pageId,
        date: today,
        daily_hits_in: 0,
        daily_hits_out: 0,
      });
    }


    if (type === 'in') {
      hit.daily_hits_in += 1;
      await Page.increment('hits_in', { by: 1, where: { id: pageId } });
    } else if (type === 'out') {
      hit.daily_hits_out += 1;
      await Page.increment('hits_out', { by: 1, where: { id: pageId } });
    }


    await hit.save();


    const page = await Page.findByPk(pageId);
    const totalHitsIn = page.hits_in;
    const totalHitsOut = page.hits_out;

    await Page.update(
      { total_hits_in: totalHitsIn, total_hits_out: totalHitsOut },
      { where: { id: pageId } }
    );

    return res.status(200).json({ success: true, totalHitsIn, totalHitsOut });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server Error' });
  }
};

export const getPageHits = async (req, res) => {
  try {
    const userId = req.user.id;
    const pages = await Page.findAll({
      where: { user_id: userId },
      attributes: ['id', 'title']
    });

    const pageHits = await Promise.all(pages.map(async (page) => {
      const hitsIn = await Hit.sum('daily_hits_in', { where: { page_id: page.id } });
      const hitsOut = await Hit.sum('daily_hits_out', { where: { page_id: page.id } });
      return {
        ...page.toJSON(),
        hitsIn,
        hitsOut
      };
    }));

    res.status(200).json({ success: true, data: pageHits });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to retrieve page hits' });
  }
};
