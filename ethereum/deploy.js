const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');

// Only deploying CompetitionContractFactory
const compiledFactory = require('./build/CompetitionContractFactory.json')

// Unlock Public Key, Private Key and address of our metamask account
const ACCOUNT_MNEMONIC = 'oxygen razor gas age wide flock saddle final slab video wonder round';

const INFURA_ENDPOINT = 'https://rinkeby.infura.io/v3/fef6389862a44e18a70ad8f1da88f996';

// Helps connect to a network (rinkeby)
// Helps unlock an account for deploying on the network
const provider = new HDWalletProvider(ACCOUNT_MNEMONIC,INFURA_ENDPOINT);

const web3 = new Web3(provider);

// We are using this function to use async-await
const deploy = async () => {

    const accounts = await web3.eth.getAccounts();
    
    console.log('Attempting to deploy from account', accounts[0]);

    const contract = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({ data: compiledFactory.bytecode })
        .send({ gas:'1000000', from: accounts[0] });
    
    console.log('Contract deployed to',contract.options.address);

};
deploy();
