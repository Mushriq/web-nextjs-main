import { Menu } from "@/types/menu";

const squareIcon = (

  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="fill-current">
  <path d="M7.24 2H5.34C3.15 2 2 3.15 2 5.33V7.23C2 9.41 3.15 10.56 5.33 10.56H7.23C9.41 10.56 10.56 9.41 10.56 7.23V5.33C10.57 3.15 9.42 2 7.24 2Z" id="element_d6980de9"></path>
  <path opacity="0.2" d="M18.6695 2H16.7695C14.5895 2 13.4395 3.15 13.4395 5.33V7.23C13.4395 9.41 14.5895 10.56 16.7695 10.56H18.6695C20.8495 10.56 21.9995 9.41 21.9995 7.23V5.33C21.9995 3.15 20.8495 2 18.6695 2Z"  id="element_fbdc2069"></path>
  <path opacity="0.8" d="M18.6695 13.4302H16.7695C14.5895 13.4302 13.4395 14.5802 13.4395 16.7602V18.6602C13.4395 20.8402 14.5895 21.9902 16.7695 21.9902H18.6695C20.8495 21.9902 21.9995 20.8402 21.9995 18.6602V16.7602C21.9995 14.5802 20.8495 13.4302 18.6695 13.4302Z" id="element_793410d1"></path>
  <path opacity="0.5" d="M7.24 13.4302H5.34C3.15 13.4302 2 14.5802 2 16.7602V18.6602C2 20.8502 3.15 22.0002 5.33 22.0002H7.23C9.41 22.0002 10.56 20.8502 10.56 18.6702V16.7702C10.57 14.5802 9.42 13.4302 7.24 13.4302Z" id="element_0f0f4e02"></path>
  </svg>

);


const githubIcon = (

  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
  <path 
  d="M12 2.24902C6.51613 2.24902 2 6.70064 2 12.249C2 16.6361 4.87097 20.3781 8.87097 21.7329C9.3871 21.8297 9.54839 21.5071 9.54839 21.2813C9.54839 21.0555 9.54839 20.4103 9.51613 19.5393C6.74194 20.1845 6.16129 18.1845 6.16129 18.1845C5.70968 17.0555 5.03226 16.7329 5.03226 16.7329C4.12903 16.0877 5.06452 16.0877 5.06452 16.0877C6.06452 16.12 6.6129 17.12 6.6129 17.12C7.48387 18.6684 8.96774 18.2168 9.51613 17.9264C9.6129 17.2813 9.87097 16.8297 10.1613 16.5716C7.96774 16.3458 5.6129 15.4748 5.6129 11.6684C5.6129 10.5716 6.03226 9.70064 6.64516 9.02322C6.54839 8.79741 6.19355 7.76515 6.74194 6.37806C6.74194 6.37806 7.6129 6.11999 9.51613 7.41031C10.3226 7.18451 11.1613 7.05548 12.0323 7.05548C12.9032 7.05548 13.7742 7.15225 14.5484 7.41031C16.4516 6.15225 17.2903 6.37806 17.2903 6.37806C17.8387 7.73289 17.5161 8.79741 17.3871 9.02322C18.0323 9.70064 18.4194 10.6039 18.4194 11.6684C18.4194 15.4748 16.0645 16.3458 13.871 16.5716C14.2258 16.8942 14.5484 17.5393 14.5484 18.4426C14.5484 19.7974 14.5161 20.8619 14.5161 21.1845C14.5161 21.4426 14.7097 21.7329 15.1935 21.6361C19.129 20.3135 22 16.6039 22 12.1845C21.9677 6.70064 17.4839 2.24902 12 2.24902Z"
  fill="currentColor"
  />
  </svg>

);

const menuData: Menu[] = [
  {
    id: 1,
    title: "Team",
    path: "/team",
    newTab: false,
  },
  {
    id: 2,
    title: "Platform",
    path: "/platform",
    newTab: false,
  },
  {
    id: 3,
    title: "Research",
    newTab: false,
    submenu: [
      {
        id: 31,
        icon: squareIcon,
        title: "Rapid ex vivo high-content screens",
        path: "/research/biosensor",
        paragraph: "A label-free imaging platform with AI for rapid primary cancer screening",
        newTab: false,
      },
    ],
  },
  {
    id: 4,
    title: "Programs",
    newTab: false,
    submenu: [
      {
        id: 41,
        icon: squareIcon,
        title: "START",
        path: "/education",
        paragraph: "Cancer data science on-ramp",
        newTab: false,
      },
      {
        id: 42,
        icon: squareIcon,
        title: "HITS",
        path: "/hits",
        paragraph: "Roundtable discussion series",
        newTab: false,
      },
      {
        id: 43,
        icon: squareIcon,
        title: "CReDS",
        path: "/funding",
        paragraph: "Funding dataset generation",
        newTab: false,
      },
    ],
  },
  {
    id: 5,
    title: "News",
    path: "/blog",
    newTab: false,
  },
  {
    id: 6,
    title: "Protocols",
    path: "/about",
    newTab: false,
  },
  {
    id: 7,
    title: "Contact",
    path: "/contact",
    newTab: false,
  },
  {
    id: 98,
    title: "Github",
    icon: githubIcon,
    path: "https://github.com/Mushriq",
    newTab: false,
  },
  {
    id: 99,
    title: "Data Portal",
    path: "/portal",
    newTab: false,
  }
];
export default menuData;
