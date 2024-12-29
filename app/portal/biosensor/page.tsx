import AboutBiosensorProject from "@/components/Projects/biosensor/AboutProject";
import Link from "next/link";
// import BiosensorPlot from "@/components/Projects/biosensor/Plots";
import  WrapperComponent from "@/components/Projects/biosensor/comptoprint";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data Portal | Biosensor | High Throughput Sciences",
  description: "Biosensor project data.",
  // other metadata
};

const ResearchBiosensorPage = () => {
  return (
    <div className="mt-10">
         <AboutBiosensorProject  />



    <section>
      
    <div className="container mt-5 mb-20">
            <WrapperComponent />
          </div>

    </section>

    </div>
  );
};

export default ResearchBiosensorPage;
