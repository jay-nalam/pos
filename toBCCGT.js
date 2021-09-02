const Web3 = require('web3');
const MaticPOSClient = require('@maticnetwork/maticjs').MaticPOSClient;
const HDWalletProvider = require("@truffle/hdwallet-provider");


require('dotenv').config();

async function approveAndTransfer() {
    const privateKey = process.env.PRIVATE_KEY;
    const fromAddress = process.env.FROM;
    const rootToken = process.env.ROOT_TOKEN;

    const parentProvider = process.env.GORELI;
    const childProvider = process.env.MUMBAI;


    const matic = new MaticPOSClient({
        network: "testnet",
        version: "mumbai",
        parentProvider: parentProvider,
        maticProvider: childProvider
    });

    console.log('Approval Initiated');

    const amount = Web3.utils.toWei('50', 'ether');

    await matic.approveERC20ForDeposit(rootToken, amount, options ={
        from: "0x3cdb72cA7D11c611428ad440dA1cbCC42250A970"
    });

    console.log("Approved. Starting Transfer... ");

    await matic.depositERC20ForUser(rootToken, fromAddress, amount, {
        from: fromAddress,
        gasPrice: 100000000
    });

    // console.log(matic);

    console.log("Transfer completed");
}


approveAndTransfer();