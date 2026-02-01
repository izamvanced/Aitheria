
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { PageProvider, usePageManagement } from './context/PageContext';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import PreviewPage from './pages/PreviewPage';
import CustomPage from './pages/CustomPage';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import Footer from './components/Footer';

const AppRoutes: React.FC = () => {
  const { pages } = usePageManagement();
  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen bg-[var(--bg)] text-[var(--fg)]">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute>
                  <AdminPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/preview" 
              element={
                <ProtectedRoute>
                  <PreviewPage />
                </ProtectedRoute>
              } 
            />
            {pages.map(page => (
              <Route 
                key={page.id} 
                path={`/pages/${page.slug}`} 
                element={<CustomPage />} 
              />
            ))}
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <PageProvider>
          <AppRoutes />
        </PageProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
