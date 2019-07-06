const express = require ('express')
const router =express.Router()
const Walletcontroller = require('../controllers/wallet')
const newallet= new Walletcontroller()

router.post('/',async(req,res) => {
 const retwallet = await newallet.createwallet(req,res)
 res.send(retwallet)
})

router.post('/transfer',async(req,res) => {
    const retwallet = await newallet.fundWallet(req,res)
    console.log(retwallet);
    
})

module.exports  =router