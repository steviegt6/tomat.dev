import { useEffect } from "react";
import { getTheme } from "../../hooks/themeManager";

export interface ThemableGiscusProps {
  theme: string;
  repo: string;
  repoId: string;
  category: string;
  categoryId: string;
}

export default function ThemableGiscus({
  theme,
  repo,
  repoId,
  category,
  categoryId,
}: ThemableGiscusProps) {
  useEffect(() => {
    // Clear the comments div.
    const comments = document.getElementById("comments");
    if (comments) comments.innerHTML = "";

    console.log("hi");

    // Then run giscus again.
    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", repo);
    script.setAttribute("data-repo-id", repoId);
    script.setAttribute("data-category", category);
    script.setAttribute("data-category-id", categoryId);
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "1");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "top");
    script.setAttribute(
      "data-theme",
      `https://tomat.dev/themes/giscus.${getTheme(theme)}.css`
    );
    script.setAttribute("data-lang", "en");
    script.setAttribute("data-loading", "lazy");
    script.setAttribute("cross-origin", "anonymous");
    script.setAttribute("async", "true");
    document.body.appendChild(script);
  }, [theme, repo, repoId, category, categoryId]);

  return <div id="comments" className="giscus" />;
}
