
import Data1 from "@/components/Plot/Plot1";
import DynamicPlot from "@/components/Plot/Plot2";
import Link from "next/link";


import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Data Portal Page",
  description: "HTS Data Portal",
  // other metadata
};



const PortalPage = () => {
  return (
    <>

      <div style={{ marginBottom: "20px" }}></div>  
      <Data1 />
      {/* 
      <div className="container mt-5 mb-20">
        <DynamicPlot />
      </div>

      */}

    </>
  );
};

export default PortalPage;
