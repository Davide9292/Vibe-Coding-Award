import type { Metadata } from "next";
import Script from "next/script";
import "../styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://vibecodingaward.com"),
  title: "Vibe Coding Award - Championing the Pioneers of Human-AI Collaboration",
  description: "The premier independent award recognizing the innovators and artisans building the future with AI. Discover groundbreaking projects and join the movement.",
  keywords: "Vibe Coding, AI, Artificial Intelligence, Developer Awards, Creative Coding, Human-AI Collaboration, Future of Code",
  openGraph: {
    title: "Vibe Coding Award - Championing the Pioneers of Human-AI Collaboration",
    description: "The premier independent award recognizing the innovators and artisans building the future with AI. Discover groundbreaking projects and join the movement.",
    url: "https://vibecodingaward.com",
    siteName: "Vibe Coding Award",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Vibe Coding Award - Championing the Pioneers of Human-AI Collaboration",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vibe Coding Award - Championing the Pioneers of Human-AI Collaboration",
    description: "The premier independent award recognizing the innovators and artisans building the future with AI.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Barlow Font preconnect and preload */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          rel="preload" 
          href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;600&display=swap" 
          as="style"
        />
        <link 
          rel="stylesheet" 
          href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;600&display=swap"
        />
        
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

        <link rel="canonical" href="https://vibecodingaward.com" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className="font-barlow">
        {children}
        
        {/* Structured Data */}
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Vibe Coding Award",
              "url": "https://vibecodingaward.com",
              "logo": "https://vibecodingaward.com/logo-text.svg",
              "description": "The premier independent award recognizing the innovators and artisans building the future with AI.",
              "sameAs": [
                "https://linkedin.com/company/vibe-coding-award"
              ],
              "founder": {
                "@type": "Person",
                "name": "Vibe Coding Award Team"
              },
              "foundingDate": "2025",
              "contactPoint": {
                "@type": "ContactPoint",
                "email": "partners@vibecodingaward.com",
                "contactType": "General Inquiry"
              }
            })
          }}
        />
      </body>
    </html>
  );
} 