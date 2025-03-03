import Image from "next/image";
import React, { useState } from "react";

function SelectOption({ selectedStudyType }) {
  const [selected, setSelected] = useState();

  const Option = [
    { name: "Exam ", icon: "/exam_1.png" },
    { name: "Job Interview ", icon: "/job.png" },
    { name: "Practice ", icon: "/practice.png" },
    { name: "Coding ", icon: "/code.png" },
    { name: "Other ", icon: "/knowledge.png" },
  ];
  return (
    <div>
      <h2 className="text-lg text-center mb-2">
        For Which you want to create your personal study material?
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-5">
        {Option.map((option, index) => (
          <div
            key={index}
            className={`flex flex-col items-center p-4 cursor-pointer hover:bg-gray-100 justify-center border border-gray-200 rounded-xl ${
              selected === option.name && "bg-gray-100"
            }`}
            onClick={() => {
              setSelected(option.name);
              selectedStudyType(option.name);
            }}
          >
            <Image src={option.icon} alt={option.name} width={50} height={50} />
            <h2 className="text-sm mt-2">{option.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SelectOption;
