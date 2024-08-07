import React, { useState } from "react";
import Input from "@/components/Common/Input";
import PasswordInput from "@/assets/images";
import { validateEmail, validatePassword } from "@/helper/FormHelper";
import { signupApi } from "@/utils/api";
import Link from "next/link";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logoImg from "../../../../assets/images/logo.png"
import Image from "next/image";
const UserForm=({changeMode}:{changeMode:(email:string)=>void})=>{
    const [disabled,setDisabled] = useState(false);
    const [formData,setFormData] = useState({
        firstName:'',
        lastName:'',
        email:'',
        password:'',
        confirmPassword:'',
      })
      const [formError,setFormError] = useState({
        firstName:'',
        lastName:'',
        email:'',
        password:'',
        confirmPassword:'',
      })
      
      const submit= async ()=>{
        if(formData.firstName==='') {
            setFormError({...formError,firstName:'Please enter first name'});
        } else  if(formData.lastName==='') {
            setFormError({...formError,lastName:'Please enter last name'});
        } else if(!validateEmail(formData.email)) {
            setFormError({...formError,email:'Please enter valid email'});
        } else if(!validatePassword(formData.password)) {
            setFormError({...formError,password:'Password must contain at least one capital letter, one special character, and be at least 8 characters long.'});
        } else if(formData.confirmPassword==='') {
            setFormError({...formError,confirmPassword:'Please enter confirm password'});
        } else if(formData.password !== formData.confirmPassword) {
            setFormError({...formError,confirmPassword:'Password and confirm password not match'});
        } else {
            try {
                setDisabled(true);
                const result = await signupApi(formData);
                if(result.status === 200) {
                    setDisabled(false);
                    changeMode(formData.email);
                } else {
                    setDisabled(false);
                    toast.error(result.error)
                }
              } catch (err) {
                console.log('Err',err);
              }
    
        }
      }

    return(
        <div className="bg-white p-8 rounded-lg shadow-lg md:w-[30%] w-[80%] right-[10%] top-[20%] md:absolute"> 
            <div className="flex justify-center mb-4">
                <Image src={logoImg} alt="The Box Cycle Logo" className="sm:h-auto h-[100px]" />
            </div>
            <div className="mb-5">
                <Input 
                    name="firstName"
                    value={formData.firstName}
                    onChange={(e)=>{
                        setFormError({...formError,firstName:''});
                        setFormData({...formData,firstName:(e.target as HTMLInputElement).value})
                    }}
                    error={formError.firstName}
                    label="First Name"
                    className={formError.firstName ? 'border-[red] border-[1px] sm:h-auto h-[40px]' : 'sm:h-auto h-[40px]'}
                />
            </div>
            <div className="mb-5">
                <Input 
                    name="lastName"
                    value={formData.lastName}
                    onChange={(e)=>{
                        setFormError({...formError,lastName:''});
                        setFormData({...formData,lastName:(e.target as HTMLInputElement).value})
                    }}
                    error={formError.lastName}
                    label="Last Name"
                    className={formError.lastName ? 'border-[red] border-[1px] sm:h-auto h-[40px]' : 'sm:h-auto h-[40px]'}
                />
            </div>
            <div className="mb-5">
              <Input 
                    name="email"
                    value={formData.email}
                    onChange={(e)=>{
                        setFormError({...formError,email:''});
                        setFormData({...formData,email:(e.target as HTMLInputElement).value})
                    }}
                    error={formError.email}
                    label="Email"
                    className={formError.email ? 'border-[red] border-[1px] sm:h-auto h-[40px]' : 'sm:h-auto h-[40px]'}
                />
            </div>
            <div className="mb-5">
              <PasswordInput 
                name="password"
                value={formData.password}
                onChange={(e)=>{
                    setFormError({...formError,password:'',confirmPassword:''});
                    setFormData({...formData,password:(e.target as HTMLInputElement).value})
                }}
                error={formError.password}
                label="Password"
                className={formError.password ? 'border-[red] border-[1px] sm:h-auto h-[40px]' : 'sm:h-auto h-[40px]'}
              />
            </div>
            <div className="mb-5">
              <PasswordInput 
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={(e)=>{
                    setFormError({...formError,password:'',confirmPassword:''});
                    setFormData({...formData,confirmPassword:(e.target as HTMLInputElement).value})
                }}
                error={formError.confirmPassword}
                label="Confirm Password"
                className={formError.confirmPassword ? 'border-[red] border-[1px] sm:h-auto h-[40px]' : 'sm:h-auto h-[40px]'}
              />
            </div>
            <button type="submit"  onClick={submit} disabled={disabled} className="w-full p-2 bg-green-800 text-white rounded-[10px] hover:bg-green-700 mb-4">
                Sign Up
            </button>
            <p className="text-center sm:text[10] text-[18px]">
            Already have an account? <Link href={'/'} className="text-[#000000] font-semibold">Login</Link>
            </p>
            <ToastContainer />
        </div>
    );
}

export default UserForm;