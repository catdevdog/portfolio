// app/providers/StyledProviders.tsx
'use client';

import React from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '@/styles/GlobalStyle';
import { theme } from '@/styles/theme';

interface Props {
  children: React.ReactNode;
}

export default function StyledProviders({ children }: Props) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
}
