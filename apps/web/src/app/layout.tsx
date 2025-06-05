import type { Metadata } from "next";
import { Inter, Playfair_Display, Rubik_Mono_One } from "next/font/google";
import Script from "next/script";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });
const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-playfair'
});
const rubikMono = Rubik_Mono_One({ 
  weight: '400',
  subsets: ["latin"],
  variable: '--font-rubik-mono'
});

export const metadata: Metadata = {
  title: "Vibe Coding Award - Coming Soon",
  description: "Where AI meets creativity in code. The future of AI-powered coding competitions.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-HVL9L65086"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-HVL9L65086');
          `}
        </Script>
      </head>
      <body className={`${inter.className} ${playfair.variable} ${rubikMono.variable}`}>
        {children}
      </body>
    </html>
  );
} 