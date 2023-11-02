export type BlockchainProvider = {
    name: string
    id: {
        hex: string
        number: number
    }
    nativeCurrency: {
        name: string
        symbol: string
        decimals: number
    }
    rpcUrls: string[]
    img?: string
    fcdURL?: string
    lcdURL?: string
}
export enum ChainEnum {
    Ethereum = '0x1',
}

export const mainnet: Record<ChainEnum, BlockchainProvider> = {
    [ChainEnum.Ethereum]: {
        name: 'Ethereum Mainnet',
        id: {
            hex: '0x1',
            number: 1,
        },
        nativeCurrency: {
            name: 'ETH',
            symbol: 'ETH',
            decimals: 18,
        },
        rpcUrls: ['https://mainnet.infura.io/v3/'],
    },
}

export const testnet: Record<ChainEnum, BlockchainProvider> = {
    [ChainEnum.Ethereum]: {
        name: 'BNB Smart Chain Test Network',
        id: {
            hex: '0x61',
            number: 61,
        },
        nativeCurrency: {
            name: 'tBNB',
            symbol: 'tBNB',
            decimals: 18,
        },
        rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
    },
}

export const chain: Record<ChainEnum, BlockchainProvider> =
    process.env.NEXT_PUBLIC_BRANCH === 'main' ? mainnet : testnet
