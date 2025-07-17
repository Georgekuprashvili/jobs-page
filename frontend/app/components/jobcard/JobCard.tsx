type JobProps = {
  title: string;
  company: string;
  location: string;
  daysAgo: number;
  salary: string;
  category: string;
};

export default function JobCard({
  title,
  company,
  location,
  daysAgo,
  salary,
  category,
}: JobProps) {
  return (
    <div className="bg-white rounded-xl shadow p-6 w-full md:w-80">
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-sm text-gray-600">{company}</p>
      <div className="flex justify-between text-xs text-gray-500 my-2">
        <span>{location}</span>
        <span>{daysAgo} დღის წინ</span>
      </div>
      <p className="text-green-600 font-semibold">{salary}</p>
      <div className="flex justify-between items-center mt-4">
        <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs">
          {category}
        </span>
        <button className="bg-indigo-600 text-white px-4 py-1 text-sm rounded">
          იხილე
        </button>
      </div>
    </div>
  );
}
