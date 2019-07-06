const mongoose = require('mongoose');
const AgentServices = require('../services/agent')

const walletSchema = new mongoose.Schema({
_id:{
    type:String,
    require:true,
    unique:true

},
balance:{
    type:Number

}
})
const Wallet = mongoose.model('Wallet',walletSchema)

module.exports = Wallet