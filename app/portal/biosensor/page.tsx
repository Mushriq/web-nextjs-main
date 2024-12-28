import AboutBiosensorProject from "@/components/Projects/biosensor/AboutProject";
import Link from "next/link";
// import BiosensorPlot from "@/components/Projects/biosensor/Plots";
import  WrapperComponent from "@/components/Projects/biosensor/comptoprint";
import { Metadata } from "next";

const ResearchBiosensorPage = () => {
  return (
    <div className="mt-10">
         <AboutBiosensorProject  />

      <section id="about" className="pt-4">
      <div className="container">
        <div className="border-b border-body-color/[.15] pb-4 dark:border-white/[.15]">
          <div className="py-4">
            <h3 className="text-xl font-bold text-black dark:text-white">Principal Investigators</h3>
            <p>Jesse Boehm (MIT)</p>
            <p>Samuel Klempner (MGH)</p>
            <p>Haeseong Park (DFCI)</p>
            <p>Beth Cimini (Broad)</p>
          </div>
        </div>
      </div>
      </section>

    <section>
      
    <div className="container mt-5 mb-20">
            <WrapperComponent />
          </div>

    </section>

    </div>
  );
};

export default ResearchBiosensorPage;
