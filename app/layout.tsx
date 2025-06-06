// app/layout.tsx
import type { Metadata } from "next";
import StyledProviders from "./providers/StyledProviders";
import StyledComponentsRegistry from "./lib/StyledComponentsRegistry";

export const metadata: Metadata = {
  title: "강민구 포트폴리오",
  description: "강민구 포트폴리오",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link
          href="https://fonts.cdnfonts.com/css/ibm-plex-mono-3"
          rel="stylesheet"
        />
      </head>
      <body>
        <StyledComponentsRegistry>
          <StyledProviders>{children}</StyledProviders>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
