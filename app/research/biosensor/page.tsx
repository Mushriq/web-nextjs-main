import AboutBiosensorProject from "@/components/Projects/biosensor/AboutProject";
import Link from "next/link";


import { Metadata } from "next";

export const metadata: Metadata = {
  title: "HTS Instruments Page",
  description: "This is the Instruments Page for HTS",
  // other metadata
};

const ResearchBiosensorPage = () => {
  return (
    <div className="mt-10">
         <AboutBiosensorProject  />

      <section id="about" className="pt-4">
      <div className="container">
        <div className="border-b border-body-color/[.15] pb-4 dark:border-white/[.15]">
          <div className="py-4">
            <h3 className="text-xl font-bold text-black dark:text-white">Principal Investigators</h3>
            <p>Jesse Boehm (MIT)</p>
            <p>Samuel Klempner (MGH)</p>
            <p>Haeseong Park (DFCI)</p>
            <p>Beth Cimini (Broad)</p>
          </div>
          <div className="flex flex-wraped items-center">
                          <Link
                            href="/portal/biosensor"
                            className="ease-in-up shadow-btn hover:shadow-btn-hover block rounded-sm bg-primary px-6 py-2 text-sm font-medium text-white transition duration-300 hover:bg-opacity-90 md:px-7 lg:px-5 xl:px-7"
                            >Go to the Data</Link>
          </div>
        </div>
      </div>
      </section>

    </div>
  );
};

export default ResearchBiosensorPage;