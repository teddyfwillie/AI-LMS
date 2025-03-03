"use client";

import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

function WelcomeBanner() {
  const { user } = useUser();

  return (
    <div className="p-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white w-full rounded-lg flex items-center gap-6 shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fade-in">
      <div className="animate-bounce">
        <Image
          src="/laptop.png"
          alt="laptop"
          width={120}
          height={120}
          className="filter drop-shadow-lg"
        />
      </div>
      <div className="space-y-2">
        <h2 className="font-bold text-4xl animate-slide-in-left">
          Welcome, {user?.firstName}!
        </h2>
        <p className="text-lg text-blue-100 animate-slide-in-right">
          Let's get started with your AI LMS
        </p>
      </div>
    </div>
  );
}

export default WelcomeBanner;
