"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "sonner"; 

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

      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (err) {
      console.error(err);
      toast.error("დაფიქსირდა შეცდომა გაგზავნისას.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-xl text-gray-700"
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4">CV ატვირთვა</h2>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="mb-4 w-full cursor-pointer"
        />
        <button
          onClick={handleUpload}
          className="bg-indigo-600 text-white px-4 py-2 rounded w-full"
        >
          გაგზავნა
        </button>
      </div>
    </div>
  );
}
