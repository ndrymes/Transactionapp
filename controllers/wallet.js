const walletServices = require('../services/wallet')
const generateRandomNumber = require('../utils/digitGenerator')
const wallet = new walletServices()

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
            res.status(200).send({token})
            
          return retwallet
        } catch (error) {
            console.log(error);
            
        }
        
        
    }
    async verifyToken(req,res) {
        const {token_} = req.body
        const params = {
            token_
        }
    if (token_ === token) {
         
        wallet.updateWalletAmount()
        
    }
      const newtoken = req.bod

    }
}
module.exports = WalletController