import React, { Component } from 'react';
import Layout from '../components/Layout';
import { Form, Input, Button } from 'semantic-ui-react';
import { Link, Router } from '../routes';

import Web3 from 'web3';

const compiledFactory = require('../ethereum/build/CompetitionContractFactory.json');
const compiledContract = require('../ethereum/build/Competition.json');

function getweb3() {
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


class CompetitionNew extends Component {

    state = {
        competitionName:'',
        organizer:''
    }

    deployContract = async event => {
        event.preventDefault();
        //Get an instance of web3
        const web3 = getweb3();
        const factory = new web3.eth.Contract(
            JSON.parse(compiledFactory.interface),
            '0xE54e08740C1E1CEB4665CcFFd845e98155c08676'
        );
        await factory.methods.createContract(this.state.competitionName).send({
            from: this.state.organizer
        });
        Router.pushRoute(`/`);
    }

    render(){
        return (
            <Layout>
                <Link route={`/`}><a>Back</a></Link>
                <h3>Create a New Competition</h3>
                <Form onSubmit={this.deployContract}>
                    <Form.Field>
                        <label>Organizer Address</label>
                        <Input
                            fluid
                            placeholder="Enter the address of the organizer."
                            value={this.state.organizer}
                            onChange={event => this.setState({organizer: event.target.value })}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Competition Name</label>
                        <Input
                            fluid
                            placeholder="Enter the Name of the Competition"
                            value={this.state.competitionName}
                            onChange={event => this.setState({competitionName: event.target.value })}
                        />
                    </Form.Field>
                    <Button primary>Deploy!</Button>
                </Form>
            </Layout>
        );
    }
}

export default CompetitionNew;
