import { Card, Layout, Page, Text } from '@shopify/polaris';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

export default function HomePage() {
  const {
    shop: { shop: merchantShop },
  } = useSelector((state: RootState) => state);

  return (
    <Page title={`Hello, ${merchantShop?.name}`}>
      <Layout>
        <Layout.AnnotatedSection title="Example annotated section">
          <Card>
            <Text variant="headingMd" as="h2">
              Annotated section heading
            </Text>
          </Card>
        </Layout.AnnotatedSection>
        <Layout.Section>
          <Card>Example section</Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
