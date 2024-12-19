import axios from "axios";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import Cookies from "js-cookie";
import { COOKIE_SHOP_ADDRESS, COOKIE_SHOP_ORIGIN } from "./types/cookie-types";

const app = initializeApp({
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
});

export const client = axios.create({
  baseURL: "/api",
  timeout: 300000,
});

export const auth = getAuth(app);

export function detectShop() {
  return Cookies.get(COOKIE_SHOP_ORIGIN);
}

export function detectShopAddress() {
  return Cookies.get(COOKIE_SHOP_ADDRESS);
}

export const shop = detectShop();
export const shopAddress = detectShopAddress();

/**
 * A method to call API with given settings
 *
 * @param {string} url - The API endpoint URL
 * @param {string} method - The HTTP method (default is 'GET')
 * @param {object} data - The data to send with the request
 * @param {object} params - The URL parameters to send with the request
 * @param {object} options - Additional options for the request
 * @return {Promise<any>} - The response data from the API
 */
export async function api(
  url: string,
  method: string = "GET",
  data: object = {},
  params: object = {},
  options: { headers?: { [key: string]: string } } = {}
): Promise<any> {
  let idToken: string | undefined;

  if (options.headers?.["x-app-token"]) {
    idToken = options.headers["x-app-token"];
  } else if (auth.currentUser) {
    idToken = await auth.currentUser.getIdToken(false);
  }

  return client
    .request({
      ...options,
      headers: {
        accept: "application/json",
        ...(options.headers || {}),
        "x-app-token": idToken,
        "x-app-shopify-domain": shopAddress || "",
      },
      url,
      method,
      data,
      params,
    })
    .then((res) => res.data);
}

export function isOutsideShopify() {
  try {
    return !!window.parent.location.pathname;
  } catch {
    return false;
  }
}

export function clearShopCookies() {
  ["shopOrigin", "shopAddress"].forEach((cookieName) => {
    Cookies.remove(cookieName, {
      path: "/",
      domain: `.${window.location.hostname}`,
    });
  });
}
