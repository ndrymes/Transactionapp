const express = require('express')
const router = express.Router()
const _ = require('lodash')
const AgentController = require('../controllers/agents')
console.log(AgentController);

const agent = new AgentController()

router.post('/signup', (req,res) => {
    return agent.signUp(req, res)
    
})

router.post('/login', async (req,res) => {
    
    const newagent = await agent.logIn(req,res)
     
     

    //   if (!user) {
    //     res.status(404).send('user not found')
    //   }

    //   res.status(200).send(user)
    // } catch (error) {
    //   res.status(500).send({
    //       error:true,
    //       message:'internal server error',
    //       code:500

    //   })
    // }
})
 
module.exports = router
