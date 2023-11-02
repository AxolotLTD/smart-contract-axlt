const { ethers } = require("hardhat");

import { ContractFactory, Contract } from "ethers";
import { LiquidityPool, USDT, AXLT } from "../typechain-types";

async function main() {
  
  // const usdtFactory = await ethers.getContractFactory(
  //   "BEP20Token"
  // );
  
  // const usdt = (await usdtFactory.deploy());
  // console.log('BUSD(TTK) deployed at: ', await usdt.getAddress());
  
  const AXLTFactory = await ethers.getContractFactory('AXLT');
  const AXLT = (await AXLTFactory.deploy("0x5eBBDFa0936CA66814F195B8c504C420292E0B0e"));

  console.log('AXLT deployed at: ', await AXLT.getAddress());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
