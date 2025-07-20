"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import api from "@/lib/api";

export default function Dashboard() {
  const { user } = useAuth();
  const [vacancies, setVacancies] = useState([]);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      if (user.type === "company") {
        const { data } = await api.get("/vacancy/my");
        setVacancies(data);
      } else if (user.type === "user") {
        const { data } = await api.get("/application/my");
        setApplications(data);
      }
    };
    fetchData();
  }, [user]);

  if (!user) return <p className="text-center mt-10">Loading...</p>;

  if (user.type === "company") {
    return (
      <div className="p-8 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">კომპანიის ვაკანსიები</h1>
        <ul className="space-y-4">
          {vacancies.map((vac: any) => (
            <li key={vac._id} className="border p-4 rounded">
              <p className="font-semibold">{vac.title}</p>
              <p className="text-sm text-gray-600">{vac.location}</p>
              <p className="text-xs">{vac.status}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (user.type === "user") {
    return (
      <div className="p-8 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">გაგზავნილი განაცხადები</h1>
        <ul className="space-y-4">
          {applications.map((app: any) => (
            <li key={app._id} className="border p-4 rounded">
              <p>
                {app.vacancyTitle} ({app.companyName}) -
                <a
                  href={app.cvUrl}
                  className="text-indigo-600 underline"
                  target="_blank"
                >
                  ნახე რეზიუმე
                </a>
              </p>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return <div className="p-10">Welcome to dashboard</div>;
}
