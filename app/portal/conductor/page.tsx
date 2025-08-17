import AboutConductorProject from "@/components/Projects/conductor/AboutProject";
import WrapperComponent from "@/components/Projects/conductor/composerwrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data Portal | Conductor | High Throughput Sciences",
  description: "Conductor workflow composer.",
  // other metadata
};

const ConductorPage = () => {
  return (
    <div className="mt-10">
         <AboutConductorProject  />



    <section>
      
    <div className="container mt-5 mb-20">
            <WrapperComponent />
          </div>

    </section>

    </div>
  );
};

export default ConductorPage;
