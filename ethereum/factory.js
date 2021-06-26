//Tell web3 that a deployed copy of the 'CompetitionContractFactory.json' exists
import web3 from './web3';
import VaccineContractFactory from './build/CompetitionContractFactory.json';

const factory = new web3.eth.Contract(
    JSON.parse(VaccineContractFactory.json.interface),
    '0xE54e08740C1E1CEB4665CcFFd845e98155c08676'
);

export default factory;
