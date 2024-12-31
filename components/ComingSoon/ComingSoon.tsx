import Image from "next/image";
import SectionTitle from "../Common/SectionTitle";

const checkIcon = (
  <svg width="16" height="13" viewBox="0 0 16 13" className="fill-current">
    <path d="M5.8535 12.6631C5.65824 12.8584 5.34166 12.8584 5.1464 12.6631L0.678505 8.1952C0.483242 7.99994 0.483242 7.68336 0.678505 7.4881L2.32921 5.83739C2.52467 5.64193 2.84166 5.64216 3.03684 5.83791L5.14622 7.95354C5.34147 8.14936 5.65859 8.14952 5.85403 7.95388L13.3797 0.420561C13.575 0.22513 13.8917 0.225051 14.087 0.420383L15.7381 2.07143C15.9333 2.26669 15.9333 2.58327 15.7381 2.77854L5.8535 12.6631Z" />
  </svg>
);

const ComingSoonSection = () => {

  return (
    <section id="about" className="pt-16 md:pt-20 lg:pt-24">
      <div className="container">
        <div className="border-b border-body-color/[.15] pb-4 dark:border-white/[.15] md:pb-6 lg:pb-8">
          <div className="-mx-4 flex flex-wrap items-center">
            <div className="w-full section-animation px-4 lg:w-1/2">
              <SectionTitle
                title="Coming Soon"
                paragraph="This page is under development."
                mb="0px"
              />
            </div>

            <div className="w-full px-4 lg:w-1/2">
              <div
                className="relative figure-animation-right mx-auto aspect-[1/1] max-w-[500px] lg:mr-0"
                
              >
                <Image
                  src="/images/about/about-image-2.svg"
                  alt="about-image"
                  fill
                  className="block dark:hidden drop-shadow-three dark:opacity-80 mx-auto max-w-full dark:drop-shadow-none lg:mr-0"
                />
                <Image
                  src="/images/about/about-image-2-dark.svg"
                  alt="about-image"
                  fill
                  className="hidden dark:block drop-shadow-three dark:opacity-80 mx-auto max-w-full dark:drop-shadow-none lg:mr-0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComingSoonSection;
