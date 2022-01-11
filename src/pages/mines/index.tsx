import { InformationCircleIcon } from '@heroicons/react/solid'
import { SOUL_ADDRESS, WNATIVE } from 'sdk'
import Container from 'components/Container'
// import ExternalLink from 'components/ExternalLink'
import Search from 'components/Search'
import MineList from 'features/mines/MineList'
// import Menu from 'features/mines/components/MineMenu'
import Header from 'features/mines/components/Header'
import { usePositions, useSummonerInfo } from 'features/summoner/hooks'
import { classNames } from 'functions/styling'
import useFarmRewards from 'hooks/useFarmRewards'
import useFuse from 'hooks/useFuse'
import { useActiveWeb3React } from 'services/web3'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { POOLS } from 'constants/farms'
import { usePriceHelperContract } from 'features/bond/hooks/useContract'
import { useSingleCallResult } from 'state/multicall/hooks'
import { useSoulFarms } from 'features/mines/hooks'
import { useSoulSummonerContract } from 'hooks/useContract'
import { Button } from 'components/Button'
import { formatNumberScale } from 'functions'
import { addTransaction } from 'state/transactions/actions'
import useSummoner from 'features/summoner/useSummoner'
import { getAddress } from '@ethersproject/address'
import { useTVL } from 'hooks/useV2Pairs'

