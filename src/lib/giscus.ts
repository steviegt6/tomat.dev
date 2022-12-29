/* Adapted and minimally modified from giscus/giscus - client.ts
 * MIT License
 * Copyright (c) 2021 Sage M. Abdullah
 * Copyright (c) 2018 Jeremy Danyow
 * Copyright (c) 2018 Chris Veness
 */

export function runClient() {
  const GISCUS_SESSION_KEY = "giscus-session";
  const script = document.currentScript as HTMLScriptElement;
  const giscusOrigin = new URL("https://giscus.app/client.js").origin;

  function getMetaContent(property: string, og = false) {
    const ogSelector = og ? `meta[property='og:${property}'],` : "";
    const element = document.querySelector<HTMLMetaElement>(
      ogSelector + `meta[name='${property}']`
    );

    return element ? element.content : "";
  }

  function formatError(message: string) {
    return `[giscus] An error occurred. Error message: "${message}".`;
  }

  // Set up session and clear the session param on load
  const url = new URL(location.href);
  let session = url.searchParams.get("giscus") || "";
  const savedSession = localStorage.getItem(GISCUS_SESSION_KEY);
  url.searchParams.delete("giscus");
  const cleanedLocation = url.toString();

  if (session) {
    localStorage.setItem(GISCUS_SESSION_KEY, JSON.stringify(session));
    history.replaceState(undefined, document.title, cleanedLocation);
  } else if (savedSession) {
    try {
      session = JSON.parse(savedSession);
    } catch (e: any) {
      localStorage.removeItem(GISCUS_SESSION_KEY);
      console.warn(`${formatError(e?.message)} Session has been cleared.`);
    }
  }

  const attributes = script.dataset;
  const params: Record<string, string> = {};

  params.origin = cleanedLocation;
  params.session = session as string;
  params.theme = attributes.theme as string;
  params.reactionsEnabled = attributes.reactionsEnabled || "1";
  params.emitMetadata = attributes.emitMetadata || "0";
  params.inputPosition = attributes.inputPosition || "bottom";
  params.repo = attributes.repo as string;
  params.repoId = attributes.repoId as string;
  params.category = attributes.category || "";
  params.categoryId = attributes.categoryId as string;
  params.strict = attributes.strict || "0";
  params.description = getMetaContent("description", true);
  params.backLink = getMetaContent("giscus:backlink") || cleanedLocation;

  switch (attributes.mapping) {
    case "url":
      params.term = cleanedLocation;
      break;
    case "title":
      params.term = document.title;
      break;
    case "og:title":
      params.term = getMetaContent("title", true);
      break;
    case "specific":
      params.term = attributes.term as string;
      break;
    case "number":
      params.number = attributes.term as string;
      break;
    case "pathname":
    default:
      params.term =
        location.pathname.length < 2
          ? "index"
          : location.pathname.substring(1).replace(/\.\w+$/, "");
      break;
  }

  // Check anchor of the existing container and append it to origin URL
  const existingContainer = document.querySelector(".giscus");
  const id = existingContainer && existingContainer.id;
  if (id) {
    params.origin = `${cleanedLocation}#${id}`;
  }

  // Set up iframe src and loading attribute
  const locale = attributes.lang ? `/${attributes.lang}` : "";
  const src = `${giscusOrigin}${locale}/widget?${new URLSearchParams(params)}`;
  const loading = attributes.loading === "lazy" ? "lazy" : undefined;

  // Set up iframe element
  const iframeElement = document.createElement("iframe");
  const iframeAttributes = {
    class: "giscus-frame giscus-frame--loading",
    title: "Comments",
    scrolling: "no",
    allow: "clipboard-write",
    src,
    loading,
  };
  Object.entries(iframeAttributes).forEach(
    ([key, value]) => value && iframeElement.setAttribute(key, value)
  );
  iframeElement.addEventListener("load", () => {
    iframeElement.classList.remove("giscus-frame--loading");
  });

  // Create default style and prepend as <head>'s first child to make override possible.
  const style =
    document.getElementById("giscus-css") || document.createElement("style");
  style.id = "giscus-css";
  style.textContent = `
    .giscus, .giscus-frame {
      width: 100%;
      min-height: 150px;
    }
    .giscus-frame {
      border: none;
      color-scheme: light dark;
    }
    .giscus-frame--loading {
      opacity: 0;
    }
  `;
  document.head.prepend(style);

  // Insert iframe element
  if (!existingContainer) {
    const iframeContainer = document.createElement("div");
    iframeContainer.setAttribute("class", "giscus");
    iframeContainer.appendChild(iframeElement);

    script.insertAdjacentElement("afterend", iframeContainer);
  } else {
    while (existingContainer.firstChild) existingContainer.firstChild.remove();
    existingContainer.appendChild(iframeElement);
  }
  const suggestion = `Please consider reporting this error at https://github.com/giscus/giscus/issues/new.`;

  // Listen to messages
  window.addEventListener("message", (event) => {
    if (event.origin !== giscusOrigin) return;

    const { data } = event;
    if (!(typeof data === "object" && data.giscus)) return;

    if (data.giscus.resizeHeight) {
      iframeElement.style.height = `${data.giscus.resizeHeight}px`;
    }

    if (!data.giscus.error) return;

    const message: string = data.giscus.error;

    if (
      message.includes("Bad credentials") ||
      message.includes("Invalid state value") ||
      message.includes("State has expired")
    ) {
      // Might be because token is expired or other causes
      if (localStorage.getItem(GISCUS_SESSION_KEY) !== null) {
        localStorage.removeItem(GISCUS_SESSION_KEY);
        console.warn(`${formatError(message)} Session has been cleared.`);

        delete params.session;
        const src = `${giscusOrigin}/widget?${new URLSearchParams(params)}`;
        iframeElement.src = src; // Force reload
      } else if (!savedSession) {
        console.error(
          `${formatError(
            message
          )} No session is stored initially. ${suggestion}`
        );
      }
    } else if (message.includes("Discussion not found")) {
      console.warn(
        `[giscus] ${message}. A new discussion will be created if a comment/reaction is submitted.`
      );
    } else if (message.includes("API rate limit exceeded")) {
      console.warn(formatError(message));
    } else {
      console.error(`${formatError(message)} ${suggestion}`);
    }
  });
}