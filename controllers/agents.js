const AgentServices = require('../services/agent')
const tokenGen = require('../utils/walletKeyGen')
const Wallet = require('../model/wallet')
const agent = new AgentServices()
const Agent = require('../model/agent')
console.log(AgentServices);



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
        if (isNaN(params.pin)) {
            res.status(400).send('Please enter number for your pin')
        }
         if (params.pin.length !=4) {
            res.status(400).send('your pin must be 4 digit')
            
        }
        try {
             const save_data = await agent.saveData(params)
             if(!save_data){
                 res.status(400).send('Cant Sign up, make sure your details are correct')
             }
             
             
             const token = await save_data.generateAuthtoken()
              
             
            return res.status(201).send({
                error: false,
                code: 200,
                message: 'Agent Signed up successfully',
                data: save_data,
                 token
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
    var ret_agent = await Agent.verifyDetails(params.email,params.password)
    if (!ret_agent) {
        res.status(400).send('User not found')
    }
    try {
          const token = await ret_agent.generateAuthtoken()
          res.header('Auth',token).status(200).send({
            error: false,
            code: 200,
            message: 'Agent logged in successfully',
            data: agent,
             token
        })
    } catch (error) {
        res.status(500).send({error})
    }
    
    
    
    // console.log(token);
    
    req.user =agent
    return agent
    
    }
      
    
}

module.exports = AgentController