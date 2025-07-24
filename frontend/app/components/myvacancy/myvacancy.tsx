"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function MyVacanciesPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [vacancies, setVacancies] = useState<any[]>([]);

  const fetchMyVacancies = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/vacancies/company/${user?.id}`
      );
      const data = await res.json();

      if (Array.isArray(data)) {
        setVacancies(data);
      } else {
        setVacancies([]);
      }
    } catch (err) {
      setVacancies([]);
    }
  };

  useEffect(() => {
    fetchMyVacancies();
  }, [user]);
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/vacancies/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!res.ok) throw new Error("წაშლა ვერ მოხერხდა");

      setVacancies((prev) => prev.filter((v) => v._id !== id));

      toast.success("ვაკანსია წარმატებით წაიშალა!");
    } catch (error) {
      toast.error("დაფიქსირდა შეცდომა წაშლისას.");
    }
  };
  return (
    <div className="max-w-4xl mx-auto mt-8 px-4">
      <h1 className="text-2xl font-bold mb-6">ჩემი ვაკანსიები</h1>
      {vacancies.length === 0 ? (
        <p>ჯერ არ გაქვს დამატებული ვაკანსიები.</p>
      ) : (
        <div className="space-y-4">
          {vacancies.map((v) => (
            <div
              key={v._id}
              className="border p-4 rounded shadow flex flex-col sm:flex-row sm:justify-between sm:items-center"
            >
              <div>
                <h2 className="text-lg font-semibold">{v.title}</h2>
                <p className="text-sm text-gray-600">
                  {v.category} | {v.location} | {v.salary} ლარი
                </p>
              </div>
              <div className="flex space-x-2 mt-4 sm:mt-0">
                <Button
                  onClick={() => handleDelete(v._id)}
                  className="bg-red-600 hover:bg-red-700"
                >
                  წაშლა
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
