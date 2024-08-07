import React, { useState } from "react";
import Input from "@/components/Common/Input";
import PasswordInput from "@/assets/images";
import { validateEmail, validatePassword } from "@/helper/FormHelper";
import { signupApi } from "@/utils/api";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logoImg from "../../../../assets/images/logo.png";
import Image from "next/image";
import CommonButton from "@/components/Common/CommonButton";
const UserForm = ({ changeMode }: { changeMode: (email: string) => void }) => {
  const [disabled, setDisabled] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formError, setFormError] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const submit = async () => {
    if (formData.firstName === "") {
      setFormError({ ...formError, firstName: "Please enter first name" });
    } else if (formData.lastName === "") {
      setFormError({ ...formError, lastName: "Please enter last name" });
    } else if (!validateEmail(formData.email)) {
      setFormError({ ...formError, email: "Please enter valid email" });
    } else if (!validatePassword(formData.password)) {
      setFormError({
        ...formError,
        password:
          "Password must contain at least one capital letter, one special character, and be at least 8 characters long.",
      });
    } else if (formData.confirmPassword === "") {
      setFormError({
        ...formError,
        confirmPassword: "Please enter confirm password",
      });
    } else if (formData.password !== formData.confirmPassword) {
      setFormError({
        ...formError,
        confirmPassword: "Password and confirm password not match",
      });
    } else {
      try {
        setDisabled(true);
        const result = await signupApi(formData);
        if (result.status === 200) {
          setDisabled(false);
          changeMode(formData.email);
        } else {
          setDisabled(false);
          toast.error(result.error);
        }
      } catch (err) {
        console.log("Err", err);
      }
    }
  };

  return (
    <div className="bg-white px-8 pb-8 md:pb-10 md:px-12 lg:pb-8 2xl:pt-4 xl:pb-12 2xl:px-20 rounded-lg shadow-lg max-w-[400px] xs:w-[500px] md:w-[90%] lg:w-[500px] 2xl:w-[600px]">
      <div className="flex justify-center xl:mb-2">
        <Image
          src={logoImg}
          alt="The Box Cycle Logo"
          className="!w-[50%] md:max-w-[100%]"
        />
      </div>
      <div className="mb-4">
        <Input
          name="firstName"
          value={formData.firstName}
          onChange={(e) => {
            setFormError({ ...formError, firstName: "" });
            setFormData({
              ...formData,
              firstName: (e.target as HTMLInputElement).value,
            });
          }}
          error={formError.firstName}
          label="First Name"
          className={
            formError.firstName
              ? "border-[red] border-[1px] sm:h-auto h-[40px]"
              : "sm:h-auto h-[40px]"
          }
        />
      </div>
      <div className="mb-4">
        <Input
          name="lastName"
          value={formData.lastName}
          onChange={(e) => {
            setFormError({ ...formError, lastName: "" });
            setFormData({
              ...formData,
              lastName: (e.target as HTMLInputElement).value,
            });
          }}
          error={formError.lastName}
          label="Last Name"
          className={
            formError.lastName
              ? "border-[red] border-[1px] sm:h-auto h-[40px]"
              : "sm:h-auto h-[40px]"
          }
        />
      </div>
      <div className="mb-4">
        <Input
          name="email"
          value={formData.email}
          onChange={(e) => {
            setFormError({ ...formError, email: "" });
            setFormData({
              ...formData,
              email: (e.target as HTMLInputElement).value,
            });
          }}
          error={formError.email}
          label="Email"
          className={
            formError.email
              ? "border-[red] border-[1px] sm:h-auto h-[40px]"
              : "sm:h-auto h-[40px]"
          }
        />
      </div>
      <div className="mb-4">
        <PasswordInput
          name="password"
          value={formData.password}
          onChange={(e) => {
            setFormError({ ...formError, password: "", confirmPassword: "" });
            setFormData({
              ...formData,
              password: (e.target as HTMLInputElement).value,
            });
          }}
          error={formError.password}
          label="Password"
          className={
            formError.password
              ? "border-[red] border-[1px] sm:h-auto h-[40px]"
              : "sm:h-auto h-[40px]"
          }
        />
      </div>
      <div className="mb-4">
        <PasswordInput
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={(e) => {
            setFormError({ ...formError, password: "", confirmPassword: "" });
            setFormData({
              ...formData,
              confirmPassword: (e.target as HTMLInputElement).value,
            });
          }}
          error={formError.confirmPassword}
          label="Confirm Password"
          className={
            formError.confirmPassword
              ? "border-[red] border-[1px] sm:h-auto h-[40px]"
              : "sm:h-auto h-[40px]"
          }
        />
      </div>
      <CommonButton
        type="submit"
        className="w-full p-2 bg-green-800 text-white rounded-[10px] hover:bg-green-700 mb-3 lg:mb-2 xl:mb-4"
        onClick={submit}
        disabled={disabled}
      >
        {"Sign Up"}
      </CommonButton>
      <p className="text-center text-[12px] sm:text-[15px] xl:text-[17px]">
        Already have an account?{" "}
        <Link href={"/"} className="text-[#000000] font-semibold">
          Login
        </Link>
      </p>
      <ToastContainer />
    </div>
  );
};

export default UserForm;
