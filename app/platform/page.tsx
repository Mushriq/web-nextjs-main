import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import Breadcrumb from "@/components/Common/Breadcrumb";
import Instrument1 from "@/components/Platform/Instrument1";
import Instrument2 from "@/components/Platform/Instrument2";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "HTS Instruments Page",
  description: "This is the Instruments Page for HTS",
  // other metadata
};

const PlatformPage = () => {
  return (
    <>
     {/*  <Breadcrumb
        pageName="Instruments Page"
        description="This is the Instruments Page for HTS"
      /> */}
      <div style={{ marginBottom: "20px" }}></div>
      <Instrument1 />
      <Instrument2 />
    </>
  );
};

export default PlatformPage;
