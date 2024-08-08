import Category from "../models/category.js";
import Page from "../models/page.js";
import Setting from "../models/setting.js";



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


export const updateToplistSettings = async (req, res, next) => {
    try {
        const settings = await Setting.findOne();
        await settings.update(req.body);
        res.status(200).json({ success: true, data: settings });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to update settings' });
    }
}