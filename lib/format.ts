const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function formatPrice(value: number) {
  return usd.format(value);
}

export function formatStorage(size: number) {
  return size >= 1024 ? `${size / 1024} TB` : `${size} GB`;
}

export function formatReviews(count: number) {
  return count > 999 ? `${(count / 1000).toFixed(1)}k` : `${count}`;
}
