import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

function DashboardHeader() {
  return (
    <div className="flex justify-between p-5 shadow-md">
      <div className="flex gap-2 items-center animate-fade-in">
        <Image
          src={"/logo.svg"}
          alt="logo"
          width={28}
          height={28}
          className="animate-spin-slow"
        />
        <h2 className="text-lg font-semibold text-gray-800">AI LMS</h2>
      </div>
      <UserButton />
    </div>
  );
}

export default DashboardHeader;
