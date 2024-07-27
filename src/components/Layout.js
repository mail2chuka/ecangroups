import Head from "next/head";
import Footer from "../components/Footer"; 
import StickyNavbar from "../components/Stickynavbar";
import {useSession} from "next-auth/react";
import { useState } from "react";
import Menucomp from "./Menucomp";

export default function Layout({ title, children }) {
   const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  
    return(
<>
      <Head>
        <title>{title ? title +"-ECANA GROUP" : "ECANA GROUP"}</title>
        <meta name="description" content="App Description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex min-h-screen flex-col justify-between overflow-hidden">
   <StickyNavbar toggle={toggle}/>
   <Menucomp toggle={toggle} isOpen={isOpen}/>
        <main className="w-screen ml-0 mt-4 m-auto px-0 overflow-hidden">{children}</main>
        <Footer/>
      </div></>
)
}
