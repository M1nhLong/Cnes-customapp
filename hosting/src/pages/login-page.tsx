import {
  Banner,
  BlockStack,
  Button,
  Card,
  Form,
  FormLayout,
  Layout,
  Page,
  Text,
  TextField,
} from "@shopify/polaris";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { useToast } from "../context/ToastContext";
import { isOutsideShopify } from "../helpers";
import { isValidMyShopifyDomain } from "../utilities";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function LoginPage() {
  const { t } = useTranslation();
  const { addToast } = useToast();
  const [shop, setShop] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [showMultipleDeviceDetect, setShowMultipleDeviceDetect] =
    useState<boolean>(false);

  useEffect(() => {
    const multipleDeviceDetect = searchParams.get("mdd");

    if (multipleDeviceDetect === "1") {
      setShowMultipleDeviceDetect(true);
      searchParams.delete("mdd");
      setSearchParams(searchParams);
    }
  }, [searchParams, setSearchParams]);

  const handleSubmitForm = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsLoading(true);

      try {
        if (!shop) {
          throw new Error("Shop domain is required.");
        }

        const shopifyDomain = isValidMyShopifyDomain(shop);
        if (!shopifyDomain) {
          throw new Error("Invalid shop domain.");
        }

        window.parent.location.href = `/api/shopify/auth?shop=${shopifyDomain}`;
      } catch (error: any) {
        addToast(
          error instanceof Error
            ? error.message
            : "An unexpected error occurred.",
          "error"
        );
      } finally {
        setIsLoading(false);
      }
    },
    [addToast, shop]
  );

  useEffect(() => {
    if (!isOutsideShopify()) {
      window.parent.location.href = "/auth/login";
    }
  }, []);

  return (
    <Page>
      <Layout>
        {showMultipleDeviceDetect && (
          <Layout.Section>
            <Banner tone="critical" title={t("multiple_device_detect")} />
          </Layout.Section>
        )}
        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <Text variant="headingMd" as="h1">
                Shopify App Template
              </Text>
              <Form onSubmit={handleSubmitForm}>
                <FormLayout>
                  <TextField
                    label=""
                    name="shop"
                    placeholder="example.myshopify.com"
                    value={shop}
                    onChange={(value) => setShop(value)}
                    autoComplete="shop"
                  />
                  <Button
                    loading={isLoading}
                    submit
                    size="large"
                    variant="primary">
                    Install
                  </Button>
                </FormLayout>
              </Form>
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
