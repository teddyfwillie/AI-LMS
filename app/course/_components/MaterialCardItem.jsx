import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

function MaterialCardItem({ item, studyMaterial }) {
  return (
    <div
      className={`rounded-lg p-5 border shadow-md flex items-center flex-col ${
        !studyMaterial?.[item?.type]?.length && "grayscale"
      }`}
    >
      {!studyMaterial?.[item?.type]?.length ? (
        <h2 className="text-sm font-bold text-gray-500 p-1 bg-green-100 rounded-full px-2 mb-2">
          Not Ready
        </h2>
      ) : (
        <h2 className="text-sm font-bold text-green-500 p-1 bg-green-100 rounded-full px-2 mb-2">
          Ready
        </h2>
      )}

      <Image src={item.icon} alt={item.name} width={70} height={70} />
      <h2 className="text-lg font-bold mt-2">{item.name}</h2>
      <p className="text-gray-500 mt-1 text-sm text-center">{item.desc}</p>

      {!studyMaterial?.[item?.type]?.length ? (
        <Button variant="default" className="mt-2 w-full">
          Generate
        </Button>
      ) : (
        <Button variant="outline" className="mt-2 w-full">
          View
        </Button>
      )}
    </div>
  );
}

export default MaterialCardItem;
