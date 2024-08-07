import React from "react";
import Image from "next/image";
import Recycle from "../../assets/images/recycle-reuse.png";

const WelcomeSection: React.FC<{ name: string; points: number }> = ({
  name,
  points,
}) => {
  return (
    <div
      style={{
        background:
          "linear-gradient(170.24deg, #006838 9.33%, #8CC63F 106.31%)",
      }}
      className="text-white p-4 lg:p-6 rounded-xl flex justify-between items-center w-full"
    >
      <div>
        <h2 className="text-[13px] sm:text-[15px] lg:text-base xl:text-[20px] font-extralight pb-5 xl:pb-7">
          Welcome back, {name}!
        </h2>
        <p className="text-[15px] sm:text-[16px] lg:text-[18px] xl:text-[22px] leading-3 md:pb-2">
          Your Points
        </p>
        <h3 className="text-[24px] sm:text-[30px] lg:text-[36px] xl:text-[40px] font-semibold">
          {points}
        </h3>
      </div>
      <div className="sm:mr-10 xl:mr-16">
        <Image
          src={Recycle}
          alt="Recycle"
          className="w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-40 lg:h-40 xl:w-44 xl:h-44"
        />
      </div>
    </div>
  );
};

export default WelcomeSection;
