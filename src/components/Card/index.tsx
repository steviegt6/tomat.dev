import { AnchorHTMLAttributes, DetailedHTMLProps, forwardRef } from "react";
import styles from "./card.module.css";

export interface CardProps
  extends DetailedHTMLProps<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {}

export const Card = forwardRef<HTMLAnchorElement, CardProps>(
  ({ children, ...props }, ref) => {
    props.className = `${styles.card} ${props.className ?? ""}`;
    return <a {...props}>{children}</a>;
  }
);
