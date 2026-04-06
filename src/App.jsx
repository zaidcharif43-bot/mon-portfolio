import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { ResumePage } from "./pages/ResumePage";
import { PortfolioPage } from "./pages/PortfolioPage";
import { CvPage } from "./pages/CvPage";
import { ContactPage } from "./pages/ContactPage";
import { FloatingNav } from "./components/FloatingNav";
import { UiChrome } from "./components/UiChrome";
import { usePortfolioEffects } from "./hooks/usePortfolioEffects";

export function App() {
  usePortfolioEffects();

  return (
    <>
      <div className="noise" />
      <div className="transition-overlay" />
      <UiChrome />
      <main className="page-shell">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/index.html" element={<Navigate to="/" replace />} />
          <Route path="/about.html" element={<AboutPage />} />
          <Route path="/resume.html" element={<ResumePage />} />
          <Route path="/portfolio.html" element={<PortfolioPage />} />
          <Route path="/cv.html" element={<CvPage />} />
          <Route path="/contact.html" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <FloatingNav />
    </>
  );
}
