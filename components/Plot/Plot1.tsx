import Image from "next/image";
import Link from "next/link";
import SectionTitle from "../Common/SectionTitle";

const checkIcon = (
  <svg width="16" height="13" viewBox="0 0 16 13" className="fill-current">
    <path d="M5.8535 12.6631C5.65824 12.8584 5.34166 12.8584 5.1464 12.6631L0.678505 8.1952C0.483242 7.99994 0.483242 7.68336 0.678505 7.4881L2.32921 5.83739C2.52467 5.64193 2.84166 5.64216 3.03684 5.83791L5.14622 7.95354C5.34147 8.14936 5.65859 8.14952 5.85403 7.95388L13.3797 0.420561C13.575 0.22513 13.8917 0.225051 14.087 0.420383L15.7381 2.07143C15.9333 2.26669 15.9333 2.58327 15.7381 2.77854L5.8535 12.6631Z" />
  </svg>
);



const Data1 = () => {

  const DataList = ({icon, title, version, release}) => (
    <div className="mb-5 p-2 border border-transparent hover:border-primary bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-900 transition-colors duration-300 rounded-md">
      <p className="flex items-center text-lg font-medium text-body-color">
      <span className="mr-4 flex h-[30px] w-[30px] items-center justify-center rounded-md bg-primary bg-opacity-10 text-primary">
        {icon}
      </span>
      <span className="flex-grow text-body-color dark:text-white text-sm md:text-lg">
        {title}
      </span>
      <span className="flex-shrink-0 text-sm ml-4 text-current font-mono">
        <span className="hidden sm:inline">version: </span>{version}
      </span>
      <span className="flex-shrink-0 text-sm ml-4 text-current font-mono">
        <span className="hidden sm:inline">release date: </span>{release}
      </span>
      <span className="ml-4"></span>
      <span className="ml-auto flex items-center justify-center rounded-md bg-primary bg-opacity-10 hover:bg-opacity-90 text-primary">
        <Link
        href="https://github.com/Mushriq"
        className="block px-4 py-2 text-base font-medium text-dark hover:opacity-70 dark:text-white md:flex items-center"
        >
        <svg width="25" height="24" viewBox="0 0 25 24" fill="white" xmlns="http://www.w3.org/2000/svg" className="">
          <path d="M12.4239 16.75C12.2079 16.75 12.0132 16.6587 11.8763 16.5126L7.26675 11.9059C6.97376 11.6131 6.97361 11.1382 7.26641 10.8452C7.55921 10.5523 8.03408 10.5521 8.32707 10.8449L11.6739 14.1896L11.6739 4C11.6739 3.58579 12.0096 3.25 12.4239 3.25C12.8381 3.25 13.1739 3.58579 13.1739 4L13.1739 14.1854L16.5168 10.8449C16.8098 10.5521 17.2846 10.5523 17.5774 10.8453C17.8702 11.1383 17.87 11.6131 17.5771 11.9059L13.0021 16.4776C12.8646 16.644 12.6566 16.75 12.4239 16.75Z" fill="currentColor" />
          <path d="M5.17188 16C5.17188 15.5858 4.83609 15.25 4.42188 15.25C4.00766 15.25 3.67188 15.5858 3.67188 16V18.5C3.67188 19.7426 4.67923 20.75 5.92188 20.75H18.9227C20.1654 20.75 21.1727 19.7426 21.1727 18.5V16C21.1727 15.5858 20.837 15.25 20.4227 15.25C20.0085 15.25 19.6727 15.5858 19.6727 16V18.5C19.6727 18.9142 19.337 19.25 18.9227 19.25H5.92188C5.50766 19.25 5.17188 18.9142 5.17188 18.5V16Z" fill="currentColor" />
        </svg>
        <span className="hidden sm:inline ml-2">Download</span>
        </Link>
      </span>
      </p>
    </div>
  );

  return (
    <section id="about" className="pt-16 md:pt-20 lg:pt-28">
      <div className="container">
        <div className="border-b border-body-color/[.15] pb-16 dark:border-white/[.15] md:pb-20 lg:pb-28">
          <div className="-mx-4 flex flex-wrap items-center">
            <div className="w-full px-4">
              <SectionTitle
                title="HTS provides a platform for impactful data-driven discovery."
                paragraph="Integrated robotic systems with advanced liquid handling, multi-modal plate readouts and high-content imaging streamline combinatorial screens and generate next-generation datasets for machine learning-driven discoveries."
                mb="40px"
              />

              <div
                className="wow fadeInUp mb-12 lg:mb-0"
                data-wow-delay=".15s"
              >
               <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 mx-[-12px]">
                    <DataList icon={checkIcon} 
                    title="Drug synergy collection"
                    version="1.0.0"
                    release="01-01-2025"
                    />
                    <DataList icon={checkIcon} 
                    title="Time-lapse cell mixtures"
                    version="1.0.0"
                    release="01-01-2025"
                    />
                    <DataList icon={checkIcon} 
                    title="AlphaFold validation screen"
                    version="1.0.0"
                    release="01-01-2025"
                    />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Data1;
