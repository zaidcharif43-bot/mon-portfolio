(function () {
    var page = document.body.dataset.page || "home";
    document.body.classList.add("page-enter");
    var TRANSITION_MS = 300;
    var prefersReducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    var progressBar = document.createElement("div");
    progressBar.className = "scroll-progress";
    progressBar.setAttribute("aria-hidden", "true");
    document.body.appendChild(progressBar);

    var backToTop = document.createElement("button");
    backToTop.type = "button";
    backToTop.className = "back-to-top";
    backToTop.setAttribute("aria-label", "Retour en haut");
    backToTop.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
    document.body.appendChild(backToTop);

    var navLinks = document.querySelectorAll(".floating-nav a[data-page-link]");
    navLinks.forEach(function (link) {
        if (link.dataset.pageLink === page) {
            link.classList.add("active");
        }
    });

    function updateScrollUI() {
        var doc = document.documentElement;
        var maxScroll = doc.scrollHeight - window.innerHeight;
        var progress = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
        progressBar.style.width = Math.min(100, Math.max(0, progress)).toFixed(2) + "%";
        backToTop.classList.toggle("show", window.scrollY > 420);
    }

    window.addEventListener("scroll", updateScrollUI, { passive: true });
    window.addEventListener("resize", updateScrollUI);
    updateScrollUI();

    backToTop.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
    });

    function isInternalHtmlLink(href) {
        if (!href) return false;
        if (href.startsWith("#")) return false;
        if (href.startsWith("http://") || href.startsWith("https://")) {
            try {
                var currentOrigin = window.location.origin;
                var target = new URL(href);
                if (target.origin !== currentOrigin) return false;
            } catch (e) {
                return false;
            }
        }
        return href.endsWith(".html") || href.indexOf(".html?") > -1 || href.indexOf(".html#") > -1;
    }

    function isSamePage(url) {
        try {
            var target = new URL(url, window.location.href);
            return target.pathname === window.location.pathname && target.search === window.location.search;
        } catch (e) {
            return false;
        }
    }

    function startTransition(url) {
        if (!url || document.body.classList.contains("page-leave")) return;
        if (isSamePage(url)) return;
        document.body.classList.remove("page-enter");
        document.body.classList.add("page-leave");
        window.setTimeout(function () {
            window.location.href = url;
        }, TRANSITION_MS);
    }

    document.addEventListener("click", function (event) {
        if (event.defaultPrevented) return;
        if (event.button !== 0) return;
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

        var target = event.target;
        if (!target) return;
        var anchor = target.closest("a");
        if (!anchor) return;

        var href = anchor.getAttribute("href");
        if (!isInternalHtmlLink(href)) return;
        if (anchor.target && anchor.target !== "_self") return;
        if (anchor.hasAttribute("download")) return;

        event.preventDefault();
        startTransition(href);
    });

    function tabify(containerId) {
        var container = document.getElementById(containerId);
        if (!container) return;

        var buttons = container.querySelectorAll("button[data-target]");
        buttons.forEach(function (btn) {
            btn.addEventListener("click", function () {
                buttons.forEach(function (b) { b.classList.remove("active"); });
                btn.classList.add("active");

                var scope = container.closest("section") || document;
                var panels = scope.querySelectorAll(".tab-panel");
                panels.forEach(function (panel) { panel.classList.remove("show"); });

                var panel = document.getElementById(btn.dataset.target);
                if (panel) panel.classList.add("show");
            });
        });
    }

    function normalizeLocalHref(url) {
        if (!url) return "#";
        var clean = String(url).trim();
        if (/^(https?:|mailto:|tel:|#)/i.test(clean)) return clean;
        return encodeURI(clean);
    }

    function initProjectLinks() {
        var links = document.querySelectorAll(".project-link[href]");
        links.forEach(function (link) {
            var href = link.getAttribute("href");
            link.setAttribute("href", normalizeLocalHref(href));
        });
    }

    function runTypewriter(el, text, speed, startDelay) {
        if (!el || !text) return;

        el.textContent = "";
        el.classList.add("text-typewriter");

        if (prefersReducedMotion) {
            el.textContent = text;
            el.classList.remove("is-running");
            return;
        }

        el.classList.add("is-running");
        var idx = 0;
        var tick = function () {
            el.textContent = text.slice(0, idx + 1);
            idx += 1;
            if (idx < text.length) {
                window.setTimeout(tick, speed);
            } else {
                el.classList.remove("is-running");
            }
        };

        window.setTimeout(tick, startDelay || 0);
    }

    function initTypewriter() {
        var items = document.querySelectorAll("[data-typewriter]");
        if (!items.length) return;

        items.forEach(function (el) {
            var text = (el.getAttribute("data-typewriter") || el.textContent || "").trim();
            var speed = Number(el.getAttribute("data-type-speed")) || 38;
            if (!text) return;

            runTypewriter(el, text, speed, 140);
        });
    }

    function initHoverTypewriter() {
        var cards = document.querySelectorAll(".flip-card");
        if (!cards.length) return;

        cards.forEach(function (card) {
            var target = card.querySelector("[data-hover-typewriter]");
            if (!target) return;

            var text = (target.getAttribute("data-hover-typewriter") || target.textContent || "").trim();
            var speed = Number(target.getAttribute("data-type-speed")) || 35;
            if (!text) return;

            target.textContent = "";
            var hasPlayed = false;

            var start = function () {
                runTypewriter(target, text, speed, 50);
                hasPlayed = true;
            };

            card.addEventListener("mouseenter", start);

            card.addEventListener("mouseleave", function () {
                target.classList.remove("is-running");
            });

            card.addEventListener("focusin", function () {
                if (!hasPlayed) {
                    start();
                }
            });
        });
    }

    function initReveal() {
        var revealItems = document.querySelectorAll(
            ".project-card, .card, .service-card, .skill, .portfolio-hero, .resume-hero, .cv-focus, .contact-hero, .form-group, .home-link, .form-label, .form-section, .hero-grid > div, .split-grid > div, .contact-wrap, .portfolio .container > .tagline, [class*='reveal']"
        );
        if (!revealItems.length) return;

        if (prefersReducedMotion || !window.IntersectionObserver) {
            revealItems.forEach(function (el) { el.classList.add("show"); });
            return;
        }

        var observer = new IntersectionObserver(function (entries, obs) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("show");
                obs.unobserve(entry.target);
            });
        }, { threshold: 0.14 });

        revealItems.forEach(function (el, index) {
            el.classList.add("reveal");
            el.style.transitionDelay = String(Math.min(index * 35, 240)) + "ms";
            observer.observe(el);
        });
    }

    function animateCounters(scope) {
        var elements = (scope || document).querySelectorAll("[data-count]");
        if (!elements.length) return;

        elements.forEach(function (element) {
            var target = Number(element.getAttribute("data-count") || 0);
            var suffix = element.getAttribute("data-suffix") || "";
            var duration = 900;
            var startTime = performance.now();

            var tick = function (time) {
                var progress = Math.min((time - startTime) / duration, 1);
                element.textContent = String(Math.floor(progress * target)) + suffix;
                if (progress < 1) {
                    window.requestAnimationFrame(tick);
                }
            };

            window.requestAnimationFrame(tick);
        });
    }

    function initCounterReveal() {
        var scopes = document.querySelectorAll(".resume-hero, .cv-focus, .portfolio-hero");
        if (!scopes.length || prefersReducedMotion || !window.IntersectionObserver) {
            animateCounters(document);
            return;
        }

        var observer = new IntersectionObserver(function (entries, obs) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                animateCounters(entry.target);
                obs.unobserve(entry.target);
            });
        }, { threshold: 0.35 });

        scopes.forEach(function (scope) {
            observer.observe(scope);
        });
    }

    function init3DTilt() {
        if (prefersReducedMotion) return;

        var cards = document.querySelectorAll(".project-card");
        cards.forEach(function (card) {
            card.addEventListener("pointermove", function (event) {
                var bounds = card.getBoundingClientRect();
                var relativeX = (event.clientX - bounds.left) / bounds.width;
                var relativeY = (event.clientY - bounds.top) / bounds.height;
                var rotateY = (relativeX - 0.5) * 14;
                var rotateX = (0.5 - relativeY) * 12;
                card.style.setProperty("--rx", rotateX.toFixed(2) + "deg");
                card.style.setProperty("--ry", rotateY.toFixed(2) + "deg");
            });

            card.addEventListener("pointerleave", function () {
                card.style.setProperty("--rx", "0deg");
                card.style.setProperty("--ry", "0deg");
            });
        });
    }

    tabify("resume-tabs");
    tabify("portfolio-tabs");
    initProjectLinks();
    initTypewriter();
    initHoverTypewriter();
    initReveal();
    initCounterReveal();
    init3DTilt();
})();
