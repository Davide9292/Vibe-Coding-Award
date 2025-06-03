import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vibe Coding Award - Celebrating Human-AI Collaboration",
  description: "Monthly awards celebrating innovative software projects built through human-AI collaboration. Submit your vibe coding projects and join the community.",
  keywords: ["AI", "coding", "collaboration", "awards", "software development", "vibe coding"],
  authors: [{ name: "Vibe Coding Award" }],
  openGraph: {
    title: "Vibe Coding Award",
    description: "Celebrating Human-AI Collaboration in Software Development",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vibe Coding Award",
    description: "Celebrating Human-AI Collaboration in Software Development",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
} 