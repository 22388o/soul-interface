import { getAddress } from '@ethersproject/address'
import { BigNumber } from '@ethersproject/bignumber'
import { Switch } from '@headlessui/react'
import { MinusIcon, PlusIcon } from '@heroicons/react/solid'
import { i18n } from '@lingui/core'
import { t } from '@lingui/macro'
import {
  ChainId,
  CurrencyAmount,
  JSBI,
  Token,
  USDC,
  USD,
  ZERO,
} from 'sdk'
import {Button, ButtonError } from 'components/Button'
import Dots from 'components/Dots'
import Web3Connect from 'components/Web3Connect'
import { classNames, tryParseAmount } from 'functions'
import { ApprovalState, useApproveCallback } from 'hooks/useApproveCallback'
import { useActiveWeb3React } from 'services/web3'
import { useTransactionAdder } from 'state/transactions/hooks'
import { useCurrencyBalance } from 'state/wallet/hooks'
import React, { useState } from 'react'

import CurrencyInputPanel from '../components/CurrencyInputPanel'
import { useUserInfo } from '../hooks'
import useMasterChef from '../hooks/useMasterChef'
import { SOUL_SUMMONER_ADDRESS } from '../../../constants'
import { useCurrency } from 'hooks/Tokens'
import { useV2PairsWithPrice } from 'hooks/useV2Pairs'

