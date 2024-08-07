"use client"

import Link from "next/link";
import { useState } from "react";
import Input from "../Common/Input";
import { useRouter } from "next/navigation";
import { validateEmail } from "@/helper/FormHelper";
import logoImg from "../../assets/images/logo.png"
import Image from "next/image";

const Login=({sendOtp}:{sendOtp:(email:string)=>void})=>{
    const [email,setEmail] = useState("");
    const [error,setError] = useState(false);
    const router = useRouter()
  
    const submit=()=>{
      if(validateEmail(email)) {
        setError(false);
        sendOtp(email);
      } else {
        setError(true);
      }
    }
    return(
    <div className="bg-white p-8 rounded-lg shadow-lg md:w-[30%] w-[80%] right-[10%] top-[20%] md:absolute"> {/* Changed width to w-96 */}
      <div className="flex justify-center mb-4">
        <Image src={logoImg} alt="The Box Cycle Logo" />
      </div>
      <h1 className="text-[35px] font-[600] text-center">Login</h1>
      <p className="text-center mb-[50px]">Please login to continue to your account</p>
      <div className="mb-4 mb-[50px]">
        <Input
              name="email"
              value={email}
              onChange={(e)=>{
                if(validateEmail((e.target as HTMLInputElement).value)) {
                  setError(false);
                }
                setEmail((e.target as HTMLInputElement).value)
              }}
              error={error ? 'Please enter valid email address' : '' }
              label="Email"
              className={error ? 'border-[red] border-[1px] sm:h-auto h-[40px]' : 'sm:h-auto h-[40px]'}
          />
      </div>
      <button type="submit" onClick={submit} className="w-full p-2 bg-green-800 text-white rounded-[10px] hover:bg-green-700 mb-4">
        Send OTP
      </button>
      <div className="flex items-center justify-center mb-4">
        <span className="border-t border-gray-300 flex-grow mr-2"></span>
        <span className="text-gray-500">or</span>
        <span className="border-t border-gray-300 flex-grow ml-2"></span>
      </div>
      <button onClick={()=>{router.push("/login")}} className="w-full p-2 border-2 border-green-800 text-green-800 rounded-[10px] hover:bg-gray-100 mb-4">
        Login with Email and Password
      </button>
      <p className="text-center sm:text[10] text-[18px]">
        Don't have an account yet? <Link href={'/signup'} className="text-[#000000] font-semibold">Sign Up</Link>
      </p>
  </div>
)
}

export default Login;