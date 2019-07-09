const express = require ('express')
const router =express.Router()
const Walletcontroller = require('../controllers/wallet')
const newallet= new Walletcontroller()
const auth = require('../middlewares/auth')

router.post('/',auth,async(req,res) => {
 const retwallet = await newallet.createwallet(req,res)
 res.send(retwallet)
})

router.post('/transfer',auth,async(req,res) => {
    const retwallet = await newallet.fundWallet(req,res)
    console.log(retwallet);

})
router.post('/final',async (req,res) => {
    const retwallet = await newallet.verifyToken(req,res)
})

module.exports  =router