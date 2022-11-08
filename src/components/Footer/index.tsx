import Image from "next/image";
import { DetailedHTMLProps, forwardRef, HTMLAttributes } from "react";
import { AiFillHeart } from "react-icons/ai";
import styles from "./footer.module.css";

export interface FooterProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {}

export const Footer = forwardRef<HTMLElement, FooterProps>(
  ({ children, ...props }, ref) => {
    props.className = `${styles.footer} ${props.className ?? ""}`;
    return (
      <footer {...props}>
        <a
          href="https://github.com/steviegt6/tomat.dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          made with&nbsp;<span className={styles.heart}>&lt;3</span>
        </a>
      </footer>
    );
  }
);
