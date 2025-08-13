"use client"
import React , { useEffect, useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import AboutBiosensorTeam from './AboutTeam';
import ReportSummaryCard from './reportSummaryCard'


import axios from 'axios';
import { Select, Option } from "@material-tailwind/react";
import Image from 'next/image'
import Link from "next/link";

import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";


const mapIcon = (<svg width="25" height="25" viewBox="0 0 25 25" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path  d="M12.5035 6.47485C10.3854 6.47485 8.66846 8.19184 8.66846 10.3099C8.66846 12.4279 10.3854 14.1449 12.5035 14.1449C14.6215 14.1449 16.3385 12.4279 16.3385 10.3099C16.3385 8.19184 14.6215 6.47485 12.5035 6.47485ZM10.1685 10.3099C10.1685 9.02027 11.2139 7.97485 12.5035 7.97485C13.793 7.97485 14.8385 9.02027 14.8385 10.3099C14.8385 11.5994 13.793 12.6449 12.5035 12.6449C11.2139 12.6449 10.1685 11.5994 10.1685 10.3099Z"/>
  <path  d="M12.5033 2.83984C8.3766 2.83984 5.03125 6.1852 5.03125 10.3119C5.03125 13.1162 6.1028 15.6692 7.37569 17.7181C8.65084 19.7706 10.1581 21.3657 11.1026 22.2692C11.9045 23.0362 13.139 23.0348 13.9389 22.2653C14.8791 21.3609 16.3778 19.7657 17.6454 17.7137C18.9108 15.6653 19.9754 13.1139 19.9754 10.3119C19.9754 6.1852 16.63 2.83984 12.5033 2.83984ZM6.53125 10.3119C6.53125 7.01362 9.20503 4.33984 12.5033 4.33984C15.8016 4.33984 18.4754 7.01362 18.4754 10.3119C18.4754 12.7374 17.5503 15.0136 16.3692 16.9254C15.1904 18.8336 13.7859 20.3311 12.899 21.1843C12.6788 21.3961 12.3604 21.3966 12.1395 21.1852C11.2483 20.3328 9.83565 18.8352 8.64982 16.9265C7.46175 15.0142 6.53125 12.7375 6.53125 10.3119Z"/>
  </svg>
  );

const boxIcon = (<svg width="24" height="25" viewBox="0 0 24 25" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d="M5.91623 4.96229C6.31475 4.25385 7.0644 3.81543 7.87725 3.81543H16.1228C16.9356 3.81543 17.6852 4.25385 18.0838 4.96229L20.461 9.18826C20.6505 9.52506 20.75 9.90497 20.75 10.2914V19.0646C20.75 20.3072 19.7426 21.3146 18.5 21.3146H5.5C4.25736 21.3146 3.25 20.3072 3.25 19.0646V10.2914C3.25 9.90497 3.34952 9.52506 3.53898 9.18826L5.91623 4.96229ZM11.25 9.14853V5.31543H7.87725C7.6063 5.31543 7.35641 5.46157 7.22357 5.69772L5.28238 9.14853H11.25ZM4.75 10.6485V19.0646C4.75 19.4788 5.08579 19.8146 5.5 19.8146H18.5C18.9142 19.8146 19.25 19.4788 19.25 19.0646V10.6485H4.75ZM18.7176 9.14853L16.7764 5.69772C16.6436 5.46157 16.3937 5.31543 16.1228 5.31543H12.75V9.14853H18.7176Z"/>
  </svg>
  );





const AxiosGetRequest = () => {

  const [barcodeData, setBarcodeData] = useState([]);
  const [selectedSample, setSelectedSample] = useState(null);
  const [cellPic, setCellPic] = useState(null);
  const [plot1, setPlot1] = useState(null);
  const [plot2, setPlot2] = useState(null);
  const [plot3, setPlot3] = useState(null);
  const [plot4, setPlot4] = useState(null);
  const [plot5, setPlot5] = useState(null);
  const [plot6, setPlot6] = useState(null);

  const cellPic_title = "Sample Image";
  const cellPic_subtitle = "Representative image taken on first day of imaging";
  

  const plot1_title = "Cell Seeding Histogram";
  const plot1_subtitle = "Distribution at start of experiment. Wells with cells fewer than 3 standard deviations away from the mean are excluded.";
  const plot2_title = "Plate Cell Count Heatmap";
  const plot2_subtitle = "Each panel is a timepoint. X marks any excluded wells. Plate edges are excluded automatically.";
  const plot3_title = "Fluorescence-based Count of Cell Types over Time";
  const plot3_subtitle = "Each panel is a compound. Solid bars indicate viable cell counts. Shaded bars are non-viable cells.";
  const plot4_title = "Inference Correlation";
  const plot4_subtitle = "Correlation between label-free prediction and fluorescence-based annotation per well, per timepoint.";
  const plot5_title = "Log-fold Change over Time";
  const plot5_subtitle = "Each panel is a compound. Values are number of label-free inferred viable cancer cells relative to start of experiment.";
  const plot6_title = "Collapsed Log-fold Change";
  const plot6_subtitle = "Summary of all drug killing curves using label-free inference.";

  const table1_title = "Compound Activity";
  const table1_subtitle = "Log2-fold change in the number of viable cancer cells from start of the experiment.";
  const table1_subsubtitle = "Showing the final timepoint. Numbers in parentheses are number of detected or inferred viable cancer cells. LogFC calculation adds a pseudocount of 1 cell. Active compounds are those with label-free inferred log-fold killing activity of over 1.";
  
  const TABLE_HEAD = ["Status", "Timepoint", "Compound", "Mechanism", "LogFC Labelled", "LogFC Unlabelled"];
  const [TABLE_ROWS, setTABLE_ROWS] = useState([]);

  const static_url = "https://hts-biosensor-plumber-353269782212.us-central1.run.app";

  // For Printing
  const componentRef = React.useRef(null);

  const reactToPrintContent = () => {
    return componentRef.current;
  };

  const handleAfterPrint = React.useCallback(() => {
   //  componentRef.current.className = "grid grid-cols-12 gap-6";
    // return Promise.resolve();
  }, []);

  const handleBeforePrint = React.useCallback(() => {
    // componentRef.current.className = "grid grid-cols-12 gap-2";
    return Promise.resolve();
  }, []);

  const handlePrint = useReactToPrint({
    documentTitle: `Biosensor Report - ${selectedSample?.imaging_barcode}`,
    onBeforePrint: handleBeforePrint,
    onAfterPrint: handleAfterPrint,
    onPrintError: handleAfterPrint
  });



  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  useEffect( () => {

    const url =  `${static_url}/list`;

    const fetchData = async () => {

      setLoading(true);

      try {

        const response = await axios.get(url);
        const result = JSON.parse(response.data);
        setBarcodeData(result);
        setSelectedSample(barcodeData[0]);


      } catch (err) {

        setError(err);

      } finally {

        setLoading(false);

      }



    };

    /*
    axios.get(url)
      .then(response => {
        const result = JSON.parse(response.data);
        setBarcodeData(result);
        setSelectedSample(barcodeData[0]);
        // console.error("Response:", result.length);
      })
      .catch(error => {
        // console.error("Error:", error);
      });
      */

      fetchData();

  }, []);

  if (loading){

    return(


        <div className="flex flex-row items-center justify-center">
          <div className="grid min-h-[140px] w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible">
            <svg className="w-6 h-6 md:w-8 md:h-8 text-gray-300 animate-spin" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"
             >
              <path
          d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
          stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"></path>
              <path
          d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
          stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
              </path>
            </svg>
          </div>
          <div className="w-full min-w-[200px] ml-2 text-lg">Loading ... This may take up to 5 mins</div>
        </div>

    );

  }

  if (error){

    return <div>Error: {error.message}</div> ;

  }



  const handleUserChange = (value) => {
    const selectedBarcodeId = value;
    // console.error("err se: " , selectedBarcodeId);
    const selected = barcodeData.find(barcode => barcode.imaging_barcode === selectedBarcodeId);
    setSelectedSample(selected)

    // Get new logfc table data
    setTABLE_ROWS(null);
    const logfc_url = `${static_url}/logfctable`;
    axios.get(logfc_url, { params: { id: selected.imaging_barcode, cutoff: 1 } })
      .then(response => {
        const result = JSON.parse(response.data);
        setTABLE_ROWS(result);
        // console.error("Response:", result.length);
      })
      .catch(error => {
        // console.error("Error:", error);
      });

    // Get new sample image
    setCellPic(null);
    
    const cellPic_url = `${static_url}/cellpic`;
    axios.get(cellPic_url, {responseType: 'blob', params: { id: selected.imaging_barcode}})
      .then(response => {
        const plot_data = URL.createObjectURL(response.data);
        setCellPic(plot_data);
      })
      .catch(error => {
        // console.error("Error:", error);
        setCellPic(null);
      });

    // Get new plot 1
    setPlot1(null);
    
    const plot1_url = `${static_url}/plot1`;
    axios.get(plot1_url, {responseType: 'blob', params: { id: selected.imaging_barcode}})
      .then(response => {
        const plot_data = URL.createObjectURL(response.data);
        setPlot1(plot_data);
      })
      .catch(error => {
        // console.error("Error:", error);
        setPlot1(null);
      });

    // Get new plot 2
    setPlot2(null);
    const plot2_url = `${static_url}/plot2`;
    axios.get(plot2_url, {responseType: 'blob', params: { id: selected.imaging_barcode}})
      .then(response => {
        const plot_data = URL.createObjectURL(response.data);
        setPlot2(plot_data);
      })
      .catch(error => {
        // console.error("Error:", error);
        setPlot2(null);
      });

    // Get new plot 3
    setPlot3(null);
    const plot3_url = `${static_url}/plot3`;
    axios.get(plot3_url, {responseType: 'blob', params: { id: selected.imaging_barcode}})
      .then(response => {
        const plot_data = URL.createObjectURL(response.data);
        setPlot3(plot_data);
      })
      .catch(error => {
        // console.error("Error:", error);
        setPlot3(null);
      });

    // Get new plot 4
    setPlot4(null);
    const plot4_url = `${static_url}/plot4`;
    axios.get(plot4_url, {responseType: 'blob', params: { id: selected.imaging_barcode}})
      .then(response => {
        const plot_data = URL.createObjectURL(response.data);
        setPlot4(plot_data);
      })
      .catch(error => {
        // console.error("Error:", error);
        setPlot4(null);
      });

    // Get new plot 5
    setPlot5(null);
    const plot5_url = `${static_url}/plot5`;
    axios.get(plot5_url, {responseType: 'blob', params: { id: selected.imaging_barcode}})
      .then(response => {
        const plot_data = URL.createObjectURL(response.data);
        setPlot5(plot_data);
      })
      .catch(error => {
        // console.error("Error:", error);
        setPlot5(null);
      });

    // Get new plot 6
    setPlot6(null);
    const plot6_url = `${static_url}/plot6`;
    axios.get(plot6_url, {responseType: 'blob', params: { id: selected.imaging_barcode}})
      .then(response => {
        const plot_data = URL.createObjectURL(response.data);
        setPlot6(plot_data);
      })
      .catch(error => {
        // console.error("Error:", error);
        setPlot6(null);
      });

  };

  return(
      <>

    <div className = "py-4">
    <div className="mb-8 md:mb-8 flex items-center justify-start gap-1 md:gap-4">
          <Tooltip placement="top"       
                className="border border-blue-gray-50 bg-white px-4 py-3 shadow-xl shadow-black/10"
                content={
              <div className="w-80">
                <Typography color="blue-gray" className="font-medium">
                  Coming Soon!
                </Typography>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal opacity-80"
                >
                  This button will let you download a spreadsheet of all experiments in the project.
                </Typography>
              </div>

            }>
         <Button size = "sm" variant = "outlined" className={`bg-white text-black dark:bg-white dark:text-black 
                                 
                                    `}
                                    name="print" 
             >
              <div className="flex flex-nowrap">

              <svg width="25" height="24" viewBox="0 0 25 24" fill="fill-black dark:fill-black" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.4239 16.75C12.2079 16.75 12.0132 16.6587 11.8763 16.5126L7.26675 11.9059C6.97376 11.6131 6.97361 11.1382 7.26641 10.8452C7.55921 10.5523 8.03408 10.5521 8.32707 10.8449L11.6739 14.1896L11.6739 4C11.6739 3.58579 12.0096 3.25 12.4239 3.25C12.8381 3.25 13.1739 3.58579 13.1739 4L13.1739 14.1854L16.5168 10.8449C16.8098 10.5521 17.2846 10.5523 17.5774 10.8453C17.8702 11.1383 17.87 11.6131 17.5771 11.9059L13.0021 16.4776C12.8646 16.644 12.6566 16.75 12.4239 16.75Z" fill="#323544"/>
              <path d="M5.17188 16C5.17188 15.5858 4.83609 15.25 4.42188 15.25C4.00766 15.25 3.67188 15.5858 3.67188 16V18.5C3.67188 19.7426 4.67923 20.75 5.92188 20.75H18.9227C20.1654 20.75 21.1727 19.7426 21.1727 18.5V16C21.1727 15.5858 20.837 15.25 20.4227 15.25C20.0085 15.25 19.6727 15.5858 19.6727 16V18.5C19.6727 18.9142 19.337 19.25 18.9227 19.25H5.92188C5.50766 19.25 5.17188 18.9142 5.17188 18.5V16Z" fill="#323544"/>
              </svg>
                <div className="block py-1 px-2">Download All</div>

              </div>

          </Button>
          </Tooltip>
      </div>
    <div className="mb-0 md:mb-8 flex items-center justify-start gap-1 md:gap-4">

          <div className="w-full md:w-72">
            <Select label="Select Experiment"
                onChange = {handleUserChange} >
                  {  barcodeData.map(barcode => (
                  <Option className="w-full" key = {barcode.imaging_barcode}  
                          value = {barcode.imaging_barcode}>
                            <div className="flex flex-row">
                            <img  className={`h-5 w-5 rounded-full ${barcode.qc_technical === "Pass" && barcode.qc_tumorcontent === "Pass" ? "opacity-[1.0]" : "opacity-[0.0]"} `} src="/images/bits/check-circle-1.svg" alt="set"/>
                            <span className="in-line block px-3">{barcode.imaging_barcode}</span>
                            </div>
                            </Option> 


                  ) )
                  
                  }
                </Select>
          </div>
     
          <Button size = "sm" className={`bg-black text-white dark:bg-white dark:text-black 
                                  ${plot1 === null
                                            ? "hidden"
                                            : "block"
                                        }
                                    `}
                                    name="print" 
            onClick={() => handlePrint(reactToPrintContent)} >
              <div className="flex flex-nowrap">

                  <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path className="fill-white dark:fill-black" d="M18.1549 7.79099V6.6226C18.1549 6.01369 17.9081 5.43079 17.4709 5.007L16.3137 3.88538C15.894 3.4785 15.3323 3.25098 14.7477 3.25098H8.09473C6.85208 3.25098 5.84473 4.25834 5.84473 5.50098V7.79099H5.5C4.25736 7.79099 3.25 8.79836 3.25 10.041V13.9595C3.25 15.2021 4.25736 16.2095 5.5 16.2095H5.84375V18.5C5.84375 19.7426 6.85111 20.75 8.09375 20.75H15.9039C17.1465 20.75 18.1539 19.7426 18.1539 18.5V16.2095H18.4991C19.7417 16.2095 20.7491 15.2021 20.7491 13.9595V10.041C20.7491 8.79835 19.7417 7.79099 18.4991 7.79099H18.1549ZM8.09473 4.75098H14.7477C14.9426 4.75098 15.1298 4.82682 15.2697 4.96244L16.4269 6.08406C16.5726 6.22533 16.6549 6.41963 16.6549 6.6226V7.79099H7.34473V5.50098C7.34473 5.08676 7.68051 4.75098 8.09473 4.75098ZM5.84375 13.9463V14.7095H5.5C5.08579 14.7095 4.75 14.3737 4.75 13.9595V10.041C4.75 9.62678 5.08579 9.29099 5.5 9.29099H18.4991C18.9133 9.29099 19.2491 9.62678 19.2491 10.041V13.9595C19.2491 14.3737 18.9133 14.7095 18.4991 14.7095H18.1539V13.9463C18.1539 13.5321 17.8181 13.1963 17.4039 13.1963H6.59375C6.17954 13.1963 5.84375 13.5321 5.84375 13.9463ZM7.34375 14.6963H16.6539V18.5C16.6539 18.9142 16.3181 19.25 15.9039 19.25H8.09375C7.67954 19.25 7.34375 18.9142 7.34375 18.5V14.6963Z"/>
                  </svg>
                <div className="hidden md:block py-1 px-2">Print Report</div>

              </div>

          </Button>

            <a target="_blank" rel="noreferrer" href={`/portal/biosensor/report/${selectedSample?.imaging_barcode}`}>
            <Button size = "sm" className={`bg-black text-white dark:bg-white dark:text-black 
                                    ${plot1 === null
                                              ? "hidden"
                                              : "block"
                                          }
                                      `}
                                      name="direct_link" >
                <div className="flex flex-nowrap">

                <svg width="24" height="24" viewBox="0 0 25 25" xmlns="http://www.w3.org/2000/svg">
                  <path className="fill-white dark:fill-black" d="M18.1022 14.0998C17.2236 14.9785 15.7989 14.9785 14.9203 14.0998L13.5581 12.7377L12.4971 13.7987L13.8593 15.1608C14.738 16.0395 14.7379 17.4641 13.8593 18.3428L10.1198 22.0822C9.24115 22.9609 7.81652 22.9609 6.93785 22.0822L3.1551 18.2995C2.27642 17.4208 2.27642 15.9962 3.1551 15.1175L6.89455 11.378C7.77323 10.4994 9.19785 10.4994 10.0765 11.378L11.4365 12.738L12.4975 11.677L11.1376 10.3171C10.2589 9.4384 10.2589 8.01378 11.1376 7.1351L14.8812 3.39143C15.7599 2.51275 17.1845 2.51275 18.0632 3.39143L21.8459 7.17415C22.7246 8.05283 22.7246 9.47745 21.8459 10.3561L18.1022 14.0998ZM10.3758 13.7987L9.01587 12.4387C8.72297 12.1458 8.2481 12.1458 7.95521 12.4387L4.21576 16.1782C3.92287 16.471 3.92287 16.9459 4.21576 17.2388L7.99851 21.0216C8.2914 21.3144 8.76627 21.3144 9.05917 21.0216L12.7986 17.2821C13.0915 16.9892 13.0915 16.5143 12.7986 16.2215L11.4365 14.8593L10.205 16.0907C9.91215 16.3836 9.43728 16.3836 9.14439 16.0907C8.85149 15.7979 8.85149 15.323 9.14439 15.0301L10.3758 13.7987ZM15.9809 13.0391C16.2738 13.332 16.7487 13.332 17.0416 13.0391L20.7853 9.29547C21.0781 9.00257 21.0781 8.5277 20.7853 8.23481L17.0025 4.45209C16.7096 4.1592 16.2348 4.1592 15.9419 4.45209L12.1982 8.19576C11.9053 8.48865 11.9053 8.96352 12.1982 9.25642L13.5581 10.6163L14.8012 9.37323C15.0941 9.08034 15.569 9.08034 15.8619 9.37323C16.1548 9.66612 16.1548 10.141 15.8619 10.4339L14.6188 11.677L15.9809 13.0391Z" />
                  </svg>

                  <div className="hidden md:block py-1 px-2">Direct Link</div>

                </div>

            </Button>
              </a>
    </div>
      

   {/*   <div  className={` ${plot1 === null
                                ? "hidden"
                                : "block"
                            }
                        `}
        dangerouslySetInnerHTML={{ __html:  plot1}} /> */}
  



















  {/* sample report */}
  <main className="grow">
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
      
    <div ref={componentRef} className="grid grid-cols-12 gap-4">


{/* Sample Summary */}
<ReportSummaryCard selectedSample={selectedSample} cellPic={cellPic} />

           

            {/* Plot 1 */}
            <div className={`flex flex-col figure-animation-appear col-span-full lg:col-span-4 lg:row-start-2 lg:row-span-1 bg-white shadow-md rounded-xl ${plot6 === null
                          ? "hidden"
                          : "block"
                      }
                  `}>
                                    <div className="px-5 pt-5">
                                      <header className="flex justify-between items-start mb-2">
                                      <div className="text-lg font-semibold text-gray-800">{plot1_title}</div>

                                      {/* QC call placeholder */}
                                        <div className={`text-md font-medium px-1.5 rounded-full
                                          ${selectedSample?.qc_technical === "Pass" ? "text-green-700 bg-green-500/20" : selectedSample?.qc_technical === "Fail" ? "text-red-700 bg-red-500/20 " : "text-blue-700 bg-blue-500/20 "}`}>{selectedSample?.qc_technical === "Pass" ? "Pass" : selectedSample?.qc_technical === "Fail" ? "Fail" : "Pending"}</div>
                                      </header>
                                      <div className="text-xs font-semibold text-gray-400 mb-1">{plot1_subtitle}</div>
                                    </div>
                                    <div className="grow max-h-[450px] flex justify-center">
                                          <img className="py-4 px-4" width={2362} height={2362} src={plot1} />
                                    </div>
            </div>

            {/* Plot 2 */}
            <div  className={`flex flex-col figure-animation-appear col-span-full lg:row-start-2 lg:col-span-8 bg-white shadow-md rounded-xl ${plot2 === null
                                      ? "hidden"
                                      : "block"
                                  }
                              `}>
                                    <div className="px-5 pt-5">
                                      <header className="flex justify-between items-start mb-2">
                                      <div className="text-lg font-semibold text-gray-800">{plot2_title}</div>

                                      {/* QC call placeholder */}
                                        <div className={`text-md font-medium px-1.5 rounded-full
                                          ${selectedSample?.qc_technical === "Pass" ? "text-green-700 bg-green-500/20" : selectedSample?.qc_technical === "Fail" ? "text-red-700 bg-red-500/20 " : "text-blue-700 bg-blue-500/20 "}`}>{selectedSample?.qc_technical === "Pass" ? "Pass" : selectedSample?.qc_technical === "Fail" ? "Fail" : "Pending"}</div>
                                      </header>
                                      <div className="text-xs font-semibold text-gray-400 mb-1">{plot2_subtitle}</div>
                                    </div>
                                    <div className="grow max-h-[450px] flex justify-center">
                                      <img className="py-4 px-4" width={4133} height={2362} src={plot2} />
                                    </div>
            </div>
            {/* Plot 3 */}
            <div className={`flex flex-col figure-animation-appear col-span-full lg:row-start-3 lg:col-span-full bg-white shadow-md rounded-xl ${plot3 === null
                          ? "hidden"
                          : "block"
                      }
                  `}>
                        <div className="px-5 pt-5">
                          <header className="flex justify-between items-start mb-2">
                          <div className="text-lg font-semibold text-gray-800">{plot3_title}</div>

                          {/* QC call placeholder */}
                            <div className={`text-md font-medium px-1.5 rounded-full
                              ${selectedSample?.qc_tumorcontent === "Pass" ? "text-green-700 bg-green-500/20" : selectedSample?.qc_tumorcontent === "Fail" ? "text-red-700 bg-red-500/20 " : "text-blue-700 bg-blue-500/20 "}`}>{selectedSample?.qc_tumorcontent === "Pass" ? "Pass" : selectedSample?.qc_tumorcontent === "Fail" ? "Fail" : "Pending"}</div>
                          </header>
                          <div className="text-xs font-semibold text-gray-400 mb-1">{plot3_subtitle}</div>
                        </div>
                        <div className="grow max-h-[450px] flex justify-center">
                          <img className="py-4 px-4" width={9448} height={2362} src={plot3} />
                        </div>
            </div>
            {/* Plot 4 */}
            <div className={`flex flex-col figure-animation-appear col-span-full lg:col-span-4 lg:row-span-1 lg:row-start-4 bg-white shadow-md rounded-xl ${plot4 === null
                          ? "hidden"
                          : "block"
                      }
                  `}>
                        <div className="px-5 pt-5">
                          <header className="flex justify-between items-start mb-2">
                          <div className="text-lg font-semibold text-gray-800">{plot4_title}</div>

                          {/* QC call placeholder */}
                            <div className={`text-md font-medium px-1.5 rounded-full
                              ${selectedSample?.qc_tumorcontent === "Pass" ? "text-green-700 bg-green-500/20" : selectedSample?.qc_tumorcontent === "Fail" ? "text-red-700 bg-red-500/20 " : "text-blue-700 bg-blue-500/20 "}`}>{selectedSample?.qc_tumorcontent === "Pass" ? "Pass" : selectedSample?.qc_tumorcontent === "Fail" ? "Fail" : "Pending"}</div>
                          </header>
                          <div className="text-xs font-semibold text-gray-400 mb-1">{plot4_subtitle}</div>
                        </div>
                        <div className="grow aspect-[2/1] flex justify-center">
                          <img className="py-4 px-4" width={4133} height={2362} src={plot4} />
                        </div>
            </div>
                       {/* Plot 5 */}
           <div className={`flex flex-col figure-animation-appear col-span-full lg:col-span-8 lg:col-start-1 lg:row-span-2 lg:row-start-4 bg-white shadow-md rounded-xl ${plot5 === null
                          ? "hidden"
                          : "block"
                      }
                  `}>
                        <div className="px-5 pt-5">
                          <header className="flex justify-between items-start mb-2">
                          <div className="text-lg font-semibold text-gray-800">{plot5_title}</div>

                          {/* QC call placeholder */}
                            <div className={`text-md font-medium px-1.5 rounded-full
                              ${selectedSample?.qc_tumorcontent === "Pass" ? "text-green-700 bg-green-500/20" : selectedSample?.qc_tumorcontent === "Fail" ? "text-red-700 bg-red-500/20 " : "text-blue-700 bg-blue-500/20 "}`}>{selectedSample?.qc_tumorcontent === "Pass" ? "Pass" : selectedSample?.qc_tumorcontent === "Fail" ? "Fail" : "Pending"}</div>
                          </header>
                          <div className="text-xs font-semibold text-gray-400 mb-1">{plot5_subtitle}</div>
                        </div>
                        <div className="grow aspect-[1/1] flex justify-center">
                          <img className="py-4 px-4" width={3543} height={3543} src={plot5} />
                        </div>
            </div>
           {/* Plot 6 */}
           <div className={`flex flex-col figure-animation-appear col-span-full lg:col-span-4 lg:row-start-5 lg:row-span-1 bg-white shadow-md rounded-xl ${plot6 === null
                          ? "hidden"
                          : "block"
                      }
                  `}>
                        <div className="px-5 pt-5">
                          <header className="flex justify-between items-start mb-2">
                          <div className="text-lg font-semibold text-gray-800">{plot6_title}</div>

                          {/* QC call placeholder */}
                            <div className={`text-md font-medium px-1.5 rounded-full
                              ${selectedSample?.qc_tumorcontent === "Pass" ? "text-green-700 bg-green-500/20" : selectedSample?.qc_tumorcontent === "Fail" ? "text-red-700 bg-red-500/20 " : "text-blue-700 bg-blue-500/20 "}`}>{selectedSample?.qc_tumorcontent === "Pass" ? "Pass" : selectedSample?.qc_tumorcontent === "Fail" ? "Fail" : "Pending"}</div>
                          </header>
                          <div className="text-xs font-semibold text-gray-400 mb-1">{plot6_subtitle}</div>
                        </div>
                        <div className="grow aspect-[1/1] flex justify-center">
                          <img className="py-4 px-4" width={2362} height={2362} src={plot6} />
                        </div>
            </div>


     {/* TABLE  see https://blog.logrocket.com/creating-react-sortable-table/ for sorting */}


<div className={`flex flex-col figure-animation-appear col-span-full lg:col-span-full lg:row-start-6 bg-white shadow-md rounded-xl ${plot6 === null
                          ? "hidden"
                          : "block"
                      }
                  `}>

     <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mt-2 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              {table1_title}
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              {table1_subtitle}
            </Typography>
            <Typography color="gray" className="mt-0 text-xs">
              {table1_subsubtitle}
            </Typography>
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="mt-2 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={head}
                  className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                  >
                    {head}{" "}
                    {index !== TABLE_HEAD.length + 1 && (
                      <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                    )}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS?.map(
              ({ timepoint, 
                name,
                moa,
                dose_u_m,
                logfc_labelled,
                logfc_unlabelled,
                n_tumor_alive_labelled,
                n_tumor_alive_unlabelled,
                start_alive_labelled,
                start_alive_unlabelled,
                status }, index) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";
 
                return (
                  <tr key={index}>
                     <td className={classes}>
                      <div className="w-max">
                        <Chip
                          variant="ghost"
                          size="sm"
                          value={status}
                          color={status === "active" ? "green" : status === "reference" ? "blue" : "blue-gray"}
                        />
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {timepoint} hr
                      </Typography>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {name}
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {dose_u_m ? dose_u_m : ""}{dose_u_m ? " uM" : ""}
                        </Typography>
                      </div>
                    </td>

                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {moa}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {logfc_labelled}
                        </Typography>
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {"("}{start_alive_labelled}{" to "}{n_tumor_alive_labelled}{")"}
                          </Typography>
                        </div>
                    </td>
                    <td className={classes}>
                    <div className="flex flex-col">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {logfc_unlabelled}
                      </Typography>
                      <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {"("}{start_alive_unlabelled}{" to "}{n_tumor_alive_unlabelled}{")"}
                          </Typography>
                      </div>
                    </td>
                  </tr>
                );
              },
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
            <div></div>
      </CardFooter>
    </Card>

</div>


























      </div>

                      

                              
    </div>
  </main>
 






















 {/* printable report */}
 <main className="grow printContent">
    <div ref={componentRef} className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto z-0">
        <div className="grid grid-cols-12 gap-2 mb-2 items-center">
                                      <div className="col-span-9 text-lg font-semibold text-gray-800">Experiment: {selectedSample?.imaging_barcode}</div>
                                      <div className="col-span-3 justify-self-end text-lg font-semibold text-gray-800"><img
                                            src="/images/projects/biosensor/ascitespredict-logo.png"
                                            alt="AscitesPredict"
                                            width={200}
                                            height={48}
                                            className="block w-[200px] z-50"
                                          /></div>                                      

         </div>


    <div className="grid grid-cols-12 gap-4">

{/* Sample Summary */}
<ReportSummaryCard selectedSample={selectedSample} cellPic={cellPic} print={true} />

<div className="flex col-span-full justify-between mb-2">
                                      <div className="text-lg font-semibold text-gray-800">Experiment: {selectedSample?.imaging_barcode}</div>

</div>
           
           {/* Plot 1 */}
           <div  className={`mt-2 flex flex-col max-h-[400px] col-span-4 bg-white shadow-md rounded-xl ${plot1 === null
                                      ? "hidden"
                                      : "block"
                                  }
                              `}>
                                    <div className="px-5 pt-5">
                                      <header className="flex justify-between items-start mb-2">
                                      <div className="text-lg font-semibold text-gray-800">{plot1_title}</div>

                                      {/* QC call placeholder */}
                                        <div className={`text-md font-medium px-1.5 rounded-full
                                          ${selectedSample?.qc_technical === "Pass" ? "text-green-700 bg-green-500/20" : selectedSample?.qc_technical === "Fail" ? "text-red-700 bg-red-500/20 " : "text-blue-700 bg-blue-500/20 "}`}>{selectedSample?.qc_technical === "Pass" ? "Pass" : selectedSample?.qc_technical === "Fail" ? "Fail" : "Pending"}</div>
                                      </header>
                                      <div className="text-[8px] font-semibold text-gray-400 mb-1">{plot1_subtitle}</div>
                                    </div>
                                    <div className="grow max-h-[180px] flex justify-center">
                                          <img className="py-2 px-4" width={2362} height={2362} src={plot1} />
                                    </div>
            </div>

            {/* Plot 2 */}
            <div  className={`mt-2 flex flex-col max-h-[400px] col-span-8 bg-white shadow-md rounded-xl ${plot2 === null
                                      ? "hidden"
                                      : "block"
                                  }
                              `}>
                                    <div className="px-5 pt-5">
                                      <header className="flex justify-between items-start mb-2">
                                      <div className="text-lg font-semibold text-gray-800">{plot2_title}</div>

                                      {/* QC call placeholder */}
                                        <div className={`text-md font-medium px-1.5 rounded-full
                                          ${selectedSample?.qc_technical === "Pass" ? "text-green-700 bg-green-500/20" : selectedSample?.qc_technical === "Fail" ? "text-red-700 bg-red-500/20 " : "text-blue-700 bg-blue-500/20 "}`}>{selectedSample?.qc_technical === "Pass" ? "Pass" : selectedSample?.qc_technical === "Fail" ? "Fail" : "Pending"}</div>
                                      </header>
                                      <div className="text-[8px] font-semibold text-gray-400 mb-1">{plot2_subtitle}</div>
                                    </div>
                                    <div className="grow max-h-[280px] flex justify-center">
                                      <img className="py-2 px-4" width={350} height={200} src={plot2} />
                                    </div>
            </div>
            {/* Plot 3 */}
            <div className={`flex flex-col col-span-full max-h-[400px] bg-white shadow-md rounded-xl ${plot3 === null
                          ? "hidden"
                          : "block"
                      }
                  `}>
                        <div className="px-5 pt-5">
                          <header className="flex justify-between items-start mb-2">
                          <div className="text-lg font-semibold text-gray-800">{plot3_title}</div>

                          {/* QC call placeholder */}
                            <div className={`text-md font-medium px-1.5 rounded-full
                              ${selectedSample?.qc_tumorcontent === "Pass" ? "text-green-700 bg-green-500/20" : selectedSample?.qc_tumorcontent === "Fail" ? "text-red-700 bg-red-500/20 " : "text-blue-700 bg-blue-500/20 "}`}>{selectedSample?.qc_tumorcontent === "Pass" ? "Pass" : selectedSample?.qc_tumorcontent === "Fail" ? "Fail" : "Pending"}</div>
                          </header>
                          <div className="text-[8px] font-semibold text-gray-400 mb-1">{plot3_subtitle}</div>
                        </div>
                        <div className="grow max-h-[450px] flex justify-center">
                          <img className="py-2 px-4" width={9448} height={2362} src={plot3} />
                        </div>
            </div>
            {/* Plot 4 */}
            <div className={`flex flex-col col-span-4 max-h-[400px] bg-white shadow-md rounded-xl ${plot4 === null
                          ? "hidden"
                          : "block"
                      }
                  `}>
                        <div className="px-5 pt-5">
                          <header className="flex justify-between items-start mb-2">
                          <div className="text-lg font-semibold text-gray-800">{plot4_title}</div>

                          {/* QC call placeholder */}
                            <div className={`text-md font-medium px-1.5 rounded-full
                              ${selectedSample?.qc_tumorcontent === "Pass" ? "text-green-700 bg-green-500/20" : selectedSample?.qc_tumorcontent === "Fail" ? "text-red-700 bg-red-500/20 " : "text-blue-700 bg-blue-500/20 "}`}>{selectedSample?.qc_tumorcontent === "Pass" ? "Pass" : selectedSample?.qc_tumorcontent === "Fail" ? "Fail" : "Pending"}</div>
                          </header>
                          <div className="text-[8px] font-semibold text-gray-400 mb-1">{plot4_subtitle}</div>
                        </div>
                        <div className="grow max-h-[200px] aspect-[2/1] flex justify-center">
                          <img className="py-2 px-4" width={4133} height={2362} src={plot4} />
                        </div>
            </div>
           {/* Plot 5 */}
           <div className={`flex flex-col col-span-4 max-h-[400px] bg-white shadow-md rounded-xl ${plot5 === null
                          ? "hidden"
                          : "block"
                      }
                  `}>
                        <div className="px-5 pt-5">
                          <header className="flex justify-between items-start mb-2">
                          <div className="text-lg font-semibold text-gray-800">{plot5_title}</div>

                          {/* QC call placeholder */}
                            <div className={`text-md font-medium px-1.5 rounded-full
                              ${selectedSample?.qc_tumorcontent === "Pass" ? "text-green-700 bg-green-500/20" : selectedSample?.qc_tumorcontent === "Fail" ? "text-red-700 bg-red-500/20 " : "text-blue-700 bg-blue-500/20 "}`}>{selectedSample?.qc_tumorcontent === "Pass" ? "Pass" : selectedSample?.qc_tumorcontent === "Fail" ? "Fail" : "Pending"}</div>
                          </header>
                          <div className="text-[8px] font-semibold text-gray-400 mb-1">{plot5_subtitle}</div>
                        </div>
                        <div className="grow max-h-[200px] aspect-[1/1] flex justify-center">
                          <img className="py-2 px-4" width={3543} height={3543} src={plot5} />
                        </div>
            </div>

           {/* Plot 6 */}
           <div className={`flex flex-col col-span-4 max-h-[400px] bg-white shadow-md rounded-xl ${plot6 === null
                          ? "hidden"
                          : "block"
                      }
                  `}>
                        <div className="px-5 pt-5">
                          <header className="flex justify-between items-start mb-2">
                          <div className="text-lg font-semibold text-gray-800">{plot6_title}</div>

                          {/* QC call placeholder */}
                            <div className={`text-md font-medium px-1.5 rounded-full
                              ${selectedSample?.qc_tumorcontent === "Pass" ? "text-green-700 bg-green-500/20" : selectedSample?.qc_tumorcontent === "Fail" ? "text-red-700 bg-red-500/20 " : "text-blue-700 bg-blue-500/20 "}`}>{selectedSample?.qc_tumorcontent === "Pass" ? "Pass" : selectedSample?.qc_tumorcontent === "Fail" ? "Fail" : "Pending"}</div>
                          </header>
                          <div className="text-[8px] font-semibold text-gray-400 mb-1">{plot6_subtitle}</div>
                        </div>
                        <div className="grow max-h-[200px] aspect-[1/1] flex justify-center">
                          <img className="py-2 px-4" width={2362} height={2362} src={plot6} />
                        </div>
            </div>





                                {/* TABLE  see https://blog.logrocket.com/creating-react-sortable-table/ for sorting */}

<div className="mt-4 flex col-span-full justify-between mb-0">
                                      <div className="text-lg font-semibold text-gray-800">Experiment: {selectedSample?.imaging_barcode}</div>

</div>

<div className={`flex flex-col col-span-full bg-white shadow-md rounded-xl ${plot6 === null
                          ? "hidden"
                          : "block"
                      }
                  `}>

     <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mt-2 flex items-center justify-between gap-8">
          <div>
          <Typography variant="h5" color="blue-gray">
            {table1_title}
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
            {table1_subtitle}
            </Typography>
            <Typography color="gray" className="mt-0 text-xs">
            {table1_subsubtitle}
            </Typography>
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-visible px-2">
        <table className="mt-2 table-fixed width-[200px] text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={head}
                  className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS?.map(
              ({ timepoint, 
                name,
                moa,
                dose_u_m,
                logfc_labelled,
                logfc_unlabelled,
                n_tumor_alive_labelled,
                n_tumor_alive_unlabelled,
                start_alive_labelled,
                start_alive_unlabelled,
                status }, index) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";
 
                return (
                  <tr key={index}>
                   <td className={classes}>
                      <div className="w-max">
                        <Chip
                          variant="ghost"
                          size="sm"
                          value={status}
                          color={status === "active" ? "green" : status === "reference" ? "blue" : "blue-gray"}
                        />
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {timepoint} hr
                      </Typography>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {name}
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {dose_u_m ? dose_u_m : ""}{dose_u_m ? " uM" : ""}
                        </Typography>
                      </div>
                    </td>

                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {moa}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {logfc_labelled}
                        </Typography>
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {"("}{start_alive_labelled}{" to "}{n_tumor_alive_labelled}{")"}
                          </Typography>
                        </div>
                    </td>
                    <td className={classes}>
                    <div className="flex flex-col">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {logfc_unlabelled}
                      </Typography>
                      <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {"("}{start_alive_unlabelled}{" to "}{n_tumor_alive_unlabelled}{")"}
                          </Typography>
                      </div>
                    </td>
                  </tr>
                );
              },
            )}
          </tbody>
        </table>
        <div className=""></div>
      </CardBody>
      <CardFooter className="flex mb-64 items-center justify-between border-t border-blue-gray-50 p-4">
            <div></div>
      </CardFooter>
    </Card>

</div>




          <div className={`mt-8 flex flex-col items-center col-span-full bg-white shadow-md rounded-xl `}>
                <div className="flex flex-wrap justify-between">
                  <AboutBiosensorTeam />
                </div>
                
              <div className="flex flex-col items-center mb-12 max-w-[360px] lg:mb-16">
                <div className="text-lg font-semibold text-gray-800 mt-2"><img
                                            src="/images/logo/hts-logo-light.png"
                                            alt="HTS"
                                            width={358}
                                            height={110}
                                            className="py-4 px-4 block w-[240px] z-50"
                                          /></div>
                <div className="dark:text-body-color-dark mb-9 text-base leading-relaxed text-body-color">
                    <div className="flex items-start space-x-2.5">
                      <div className="flex-shrink-0">{mapIcon}</div>
                      <div>
                        <span>Street Address</span>
                        <div className="text-xs">500 Main St</div>
                        <div className="text-xs">Bldg 76, Rm 043</div>
                        <div className="text-xs">Cambridge, MA 02139</div>
                      </div>
                      <div className="flex-shrink-0">{boxIcon}</div>
                      <div>
                        <span>Shipping Address</span>
                        <div className="text-xs">Attn: HTS (76-043)</div>
                        <div className="text-xs">32 Vassar St</div>
                        <div className="text-xs">Cambridge, MA 02139</div>
                      </div>
                    </div>
                </div>
                <div className="dark:text-body-color-dark mb-9 text-base leading-relaxed text-body-color">
                  <div className="flex space-x-2.5 place-items-center">
                      <div className="flex-shrink-0"><EnvelopeIcon strokeWidth={2} className="h-5 w-5" /></div>
                      <div>
                      <span className="inline-block align-middle">hts-lab@mit.edu</span>
                      </div>
                  </div>
                </div>

                <div className="mb-0 max-w-[210px] lg:mb-16">
                  <img
                    src="/images/logo/KI_logo_new_stacked_gray_RGB.png"
                    alt="Koch Institute"
                    width={358}
                    height={110}
                    className="py-4 px-4 block w-[240px] z-50"
                  />

               </div>
               <div className="flex items-center">
                    
                    </div>


              </div>
              </div>
      </div>


                              
    </div>
  </main>


 </div>
</>




  )
}

export default AxiosGetRequest