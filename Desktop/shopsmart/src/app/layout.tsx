import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import ThemeProvider from '@/components/ThemeProvider';
import Navbar from '@/components/Navbar';

const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ShopSmart - Your One-Stop Shop",
  description: "Shop smart with our curated collection of products",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="light">
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `
            if (localStorage.getItem('theme') === 'dark' ||
                (!localStorage.getItem('theme') &&
                  window.matchMedia('(prefers-color-scheme: dark)').matches)) {
              document.documentElement.classList.add('dark');
            } else {
              document.documentElement.classList.remove('dark');
            }
          `
        }} />
      </head>
      <body className={`${geist.className} bg-white dark:bg-gray-900`}>
        <ThemeProvider>
          <Navbar />
          <main className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-800">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
