import React, { Component } from 'react';
import Layout from '../components/Layout';
import { Form, Button, Input, Message } from 'semantic-ui-react';
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

class VerifyIndex extends Component {

    state = {
        participant:'',
        competitionAddress:'',
        rank:-2
    }

    
    verifyParticipant = async event => {
        event.preventDefault();
        //Get an instance of web3
        const web3 = getweb3();
        const contract = new web3.eth.Contract(
            JSON.parse(compiledContract.interface),
            this.state.competitionAddress
        );
        let rankCode = await contract.methods.getRank(this.state.participant).call();
        console.log(rankCode);
        //this.state.rank = rankCode;
        this.setState({ rank: rankCode });
        //Router.pushRoute(`/`);
    }

    renderMessageBox(){
        

        if (this.state.rank == -2 ){
            return (
                <Message content="Enter the address of the participant and the competition." />
            )
        }
        else if (this.state.rank == -1 ){
            return (
                <Message info header="Participation Confirmed!" content="This address participated in the competition. The participant might not be a rank holder." />
            )
        }
        else if (this.state.rank == 0 ){
            return (
                <Message negative header="Oops!" content="This address did not participate in the competition." />
            )
        }
        else if (this.state.rank == 1 ){
            return (
                <Message positive header="First Rank!" content="This participant stood first in the competition." />
            )
        }
        else if (this.state.rank == 2 ){
            return (
                <Message positive header="Second Rank!" content="This participant stood second in the competition." />
            )
        }
        else if (this.state.rank == 3 ){
            return (
                <Message positive header="Third Rank!" content="This participant stood third in the competition." />
            )
        }
        else {
            return (
                <Message info header="Participation Confirmed!" content="This address participated in the competition." />
            )
        }
    }

    render(){

        return (
            <Layout>
                <div>
                    <Link route={`/`}>
                        <a>Back</a>
                    </Link>
                    <h3>Verify</h3>
                </div>

                <br/><br/>
                <Form onSubmit={this.verifyParticipant}>
                    <Form.Field>
                        <label>Competition Address</label>
                        <Input
                            fluid
                            placeholder="Enter the address of the competition."
                            value={this.state.competitionAddress}
                            onChange={event => this.setState({competitionAddress: event.target.value })}
                        />
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

                {this.renderMessageBox()}

                
                

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

export default VerifyIndex;