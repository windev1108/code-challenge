import { memo } from 'react';
import type { SwapSummary as SwapSummaryType } from '@/types/common';
import { formatUnitPrice } from '@/lib/calc';
import TokenIcon from './TokenIcon';

interface SwapSummaryProps {
  swapSummary: SwapSummaryType;
  show: boolean;
}

const SwapSummary = memo<SwapSummaryProps>(({ swapSummary, show }) => {
  if (!show) return null;

  return (
    <div className="bg-gray-50 rounded-xl p-4 mb-6">
      <div className="mb-3">
        <h4 className="text-sm font-medium text-gray-600 mb-2">Before swap:</h4>
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <TokenIcon symbol={swapSummary.before.fromToken.symbol} size="sm" />
            <span className="text-sm font-medium">{swapSummary.before.fromToken.symbol}</span>
          </div>
          <span className="text-sm text-gray-700">
            {formatUnitPrice(swapSummary.before.fromToken.balance)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TokenIcon symbol={swapSummary.before.toToken.symbol} size="sm" />
            <span className="text-sm font-medium">{swapSummary.before.toToken.symbol}</span>
          </div>
          <span className="text-sm text-gray-700">
            {formatUnitPrice(swapSummary.before.toToken.balance)}
          </span>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-600 mb-2">After swap:</h4>
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <TokenIcon symbol={swapSummary.after.fromToken.symbol} size="sm" />
            <span className="text-sm font-medium">{swapSummary.after.fromToken.symbol}</span>
          </div>
          <span className="text-sm text-gray-700">
            {formatUnitPrice(swapSummary.after.fromToken.balance)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TokenIcon symbol={swapSummary.after.toToken.symbol} size="sm" />
            <span className="text-sm font-medium">{swapSummary.after.toToken.symbol}</span>
          </div>
          <span className="text-sm text-green-600 font-semibold">
            {formatUnitPrice(swapSummary.after.toToken.balance)}
          </span>
        </div>
      </div>
    </div>
  );
});

SwapSummary.displayName = 'SwapSummary';

export default SwapSummary; 