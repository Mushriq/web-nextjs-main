"use client"
import React , { useEffect, useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import SectionTitle from '../../Common/SectionTitle';
import ReportSummaryCard from 'components/Projects/biosensor/reportSummaryCard'

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


export default function DirectReportPage({ selectedBarcodeId }) {
  
  const static_url = "https://hts-biosensor-plumber-353269782212.us-central1.run.app";
 
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
  const table1_subsubtitle = "Showing the final timepoint. Numbers in parentheses are number of detected or inferred viable cancer cells. LogFC calculation adds a pseudocount of 1 cell. Active compounds are those with label-free inferred log-fold killing activity of over 2.";
  
  const TABLE_HEAD = ["Status", "Timepoint", "Compound", "Mechanism", "LogFC Labelled", "LogFC Unlabelled"];
  const [TABLE_ROWS, setTABLE_ROWS] = useState([]);


  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  

  useEffect(() => {


    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${static_url}/list`);
        const result = JSON.parse(response.data);
        setBarcodeData(result);
        setSelectedSample(barcodeData[0]);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    const fetchCellPic = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${static_url}/cellpic`, {responseType: 'blob', params: { id: selectedBarcodeId }});
        const image = URL.createObjectURL(response.data);
        setCellPic(image);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    const fetchPlot1 = async () => {
      setLoading(true);
      try {
      const response = await axios.get(`${static_url}/plot1`, {responseType: 'blob', params: { id: selectedBarcodeId }});
      const image = URL.createObjectURL(response.data);
      setPlot1(image);
      } catch (error) {
      setError(error);
      } finally {
      setLoading(false);
      }
    };

    const fetchPlot2 = async () => {
      setLoading(true);
      try {
      const response = await axios.get(`${static_url}/plot2`, {responseType: 'blob', params: { id: selectedBarcodeId }});
      const image = URL.createObjectURL(response.data);
      setPlot2(image);
      } catch (error) {
      setError(error);
      } finally {
      setLoading(false);
      }
    };

    const fetchPlot3 = async () => {
      setLoading(true);
      try {
      const response = await axios.get(`${static_url}/plot3`, {responseType: 'blob', params: { id: selectedBarcodeId }});
      const image = URL.createObjectURL(response.data);
      setPlot3(image);
      } catch (error) {
      setError(error);
      } finally {
      setLoading(false);
      }
    };

    const fetchPlot4 = async () => {
      setLoading(true);
      try {
      const response = await axios.get(`${static_url}/plot4`, {responseType: 'blob', params: { id: selectedBarcodeId }});
      const image = URL.createObjectURL(response.data);
      setPlot4(image);
      } catch (error) {
      setError(error);
      } finally {
      setLoading(false);
      }
    };

    const fetchPlot5 = async () => {
      setLoading(true);
      try {
      const response = await axios.get(`${static_url}/plot5`, {responseType: 'blob', params: { id: selectedBarcodeId }});
      const image = URL.createObjectURL(response.data);
      setPlot5(image);
      } catch (error) {
      setError(error);
      } finally {
      setLoading(false);
      }
    };

    const fetchPlot6 = async () => {
      setLoading(true);
      try {
      const response = await axios.get(`${static_url}/plot6`, {responseType: 'blob', params: { id: selectedBarcodeId }});
      const image = URL.createObjectURL(response.data);
      setPlot6(image);
      } catch (error) {
      setError(error);
      } finally {
      setLoading(false);
      }
    };

    const fetchTable1 = async () => {
      setLoading(true);
      try {
      const response = await axios.get(`${static_url}/logfctable`, {params: { id: selectedBarcodeId, cutoff: 1  }});
      const result = JSON.parse(response.data);
      setTABLE_ROWS(result);
      } catch (error) {
      setError(error);
      } finally {
      setLoading(false);
      }
    };


    fetchData();
    fetchCellPic();
    fetchPlot1();
    fetchPlot2();   
    fetchPlot3();  
    fetchPlot4(); 
    fetchPlot5();
    fetchPlot6();
    fetchTable1();

    setLoading(false);

  }, [selectedSample]);


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

  return (
    <>

      <section id="contact" className="pt-2 md:pt-4 lg:pt-8">
        <div className="container">
          <div className="border-b border-body-color/[.15] pb-4 dark:border-white/[.15] md:pb-6 lg:pb-8">
            <div className="-mx-4 flex flex-wrap items-center justify-center">
              <div className="w-full section-animation px-4">
                <div className="flex flex-wrap items-center justify-start w-full">



  {/* sample report */}
  <main className="grow">
 
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
      
    <div className="grid grid-cols-12 gap-2 mb-2 items-center">
                                      <div className={`col-span-9 text-lg font-semibold text-gray-800  ${selectedSample ? "block" : "hidden"}`}>Experiment: {selectedSample?.imaging_barcode}</div>
                                      <div className={`col-span-9 text-lg font-semibold text-gray-800  ${selectedSample ? "hidden" : "block"}`}>
                                      <div className="flex flex-row">  
                                        <svg className="w-6 h-6 md:w-8 md:h-8 text-gray-300 animate-spin" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"
             >
              <path
          d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
          stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"></path>
              <path
          d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
          stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
              </path>
            </svg><div className="in-line block px-4">Retrieving info.. This may take up to 5 mins.</div>
            </div>
            </div>
                                      
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
 





                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
