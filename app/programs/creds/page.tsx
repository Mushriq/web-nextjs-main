import ComingSoonSection from "@/components/ComingSoon/ComingSoon";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CReDS | High Throughput Sciences",
  description: "About the CReDS program",
  // other metadata
};

const AboutPage = () => {
  return (
    <>
      <ComingSoonSection />
    </>
  );
};

export default AboutPage;
