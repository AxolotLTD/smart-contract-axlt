import Web3 from 'web3'
import {AddressNotFoundException} from "./address-not-found.exceptions";

export class MetamaskCore {
  // @ts-ignore
  ethereum?: typeof window.ethereum | null

  web3?: Web3 | null

  constructor() {
    if (typeof window !== 'undefined') {
      this.web3 = new Web3(Web3.givenProvider)
      // @ts-ignore
      this.ethereum = window?.ethereum
    }
  }

  public get isMetamask(): boolean {
    return this.ethereum?.isMetaMask
  }

  public async connectWallet(): Promise<string> {
    // @ts-ignore
    if (window.ethereum) {
      // @ts-ignore
      const accounts: string[] = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })

      return accounts[0]
    }
    throw new AddressNotFoundException()
  }
}
