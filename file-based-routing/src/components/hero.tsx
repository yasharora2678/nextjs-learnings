import React from "react";
import GymMan from "public/gymman.jpg";
import Image from "next/image";

const HeroPage = () => {
  return (
    <div className="relative h-screen">
      <div className="absolute inset-0 -z-10">
        <Image src={GymMan} fill alt="Missing Image" />
      </div>
      <div className="flex items-center justify-center pt-24">
        <h1 className="font-bold text-white">Gym Trainer</h1>
      </div>
    </div>
  );
};

export default HeroPage;
