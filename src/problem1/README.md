# Sum to N — JavaScript Solutions

This project demonstrates 3 different ways to calculate the sum of numbers from `1` to `n`.

---

## 1. `formulaSumToN(n)` — Math Formula

```js
function formulaSumToN (n) {
  return (n * (n + 1)) / 2;
};
```

* Uses the formula: *n × (n + 1) ÷ 2*
* Fastest (O(1) time complexity)

---

## 2. `loopSumToN(n)` — Iterative Loop

```js
 function loopSumToN(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
};
```

* Adds numbers from 1 to `n` in a loop
* Simple and beginner-friendly (O(n) time)

---

## 3. `recursiveSumToN(n)` — Recursion

```js
function recursiveSumToN(n) {
  if (n <= 1) return 1;
  return n + recursiveSumToN(n - 1);
};
```

* Calls itself until `n <= 1`
* Elegant but less efficient for large `n` due to call stack (O(n) time)

---

## How to Run

Make sure [Node.js](https://nodejs.org) is installed.

```bash
node src/problem1/sum.js
```

---

## Summary

| Method       | Speed    | Readability | Note                   |
| ------------ | -------- | ----------- | ---------------------- |
| Math Formula | 🔥 Fast  | ✅ Clear     | Best performance       |
| For Loop     | ⚡ Medium | ✅ Clear     | Easy to understand     |
| Recursion    | 🚒 Slow  | ⚠️ Moderate | Risk of stack overflow |
