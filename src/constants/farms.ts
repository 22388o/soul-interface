import { ChainId } from '../sdk'

export type TokenInfo = {
  id: string
  name: string
  symbol: string
  decimals?: number
}

type PairInfo = {
  id: number
  token0: TokenInfo
  token1?: TokenInfo
  name?: string
  symbol?: string
}

type AddressMap = {
  [chainId: number]: {
    [address: string]: PairInfo
  }
}

export const POOLS: AddressMap = {
  [ChainId.FANTOM]: {
     '0xe2fb177009FF39F52C0134E8007FA0e4BaAcBd07': {
      id: 0,
      token0: {
        id: '0xe2fb177009FF39F52C0134E8007FA0e4BaAcBd07', // SOUL
      name: 'SoulPower',
      symbol: 'SOUL',
      decimals: 18,
      },
    }, 
    '0xa2527Af9DABf3E3B4979d7E0493b5e2C6e63dC57': { // SOUL-FTM
    id: 1, // 1600
    token0: {
      id: '0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83', // WFTM
      name: 'Wrapped Fantom',
      symbol: 'FTM',
      decimals: 18,
    },
    token1: {
      id: '0xe2fb177009FF39F52C0134E8007FA0e4BaAcBd07', // SOUL
      name: 'SoulPower',
      symbol: 'SOUL',
      decimals: 18,
    },
  },
    '0x160653F02b6597E7Db00BA8cA826cf43D2f39556': { // FTM-USDC 
      id: 2,
      token0: {
        id: '0x04068DA6C83AFCFA0e13ba15A6696662335D5B75', // USDC
        name: 'USDC Coin',
        symbol: 'USDC',
        decimals: 6,
      },
      token1: {
        id: '0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83', // WFTM
        name: 'Wrapped Fantom',
        symbol: 'FTM',
        decimals: 18,
      },
    },
    '0x9e7711eAeb652d0da577C1748844407f8Db44a10': { // SOUL-FUSD 
      id: 3,
      token0: {
        id: '0xAd84341756Bf337f5a0164515b1f6F993D194E1f', // FUSD
        name: 'Fantom USD',
        symbol: 'FUSD',
        decimals: 18,
      },
      token1: {
        id: '0xe2fb177009FF39F52C0134E8007FA0e4BaAcBd07', // SOUL
        name: 'SoulPower',
        symbol: 'SOUL',
        decimals: 18,
      },
    },
      '0xC615a5fd68265D9Ec6eF60805998fa5Bb71972Cb': { // FTM-ETH
        id: 4,
        token0: {
          id: '0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83', // WFTM
          name: 'Wrapped Fantom',
          symbol: 'FTM',
          decimals: 18,
        },
        token1: {
          id: '0x74b23882a30290451A17c44f4F05243b6b58C76d', // WETH
          name: 'Wrapped ETH',
          symbol: 'WETH',
          decimals: 18,
        },  
      },
        '0x8f1E15cD3d5a0bb85B8189d5c6B61BB64398E19b': { // SEANCE-SOUL
          id: 5, // 600
          token0: {
            id: '0x124B06C5ce47De7A6e9EFDA71a946717130079E6', // SEANCE
            name: 'SeanceCircle',
            symbol: 'SEANCE',
            decimals: 18,

          },
          token1: {
            id: '0xe2fb177009FF39F52C0134E8007FA0e4BaAcBd07', // SOUL
            name: 'SoulPower',
            symbol: 'SOUL',
            decimals: 18,
          },
        },
        '0xD5F5E2638d636A98eD4aAEBfd2045441316e0c08': {  // USDC-FUSD
          id: 6,
          token0: {
            id: '0x04068da6c83afcfa0e13ba15a6696662335d5b75', // USDC
            name: 'USDC Coin',
            symbol: 'USDC',
            decimals: 6,
          },
          token1: {
            id: '0xAd84341756Bf337f5a0164515b1f6F993D194E1f', // FUSD
            name: 'Fantom USD',
            symbol: 'FUSD',
            decimals: 18,
          },
        },
        '0x98C678d3C7ebeD4a36B84666700d8b5b5Ddc1f79': {  // SEANCE-USDC
          id: 7, // 400
          token0: { // USDC
            id: '0x04068DA6C83AFCFA0e13ba15A6696662335D5B75', // USDC
            name: 'USDC Coin',
            symbol: 'USDC',
            decimals: 6,
          },
          token1: { // SEANCE
            id: '0x124B06C5ce47De7A6e9EFDA71a946717130079E6', // SEANCE
            name: 'SeaceCircle',
            symbol: 'SEANCE',
            decimals: 18,
        },
      },
        '0x1FC954d3484bC21E0Ce53A6648a35BBfc03DC9D0': {  // BTC-ETH
          id: 8,
          token0: { // BTC
            id: '0x321162Cd933E2Be498Cd2267a90534A804051b11', // WBTC
            name: 'Wrapped Bitcoin',
            symbol: 'WBTC',
            decimals: 8,
          },
          token1: { // WETH
            id: '0x74b23882a30290451A17c44f4F05243b6b58C76d', // WETH
            name: 'Wrapped Ethereum',
            symbol: 'WETH',
            decimals: 18,
        },
      },
      '0x298c12D6d9D6746Dd0ef0A89421288F52D5566eF': {  // USDC-USDT
        id: 9,
        token0: { // USDC
          id: '0x04068DA6C83AFCFA0e13ba15A6696662335D5B75', // USDC
          name: 'USDC Coin',
          symbol: 'USDC',
          decimals: 6,
        },
        token1: {
          id: '0x049d68029688eAbF473097a2fC38ef61633A3C7A', // fUSDT
          name: 'Frapped USDT',
          symbol: 'fUSDT',
          decimals: 6,
      },
    },
    '0x8542bEAC34282aFe5Bb6951Eb6DCE0B3783b7faB': {  // SEANCE-FTM
      id: 10, // 1200
      token0: {
        id: '0x124B06C5ce47De7A6e9EFDA71a946717130079E6', // SEANCE
        name: 'SeaceCircle',
        symbol: 'SEANCE',
        decimals: 18,
      },
      token1: {
        id: '0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83', // WFTM
        name: 'Wrapped Fantom',
        symbol: 'FTM',
        decimals: 18,
      },
    },
    '0x124D8CA33E29D1090a844e4C896DD16A360B1c96': {  // GRIM-FTM
      id: 11,
      token0: {
        id: '0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83', // WFTM
        name: 'Wrapped Fantom',
        symbol: 'FTM',
        decimals: 18,
      },
      token1: {
        id: '0x7eC94C4327dC757601B4273cD67014d7760Be97E', // GRIM
        name: 'GrimToken',
        symbol: 'GRIM',
        decimals: 18,
      },
    },
    '0x7D776489372c8AFC0A1941a1335C9e9f90e0116a': {  // REAPER-FTM
      id: 12,
      token0: {
        id: '0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83', // WFTM
        name: 'Wrapped Fantom',
        symbol: 'FTM',
        decimals: 18,
      },
      token1: {
        id: '0x117dB78176C8eDe4F12fCd29d85Cd96b91A4cbBb', // REAPER
        name: 'ReaperToken',
        symbol: 'REAPER',
        decimals: 18,
      },
    },
    '0xecB41D6B5885E75a149EDA173e92267aa271D895': {  // FTM-BTC
      id: 13,
      token0: {
        id: '0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83', // WFTM
        name: 'Wrapped Fantom',
        symbol: 'FTM',
        decimals: 18,
      },
      token1: {
        id: '0x321162Cd933E2Be498Cd2267a90534A804051b11', // WBTC
        name: 'Wrapped Bitcoin',
        symbol: 'WBTC',
        decimals: 8,
      },
    },
    '0xdC24814AD654986928F8E4aec48D37fa30bBC5BB': {  // FTM-USDT
      id: 14,
      token0: {
        id: '0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83', // WFTM
        name: 'Wrapped Fantom',
        symbol: 'FTM',
        decimals: 18,
      },
      token1: {
        id: '0x049d68029688eAbF473097a2fC38ef61633A3C7A', // USDT
        name: 'Frapped USDT',
        symbol: 'fUSDT',
        decimals: 6,
      },
    },
    '0x5b181BBc3Cc18C66B6f36f584866a1ff09865630': {  // ETH-USDC
      id: 15, // 600
      token0: {
        id: '0x74b23882a30290451A17c44f4F05243b6b58C76d', // WETH
        name: 'Wrapped Ethereum',
        symbol: 'WETH',
        decimals: 18,
      },
      token1: {
        id: '0x04068DA6C83AFCFA0e13ba15A6696662335D5B75', // USDC
        name: 'USD Coin',
        symbol: 'USDC',
        decimals: 6,
      },
    },
    '0xe637D90A993EDBD75AC09E9fcB16313D193B9451': {  // DAI-gfUSDT
      id: 16, // 200
      token0: {
        id: '0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E', // DAI
        name: 'Dai Stablecoin',
        symbol: 'DAI',
        decimals: 18,
      },
      token1: {
        id: '0x940F41F0ec9ba1A34CF001cc03347ac092F5F6B5', // gfUSDT
        name: 'Geist fUSDT',
        symbol: 'gFUSDT',
        decimals: 6,
      },
    },
    '0xC1EdFbA9811B696bDFd07d31eD5FF702e031364E': {  // BNB-DAI
      id: 17, // 400
      token0: {
        id: '0xD67de0e0a0Fd7b15dC8348Bb9BE742F3c5850454', // BNB
        name: 'Binance',
        symbol: 'BNB',
        decimals: 18,
      },
      token1: {
        id: '0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E', // DAI
        name: 'Dai Stablecoin',
        symbol: 'DAI',
        decimals: 18,
      },
    },
    '0x52966a12e3211c92909C28603ca3df8465c06c82': {  // BNB-FTM
      id: 18, // 600
      token0: {
        id: '0xD67de0e0a0Fd7b15dC8348Bb9BE742F3c5850454', // BNB
        name: 'Binance',
        symbol: 'BNB',
        decimals: 18,
      },
      token1: {
        id: '0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83', // WFTM
        name: 'Wrapped FTM',
        symbol: 'FTM',
        decimals: 18,
      },
    },
    '0x34990FC1e6e3169DCf23624049be29782AFc81bd': {  // MIM-FTM
      id: 19, // 600
      token0: {
        id: '0x82f0B8B456c1A451378467398982d4834b6829c1', // MIM
        name: 'Magic Internet Money',
        symbol: 'MIM',
        decimals: 18,
      },
      token1: {
        id: '0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83', // WFTM
        name: 'Wrapped FTM',
        symbol: 'FTM',
        decimals: 18,
      },
    },
    '0xE2d39F7f0c8517Ca2058Fa97eB3D8d4928F7C6D6': {  // BTC-USDC
      id: 20, // 400
      token0: {
        id: '0x04068DA6C83AFCFA0e13ba15A6696662335D5B75', // USDC
        name: 'USD Coin',
        symbol: 'USDC',
        decimals: 6,
      },
      token1: {
        id: '0x321162Cd933E2Be498Cd2267a90534A804051b11', // WBTC
        name: 'Wrapped BTC',
        symbol: 'WBTC',
        decimals: 8,
      },
    },
    '0x406dE3A93f6B4179E3B21a3d81226B43e1918fd9': {  // DAI-USDC
      id: 21, // 200
      token0: {
        id: '0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E', // DAI
        name: 'Dai Stablecoin',
        symbol: 'DAI',
        decimals: 18,
      },
      token1: {
        id: '0x04068DA6C83AFCFA0e13ba15A6696662335D5B75', // USDC
        name: 'USD Coin',
        symbol: 'USDC',
        decimals: 6,
      },
    },
    '0xC0A301f1E5E0Fe37a31657e8F60a41b14d01B0Ef': {  // SOUL-USDC
      id: 22, // 600
      token0: {
        id: '0xe2fb177009FF39F52C0134E8007FA0e4BaAcBd07', // SOUL
        name: 'SoulPower',
        symbol: 'SOUL',
        decimals: 18,
      },
      token1: {
        id: '0x04068DA6C83AFCFA0e13ba15A6696662335D5B75', // USDC
        name: 'USD Coin',
        symbol: 'USDC',
        decimals: 6,
      },
    },
    '0xF3d6E8Ecece8647B456d57375Ce0B51B8F0cD40b': {  // FTM-DAI
      id: 23, // 600
      token0: {
        id: '0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83', // WFTM
        name: 'Wrapped FTM',
        symbol: 'FTM',
        decimals: 18,
      },
      token1: {
        id: '0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E', // DAI
        name: 'Dai Stablecoin',
        symbol: 'DAI',
        decimals: 18,
      },
    },
    '0xb4d6Ff768F409e4D102BAD80f9A8ac105453ccdD': {  // ENCHANT-FTM
      id: 24, // 1200
      token0: {
        id: '0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83', // WFTM
        name: 'Wrapped FTM',
        symbol: 'FTM',
        decimals: 18,
      },
      token1: {
        id: '0x6a1a8368D607c7a808F7BbA4F7aEd1D9EbDE147a', // ENCHANT
        name: 'Enchantment',
        symbol: 'ENCHANT',
        decimals: 18,
      },
    },
    '0x9acc8F23680B6d7e295166277e2fb9c88A26cce6': {  // ENCHANT-SOUL
      id: 25, // 600
      token0: {
        id: '0x6a1a8368d607c7a808f7bba4f7aed1d9ebde147a', // ENCHANT
        name: 'Enchantment',
        symbol: 'ENCHANT',
        decimals: 18,
      },
      token1: {
        id: '0xe2fb177009ff39f52c0134e8007fa0e4baacbd07', // SOUL
        name: 'Soul Power',
        symbol: 'SOUL',
        decimals: 18,
      },
    },
    '0x5695176D085F8f7320507495066FFeC940da244C': {  // SEANCE-ENCHANT
      id: 26, // 600
      token0: {
        id: '0x124b06c5ce47de7a6e9efda71a946717130079e6', // SEANCE
        name: 'Seance Circle',
        symbol: 'SEANCE',
        decimals: 18,
      },
      token1: {
        id: '0x6a1a8368d607c7a808f7bba4f7aed1d9ebde147a', // ENCHANT
        name: 'Enchantment',
        symbol: 'ENCHANT',
        decimals: 18,
      },
    },
    '0x578c7B9A45D9e55246d3036D48db262b9B3CA48e': {  // SEANCE-UNIDEX
      id: 27, // 400
      token0: {
        id: '0x124b06c5ce47de7a6e9efda71a946717130079e6', // SEANCE
        name: 'Seance Circle',
        symbol: 'SEANCE',
        decimals: 18,
      },
      token1: {
        id: '0x2130d2a1e51112D349cCF78D2a1EE65843ba36e0', // UNIDX
        name: 'UniDex',
        symbol: 'UNIDX',
        decimals: 18,
      },
    },
    '0xE27Cc06a7F34892BC17a5474303b91b2C9F3F21A': {  // SOUL-FUSDT
      id: 28, // 600
      token0: {
        id: '0x049d68029688eAbF473097a2fC38ef61633A3C7A', // FUSDT
        name: 'Frapped USDT',
        symbol: 'fUSDT',
        decimals: 6,
      },
      token1: {
        id: '0xe2fb177009FF39F52C0134E8007FA0e4BaAcBd07', // SOUL
        name: 'Soul Power',
        symbol: 'SOUL',
        decimals: 18,
      },
    },
    '0x6c6f32008262666CA4acEd0a824c4945AB96e5F3': {  // ENCHANT-USDC
      id: 29, // 400
      token0: {
        id: '0x04068DA6C83AFCFA0e13ba15A6696662335D5B75', // USDC
        name: 'USDC Coin',
        symbol: 'USDC',
        decimals: 6,
      },
      token1: {
        id: '0x6a1a8368d607c7a808f7bba4f7aed1d9ebde147a', // ENCHANT
        name: 'Enchantment',
        symbol: 'ENCHANT',
        decimals: 18,
      },
    },
    '0xE3c700551c0D96202934969Ad219B8693a723d59': {  // SEANCE-SPIRIT
      id: 30, // 200
      token0: {
        id: '0x124b06c5ce47de7a6e9efda71a946717130079e6', // SEANCE
        name: 'Seance Circle',
        symbol: 'SEANCE',
        decimals: 18,
      },
      token1: {
        id: '0x5cc61a78f164885776aa610fb0fe1257df78e59b', // SPIRIT
        name: 'SpiritSwap Token',
        symbol: 'SPIRIT',
        decimals: 18,
      },
    },
    '0x26a30b02A8DFb3f573E3F881D04258461Cae47Db': {  // SEANCE-BOO
      id: 31, // 200
      token0: {
        id: '0x124b06c5ce47de7a6e9efda71a946717130079e6', // SEANCE
        name: 'Seance Circle',
        symbol: 'SEANCE',
        decimals: 18,
      },
      token1: {
        id: '0x841fad6eae12c286d1fd18d1d525dffa75c7effe', // BOO
        name: 'SpookyToken',
        symbol: 'BOO',
        decimals: 18,
      },
    },
    '0xa2cFc18F3A41E158DA173be0e4785F017Ff92a6e': {  // SEANCE-ZOO
      id: 32, // 200
      token0: {
        id: '0x124b06c5ce47de7a6e9efda71a946717130079e6', // SEANCE
        name: 'Seance Circle',
        symbol: 'SEANCE',
        decimals: 18,
      },
      token1: {
        id: '0x09e145A1D53c0045F41aEEf25D8ff982ae74dD56', // ZOO
        name: 'Zoo Coin',
        symbol: 'ZOO',
        decimals: 0,
      },
    },
    /* '0x75aE2E7B4f3a4b5F9048AD6966f6e975e510aD03': {  // SEANCE-TOMB
      id: 33, // 200
      token0: {
        id: '0x124b06c5ce47de7a6e9efda71a946717130079e6', // SEANCE
        name: 'Seance Circle',
        symbol: 'SEANCE',
        decimals: 18,
      },
      token1: {
        id: '0x6c021Ae822BEa943b2E66552bDe1D2696a53fbB7', // TOMB
        name: 'Tomb Token',
        symbol: 'TOMB',
        decimals: 18,
      },
    },
    '0xc0fEd4A6EDef23da7fF766D24F17Ecf454C16D25': {  // SEANCE-ICE
      id: 34, // 200
      token0: {
        id: '0x124b06c5ce47de7a6e9efda71a946717130079e6', // SEANCE
        name: 'Seance Circle',
        symbol: 'SEANCE',
        decimals: 18,
      },
      token1: {
        id: '0xf16e81dce15B08F326220742020379B855B87DF9', // ICE
        name: 'IceToken',
        symbol: 'ICE',
        decimals: 18,
      },
    },
    '0x63A1b4E3f210db7f1d4Ae7d29Bc0BC7F611e713a': {  // SEANCE-SPELL
      id: 35, // 200
      token0: {
        id: '0x124b06c5ce47de7a6e9efda71a946717130079e6', // SEANCE
        name: 'Seance Circle',
        symbol: 'SEANCE',
        decimals: 18,
      },
      token1: {
        id: '0x468003B688943977e6130F4F68F23aad939a1040', // SPELL
        name: 'Spell Token',
        symbol: 'SPELL',
        decimals: 18,
      },
    }, */
  }
  
}