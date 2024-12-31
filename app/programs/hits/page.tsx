import ComingSoonSection from "@/components/ComingSoon/ComingSoon";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "HITS | High Throughput Sciences",
  description: "About the HITS program",
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
