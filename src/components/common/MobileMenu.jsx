import Link from "next/link";
import SearchBar from "./SearchBar";

export default function MobileMenu() {
  return (
    <div className="md:hidden bg-white shadow-md">
      <div className="p-4">
        <SearchBar />
      </div>
      <nav className="px-4 pb-4 space-y-1">
        <Link
          href="/categories/clothing"
          className="block p-2 text-gray-600 hover:bg-gray-50 rounded"
        >
          Clothing
        </Link>
        <Link
          href="/categories/electronics"
          className="block p-2 text-gray-600 hover:bg-gray-50 rounded"
        >
          Electronics
        </Link>
        <Link
          href="/categories/home"
          className="block p-2 text-gray-600 hover:bg-gray-50 rounded"
        >
          Home & Garden
        </Link>
        <Link
          href="/categories/beauty"
          className="block p-2 text-gray-600 hover:bg-gray-50 rounded"
        >
          Beauty
        </Link>
        <hr className="my-2" />
        <Link
          href="/login"
          className="block p-2 text-gray-600 hover:bg-gray-50 rounded"
        >
          Sign In
        </Link>
        <Link
          href="/register"
          className="block p-2 text-gray-600 hover:bg-gray-50 rounded"
        >
          Create Account
        </Link>
      </nav>
    </div>
  );
}
