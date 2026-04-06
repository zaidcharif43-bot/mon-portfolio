import { AppLink } from "../components/AppLink";
import { projects } from "../data/projects";

function ProjectCard({ item }) {
  return (
    <article className="project-card reveal">
      <div className="project-top">
        <h4 className="project-title">{item.title}</h4>
        <div className="chips">
          <span className="chip">{item.category}</span>
        </div>
      </div>
      <div className="project-body">
        <p>{item.description}</p>
        <div className="project-links">
          {item.links.map((link) => (
            <a
              key={`${item.title}-${link.label}`}
              className={`project-link ${link.alt ? "alt" : ""}`.trim()}
              href={link.url}
              target="_blank"
              rel="noopener"
            >
              <i className={`fa-solid ${link.icon}`} /> {link.label}
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}

export function PortfolioPage() {
  const categories = new Set(projects.map((p) => p.category));
  const totalLinks = projects.reduce((sum, p) => sum + p.links.length, 0);

  return (
    <section className="portfolio">
      <div className="container">
        <h2 className="section-title" data-typewriter="Portfolio" data-type-speed="52">
          Portfolio
        </h2>
        <p className="tagline" style={{ textAlign: "center", marginBottom: 18 }} data-typewriter="Tous Mes Ateliers" data-type-speed="35">
          Tous Mes Ateliers
        </p>
        <div className="portfolio-hero reveal">
          <div className="portfolio-hero-copy">
            <span className="portfolio-kicker">Selected work</span>
            <h3>Un parcours visuel, technique et vivant.</h3>
            <p>
              Une selection de projets en base de donnees, React, Laravel et Node.js, presentee comme une galerie
              interactive avec des animations discretes et une lecture plus elegante.
            </p>
            <div className="portfolio-actions">
              <AppLink to="contact.html" className="btn-main">
                <i className="fa-regular fa-paper-plane" /> Me Contacter
              </AppLink>
              <AppLink to="cv.html" className="btn-ghost">
                <i className="fa-regular fa-file-lines" /> Voir Mon CV
              </AppLink>
            </div>
          </div>
          <div className="portfolio-metrics" aria-label="Statistiques du portfolio">
            <div className="metric-card">
              <span>{projects.length}</span>
              <small>Projets</small>
            </div>
            <div className="metric-card">
              <span>{categories.size}</span>
              <small>Categories</small>
            </div>
            <div className="metric-card">
              <span>{totalLinks}</span>
              <small>Liens utiles</small>
            </div>
          </div>
        </div>

        <div className="project-grid" id="project-grid">
          {projects.map((item) => (
            <ProjectCard item={item} key={item.title} />
          ))}
        </div>
      </div>
    </section>
  );
}
