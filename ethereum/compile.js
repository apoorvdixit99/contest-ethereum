const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

//Delete build folder
const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

//Read Campaign.sol from compile folder
const contractPath = path.resolve(__dirname, 'contracts','Competition.sol');
const source = fs.readFileSync(contractPath, 'utf-8');

//Compile both contracts with solidity compiler
const output = solc.compile(source, 1).contracts;

//Create build folder
fs.ensureDirSync(buildPath);

//Write output to the build directory
for(let contract in output){
    fs.outputJSONSync(
        path.resolve(buildPath, contract.replace(':','') + '.json'),
        output[contract]
    );
}
