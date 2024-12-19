export function getShopOrigin() {
  const params = new URLSearchParams(window.location.search);
  return params.get('shop');
}