export default function Farm(): JSX.Element {
  const { chainId } = useActiveWeb3React()
  const [pendingTx, setPendingTx] = useState(false)

  const [liquidity, setLiquidity] = useState()
  const [apr, setApr] = useState()

  function useFarms() {
    return useSoulFarms(useSoulSummonerContract())
  }

  const farms = useFarms()
  const router = useRouter()
  const type = router.query.filter === null ? 'active' : (router.query.filter as string)

  const { harvest } = useSummoner()

  const farmingPools = Object.keys(POOLS[chainId]).map((key) => {
    return { ...POOLS[chainId][key], lpToken: key }
  })

  const tvlInfo = useTVL()

  const summonerInfo = useSummonerInfo()
  const positions = usePositions()

  const priceHelperContract = usePriceHelperContract()
  const rawSoulPrice = useSingleCallResult(priceHelperContract, 'currentTokenUsdcPrice', ['0xe2fb177009FF39F52C0134E8007FA0e4BaAcBd07'])?.result
  console.log(Number(rawSoulPrice))
  const soulPrice = Number(rawSoulPrice)
  console.log(soulPrice)

  const rawFtmPrice = useSingleCallResult(priceHelperContract, 'currentTokenUsdcPrice', ['0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83'])?.result
  console.log(Number(rawFtmPrice))
  const ftmPrice = Number(rawFtmPrice)
  console.log(ftmPrice)

  const map = (pool) => {
    pool.owner = 'SoulSwap'
    pool.balance = 0

    const pair = POOLS[chainId][pool.lpToken]

    const secondsPerHour = 60 * 60

    function getRewards() {
      const rewardPerSecond =
        ((pool.allocPoint / Number(summonerInfo.totalAllocPoint)) * Number(summonerInfo.soulPerSecond)) / 1e18

      const defaultReward = {
        token: 'SOUL',
        icon: '/images/token/soul.png',
        rewardPerSecond,
        rewardPerDay: rewardPerSecond * 86400,
        rewardPrice: soulPrice,
      }

      const defaultRewards = [defaultReward]

      return defaultRewards
    }

    // Fix this asap later
    function getTvl() {
      let lpPrice = 0
      let decimals = 18
      if (pool.lpToken == SOUL_ADDRESS[chainId]) {
        lpPrice = soulPrice * 1E18
        decimals = pair.token0?.decimals
      } else if (pool.lpToken.toLowerCase() == WNATIVE[chainId]) {
        lpPrice = ftmPrice * 1E18
        // } else if (pool.lpToken.toLowerCase() == SEANCE_ADDRESS[chainId].toLowerCase()) {
        //   lpPrice = seancePrice * 1E18
      } else {
        lpPrice = 0
      }
      // return lpPrice
      return Number(pool.totalLp) * lpPrice
    }

    const rewards = getRewards()

    const tvl = getTvl()

    const rewardPerSec =
      ((pool.allocPoint / Number(summonerInfo.totalAllocPoint)) * Number(summonerInfo.soulPerSecond)) / 1e18

    const rewardPrice = soulPrice

    // const roiPerSecond =
    //   farms.reduce((previousValue, currentValue) => {
    //     return previousValue + rewardPerSec * rewardPrice
    //   }, 0) / Number(tvl)

    const roiPerSecond = Number(tvl)

    const roiPerHour = roiPerSecond * 60 * 60
    const roiPerDay = roiPerHour * 24
    const roiPerMonth = roiPerDay * 30
    const roiPerYear = roiPerDay * 365

    const position = positions.find((position) => position.id === pool.id)

    return {
      ...pool,
      ...position,
      pair: {
        ...pair,
        decimals: 18,
      },
      roiPerSecond,
      roiPerHour,
      roiPerDay,
      roiPerMonth,
      roiPerYear,
      rewards,
      tvl,
      secondsPerHour,
    }
  }

  const FILTER = {
    my: (farm) => farm?.amount,
    active: (farm) => farm?.allocPoint > 0,
    inactive: (farm) => farm?.allocPoint == 0,
    soulswap: (farm) => farm?.allocPoint > 0 
      && (
            farm?.pair.token0?.symbol == 'SOUL'
            || farm?.pair.token0?.symbol == 'SEANCE'
            || farm?.pair.token0?.symbol == 'LUX'
            || farm?.pair.token0?.symbol == 'wLUM'

            || farm?.pair.token1?.symbol == 'SOUL'
            || farm?.pair.token1?.symbol == 'SEANCE'
            || farm?.pair.token1?.symbol == 'LUX'
            || farm?.pair.token1?.symbol == 'wLUM'
          ),
    single: (farm) => !farm.pair.token1,
    fantom: (farm) => farm?.allocPoint > 0 && (farm?.pair.token0?.symbol == 'FTM' || farm?.pair.token1?.symbol == 'FTM'),
    stables: (farm) => farm?.allocPoint == 200 // since all [active] stables have 200 AP <3
  }

  const rewards = useFarmRewards()

  const farmRewards = rewards.filter((farm) => {
    return type in FILTER ? FILTER[type](farm) : true
  })

  let summTvl = tvlInfo.reduce((previousValue, currentValue) => {
    return previousValue + currentValue.tvl
  }, 0)

  // const data = farms.map(map).filter((farm) => {
  //   return type in FILTER ? FILTER[type](farm) : true
  // })

  const data = farms.map(map).filter((farm) => {
    return type in FILTER ? FILTER[type](farm) : true
  })

  const options = {
    keys: ['pair.id', 'pair.token0.symbol', 'pair.token1.symbol'],
    threshold: 0.4,
  }

  const { result, term, search } = useFuse({
    data,
    options,
  })

  const allStaked = positions.reduce((previousValue, currentValue) => {
    return previousValue + (currentValue.pendingSoul / 1e18) * soulPrice
  }, 0)

  const valueStaked = positions.reduce((previousValue, currentValue) => {
    const pool = farmingPools.find((r) => parseInt(r.id.toString()) == parseInt(currentValue.id))
    const poolTvl = tvlInfo.find((r) => getAddress(r.lpToken) == getAddress(pool?.lpToken))
    return previousValue + (currentValue.amount / 1e18) * poolTvl?.lpPrice
  }, 0)

  return (
    <Container id="farm-page" className="grid h-full grid-cols-3 py-4 mx-auto sm:py-6 md:py-8 lg:py-12 gap-0" maxWidth="7xl">
      <Head>
        <title>Farm | Soul</title>
        <meta key="description" name="description" content="Farm SOUL" />
      </Head>

      <div className={classNames('top-0 block col-span-12')} style={{ maxHeight: '40rem' }}>
        <Header />
        <div className={`flex flex-col items-center justify-between px-6 py-6 `}>
          <div className="flex items-center text-center justify-between py-0 text-emphasis">
            {/* Total Value Locked: {formatNumberScale(summTvl + summTvlVaults, true, 2)} */}
            VALUE (TVL): {formatNumberScale(summTvl, true, 2)}
          </div>

          {positions.length > 0 && (
            <div className="flex items-center justify-between py-2 text-emphasis">
              DEPOSITED: {formatNumberScale(valueStaked, true, 2)}
            </div>
          )}
          {positions.length > 0 && (
            <Button
              color="blue"
              className="text-emphasis"
              // variant={'flexed'}
              variant="outlined"
              size={"sm"}
              // size={'nobase'}
              disabled={pendingTx}
              onClick={async () => {
                setPendingTx(true)
                for (const pos of positions) {
                  try {
                    const tx = await harvest(parseInt(pos.id))
                    addTransaction(tx)
                  } catch (error) {
                    console.error(error)
                  }
                }
                setPendingTx(false)
              }}
            >
              HARVEST ALL: {formatNumberScale(allStaked / 1E18, true, 2)}
            </Button>
          )}
        </div>
      </div>
      <div className={classNames('space-y-6 col-span-4 lg:col-span-3')}>
        <Search
          search={search}
          term={term}
          inputProps={{
            className:
              'relative w-full bg-transparent border border-transparent focus:border-gradient-r-blue-pink-dark-900 rounded placeholder-secondary focus:placeholder-primary font-bold text-base px-6 py-3.5',
          }}
        />
        {/* <div className="flex items-center text-lg font-bold text-high-emphesis whitespace-nowrap">
            Ready to Stake{' '}
            <div className="w-full h-0 ml-4 font-bold bg-transparent border border-b-0 border-transparent rounded text-high-emphesis md:border-gradient-r-blue-pink-dark-800 opacity-20"></div>
          </div>
          <MineList farms={filtered} term={term} /> */}
        <div className="flex items-center text-lg font-bold text-high-emphesis whitespace-nowrap">
          Farms{' '}
          <div className="w-full h-0 ml-4 font-bold bg-transparent border border-b-0 border-transparent rounded text-high-emphesis md:border-gradient-r-blue-pink-dark-800 opacity-20"></div>
        </div>

        <MineList farms={result} term={term} filter={FILTER} />
      </div>
    </Container>
  )
}