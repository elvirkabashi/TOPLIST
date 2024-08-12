import Message from "../models/message.js";
import Page from "../models/page.js";
import Setting from "../models/setting.js";
import User from "../models/user.js";



export const getAllPages = async (req, res) => {
  try {
    const pages = await Page.findAll();
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


export const updateSettings = async (req, res) => {
  const settingsData = req.body;

  try {
  
    let settings = await Setting.findOne();

    if (!settings) {
      settings = await Setting.create(settingsData);
    } else {
      settings = await settings.update(settingsData);
    }

    res.json({
      message: 'Settings updated successfully',
      settings
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUsers = async (req,res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// View messages from users
export const getMessages = async (req, res) => {
  try {
    const messages = await Message.findAll();
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Send a message to a user
export const sendMessage = async (req, res) => {
  const { recipient_id, subject, body } = req.body;

  try {
    const recipient = await User.findByPk(recipient_id);

    if (!recipient) {
      return res.status(404).json({ message: 'Recipient not found' });
    }

    const newMessage = await Message.create({
      sender_id: req.user.id,
      recipient_id,
      subject,
      body,
      read_status: 'unread',
      sent_date: new Date()
    });

    res.status(201).json({
      message: 'Message sent successfully',
      message: newMessage
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
