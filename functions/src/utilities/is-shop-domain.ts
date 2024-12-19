export function isShopDomain(value: string) {
  let input = value.toLowerCase();

  if (!input.includes('.myshopify.com')) {
    return false;
  }

  return true;
}
