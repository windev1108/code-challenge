import { useMemo, type FC, type JSX, type PropsWithChildren } from "react";
import WalletRow from './WalletRow.tsx';

type Blockchain = 'Osmosis' | 'Ethereum' | 'Arbitrum' | 'Zilliqa' | 'Neo';

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: Blockchain;
}
export type Prices = Record<string, number>;


const LOWEST_PRIORITY = 0;

const mapPriority: Record<Blockchain, number> = {
  Osmosis: 100,
  Ethereum: 50,
  Arbitrum: 30,
  Zilliqa: 20,
  Neo: 20,
};

const classes = {
  row: 'row'
}

export type FCC = FC<PropsWithChildren>;

const getPriority = (blockchain: Blockchain): number =>
  mapPriority[blockchain] ?? LOWEST_PRIORITY;

const filterValidBalances = (balances: WalletBalance[]) =>
  balances.filter(
    (balance) =>
      balance.amount > 0 && getPriority(balance.blockchain) > LOWEST_PRIORITY
  );

const sortByBlockchainPriority = (balances: WalletBalance[]) =>
  balances.sort(
    (a, b) => getPriority(b.blockchain) - getPriority(a.blockchain)
  );

const mapBalancesToRows = (
  balances: WalletBalance[],
  prices: Prices
): JSX.Element[] =>
  balances.map((balance) => {
    const usdValue = (prices[balance.currency] ?? 0) * balance.amount;
    const formattedAmount = balance.amount.toFixed();

    return (
      <WalletRow
        key={`${balance.currency}-${balance.blockchain}`}
        className={classes.row}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={formattedAmount}
      />
    );
  });


const WalletPage: FCC = (props) => {
  const balances: WalletBalance[] = useWalletBalances();
  const prices: Prices = usePrices();

  const rows = useMemo(() => {
    const validBalances = filterValidBalances(balances);
    const sortedBalances = sortByBlockchainPriority(validBalances);
    return mapBalancesToRows(sortedBalances, prices);
  }, [balances, prices]);

  return (
    <div {...props}>
      {rows}
    </div>
  );
};

export default WalletPage;
