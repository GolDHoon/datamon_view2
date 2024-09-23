import type { Metadata } from "next";
import "./scss/common.scss";

export const metadata: Metadata = {
  title: "datamon_view2",
  description: "datamon_view2",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        {children}
      </body>
    </html>
  );
}
