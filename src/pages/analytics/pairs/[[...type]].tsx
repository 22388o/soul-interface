// import { useCustomDayBlock, useOneDayBlock, useOneWeekBlock, useSoulPairs } from '../../../services/graph'

import Container from '../../../components/Container'
import Head from 'next/head'
import Menu from '../../../features/analytics/AnalyticsMenu'
// import PairList from '../../../features/analytics/Pairs/PairList'
// import PairTabs from '../../../features/analytics/Pairs/PairTabs'
// import Search from '../../../components/Search'
// // import { useEffect } from 'react'
// import { useFuse } from '../../../hooks'
// import { useRouter } from 'next/router'

// export default function Pairs() {
//   const router = useRouter()
//   const type: any = ['all', 'gainers', 'losers'].includes(router.query.type?.[0]) ? router.query.type?.[0] : 'all'

//   const block1d = useOneDayBlock()
//   const block2d = useCustomDayBlock(2)
//   const block1w = useOneWeekBlock()
//   const block2w = useCustomDayBlock(14)

//   // useEffect(() => {
//   //   console.log('debug', { block1d, block2d, block1w, block2w })
//   // }, [block1d, block2d, block1w, block2w])

//   const pairs = useSoulPairs()
//   const pairs1d = useSoulPairs({ block: { number: Number(block1d) } })
//   const pairs2d = useSoulPairs(type !== 'all' ? { block: { number: Number(block2d) } } : undefined) // No need to fetch if we don't need the data
//   const pairs1w = useSoulPairs({ block: { number: Number(block1w) } })
//   const pairs2w = useSoulPairs(type !== 'all' ? { block: { number: Number(block2w) } } : undefined)

//   const pairsFormatted =
//     type === 'all'
//       ? pairs && pairs1d && pairs1w
//         ? pairs.map((pair) => {
//             const pair1d = pairs1d.find((p) => pair.id === p.id) ?? pair
//             const pair1w = pairs1w.find((p) => pair.id === p.id) ?? pair1d

//             return {
//               pair: {
//                 address0: pair.token0.id,
//                 address1: pair.token1.id,
//                 symbol0: pair.token0.symbol,
//                 symbol1: pair.token1.symbol,
//                 name0: pair.token0.name,
//                 name1: pair.token1.name,
//               },
//               liquidity: pair.reserveUSD,
//               volume1d: pair.volumeUSD - pair1d.volumeUSD,
//               volume1w: pair.volumeUSD - pair1w.volumeUSD,
//             }
//           })
//         : []
//       : pairs && pairs1d && pairs2d && pairs1w && pairs2w
//       ? pairs
//           .map((pair) => {
//             const pair1d = pairs1d.find((p) => pair.id === p.id) ?? pair
//             const pair2d = pairs2d.find((p) => pair.id === p.id) ?? pair1d
//             const pair1w = pairs1w.find((p) => pair.id === p.id) ?? pair2d
//             const pair2w = pairs2w.find((p) => pair.id === p.id) ?? pair1w

//             return {
//               pair: {
//                 address0: pair.token0.id,
//                 address1: pair.token1.id,
//                 symbol0: pair.token0.symbol,
//                 symbol1: pair.token1.symbol,
//                 name0: pair.token0.name,
//                 name1: pair.token1.name,
//               },
//               liquidityChangeNumber1d: pair.reserveUSD - pair1d.reserveUSD,
//               liquidityChangePercent1d: (pair.reserveUSD / pair1d.reserveUSD) * 100 - 100,
//               liquidityChangeNumber1w: pair.reserveUSD - pair1w.reserveUSD,
//               liquidityChangePercent1w: (pair.reserveUSD / pair1w.reserveUSD) * 100 - 100,

//               volumeChangeNumber1d: pair.volumeUSD - pair1d.volumeUSD - (pair1d.volumeUSD - pair2d.volumeUSD),
//               volumeChangePercent1d:
//                 ((pair.volumeUSD - pair1d.volumeUSD) / (pair1d.volumeUSD - pair2d.volumeUSD)) * 100 - 100,
//               volumeChangeNumber1w: pair.volumeUSD - pair1w.volumeUSD - (pair1w.volumeUSD - pair2w.volumeUSD),
//               volumeChangePercent1w:
//                 ((pair.volumeUSD - pair1w.volumeUSD) / (pair1w.volumeUSD - pair2w.volumeUSD)) * 100 - 100,
//             }
//           })
//           .sort((a, b) => b.liquidityChangeNumber1d - a.liquidityChangeNumber1d)
//       : []

