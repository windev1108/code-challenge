import { useQuery } from "@tanstack/react-query";
import { getTokens } from "../api/swap";
import { useBalanceStore } from "@/store/BalanceStore";
import { useEffect } from "react";
import { generateMockBalances } from "@/lib/utils";

export const useTokens = () => {
    const { balances, setBalances } = useBalanceStore()
    const { data: tokens, ...rest } = useQuery({
        queryKey: ['tokenPrices'],
        queryFn: getTokens,
        refetchInterval: 30000 // Refetch every 30 seconds
    });

    useEffect(() => {
        if (balances.length === 0 && tokens) {
            setBalances(generateMockBalances(tokens))
        }
    }, [balances, tokens, setBalances])


    return {
        tokens,
        tokenBalances: balances,
        ...rest
    }
}