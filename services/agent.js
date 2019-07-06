const Agent = require('../model/agent')
const Wallet = require('../model/wallet')

class AgentServices {
 
    saveData(data){
        console.log(data)
        return Agent.create(data)
    }

    updatedLogginDetails(email){
        console.log('er');
        
        try {
            return Agent.findOneAndUpdate({email}, {$set:{loggedIn:true}})
        } catch (error) {
            throw new Error('email is not valid')
        }
        
    }
    async checkWalletdetails(id){
        try {
            const retwallet = await Wallet.findById(id)
            if (!retwallet) {
                throw new Error('wallet not found')
            }
            return retwallet
        } catch (error) {
            res.status(400).send('bad request')
            
        }
  

    }
    async verifyAuth(){
        const agent = Agent.fi
    }
}
module.exports = AgentServices