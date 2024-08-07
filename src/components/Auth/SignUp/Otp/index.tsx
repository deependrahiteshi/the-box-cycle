import React, { useEffect, useState } from "react";
import { otpVerify } from "@/utils/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import OTPInput from "react-otp-input";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logoImg from "../../../../assets/images/logo.png";
import Image from "next/image";
import CommonButton from "@/components/Common/CommonButton";

const Otp = ({ email }: { email: string }) => {
  const [disabled, setDisabled] = useState(false);
  const [otp, setOtp] = useState("");
  const [time, setTime] = useState(60);
  const [isActive, setIsActive] = useState(false);
  const router = useRouter();

  useEffect(() => {
    startTimer();
  }, []);
  useEffect(() => {
    let interval: any = null;
    if (isActive) {
      interval = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    } else if (!isActive && time !== 0) {
      clearInterval(interval);
    }
    if (time === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, time]);

  const startTimer = () => {
    setIsActive(true);
  };

  const resetTimer = () => {
    setIsActive(true);
    setTime(60);
  };
  const submit = async () => {
    setDisabled(true);
    const result = await otpVerify({ otp: otp, email: email });
    if (result.status === 200) {
      setDisabled(false);
      localStorage.setItem("token", result.body.token);
      localStorage.setItem("userInfo", JSON.stringify(result.body.user));
      router.push("/dashboard", { scroll: false });
    } else {
      setDisabled(false);
      toast.error(result.message);
    }
  };
  return (
    <div className="flex-1 flex items-center justify-center md:w-[82%] w-[100%]">
      <div className="mx-6 sm:mx-0 bg-white px-8 pb-8 md:pb-10 md:px-16 lg:pb-8 2xl:pt-4 xl:pb-12 xl:px-20 rounded-lg shadow-lg max-w-[400px] sm:max-w-[500px] md:w-[90%] lg:w-[500px] 2xl:w-[600px]">
        <div className="flex justify-center items-center mb-4">
          <Image
            src={logoImg}
            alt="The Box Cycle Logo"
            className="!w-[50%] md:max-w-[100%]"
          />
        </div>
        <h1 className="text-[24px] md:text-[28px] xl:text-[32px] font-medium text-center">
          Verify OTP
        </h1>
        <p className="text-center mb-6 lg:mb-2 xl:mb-10 font-light text-[14px] xl:text-[16px]">
          An OTP has been sent to your Email Address with a code of 4 numbers to
          confirm your account.
        </p>
        <div className="input-group relative mb-4 otp-input">
          <OTPInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span className="p-[2%] sm:p-[2%]"></span>}
            renderInput={(props) => <input {...props} />}
          />
        </div>
        <div className="flex">
          <div className="w-[95%]">
            <p className="mb-[30px] sm:text[10] text-[12px]">
              Didn’t get it?{" "}
              <a
                href="#"
                className=" text-[#006838] font-semibold"
                onClick={resetTimer}
              >
                Resend Code
              </a>
            </p>
          </div>
          <div>
            <p className="mb-[30px] sm:text[10] text-[16px] font-[700]">
              {time !== 0
                ? `${Math.floor(time / 60)}:${time % 60 < 10 ? "0" : ""}${
                    time % 60
                  }`
                : "0:00 "}
            </p>
          </div>
        </div>
        <CommonButton
          type="submit"
          className="w-full p-2 bg-green-800 text-white rounded-[10px] hover:bg-green-700 mb-3 lg:mb-2 xl:mb-4"
          disabled={otp.length < 4 || disabled}
          onClick={submit}
        >
          {"Verify"}
        </CommonButton>
        <p className="text-center text-[12px] sm:text-[15px] xl:text-[17px]">
          Already have an account?{" "}
          <Link href={"/"} className="text-[#000000] font-semibold">
            Login
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Otp;
