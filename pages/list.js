import React, { Component } from 'react';
import Layout from '../components/Layout';
import { Card, Button } from 'semantic-ui-react';
import { Link } from '../routes';

import Web3 from 'web3';

const compiledFactory = require('../ethereum/build/CompetitionContractFactory.json');
const compiledContract = require('../ethereum/build/Competition.json');

//importing factory from '../ethereum/factory' does not work as of it
function getweb3() {
    //Web3
    let web3;
    const INFURA_ENDPOINT = 'https://rinkeby.infura.io/v3/fef6389862a44e18a70ad8f1da88f996';
	if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined' ) {
	    //We are in the browser and metamask is running
	    web3 = new Web3(window.web3.currentProvider);
	} else {
	    //We are on the server *OR* the user is not running metamask
	    const provider = new Web3.providers.HttpProvider(
		    INFURA_ENDPOINT
	    );
	    web3 = new Web3(provider);
	}
	return web3;
}


class CompetitionsList extends Component {

    
    static async getInitialProps(){
        
        //Address of the CompetitionContractFactory Contract on Rinkeby
        const factoryAddress = '0xE54e08740C1E1CEB4665CcFFd845e98155c08676';

        //Get an instance of web3
        const web3 = getweb3();

        //Get the instace of VaccineContractFactory on Rinkeby
        const factory = new web3.eth.Contract(
            JSON.parse(compiledFactory.interface),
            factoryAddress
        );

        //Get the list of deployed contracts
        const contracts = await factory.methods.getDeployedContracts().call();

        //Fetch Contract Names
        const contractNames = {};
        for (let contractAddress of contracts){
            const contract = new web3.eth.Contract(
                JSON.parse(compiledContract.interface),
                contractAddress
            );
            let competitionName = await contract.methods.name().call();    //automatic getter function
            contractNames[contractAddress] = competitionName;
        }

        return { contracts, contractNames };
    }

    renderContracts() {
        //<Link route={`/campaigns/${address}`}>

        const {
            contracts, contractNames
        } = this.props;

        const items = contracts.map(address => {
            
            //<Link route={`/competition/${address}`}>
            return {
                header: "Name: "+contractNames[address],
                description: (
                    <Link route={`/show/${address}`}>
                        <a>View Contract</a>
                    </Link>
                ),
                meta: "Organized by: "+address,
                fluid: true
            };
        });
        return <Card.Group items={items} />;
    }

    render(){
        return (
            <Layout>
                <Link route={`/`}><a>Back</a></Link>
                <h3>List of Competitions</h3>
                {this.renderContracts()}
            </Layout>
        );
    }

}

export default CompetitionsList;