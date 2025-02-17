import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from '@/components/ThemeProvider';
import Navbar from '@/components/Navbar';

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ShopSmart - Your One-Stop Shop",
  description: "Shop smart with our curated collection of products",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
