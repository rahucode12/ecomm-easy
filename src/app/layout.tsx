import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google"; // ✅ Import here
import NavigationBar from "./_Component/NavigationBar";
import Footer from "./_Component/Footer";
import AppProviders from "./_Component/AppProviders";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Ecomm-Easy",
  description: "Modern E-Commerce with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AppProviders>
          <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <NavigationBar />
            <main style={{ flex: 1 , overflowY: "auto"}}>{children}</main>
            <Footer />
          </div>
        </AppProviders>
      </body>
    </html>
  );
}
