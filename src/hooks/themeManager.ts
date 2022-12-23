"use client";

import { useEffect, useState } from "react";

export const THEME_KEY = "theme";
export const LIGHT_THEME = "light";
export const DARK_THEME = "dark";
export const SYNC_THEME = "sync";
export const DEFAULT_THEME = SYNC_THEME;
export const LINK_ELEMENT_ID = "currentTheme";
const IS_BROWSER = typeof window !== "undefined";

export function useSelectedTheme() {
  const [theme, setTheme] = useState(DEFAULT_THEME);

  // TODO: This is really gross, FIXME
  function realSetTheme(theme: string) {
    setTheme(theme);
    loadTheme(theme);
    localStorage.setItem(THEME_KEY, theme);
  }

  useEffect(() => {
    realSetTheme(getCurrentTheme());
  }, []);

  return [theme, realSetTheme] as const;
}

export function userPrefersDark() {
  if (!IS_BROWSER) return false;

  return (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
}

export function getCurrentTheme() {
  const theme = IS_BROWSER && localStorage.getItem(THEME_KEY);

  console.log(theme);

  if (theme) return theme;
  return DEFAULT_THEME;
}

export function getTheme(theme: string) {
  if (theme === SYNC_THEME) {
    return userPrefersDark() ? DARK_THEME : LIGHT_THEME;
  }

  return theme;
}

export function loadTheme(theme: string) {
  document.querySelector("#" + LINK_ELEMENT_ID)?.remove();
  const link = document.createElement("link");
  link.id = LINK_ELEMENT_ID;
  link.type = "text/css";
  link.rel = "stylesheet";
  link.setAttribute("precedence", "preload");

  link.href = `/./themes/${getTheme(theme)}.css`;

  document.head.appendChild(link);
}

export function cycleTheme(setTheme: (theme: string) => void) {
  // TODO: json file with themes
  const theme = getCurrentTheme();
  switch (theme) {
    case LIGHT_THEME:
      setTheme(DARK_THEME);
      break;
    case DARK_THEME:
      setTheme(SYNC_THEME);
      break;
    case SYNC_THEME:
      setTheme(LIGHT_THEME);
      break;
  }
}
