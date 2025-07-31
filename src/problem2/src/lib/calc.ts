export function formatUnitPrice(value: number | string, fixed: number = 4): string {
    return Number(value)
        .toFixed(fixed)
        .replace(/\.?0+$/, '');
}

export const prettyPrice = (
  price: number | string | null,
  maximumFractionDigits: number = 2,
  minimumFractionDigits: number = 2
) => {
  return Number(price ?? 0).toLocaleString('en-US', {
    maximumFractionDigits,
    minimumFractionDigits,
  });
};

export function formatCurrencyCompact(value: number, currency: string = 'USD') {
  return new Intl.NumberFormat('en-US', {
    notation: "compact",
    maximumFractionDigits: 2,
    style: "currency",
    currency
  }).format(value);
}