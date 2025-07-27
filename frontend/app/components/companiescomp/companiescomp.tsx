"use client";

import { useEffect, useState } from "react";

type Company = {
  _id: string;
  companyName: string;
  email: string;
  phoneNumber: number;
  approved: boolean;
  verified: boolean;
};

export default function companiescomp() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE}/companies`
        );
        const data = await res.json();
        setCompanies(data);
      } catch (err) {
        console.error("Failed to fetch companies:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">კომპანიები:</h1>

      {loading ? (
        <p>Loading...</p>
      ) : companies.length === 0 ? (
        <p className="text-gray-600">კომპანიები არ მოიძებნება</p>
      ) : (
        <div className="space-y-4">
          {companies.map((company) => (
            <div
              key={company._id}
              className="border rounded p-4 shadow hover:shadow-md transition"
            >
              <h2 className="text-lg font-semibold">{company.companyName}</h2>
              <p className="text-gray-700">📧 {company.email}</p>
              <p className="text-gray-700">📞 {company.phoneNumber}</p>
              <p className="text-sm mt-2 text-gray-500">
                Verified: {company.verified ? "✅" : "❌"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
