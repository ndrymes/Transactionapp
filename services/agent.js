const Agent = require('../model/agent')

class AgentServices {
 
    saveData(data){
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
}
module.exports = AgentServices