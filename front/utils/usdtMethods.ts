import {MetamaskAdapter} from "../services/wallets/metamaskAdapter";
import {ethers} from "ethers";
import usdtAbi from "../services/contracts/usdt_abi.json";

export class usdtMethods {
  metamaskWallet
  walletAddress
  signer
  tokenAddress
  contract

  constructor() {
    if (typeof window !== 'undefined') {
      this.metamaskWallet = new MetamaskAdapter()
      this.walletAddress = this.metamaskWallet.getAddress()
      this.tokenAddress = process.env.NEXT_PUBLIC_USDT_TOKEN
      this.metamaskWallet.getSigner().then(signer => {
        this.signer = signer
        this.contract = new ethers.Contract(this.tokenAddress, usdtAbi, this.signer)
      })
    }
  }

  approve = async (amount: string) => {
    try {
      return await this.contract.approve(process.env.NEXT_PUBLIC_AXLT_TOKEN, ethers.utils.parseEther(`${amount}`))
    } catch (error) {
      console.error(error)
    }
  }
}