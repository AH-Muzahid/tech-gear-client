import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AuthProvider from "@/context/AuthProvider"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Tech Gear Shop",
  description: "Best tech gadgets in town",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <AuthProvider>
          <Navbar />
          <main className="min-h-screen">
             {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}