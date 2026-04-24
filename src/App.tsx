import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { MainLayout } from './layouts/MainLayout';
import { HomePage } from './pages/HomePage';
import { ArticlePage } from './pages/ArticlePage';
import { SubmissionPage } from './pages/SubmissionPage';
import { EditorialDashboard } from './pages/EditorialDashboard';
import { AuthorProfilePage } from './pages/AuthorProfilePage';

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/article/:id" element={<ArticlePage />} />
            <Route path="/submit" element={<SubmissionPage />} />
            <Route path="/editorial" element={<EditorialDashboard />} />
            <Route path="/author/:name" element={<AuthorProfilePage />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </HelmetProvider>
  );
}
