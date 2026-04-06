import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function usePortfolioEffects() {
  const location = useLocation();

  useEffect(() => {
    const titleMap = {
      "/": "Accueil | Zaid Charif Nejjar",
      "/about.html": "About | Zaid Charif Nejjar",
      "/resume.html": "Resume | Zaid Charif Nejjar",
      "/portfolio.html": "Portfolio | Zaid Charif Nejjar",
      "/cv.html": "Profile | Zaid Charif Nejjar",
      "/contact.html": "Contact | Zaid Charif Nejjar",
    };

    document.title = titleMap[location.pathname] || "Portfolio | Zaid Charif Nejjar";

    const body = document.body;
    body.classList.remove("page-leave");
    body.classList.add("page-enter");

    let revealObserver = null;
    let counterObserver = null;
    const tiltCleanups = [];

    const prefersReducedMotion =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const runTypewriter = (el, text, speed, startDelay) => {
      if (!el || !text) return;

      el.textContent = "";
      el.classList.add("text-typewriter");

      if (prefersReducedMotion) {
        el.textContent = text;
        el.classList.remove("is-running");
        return;
      }

      el.classList.add("is-running");
      let idx = 0;

      const tick = () => {
        el.textContent = text.slice(0, idx + 1);
        idx += 1;
        if (idx < text.length) {
          window.setTimeout(tick, speed);
        } else {
          el.classList.remove("is-running");
        }
      };

      window.setTimeout(tick, startDelay || 0);
    };

    const initTypewriter = () => {
      document.querySelectorAll("[data-typewriter]").forEach((el) => {
        const text = (el.getAttribute("data-typewriter") || el.textContent || "").trim();
        const speed = Number(el.getAttribute("data-type-speed")) || 38;
        if (!text) return;
        runTypewriter(el, text, speed, 140);
      });
    };

    const initHoverTypewriter = () => {
      document.querySelectorAll(".flip-card").forEach((card) => {
        const target = card.querySelector("[data-hover-typewriter]");
        if (!target) return;

        const text = (target.getAttribute("data-hover-typewriter") || target.textContent || "").trim();
        const speed = Number(target.getAttribute("data-type-speed")) || 35;
        if (!text) return;

        target.textContent = "";
        let hasPlayed = false;

        const start = () => {
          runTypewriter(target, text, speed, 50);
          hasPlayed = true;
        };

        const onEnter = () => start();
        const onLeave = () => target.classList.remove("is-running");
        const onFocus = () => {
          if (!hasPlayed) start();
        };

        card.addEventListener("mouseenter", onEnter);
        card.addEventListener("mouseleave", onLeave);
        card.addEventListener("focusin", onFocus);

        tiltCleanups.push(() => {
          card.removeEventListener("mouseenter", onEnter);
          card.removeEventListener("mouseleave", onLeave);
          card.removeEventListener("focusin", onFocus);
        });
      });
    };

    const initReveal = () => {
      const revealItems = document.querySelectorAll(
        ".project-card, .card, .service-card, .skill, .portfolio-hero, .resume-hero, .cv-focus, .contact-hero, .form-group, .home-link, .form-label, .form-section, .hero-grid > div, .split-grid > div, .contact-wrap, .portfolio .container > .tagline, [class*='reveal']"
      );

      if (!revealItems.length) return;

      if (prefersReducedMotion || !window.IntersectionObserver) {
        revealItems.forEach((el) => el.classList.add("show"));
        return;
      }

      revealObserver = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("show");
            obs.unobserve(entry.target);
          });
        },
        { threshold: 0.14 }
      );

      revealItems.forEach((el, index) => {
        el.classList.add("reveal");
        el.style.transitionDelay = `${Math.min(index * 35, 240)}ms`;
        revealObserver.observe(el);
      });
    };

    const animateCounters = (scope = document) => {
      scope.querySelectorAll("[data-count]").forEach((element) => {
        const target = Number(element.getAttribute("data-count") || 0);
        const suffix = element.getAttribute("data-suffix") || "";
        const duration = 900;
        const startTime = performance.now();

        const tick = (time) => {
          const progress = Math.min((time - startTime) / duration, 1);
          element.textContent = `${Math.floor(progress * target)}${suffix}`;
          if (progress < 1) {
            window.requestAnimationFrame(tick);
          }
        };

        window.requestAnimationFrame(tick);
      });
    };

    const initCounterReveal = () => {
      const scopes = document.querySelectorAll(".resume-hero, .cv-focus, .portfolio-hero");
      if (!scopes.length || prefersReducedMotion || !window.IntersectionObserver) {
        animateCounters(document);
        return;
      }

      counterObserver = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            // CV counters are outside .cv-focus, so animate all counters once a tracked section appears.
            animateCounters(document);
            obs.unobserve(entry.target);
          });
        },
        { threshold: 0.35 }
      );

      scopes.forEach((scope) => counterObserver.observe(scope));
    };

    const init3DTilt = () => {
      if (prefersReducedMotion) return;

      document.querySelectorAll(".project-card").forEach((card) => {
        const onMove = (event) => {
          const bounds = card.getBoundingClientRect();
          const relativeX = (event.clientX - bounds.left) / bounds.width;
          const relativeY = (event.clientY - bounds.top) / bounds.height;
          const rotateY = (relativeX - 0.5) * 14;
          const rotateX = (0.5 - relativeY) * 12;
          card.style.setProperty("--rx", `${rotateX.toFixed(2)}deg`);
          card.style.setProperty("--ry", `${rotateY.toFixed(2)}deg`);
        };

        const onLeave = () => {
          card.style.setProperty("--rx", "0deg");
          card.style.setProperty("--ry", "0deg");
        };

        card.addEventListener("pointermove", onMove);
        card.addEventListener("pointerleave", onLeave);

        tiltCleanups.push(() => {
          card.removeEventListener("pointermove", onMove);
          card.removeEventListener("pointerleave", onLeave);
        });
      });
    };

    const initProgressBars = () => {
      document.querySelectorAll("[data-progress]").forEach((bar) => {
        bar.style.width = "0";
      });

      if (!window.IntersectionObserver) {
        document.querySelectorAll("[data-progress]").forEach((bar) => {
          bar.style.width = `${bar.getAttribute("data-progress") || 0}%`;
        });
        return;
      }

      const cvFocus = document.querySelector(".cv-focus");
      if (!cvFocus) return;

      const observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.querySelectorAll("[data-progress]").forEach((bar) => {
              bar.style.width = `${bar.getAttribute("data-progress") || 0}%`;
            });
            obs.unobserve(entry.target);
          });
        },
        { threshold: 0.25 }
      );

      observer.observe(cvFocus);
      tiltCleanups.push(() => observer.disconnect());
    };

    const timer = window.setTimeout(() => {
      initTypewriter();
      initHoverTypewriter();
      initReveal();
      initCounterReveal();
      init3DTilt();
      initProgressBars();
      window.scrollTo({ top: 0, behavior: "auto" });
    }, 10);

    return () => {
      window.clearTimeout(timer);
      if (revealObserver) revealObserver.disconnect();
      if (counterObserver) counterObserver.disconnect();
      tiltCleanups.forEach((clean) => clean());
    };
  }, [location.pathname]);
}
