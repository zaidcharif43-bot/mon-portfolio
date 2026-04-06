import { AppLink } from "../components/AppLink";
import { projects } from "../data/projects";

const websiteProjects = [
  {
    title: "SwippyEat",
    stack: "Node.js + React",
    description: "Plateforme de gestion en temps reel orientee performance et parcours utilisateur fluide.",
    image: "assets/websites/image-1775482321685.png",
    url: "https://www.swipyeat.com",
  },
  {
    title: "FullstackShop",
    stack: "React",
    description: "Boutique moderne avec interface immersive, catalogue dynamique et experience interactive.",
    image: "assets/websites/image-1775482735925.png",
    url: "https://atelier12-rc-f74f84.gitlab.io/",
  },
  {
    title: "Figrbay",
    stack: "Laravel + React",
    description: "Marketplace avec parcours clair, contenu structure et presentation visuelle professionnelle.",
    image: "assets/websites/image-1775482830853.png",
    url: "https://figrbay-react-3a9e4e.gitlab.io/",
  },
  {
    title: "ClothesZc",
    stack: "Laravel",
    description: "Site e-commerce avec hero visuel fort, navigation simple et mise en avant des collections.",
    image: "assets/websites/image-1775482948741.png",
    url: "https://atelier11.vercel.app/",
  },
];

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
        <div className="website-showcase">
          <div className="website-header reveal">
            <h3>Mes Websites</h3>
            <p>
              Une selection de websites realises en Node.js, React et Laravel, presentes avec leur identite visuelle
              en image de fond.
            </p>
          </div>

          <div className="website-grid">
            {websiteProjects.map((item) => (
              <AppLink
                to={item.url}
                className="website-card reveal"
                key={item.title}
                style={{ backgroundImage: `url(${item.image})` }}
                aria-label={`Ouvrir ${item.title}`}
              >
                <div className="website-overlay">
                  <span className="website-stack">{item.stack}</span>
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                </div>
              </AppLink>
            ))}
          </div>
        </div>

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
