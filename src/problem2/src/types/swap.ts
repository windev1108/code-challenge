export interface RawToken {
  currency: string;
  date: string;
  price: number;
}

export interface Token {
  symbol: string;
  name: string;
  price: number;
  balance: number;
}

export interface SwapFormData {
  fromToken: string;
  toToken: string;
  fromAmount: string;
  toAmount: string;
}

export interface SwapSummary {
  before: {
    fromToken: Token;
    toToken: Token;
  };
  after: {
    fromToken: Token;
    toToken: Token;
  };
} 
