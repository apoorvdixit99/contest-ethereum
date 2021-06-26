import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';
import Layout from '../components/Layout';
import { Link } from '../routes';
//import Web3 from 'web3';

/*
const compiledFactory = require('../ethereum/build/CompetitionContractFactory.json');

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
*/

class CompetitionIndex extends Component {

    render(){
        return (
            <Layout>
            	<h1>Decentralised Competition Management System (DCMS)</h1>

                <div>
                    <h3>"The right way to host competitions!"</h3>
                    <p>With the boom of the digital era, taking part in competitions is now just one click away. However, this ease in participation comes with its own set of challenges. The most notable one being the rise of counterfeit achievement certificates. Talent and Hardwork cannot be forged, but unfortunately accolades can be. This calls for an important question - How can we verify the integrity of the participants and the winners in a competition?</p>
                    <p>Platform D.C.M.S. attempts to answer just that! By leveraging the Blockchain technology, interested parties like job interviewers can easily verify the authenticity of the certificates. This helps conduct a more transparent contest, one which is fair to winners as well as participants.</p>
                    <p>Platform D.C.M.S. is a WebApp whose purpose is to verify participation and prize distribution in a competition seamlessly. Here are the useful links to help you navigate around the platform.</p>
                    <ul>
                        <li><Link route="/new"><a>Create a Competition</a></Link></li>
                        <li><Link route="/list" ><a>View Competitions</a></Link></li>
                        <li><Link route="/participate" ><a>Participate in a Competition</a></Link></li>
                        <li><Link route="/verify" ><a>Verify Participation</a></Link></li>
                        <li><Link route="/setwinner" ><a>Set Winner (Organizers only)</a></Link></li>
                    </ul>
                </div>
            </Layout>
        );
    }
}

export default CompetitionIndex;
