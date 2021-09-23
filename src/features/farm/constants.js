export const zeroAddress = '0x0000000000000000000000000000000000000000'

export const AnyswapEthOperaBridgeAddress = '0x5cbe98480a790554403694b98bff71a525907f5d'

export const Ethereum$FTM = '0x4E15361FD6b4BB609Fa63C81A2be19d873717870'

export const ContractScan = {
    1: 'https://etherscan.io/address/',
    250: 'https://ftmscan.com/address/',
    4002: 'https://testnet.ftmscan.com/address/',
}

// old: 0x27FCdd0DA2F9328Bd8Eede0e7F74e2E5a50a2e7D
// new: 0x0d36535b2666959a52c0c73CB940A59b1EbE9FD6
export const SoulSummonerAddress = '0xce6ccbB1EdAD497B4d53d829DF491aF70065AB5B'
export const SoulGuideAddress = '0xEd2Fb478f7fCef33E1E1d980a0135789B295a7F5' // SEP22

// export const SoulSummonerAddress = {
//     250: '0xce6ccbB1EdAD497B4d53d829DF491aF70065AB5B',
//     4002: '0x70C6A37244feD0Fa4e4148D5ffe38a209dCEd714',
// }
// connected chain -> targeted chain -> address
export const AnyswapBridge = {
    1: {
        250: '0x5cbe98480a790554403694b98bff71a525907f5d',
    },
    250: {
        1: '',
    }
}

// connected chain -> address
export const TokenFantom = {
    1: '0x4E15361FD6b4BB609Fa63C81A2be19d873717870',
}