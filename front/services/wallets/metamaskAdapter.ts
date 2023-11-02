import {chain as provider, BlockchainProvider, ChainEnum} from './blockchainProvider'
import {AsyncFunc} from "../../types/asyncFunc";
import {MetamaskCore} from "../metamask/metamask-core";
import {WalletAdapter} from "../../types/walletAdapter";
import {EWalletProvider} from "../../types/wallets";
import {ethers} from "ethers";
import {JsonRpcProvider, JsonRpcSigner} from "@ethersproject/providers";

const metamask = new MetamaskCore()

const openMetaMaskUrl = (url: string): void => {
  const a = document.createElement('a')

  a.href = url
  a.target = '_blank'
  a.click()
  a.remove()
}

export class MetamaskAdapter implements WalletAdapter {
  providerId = EWalletProvider.METAMASK

  getAddress: AsyncFunc<void, string> = async () => {
    try {
      const walletAddress: string[] = await metamask.ethereum?.request({
        method: 'eth_requestAccounts',
      })

      if(!walletAddress) return ''

      return walletAddress[0]
    } catch (e: any) {
      if (e.code === 4001) {
        console.warn('Please connect to MetaMask.')

        return ''
      }
      console.error(e)

      return ''
    }
  }

  connect: AsyncFunc<ChainEnum, string> = async id => {
    const chain = provider[id]

    if (metamask.isMetamask) {
      try {
        const chainId = await this.getChainId()

        const isCorrectChain = chainId === chain.id.hex

        if (isCorrectChain) {
          try {
            return await metamask.connectWallet()
          } catch (e) {
            console.warn(e)

            return ''
          }
        }

        const isSwitchSucceed = await this.switchChain(chain)

        if (isSwitchSucceed) return this.connect(id)

        return ''
      } catch (e) {
        console.warn('[SWITCH NETWORK]', e)

        return ''
      }
    } else {
      openMetaMaskUrl(`https://metamask.app.link/dapp/metaislands.ldtc.space/`)

      return ''
    }
  }

  disconnect = () => {
    throw new Error('Function not implemented')
  }

  getProvider = (): JsonRpcProvider | null => {
    try {
      return new ethers.providers.Web3Provider((window as any).ethereum)
    } catch (e) {
      console.warn(e)

      return null
    }
  }

  getSigner: AsyncFunc<void, JsonRpcSigner | null> = async () => {
    try {
      const signer: JsonRpcSigner = await new ethers.providers.Web3Provider(
        (window as any).ethereum
      ).getSigner()

      return signer
    } catch (e) {
      console.warn(e)

      return null
    }
  }

  getChainId: AsyncFunc<void, ChainEnum> = async () => {
    const chainId: ChainEnum = await metamask.ethereum.request({
      method: 'eth_chainId',
    })

    return chainId
  }

  sign: AsyncFunc<string, string> = async message => {
    try {
      const signer = await this.getSigner()

      if (signer) {
        return await signer.signMessage(message)
      }
      console.warn('Failed to get signature')

      return ''
    } catch (e) {
      console.warn('Failed to get signature')

      return ''
    }
  }

  switchChain: AsyncFunc<BlockchainProvider, boolean> = async (chain: BlockchainProvider) => {
    try {
      await metamask.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{chainId: chain.id.hex}],
      })

      return true
    } catch (switchError: any) {
      if (!switchError || switchError?.code === 4001) return false

      console.warn(switchError)

      try {
        await metamask.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: chain.id.hex,
              chainName: chain.name,
              nativeCurrency: {
                name: chain.nativeCurrency.name,
                symbol: chain.nativeCurrency.symbol,
                decimals: chain.nativeCurrency.decimals,
              },
              rpcUrls: chain.rpcUrls,
              iconUrls: [chain.img],
            },
          ],
        })

        return true
      } catch (addError) {
        console.warn(addError)

        return false
      }
    }
  }
}
