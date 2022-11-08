import Image from "next/image";
import { DetailedHTMLProps, forwardRef, HTMLAttributes } from "react";
import styles from "./footer.module.css";

export interface FooterProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {}

export const Footer = forwardRef<HTMLElement, FooterProps>(
  ({ children, ...props }, ref) => {
    props.className = `${styles.footer} ${props.className ?? ""}`;
    return (
      <footer {...props}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    );
  }
);
