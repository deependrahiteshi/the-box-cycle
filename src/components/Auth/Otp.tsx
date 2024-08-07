"use client"

import { useEffect, useState } from "react";
import OtpInput from 'react-otp-input';
import logoImg from "../../assets/images/logo.png"
import Image from "next/image";

const OtpComponent=()=>{
    const [otp,setOtp] = useState("");
    const [time, setTime] = useState(60);
    const [isActive, setIsActive] = useState(false);
    useEffect(()=>{startTimer()},[])
    useEffect(() => {
        let interval:any = null;
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
    return( <div className="bg-white p-8 rounded-lg shadow-lg md:w-[30%] w-[80%] right-[10%] top-[20%] md:absolute"> {/* Changed width to w-96 */}
    <div className="flex justify-center mb-4">
      <Image src={logoImg} alt="The Box Cycle Logo" />
    </div>
    <h1 className="text-[35px] font-[600] text-center">Verify OTP</h1>
    <p className="text-center mb-[50px]">An OTP has been sent to your Email Address with a <br />code of 4 numbers to confirm your account.</p>
    <div className="input-group relative mb-4 otp-input">
        <OtpInput
        value={otp}
        onChange={setOtp}
        numInputs={4}
        renderSeparator={<span style={{padding:'4%'}}></span>}
        renderInput={(props) => <input {...props} />}
        />
    </div>
    <div className="flex">
        <div className="w-[95%]">
            <p className="mb-[30px] sm:text[10] text-[12px]">Didn’t get it? <a href="#" className=" text-[#006838] font-semibold" onClick={resetTimer}>Resend Code</a></p>
        </div>
        <div><p className="mb-[30px] sm:text[10] text-[16px] font-[700]">{time!==0 ? `${Math.floor(time / 60)}:${time % 60 < 10 ? '0' : ''}${time % 60}` : '0:00 '}</p></div>
    </div>
    <button type="submit" disabled={otp.length<4} onClick={()=>alert(1)}  className="w-full p-2 bg-green-800 text-white rounded-[10px] hover:bg-green-700 mb-4">
    Verify
    </button>
   
  </div>)
}

export default OtpComponent;