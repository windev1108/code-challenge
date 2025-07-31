import { useTokens } from '@/hooks/useToken'
import TokenDetail, { type TokenDetailProps } from './TokenDetail'
import type { Token } from '@/types/common';
import { memo, useMemo, useState } from 'react';
import LoadingSpinner from './LoadingSpinner';
import { Input } from '../shadcn/input';

interface TokenDialogProps extends Pick<TokenDetailProps, 'variant'> {
    onSelectToken: (token: Token) => void;
}

const TokenDialog = memo<TokenDialogProps>(({
    variant,
    onSelectToken,
}) => {
    const { tokenBalances, isLoading, error } = useTokens();
    const [keyword, setKeyword] = useState('')
    // Filter tokens based on search query

    const filteredTokens = useMemo(() => {
        if (!tokenBalances) return [];

        const normalized = tokenBalances.map(token => ({
            ...token,
            usdValue: (token.balance || 0) * (token.price || 0)
        }));

        const filtered = !keyword
            ? normalized
            : normalized.filter(token =>
                token.symbol.toLowerCase().includes(keyword.toLowerCase()) ||
                token.name.toLowerCase().includes(keyword.toLowerCase())
            );

        // only sort for balance
        if (variant === 'balance') return filtered.sort((a, b) => b.usdValue - a.usdValue);
        return filtered
    }, [tokenBalances, keyword, variant]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-8">
                <LoadingSpinner size="lg" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-8">
                <p className="text-red-500">Failed to load tokens. Please try again.</p>
            </div>
        );
    }


    return (
        <div className="flex flex-col space-y-2 min-h-[30rem]">
            <Input value={keyword} onChange={({ target }) => setKeyword(target.value)} placeholder='Search token' />
            {!filteredTokens || filteredTokens.length === 0 ?
                <div className="text-center py-8">
                    <p className="text-gray-500">
                        {keyword ? 'No tokens found matching your search.' : 'No tokens available.'}
                    </p>
                </div>
                :
                <div className="max-h-[30rem] overflow-y-auto space-y-1 pr-2">
                    {filteredTokens.map((token) => (
                        <TokenDetail
                            key={token.symbol}
                            balance={token.balance}
                            name={token.name}
                            price={token.price}
                            symbol={token.symbol}
                            variant={variant}
                            onClick={() => onSelectToken(token)}
                        />
                    ))}
                </div>
            }
        </div>
    );
});

TokenDialog.displayName = 'TokenDialog';
export default TokenDialog;