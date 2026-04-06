import { AppLink } from "../components/AppLink";

const highlights = [
  {
    icon: "fa-solid fa-code",
    title: "Full Stack",
    description: "HTML5, CSS3, JavaScript, React, Node.js, Laravel, MySQL, MongoDB",
    speed: 35,
  },
  {
    icon: "fa-solid fa-rocket",
    title: "Performance",
    description: "Applications optimisees pour la vitesse, l'accessibilite et l'experience utilisateur premium",
    speed: 32,
  },
  {
    icon: "fa-solid fa-palette",
    title: "Design Modern",
    description: "Interfaces elegantes avec animations fluides et transitions sophistiquees",
    speed: 35,
  },
  {
    icon: "fa-solid fa-handshake",
    title: "Collaboration",
    description: "Travail d'equipe, communication claire, et livraison orientee resultats",
    speed: 35,
  },
];

export function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <p className="tagline reveal">Portfolio Personnel</p>
            <h1 className="reveal" style={{ animationDelay: "0.05s" }}>
              Hello I&apos;m
              <br />
              <span className="name">Zaid Charif Nejjar</span>
            </h1>
            <h3
              className="reveal"
              style={{ animationDelay: "0.1s" }}
              data-typewriter="Developpeur Full Stack"
              data-type-speed="45"
            >
              Developpeur Full Stack
            </h3>
            <p className="reveal" style={{ animationDelay: "0.15s" }}>
              Je concois des applications web modernes, orientees performance et experience utilisateur.
              Mon parcours combine bases de donnees, backend robuste et interfaces front-end interactives.
            </p>
            <div className="btn-row reveal" style={{ animationDelay: "0.2s" }}>
              <AppLink to="portfolio.html" className="btn-main">
                <i className="fa-solid fa-download" /> Voir Mes Projets
              </AppLink>
              <AppLink to="contact.html" className="btn-ghost">
                <i className="fa-regular fa-paper-plane" /> Me Contacter
              </AppLink>
              <a href="CV_Zaid_Charif_Nejjar.pdf" className="btn-ghost">
                <i className="fa-regular fa-file-lines" /> Mon CV
              </a>
              <div className="socials">
                <a href="https://github.com/zaidcharif43-bot" target="_blank" rel="noopener" aria-label="GitHub">
                  <i className="fa-brands fa-github" />
                </a>
                <a
                  href="https://www.linkedin.com/in/zaid-charif-nejjar"
                  target="_blank"
                  rel="noopener"
                  aria-label="LinkedIn"
                >
                  <i className="fa-brands fa-linkedin-in" />
                </a>
                <AppLink to="contact.html" aria-label="Email">
                  <i className="fa-regular fa-envelope" />
                </AppLink>
              </div>
            </div>
          </div>
          <div>
            <div className="avatar-wrap reveal" style={{ animationDelay: "0.25s" }}>
              <img src="WhatsApp Image 2025-12-09 à 19.12.09_4bbef997.jpg" alt="Photo de Zaid Charif Nejjar" />
            </div>
          </div>
        </div>
      </section>

      <section className="highlights">
        <div className="container">
          <div className="highlights-grid">
            {highlights.map((item, idx) => (
              <div className="highlight-card reveal flip-card" style={{ animationDelay: `${0.05 + idx * 0.05}s` }} key={item.title}>
                <div className="card-inner">
                  <div className="card-front">
                    <div className="highlight-icon">
                      <i className={item.icon} />
                    </div>
                    <h3>{item.title}</h3>
                  </div>
                  <div className="card-back">
                    <p className="card-description" data-hover-typewriter={item.description} data-type-speed={item.speed}>
                      {item.description}
                    </p>
                  </div>
                </div>
                <div className="highlight-accent" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="hero-cta">
        <div className="container">
          <div className="cta-content reveal">
            <h2>Pret a demarrer votre projet?</h2>
            <p>Je suis disponible pour discuter de vos idees et explorer les opportunites de collaboration.</p>
            <div className="cta-actions">
              <AppLink to="contact.html" className="btn-main">
                <i className="fa-solid fa-envelope" />
                Commencer une conversation
              </AppLink>
              <AppLink to="portfolio.html" className="btn-ghost">
                <i className="fa-solid fa-briefcase" />
                Voir le portfolio
              </AppLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
