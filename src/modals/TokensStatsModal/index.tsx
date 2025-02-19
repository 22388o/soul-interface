import React from 'react'
import { useModalOpen, useToggleTokenStatsModal } from 'state/application/hooks'
import { ApplicationModal } from 'state/application/actions'
import Image from 'next/image'
import Typography from 'components/Typography'
import { useTokenInfo } from 'hooks/useAPI'
import { formatNumber, formatNumberScale } from 'functions'
import { SOUL_ADDRESS, SEANCE_ADDRESS } from 'constants/addresses'
import QuestionHelper from '../../components/QuestionHelper'
import { useBondTVL, useTVL, useSoulTVL } from 'hooks/useV2Pairs'
import { Button } from 'components/Button'
import NavLink from 'components/NavLink'
import { useActiveWeb3React } from 'services/web3'
import ModalHeader from 'components/Modal/Header'
import { HeadlessUiModal } from 'components/Modal'
import { concat } from 'lodash'
import { SOUL } from 'sdk'
import { useUserInfo } from 'hooks/useAPI'

export default function TokenStatsModal(): JSX.Element | null {
  
  const cache: { [key: string]: number } = {};
  function formatCurrency(c: number, precision = 0) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: precision,
      minimumFractionDigits: precision,
    }).format(c);
  }

  const { chainId, library } = useActiveWeb3React()
  const soulStatsModalOpen = useModalOpen(ApplicationModal.SOUL_STATS)
  const toggleSoulStatsModal = useToggleTokenStatsModal()
  
  const { userInfo } = useUserInfo()
  const votingPower = userInfo.votingPower
  const protocolOwnership = Number(userInfo.protocolOwnership).toFixed(2)
  const totalSeance = Number(useTokenInfo(SEANCE_ADDRESS[250]).tokenInfo.supply) / 1e18
  const totalSoul = Number(useTokenInfo(SOUL_ADDRESS[250]).tokenInfo.supply) / 1e18

  const soulPrice = Number(useTokenInfo(SOUL_ADDRESS[250]).tokenInfo.price)
  const seancePrice = Number(useTokenInfo(SEANCE_ADDRESS[250]).tokenInfo.price)

  const tvlInfo = useTVL()
  const bondInfo = useBondTVL()
  const stakedTvl  = Number(seancePrice) * totalSeance
    
  const soulInfo = useSoulTVL()

  let bondsTvl = bondInfo?.reduce((previousValue, currentValue) => {
    return previousValue + currentValue?.tvl
  }, 0)

  let soulTvl = soulInfo?.reduce((previousValue, currentValue) => {
    return previousValue + currentValue?.tvl
  }, 0)

  let farmsTvl = tvlInfo?.reduce((previousValue, currentValue) => {
    return previousValue + currentValue?.tvl
  }, 0)

  let podl = bondsTvl + soulTvl
  function getSummaryLine(title, value) {

    return (
      <div className="flex flex-col gap-2 bg-dark-800 rounded py-1 px-3 w-full">
        <div className="flex items-center justify-between">
          {title}
          <Typography variant="sm" className="flex items-center font-bold py-0.5">
            {value}
          </Typography>
        </div>
      </div>
    )
  }
  if (!chainId) return null

  return (
    <HeadlessUiModal.Controlled isOpen={soulStatsModalOpen}
      onDismiss={toggleSoulStatsModal}
      maxWidth={'md'}
    >
    <ModalHeader header={''} onClose={toggleSoulStatsModal} />
      <div className="mt-2 space-y-8">
        <div className="space-y-4">
          <div className="flex justify-between gap-2 flex-col-2 w-full">
            {/* <div className="block"> */}
            {/* <QuestionHelper text={`Add to MetaMask`}/> */}
            <div
              className="rounded-md cursor-pointer sm:inline-flex bg-dark-900 hover:bg-dark-800 p-0.5"
              onClick={() => {
                const params: any = {
                  type: 'ERC20',
                  options: {
                    address: SOUL[chainId | 250].address,
                    symbol: 'SOUL',
                    decimals: 18,
                    image: 'https://raw.githubusercontent.com/soulswapfinance/assets/prod/blockchains/fantom/assets/0xe2fb177009FF39F52C0134E8007FA0e4BaAcBd07/logo.png',
                  },
                }
                if (library && library.provider.isMetaMask && library.provider.request) {
                  library.provider
                    .request({
                      method: 'wallet_watchAsset',
                      params,
                    })
                    .then((success) => {
                      if (success) {
                        console.log('Successfully added SOUL to MetaMask')
                      } else {
                        throw new Error('Something went wrong.')
                      }
                    })
                    .catch(console.error)
                }
              }}
            >
              <Image
                src="https://raw.githubusercontent.com/soulswapfinance/assets/prod/blockchains/fantom/assets/0xe2fb177009FF39F52C0134E8007FA0e4BaAcBd07/logo.png"
                alt="SOUL"
                width="1600px"
                height="1600px"
                objectFit="contain"
                className="rounded-md"
              />
            </div>
            <div
              className="rounded-md cursor-pointer sm:inline-flex bg-dark-900 hover:bg-dark-800 p-0.5"
              onClick={() => {
                const params: any = {
                  type: 'ERC20',
                  options: {
                    address: SEANCE_ADDRESS[250],
                    symbol: 'SEANCE',
                    decimals: 18,
                    image: 'https://raw.githubusercontent.com/soulswapfinance/assets/prod/blockchains/fantom/assets/0x124B06C5ce47De7A6e9EFDA71a946717130079E6/logo.png',
                  },
                }
                if (library && library.provider.isMetaMask && library.provider.request) {
                  library.provider
                    .request({
                      method: 'wallet_watchAsset',
                      params,
                    })
                    .then((success) => {
                      if (success) {
                        console.log('Successfully added SEANCE to MetaMask')
                      } else {
                        throw new Error('Something went wrong.')
                      }
                    })
                    .catch(console.error)
                }
              }}
            >
              <Image
                src="https://raw.githubusercontent.com/soulswapfinance/assets/prod/blockchains/fantom/assets/0x124B06C5ce47De7A6e9EFDA71a946717130079E6/logo.png"
                alt="SEANCE"
                width="1600px"
                height="1600px"
                objectFit="contain"
                className="rounded-md"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-0">

        <div className="flex mt-1" />
        <Typography className='flex justify-center text-2xl leading-[28px] bg-dark-700'>{`Tokenomics Overview`}</Typography>
      </div>
      <div className="flex flex-col mt-2 mb-2 flex-nowrap gap-1.5 -m-1">
        {getSummaryLine(
          <Typography variant="sm" className="flex items-center py-0.5">
            {`Voting Power`}
          </Typography>,
        formatNumber(Number(votingPower), false, true)
          + ` (${protocolOwnership}%)` 
        )}

         {getSummaryLine(
          <Typography variant="sm" className="flex items-center py-0.5">
            {`Maximum Supply`}
          </Typography>,
          formatNumberScale(
            Number(250_000_000), false)
            )}
          {getSummaryLine(
            <div className="flex items-center">
            <Typography variant="sm" className="flex items-center py-0.5">
              {`Circulating Supply`}
            </Typography>
            <QuestionHelper
              text={
                <div className="flex flex-col gap-2 py-1 px-3 w-full">
                  <div className="flex items-center justify-between">
                    <Typography variant="sm" className="flex items-center font-bold px-2 py-0.5">
                      Total Supply
                    </Typography>
                    <Typography variant="sm" className="flex items-center font-bold px-2 py-0.5">
                      {formatNumberScale(Number(totalSoul), false)}
                    </Typography>
                  </div>
                  <div className="flex items-center justify-between">
                    <Typography variant="sm" className="flex items-center font-bold px-2 py-0.5">
                      - {' '} DAO Treasury
                    </Typography>
                    <Typography variant="sm" className="flex items-center font-bold px-2 py-0.5">
                      {formatNumberScale(Number(totalSoul) * 0.125, false)}
                    </Typography>
                  </div>
                  <div className="flex items-center justify-between">
                    <Typography variant="sm" className="flex items-center font-bold px-2 py-0.5">
                      - {' '} Total Staked
                    </Typography>
                    <Typography variant="sm" className="flex items-center font-bold px-2 py-0.5">
                      {formatNumberScale(Number(totalSeance), false)}
                    </Typography>
                  </div>
                  <hr></hr>
                  <div className="flex items-center justify-between">
                    <Typography variant="sm" className="flex items-center font-bold px-2 py-0.5">
                      Circulating
                    </Typography>
                    <Typography variant="sm" className="flex items-center font-bold px-2 py-0.5">
                      {formatNumberScale(
                        Number(totalSoul)
                        - Number(totalSeance)
                        - (Number(totalSoul) * 0.125)
                        , false)}
                    </Typography>
                  </div>
                </div>
              }
            />
          </div>,
          formatNumberScale(
            Number(totalSoul)
            - Number(totalSeance)
            - (Number(totalSoul) * 0.125)
            , false)
        )}
        {getSummaryLine(
          <Typography variant="sm" className="flex items-center py-0.5">
            {`Total Market Cap`}
          </Typography>,
          formatCurrency(
            Number(totalSoul) * Number(soulPrice)
        ))}
        {getSummaryLine(
          <div className="flex items-center">
            <Typography variant="sm" className="flex items-center py-0.5">
              {`Total Value Locked`}
            </Typography>
            <QuestionHelper
              text={
                <div className="flex flex-col gap-2 py-1 px-3 w-full">
                  <div className="flex items-center justify-between">
                    <Typography variant="sm" className="flex items-center font-bold px-2 py-0.5">
                      Farming
                    </Typography>
                    <Typography variant="sm" className="flex items-center font-bold px-2 py-0.5">
                      {formatNumberScale(farmsTvl - stakedTvl, true)}
                    </Typography>
                  </div>
                  <div className="flex items-center justify-between">
                    <Typography variant="sm" className="flex items-center font-bold px-2 py-0.5">
                      Staked
                    </Typography>
                    <Typography variant="sm" className="flex items-center font-bold px-2 py-0.5">
                      {formatNumberScale(stakedTvl, true)}
                    </Typography>
                  </div>
                  <div className="flex items-center justify-between">
                    <Typography variant="sm" className="flex items-center font-bold px-2 py-0.5">
                      Bonded
                    </Typography>
                    <Typography variant="sm" className="flex items-center font-bold px-2 py-0.5">
                      {formatNumberScale(bondsTvl, true)}
                    </Typography>
                  </div>
                  <hr></hr>
                  <div />
                  <div className="flex items-center justify-between">
                    <Typography variant="sm" className="flex items-center font-bold px-2 py-0.5">
                      Total Value
                    </Typography>
                    <Typography variant="sm" className="flex items-center font-bold px-2 py-0.5">
                      {formatNumberScale(
                        Number(farmsTvl-stakedTvl) // FARMS ONLY
                        + stakedTvl // STAKED ONLY
                        + Number(bondsTvl) // BONDS ONLY
                        , true)}
                    </Typography>
                  </div>
                </div>
              }
            />
          </div>,
          formatCurrency(
            Number(farmsTvl + bondsTvl), 0)
        )}
        {getSummaryLine(
          <div className="flex items-center">
            <Typography variant="sm" className="flex items-center py-0.5">
              {`Protocol Liquidity`}
            </Typography>
            <QuestionHelper
              text={
                <div className="flex flex-col gap-2 py-1 px-3 w-full">
                  <div className="flex items-center justify-between">
                    <Typography variant="sm" className="flex items-center font-bold px-2 py-0.5">
                      Bonded
                    </Typography>
                    <Typography variant="sm" className="flex items-center font-bold px-2 py-0.5">
                      {formatNumberScale(bondsTvl, true)}
                    </Typography>
                  </div>
                  <div className="flex items-center justify-between">
                    <Typography variant="sm" className="flex items-center font-bold px-2 py-0.5">
                      DAO
                    </Typography>
                    <Typography variant="sm" className="flex items-center font-bold px-2 py-0.5">
                      {formatNumberScale(soulTvl, true)}
                    </Typography>
                  </div>
                  <hr></hr>
                  <div />
                  <div className="flex items-center justify-between">
                    <Typography variant="sm" className="flex items-center font-bold px-2 py-0.5">
                      Total Value
                    </Typography>
                    <Typography variant="sm" className="flex items-center font-bold px-2 py-0.5">
                      {formatNumberScale(
                        Number(bondsTvl)
                        // + Number(soulTvl)
                        , true)}
                    </Typography>
                  </div>
                </div>
              }
            />
          </div>,
          concat(formatNumberScale(
            Number(bondsTvl + soulTvl), true)
            , 
            ` (${((podl / farmsTvl * 100).toFixed(0))}%)`
        ))}
        {/* {getSummaryLine(
          <Typography variant="sm" className="flex items-center py-0.5">
            {`Percent PODL`}
          </Typography>,
            percPodl
        )} */}
        {getSummaryLine(
          <Typography variant="sm" className="flex items-center py-0.5">
            {`Soul Market Price`}
          </Typography>,
          formatCurrency(
            Number(soulPrice), 3)
        )}
        {getSummaryLine(
          <Typography variant="sm" className="flex items-center py-0.5">
            {`Seance Market Price`}
          </Typography>,
          formatCurrency(
            Number(seancePrice), 3)
        )}
        <div className="flex mt-3" />
        <Button
          color='purple'
          type='flexed'
          size='xs'
          className="text-white"
        >
          <NavLink href={'/bonds'}>
            <a className="flex justify-center text-black text-xl transition rounded-md hover:pink">
              MINT SOUL<span> ↗</span>
            </a>
          </NavLink>
        </Button>
        <Button
          color='purple'
          type='flexed'
          size='xs'
          className="text-white"
        >
          <NavLink href={'/seance'}>
            <a className="flex justify-center text-black text-xl transition rounded-md hover:pink">
              STAKE SOUL<span> ↗</span>
            </a>
          </NavLink>
        </Button>
      </div>
    </HeadlessUiModal.Controlled>
  )
}


