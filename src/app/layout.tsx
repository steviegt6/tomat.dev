"use client";

import "../styles/globals.scss";
import { PropsWithChildren } from "react";
import { useSelectedTheme } from "../hooks/themeManager";
import Header from "../components/Header";

export default function RootLayout({ children }: PropsWithChildren) {
  const [theme, setTheme] = useSelectedTheme();

  return (
    <html lang="en">
      <body>
        <div>
          <Header theme={theme} setTheme={setTheme} />
          <div className="pageContent">{children}</div>
        </div>
      </body>
    </html>
  );
}
