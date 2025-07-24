import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10 px-8">
      <div className="flex flex-wrap justify-between gap-6">
        <div>
          <h4 className="text-xl font-bold">JobsGE</h4>
          <p className="text-sm">საქართველოს წამყვანი ვაკანსიების პლატფორმა</p>
        </div>
        <div>
          <h5 className="font-semibold mb-2">სწრაფი ბმულები</h5>

          <div className="flex flex-col">
            <Link href="/pages/vacancies">ვაკანსიები</Link>
            <Link href="/pages/companies">კომპანიები</Link>
          </div>
        </div>
        <div>
          <h5 className="font-semibold mb-2">კონტაქტი</h5>
          <p className="text-sm">info@jobsge.com</p>
          <p className="text-sm">+995 555 123 456</p>
        </div>
      </div>
    </footer>
  );
}
