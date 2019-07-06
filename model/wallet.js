const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcrypt')
const AgentServices = require('../services/agent')


const walletSchema = new mongoose.Schema({
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

        balance:{

    type:Number,
     default:0
}
})
walletSchema.pre('save',function (next) {
    var wallet = this
     if (wallet.isModified('password')) {
         bcrypt.genSalt(10,(err,salt) => {
            bcrypt.hash(wallet.password,salt,(err,hash) => {
                wallet.password = hash
                next()
            })
        })
    }
    
})
const Wallet = mongoose.model('Wallet',walletSchema)

module.exports = Wallet