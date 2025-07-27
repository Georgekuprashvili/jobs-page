"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { CloudUpload } from "lucide-react";

export default function CvUploadModal({
  isOpen,
  onClose,
  companyEmail,
  userEmail,
}: {
  isOpen: boolean;
  onClose: () => void;
  companyEmail: string;
  userEmail: string | null;
}) {
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!userEmail) {
      toast.error("გთხოვთ, გაიარეთ ავტორიზაცია სივის გასაგზავნად.");
      return;
    }

    if (!file) {
      toast.error("ფაილი არ არის არჩეული");
      return;
    }

    if (!companyEmail) {
      toast.error("კომპანიის იმეილი ვერ მოიძებნა");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("userEmail", userEmail);
    formData.append("companyEmail", companyEmail);

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE}/email/send-cv`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      toast.success("სივი გაიგზავნა წარმატებით!");
      setTimeout(() => window.location.reload(), 1500);
    } catch (err) {
      console.error(err);
      toast.error("დაფიქსირდა შეცდომა გაგზავნისას.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-2xl max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-2xl text-gray-600 hover:text-gray-800"
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold mb-6 text-center">CV ატვირთვა</h2>

        <label className="flex flex-col items-center justify-center border-2 border-dashed border-indigo-400 rounded-xl p-6 mb-4 cursor-pointer hover:bg-indigo-50 transition-colors">
          <CloudUpload className="w-10 h-10 text-indigo-500 mb-2" />
          <p className="text-sm text-gray-600">
            {file ? file.name : "აირჩიეთ  ფაილი"}
          </p>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="hidden"
          />
        </label>

        <button
          onClick={handleUpload}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded w-full transition-colors"
        >
          გაგზავნა
        </button>
      </div>
    </div>
  );
}
