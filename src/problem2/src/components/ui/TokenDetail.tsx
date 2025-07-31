import { memo } from 'react';
import { formatUnitPrice, formatCurrencyCompact, prettyPrice } from "@/lib/calc";
import TokenIcon from './TokenIcon';
import type { Token } from "@/types/common";

export interface TokenDetailProps extends Token {
  variant?: 'price' | 'balance';
  onClick?: () => void;
  className?: string;
}

const TokenDetail = memo<TokenDetailProps>(({
  symbol,
  balance,
  price,
  variant = 'price',
  onClick,
  className = ''
}) => {
  return (
    <div
      className={`flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
    >
      <div className="flex items-center space-x-2">
        <TokenIcon symbol={symbol} size="sm" />
        <span className="font-semibold text-gray-800">{symbol}</span>
      </div>
      {variant === "balance"
        ?
        <div className='flex items-center gap-2'>
          <span className='text-xs text-muted-foreground'>~{formatCurrencyCompact(balance * price)}</span>
          <span className='font-medium'>{prettyPrice(balance)}</span>
        </div>
        :
        <span className='text-sm text-muted-foreground'>{`~$${formatUnitPrice(price)}`}</span>
      }
    </div>
  );
});

TokenDetail.displayName = 'TokenDetail';

export default TokenDetail;