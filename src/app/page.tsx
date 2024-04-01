import { getServerSession } from "next-auth";
import About from "./components/About";
import Header from "./components/Header";
import Tech from "./components/Tech";
import Experience from "./components/Experience";
import Project from "./project/page";

export default async function Home() {
  const session = await getServerSession();
  return (
    <>
      <Header />
      <div className="px-8 2xl:px-40 lg:px-28">
        <About />
        <Tech />
        <Experience />
        <Project />
      </div>
    </>
  );
}
