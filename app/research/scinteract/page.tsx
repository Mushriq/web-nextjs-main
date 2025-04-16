import AboutSCInteractProject from "@/components/Projects/scinteract/AboutProject";
import Link from "next/link";


import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Research | High Throughput Sciences",
  description: "Explore our ongoing research projects at HTS.",
  // other metadata
};

const ResearchSCInteractPage = () => {
  return (
    <div className="mt-10">
         <AboutSCInteractProject  />

      <section id="about" className="pt-4">
      <div className="container">
        <div className="border-b border-body-color/[.15] pb-4 dark:border-white/[.15]">
          <div className="flex flex-wraped items-center">
                          <Link
                            href="/portal/scinteract"
                            className="ease-in-up shadow-btn hover:shadow-btn-hover block rounded-sm bg-primary px-6 py-2 text-sm font-medium text-white transition duration-300 hover:bg-opacity-90 md:px-7 lg:px-5 xl:px-7"
                            >Go to the Data</Link>
          </div>
        </div>
      </div>
      </section>

    </div>
  );
};

export default ResearchSCInteractPage;
