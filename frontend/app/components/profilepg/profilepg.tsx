"use client";
import { useAuth } from "@/app/context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import MyVacanciesPage from "@/app/components/myvacancy/myvacancy";

export default function ProfilePage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push("/");
  }, [user]);

  if (!user) return null;

  return (
    <main className="max-w-2xl mx-auto mt-12 px-4">
      <h1 className="text-2xl font-bold mb-4">Ჩემი პროფილი</h1>

      <div className="space-y-2">
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
      <MyVacanciesPage />
    </main>
  );
}
