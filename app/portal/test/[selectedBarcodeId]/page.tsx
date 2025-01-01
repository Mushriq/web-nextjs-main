import { Metadata } from "next";
import { useState } from "react";
import axios from 'axios';
import SectionTitle from "@/components/Common/SectionTitle";
import StaticTestPage from "@/components/Test/StaticTestPage";

export const metadata: Metadata = {
  title: "High Throughput Sciences",
  description: "High Throughput Sciences (HTS) offers automation and screening capabilities to MIT researchers and external collaborators to generate next-generation datasets for machine learning-driven discoveries.",
  // other metadata
};

export default async function TestPage({ params }) {

  const { selectedBarcodeId } = await params;


  return (
    <>

      <section id="contact" className="pt-16 md:pt-20 lg:pt-24">
        <div className="container">
          <div className="border-b border-body-color/[.15] pb-4 dark:border-white/[.15] md:pb-6 lg:pb-8">
            <div className="-mx-4 flex flex-wrap items-center justify-center">
              <div className="w-full section-animation px-4">
                <div className="flex flex-wrap items-center justify-start w-full">
                  <StaticTestPage selectedBarcodeId={selectedBarcodeId} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
