const Agent = require('../model/agent')
const Wallet = require('../model/wallet')

class AgentServices {
 
    saveData(data){
        return Agent.create(data)
    }

    updatedLogginDetails(email){
        
        try {
            return Agent.findOneAndUpdate({email}, {$set:{loggedIn:true}})
        } catch (error) {
            throw new Error('email is not valid')
        }
        
    }
    
    async verifyAuth(){
        const agent = Agent.find
    }
}
module.exports = AgentServices