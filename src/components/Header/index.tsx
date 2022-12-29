"use client";

import { Inter } from "@next/font/google";
import { FaPalette } from "react-icons/fa";
import Image from "next/image";
import styles from "./Header.module.css";
import { cycleTheme } from "../../hooks/themeManager";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export const CANONICAL_NAME = "tomat.dev";
export const PROFILE_PICTURE = "/images/pfp.png";

export default function Header({
  theme,
  setTheme,
}: {
  theme: string;
  setTheme: (theme: string) => void;
}) {
  const [themes, setThemes] = useState<string[]>([]);

  useEffect(() => {
    // Errors OK here because this freaks out upon loading (lol). FIXME later?
    fetch("/themes/themes.json")
      .then((res) => res.json())
      .catch((_err) => {})
      .then((data) => {
        setThemes(data);
      })
      .catch((_err) => {});
  });

  return (
    <div>
      <header>
        <h1 className={`${inter.className} ${styles.header}`}>
          <div className={`flex ${styles.headerContent}`}>
            <div className={styles.leftHeaderContent}>
              <Image
                className="rounded-full"
                src={PROFILE_PICTURE}
                alt="My profile picture, an OC of mine."
                height={50}
                width={50}
              />
              <div className="ml-3">
                <p>{CANONICAL_NAME}</p>
              </div>
            </div>
            <div className={styles.rightHeaderContent}>
              <div
                className="flex flex-row justify-between items-center cursor-pointer text-[var(--sub-color)] hover:text-[var(--background)] transition-colors transition-duration-[1]"
                onClick={() => {
                  cycleTheme(themes, setTheme);
                }}
                aria-label="Click to cycle themes."
              >
                <FaPalette />
                <div className={styles.themeText}>{theme}</div>
              </div>
            </div>
          </div>
        </h1>
      </header>
    </div>
  );
}
