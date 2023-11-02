import { ethers } from 'hardhat';
// import { Contract, ContractFactory } from "ethers";

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    const usdt = await ethers.deployContract("USDT");
    
    console.log('Test USDT deployed at: ', await usdt.getAddress());
}   

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
