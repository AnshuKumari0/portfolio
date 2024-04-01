"use client";

import React from "react";
import { motion } from "framer-motion";

import { technologies } from "../../constants/page";
import { skills } from "../../constants/page";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../../utils/motion";
import { styles } from "../styles/navbar";

import BallCanvas from "./convas/Ball";
import Image from "next/image";
import { Tilt } from "react-tilt";

const Tech = () => {
  return (
    <div className="py-8">
      <motion.div variants={textVariant()}>
        <h4 className={`${styles.sectionSubText} text-subtitle`}>My Skills</h4>
        <h2 className={`${styles.sectionHeadText} text-accent text-left`}>
          Proficient Tech
        </h2>
      </motion.div>
      {/* <div className="flex flex-row flex-wrap justify-start gap-8 mt-4">
        {technologies.map((item) => (
          <div className="w-24 h-24 bg-accent justify-center" key={item.name}>
            <Image src={item.icon} width={100} height={100} alt="img" />
          </div>
        ))}
      </div> */}
      <div className="flex flex-row flex-wrap justify-start gap-4 lg:gap-8 mt-4">
        {skills.map((item, index) => (
          <motion.div
            variants={fadeIn("right", "spring", index * 0.5, 0.75)}
            key={item.name}
          >
            <Tilt>
              <div className="relative w-24 h-24 bg-accent justify-center rounded-md">
                <Image src={item.icon} width={100} height={100} alt="img" />
                {/* <div className="flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <p className="text-white">{item.name}</p>
            </div> */}
              </div>
            </Tilt>
          </motion.div>
        ))}
      </div>

      {/*
      <div className="flex flex-row flex-wrap justify-start gap-8 mt-4">
        {skills.map((item) => (
          <div className="w-28 h-28" key={item.name}>
            <BallCanvas icon={item.icon} />
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default SectionWrapper(Tech, "");
