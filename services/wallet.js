const Wallet = require('../model/wallet')

class walletServices {
    saveData(data){
 return Wallet.create(data)
    }
    updateWallet(tokens,amount){


    }
    async checkWalletdetails(id){
        try {
            const retwallet = await Wallet.findById(id)
            if (!retwallet) {
                throw new Error('wallet not found')
            }
            return retwallet
        } catch (error) {
            {error}
            
        }
}
async updateWalletAmount (_id,balance){
    
    
    return Wallet.findByIdAndUpdate(_id, {$inc:{balance}})
}

}
module.exports =walletServices