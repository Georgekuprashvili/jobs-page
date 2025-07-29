"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/navbar";
import "./globals.css";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const hideLayoutRoutes = ["/pages/sign-in", "/pages/sign-up"];
  const shouldHideLayout = hideLayoutRoutes.includes(pathname);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timeout);
  }, [pathname]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.closest("button")) {
        setLoading(true);
        const timeout = setTimeout(() => setLoading(false), 200);
        return () => clearTimeout(timeout);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <html lang="ka" className="h-full">
      <body className="flex flex-col min-h-screen bg-gray-50 text-gray-900 font-sans relative overflow-x-hidden">
        <AuthProvider>
          {!shouldHideLayout && <Navbar />}

          {loading && (
            <div className="fixed inset-0 z-50 bg-white/70 backdrop-blur-sm flex justify-center items-center">
              <div className="animate-spin h-14 w-14 border-4 border-indigo-600 border-t-transparent rounded-full"></div>
            </div>
          )}

          <main className="flex-grow">{children}</main>

          {!shouldHideLayout && <Footer />}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
