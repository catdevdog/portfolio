// app/layout.tsx
import type { Metadata } from "next";
import StyledProviders from "./providers/StyledProviders";

export const metadata: Metadata = {
  title: "포트폴리오",
  description: "강민구 포트폴리오",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <StyledProviders>{children}</StyledProviders>
      </body>
    </html>
  );
}
