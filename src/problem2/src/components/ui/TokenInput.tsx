/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo } from 'react';
import type { Token } from '@/types/common';
import { DialogWrapper } from '../shadcn/dialog';
import { Button } from '../shadcn/button';
import { formatCurrencyCompact, formatUnitPrice } from '@/lib/calc';
import TokenIcon from './TokenIcon';
import TokenDialog from './TokenDialog';

interface TokenInputProps {
  label: string;
  selectedToken?: Token;
  amount: string;
  onTokenSelect: (token: Token) => void;
  isDialogOpen: boolean;
  onDialogToggle: (open: boolean) => void;
  showBalance?: boolean;
  onMaxClick?: () => void;
  isInput?: boolean;
  errors?: any;
  register?: any;
  disabled?: boolean;
  placeholder?: string;
}

const TokenInput = memo<TokenInputProps>(({
  label,
  selectedToken,
  amount,
  onTokenSelect,
  isDialogOpen,
  onDialogToggle,
  showBalance = false,
  onMaxClick,
  isInput = false,
  errors,
  register,
  disabled = false,
  placeholder = "0.0"
}) => {
  const handleTokenClick = () => {
    if (!disabled) {
      onDialogToggle(true);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-secondary font-semibold mb-2">{label}</label>

      {showBalance && selectedToken && (
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <span className="text-sm text-gray-600">
              Balance: {selectedToken.balance ? formatUnitPrice(selectedToken.balance) : 0}
            </span>
            <TokenIcon className='h-5' symbol={selectedToken.symbol} />
          </div>
          <Button
            disabled={!selectedToken.balance || selectedToken.balance === 0 || disabled}
            size="sm"
            type="button"
            onClick={onMaxClick}
          >
            Max
          </Button>
        </div>
      )}

      <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-between">
        <DialogWrapper
          open={isDialogOpen}
          onOpenChange={onDialogToggle}
          header={<span className="font-semibold text-xl">Select a token</span>}
          trigger={
            <div
              className={`flex items-center gap-3 cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-80'}`}
              onClick={handleTokenClick}
            >
              <TokenIcon symbol={selectedToken?.symbol || 'USD'} />
              <div>
                <div className={`font-semibold ${!selectedToken ? 'text-gray-400' : ''}`}>
                  {selectedToken?.symbol || 'Select token'}
                </div>
                {selectedToken && (
                  <div className="text-sm text-gray-500">
                    ~{formatCurrencyCompact(selectedToken.price * +amount)}
                  </div>
                )}
              </div>
            </div>
          }
        >
          <div className="max-h-[30rem] overflow-y-auto space-y-2 pr-2">
            {/* Token list will be rendered by parent component */}
            <TokenDialog onSelectToken={onTokenSelect} />
          </div>
        </DialogWrapper>

        {isInput ? (
          <input
            type="number"
            placeholder={placeholder}
            className="text-right bg-transparent outline-none text-lg font-semibold w-32 disabled:opacity-50"
            disabled={disabled}
            min={0}
            {...register}
          />
        ) : (
          <div className="text-right">
            <div className="text-lg font-semibold">{amount || '0.0'}</div>
          </div>
        )}
      </div>

      {errors && (
        <p className="text-red-500 text-sm mt-1">{errors.message}</p>
      )}
    </div>
  );
});

TokenInput.displayName = 'TokenInput';

export default TokenInput; 