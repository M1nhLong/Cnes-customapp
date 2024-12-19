import { Controller, Get, HttpStatus, Query, Req, Res } from "@nestjs/common";
import { RequestedTokenType, Session } from "@shopify/shopify-api";
import "@shopify/shopify-api/adapters/node";
import { Request, Response } from "express";
import * as admin from "firebase-admin";
import { UserRecord } from "firebase-admin/auth";
import appConfig, { appEnvironment } from "src/config";
import { SHOP_ADDRESS_IDENTITY, SHOP_ORIGIN_IDENTITY } from "src/constants";
import { shopify } from "src/main";
import { sessionRepo, shopRepo } from "src/repositories";
import { IShopifyShop } from "src/types/shopify.type";
import { createShopifyRestAPIClient, pick } from "src/utilities";
import jwt from "jsonwebtoken";

function firebaseAuthEmail(email: string, shop_id: number) {
  return `${appEnvironment.toLowerCase}_shopify_${shop_id}_${email}`.toLowerCase();
}

interface SessionPayload {
  iss: string;
  dest: string;
  aud: string;
  sub: string;
  exp: number;
  nbf: number;
  iat: number;
  jti: string;
  sid: string;
  sig: string;
}

@Controller("shopify/auth")
export class ShopifyAuthController {
  SHOPIFY_API_KEY: string;
  SHOPIFY_API_SECRET: string;

  constructor() {
    this.SHOPIFY_API_KEY = appConfig.shopify.app_key;
    this.SHOPIFY_API_SECRET = appConfig.shopify.app_secret;
  }

  @Get("")
  async auth(
    @Query("shop") shop: string,
    @Res() res: Response,
    @Req() req: Request
  ) {
    try {
      await shopify.auth.begin({
        shop: shopify.utils.sanitizeShop(shop, true),
        callbackPath: "/api/shopify/auth/callback",
        isOnline: false,
        rawRequest: req,
        rawResponse: res,
      });
    } catch (error) {
      console.error("ShopifyController.auth -> error: ", error);
      return res.status(HttpStatus.BAD_REQUEST).json({
        error_code: 400,
        error_message:
          error instanceof Error ? error.message : "Internal server error",
      });
    }
  }

  @Get("callback")
  async authCallback(
    @Query() query: any,
    @Req() req: Request,
    @Res() res: Response
  ) {
    try {
      const idToken = query?.id_token || "";
      const sessionToken = query?.session || "";

      let isSuccess: { session: Session };

      if (idToken === "" && sessionToken === "") {
        isSuccess = await shopify.auth.callback({
          rawRequest: req,
          rawResponse: res,
        });
      } else {
        const verifySession = jwt.verify(idToken, this.SHOPIFY_API_SECRET) as
          | SessionPayload
          | undefined;

        if (!verifySession) {
          throw new Error("Error: Invalid session");
        }

        const existingSessions = await sessionRepo.findSessionsByShop(
          new URL(verifySession.dest).hostname
        );

        if (existingSessions.length === 0) {
          isSuccess = await shopify.auth.tokenExchange({
            requestedTokenType: RequestedTokenType.OfflineAccessToken,
            sessionToken: idToken,
            shop: query.shop,
          });
        } else {
          isSuccess = {
            session: new Session(existingSessions[0]),
          };
        }
      }

      await sessionRepo.storeSession(isSuccess.session);

      const existingShops = await shopRepo.findShopByShopifyDomain(
        isSuccess.session.shop
      );

      let shopifyShop: IShopifyShop;

      const client = createShopifyRestAPIClient(isSuccess.session);
      if (existingShops.length < 1) {
        const {
          body: { shop: shopData },
        } = await client.get({ path: "shop" });
        shopifyShop = shopData;
      } else {
        shopifyShop = existingShops[0];
      }

      if (!shopifyShop.id) {
        throw new Error("Error: Invalid shop");
      }

      let user: UserRecord;

      try {
        user = await admin
          .auth()
          .getUserByEmail(firebaseAuthEmail(shopifyShop.email, shopifyShop.id));
      } catch (error) {
        console.log("ShopifyAuthCallBackError:FirebaseAuth", error);
        if (error.code === "auth/user-not-found" && shopifyShop) {
          user = await admin.auth().createUser({
            disabled: false,
            displayName: shopifyShop.name || shopifyShop.email || "",
            email: firebaseAuthEmail(shopifyShop.email, shopifyShop.id),
            emailVerified: false,
          });
        }
      }

      await shopRepo.createShop(shopifyShop);

      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 7);

      const token = await admin.auth().createCustomToken(user.uid, {
        shop: pick(isSuccess.session, ["shop"]),
      });

      res.cookie(SHOP_ADDRESS_IDENTITY, shopifyShop.myshopify_domain, {
        httpOnly: false,
        domain: appConfig.shopify.app_url,
        sameSite: "none",
        secure: true,
        expires: expirationDate,
      });

      res.cookie(SHOP_ORIGIN_IDENTITY, token, {
        httpOnly: false,
        domain: appConfig.shopify.app_url,
        sameSite: "none",
        secure: true,
        expires: expirationDate,
      });

      return res.redirect(`/?embedded=1&shop=${shopifyShop.myshopify_domain}`);
    } catch (error) {
      console.error("ShopifyAuthController.authCallback -> error", error);
      if (error instanceof Error) {
        if (
          error.message.includes(
            "Cannot complete OAuth process. Could not find an OAuth cookie for shop url: "
          )
        ) {
          const shopDomain = error.message.replace(
            "Cannot complete OAuth process. Could not find an OAuth cookie for shop url: ",
            ""
          );
          return res.redirect(`/api/shopify/auth?shop=${shopDomain}`);
        }
      }
      return res.status(HttpStatus.BAD_REQUEST).json({
        error_code: HttpStatus.BAD_REQUEST,
        error_message:
          error instanceof Error ? error.message : "Internal server error",
      });
    }
  }
}
