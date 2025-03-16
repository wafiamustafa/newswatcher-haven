
import { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';

import HomePage from './pages/HomePage';
import ArticlePage from './pages/ArticlePage';
import CategoryPage from './pages/CategoryPage';
import Login from './pages/auth/Login';
import NotFound from './pages/NotFound';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminArticles from './pages/admin/AdminArticles';
import AdminCreateArticle from './pages/admin/AdminCreateArticle';
import AdminEditArticle from './pages/admin/AdminEditArticle';
import AdminComments from './pages/admin/AdminComments';
import AdminReported from './pages/admin/AdminReported';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LanguageProvider>
          <BrowserRouter>
            <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/article/:id" element={<ArticlePage />} />
                <Route path="/category/:category" element={<CategoryPage />} />
                <Route path="/login" element={<Login />} />
                
                {/* Admin Routes */}
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="articles" element={<AdminArticles />} />
                  <Route path="articles/create" element={<AdminCreateArticle />} />
                  <Route path="articles/edit/:id" element={<AdminEditArticle />} />
                  <Route path="comments" element={<AdminComments />} />
                  <Route path="reported" element={<AdminReported />} />
                </Route>
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
            <Toaster />
          </BrowserRouter>
        </LanguageProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
