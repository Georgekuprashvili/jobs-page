"use client";

import { usePathname } from "next/navigation";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/navbar";
import "./globals.css";
import { AuthProvider } from "./context/AuthContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideLayout = ["/pages/sign-in", "/pages/sign-up"];
  const shouldHideLayout = hideLayout.includes(pathname);

  return (
    <html lang="ka" className="h-full">
      <body className="flex flex-col min-h-screen bg-gray-50 text-gray-900 font-sans">
        <AuthProvider>
          {!shouldHideLayout && <Navbar />}
          <main className="flex-grow">{children}</main>
          {!shouldHideLayout && <Footer />}
        </AuthProvider>
      </body>
    </html>
  );
}
