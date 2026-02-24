"use client";

import Image from "next/image";

const SingleBanner = () => {
  return (
    <section className="w-full px-4 md:px-8 mt-6">
      <div className="relative w-full h-[200px] sm:h-[280px] md:h-[380px] lg:h-[450px] rounded-2xl overflow-hidden shadow-md group">
        
        <Image
          src="https://awcai.cloud/script/warehouse/public/aplus/1771903030_Insta-Banner-1.webp"
          alt="Promotional Banner"
          fill
          priority
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Optional Overlay */}
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-300" />
      </div>
    </section>
  );
};

export default SingleBanner;