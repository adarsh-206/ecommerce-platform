"use client";

import Link from "next/link";

const BrandLogo = ({ href = "/" }) => {
  return (
    <Link href={href} className="flex-shrink-0 mr-8">
      <span className="text-2xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-amber-700 via-orange-700 to-rose-700 drop-shadow-sm">
        Chaka-Chak
      </span>
    </Link>
  );
};

export default BrandLogo;
