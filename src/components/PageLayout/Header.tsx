import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import DownArrow from '../../assets/images/down-arrow.png';
import Hamburger from '../../assets/images/hamburger.png';

const userDetails = {
    userName: "John Bell",
    userEmail: "john.bell@gmail.com"
}

interface HeaderProps {
    toggleDrawer: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleDrawer }) => {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [img,setImg] = useState("");
    useEffect(()=>{
        if(localStorage.getItem("userInfo")) {
            const user = JSON.parse(String(localStorage.getItem("userInfo")));
            setName(`${user.firstName} ${user.lastName}`)
            setEmail(`${user.email}`)
            setImg(`${user.firstName[0].toUpperCase()}${user.lastName[0].toUpperCase()}`)
        }
    },[])
    return (
        <div className='flex justify-end mt-4 items-center'>
            <div className="sm:hidden bg-gray-100 h-fit pl-3">
                <button onClick={toggleDrawer} className="text-white">
                    <Image src={Hamburger} alt='hamburger-icon' className='w-7' />
                </button>
            </div>
            <header className="p-2 flex justify-between items-center sm:mr-4 w-full">
                <input
                    type="text"
                    placeholder="Search"
                    className="px-4 py-2 rounded-3xl text-black text-xs xl:text-[13px] xl:w-[300px]"
                />
                <div className="flex items-center ml-2 sm:ml-4">
                    <div className='w-8 xl:w-9 h-8 xl:h-9 rounded-full bg-[#006838] text-white flex items-center justify-center'>
                        {img}
                    </div>
                    <div className='text-black ml-2 hidden sm:block'>
                        <p className="text-[11px] xl:text-[13px] font-semibold 2xl:text-[14px] ">{name}</p>
                        <p className=" text-[9px] xl:text-[11px] 2xl:text-[12px] font-light">{email}</p>
                    </div>
                    <Image src={DownArrow} alt="down-arrow" className='ml-2 w-3 cursor-pointer' />
                </div>
            </header >
        </div >
    );
};

export default Header;