import { ChainId } from '../sdk'

const Mainnet = '/images/networks/mainnet-network.jpg'
const Telos = '/images/networks/telos.png'
const Binance = '/images/networks/bsc.png'
const Fantom = '/images/networks/fantom-network.jpg'

export const NETWORK_ICON = {
  [ChainId.ETHEREUM]: Mainnet,
  [ChainId.TELOS]: Telos,
  [ChainId.BSC]: Binance,
  [ChainId.FANTOM]: Fantom,
  [ChainId.FANTOM_TESTNET]: Fantom,
}

export const NETWORK_LABEL: { [chainId in ChainId]?: string } = {
  [ChainId.ETHEREUM]: 'Ethereum',
  [ChainId.TELOS]: 'Telos',
  [ChainId.BSC]: 'Binance',
  [ChainId.FANTOM]: 'Fantom',
  [ChainId.FANTOM_TESTNET]: 'Testnet',
}
