import { useEffect, useState } from "react";

export function UiChrome() {
  const [progress, setProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const updateScrollUI = () => {
      const doc = document.documentElement;
      const maxScroll = doc.scrollHeight - window.innerHeight;
      const next = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, next)));
      setShowBackToTop(window.scrollY > 420);
    };

    updateScrollUI();
    window.addEventListener("scroll", updateScrollUI, { passive: true });
    window.addEventListener("resize", updateScrollUI);

    return () => {
      window.removeEventListener("scroll", updateScrollUI);
      window.removeEventListener("resize", updateScrollUI);
    };
  }, []);

  return (
    <>
      <div
        className="scroll-progress"
        aria-hidden="true"
        style={{ width: `${progress.toFixed(2)}%` }}
      />
      <button
        type="button"
        className={`back-to-top ${showBackToTop ? "show" : ""}`}
        aria-label="Retour en haut"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <i className="fa-solid fa-arrow-up" />
      </button>
    </>
  );
}
