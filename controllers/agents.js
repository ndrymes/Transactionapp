const AgentServices = require('../services/agent')
const tokenGen = require('../utils/walletKeyGen')
const Wallet = require('../model/wallet')
const agent = new AgentServices()
const Agent = require('../model/agent')
console.log(AgentServices);



const _ = require('lodash')
const generateRandomNumber = require('../utils/digitGenerator')
const token = generateRandomNumber()



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
             const save_data = await agent.saveData(params)
            console.log(save_data)
            return res.status(201).send({
                save_data
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
    
    res.status(200).send({
        error: false,
        code: 200,
        message: 'Agent logged in successfully',
        data: agent
    })
    req.user =agent
    return agent
    
    }
      
    async fundWallet(req,res){
        console.log('res');
        
        const {amount,wallet,pin}= req.body
        const params = {
            amount,
            wallet,
            pin,
        }
        console.log(params.amount);
        
        if (isNaN(params.amount)) {
            res.status(400).send('please insert number')
        }
        try {
            const retwallet = await agent.checkWalletdetails(params.wallet)
            if (!retwallet) {
                res.status(404).send('wallet not found')
                
            }
            res.status(200).send({token})
            
          return retwallet
        } catch (error) {
            console.log(error);
            
        }
        
        
    }
}

module.exports = AgentController