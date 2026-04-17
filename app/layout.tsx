import type { Metadata } from "next";
import { Playfair_Display, Allura, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
});

const allura = Allura({
  subsets: ['latin'],
  weight: '400',
  variable: "--font-allura",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Aishwarya & Shubhangi Wedding Invitation",
  description: "Join us in celebrating the wedding of Aishwarya and Shubhangi",

  openGraph: {
    title: "Aishwarya & Shubhangi Wedding Invitation",
    description: "Join us in celebrating the wedding of Aishwarya and Shubhangi",
    url: "https://aishwarya-weds-shubhangi.vercel.app",
    siteName: "Wedding Invite",
    images: [
      {
        url: "https://aishwarya-weds-shubhangi.vercel.app/preview.jpeg", // IMPORTANT
        width: 1200,
        height: 630,
        alt: "Wedding Invitation Preview",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${allura.variable} ${cormorant.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
