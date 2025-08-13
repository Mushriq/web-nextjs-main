import AboutFRESHProject from "@/components/Projects/fresh/AboutProject";
import  WrapperComponent from "@/components/Projects/fresh/comptoprint";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data Portal | FRESH | High Throughput Sciences",
  description: "FRESH project data.",
  // other metadata
};

const ResearchFRESHPage = () => {
  return (
    <div className="mt-10">
         <AboutFRESHProject  />



    <section>
      
    <div className="container mt-5 mb-20">
            <WrapperComponent />
          </div>

    </section>

    </div>
  );
};

export default ResearchFRESHPage;
