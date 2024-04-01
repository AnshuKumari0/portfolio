import { TfiLinkedin } from "react-icons/tfi";
import { SiGmail } from "react-icons/si";
import { RiGithubFill } from "react-icons/ri";

//services
import { MdWeb } from "react-icons/md";
import { MdStorage } from "react-icons/md";
import { MdPhoneIphone } from "react-icons/md";
import { IoMdCode } from "react-icons/io";

export const social = [
  {
    id: "linkedin",
    icon: <TfiLinkedin />,
    link: "https://www.linkedin.com/in/anshu-kumari-4747851a9/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  },
  {
    id: "github",
    icon: <RiGithubFill />,
    link: "https://github.com/AnshuKumari0",
  },
  {
    id: "gmail",
    icon: <SiGmail />,
    link: "mailto:kumari.anshu1146@gmail.com",
  },
];

export const navLinks = [
  {
    id: "skill",
    title: "Skills",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
  {
    id: "dashboard",
    title: "Dashboard",
  },
];

export const services = [
  {
    title: "Frontend Developer",
    icon: <MdWeb />,
  },
  {
    title: "Backend Developer",
    icon: <MdStorage />,
  },
  {
    title: "App Developer",
    icon: <MdPhoneIphone />,
  },
  {
    title: "Web Developer",
    icon: <IoMdCode />,
  },
];

export const experiences = [
  {
    title: "Software Developer - Full Time",
    company_name: "Regal Outsource Pvt Ltd, Rajasthan, India",
    // icon: starbucks,
    iconBg: "#383E56",
    date: "March 2022 - Present",
    points: [
      {
        id: 1,
        point:
          "Enhanced US healthcare project with seamless API integration, user-friendly design, and optimized data processing. Gained deep understanding of healthcare workflows.",
      },
      {
        id: 2,
        point:
          "Built dynamic Spice Export website using Next.js with admin-created blogs managed dynamically with React-Quill. Prioritized intuitive navigation and accessible content.",
      },
      {
        id: 3,
        point:
          "Designed and developed role-specific dashboard components, integrated RESTful APIs with Redux-Saga for efficient data handling, prioritizing visual appeal for improved user experience in payroll project.",
      },
    ],
  },
  {
    title: "NodeJs Developer - Internship",
    company_name: "SpeedLabs, Indore, India",
    // icon: tesla,
    iconBg: "#E6DEDD",
    date: "Sept 2021 - Dec 2021",
    points: [
      {
        id: 1,
        point:
          "Developed RESTful APIs utilizing Node.js and Express.js during internship.",
      },
      {
        id: 2,
        point:
          "Participated in documenting existing APIs using Postman for testing and validation purposes.",
      },
      {
        id: 3,
        point:
          "Gained hands-on experience in API development and documentation processes.",
      },
      {
        id: 4,
        point:
          "Acquired practical knowledge in using industry-standard tools like Postman for API testing and validation..",
      },
    ],
  },
  {
    title: "ReactJs Developer - Internship",
    company_name: "Ypsilon IT Solutions Pvt. Ltd, Indore, India",
    // icon: shopify,
    iconBg: "#383E56",
    date: "Feb 2021 - May 2021",
    points: [
      {
        id: 1,
        point:
          "Contributed to the development of components within the e-commerce project during the internship period.",
      },
      {
        id: 2,
        point:
          "Acquired practical skills and knowledge in JavaScript and ReactJS through hands-on experience with project tasks.",
      },
      {
        id: 3,
        point:
          "Obtained valuable understanding of practical application development methodologies and the complexities inherent in working within the environment of an e-commerce project.",
      },
    ],
  },
];

export const technologies = [
  {
    name: "HTML 5",
    icon: "/tech/html.png",
  },
  {
    name: "CSS 3",
    icon: "/tech/css.png",
  },
  {
    name: "JavaScript",
    icon: "/tech/javascript.png",
  },
  {
    name: "TypeScript",
    icon: "/tech/typescript.png",
  },
  {
    name: "React JS",
    icon: "/tech/reactjs.png",
  },
  {
    name: "Redux Toolkit",
    icon: "/tech/redux.png",
  },
  {
    name: "Tailwind CSS",
    icon: "/tech/tailwind.png",
  },
  {
    name: "React Native",
    icon: "/tech/reactjs.png",
  },
  {
    name: "Node JS",
    icon: "/tech/nodejs.png",
  },
  {
    name: "MongoDB",
    icon: "/tech/mongodb.png",
  },
  {
    name: "Three JS",
    icon: "/tech/threejs.svg",
  },
  {
    name: "git",
    icon: "/tech/git.png",
  },
  {
    name: "aws",
    icon: "/tech/aws.png",
  },
];

export const skills = [
  {
    name: "HTML 5",
    icon: "/skills/html.png",
  },
  {
    name: "CSS 3",
    icon: "/skills/css.png",
  },
  {
    name: "Tailwind CSS",
    icon: "/skills/tailwind.png",
  },
  {
    name: "JavaScript",
    icon: "/skills/javascript.png",
  },
  {
    name: "TypeScript",
    icon: "/skills/typescript.png",
  },
  {
    name: "React JS",
    icon: "/skills/reactjs.png",
  },
  {
    name: "Redux Toolkit",
    icon: "/skills/redux.png",
  },
  {
    name: "React Native",
    icon: "/skills/react-native.png",
  },
  {
    name: "Node JS",
    icon: "/skills/nodejs.png",
  },
  {
    name: "Next JS",
    icon: "/skills/nextjs.png",
  },
  {
    name: "MongoDB",
    icon: "/skills/mongodb.png",
  },
  {
    name: "aws",
    icon: "/skills/aws.png",
  },
];
