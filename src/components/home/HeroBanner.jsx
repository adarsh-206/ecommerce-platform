import Image from "next/image";

export default function HeroBanner() {
  return (
    <div className="relative w-full h-[600px] px-2">
      <Image
        src="/banners/banner_1.png"
        alt="Hero Banner"
        fill
        priority
        unoptimized
        style={{ objectFit: "cover", width: "100%", height: "100%" }}
      />
    </div>
  );
}
