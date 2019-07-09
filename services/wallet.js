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
async updateWalletAmount (){
    f
}

}
module.exports =walletServices