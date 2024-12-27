import SectionTitle from "@/components/Common/SectionTitle";
import TeamSectionOne from "@/components/Team/TeamSectionOne";
import AboutSectionOne from "@/components/About/AboutSectionOne";


import { Metadata } from "next";

export const metadata: Metadata = {
  title: "HTS Instruments Page",
  description: "This is the Instruments Page for HTS",
  // other metadata
};

const TeamPage = () => {
  return (
    <>
      <div style={{ marginBottom: "20px" }}></div>
      <AboutSectionOne />
      <TeamSectionOne />
    </>
  );
};

export default TeamPage;
