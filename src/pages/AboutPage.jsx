import { AppLink } from "../components/AppLink";

export function AboutPage() {
  return (
    <section className="about">
      <div className="container split-grid">
        <div className="avatar-wrap" style={{ width: "min(420px,75vw)" }}>
          <img src="WhatsApp Image 2025-12-09 à 19.12.09_4bbef997.jpg" alt="Photo portrait de Zaid Charif Nejjar" />
        </div>
        <div>
          <p className="tagline">About</p>
          <h2 data-typewriter="About Me" data-type-speed="46">
            About Me
          </h2>
          <h3 data-typewriter="Developpeur Full Stack" data-type-speed="40">
            Developpeur Full Stack
          </h3>
          <p>
            Passionne par la creation de solutions web completes, je travaille sur des projets allant de la
            modelisation de donnees (MySQL, MongoDB) jusqu&apos;au developpement d&apos;applications avec JavaScript, React,
            Laravel et Node.js. J&apos;aime transformer une idee en produit fonctionnel, clair et evolutif.
          </p>
          <div className="about-list">
            <div className="about-item">
              <span>Specialites</span>
              Applications web, API et DB
            </div>
            <div className="about-item">
              <span>Stack</span>
              Laravel, React, Node.js, SQL
            </div>
            <div className="about-item">
              <span>Approche</span>
              Qualite, architecture, tests
            </div>
            <div className="about-item">
              <span>Objectif</span>
              Livrer des produits utiles
            </div>
          </div>
          <AppLink to="resume.html" className="btn-main">
            Voir Resume <i className="fa-solid fa-arrow-right" />
          </AppLink>
        </div>
      </div>
    </section>
  );
}
