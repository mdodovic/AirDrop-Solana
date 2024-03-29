const {
    Connection, 
    PublicKey, 
    clusterApiUrl, 
    Keypair, 
    LAMPORTS_PER_SOL 
} = require("@solana/web3.js")

const wallet = new Keypair()

const publicKey = new PublicKey(wallet._keypair.publicKey)
const secretKey = wallet._keypair.secretKey

const getWalletBalance = async() => {
    try {
         const connection = new Connection(clusterApiUrl('devnet'), 'confirmed')
         const walletBalance = await connection.getBalance(publicKey)
         console.log(walletBalance)
    } catch(err) {
        console.error(err)
    }
}

const airDropSol = async() => {
    try {
        const connection = new Connection(clusterApiUrl('devnet'), 'confirmed')

        const fromAirFropSignature = await connection.requestAirdrop(publicKey, 2 * LAMPORTS_PER_SOL)
        await connection.confirmTransaction(fromAirFropSignature)


    } catch(err) {
        console.error(err)
    }
}

const main = async() => {
    await getWalletBalance()
    await airDropSol()
    await getWalletBalance()
}
main()