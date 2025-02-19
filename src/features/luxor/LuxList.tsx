import React from 'react'
import LuxorKey from './LuxorKey'
import LuxorRowRender from './LuxorRowRender'
import { AllBonds } from './Bonds'

export const LuxList = () => {
  const luxorList = AllBonds.map((bond) => (
    <LuxorRowRender
      key={bond.pid}
      pid={bond.pid}
      assetAddress={bond.assetAddress}
      assetName={bond.assetName}
      stakeToken={bond.assetAddress}
      bondAddress={bond.bondAddress}
      term={bond.term}
      bond={bond}
    />
  ))

  return (
    <>
      <LuxorKey />
      <>{luxorList}</>
    </>
  )
}
