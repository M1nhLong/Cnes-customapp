export function isValidMyShopifyDomain(value: string, force = false) {
  let input = value.toLowerCase();

  if (
    !input.includes('.myshopify.com') &&
    !input.endsWith('.myshopify.com') &&
    !force
  ) {
    input += '.myshopify.com';
  }

  try {
    const actualDomain = new URL(input);
    if (actualDomain) {
      input = actualDomain.hostname;
    }
  } catch (error) {
    /* empty */
  }

  const regex = /^[a-z0-9]+(-[a-z0-9]+)*\.myshopify\.com$/;
  return regex.test(input) ? input : false;
}
