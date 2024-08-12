import { Op } from 'sequelize';
import Vote from '../models/vote.js';
import Page from '../models/page.js';

export const votePage = async (req, res) => {
    try {
        const { pageId } = req.params;
        const userId = 16;
        const ipAddress = req.ip;

        const recentVote = await Vote.findOne({
            where: {
                page_id: pageId,
                ip_address: ipAddress,
                vote_date: {
                    [Op.gte]: new Date(Date.now() - 24 * 60 * 60 * 1000),
                },
            },
        });

        if (recentVote) {
            return res.status(429).json({ message: 'You can only vote once every 24 hours per IP.' });
        }

        const vote = await Vote.create({
            page_id: pageId,
            user_id: userId,
            ip_address: ipAddress,
        });

        const page = await Page.findByPk(pageId);
        if (!page) {
            throw new Error('Page not found');
        }
        page.votes += 1;
        await page.save();

        res.status(200).json({ message: 'Vote recorded successfully.' });
    } catch (error) {
        console.error('Error details:', error);
        res.status(500).json({ error: 'An error occurred while recording your vote.' });
    }
};
