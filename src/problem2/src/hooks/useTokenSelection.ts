import { useState, useCallback, useEffect } from 'react';
import type { Token } from '../types/common';
import { useTokens } from './useToken';
import { useBalanceStore } from '@/store/BalanceStore';

interface UseTokenSelectionReturn {
    selectedFromToken?: Token;
    selectedToToken?: Token;
    isFromDialogOpen: boolean;
    isToDialogOpen: boolean;
    setIsFromDialogOpen: (open: boolean) => void;
    setIsToDialogOpen: (open: boolean) => void;
    handleSelectFromToken: (token: Token) => void;
    handleSelectToToken: (token: Token) => void;
    handleSwitchTokens: () => void;
    isInitialized: boolean;
}

export const useTokenSelection = (): UseTokenSelectionReturn => {
    const { tokenBalances } = useTokens();
    const { selectedToken, setSelectedToken } = useBalanceStore()
    const [isFromDialogOpen, setIsFromDialogOpen] = useState(false);
    const [isToDialogOpen, setIsToDialogOpen] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);

    // Initialize when tokens are loaded
    useEffect(() => {
        if (tokenBalances && tokenBalances.length > 0 && !isInitialized) {
            setIsInitialized(true);
        }
    }, [tokenBalances, isInitialized]);

    const handleSelectFromToken = useCallback((token: Token) => {
        if (token.symbol === selectedToken.to?.symbol) {
            // Switch tokens if selecting the same token as "to"
            setSelectedToken({ from: selectedToken.to, to: selectedToken.from });
        } else {
            setSelectedToken({ from: token });
        }
        setIsFromDialogOpen(false);
    }, [selectedToken.from, selectedToken.to, setSelectedToken]);

    const handleSelectToToken = useCallback((token: Token) => {
        if (token.symbol === selectedToken.from?.symbol) {
            // Switch tokens if selecting the same token as "from"
            setSelectedToken({ from: selectedToken.to, to: selectedToken.from });
        } else {
            setSelectedToken({ to: token });
        }
        setIsToDialogOpen(false);
    }, [selectedToken.from, selectedToken.to, setSelectedToken]);

    const handleSwitchTokens = useCallback(() => {
        if (!selectedToken.from || !selectedToken.to) return;

        const tempToken = selectedToken.from;
        setSelectedToken({ from: selectedToken.to, to: tempToken })
    }, [selectedToken, setSelectedToken]);

    return {
        selectedFromToken: selectedToken.from,
        selectedToToken: selectedToken.to,
        isFromDialogOpen,
        isToDialogOpen,
        setIsFromDialogOpen,
        setIsToDialogOpen,
        handleSelectFromToken,
        handleSelectToToken,
        handleSwitchTokens,
        isInitialized,
    };
}; 