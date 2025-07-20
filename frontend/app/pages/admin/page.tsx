"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import api from "@/lib/api";

export default function AdminPage() {
  const { user } = useAuth();
  const [companies, setCompanies] = useState([]);
  const [vacancies, setVacancies] = useState([]);

  useEffect(() => {
    if (!user || user.type !== "admin") return;
    const loadData = async () => {
      const res1 = await api.get("/admin/companies");
      const res2 = await api.get("/admin/vacancies");
      setCompanies(res1.data);
      setVacancies(res2.data);
    };
    loadData();
  }, [user]);

  const handleApprove = async (id: string, type: "company" | "vacancy") => {
    await api.patch(`/admin/approve-${type}/${id}`);
    window.location.reload();
  };

  return (
    <div className="p-10 space-y-10">
      <section>
        <h2 className="text-xl font-semibold mb-3">
          მოლოდინში მყოფი კომპანიები
        </h2>
        <ul className="space-y-2">
          {companies.map((c: any) => (
            <li
              key={c._id}
              className="flex justify-between items-center border p-3 rounded"
            >
              <span>
                {c.fullName} - {c.email}
              </span>
              <button
                className="bg-green-600 text-white px-4 py-1 rounded"
                onClick={() => handleApprove(c._id, "company")}
              >
                დამტკიცება
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">
          მოლოდინში მყოფი ვაკანსიები
        </h2>
        <ul className="space-y-2">
          {vacancies.map((v: any) => (
            <li
              key={v._id}
              className="flex justify-between items-center border p-3 rounded"
            >
              <span>
                {v.title} ({v.companyName})
              </span>
              <button
                className="bg-blue-600 text-white px-4 py-1 rounded"
                onClick={() => handleApprove(v._id, "vacancy")}
              >
                დამტკიცება
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
