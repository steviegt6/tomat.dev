import { Inter } from "@next/font/google";
import { FaPalette } from "react-icons/fa";
import Image from "next/image";
import styles from "./Header.module.scss";
import { cycleTheme } from "../../hooks/themeManager";

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
  return (
    <div>
      <header>
        <h1 className={`${inter.className} ${styles.header}`}>
          <div className={styles.headerContent}>
            <div className={styles.leftHeaderContent}>
              <Image
                className={styles.profilePicture}
                src={PROFILE_PICTURE}
                alt="My profile picture, an OC of mine."
                height={50}
                width={50}
              />
              <div className={styles.canonicalName}>
                <p>{CANONICAL_NAME}</p>
              </div>
            </div>
            <div className={styles.rightHeaderContent}>
              <div
                className={styles.themeToggle}
                onClick={() => {
                  cycleTheme(setTheme);
                }}
                aria-label="Click to cycle themes."
              >
                <FaPalette /> <div className={styles.themeText}>{theme}</div>
              </div>
            </div>
          </div>
        </h1>
      </header>
    </div>
  );
}
