import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import User from '../models/user.js';
import UserProfile from '../models/userProfile.js';

export const signup = async (req, res) => {
    const { username, email, password , role, status} = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ username, email, password: hashedPassword , role, status});
      res.status(201).send(user);
    } catch (error) {
      res.status(400).send({ message: 'User registration failed', error });
    }
}

export const login = async(req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({  id: user.id,username: user.username,email: user.email, role: user.role  }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Error logging in', error });
  }
}

export const userDetails = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, { include: UserProfile });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const postUserDetails = async (req, res) => {
  const { first_name, last_name, bio, website_url } = req.body;
    try {
      let userProfile = await UserProfile.findOne({
        where: { user_id: req.user.id }
      });

      if (!userProfile) {
        userProfile = await UserProfile.create({
          user_id: req.user.id,
          first_name,
          last_name,
          bio,
          website_url
        });
      } else {
        userProfile.first_name = first_name || userProfile.first_name;
        userProfile.last_name = last_name || userProfile.last_name;
        userProfile.bio = bio || userProfile.bio;
        userProfile.website_url = website_url || userProfile.website_url;
        await userProfile.save();
      }

      res.json(userProfile);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}