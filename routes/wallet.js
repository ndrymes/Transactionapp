const express = require ('express')
const router =express.Router()
const Walletcontroller = require('../controllers/wallet')
const newallet= new Walletcontroller()

router.post('/',async(req,res) => {
 const retwallet = await newallet.createwallet(req,res)
 res.send(retwallet)
})

module.exports  =router