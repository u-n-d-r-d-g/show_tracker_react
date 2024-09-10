import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from './hooks/useAuth';
import { ErrorPage, ShowsPage, SignInPage } from './pages';
import './App.css';

function AppRoutes() {
  const { isSignedIn } = useAuth();

  return (
    <Routes>
      <Route path="/" element={isSignedIn ? <ShowsPage /> : <SignInPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

function App() {
  const { t: tCommon } = useTranslation('common');

  return (
    <BrowserRouter>
      <Suspense fallback={tCommon('loading')}>
        <AuthProvider
          signInEndpoint={`${import.meta.env.VITE_APP_API_URL}signin`}
          signOutEndpoint={`${import.meta.env.VITE_APP_API_URL}signout`}
        >
          <AppRoutes />
        </AuthProvider>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
