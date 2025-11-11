import type { Metadata } from "next";
import { Inter, Lexend } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";

// Inter - Font chính cho body text (được sử dụng bởi nhiều tổ chức chính phủ và doanh nghiệp)
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

// Lexend - Font cao cấp cho headings (thiết kế hiện đại, dễ đọc)
const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin", "vietnamese"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "ICS Dashboard - Quản lý thông minh",
  description: "Giải pháp dashboard chuyên nghiệp cho doanh nghiệp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme');
                if (theme && ['light', 'dark', 'blue'].includes(theme)) {
                  document.documentElement.classList.add(theme);
                } else {
                  document.documentElement.classList.add('blue');
                }
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${lexend.variable} antialiased`}
      >
        <ThemeProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
