import { ECurrencies } from 'src/types/currencies.type';

export function formatMoneyShopify(
  currency: keyof typeof ECurrencies,
  amount: number
) {
  let locale = ECurrencies[currency];
  if (!locale) {
    locale = ECurrencies['USD'];
  }
  const formattedAmount = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(amount);

  return formattedAmount;
}
