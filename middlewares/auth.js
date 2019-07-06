const Agent = require('../model/agent')
const bcrypt = require('bcrypt')
const verifyDetails= async(req,res,next,)=>{
    
    const email =req.email
    const password= req.password
    console.log(email);
    
    try {
        const user = await Agent.findOne({email})
        
        
        if (!user) {
            throw new Error('user not found')
        }
        const isMatch = await bcrypt.compare(password,user.password)
    if (!isMatch) {
        throw new Error('user not found')
    }
    //  new AgentServices().updatedLogginDetails(email)
    console.log(user);
    next()
    
    
    return user

    } catch (error) {
        console.log(error);
        
    }
    
}

module.exports = verifyDetails