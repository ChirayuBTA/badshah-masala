"use client";

import Image from "next/image";

export default function HeroSection() {
  return (
    <div className="w-full shrink-0">
      {/* Mobile banner — fixed dvh height so it never pushes the form off screen */}
      <Image
        src="/Images/banner-mobile.png"
        alt="Badshah Masala — Share Your Spice Story & Win"
        width={800}
        height={600}
        priority
        className="block md:hidden w-full object-cover object-top"
        style={{ height: "48dvh" }}
      />
      {/* Desktop banner — natural aspect ratio */}
      <Image
        src="/Images/banner.png"
        alt="Badshah Masala — Share Your Spice Story & Win"
        width={1920}
        height={600}
        priority
        className="hidden md:block w-full h-auto"
      />
    </div>
  );
}
