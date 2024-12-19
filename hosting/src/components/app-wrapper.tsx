import { Loading } from "@shopify/polaris";
import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigation } from "react-router-dom";
import { auth, isOutsideShopify, shopAddress } from "../helpers";
import { RootState } from "../store";
import { isValidMyShopifyDomain } from "../utilities";
import RedirectingToShopifyScreen from "./screens/redirecting-to-shopify-screen";

export default function AppWrapper() {
  // const navigate = useNavigate();
  const navigation = useNavigation();
  const [isMissingAppBridgeParams, setIsMissingAppBridgeParams] =
    useState<boolean>(true);
  const [isProgressing, setIsProgressing] = useState<boolean>(true);

  const isAuthenticated = useSelector(
    (state: RootState) => state.merchant.isAuthenticated
  );
  const validRequest = useSelector(
    (state: RootState) => state.app.isValidRequest
  );
  const urlParams = new URLSearchParams(window.location.search);
  const embedded = urlParams.get("embedded");
  const shop = urlParams.get("shop");

  useEffect(() => {
    if (embedded !== "1" && !shop) {
      setIsMissingAppBridgeParams(true);
    } else if (shop && typeof isValidMyShopifyDomain(shop) === "string") {
      setIsMissingAppBridgeParams(false);
    }
    setIsProgressing(false);
  }, [embedded, shop]);

  useEffect(() => {
    if (isAuthenticated && !isMissingAppBridgeParams) {
      const metatag = document.createElement("meta");

      metatag.setAttribute("name", "shopify-api-key");
      metatag.setAttribute("content", import.meta.env.VITE_SHOPIFY_API_KEY);

      document.head.appendChild(metatag);

      const script = document.createElement("script");
      script.src = "https://cdn.shopify.com/shopifycloud/app-bridge.js";
      script.async = false;
      document.body.appendChild(script);
    }

    if (!isAuthenticated && !auth.currentUser) {
      window.location.href = "/auth/login";
    }

    if (
      auth.currentUser &&
      window.location.pathname !== "/" &&
      isOutsideShopify()
    ) {
      window.location.href = "/";
    }
  }, [isAuthenticated, isMissingAppBridgeParams]);

  if (
    isAuthenticated &&
    isMissingAppBridgeParams &&
    !isProgressing &&
    !validRequest
  ) {
    window.location.href = `/?embedded=1&shop=${shopAddress}`;
    return null;
  }

  const isLoading = navigation.state === "loading";

  return (
    <Fragment>
      {isLoading ? <Loading /> : null}
      {!isOutsideShopify() && isAuthenticated ? (
        <Outlet />
      ) : (
        <RedirectingToShopifyScreen />
      )}
    </Fragment>
  );
}
