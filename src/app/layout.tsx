import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: "Serendinails - Uñas y Tratamientos Corporales",
    template: "%s | Serendinails"
  },
  description: "Centro especializado en uñas y tratamientos corporales. Formaciones y cursos profesionales en manicura, pedicura y belleza.",
  keywords: ["uñas", "manicura", "pedicura", "tratamientos corporales", "cursos de uñas", "formación belleza"],
  authors: [{ name: "Serendinails" }],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Serendinails"
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: "cover"
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://serendinails.com",
    title: "Serendinails - Uñas y Tratamientos Corporales",
    description: "Centro especializado en uñas y tratamientos corporales. Formaciones y cursos profesionales.",
    siteName: "Serendinails",
  },
  twitter: {
    card: "summary_large_image",
    title: "Serendinails - Uñas y Tratamientos Corporales",
    description: "Centro especializado en uñas y tratamientos corporales.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

