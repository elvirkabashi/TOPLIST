import express from 'express';

const router = express.Router();



router.get('/signup', (req, res) => {
    res.send("login")
})

router.get('/login', (req, res) => {
    res.send("login")
})

router.get('/logout', (req, res) => {
    res.send("login")
})
export default router;