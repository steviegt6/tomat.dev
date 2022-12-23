"use client";

import "../styles/globals.scss";
import { PropsWithChildren } from "react";
import { useSelectedTheme } from "../hooks/themeManager";

export default function RootLayout({ children }: PropsWithChildren) {
  const [theme, setTheme] = useSelectedTheme();

  return (
    <html lang="en">
      <body>
        <div>
          <div className="grid-header"></div>
          <div className="grid-main">{children}</div>
        </div>
      </body>
    </html>
  );
}
