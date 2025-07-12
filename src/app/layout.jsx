"use client";

import React, { useEffect, useContext } from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "@/styles/theme";
import { GlobalContext, GlobalProvider } from "@/context";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

// Global CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "react-virtualized-tree/lib/main.css";
import "@/styles/global.css";
import GlobalStyles from "@/styles/globalStyle";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="d-flex flex-column min-vh-100">
        <GlobalProvider>
          <LayoutWithTheme>{children}</LayoutWithTheme>
        </GlobalProvider>
      </body>
    </html>
  );
}

function LayoutWithTheme({ children }) {
  const { state } = useContext(GlobalContext);

/*  useEffect(() => {
    (async () => {
      const $ = await import("jquery");
      window.$ = window.jQuery = $;
      await import("bootstrap");
    })();
  }, []);
*/

  return (
    <ThemeProvider theme={state.theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles />
      <Header />
      <main className="flex-grow-1">{children}</main>
      <Footer />
    </ThemeProvider>
  );
}
