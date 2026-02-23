import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import Navbar from "../components/Navbar";
import SocialMediaBubble from "../components/SocialMediaBubble";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Proteck",
  description: "Smart safety technology for modern living.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ar">
      <body className="antialiased">
        <Navbar />
        <main className="pt-16">{children}</main>
        <Footer />
        <SocialMediaBubble />
      </body>
    </html>
  );
}
