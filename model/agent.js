const AgentServices = require('../services/agent')
const config = require('config')
const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
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
            min:4
        },
        _id:{
            type:String
        
        },
        // loggedIn:{
        //     type:Boolean,
        //     default:false
        // },
        tokens:[{
            token:{
                type:String,
                required:true
            }
        }]


    })
agentSchema.methods.toJSON = function () {
        var agent = this
        const newAgent = agent.toObject()
        delete newAgent.password
        delete newAgent.tokens
        return newAgent
    }
agentSchema.statics.verifyDetails = async function (email,password) {
    try {
        const user = await Agent.findOne({email})
        console.log(user);
        
        
        
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
agentSchema.methods.generateAuthtoken = async function(){
const agent = this
const token = jwt.sign({_id:agent._id},process.env.ACCESS_KEY)
// agent.tokens = agent.tokens.concat({token})
return token
// await agent.save()
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