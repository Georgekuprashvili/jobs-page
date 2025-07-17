import JobCard from "@/app/components/jobcard/JobCard";

export default function HomePage() {
  return (
    <>
      <section className="bg-gradient-to-r from-indigo-100 to-purple-100 py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
          იპოვე შენი <span className="text-indigo-600">სიზმრების</span>{" "}
          სამსახური
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto mb-8">
          საქართველოს მასშტაბით ყველა სფეროს ვაკანსიის პლატფორმა.
        </p>
        <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
          <input
            placeholder="ძებნა..."
            className="px-4 py-2 w-60 rounded border"
          />
          <select className="px-4 py-2 rounded border">
            <option>ყველა კატეგორია</option>
          </select>
          <select className="px-4 py-2 rounded border">
            <option>ყველა ლოკაცია</option>
          </select>
          <button className="bg-indigo-600 text-white px-6 py-2 rounded">
            ძებნა
          </button>
        </div>
      </section>

      <section className="py-12 px-6 bg-white">
        <h2 className="text-2xl font-bold text-center mb-6">
          რეკომენდებული ვაკანსიები
        </h2>
        <div className="flex flex-wrap justify-center gap-6">
          <JobCard
            title="Frontend Developer"
            company="TechCorp"
            location="თბილისი"
            daysAgo={2}
            salary="2000-3000 ლარი"
            category="IT"
          />
          <JobCard
            title="გაყიდვების მენეჯერი"
            company="SalesMax"
            location="ბათუმი"
            daysAgo={1}
            salary="1500-2500 ლარი"
            category="გაყიდვები"
          />
          <JobCard
            title="UX/UI Designer"
            company="DesignStudio"
            location="თბილისი"
            daysAgo={3}
            salary="1800-2800 ლარი"
            category="დიზაინი"
          />
        </div>
      </section>
    </>
  );
}
