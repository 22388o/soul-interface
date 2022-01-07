import { Currency } from 'sdk'
import Button from 'components/Button'
import { COMMON_BASES } from 'constants/routing'
import CurrencyLogo from 'components/CurrencyLogo'
import QuestionHelper from 'components/QuestionHelper'
import React from 'react'
import Typography from 'components/Typography'
import { currencyId } from 'functions'

export default function CommonBases({
  chainId,
  onSelect,
  selectedCurrency,
}: {
  chainId?: number
  selectedCurrency?: Currency | null
  onSelect: (currency: Currency) => void
}) {
  const bases = typeof chainId !== 'undefined' ? COMMON_BASES[chainId] ?? [] : []

  return (
    <div className="flex items-center flex-col space-y-2 mb-2">
      <div className="flex flex-row">
        Common Bases
        <QuestionHelper text="These tokens are commonly paired with other tokens." />
      </div>
      <div className="flex flex-wrap">
        {bases.map((currency: Currency) => {
          const isSelected = selectedCurrency?.equals(currency)
          return (
            <Button
              variant="empty"
              type="button"
              onClick={() => !isSelected && onSelect(currency)}
              disabled={isSelected}
              key={currencyId(currency)}
              className="flex items-center p-0.5 m-0.5 sm:p-.8 sm:m-1.5 space-x-2 rounded bg-dark-800 hover:bg-dark-700 disabled:bg-dark-1000 disabled:cursor-not-allowed"
            >
              <CurrencyLogo currency={currency} />
              {/* <Typography variant="sm" className="font-semibold">
                {currency.symbol}
              </Typography> */}
            </Button>
          )
        })}
      </div>
    </div>
  )
}
