"use client";
import React, { useState } from "react";
import Logo from "../../assets/images/the-box-cycle-logo.png";
import Dashboard from "../../assets/images/dashboard.png";
import Gift from "../../assets/images/gift.png";
import Map from "../../assets/images/map.png";
import Profile from "../../assets/images/profile.png";
import Setting from "../../assets/images/settings.png";
import Logout from "../../assets/images/logout.png";
import Image from "next/image";
import { useRouter } from "next/navigation";

const navItems = [
  {
    href: "/dashboard",
    src: Dashboard,
    label: "Dashboard",
    alt: "Dashboard",
    className: "w-4",
  },
  { href: "/gift", src: Gift, label: "Gift", alt: "Gift", className: "w-4" },
  { href: "/map", src: Map, label: "Map", alt: "Map", className: "w-4" },
  {
    href: "/profile",
    src: Profile,
    label: "Profile",
    alt: "Profile",
    className: "w-4",
  },
  {
    href: "/settings",
    src: Setting,
    label: "Settings",
    alt: "Settings",
    className: "w-5",
  },
];

interface SidebarProps {
    isOpen: boolean;
    toggleDrawer: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleDrawer }) => {
  const router = useRouter()
  const logout=()=>{
      localStorage.clear();
      router.push('/', { scroll: false })
  }
  return (
    <>
      <aside
        style={{
          background:
            "linear-gradient(176.18deg, #006838 -8.46%, #8CC63F 135.03%)",
        }}
        className={`min-w-40 lg:w-48 h-[97vh] fixed top-0 left-0 flex flex-col p-4 rounded-2xl m-3 sm:m-4 items-center transform ${
          isOpen ? "translate-x-0" : "-translate-x-[111%]"
        } transition-transform duration-300 ease-in-out sm:transform-none sm:static`}
      >
        <p
          className="absolute top-4 right-4 cursor-pointer sm:hidden text-white"
          onClick={toggleDrawer}
        >
          X
        </p>
        <Image src={Logo} alt="Logo" className="w-24 2xl:w-28 mb-10" />

        <nav className="flex flex-col space-y-6 flex-grow relative">
          {navItems &&
            navItems.map((item, index) => (
              <a
                href={item.href}
                key={index}
                className="text-white flex items-center space-x-2 text-[13px]"
              >
                <Image src={item.src} alt={item.alt} className="w-4 2xl:w-6" />
                <span className="xl:text-[15px] 2xl:text-[16px]">
                  {item.label}
                </span>
              </a>
            ))}
          <a
            href="#"
            className="text-white flex items-center space-x-2 mt-auto text-[13px] absolute bottom-2"
            onClick={logout}
          >
            <Image src={Logout} alt="Logo" className="w-4 2xl:w-6" />
            <span className="xl:text-[15px] 2xl:text-[16px]">Logout</span>
          </a>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;