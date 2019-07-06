const AgentService = require('../services/agent')
console.log(AgentService);
const mongoose = require('mongoose')
const validator = require('validator')

const bcrypt = require('bcrypt')



 


var agentSchema = new mongoose.Schema({

    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        validate(value) {
           if (!validator.isEmail(value)) {
               throw new Error('not a valid email')
           }
        }},

        password:{
            type:String,
            required:true,
            minlength:6
        },
        pin:{
            type:Number,
            trim:true,
            required:true,
            // max:4,
            // min:4
        },
        _id:{
            type:String
        
        },
        loggedIn:{
            type:Boolean,
            default:false
        }


    })
agentSchema.statics.verifyDetails = async function (email,password) {
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
    
    return user

    } catch (error) {
        console.log(error);
        
    }
    
    
}

agentSchema.pre('save',function (next) {
        var agent = this
         if (agent.isModified('password')) {
             bcrypt.genSalt(10,(err,salt) => {
                bcrypt.hash(agent.password,salt,(err,hash) => {
                    agent.password = hash
                    next()
                })
            })
        }
        
    })
    const Agent = mongoose.model('Agent',agentSchema)

    module.exports = Agent