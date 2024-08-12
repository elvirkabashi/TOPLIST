import jwt from 'jsonwebtoken'

const generateTokenAndSetCookie = (userId, email, role, res) =>{
    const token = jwt.sign({id:userId,email: email,role: role}, process.env.JWT_SECRET, {
        expiresIn: '15d'
    })

    res.cookie("jwt", token)

    //console.log(token)
}

export default generateTokenAndSetCookie;