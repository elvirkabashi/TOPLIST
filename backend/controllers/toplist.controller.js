import Category from "../models/category.js";
import Page from "../models/page.js";




export const getToplist = async (req, res) => {
    try {
        const toplist = await Page.findAll({ 
            where: { active: true },
            include: [{ model: Category }],
            order: [['total_hits_in', 'DESC']]
        });
        res.status(200).json({ success: true, data: toplist });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to retrieve toplist' });
    }
};

