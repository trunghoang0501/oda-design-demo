import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ODA Design Demo",
  description: "HQ Dashboard Demo - ODA Design System",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body style={{ margin: 0, padding: 0, fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
