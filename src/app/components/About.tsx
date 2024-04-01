"use client";

import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import { ServiceCardType } from "../types/service";
import { services } from "../../constants/page";
import { textVariant } from "../../utils/motion";
import { fadeIn } from "../../utils/motion";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles/navbar";

const ServiceCard = ({ index, title, icon }: ServiceCardType) => (
  <div
    className="xs:w-[250px] w-full flex justify-center items-center mt-4 lg:mt-0"
    key={index}
  >
    <div className="w-full p-[1px]">
      <motion.div variants={fadeIn("right", "spring", index * 0.5, 0.75)}>
        <Tilt className="bg-secondary p-6 m-1 rounded-md min-h-[280px] flex items-center justify-center flex-col space-x-4">
          <div className="flex flex-col text-center items-center justify-center">
            <div className="text-7xl text-primary">{icon}</div>
            <h3 className="text-white text-[15px] uppercase mt-8">{title}</h3>
            <h3 className="border-primary text-[15px] border border-b-1 w-8 mt-3"></h3>
          </div>
        </Tilt>
      </motion.div>
    </div>
  </div>
);

const AboutUs = () => {
  return (
    <div className="py-8 pt-16">
      <>
        <div className="lg:w-4/5">
          <>
            <motion.div variants={textVariant()}>
              <h4 className={`${styles.sectionSubText} text-subtitle`}>
                INTRODUCTION
              </h4>
              <h2 className={`${styles.sectionHeadText} text-accent text-left`}>
                Overview
              </h2>
            </motion.div>
            <h4 className="mt-4 text-accent text-[17px] max-w-3xl leading-[30px]">
              I&apos;m a skilled software developer with experience in
              JavaScript, TypeScript and expertise in frameworks like ReactJs,
              NodeJs, ExpressJs, NextJs and react Native. I&apos;m a quick
              learner and collaborate closely with clients to create efficient,
              scalable, and user-friendly solutions that solve real-world
              problems. Let&apos;s work together to bring your ideas to life!
            </h4>
          </>
        </div>
        <div className="lg:w-1/5"></div>
      </>

      <>
        <div className="lg:flex gap-2 mt-4">
          {services.map((service, index) => (
            <ServiceCard key={index} index={index} {...service} />
          ))}
        </div>
      </>
    </div>
  );
};

export default SectionWrapper(AboutUs, "");
