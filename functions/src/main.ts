import { NestFactory } from "@nestjs/core";
import {
  ExpressAdapter,
  NestExpressApplication,
} from "@nestjs/platform-express";
import express from "express";
import { AppModule } from "./app.module";

import { shopifyApi } from "@shopify/shopify-api";
import "@shopify/shopify-api/adapters/node";
import appConfig from "./config";
import { SessionRepository } from "./repositories/session.repository";

import { onRequest } from "firebase-functions/v2/https";

export const shopify = shopifyApi({
  apiKey: appConfig.shopify.app_key,
  apiSecretKey: appConfig.shopify.app_secret,
  scopes: appConfig.shopify.scopes,
  hostName: appConfig.shopify.app_url,
  apiVersion: appConfig.shopify.api_version,
  isEmbeddedApp: true,
  sessionStorage: new SessionRepository(),
  future: {
    customerAddressDefaultFix: true,
    lineItemBilling: true,
  },
});

async function bootstrap() {
  const expressServer = express();
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(expressServer),
    {
      logger:
        process.env.NODE_ENV === "production"
          ? ["error", "warn"]
          : ["log", "debug", "error", "verbose", "fatal", "warn"],
    }
  );
  app.setGlobalPrefix("api");
  await app.init();
  return expressServer;
}

const APIFUNCTIONREGION = "asia-southeast1";

exports.api = onRequest(
  { memory: "256MiB", region: APIFUNCTIONREGION },
  async (req, res) => {
    const expressServer = await bootstrap();
    expressServer(req, res);
  }
);
