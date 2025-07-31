const n = 5

function formulaSumToN(n) {
  return (n * (n + 1)) / 2;
};

function loopSumToN(n) {
   let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
};

function recursiveSumToN(n) {
     if (n <= 1) return 1;
  return n + recursiveSumToN(n - 1);
} 

console.log('formulaSumToN :', formulaSumToN(n)) // 15
console.log('loopSumToN :', loopSumToN(n)) // 15
console.log('recursiveSumToN :', recursiveSumToN(n)) // 15
