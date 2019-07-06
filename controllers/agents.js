const AgentServices = require('../services/agent')
const agent = new AgentServices()
const Agent = require('../model/agent')
console.log(agent);

const _ = require('lodash')
const generateRandomNumber = require('../utils/digitGenerator')

class AgentController {
    async signUp(req, res){
        // const allowed = _.pick(req.body,['email','password','pin'])
        const { pin, email, password } = req.body;
        const _id = generateRandomNumber()
        
        
        const params = {
            pin,
            email,
            password,
            _id,
        }
        
        
        
        try {
             const tt = await agent.saveData(params)
            console.log(tt)
            return res.status(201).send({
                tt
            })
        } catch (error) {
            console.log('This error occured', error)
            res.status(500).send({
                error:true,
                message:"internal server error",
                errormessage:error
            })
        }
    }
   async logIn(req,res){
     const {email,password} = req.body
     const params = {
         email,
         password
     };
    var agent = await Agent.verifyDetails(params.email,params.password)
    console.log(agent);
    
    res.status(200).send({
        error: false,
        code: 200,
        message: 'Agent logged in successfully',
        data: agent
    })
    return agent
    
    }
}

module.exports = AgentController