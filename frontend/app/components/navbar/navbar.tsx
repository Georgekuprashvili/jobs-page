"use client";

import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { user, logout, loading } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  if (loading) return null;

  return (
    <header className="flex items-center justify-between px-8 py-4 shadow-sm bg-white">
      <Link href="/" className="text-2xl font-bold text-indigo-600">
        JobsGE
      </Link>

      <nav className="hidden md:flex space-x-6 text-sm text-gray-700">
        <Link href="/pages/home">მთავარი</Link>
        <Link href="/pages/vacancies">ვაკანსიები</Link>
        <Link href="/pages/companies">კომპანიები</Link>
        <Link href="/pages/profile">პროფილი</Link>

        {user?.type === "company" && (
          <>
            <Link href="/pages/vacancies/post-vacancy">ვაკანსიის დამატება</Link>
          </>
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

      {user ? (
        <>
          <button
            onClick={() => setModalOpen(true)}
            className="px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 transition text-sm font-medium"
          >
            {user.fullName}
          </button>

          <Dialog open={modalOpen} onOpenChange={setModalOpen}>
            <DialogContent className="max-w-sm">
              <DialogTitle className="text-lg font-medium">პროფილი</DialogTitle>

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

              <div className="flex justify-between gap-3 mt-4">
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
        <div className="space-x-3">
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
        </div>
      )}
    </header>
  );
}
