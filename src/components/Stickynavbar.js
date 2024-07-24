"use client"
// components/Navbar.js
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import logo from "../../public/images/ecana-logo.png";
import SearchIcon from "@heroicons/react/24/outline/MagnifyingGlassIcon";
import { CiUser } from "react-icons/ci";
import DropdownLink from "./Dropdownlink";
import { Menu } from "@headlessui/react";
import { useSession } from "next-auth/react";
import Bars from "../../public/images/barsImage.svg";

export const menuData = [
  { title: "About", link: "/about" },
  { title: "Products", link: "/products" },
  { title: "Our Team", link: "/team" },
];
const StickyNavbar = ({toggle}) => {
  const { status, data: session } = useSession();
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [query, setQuery] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(query);
  };
 
  useEffect(() => { const handleScroll = () => {
    var currentScrollPos = window.scrollY;

    // Check if scrolling down
    setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 5);

    setPrevScrollPos(currentScrollPos);
    return currentScrollPos;
  };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

   const logoutClickHandler = () => {
    signOut({ callbackUrl: '/login' });
      };
  return (
    <header className="mb-0 w-screen">
      {" "}
      <nav
        className={`fixed top-0 h-24 left-0 right-0 p-4 opacity-95 bg-blue-950  backdrop-blur-[1px] backdrop-opacity-0 text-white transition duration-700 
        ease-in-out ${
          visible
            ? "z-10 bg-gray-900 backdrop-blur-[1px] backdrop-opacity-0 transform translate-y-0"
            : "opacity-0 transform -translate-y-full"
        } border-b-4 border-[#F13B66]`}
      >
        <div className="flex items-end justify-between  text-sm">
       <div className="flex items-end space-x-4">
  <Link href="/" legacyBehavior>
    <a className="flex items-end">
      <div className="relative w-12 h-16">
        <Image
          src={logo}
          alt="Logo"
          layout="fill"
          objectFit="contain"
          quality={90}
          priority={true}
        />
      </div>
      <span className="font-medium text-2xl lg:text-5xl pl-2">Ecana Group</span>
    </a>
  </Link>
</div>


          <>
            <form
              onSubmit={submitHandler}
              className="mx-auto  hidden  justify-center md:flex "
            >
              <input
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                className="rounded-tr-none text-gray-900 font-mono border-blue-400 border-1 w-60 rounded-br-none p-1 text-sm focus:ring-0"
                placeholder="Search products"
              />
              <button
                className="rounded rounded-tl-none rounded-bl-none hover:bg-yellow-600 bg-green-600 p-1 text-sm dark:text-black"
                type="submit"
                id="button-addon2"
              >
                <SearchIcon className="h-5 w-5"></SearchIcon>
              </button>
            </form>
             <Image
        src={Bars}
        height={50}
        width={50}
        alt="menu"
        className="lg:collapse bg-blue-950 opacity-80 absolute 
        top-0 right-0 transform -translate-x-1/2 translate-y-1/4 
         shadow-blue-950 shadow-xl outline-zinc-950 outline-8"
        onClick={toggle}
      />
            <div className="collapse lg:visible text-white lg:flex cursor-pointer items-center font-semibold justify-center">
              {menuData.map((item) => (
                <Link key={item.link} href={item.link}>
                  <div className="flex items-center py-0 px-4 h-full font-semibold justify-center uppercase transition duration-400 ease-in-out hover:text-red-400">
                    {item.title}
                  </div>
                </Link>
              ))}
            </div>
          </>
          
          
          
          </div>
        
      </nav>
    </header>
  );
};

export default StickyNavbar;
