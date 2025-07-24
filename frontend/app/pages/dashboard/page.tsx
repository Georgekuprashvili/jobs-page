// "use client";
// import { useAuth } from "@/app/context/AuthContext";
// import api from "@/lib/api";
// import { useEffect, useState } from "react";
// import Link from "next/link";

// export default function DashboardPage() {
//   const { user } = useAuth();
//   const [vacancies, setVacancies] = useState([]);
//   const [applications, setApplications] = useState([]);

//   useEffect(() => {
//     if (!user) return;
//     const load = async () => {
//       if (user.type === "company") {
//         const { data } = await api.get("/vacancy/my");
//         setVacancies(data);
//       } else if (user.type === "user") {
//         const { data } = await api.get("/application/my");
//         setApplications(data);
//       }
//     };
//     load();
//   }, [user]);

//   if (!user) return <p className="text-center mt-10">Loading...</p>;

//   if (user.type === "company") {
//     return (
//       <div className="p-10 max-w-4xl mx-auto space-y-6">
//         <div className="flex justify-between items-center">
//           <h1 className="text-2xl font-bold">Ჩემი ვაკანსიები</h1>
//           <Link
//             href="/pages/vacancies/post-vacancy"
//             className="bg-indigo-600 text-white px-4 py-2 rounded"
//           >
//             ვაკანსიის დამატება
//           </Link>
//         </div>

//         <ul className="space-y-4">
//           {vacancies.map((v: any) => (
//             <li key={v._id} className="border p-4 rounded">
//               <p className="text-lg font-medium">{v.title}</p>
//               <p className="text-gray-600 text-sm">{v.location}</p>
//               <p className="text-sm text-gray-400">{v.status}</p>
//             </li>
//           ))}
//         </ul>
//       </div>
//     );
//   }

//   if (user.type === "user") {
//     return (
//       <div className="p-8 max-w-3xl mx-auto">
//         <h1 className="text-2xl font-bold mb-4">Ჩემი განაცხადები</h1>
//         <ul className="space-y-4">
//           {applications.map((app: any) => (
//             <li key={app._id} className="border p-4 rounded">
//               <p>
//                 {app.vacancyTitle} ({app.companyName}) -
//                 <a
//                   href={app.cvUrl}
//                   className="text-indigo-600 underline"
//                   target="_blank"
//                 >
//                   ნახე რეზიუმე
//                 </a>
//               </p>
//             </li>
//           ))}
//         </ul>
//       </div>
//     );
//   }

//   return <div className="p-10">Dashboard</div>;
// }
