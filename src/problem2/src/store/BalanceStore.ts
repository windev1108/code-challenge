import type { Token } from '@/types/common';
import { createSelectorFunctions } from 'auto-zustand-selectors-hook';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface IBalanceStore {
    balances: Token[];
    selectedToken: { from?: Token, to?: Token };
    setSelectedToken: (tokens: { from?: Token, to?: Token }) => void;
    setBalances: (balances: Token[]) => void;
    updateBalance: (symbol: string, newBalance: number) => void;
}

const useBaseBalanceStore = create<IBalanceStore>()(
    persist(
        (set, get) => ({
            balances: [],
            selectedToken: { from: undefined, to: undefined },
            setSelectedToken: (tokens) => set((prev) => ({
                selectedToken: {
                    from: tokens.from !== undefined ? tokens.from : prev.selectedToken.from,
                    to: tokens.to !== undefined ? tokens.to : prev.selectedToken.to,
                }
            })),
            setBalances: (balances) => set({ balances }),
            updateBalance: (symbol, newBalance) => {
                const updated = get().balances.map(token =>
                    token.symbol === symbol ? { ...token, balance: newBalance } : token
                );
                set((prev) => ({ balances: updated, selectedToken: { from: updated.find((x) => x.symbol === prev.selectedToken.from?.symbol), to: updated.find((x) => x.symbol === prev.selectedToken.to?.symbol) } }));
            },
        }),
        {
            name: 'balances',
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export const useBalanceStore = createSelectorFunctions(useBaseBalanceStore);
