import type { RawToken, Token } from '@/types/common';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalizeFirstLetter(str = '') {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function generateMockBalances(tokens: RawToken[], maxAmount: number = 1000): Token[] {
  const balances: Record<string, number> = {};
  return tokens.map(token => ({
    ...token,
    symbol: token.currency,
    balance: balances[token.currency] = Math.round(Math.random() * maxAmount * 100) / 100,
    name: capitalizeFirstLetter(token.currency)
  }));
}

// Import all token icons using Vite glob import
const tokenIcons = import.meta.glob('../assets/tokens/*.svg', { eager: true })

export const getTokenIcon = (currency: string): string => {
  const iconPath = `../assets/tokens/${currency}.svg`

  if (tokenIcons[iconPath]) {
    return (tokenIcons[iconPath] as { default: string }).default
  }

  // Fallback to ETH icon if the specific token icon doesn't exist
  const fallbackPath = '../assets/tokens/ETH.svg'
  return (tokenIcons[fallbackPath] as { default: string }).default
}

export const sleep = async (time: number = 3000) => {
  return new Promise<void>((resolve) =>
    setTimeout(() => {
      resolve();
    }, time)
  );
};
