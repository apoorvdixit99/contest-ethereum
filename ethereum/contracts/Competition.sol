pragma solidity ^0.4.17;

contract CompetitionContractFactory {
    
    address[] public deployedContracts;
    
    function createContract(string competitionName) public {
        address newContract = new Competition(competitionName, msg.sender);
        deployedContracts.push(newContract);
    }
    
    function getDeployedContracts() public view returns (address[]) {
        return deployedContracts;
    }
}

contract Competition {
    
    address public organizer;
    string public name;
    mapping(address => int) private participants;
    
    function Competition(string competitionName, address competitionOrganizer) public {
        name = competitionName;
        organizer = competitionOrganizer;
    }
    
    function participate() public {
        require(msg.sender != organizer);   //organizer should not be the participant
        require(participants[msg.sender]==0);   //participant should not already by registered
        participants[msg.sender] = -1;  //-1 is used to denote a participant
    }
    
    function setWinner(address winner, int rank) public payable {
        require(msg.sender == organizer);   //only organizer can call this function
        require(participants[winner] != 0); //winner should be a participant
        participants[winner] = rank;    //1,2,3,... is the rank
        winner.transfer(msg.value); //if specified
    }
    
    function getRank(address participant) public view returns (int) {
        return participants[participant];   //-1 is participant, 0 is not a participant, 1,2,3,... is prize winner
    }
    
    /*
    
    Remix addresses
    ===============
    
    organizer
    0x5B38Da6a701c568545dCfcB03FcB875f56beddC4
    
    participants
    0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2  - rank 1
    0xCA35b7d915458EF540aDe6068dFe2F44E8fa733c
    0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db
    0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB
    
    not a participant
    0x617F2E2fD72FD9D5503197092aC168c91465E7f2
    
    */
    
}
