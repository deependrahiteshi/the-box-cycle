"use client";

import Link from "next/link";
import { useState } from "react";
import Input from "../Common/Input";
import { useRouter } from "next/navigation";
import { validateEmail } from "@/helper/FormHelper";
import logoImg from "../../assets/images/logo.png";
import Image from "next/image";
import CommonButton from "../Common/CommonButton";

const Login = ({ sendOtp }: { sendOtp: (email: string) => void }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  const submit = () => {
    if (validateEmail(email)) {
      setError(false);
      sendOtp(email);
    } else {
      setError(true);
    }
  };
  return (
    <div className="bg-white px-8 pt-6 pb-8 md:pb-10 md:px-16 lg:pt-0 lg:pb-8 xl:pt-6 2xl:pt-12 xl:pb-12 xl:px-20 rounded-lg shadow-lg 2xl:w-[600px]">
      <div className="flex justify-center xl:mb-2 ">
        <Image
          src={logoImg}
          alt="The Box Cycle Logo"
          className="!w-[50%] md:max-w-[100%]"
        />
      </div>
      <h1 className="text-[24px] md:text-[28px] xl:text-[32px] font-medium text-center">
        Login
      </h1>
      <p className="text-center mb-6 lg:mb-2 xl:mb-10 font-light text-[14px] xl:text-[16px]">
        Please login to continue to your account
      </p>
      <div className="mb-6 xl:mb-10">
        <Input
          name="email"
          value={email}
          onChange={(e) => {
            if (validateEmail((e.target as HTMLInputElement).value)) {
              setError(false);
            }
            setEmail((e.target as HTMLInputElement).value);
          }}
          error={error ? "Please enter valid email address" : ""}
          label="Email"
          className={
            error
              ? "border-[red] border-[1px] sm:h-auto h-[40px]"
              : "sm:h-auto h-[40px]"
          }
        />
      </div>
      <CommonButton
        type="submit"
        className="w-full p-2 bg-green-800 text-white rounded-[10px] hover:bg-green-700 mb-3 lg:mb-2 xl:mb-4"
        onClick={submit}
      >
        {"Send OTP"}
      </CommonButton>
      <div className="flex items-center justify-center mb-4 lg:mb-2 xl:mb-4">
        <span className="border-t border-gray-300 flex-grow mr-2"></span>
        <span className="text-gray-500">or</span>
        <span className="border-t border-gray-300 flex-grow ml-2"></span>
      </div>
      <CommonButton
        className="w-full p-2 border-2 border-green-800 text-green-800 rounded-[10px] hover:bg-gray-100 mb-4"
        onClick={() => {
          router.push("/login");
        }}
      >
        {"Login with Email and Password"}
      </CommonButton>
      <p className="text-center text-[12px] sm:text-[15px] xl:text-[17px]">
        Don't have an account yet?{" "}
        <Link href={"/signup"} className="text-[#000000] font-semibold">
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default Login;
