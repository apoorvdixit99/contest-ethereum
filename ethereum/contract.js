import web3 from './web3';
import Vaccine from './build/Competition.json';

export default (address) => {
    return new web3.eth.Contract(
        JSON.parse(Competition.interface),
        address
    );
};
