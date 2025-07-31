# 📄 WalletPage Refactor Explanation

This document explains the code improvements and refactoring applied to the `WalletPage` component. The goal of this refactor was to increase code **readability**, **reusability**, and **performance optimization** through proper abstraction, naming, and structure.

---

## ✅ Refactor Goals

1. **Improve code modularity and reusability**  
2. **Enhance readability by breaking down logic into pure helper functions**  
3. **Use React best practices (useMemo, pure mapping, etc.)**  
4. **Make the sorting/filtering logic explicit and declarative**  
5. **Separate business logic from rendering logic**  

---

## What Was Improved

### 1. Typed Everything Clearly

```ts
type Blockchain = 'Osmosis' | 'Ethereum' | 'Arbitrum' | 'Zilliqa' | 'Neo';
type WalletBalance = {
  currency: string;
  amount: number;
  blockchain: Blockchain;
};
export type Prices = Record<string, number>;

`Clearly defined types for blockchain and prices to enable strong type-checking and better autocomplete support.`

### 2. Typed Everything Clearly

``ts
const LOWEST_PRIORITY = 0;
const mapPriority: Record<Blockchain, number> = {
  Osmosis: 100,
  Ethereum: 50,
  Arbitrum: 30,
  Zilliqa: 20,
  Neo: 20,
};

`Instead of hardcoding logic for priority, we created a map with descriptive values for each blockchain.`
`Benefit: Easy to change, reuse, and expand in the future.`

### 3. Extracted getPriority Helper

``ts   
const getPriority = (blockchain: Blockchain): number =>
  mapPriority[blockchain] ?? LOWEST_PRIORITY;

`Centralized the logic for resolving priority to avoid repetition`
`Benefit: Separation of concerns and better testability.`


### 4. Filtered Invalid Balances
``ts
const filterValidBalances = (balances: WalletBalance[]) =>
  balances.filter(
    (balance) =>
      balance.amount > 0 && getPriority(balance.blockchain) > LOWEST_PRIORITY
  );


`Moved the filtering logic into a clear function.`
`Benefit: Improves readability and separates business logic from JSX.`



### 5. Sorted by Priority
``ts
const sortByBlockchainPriority = (balances: WalletBalance[]) =>
  balances.sort(
    (a, b) => getPriority(b.blockchain) - getPriority(a.blockchain)
  );

`Sorting is now handled by a dedicated function with explicit sorting logic.`
`Benefit: Code clarity and reuse.`


### 6. Mapped to UI Rows

``tsx
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
        className="row"
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={formattedAmount}
      />
    );
  });

`Abstracted mapping logic into a pure function with all the calculation logic encapsulated.`
`Benefit: Easier to test, debug, and update formatting logic.`

### 7. Memoized the Rendering Logic

``ts
const rows = useMemo(() => {
  const validBalances = filterValidBalances(balances);
  const sortedBalances = sortByBlockchainPriority(validBalances);
  return mapBalancesToRows(sortedBalances, prices);
}, [balances, prices]);


`All expensive computations are wrapped in useMemo, which improves rendering performance.`
`Benefit: Prevents unnecessary re-renders and improves efficiency.`

### 8. Clean Return Statement

``tsx
return (
  <div {...props}>
    {rows}
  </div>
);


`Final rendering is clean, focusing only on layout and display.`
`Benefit: JSX remains simple and declarative.`

