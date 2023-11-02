import {BlockchainProvider, ChainEnum} from "../services/wallets/blockchainProvider";
import {EWalletProvider} from "./wallets";
import {JsonRpcProvider, JsonRpcSigner} from "@ethersproject/providers";


export type WalletAdapter = {
    connect: (chainId: ChainEnum) => Promise<string>
    getAddress: () => Promise<string>
    disconnect?: () => Promise<void>
    getChainId?: () => Promise<ChainEnum>
    getProvider?: () => JsonRpcProvider | null
    getSigner?: () => Promise<JsonRpcSigner | null>
    sign?: (message: string) => Promise<string>
    switchChain?: (chain: BlockchainProvider) => Promise<boolean>
    providerId: EWalletProvider
}

export type TxBase = { _hex: string; isBigNumber: boolean; hash: string }
export type TxResult = { success: boolean }
