"use client";

type JobProps = {
  title: string;
  company: string;
  location: string;
  daysAgo: number;
  salary: string;
  category: string;
  onClick?: () => void;
};

export default function JobCard({
  title,
  company,
  location,
  daysAgo,
  salary,
  category,
  onClick,
}: JobProps) {
  return (
    <div
      className="bg-white rounded-xl shadow p-6 w-full md:w-80 cursor-pointer hover:shadow-md transition"
      onClick={onClick}
    >
      <h3 className="text-lg font-bold max-sm:text-sm">{title}</h3>
      <p className="text-sm text-gray-600">{company}</p>
      <div className="flex justify-between text-xs text-gray-500 my-2">
        <span>{location}</span>
        <span>{daysAgo} დღის წინ</span>
      </div>
      <p className="text-green-600 font-semibold">{salary}</p>
      <div className="flex justify-between items-center mt-4 max-sm:flex-col gap-1.5">
        <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs">
          {category}
        </span>
        <button
          type="button"
          className="bg-indigo-600 text-white px-4 py-1 text-sm rounded"
          onClick={(e) => {
            e.stopPropagation();
            onClick?.();
          }}
        >
          იხილე
        </button>
      </div>
    </div>
  );
}
