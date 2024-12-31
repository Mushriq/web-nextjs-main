import ComingSoonSection from "@/components/ComingSoon/ComingSoon";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Protocols | High Throughput Sciences",
  description: "This is the Protocols page for High Throughput Sciences",
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
