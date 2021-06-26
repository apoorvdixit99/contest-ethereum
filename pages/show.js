import React, { Component } from 'react';
import Layout from '../components/Layout';
import { Form, Button, Input } from 'semantic-ui-react';
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

class CompetitionShow extends Component {

    state = {
        participant:'',
    }

    
    static async getInitialProps(props){

        //Get an instance of web3
        const web3 = getweb3();

        //Get the instance of contract
        const contract = new web3.eth.Contract(
            JSON.parse(compiledContract.interface),
            props.query.address
        );
        
        //automatic getter functions
        const competitionName = await contract.methods.name().call();    
        const organizerAddress = await contract.methods.organizer().call();

        return { 
            competitionAddress: props.query.address,
            competitionName: competitionName,
            organizerAddress: organizerAddress
        };

    }

    /*
    verifyParticipant = async event => {
        event.preventDefault();
        //Get an instance of web3
        const web3 = getweb3();
        const contract = new web3.eth.Contract(
            JSON.parse(compiledContract.interface),
            props.query.address
        );
        let rank = await factory.methods.verifyParticipant(this.state.participant).call();
        console.log('Rank is: ',rank);
        //Router.pushRoute(`/`);
    }
    */

    participate = async event => {
        event.preventDefault();
        //Get an instance of web3
        console.log('mayahehe');
        const web3 = getweb3();
        const contract = new web3.eth.Contract(
            JSON.parse(compiledContract.interface),
            this.props.competitionAddress
        );
        await contract.methods.participate().send({
            from: this.state.participant
        });
        Router.pushRoute(`/`);
    }

    render(){

        return (
            <Layout>
                <div>
                    <Link route={`/list`}>
                        <a>Back</a>
                    </Link>
                    <h3>Competition Name: {this.props.competitionName}</h3>
                    <h5>Competition Address: {this.props.competitionAddress}</h5>
                    <h5>Organizer: {this.props.organizerAddress}</h5>
                </div>

                <br/><br/>
                <Form onSubmit={this.participate}>
                    <Form.Field>
                        <label>Participant Address</label>
                        <Input
                            fluid
                            placeholder="Enter your address to participant."
                            value={this.state.participant}
                            onChange={event => this.setState({participant: event.target.value })}
                        />
                    </Form.Field>
                    <Button primary>Participate!</Button>
                </Form>

            </Layout>
        );
    }

}

/*


<br/><br/>
<Form onSubmit={this.verifyParticipant}>
    <Form.Field>
        <label>Participant Address</label>
        <Input
            fluid
            placeholder="Enter the address of the participant."
            value={this.state.participant}
            onChange={event => this.setState({participant: event.target.value })}
        />
    </Form.Field>
    <Button primary>Verify!</Button>
</Form>

*/

export default CompetitionShow;
