import SectionTitle from "../Common/SectionTitle";
import Image from "next/image";
import Link from "next/link";
import teamData from "./teamData";

const linkedinIcon = (<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="fill-current">
  <path d="M19.7065 3H4.34844C3.62264 3 3.04199 3.58065 3.04199 4.30645V19.6935C3.04199 20.3903 3.62264 21 4.34844 21H19.6485C20.3743 21 20.9549 20.4194 20.9549 19.6935V4.27742C21.013 3.58065 20.4323 3 19.7065 3ZM8.35491 18.3H5.71297V9.73548H8.35491V18.3ZM7.01942 8.54516C6.14846 8.54516 5.4807 7.84839 5.4807 7.00645C5.4807 6.16452 6.17749 5.46774 7.01942 5.46774C7.86136 5.46774 8.55813 6.16452 8.55813 7.00645C8.55813 7.84839 7.91942 8.54516 7.01942 8.54516ZM18.371 18.3H15.7291V14.1484C15.7291 13.1613 15.7001 11.8548 14.3356 11.8548C12.942 11.8548 12.7388 12.9581 12.7388 14.0613V18.3H10.0968V9.73548H12.6807V10.9258H12.7097C13.0872 10.229 13.9291 9.53226 15.2356 9.53226C17.9356 9.53226 18.4291 11.2742 18.4291 13.6548V18.3H18.371Z" />
  </svg>
);


const TeamSectionOne = () => {
  return (
    <section className="mt-8 mb-20 md:mt-12 lg:mt-16">
        <SectionTitle
              title="Our Team"
              paragraph=" "
              center
            />

      <div className="container mt-10">
        <div className="flex flex-col fade-in-fwd md:flex-row items-center justify-center">
          {teamData.map((member, index) => (

            <div key={index} className="flex flex-col items-center px-5 mb-5">
              <div style={{animation: "fade-in-fwd 0.5s ease-in-out both"}}  className="relative h-48 w-48 overflow-hidden rounded-full border border-gray-200 shadow-md md:h-40 md:w-40 lg:h-64 lg:w-64">
              <Image
              src={member.photo}
              alt={member.name}
              fill
              className="object-cover"
              />
              </div>
              <p className="mt-2 text-center font-bold">{member.name}</p>
              <p className="mt-0 text-center">{member.role}</p> 
              <p className="mt-2 mb-2 text-center text-sm">{member.paragraph}</p> 
              <div className="flex items-center justify-center mb-8">
              <Link
                href={member.linkedin}
                className={`items-center ${
                  member.linkedin ? "block" : "hidden"
                }`}
              >
              <div className="flex items-center   space-x-2.5 text-gray-800 dark:text-gray-400  hover:text-primary hover:dark:text-secondary">{linkedinIcon}</div>
              </Link>
              </div>
            </div>




          )
        
        )}
        </div>
            
      </div>

    </section>
  );
};

export default TeamSectionOne;
