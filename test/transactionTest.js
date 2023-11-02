const { ethers, network } = require("hardhat");
require('dotenv').config()
const prompt = require("prompt-sync")({ sigint: true })
var fs = require('fs')

async function Before() {
    usdtFactory = await ethers.getContractFactory('contracts/TestToken/BUSD.sol:BEP20Token');
    usdt = await usdtFactory.attach("0x5eBBDFa0936CA66814F195B8c504C420292E0B0e");
    

    axltFactory = await ethers.getContractFactory('contracts/AXLTBEP20.sol:AXLT');
    axlt = await axltFactory.attach("0x93e6b675929e100BFB749368ACFcA40e618c7b50");

    const countOfTransaction = await prompt("How many iteration (buy + withdraw = 1 iteration) do you want: ");
    await usdt.approve("0x93e6b675929e100BFB749368ACFcA40e618c7b50", 101 * countOfTransaction + "000000000000000000");
    return countOfTransaction;
}

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
  
let counter = 0;
  
async function main() {
    if (await axlt.balanceOf(process.env.MY_ADDRESS) != 0n) {
        console.log(await axlt.balanceOf(process.env.MY_ADDRESS));
        await sleep(5000);
        await axlt.withdrawTokens();
        await sleep(30005);
    } 
    let a = await axlt.getExchangeRate() + ";" + await axlt.getCountTransaction() + "\n";
    fs.appendFile('tx.txt', a, (err) => {
        if(err) throw err;
        console.log(a);
    });
    await axlt.buyToken("100000000000000000000");
    await sleep(30005); 
    let b = await axlt.getExchangeRate() + ";" + await axlt.getCountTransaction() + "\n";
    fs.appendFile('tx.txt', b, (err) => {
        if(err) throw err;
        console.log(b);
    });
    await axlt.withdrawTokens();
}
  
(async () => {
    
    fs.open('tx.txt', 'w', (err) => {
        if(err) throw err;
        console.log('File created');
    });

    let countOfTransaction = Number(await Before())
    await sleep(20005);
    console.log("exchangeRate;counttransaction");
while (countOfTransaction != 0) {
    try {
        countOfTransaction--;
        await main();
        await sleep(30005); 
    } catch (e) {
        console.log('Error: \"' + e + '\"! Trying again')
        countOfTransaction++;
    }
}
})();