import React from "react";
import Image from "next/image";

const Container: React.FC<{ containers: any[] }> = ({ containers }) => {
  return (
    <div className="my-8 lg:my-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl xl:text-2xl font-medium">Containers</h2>
        <button className="hover:bg-[#006838] text-[#006838] hover:text-white border border-[#006838] py-1 px-4 2xl:px-6 rounded-3xl text-[12px] sm:text-[13px] xl:text-[14px] 2xl:text-[16px] transition duration-300">
          View All
        </button>
      </div>
      <div className="grid grid-cols-3 xs:grid-cols-4 md:grid-cols-5 gap-4 xl:gap-6">
        {containers.map((container, index) => (
          <div
            key={index}
            className="group border-[1px] rounded-lg px-3 py-2 md:p-4 flex items-center justify-evenly border-[#CDF8E4] shadow-lg hover:bg-gradient-to-b from-[#006838] to-[#8CC63F]"
          >
            <p className="text-gray-700 h-full flex items-end text-[11px] md:text-sm lg:text-lg 2xl:text-[24px] group-hover:text-white">
              {String(index + 1).padStart(2, "0")}
            </p>
            <Image
              src={container.src}
              alt={container.label}
              width={146}
              height={146}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Container;
