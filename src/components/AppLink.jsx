import { Link } from "react-router-dom";
import { isExternalHref, normalizeLocalHref, resolveInternalRoute } from "../utils/routes";

export function AppLink({ to, children, ...props }) {
  const route = resolveInternalRoute(to);

  if (route) {
    return (
      <Link to={route} {...props}>
        {children}
      </Link>
    );
  }

  const href = normalizeLocalHref(to);
  const shouldOpenExternally = isExternalHref(href) && !href.startsWith("#");

  return (
    <a
      href={href}
      {...props}
      target={shouldOpenExternally ? "_blank" : props.target}
      rel={shouldOpenExternally ? "noopener" : props.rel}
    >
      {children}
    </a>
  );
}
