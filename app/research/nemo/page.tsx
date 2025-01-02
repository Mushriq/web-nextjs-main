import AboutBiosensorProject from "@/components/Projects/biosensor/AboutProject";
import Link from "next/link";


import { Metadata } from "next";
import ComingSoonSection from "@/components/ComingSoon/ComingSoon";

export const metadata: Metadata = {
  title: "Research | High Throughput Sciences",
  description: "Explore our ongoing research projects at HTS.",
  // other metadata
};

const ResearchBiosensorPage = () => {
  return (
    <div className="mt-10">

        <ComingSoonSection />

    </div>
  );
};

export default ResearchBiosensorPage;
