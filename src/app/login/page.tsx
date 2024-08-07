"use client";
import Input from "@/components/Common/Input";
import PasswordInput from "@/assets/images";
import { validateEmail } from "@/helper/FormHelper";
import { loginApi, loginWithPasswordApi } from "@/utils/api";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import leftImg from "../../assets/images/left.png"
import Image from "next/image";
import logoImg from "../../assets/images/logo.png"

const Login=()=>{
    const router = useRouter();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState({email:'',password:''});
    useEffect(()=>{
        if(localStorage.getItem("token")) {
        router.push('/dashboard', { scroll: false })
        }
    })
    const submit= async ()=>{
        if(!validateEmail(email)) {
            setError({...error,email:'Please enter valid email'});
        } else if(password === "") {
            setError({...error,password:'Please enter valid password'});
        } else {
            const result = await loginWithPasswordApi({email:email,password:password});
            if(result.status === 200) {
                localStorage.setItem("token",result.body.token);
                localStorage.setItem("userInfo",JSON.stringify(result.body.user));
                router.push('/dashboard', { scroll: false })
            } else {
                toast.error(result.error);
            }
        }
    }
    return (<div className="h-screen bg-gradient">
    <div className="flex h-full items-center justify-center">
        <div className=" w-[40%] hidden md:block">
        <Image src={leftImg} className="object-cover" alt="Globe side" />
        </div>
        <div className="flex-1 flex items-center justify-center md:w-82% w-[100%]">
        <div className="bg-white p-8 rounded-lg shadow-lg md:w-[30%] w-[80%] right-[10%] top-[20%] md:absolute"> {/* Changed width to w-96 */}
      <div className="flex justify-center mb-4">
        <Image src={logoImg} alt="The Box Cycle Logo" />
      </div>
      <h1 className="text-[35px] font-[600] text-center">Login</h1>
      <p className="text-center mb-[50px]">Please login to continue to your account</p>
            <div className="mb-5">
                <Input
                    name="email"
                    value={email}
                    onChange={(e)=>{
                        if(validateEmail((e.target as HTMLInputElement).value)) {
                            setError({...error,email:''});
                        }
                        setEmail((e.target as HTMLInputElement).value)
                    }}
                    error={error.email}
                    label="Email"
                    className={''}
                />
            </div>
            <div className="mb-5">
                <PasswordInput 
                    name="password"
                    value={password}
                    onChange={(e)=>{
                        setError({...error,password:''});
                        setPassword((e.target as HTMLInputElement).value)
                    }}
                    error={error.password}
                    label="Password"
                    className={''}
                />
            </div>
            <button type="submit" onClick={submit} className="w-full p-2 bg-green-800 text-white rounded-[10px] hover:bg-green-700 mb-4">
                Login
            </button>
            <div className="flex items-center justify-center mb-4">
                <span className="border-t border-gray-300 flex-grow mr-2"></span>
                <span className="text-gray-500">or</span>
                <span className="border-t border-gray-300 flex-grow ml-2"></span>
            </div>
            <button onClick={()=>{router.push('/')}} className="w-full p-2 border-2 border-green-800 text-green-800 rounded-[10px] hover:bg-gray-100 mb-4">
                Login with OTP
            </button>
            <p className="text-center sm:text[10] text-[18px]">
                Don't have an account yet? <Link href={'/signup'} className="text-[#000000] font-semibold">Sign Up</Link>
            </p>
        </div>
        </div>
    </div>
    <ToastContainer />
    </div>);
}

export default Login;