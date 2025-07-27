"use client";

import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { user, logout, loading } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  if (loading) return null;

  return (
    <header className="bg-white shadow-sm fixed top-0 w-full z-50">
      <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <Link href="/" className="text-2xl font-bold text-indigo-600">
          JobsGE
        </Link>

        <nav className="hidden md:flex space-x-6 text-sm text-gray-700">
          <Link href="/pages/home">მთავარი</Link>
          <Link href="/pages/vacancies">ვაკანსიები</Link>
          <Link href="/pages/companies">კომპანიები</Link>
          <Link href="/pages/profile">პროფილი</Link>

          {user?.type === "company" && (
            <Link href="/pages/vacancies/post-vacancy">ვაკანსიის დამატება</Link>
          )}

          {user?.type === "admin" && (
            <Link
              href="/pages/admin"
              className="px-3 py-1 bg-gray-800 text-white rounded hover:bg-gray-700"
            >
              Admin
            </Link>
          )}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <>
              <button
                onClick={() => setModalOpen(true)}
                className="px-4 py-2 rounded border text-sm text-gray-700 hover:bg-gray-100"
              >
                {user.fullName}
              </button>

              <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                <DialogContent className="max-w-sm">
                  <DialogTitle className="text-lg font-medium">
                    პროფილი
                  </DialogTitle>
                  <div className="mt-2 space-y-2 text-sm">
                    <p>
                      <strong>სახელი:</strong> {user.fullName}
                    </p>
                    <p>
                      <strong>Email:</strong> {user.email}
                    </p>
                    <p>
                      <strong>როლი:</strong> {user.type}
                    </p>
                  </div>
                  <div className="flex mt-4">
                    <button
                      onClick={() => {
                        logout();
                        setModalOpen(false);
                      }}
                      className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
                    >
                      გამოსვლა
                    </button>
                  </div>
                </DialogContent>
              </Dialog>
            </>
          ) : (
            <>
              <Link
                className="text-gray-700 border px-4 py-1 rounded"
                href="/pages/sign-in"
              >
                შესვლა
              </Link>
              <Link
                className="bg-indigo-600 text-white px-4 py-1 rounded"
                href="/pages/sign-up"
              >
                რეგისტრაცია
              </Link>
            </>
          )}
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="text-2xl text-gray-700 focus:outline-none"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white shadow-md transition-all duration-300">
          <div className="flex flex-col px-6 py-4 space-y-3 text-sm text-gray-800">
            <Link href="/pages/home" onClick={() => setMenuOpen(false)}>
              მთავარი
            </Link>
            <Link href="/pages/vacancies" onClick={() => setMenuOpen(false)}>
              ვაკანსიები
            </Link>
            <Link href="/pages/companies" onClick={() => setMenuOpen(false)}>
              კომპანიები
            </Link>
            <Link href="/pages/profile" onClick={() => setMenuOpen(false)}>
              პროფილი
            </Link>

            {user?.type === "company" && (
              <Link
                href="/pages/vacancies/post-vacancy"
                onClick={() => setMenuOpen(false)}
              >
                ვაკანსიის დამატება
              </Link>
            )}
            {user?.type === "admin" && (
              <Link
                href="/pages/admin"
                onClick={() => setMenuOpen(false)}
                className="px-3 py-1 bg-gray-800 text-white rounded"
              >
                Admin
              </Link>
            )}
            {!user ? (
              <div className="flex flex-col gap-2 pt-2">
                <Link
                  className="border px-4 py-1 rounded text-center"
                  href="/pages/sign-in"
                >
                  შესვლა
                </Link>
                <Link
                  className="bg-indigo-600 text-white px-4 py-1 rounded text-center"
                  href="/pages/sign-up"
                >
                  რეგისტრაცია
                </Link>
              </div>
            ) : (
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="text-red-500 border-t pt-3 mt-2"
              >
                გამოსვლა
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
