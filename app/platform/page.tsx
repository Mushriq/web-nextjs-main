import PlatformSectionOne from "@/components/Platform/PlatformSectionOne";
import PlatformPortal from "@/components/Platform/PlatformPortal";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Platform | High Throughput Sciences",
  description: "This is the Platform Page for HTS",
  // other metadata
};

const PlatformPage = () => {
  return (
    <>
     {/*  <Breadcrumb
        pageName="Instruments Page"
        description="This is the Instruments Page for HTS"
      /> */}
      <div className="mt-10">
            <PlatformSectionOne />
      </div>

      <PlatformPortal />
    </>
  );
};

export default PlatformPage;
