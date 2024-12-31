import ComingSoonSection from "@/components/ComingSoon/ComingSoon";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "START | High Throughput Sciences",
  description: "About the START program",
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
