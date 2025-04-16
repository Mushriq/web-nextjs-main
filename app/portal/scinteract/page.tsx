import AboutSCInteractProject from "@/components/Projects/scinteract/AboutProject";
import  WrapperComponent from "@/components/Projects/scinteract/comptoprint";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data Portal | SCInteract | High Throughput Sciences",
  description: "SCInteract project data.",
  // other metadata
};

const ResearchSCInteractPage = () => {
  return (
    <div className="mt-10">
         <AboutSCInteractProject  />



    <section>
      
    <div className="container mt-5 mb-20">
            <WrapperComponent />
          </div>

    </section>

    </div>
  );
};

export default ResearchSCInteractPage;
