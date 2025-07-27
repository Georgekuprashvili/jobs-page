"use client";

import CvUploadModal from "@/app/components/CvUploadModal/CvUploadModal";
import { getUserFromToken } from "@/app/utils/getUserFromToken";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function VacanciesPage() {
  const [vacancies, setVacancies] = useState([]);
  const [selectedVacancy, setSelectedVacancy] = useState<any | null>(null);
  const [cvModalOpen, setCvModalOpen] = useState(false);
  const user = getUserFromToken();

  useEffect(() => {
    const fetchVacancies = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/vacancies/approved`
      );
      const data = await res.json();
      setVacancies(data);
    };

    fetchVacancies();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">ყველა ვაკანსია</h1>

      <div className="space-y-4">
        {vacancies.map((v: any) => (
          <div
            key={v._id}
            className="border p-4 rounded shadow hover:bg-gray-50 cursor-pointer transition"
            onClick={() => setSelectedVacancy(v)}
          >
            <h2 className="font-bold text-lg">{v.title}</h2>
            <p>{v.description.slice(0, 60)}...</p>
            <p className="text-sm text-gray-600">
              {v.category} | {v.location}
            </p>
            <p className="text-sm font-semibold mt-2">Salary: {v.salary}ლარი</p>
          </div>
        ))}
      </div>

      {selectedVacancy && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white max-w-lg w-full p-6 rounded-lg shadow-lg relative">
            <button
              className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-2xl"
              onClick={() => setSelectedVacancy(null)}
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-2 text-indigo-700">
              {selectedVacancy.title}
            </h2>
            <p className="mb-3 text-gray-700">{selectedVacancy.description}</p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>📂 კატეგორია: {selectedVacancy.category}</li>
              <li>📍 ლოკაცია: {selectedVacancy.location}</li>
              <li>💰 ხელფასი: {selectedVacancy.salary} ლარი</li>
              <li>
                📅 განთავსდა:{" "}
                {selectedVacancy.createdAt
                  ? new Date(selectedVacancy.createdAt).toLocaleDateString(
                      "ka-GE",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )
                  : "მიუწვდ."}
              </li>
            </ul>
            <Button
              onClick={() => {
                if (!user) {
                  toast.error("გთხოვთ, ჯერ გაიარეთ ავტორიზაცია.");
                  return;
                }
                setCvModalOpen(true);
              }}
              className="mt-4 bg-green-600 text-white"
            >
              გაგზავნე რეზიუმე
            </Button>
          </div>

          <CvUploadModal
            isOpen={cvModalOpen}
            onClose={() => setCvModalOpen(false)}
            companyEmail={selectedVacancy?.companyEmail}
            userEmail={user?.email || "guest@example.com"}
          />
        </div>
      )}
    </div>
  );
}
