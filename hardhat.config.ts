import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require('dotenv').config();

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  mocha: {
    timeout: 100000000
  },
  networks: {
    hardhat: {},
    localhost: {
      url: "http://localhost:8545",
      accounts: {
        mnemonic: "test test test test test test test test test test test junk",
      },
    },
    tbsc: {
      url: "https://bsc-testnet.publicnode.com",
      accounts: [process.env.MY_PRIVATE_KEY as string],
      gasPrice: 35000000000,
      timeout: 600000
    }
  },
  solidity: {
    version: "0.8.18",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  etherscan: {
    apiKey: {
      bscTestnet: ''
    }
  }
};

export default config;