//   const options = {
//     keys: ['pair.currency0', 'pair.currency1', 'pair.symbol0', 'pair.symbol1', 'pair.name0', 'pair.name1'],
//     threshold: 0.4,
//   }

//   const {
//     result: pairsSearched,
//     term,
//     search,
//   } = useFuse({
//     data: pairsFormatted,
//     options,
//   })

//   return (
//     <>
//       <Head>
//         <title>SoulSwap Liquidity Pair (SLP) Analytics | Soul</title>
//         <meta name="description" content="SoulSwap Liquidity Pair (SLP) Analytics by Soul" />
//       </Head>

//       <Container maxWidth="full" className="grid h-full grid-flow-col grid-cols-5 mx-auto gap-9">
//         <div className="sticky top-0 hidden lg:block md:col-span-1" style={{ maxHeight: '40rem' }}>
//           <Menu />
//         </div>
//         <div className="col-span-5 space-y-6 lg:col-span-4">
//           <div className="flex flex-row items-center">
//             <div className="ml-3 text-2xl font-bold text-high-emphesis">Pairs</div>
//           </div>
//           <Search term={term} search={search} />
//           <PairTabs />
//           <PairList pairs={pairsSearched} type={type} />
//         </div>
//       </Container>
//     </>
//   )
// }

export default function Pairs() {

return (
  <>
    <Head>
      <title>SoulSwap Liquidity Pair (SLP) Analytics | Soul</title>
      <meta name="description" content="SoulSwap Liquidity Pair (SLP) Analytics by Soul" />
    </Head>

    <Container maxWidth="full" className="grid h-full grid-cols-5 mx-auto gap-9 grid-flow-col">
      <div className="sticky top-0 hidden lg:block md:col-span-1" style={{ maxHeight: '40rem' }}>
        <Menu />
      </div>
      <div className="col-span-5 space-y-6 lg:col-span-4">
        {/* <div className="flex flex-row space-x-4"> */}
          {/* <ChartCard type="liquidity" />
          <ChartCard type="volume" /> */}
        {/* </div> */}
        {/* <div className="flex flex-row items-center">
          <svg width="26" height="20" viewBox="0 0 26 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M6.46492 19.7858H2.10026C1.41438 19.7858 0.85321 19.3047 0.85321 18.7168V8.02622C0.85321 7.43824 1.41438 6.95717 2.10026 6.95717H6.46492C7.15079 6.95717 7.71197 7.43824 7.71197 8.02622V18.7168C7.71197 19.3047 7.15079 19.7858 6.46492 19.7858ZM15.506 0.542847H11.1413C10.4555 0.542847 9.8943 1.02392 9.8943 1.6119V18.7168C9.8943 19.3047 10.4555 19.7858 11.1413 19.7858H15.506C16.1919 19.7858 16.7531 19.3047 16.7531 18.7168V1.6119C16.7531 1.02392 16.1919 0.542847 15.506 0.542847ZM24.5471 9.09528H20.1824C19.4966 9.09528 18.9354 9.57635 18.9354 10.1643V18.7168C18.9354 19.3047 19.4966 19.7858 20.1824 19.7858H24.5471C25.233 19.7858 25.7941 19.3047 25.7941 18.7168V10.1643C25.7941 9.57635 25.233 9.09528 24.5471 9.09528Z"
              fill="#E3E3E3"
            />
          </svg>
          <div className="ml-3 font-bold text-lg text-high-emphesis">Leaderboard</div> */}
        {/* </div> */}
        {/* <Search term={term} search={search} /> */}
        {/* <DashboardTabs /> */}
        {/* <PairList pairs={pairsSearched} type={type} />  */}
        <iframe 
    frameBorder={"none"}
      title={"INFO"}
      src="https://info.soulswap.finance/pairs"
      height={"100%" }
      width={"100%"}
  />
      </div>
    </Container>
  </>
  )
}