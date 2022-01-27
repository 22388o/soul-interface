import { ChainId } from 'sdk'
import { Feature } from 'enums'

type FeatureMap = { readonly [chainId in ChainId]?: Feature[] }

const features: FeatureMap = {
  [ChainId.MAINNET]: [
    Feature.AMM,
    // Feature.LIQUIDITY_MINING,
    // Feature.BENTOBOX,
    // Feature.KASHI,
    // Feature.MIGRATE,
    // Feature.ANALYTICS,
    // Feature.STAKING,
    // Feature.MISO,
    // Feature.INARI,
    // Feature.VESTING,
  ],
  [ChainId.BSC]: [Feature.AMM, Feature.ANALYTICS],

  [ChainId.FANTOM]: [Feature.AMM,
    Feature.STAKING,
    Feature.ANALYTICS,
    Feature.LIQUIDITY_MINING,
    // Feature.LIMIT_ORDERS,
    Feature.COFFINBOX],

  [ChainId.FANTOM_TESTNET]: [Feature.AMM],
  
//   [ChainId.MATIC_TESTNET]: [Feature.AMM],
//   [ChainId.HARMONY]: [Feature.AMM, Feature.LIQUIDITY_MINING, Feature.ANALYTICS],
//   [ChainId.HARMONY_TESTNET]: [Feature.AMM],
//   [ChainId.AVALANCHE]: [Feature.AMM, Feature.COFFINBOX, Feature.KASHI, Feature.LIMIT_ORDERS],
//   [ChainId.AVALANCHE_TESTNET]: [Feature.AMM],
//   [ChainId.OKEX]: [Feature.AMM],
//   [ChainId.OKEX_TESTNET]: [Feature.AMM],
//   [ChainId.XDAI]: [Feature.AMM, Feature.LIQUIDITY_MINING, Feature.ANALYTICS, Feature.COFFINBOX, Feature.KASHI],
//   [ChainId.MOONRIVER]: [Feature.AMM, Feature.LIQUIDITY_MINING, Feature.ANALYTICS],
//   [ChainId.CELO]: [Feature.AMM, Feature.LIQUIDITY_MINING, Feature.ANALYTICS],
//   [ChainId.ARBITRUM]: [Feature.AMM, Feature.LIQUIDITY_MINING, Feature.ANALYTICS, Feature.COFFINBOX, Feature.KASHI],
//   [ChainId.FUSE]: [Feature.AMM, Feature.LIQUIDITY_MINING, Feature.ANALYTICS],
}

export default features