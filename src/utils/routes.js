export const pagePathMap = {
  home: "/",
  about: "/about.html",
  resume: "/resume.html",
  portfolio: "/portfolio.html",
  cv: "/cv.html",
  contact: "/contact.html",
};

const aliases = {
  "": "/",
  "/": "/",
  "index.html": "/",
  "/index.html": "/",
  "about.html": "/about.html",
  "/about.html": "/about.html",
  "resume.html": "/resume.html",
  "/resume.html": "/resume.html",
  "portfolio.html": "/portfolio.html",
  "/portfolio.html": "/portfolio.html",
  "cv.html": "/cv.html",
  "/cv.html": "/cv.html",
  "contact.html": "/contact.html",
  "/contact.html": "/contact.html",
};

export function resolveInternalRoute(to) {
  return aliases[String(to || "").trim()] || null;
}

export function isExternalHref(to) {
  return /^(https?:|mailto:|tel:|#)/i.test(String(to || "").trim());
}

export function normalizeLocalHref(url) {
  const clean = String(url || "").trim();
  if (!clean) return "#";
  if (isExternalHref(clean)) return clean;
  return encodeURI(clean);
}
