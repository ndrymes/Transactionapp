const Agent = require('../model/agent')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authMidleware = async (req,res,next) => {
    const token = req.header('Auth')
    if(!token){
        res.status(401).send({error:"Acess denied,no token provided"})
    }
    try {
        const decoded =jwt.verify(token,process.env.ACCESS_KEY)
        console.log(decoded);
        
        req.user=decoded
        next()
    } catch (error) {
        
        
        res.status(400).send('Acess denied,invalid token')

    }
    

}


module.exports = authMidleware