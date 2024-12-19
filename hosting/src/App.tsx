import { AppProvider as PolarisProvider } from '@shopify/polaris';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import translationVI from '@shopify/polaris/locales/vi.json';
import { lazy } from 'react';
import AppWrapper from './components/app-wrapper';
import { ToastProvider } from './context/ToastContext';
import { defaultLanguage } from './i18n';

const HomePage = lazy(() => import('./pages/home-page'));
const LoginPage = lazy(() => import('./pages/login-page'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppWrapper />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
  {
    path: '/auth/login',
    element: <LoginPage />,
  },
]);

type ITranslations = {
  [key: string]: any;
};

export default function App() {
  const translations: ITranslations = {
    vi: translationVI,
  };
  const selectedTranslation = translations[defaultLanguage];
  return (
    <PolarisProvider i18n={selectedTranslation}>
      <ToastProvider>
        <RouterProvider router={router} />
      </ToastProvider>
    </PolarisProvider>
  );
}
