import { AppLink } from "../components/AppLink";

export function ContactPage() {
  const onSubmit = (event) => {
    event.preventDefault();
    window.alert("Merci pour votre message! Je reviendrai vers vous bientot.");
  };

  return (
    <section className="contact">
      <div className="contact-wrap">
        <AppLink to="index.html" className="home-link reveal" aria-label="Retour a l'accueil">
          <i className="fa-solid fa-house" />
        </AppLink>

        <div className="contact-hero reveal">
          <div className="contact-hero-copy">
            <span className="portfolio-kicker">Let&apos;s Connect</span>
            <h2>Commencons quelque chose d&apos;extraordinaire.</h2>
            <h3 className="reveal typewriter-subtitle" style={{ animationDelay: "0.08s" }} data-typewriter="Let&apos;s work together" data-type-speed="45">
              Let&apos;s work together
            </h3>
            <p>
              Vous avez une idee brillante ? Un projet a concretiser ? Je suis toujours ouvert a discuter de nouvelles
              opportunites et collaborations. Contactez-moi et explorons ensemble ce qui est possible.
            </p>
            <div className="contact-perks">
              <div className="perk-item"><i className="fa-solid fa-bolt" /><span>Reponse rapide</span></div>
              <div className="perk-item"><i className="fa-solid fa-handshake" /><span>Collaboration active</span></div>
              <div className="perk-item"><i className="fa-solid fa-rocket" /><span>Solutions sur mesure</span></div>
            </div>
          </div>
        </div>

        <form action="#" method="post" onSubmit={onSubmit}>
          <div className="form-wrapper">
            <div className="form-section">
              <label className="form-label reveal" style={{ animationDelay: "0.05s" }}>
                Informations Personnelles
              </label>
              <div className="contact-grid">
                <div className="form-group reveal" style={{ animationDelay: "0.1s" }}>
                  <div className="input-wrapper">
                    <i className="fa-solid fa-user" />
                    <input type="text" name="fullName" placeholder="Votre nom complet" required />
                  </div>
                </div>
                <div className="form-group reveal" style={{ animationDelay: "0.15s" }}>
                  <div className="input-wrapper">
                    <i className="fa-solid fa-envelope" />
                    <input type="email" name="email" placeholder="Email" required />
                  </div>
                </div>
                <div className="form-group reveal" style={{ animationDelay: "0.2s" }}>
                  <div className="input-wrapper">
                    <i className="fa-solid fa-phone" />
                    <input type="tel" name="phone" placeholder="Telephone" required />
                  </div>
                </div>
                <div className="form-group reveal" style={{ animationDelay: "0.25s" }}>
                  <div className="input-wrapper">
                    <i className="fa-solid fa-briefcase" />
                    <input type="text" name="subject" placeholder="Sujet du message" required />
                  </div>
                </div>
              </div>
            </div>

            <div className="form-section">
              <label className="form-label reveal" style={{ animationDelay: "0.3s" }}>
                Votre Message
              </label>
              <div className="form-group reveal" style={{ animationDelay: "0.35s" }}>
                <div className="input-wrapper textarea-wrapper">
                  <i className="fa-solid fa-message" />
                  <textarea name="message" placeholder="Decrivez votre projet ou vos idees..." required />
                </div>
              </div>
            </div>

            <div className="contact-actions reveal" style={{ animationDelay: "0.4s" }}>
              <button className="btn-main" type="submit">
                <span>Envoyer le message</span>
                <i className="fa-solid fa-paper-plane" />
              </button>
            </div>
          </div>

          <p className="contact-note reveal" style={{ animationDelay: "0.45s" }}>
            <span>ou connectez-moi sur</span>
            <AppLink to="https://github.com/zaidcharif43-bot" style={{ color: "var(--accent)", textDecoration: "none", fontWeight: 600 }}>
              GitHub: zaidcharif43-bot
            </AppLink>
          </p>
        </form>
      </div>
    </section>
  );
}
