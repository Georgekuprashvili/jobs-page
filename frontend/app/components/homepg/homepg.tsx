"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import JobCard from "@/app/components/jobcard/JobCard";
import CvUploadModal from "@/app/components/CvUploadModal/CvUploadModal";
import { getUserFromToken } from "@/app/utils/getUserFromToken";
import { toast } from "sonner";

export default function VacanciesPage() {
  const [vacancies, setVacancies] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [cvModalOpen, setCvModalOpen] = useState(false);
  const [selectedVacancy, setSelectedVacancy] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    location: "",
    category: "",
  });

  const cities = [
    "თბილისი",
    "ბათუმი",
    "ქუთაისი",
    "რუსთავი",
    "ზუგდიდი",
    "გორი",
    "ფოთი",
    "თელავი",
    "ოზურგეთი",
    "ახალციხე",
    "სხვა",
  ];
  const categories = [
    "IT",
    "დიზაინი",
    "გაყიდვები",
    "ადმინისტრაცია",
    "ფინანსები",
    "HR",
    "ლოგისტიკა",
    "მარკეტინგი",
    "მომსახურება",
    "მომხმარებელთა მხარდაჭერა",
    "განათლება",
    "სამშენებლო",
    "სამართალი",
    "ჯანდაცვა",
    "წარმოება",
    "სხვა",
  ];
  const user = getUserFromToken();

  const fetchVacancies = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/vacancies/approved`
      );
      const data = await res.json();
      setVacancies(data.data.reverse());
    } catch (err) {
      toast.error("ვაკანსიების ჩატვირთვის შეცდომა");
    } finally {
      setLoading(false);
    }
  };

  const fetchFiltered = async () => {
    if (!filters.search && !filters.location && !filters.category) {
      toast.error("გთხოვთ მიუთითეთ მინიმუმ ერთი კრიტერიუმი");
      return;
    }

    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.search) params.append("search", filters.search);
      if (filters.location) params.append("location", filters.location);
      if (filters.category) params.append("category", filters.category);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/vacancies?${params.toString()}`
      );
      const data = await res.json();

      if (!data || data.length === 0) {
        toast.error("ვაკანსია ვერ მოიძებნა");
      }

      setFiltered(data);
    } catch (err) {
      toast.error("ძებნის შეცდომა");
    } finally {
      setLoading(false);
    }
  };

  const fetchSingleVacancy = async (id: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/vacancies/${id}`
      );
      const data = await res.json();
      setSelectedVacancy(data);
    } catch {
      toast.error("ვაკანსიის დეტალების მიღება ვერ მოხერხდა");
    }
  };

  useEffect(() => {
    fetchVacancies();
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-12 px-6 mt-[50px]">
      <h1 className="text-4xl font-extrabold text-center mb-12 text-indigo-700 tracking-tight">
        ვაკანსიების ძებნა
      </h1>

      <div className="bg-white shadow-md p-8 rounded-lg mb-16 border">
        <div className="flex flex-wrap gap-4 justify-center">
          <Input
            placeholder="ძებნა სიტყვით..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="w-60"
          />
          <Select
            onValueChange={(val) => setFilters({ ...filters, location: val })}
          >
            <SelectTrigger className="w-48">
              <SelectValue placeholder="ლოკაცია" />
            </SelectTrigger>
            <SelectContent>
              {cities.map((loc) => (
                <SelectItem key={loc} value={loc}>
                  {loc}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            onValueChange={(val) => setFilters({ ...filters, category: val })}
          >
            <SelectTrigger className="w-48">
              <SelectValue placeholder="კატეგორია" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            onClick={fetchFiltered}
            className="bg-indigo-600 hover:bg-indigo-700 transition text-white px-6"
          >
            ძებნა
          </Button>
        </div>
      </div>

      {loading ? (
        <p className="text-center text-lg text-gray-500">იტვირთება...</p>
      ) : filtered.length > 0 ? (
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
            ძიების შედეგები
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((v) => (
              <JobCard
                key={v._id}
                title={v.title}
                company={v.companyName || ""}
                location={v.location}
                daysAgo={1}
                salary={`${v.salary} ლარი`}
                category={v.category}
                onClick={() => fetchSingleVacancy(v._id)}
              />
            ))}
          </div>
        </section>
      ) : null}

      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
          ახალი განცხადებები
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {vacancies.slice(0, 6).map((v) => (
            <JobCard
              key={v._id}
              title={v.title}
              company={v.companyName || ""}
              location={v.location}
              daysAgo={1}
              salary={`${v.salary} ლარი`}
              category={v.category}
              onClick={() => fetchSingleVacancy(v._id)}
            />
          ))}
        </div>
      </section>

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
