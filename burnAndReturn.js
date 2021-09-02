const Web3 = require('web3');
const MaticPOSClient = require('@maticnetwork/maticjs').MaticPOSClient;
const HDWalletProvider = require("@truffle/hdwallet-provider");

require('dotenv').config();


function burnAndReturnTokens() {
    const fromAddress = process.env.FROM;
    const childToken = process.env.CHILD_TOKEN;

    const parentProvider = process.env.GORELI;
    const childProvider = process.env.MUMBAI;

    let burnHash;


    const matic = new MaticPOSClient({
        network: "testnet",
        version: "mumbai",
        parentProvider: parentProvider,
        maticProvider: childProvider
    });

    console.log('Matic Client connected..');

    const amount = 5;

    matic.burnERC20(childToken, amount, {
        from: fromAddress
    }).then(res => {
        console.log(res)
    }).catch(err => {
        console.log(err);
    });

    // console.log('Tokens burned. Hash is ', tx);

    // matic.exitERC20(burnTransaction.transactionHash, {
    //     from: fromAddress
    // }).then(() => {
    //     console.log('Successfully completed..')
    // });

}

burnAndReturnTokens();