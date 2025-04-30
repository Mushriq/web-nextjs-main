"use client";

import { useEffect, useState } from "react";
import SectionTitle from "../Common/SectionTitle";
import Image from "next/image";
import Link from "next/link";
import teamData from "./teamData";
import { useMemo } from "react";

const linkedinIcon = (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="fill-current">
    <path d="M19.7065 3H4.34844C3.62264 3 3.04199 3.58065 3.04199 4.30645V19.6935C3.04199 20.3903 3.62264 21 4.34844 21H19.6485C20.3743 21 20.9549 20.4194 20.9549 19.6935V4.27742C21.013 3.58065 20.4323 3 19.7065 3ZM8.35491 18.3H5.71297V9.73548H8.35491V18.3ZM7.01942 8.54516C6.14846 8.54516 5.4807 7.84839 5.4807 7.00645C5.4807 6.16452 6.17749 5.46774 7.01942 5.46774C7.86136 5.46774 8.55813 6.16452 8.55813 7.00645C8.55813 7.84839 7.91942 8.54516 7.01942 8.54516ZM18.371 18.3H15.7291V14.1484C15.7291 13.1613 15.7001 11.8548 14.3356 11.8548C12.942 11.8548 12.7388 12.9581 12.7388 14.0613V18.3H10.0968V9.73548H12.6807V10.9258H12.7097C13.0872 10.229 13.9291 9.53226 15.2356 9.53226C17.9356 9.53226 18.4291 11.2742 18.4291 13.6548V18.3H18.371Z" />
  </svg>
);

const cookieIcon = (
<svg width="32" height="32" viewBox="0 -0.5 25 25" xmlns="http://www.w3.org/2000/svg" fill="none" className="fill-current">
<path fillRule="evenodd" d="M6.85 4.787C8.731 3.44 10.958 3 12.456 3h1.005a1 1 0 0 1 1 1v3h2.014a1 1 0 0 1 1 1v2h3.019a1 1 0 0 1 1 1v1c0 3.503-1.395 5.808-3.297 7.206-1.85 1.36-4.087 1.794-5.74 1.794-1.654 0-3.89-.434-5.742-1.794C4.814 17.808 3.419 15.503 3.419 12c0-3.528 1.5-5.828 3.431-7.213zM9.442 7a1 1 0 1 0 0 2h.001a1 1 0 0 0 0-2zm-3.01 5a1 1 0 0 1 1-1h.002a1 1 0 1 1 0 2h-.001a1 1 0 0 1-1-1zm6.024 0a1 1 0 1 0 0 2h.001a1 1 0 1 0 0-2zm-3.01 4a1 1 0 0 1 1-1h.002a1 1 0 1 1 0 2h-.001a1 1 0 0 1-1-1zm7.029-2a1 1 0 1 0 0 2 1 1 0 1 0 0-2z" clipRule="evenodd"/>
</svg>
);


const TeamSectionOne = () => {
  const [loadedCount, setLoadedCount] = useState(0);
  const [allLoaded, setAllLoaded] = useState(false);
  const [showCards, setShowCards] = useState<boolean[]>([]);

  const [randomRotations, setRandomRotations] = useState<number[]>([]);

  useEffect(() => {
    const rotations = teamData.map(() => Math.floor(Math.random() * 360));
    setRandomRotations(rotations);
  }, []);

  useEffect(() => {
    if (loadedCount === teamData.length) {
      setAllLoaded(true);
    }
  }, [loadedCount]);

  useEffect(() => {
    if (allLoaded) {
      teamData.forEach((_, index) => {
        setTimeout(() => {
          setShowCards((prev) => {
            const updated = [...prev];
            updated[index] = true;
            return updated;
          });
        }, index * 150); // 150ms delay between each
      });
    }
  }, [allLoaded]);

  const handleImageLoad = () => {
    setLoadedCount((prev) => prev + 1);
  };

  return (
    <section className="mt-8 mb-20 md:mt-12 lg:mt-16">
      <SectionTitle title="Our Team" paragraph=" " center />
      <div className="container mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 items-start justify-center gap-y-10">
          {teamData.map((member, index) => {
  const rotation = randomRotations[index] || 0;

  return (
    <div
      key={index}
      className={`flex flex-col items-center px-5 mb-5 transition-all duration-700 ease-out
        ${showCards[index] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}
      `}
    >
      <div className="relative flex items-center justify-center">
        <div
          className="absolute h-40 w-40 md:h-48 md:w-48 lg:h-64 lg:w-64 rounded-full blur-xl z-0 animate-spin-slow" // 
          style={{
            background: `conic-gradient(
              from 0deg,
              #6721b4,
              #ffa500,
              #add8e6,
              #6721b4
            )`,
            transform: `rotate(${rotation}deg)`,
          }}
        />
        <div className="relative h-40 w-40 md:h-48 md:w-48 lg:h-64 lg:w-64 overflow-hidden rounded-full z-10">
          <Image
            src={member.photo}
            alt={member.name}
            fill
            className="object-cover"
            onLoad={handleImageLoad}
          />
        </div>
      </div>

                <p className="mt-2 text-center font-bold z-100">{member.name}</p>
                <p className="mt-0 text-center">{member.role}</p>
                <p className="mt-2 mb-2 text-center text-sm">{member.paragraph}</p>

                <div className="flex items-center justify-center mb-8">
                  <Link
                    href={member.linkedin}
                    className={`items-center ${member.linkedin ? "block" : "hidden"}`}
                  >
                    <div className="flex items-center space-x-2.5 text-gray-800 dark:text-gray-400 hover:text-primary hover:dark:text-secondary">
                      {linkedinIcon}
                    </div>
                  </Link>
                  <Link
                    href={member.cookie}
                    className={`items-center ${member.cookie ? "block" : "hidden"}`}
                  >
                    <div className="flex items-center space-x-2.5 text-gray-800 dark:text-gray-400 hover:text-primary hover:dark:text-secondary">
                      {cookieIcon}
                    </div>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TeamSectionOne;
