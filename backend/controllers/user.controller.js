import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import User from '../models/user.js';
import UserProfile from '../models/userProfile.js';
import generateTokenAndSetCookie from '../utils/generateToken.js';

export const signup = async (req, res) => {
    const { username, email, password, confirmPassword} = req.body;

    try {

        if(password !== confirmPassword){
          return res.status(400).json({ error: 'Passwords do not match!'})
        }

        const user = await User.findOne({ where: { email } })

        if(user){
          return res.status(400).json({ error: 'This user already exists!'})
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({ username, email, password: hashedPassword , role:'user', status:'active'});

        if(newUser){

          generateTokenAndSetCookie(newUser.id,newUser.email, newUser.role, res);

          res.status(200).json({ user: { id: newUser.id, email: newUser.email, role: newUser.role } });
        }else{
          return res.status(400).json({ error: 'error!'})
        }

        

    }catch (error) {
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

    user.last_login = new Date();
    await user.save();

    generateTokenAndSetCookie(user.id, user.email, user.role, res)

    res.status(200).json({ user: { id: user.id, email: user.email, role: user.role } });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Error logging in', error });
  }
}

export const logout = (req, res) => {
  try{
    res.cookie("jwt","",{ maxAge: 0})
    res.status(200).json({ message:"Logged out successfully"})
  }catch (error) {
    res.status(500).json({ message: 'Error logout in', error });
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