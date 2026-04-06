import { useState } from "react";
import { AppLink } from "../components/AppLink";

const DEFAULT_TOAST =
  "Si vous avez un vrai fichier PDF de CV, nommez-le cv.pdf dans ce dossier et je peux brancher le bouton de telechargement dessus.";

export function CvPage() {
  const [toast, setToast] = useState(DEFAULT_TOAST);
  const [isVisible, setIsVisible] = useState(false);
  const emailValue = "zaidcharif32@gmail.com";

  const showToast = (message) => {
    setToast(message);
    setIsVisible(true);
    window.clearTimeout(window.__cvToastTimer);
    window.__cvToastTimer = window.setTimeout(() => {
      setIsVisible(false);
      setToast(DEFAULT_TOAST);
    }, 2200);
  };

  const copyToClipboard = async (value) => {
    try {
      await navigator.clipboard.writeText(value);
      showToast("Email copie dans le presse-papiers.");
    } catch (error) {
      showToast(`Copie impossible. Email: ${value}`);
    }
  };

  return (
    <section>
      <div className="container" style={{ maxWidth: 920 }}>
        <h2 className="section-title" data-typewriter="Profile" data-type-speed="52">
          Profile
        </h2>
        <article className="card cv-card reveal">
          <div className="cv-card-top">
            <div>
              <span className="cv-kicker">Profil digital</span>
              <h3 className="cv-name">Zaid Charif Nejjar</h3>
              <p className="cv-role">Developpeur Full Stack</p>
            </div>
            <div className="cv-badge">
              <i className="fa-solid fa-sparkles" />
              <span>Open to work</span>
            </div>
          </div>

          <p className="cv-summary">
            Developpeur oriente full stack avec experience pratique en MySQL, MongoDB, JavaScript, React, Laravel et
            Node.js. Habitue a construire des applications completes, de la base de donnees jusqu&apos;au deploiement.
          </p>

          <div className="cv-stats" aria-label="Indicateurs du profil">
            <div className="cv-stat">
              <strong data-count="6" data-suffix="+">0</strong>
              <span>technos majeures</span>
            </div>
            <div className="cv-stat">
              <strong data-count="30" data-suffix="+">0</strong>
              <span>ateliers et projets</span>
            </div>
            <div className="cv-stat">
              <strong data-count="3">0</strong>
              <span>domaines principaux</span>
            </div>
          </div>

          <div className="cv-focus reveal">
            <div className="cv-focus-head">
              <span className="portfolio-kicker">Expertise</span>
              <h4>Domaines dans lesquels je livre le plus vite.</h4>
            </div>
            <div className="cv-bars">
              <div className="cv-bar">
                <div className="cv-bar-top"><span>Front-end moderne</span><strong>92%</strong></div>
                <div className="cv-bar-track"><span data-progress="92" /></div>
              </div>
              <div className="cv-bar">
                <div className="cv-bar-top"><span>Back-end & API</span><strong>88%</strong></div>
                <div className="cv-bar-track"><span data-progress="88" /></div>
              </div>
              <div className="cv-bar">
                <div className="cv-bar-top"><span>Base de donnees</span><strong>90%</strong></div>
                <div className="cv-bar-track"><span data-progress="90" /></div>
              </div>
              <div className="cv-bar">
                <div className="cv-bar-top"><span>UI / animations</span><strong>84%</strong></div>
                <div className="cv-bar-track"><span data-progress="84" /></div>
              </div>
            </div>
          </div>

          <div className="about-list cv-grid">
            <div className="about-item">
              <span>Email</span>
              <button className="copy-link" type="button" onClick={() => copyToClipboard(emailValue)}>
                {emailValue}
              </button>
            </div>
            <div className="about-item">
              <span>GitHub</span>
              <a href="https://github.com/zaidcharif43-bot" target="_blank" rel="noopener">
                github.com/zaidcharif43-bot
              </a>
            </div>
            <div className="about-item"><span>Ville</span>Tanger</div>
            <div className="about-item"><span>Langues</span>Francais, Arabe, Anglais</div>
          </div>

          <div className="cv-actions">
            <AppLink className="btn-main" to="resume.html"><i className="fa-regular fa-address-card" /> Voir Resume</AppLink>
            <AppLink className="btn-ghost" to="portfolio.html"><i className="fa-solid fa-briefcase" /> Voir Ateliers</AppLink>
            <button className="btn-ghost" type="button" id="copy-contact-btn" onClick={() => copyToClipboard(emailValue)}>
              <i className="fa-regular fa-copy" /> Copier Email
            </button>
          </div>

          <p className={`contact-note cv-note ${isVisible ? "is-visible" : ""}`} id="cv-toast" aria-live="polite">
            {toast}
          </p>
        </article>
      </div>
    </section>
  );
}
