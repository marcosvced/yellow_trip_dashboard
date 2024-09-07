export function useMoney(amount) {
  const locale = 'en-US'
  return new Intl.NumberFormat(locale, { style: 'currency', currency: amount.currency }).format(amount.value)
}
