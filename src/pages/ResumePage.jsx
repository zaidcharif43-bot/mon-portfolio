import { useState } from "react";
import { AppLink } from "../components/AppLink";

export function ResumePage() {
  const [activeTab, setActiveTab] = useState("skills");

  return (
    <section>
      <div className="container">
        <h2 className="section-title" data-typewriter="Resume" data-type-speed="52">
          Resume
        </h2>
        <div className="resume-hero reveal">
          <div className="resume-hero-copy">
            <span className="portfolio-kicker">Professional snapshot</span>
            <h3>Un resume clair, vivant et oriente execution.</h3>
            <p>
              Un apercu direct de mes competences techniques, de mon parcours de formation et de ma capacite a livrer
              des interfaces modernes avec des bases de donnees solides.
            </p>
            <div className="resume-actions">
              <AppLink to="cv.html" className="btn-main">
                <i className="fa-regular fa-file-lines" /> Voir le CV
              </AppLink>
              <AppLink to="portfolio.html" className="btn-ghost">
                <i className="fa-solid fa-briefcase" /> Voir les ateliers
              </AppLink>
            </div>
          </div>
          <div className="resume-meta">
            <div className="resume-stat">
              <i className="fa-solid fa-code" />
              <h4>Front-end</h4>
              <p>HTML5, CSS3, JavaScript, React</p>
            </div>
            <div className="resume-stat">
              <i className="fa-solid fa-server" />
              <h4>Back-end</h4>
              <p>Node.js, Laravel, APIs REST, JWT</p>
            </div>
            <div className="resume-stat">
              <i className="fa-solid fa-database" />
              <h4>Data</h4>
              <p>MySQL, MongoDB, modelisation SQL/NoSQL</p>
            </div>
          </div>
        </div>

        <div className="tab-head" id="resume-tabs">
          <button className={activeTab === "skills" ? "active" : ""} onClick={() => setActiveTab("skills")}>Skills</button>
          <button className={activeTab === "education" ? "active" : ""} onClick={() => setActiveTab("education")}>
            Education
          </button>
        </div>

        <div id="skills-panel" className={`tab-panel ${activeTab === "skills" ? "show" : ""}`}>
          <div className="skills-grid">
            <div className="skill"><i className="fa-brands fa-html5" /><span>HTML5</span></div>
            <div className="skill"><i className="fa-brands fa-css3-alt" /><span>CSS3</span></div>
            <div className="skill"><i className="fa-brands fa-js" /><span>JavaScript</span></div>
            <div className="skill"><i className="fa-brands fa-react" /><span>React.js</span></div>
            <div className="skill"><i className="fa-brands fa-node-js" /><span>Node.js</span></div>
            <div className="skill"><i className="fa-brands fa-laravel" /><span>Laravel</span></div>
            <div className="skill"><i className="fa-solid fa-database" /><span>MySQL</span></div>
            <div className="skill"><span className="custom">M</span><span>MongoDB</span></div>
            <div className="skill"><span className="custom">SQL</span><span>SQL Avance</span></div>
            <div className="skill"><i className="fa-brands fa-github" /><span>GitHub</span></div>
            <div className="skill"><span className="custom">API</span><span>REST APIs</span></div>
            <div className="skill"><span className="custom">UX</span><span>UI/UX Basics</span></div>
          </div>
        </div>

        <div id="education-panel" className={`tab-panel ${activeTab === "education" ? "show" : ""}`}>
          <div className="cards">
            <article className="card">
              <div className="card-year">2024 - 2025</div>
              <h4>Programmation Avancee</h4>
              <div className="card-company"><i className="fa-solid fa-circle" /> Formation en ligne</div>
              <p>Approfondissement des bonnes pratiques de developpement, architecture et qualite du code.</p>
            </article>
            <article className="card">
              <div className="card-year">2024 - 2025</div>
              <h4>Web Development Bootcamp</h4>
              <div className="card-company"><i className="fa-solid fa-circle" /> Plateforme digitale</div>
              <p>Formation full stack avec projets pratiques en JavaScript moderne, backend et bases de donnees.</p>
            </article>
            <article className="card">
              <div className="card-year">2024 - 2025</div>
              <h4>Certification Web</h4>
              <div className="card-company"><i className="fa-solid fa-circle" /> Cursus professionnalisant</div>
              <p>Parcours certifiant centre sur la conception d&apos;applications web et la livraison de projets.</p>
            </article>
            <article className="card">
              <div className="card-year">2024 - 2025</div>
              <h4>Bases de Donnees</h4>
              <div className="card-company"><i className="fa-solid fa-circle" /> SQL et NoSQL</div>
              <p>Modelisation, normalisation et optimisation des requetes pour des systemes de donnees robustes.</p>
            </article>
            <article className="card">
              <div className="card-year">2024 - 2025</div>
              <h4>Developpement Backend</h4>
              <div className="card-company"><i className="fa-solid fa-circle" /> Node.js et PHP</div>
              <p>Mise en place d&apos;API, gestion des sessions, securite applicative et structuration de serveurs.</p>
            </article>
            <article className="card">
              <div className="card-year">2024 - 2025</div>
              <h4>Developpement Front-end</h4>
              <div className="card-company"><i className="fa-solid fa-circle" /> HTML, CSS, JS</div>
              <p>Fondamentaux de la creation d&apos;interfaces web responsives et interactions utilisateur fluides.</p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
