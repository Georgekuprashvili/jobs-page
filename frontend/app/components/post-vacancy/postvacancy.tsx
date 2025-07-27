"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { useProtectedRoute } from "@/app/hooks/useProtectedRoute";

export default function PostVacancyPage() {
  useProtectedRoute("company");

  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    salary: "",
    companyEmail: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("http://localhost:3001/vacancies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ ...form, salary: Number(form.salary) }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to post vacancy.");
      } else {
        toast.success("ვაკანსია წარმატებით გაიგზავნა, დაელოდეთ დადასტურებას");
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } catch (err) {
      toast.error("დაფიქსირდა შეცდომა.");
    } finally {
      setSubmitting(false);
    }
  };

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

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">ვაკანსიის დამატება</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          placeholder="სათაური"
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <textarea
          name="description"
          placeholder="აღწერა"
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <Select
          onValueChange={(value) => setForm({ ...form, category: value })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="აირჩიე კატეგორია" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          onValueChange={(value) => setForm({ ...form, location: value })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="აირჩიე ქალაქი" />
          </SelectTrigger>
          <SelectContent>
            {cities.map((city) => (
              <SelectItem key={city} value={city}>
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <input
          name="salary"
          placeholder="ანაზღაურება"
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          name="companyEmail"
          placeholder="კომპანიის ელ-ფოსტა"
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          disabled={submitting}
          className="bg-black text-white px-4 py-2 rounded w-full disabled:opacity-50"
        >
          {submitting ? "იგზავნება..." : "დამატება"}
        </button>
      </form>
    </div>
  );
}