const ManageBar = ({ farm }) => {
  const { account, chainId } = useActiveWeb3React()

  const [toggle, setToggle] = useState(true)
  const [depositValue, setDepositValue] = useState('')
  const [withdrawValue, setWithdrawValue] = useState('')

  const { deposit, withdraw } = useMasterChef()
  const addTransaction = useTransactionAdder()

  let token0 = useCurrency(farm.pair.token0?.id)
  let token1 = useCurrency(farm.pair.token1?.id)

  const liquidityToken = new Token(
    chainId,
    getAddress(farm.lpToken),
    18,
    farm.pair?.token1 ? farm.pair?.symbol : farm.pair.token0?.symbol,
    farm.pair.token1 ? farm.pair?.name : farm.pair.token0?.name
  )

  const balance = useCurrencyBalance(account, liquidityToken)
  const stakedAmount = useUserInfo(farm, liquidityToken)

  let [data] = useV2PairsWithPrice([[token0, token1]])
  let [state, pair, pairPrice] = data

  const balanceFiatValueRaw
    = Number(pairPrice) * Number(balance?.toSignificant())

  const stakedAmountFiatValueRaw
    = Number(pairPrice) * Number(stakedAmount?.toSignificant())

  const balanceFiatValue
    = CurrencyAmount.fromRawAmount(
      USD[chainId],
      JSBI.BigInt(balanceFiatValueRaw.toFixed(USD[chainId].decimals).toBigNumber(USD[chainId].decimals))
    )

  const stakedAmountFiatValue
    = CurrencyAmount.fromRawAmount(
      USD[chainId],
      JSBI.BigInt(stakedAmountFiatValueRaw.toFixed(USD[chainId].decimals).toBigNumber(USD[chainId].decimals))
    )

  // const balanceFiatValue = CurrencyAmount.fromRawAmount(
  //   USD[chainId],
  //       JSBI.BigInt(
  //         ((Number(balance?.toExact() ?? '0') * farm.pair.reserveUSD) / farm.pair.totalSupply)
  //           .toFixed(USD[chainId].decimals)
  //           .toBigNumber(USD[chainId].decimals)
  //       )
  // )

  // const stakedAmountFiatValue = CurrencyAmount.fromRawAmount(
  //   USD[chainId],
  //     JSBI.BigInt(
  //         ((Number(stakedAmount?.toExact() ?? '0') * farm.pair.reserveUSD) / farm.pair.totalSupply)
  //           .toFixed(USD[chainId].decimals)
  //           .toBigNumber(USD[chainId].decimals)
  //       )
  // )

  const parsedDepositValue = tryParseAmount(depositValue, liquidityToken)
  const parsedWithdrawValue = tryParseAmount(withdrawValue, liquidityToken)

  const [approvalState, approve] = useApproveCallback(parsedDepositValue, SOUL_SUMMONER_ADDRESS[chainId])

  const depositError = !parsedDepositValue
    ? 'Enter Amount'
    : balance?.lessThan(parsedDepositValue)
      ? 'Insufficient Balance'
      : undefined

  const isDepositValid = !depositError

  const withdrawError = !parsedWithdrawValue
    ? 'Enter Amount'
    : stakedAmount?.lessThan(parsedWithdrawValue)
      ? 'Insufficient Balance'
      : undefined

  const isWithdrawValid = !withdrawError

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center justify-between pb-2">
        <Switch.Group>
          <div className="flex items-center">
            <Switch
              checked={toggle}
              onChange={() => setToggle(!toggle)}
              className={`${toggle ? 'bg-blue border-blue' : 'bg-purple border-purple'
                } bg-opacity-60 border border-opacity-80 relative inline-flex items-center h-[32px] rounded-full w-[54px] transition-colors focus:outline-none`}
            >
              <span
                className={`${toggle ? 'translate-x-[1px] text-blue' : 'translate-x-[23px] text-purple'
                  } inline-block w-7 h-7 transform bg-white rounded-full transition-transform`}
              >
                {toggle ? <PlusIcon /> : <MinusIcon />}
              </span>
            </Switch>
            <Switch.Label className="ml-3">{toggle ? i18n._(t`Deposit`) : i18n._(t`Withdraw`)}</Switch.Label>
          </div>
        </Switch.Group>
        <div className="flex justify-end space-x-4">
          {['25', '50', '75', '100'].map((multipler, i) => (
            <Button
              variant="outlined"
              size="xs"
              color={toggle ? 'blue' : 'purple'}
              key={i}
              onClick={() => {
                toggle
                  ? setDepositValue(balance?.multiply(multipler).divide(100).toExact())
                  : setWithdrawValue(stakedAmount?.multiply(multipler).divide(100).toExact())
              }}
              className={classNames(
                'text-md border border-opacity-50',
                toggle ? 'focus:ring-blue border-blue' : 'focus:ring-purple border-purple',
                multipler === '25' || multipler === '75' ? 'hidden sm:block' : ''
              )}
            >
              {multipler === '100' ? 'MAX' : multipler + '%'}
            </Button>
          ))}
        </div>
      </div>
      {toggle ? (
        <div className="flex flex-col space-y-4">
          <CurrencyInputPanel
            value={depositValue}
            currency={liquidityToken}
            id="add-liquidity-input-tokenb"
            hideIcon
            onUserInput={(value) => setDepositValue(value)}
            currencyBalance={balance}
            fiatValue={balanceFiatValue}
            showMaxButton={false}
          />
          {!account ? (
            <Web3Connect size="lg" color="blue" className="w-full" />
          ) : isDepositValid &&
            (approvalState === ApprovalState.NOT_APPROVED || approvalState === ApprovalState.PENDING) ? (
            <Button
              color="gradient"
              size="lg"
              onClick={approve}
              disabled={approvalState !== ApprovalState.NOT_APPROVED}
            >
              {approvalState === ApprovalState.PENDING ? <Dots>{i18n._(t`Approving`)}</Dots> : i18n._(t`Approve`)}
            </Button>
          ) : (
            <ButtonError
              onClick={async () => {
                try {
                  // LP is always 18
                  const tx = await deposit(farm.id, BigNumber.from(parsedDepositValue.quotient.toString()))
                  addTransaction(tx, {
                    summary: `Deposit ${farm.pair.token0.name}/${farm.pair.token1.name}`,
                  })
                } catch (error) {
                  console.error(error)
                }
              }}
              disabled={!isDepositValid}
              error={!isDepositValid && !!parsedDepositValue}
            >
              {depositError || i18n._(t`Confirm Deposit`)}
            </ButtonError>
          )}
        </div>
      ) : (
        <div className="flex flex-col space-y-4">
          <CurrencyInputPanel
            value={withdrawValue}
            currency={liquidityToken}
            id="add-liquidity-input-tokenb"
            hideIcon
            onUserInput={(value) => setWithdrawValue(value)}
            currencyBalance={stakedAmount}
            fiatValue={stakedAmountFiatValue}
            showMaxButton={false}
          />
          {!account ? (
            <Web3Connect size="lg" color="blue" className="w-full" />
          ) : (
            <ButtonError
              onClick={async () => {
                try {
                  // LP is always 18
                  const tx = await withdraw(farm.id, BigNumber.from(parsedWithdrawValue.quotient.toString()))
                  addTransaction(tx, {
                    summary: `Withdraw ${farm.pair.token0.name}/${farm.pair.token1.name}`,
                  })
                } catch (error) {
                  console.error(error)
                }
              }}
              disabled={!isWithdrawValid}
              error={!isWithdrawValid && !!parsedWithdrawValue}
            >
              {withdrawError || i18n._(t`Confirm Withdraw`)}
            </ButtonError>
          )}
        </div>
      )}
    </div>
  )
}

export default ManageBar
