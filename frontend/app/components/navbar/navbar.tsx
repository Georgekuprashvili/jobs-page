import Link from "next/link";

export default function Navbar() {
  return (
    <header className="flex items-center justify-between px-8 py-4 shadow-sm bg-white">
      <div className="text-2xl font-bold text-indigo-600">JobsGE</div>
      <nav className="hidden md:flex space-x-6 text-sm text-gray-700">
        <Link href="/">მთავარი</Link>
        <Link href="/pages/vacancies">ვაკანსიები</Link>
        <Link href="/pages/companies">კომპანიები</Link>
      </nav>
      <div className="space-x-3">
        <Link
          className="text-gray-700 border px-4 py-1 rounded"
          href="/pages/sign-in"
        >
          შესვლა
        </Link>
        <Link
          className="bg-indigo-600 text-white px-4 py-1 rounded"
          href="/pages/sign-up"
        >
          რეგისტრაცია
        </Link>
      </div>
    </header>
  );
}
