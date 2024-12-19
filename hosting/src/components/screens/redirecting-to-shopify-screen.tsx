import { Text } from '@shopify/polaris';
import { useTranslation } from 'react-i18next';

export default function RedirectingToShopifyScreen() {
  const { t } = useTranslation();

  return (
    <div className="AppRedirecting">
      <Text alignment="center" as="h2" variant="bodyLg">
        {t('navigating_to_shopify')}
      </Text>
    </div>
  );
}
