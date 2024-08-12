import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/database.js';
import bodyParser from 'body-parser';
import cors from 'cors';


import userRoutes from './routes/user.routes.js';
import pageRoutes from './routes/page.routes.js'
import categoryRoutes from './routes/category.routes.js'
import toplistRoutes from './routes/toplist.routes.js'
import ruleRoutes from './routes/rule.routes.js'
import voteRoutes from './routes/vote.routes.js'
import adminRoutes from './routes/admin.routes.js'


import User from './models/user.js'
import Page from './models/page.js';
import Category from './models/category.js';
import Hit from './models/hit.js';
import Vote from './models/vote.js';
import Setting from './models/setting.js';
import Rule from './models/rule.js';
import Message from './models/message.js';
import PageStats from './models/pageStats.js';
import Partner from './models/partner.js';
import Banner from './models/banner.js';
import Comment from './models/comment.js';
import Report from './models/report.js';
import Notification from './models/notification.js';
import IpBan from './models/ipBan.js';
import UserProfile from './models/userProfile.js';
import GeoBan from './models/geoBan.js';
import SubnetBan from './models/subnetBan.js';
import ReferralBan from './models/referralBan.js';
import ReferralLog from './models/referralLog.js';
import ClickLog from './models/clickLog.js';
    




const app = express();
dotenv.config();

app.use(bodyParser.json());

app.use(cors());



User.hasMany(Page, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Page.belongsTo(User, { foreignKey: 'user_id' });


Category.hasMany(Page, { foreignKey: 'category_id', onDelete: 'CASCADE' });
Page.belongsTo(Category, { foreignKey: 'category_id' });


Page.hasMany(Hit, { foreignKey: 'page_id', onDelete: 'CASCADE' });
Hit.belongsTo(Page, { foreignKey: 'page_id' });


Page.hasMany(Vote, { foreignKey: 'page_id', onDelete: 'CASCADE' });
Vote.belongsTo(Page, { foreignKey: 'page_id' });


User.hasMany(Vote, { foreignKey: 'user_id', onDelete: 'SET NULL' });
Vote.belongsTo(User, { foreignKey: 'user_id' });

PageStats.belongsTo(Page, { foreignKey: 'page_id' });

Message.belongsTo(User, { as: 'sender', foreignKey: 'sender_id' });
Message.belongsTo(User, { as: 'recipient', foreignKey: 'recipient_id' });

Banner.belongsTo(Page, { foreignKey: 'page_id', onDelete: 'CASCADE' });

Comment.belongsTo(Page, { foreignKey: 'page_id', onDelete: 'CASCADE' });
Comment.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });

Report.belongsTo(Page, { foreignKey: 'page_id', onDelete: 'CASCADE' });
Report.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });

Notification.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });

User.hasOne(UserProfile, { foreignKey: 'user_id', onDelete: 'CASCADE' });
UserProfile.belongsTo(User, { foreignKey: 'user_id' });

Page.hasMany(ReferralLog, { foreignKey: 'page_id', onDelete: 'CASCADE' });
ReferralLog.belongsTo(Page, { foreignKey: 'page_id' });

Page.hasMany(ClickLog, { foreignKey: 'page_id', onDelete: 'CASCADE' });
ClickLog.belongsTo(Page, { foreignKey: 'page_id' });

Category.hasMany(Category, { as: 'subcategories', foreignKey: 'parent_id', onDelete: 'SET NULL' });
Category.belongsTo(Category, { as: 'parent', foreignKey: 'parent_id' });




app.use("/api/user", userRoutes);
app.use("/api", pageRoutes);
app.use("/api", categoryRoutes);
app.use("/api", toplistRoutes);
app.use("/api", ruleRoutes);
app.use("/api", voteRoutes);


app.use("/api/admin", adminRoutes);



sequelize.sync({ force: false }).then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }).catch(err => {
    console.error('Unable to connect to the database:', err);
  });
