"use client";

import React from "react";
import { Tilt } from "react-tilt";
import { saveAs } from "file-saver";
import Link from "next/link";

import { social } from "../../constants/page";
import Navbar from "./Navbar";

const Header = () => {
  const handleDownload = () => {
    const fileId = "1ZJE46Beg6-1rHhTTBYVTSBC9mVQ1JXVj";
    const fileUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
    saveAs(fileUrl, "Anshu CV.pdf");
  };

  return (
    <div
      className="flex flex-col text-center justify-center bg-cover bg-center bg-no-repeat w-full h-screen"
      style={{ backgroundImage: `url('/image.png')` }}
    >
      <div className="absolute top-0 left-0 right-0">
        <Navbar />
      </div>

      <div className="flex flex-col w-full justify-center items-left text-left px-8 2xl:px-40 lg:px-28">
        <h1 className="text-white text-5xl lg:text-[7vmax] font-extrabold">
          <p className="" style={{ letterSpacing: "0.1em" }}>
            Hi,
          </p>
          <p className="mt-3" style={{ letterSpacing: "0.1em" }}>
            I am Anshu
          </p>
          <p className="mt-3" style={{ letterSpacing: "0.1em" }}>
            Kumari
          </p>
        </h1>
        <h3
          className="mt-6 text-accent text-[2vmax]"
          style={{ letterSpacing: "0.4em" }}
        >
          FULL STACK DEVELOPER
        </h3>
        <div className="lg:flex py-4 mt-2">
          <div className="flex space-x-2">
            {social.map((item) => (
              <Tilt
                key={item.id}
                className="bg-background text-2xl p-2 text-center flex items-center justify-center"
                style={{ width: "50px", height: "50px" }}
              >
                <Link href={item.link}>{item.icon}</Link>
              </Tilt>
            ))}
          </div>
          <Tilt>
            <button
              className="bg-primary text-white rounded-full p-4 px-6 text-[14px] lg:ml-4 mt-4 lg:mt-0"
              onClick={handleDownload}
            >
              Download CV
            </button>
          </Tilt>
        </div>
      </div>
    </div>
  );
};

export default Header;
