"use client";

import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";
import "react-vertical-timeline-component/style.min.css";

import { experiences } from "../../constants/page";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../../utils/motion";

const ExperienceCard = ({ experience }: any) => {
  return (
    <VerticalTimelineElement
      visible={true}
      contentStyle={{
        background: "#212121", //secondary
        color: "#ffffff",
      }}
      contentArrowStyle={{ borderRight: "7px solid  #232631" }}
      date={experience.date}
      iconStyle={{ background: experience.iconBg }}
      icon={
        <div className="flex justify-center items-center w-full h-full">
          {/* <Image
            width={50}
            height={50}
            src={experience.icon}
            alt={experience.company_name}
            className="w-[60%] h-[60%] object-contain"
          /> */}
        </div>
      }
    >
      <div>
        <h3 className="text-white text-[24px] font-bold">{experience.title}</h3>
        <p
          className="text-white text-[16px] font-semibold"
          style={{ margin: 0 }}
        >
          {experience.company_name}
        </p>
      </div>

      <ul className="mt-5 list-disc ml-2 space-y-2">
        {experience.points.map(({ point }: any, index: number) => (
          <li
            key={`experience-point-${index}`}
            className="text-white text-[14px] pl-1 tracking-wider"
          >
            {point}
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
};

const Experience = () => {
  return (
    <div className="py-8">
      <motion.div variants={textVariant()}>
        <h2 className="sm:text-[18px] text-[14px] text-white uppercase tracking-wider text-center">
          What I have done so far
        </h2>
        <h4 className="text-accent font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px] text-center">
          Work Experience
        </h4>
      </motion.div>

      <div className="mt-16 flex flex-col">
        <VerticalTimeline>
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={`experience-${index}`}
              experience={experience}
            />
          ))}
        </VerticalTimeline>
      </div>
    </div>
  );
};

export default SectionWrapper(Experience, "work");
