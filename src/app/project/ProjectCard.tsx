"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { ProjectCardProps } from "../types/project";
import { styles } from "../styles/navbar";
import { textVariant } from "../../utils/motion";

const ProjectCard = ({ data, loading }: ProjectCardProps) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleMouseEnter = (index: any) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };
  const renderIcon = (item: any) => {
    if (item.githublink.includes("github.com")) {
      return (
        <Image
          priority={true}
          src="/github.png"
          alt="GitHub"
          className="object-contain"
          width={100}
          height={100}
        />
      );
    }
  };

  return (
    <div className="pt-8">
      <motion.div variants={textVariant()}>
        <h4 className={`${styles.sectionSubText} text-subtitle`}>My Work</h4>
        <h2 className={`${styles.sectionHeadText} text-accent`}>Projects</h2>
      </motion.div>
      {loading ? (
        <h4 className="text-accent text-md">Loading...</h4>
      ) : (
        <div className="py-6">
          <div className="w-full grid md:grid-cols-2 3xl:grid-cols-3 gap-8 py-1 px-1">
            {data.length > 0 &&
              data.map((item, index) => (
                <div
                  key={item._id}
                  className="relative flex flex-col justify-center h-full"
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="h-80 relative rounded-md">
                    <Image
                      priority={true}
                      src={`https://iamanshukumari.vercel.app/api/upload/${item.filename}`}
                      alt="Products item"
                      width={540}
                      height={400}
                      className="w-full h-full object-cover rounded-md"
                      style={{
                        filter: hoveredIndex === index ? "filter blur-5" : "",
                      }}
                    />

                    <div className="absolute inset-0 bg-black bg-opacity-70"></div>
                  </div>

                  <div className="absolute inset-0 flex flex-col">
                    <div className="h-1/2">
                      {item.githublink && (
                        <Link
                          href={item.githublink}
                          className="flex justify-end"
                        >
                          <Image
                            priority={true}
                            src="/github.png"
                            alt="GitHub"
                            className="object-contain"
                            width={40}
                            height={40}
                          />
                        </Link>
                      )}
                    </div>
                    <div className="flex flex-col p-4 pt-0 justify-end h-1/2">
                      <div className="flex">
                        <div className="border-b border-white h-3 w-3 mx-2 mt-1 font-bold"></div>
                        <p className="text-2xl text-white font-bold">
                          {item.name}
                        </p>
                      </div>
                      <h3 className="text-md text-white mt-3">
                        {item.description}
                      </h3>
                      <h2 className="text-primary text-left font-poppins text-[14px] font-bold mt-1">
                        {item.techstack}
                      </h2>
                      <h2 className="text-cyan-500 text-left font-poppins text-[14px] font-bold mt-1 hover:underline hover:cursor-pointer">
                        <Link href={item.projectlink}>{item.projectlink}</Link>
                      </h2>
                      <Link href={`/project/${item._id}`}>
                        <button className="my-2 w-auto inline-flex underline text-white text-[13px] font-bold hover:cursor-pointer">
                          More Details
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
