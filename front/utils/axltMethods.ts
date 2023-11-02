import { ethers } from 'ethers'
import axltAbi from '../services/contracts/axlt_abi.json'
import { usdtMethods } from './usdtMethods'
import { MetamaskAdapter } from '../services/wallets/metamaskAdapter'
import { formatterNumber } from './formatterNumber'

export class axltMethods {
  metamaskWallet
  walletAddress
  signer
  tokenAddress
  contract: ethers.Contract
  usdtMethods

  constructor() {
    if (typeof window !== 'undefined') {
      this.metamaskWallet = new MetamaskAdapter()
      this.metamaskWallet.getAddress().then((walletAddress) => (this.walletAddress = walletAddress))
      this.tokenAddress = process.env.NEXT_PUBLIC_AXLT_TOKEN
      this.metamaskWallet.getSigner().then((signer) => {
        this.signer = signer
        this.contract = new ethers.Contract(this.tokenAddress, axltAbi, this.signer)
      })
      this.usdtMethods = new usdtMethods()
    }
  }

  getAxltOwnerAddress = async () => {
    try {
      return await this.contract.owner()
    } catch (error) {
      console.error(error)
    }
  }

  getIsActiveAccount = async (address: string) => {
    try {
      return await this.contract.activeAccounts(address)
    } catch (error) {
      console.error(error)
    }
  }

  getUserLine = async (address: string) => {
    try {
      const res = await this.contract.userLine(`${address}`)
      return res.toNumber()
    } catch (error) {
      console.error(error)
    }
  }

  getRateIncrement = async () => {
    try {
      return await this.contract.rateIncrement()
    } catch (error) {
      console.error(error)
    }
  }

  getProfitCalculation = async (address: string) => {
    try {
      const res = await this.contract.profitCalculation(`${address}`)
      return res
    } catch (error) {
      console.error(error)
    }
  }

  tokenForUsdt = async (amountAxlt: string) => {
    try {
      const res = await this.contract.getTokenForUsdt(ethers.utils.parseEther(`${amountAxlt}`))
      return formatterNumber(res)
    } catch (error) {
      console.error(error)
    }
  }

  priceLine = async (rateLine: string) => {
    try {
      const res = await this.contract.getPriceLine(rateLine)
      return formatterNumber(res)
    } catch (error) {
      console.error(error)
    }
  }

  exchangeRate = async () => {
    try {
      const res = await this.contract.getExchangeRate()
      return formatterNumber(res)
    } catch (error) {
      console.error(error)
    }
  }

  getBalanceOfPayable = async () => {
    try {
      const res = await this.contract.balanceOfPayable()
      return formatterNumber(res)
    } catch (error) {
      console.error(error)
    }
  }

  getDepositLimitMap = async (amountUsdt: string) => {
    try {
      return await this.contract.depositLimitMap(ethers.utils.parseEther(`${amountUsdt}`))
    } catch (error) {
      console.error(error)
    }
  }

  countTransaction = async () => {
    try {
      return await this.contract.getCountTransaction()
    } catch (error) {
      console.error(error)
    }
  }

  getBalanceOfNonPayable = async () => {
    try {
      const res = await this.contract.balanceOfNonPayable()
      return formatterNumber(res)
    } catch (error) {
      console.error(error)
    }
  }

  getWithdrawUsdt = async (amountUsdt: string) => {
    try {
      return await this.contract.withdrawUsdt(
        `${process.env.NEXT_PUBLIC_USDT_TOKEN}`,
        ethers.utils.parseEther(`${amountUsdt}`)
      )
    } catch (error) {
      console.error(error)
    }
  }

  getWithdrawTokens = async () => {
    try {
      return await this.contract.withdrawTokens()
    } catch (error) {
      console.error(error)
    }
  }

  getTransferContractsOwnership = async (walletAddress: string) => {
    try {
      return await this.contract.transferContractsOwnership(`${walletAddress}`)
    } catch (error) {
      console.error(error)
    }
  }

  getBuyToken = async (amountUsdt: string) => {
    try {
      const tokensAmount = async () => {
        const transactions = await this.countTransaction()

        if (transactions < 1001 && +amountUsdt > 100) {
          return 100000000000000000000
        }

        if (transactions < 2001 && +amountUsdt > 150) {
          return 150000000000000000000
        }

        if (transactions < 3001 && +amountUsdt > 225) {
          return 225000000000000000000
        }

        if (transactions < 6001 && +amountUsdt > 337.5) {
          return 337500000000000000000
        }

        if (transactions < 14001 && +amountUsdt > 500) {
          return 500000000000000000000
        }

        return +amountUsdt * 1000000000000000000
      }

      const res = await this.usdtMethods.approve(amountUsdt)

      return res && (await this.contract.buyToken(`${await tokensAmount()}`))
    } catch (error) {
      console.error(error)
    }
  }

  getBuyLine = async () => {
    try {
      const linesPrices = {
        1: 150,
        2: 250,
        3: 350,
        4: 450,
        5: 500,
      }

      const currentUserLine = await this.getUserLine(this.walletAddress)
      const res = await this.usdtMethods.approve(linesPrices[`${currentUserLine + 1}`])
      return res && (await this.contract.buyLine())
    } catch (error) {
      console.error(error)
    }
  }

  getAdditionToLiquidity = async (amountUsdt: string) => {
    try {
      const res = await this.usdtMethods.approve(amountUsdt)
      return res && (await this.contract.additionToLiquidity(ethers.utils.parseEther(`${amountUsdt}`)))
    } catch (error) {
      console.error(error)
    }
  }

  getActivateAndBindSponsor = async (sponsorAddress: string) => {
    try {
      const amountUsdt = '50'
      const res = await this.usdtMethods.approve(amountUsdt)

      await res.wait()

      await this.contract.estimateGas.activateAndBindSponsor(`${sponsorAddress}`)

      const tx = await this.contract.activateAndBindSponsor(`${sponsorAddress}`)

      return tx
    } catch (error) {
      console.error(error)
    }
  }

  getBalanceAxlt = async () => {
    try {
      const res = await this.contract.balanceOf(this.walletAddress)
      return formatterNumber(res)
    } catch (error) {
      console.error(error)
    }
  }
}
