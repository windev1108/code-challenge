import React, { memo, useState } from 'react';
import { getTokenIcon } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface TokenIconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    symbol: string;
    size?: 'sm' | 'md' | 'lg';
}

const TokenIcon = memo<TokenIconProps>(({
    symbol,
    size = 'md',
    className,
    onError,
    ...props
}) => {
    const [hasError, setHasError] = useState(false);

    const sizeClasses = {
        sm: 'w-6 h-6',
        md: 'w-8 h-8',
        lg: 'w-12 h-12',
    };

    const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        setHasError(true);
        onError?.(e);
    };

    if (hasError) {
        return (
            <div className={cn(
                sizeClasses[size],
                'bg-gray-200 rounded-full flex items-center justify-center text-gray-500 font-semibold text-xs',
                className
            )}>
                {symbol.slice(0, 2).toUpperCase()}
            </div>
        );
    }

    return (
        <img
            alt={`${symbol} icon`}
            src={getTokenIcon(symbol)}
            className={cn(sizeClasses[size], 'rounded-full', className)}
            onError={handleError}
            loading="lazy"
            {...props}
        />
    );
});

TokenIcon.displayName = 'TokenIcon';

export default TokenIcon;