import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils"
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ToggleTheme } from "@/components/ui/ToggleTheme";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "YT Downloader",
  description: "Descarga tus canciones. Cuantas quieras, sin anuncios y virus",
  icons: '/favicon.png'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          {/* Layout */}
          <nav className="dark:bg-black border-b-2 border-gray-400">
            <p>Github</p>
            <p>Ayuda</p>
            <ToggleTheme/>
          </nav>
          
          { children }
        </ThemeProvider>
      </body>
    </html>
  );
}


