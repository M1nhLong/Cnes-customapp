import { ApiVersion } from "@shopify/shopify-api";
import dotenv from "dotenv";
dotenv.config();

export const appEnvironment =
  process.env.NODE_ENV === "production" ? "prod" : "dev";

const appConfig = {
  shopify: {
    app_key: process.env.SHOPIFY_API_KEY,
    app_secret: process.env.SHOPIFY_API_SECRET,
    app_url: process.env.SHOPIFY_HOST_NAME,
    scopes: [
      "write_products",
      "write_customers",
      "write_orders",
      "write_locales",
      "write_translations",
    ],
    api_version: ApiVersion.April24,
  },
};

export default appConfig;
