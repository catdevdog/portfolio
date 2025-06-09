// app/providers/StyledProviders.tsx
"use client";

import React from "react";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "@/styles/GlobalStyle";
import { lightTheme, darkTheme } from "@/styles/theme";
import { useStore } from "@/store/useStore";

interface Props {
  children: React.ReactNode;
}

export default function StyledProviders({ children }: Props) {
  const { theme } = useStore();
  const themeMode = theme === "light" ? lightTheme : darkTheme;
  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
}
