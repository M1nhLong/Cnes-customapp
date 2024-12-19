import "@shopify/polaris/build/esm/styles.css";
import { User, signInWithCustomToken, signOut } from "firebase/auth";
import React from "react";
import { createRoot } from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import App from "./App.tsx";
import { appValidRequest } from "./actions/app-action.ts";
import { merchantLogin } from "./actions/merchant-action.ts";
import { storeShopifyShopData } from "./actions/shop-action.ts";
import LoadingScreen from "./components/screens/loading-screen.tsx";
import {
  api,
  auth,
  clearShopCookies,
  isOutsideShopify,
  shop,
  shopAddress,
} from "./helpers.ts";
import "./i18n.ts";
import "./sass/index.scss";
import store from "./store.ts";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(<LoadingScreen />);

async function initializeApp() {
  const handleShopifySignIn = async () => {
    try {
      if (shop) {
        const loginResponse = await signInWithCustomToken(auth, shop);
        const user = loginResponse.user;
        if (user?.uid) {
          store.dispatch(merchantLogin(JSON.parse(JSON.stringify(user))));
        }
      }
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const handleShopifyVerify = async () => {
    try {
      const response = await api("/shopify/merchant/verify", "POST");

      if (response?.code === 200) {
        if (
          typeof response.data === "object" &&
          Object.prototype.hasOwnProperty.call(response.data, "shop") &&
          Object.prototype.hasOwnProperty.call(response.data, "session")
        ) {
          const currentUserEmail = auth?.currentUser?.email || "";
          const shopId = response.data.shop?.id?.toString();

          const currentUserEmailMatch =
            currentUserEmail.match(/shopify_(\d+)_/);
          const id = currentUserEmailMatch ? currentUserEmailMatch[1] : "";

          if (shopId !== id) {
            console.log("handleShopifySignIn...");
            await handleShopifySignIn();
          } else if (
            typeof response.data.shop === "object" &&
            typeof response.data.session === "object"
          ) {
            store.dispatch(
              merchantLogin(JSON.parse(JSON.stringify(auth.currentUser)))
            );
            store.dispatch(
              storeShopifyShopData({
                session: response.data.session,
                shop: response.data.shop,
              })
            );
          }
        }
      }
    } catch (error) {
      console.error("Shop Installed: ", error);
      await signOut(auth);
      clearShopCookies();
      window.location.reload();
    }
  };

  const handleAuthState = async (user: User | null) => {
    const shouldSignIn = Boolean(shop && !isOutsideShopify());

    if (!user && shouldSignIn) {
      await handleShopifySignIn();
    } else if (user) {
      await handleShopifyVerify();
    }

    if (user && shop && shopAddress && !isOutsideShopify()) {
      store.dispatch(appValidRequest());
    }

    const shouldCheckShopInstalled =
      isOutsideShopify() &&
      shop &&
      window.parent.location.pathname !== "/auth/login";

    if (shouldCheckShopInstalled) {
      if (shopAddress && shop && !user) {
        try {
          await signInWithCustomToken(auth, shop);
        } catch (error) {
          console.error("Error signing in:", error);
          window.location.reload();
          clearShopCookies();
        }
      } else if (user) {
        try {
          await handleShopifyVerify();
        } catch (error) {
          console.error("Shop Installed: ", error);
          await signOut(auth);
        }
      }
    }

    root.render(
      <React.StrictMode>
        <ReduxProvider store={store}>
          <App />
        </ReduxProvider>
      </React.StrictMode>
    );
  };

  auth.onAuthStateChanged(handleAuthState);
}

initializeApp();
