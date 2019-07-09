const walletServices = require('../services/wallet')
const generateRandomNumber = require('../utils/walletKeyGen');
const searchArray = require('../utils/searchArray')
const wallet = new walletServices()

let token_array=[]
const token = generateRandomNumber()
class WalletController{
    async createwallet(req,res){
      const {email,password}= req.body
      const param = {
          email,
          password
        
      }
      console.log(param);
      
      try {
        const newwallet = await wallet.saveData(param)
        if (!newwallet) {
            res.status(400).send('wallet not created')
        }
        res.status(201).send({
            error:false,
            message:"Wallet created suceesfully",
            data:newwallet,
            Walletid:newwallet._id
        })
      } catch (error) {
          res.status(500).send({
              error:true,
              code:500,
              errormessage:error
          })
      }
      

    }
    async fundWallet(req,res){
        console.log('res');
        
        const {amount,wallet_id,pin}= req.body
        const params = {
            amount,
            wallet_id,
            pin,
        }
        console.log(params.amount);
        console.log(params.wallet_id);
        
        
        if (isNaN(params.amount)) {
            res.status(400).send('please insert number')
        }
        
        try {
            const retwallet = await wallet.checkWalletdetails(params.wallet_id)
            if (!retwallet) {
                res.status(404).send('wallet not found')
                
            }
            const tokenObj = {
                token,
                wallet_id 
            }
            token_array.push(tokenObj)
            console.log('token_array', token_array)
            res.status(200).send({token})
            
          return retwallet
        } catch (error) {
            console.log(error);
            
        }
        
        
    }

    async verifyToken(req,res) {
        const {token_,amount,wallet_id} = req.body
        const params = {
            token_,
            balance: amount,
            wallet_id
        }
        console.log('token_array',token_array)
        console.log(wallet_id);
        
    const objToken = searchArray(wallet_id, token_array)
    if (!objToken) {
        res.status(400).send({
            error:true,
            code:400,
            message:"no token sent"
        })
    }
   
         
    if (params.token_ == objToken.token) {
        try {
            const retwallet =await wallet.updateWalletAmount(params.wallet_id,params.balance)
            if (!retwallet) {
                res.send(401).send('imput right token')
            }
            res.status(200).send({
                error:true,
                code:200,
                message:'Succedful'
            })
        } catch (error) {
            res.status(400).send(error)
        }
       
       
       
        
    }
      

    }
}
module.exports = WalletController