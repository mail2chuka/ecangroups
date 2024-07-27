import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const Info = ({
  heading,
  paragraph,
  paragraphTwo,
  buttonLabel,
  image,
  reversed,
  position = position - 1,
}) => {
const [more, setMore]=useState(false)
  const change=()=>{
    setMore(!more)
  }
  return (
    <section
      className={`relative overflow-hidden overflow-x-hidden items-center justify-center ease-in duration-700 flex mt-2 mb-3  h-full w-[100%] px-6 py-6`}
    >
      <div className="p-[3rem calc((100vw-1300px)/2)] grid grid-cols-1 lg:grid-cols-2">
        <div
          className={`flex flex-col justify-evenly items-start leading-loose pr-3 pl-24 ${
            reversed ? "order-2 lg:order-first" : "order-2 lg:order-2"} text-lg`}
        >
          <h1 className="text-2xl font-bold uppercase">{heading}</h1>
          <p>{paragraph}
          <span className={`${more?"hidden":"inline-flex"}`}>...</span></p>
          <p className={`mb-0 ${more?"inline-block":"hidden"}`}>{paragraphTwo}</p>
          <div className=" cursor-pointer px-2 border-white border-2 mt-0" onClick={change}>{more?"Read Less":"Read More"}</div>
          <Link className="border-[#F13B66] border-2 px-4 mt-5 bg-gray-800" href="#">
            {buttonLabel}
          </Link>
        </div>
        <div className={`flex justify-center px-4 py-8 items-center`}>
          <Image
            alt="Img"
            src={image}
            className="object-cover h-full w-full shadow-md shadow-emerald-400 hover:scale-105 ease-in duration-500"
          />
        </div>
      </div>
    </section>
  );
};

export default Info;
