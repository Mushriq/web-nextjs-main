"use client";

import { useEffect } from "react";
import teamData from "@/components/Team/teamData";

const PreloadTeamImages = () => {
  useEffect(() => {
    if ("requestIdleCallback" in window) {
      requestIdleCallback(() => preloadImages());
    } else {
      setTimeout(() => preloadImages(), 1000); // fallback for older browsers
    }

    function preloadImages() {
      teamData.forEach((member, index) => {
        setTimeout(() => {
          const img = new Image();
          img.src = member.photo;
        }, index * 100); // stagger requests
      });
    }
  }, []);

  return null;
};

export default PreloadTeamImages;