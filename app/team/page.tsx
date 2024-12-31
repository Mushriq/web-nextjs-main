import SectionTitle from "@/components/Common/SectionTitle";
import TeamSectionOne from "@/components/Team/TeamSectionOne";
import AboutSectionOne from "@/components/About/AboutSectionOne";


import { Metadata } from "next";

export const metadata: Metadata = {
  title: "HTS Team Page",
  description: "This is the Team Page for HTS",
  // other metadata
};

const TeamPage = () => {
  return (
    <>
      <div className="mt-10">
         <AboutSectionOne  />
      </div>

      <TeamSectionOne />


    </>
  );
};

export default TeamPage;
