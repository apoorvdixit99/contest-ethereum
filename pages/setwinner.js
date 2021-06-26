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

class SetWinnerIndex extends Component {

    state = {
        participant:'',
        organizer:'',
        rank:'',
        competitionAddress:''
    }

    setWinner = async event => {
        event.preventDefault();
        //Get an instance of web3
        const web3 = getweb3();
        const contract = new web3.eth.Contract(
            JSON.parse(compiledContract.interface),
            this.state.competitionAddress
        );
        await contract.methods.setWinner(this.state.participant, this.state.rank).send({
            from: this.state.organizer
        });
        Router.pushRoute(`/`);
    }

    render(){

        return (
            <Layout>
                <div>
                    <Link route={`/`}>
                        <a>Back</a>
                    </Link>
                    <h3>Set Winner</h3>
                </div>

                <br/><br/>
                <Form onSubmit={this.setWinner}>
                    <Form.Field>
                        <label>Competition Address</label>
                        <Input
                            fluid
                            placeholder="Enter the address of the competition."
                            value={this.state.competitionAddress}
                            onChange={event => this.setState({competitionAddress: event.target.value })}
                        />
                        <label>Organizer Address</label>
                        <Input
                            fluid
                            placeholder="Enter your address (organizer)"
                            value={this.state.organizer}
                            onChange={event => this.setState({organizer: event.target.value })}
                        />
                        <label>Participant Address</label>
                        <Input
                            fluid
                            placeholder="Enter the winner's address"
                            value={this.state.participant}
                            onChange={event => this.setState({participant: event.target.value })}
                        />
                        <label>Rank</label>
                        <Input
                            fluid
                            placeholder="Enter the rank of the winner (Eg - 1,2,3...)"
                            value={this.state.rank}
                            onChange={event => this.setState({rank: event.target.value })}
                        />
                    </Form.Field>
                    <Button primary>Set Winner!</Button>
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

export default SetWinnerIndex;
