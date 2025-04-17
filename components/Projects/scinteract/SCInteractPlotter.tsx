"use client"
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  ComboboxButton
} from '@headlessui/react'
import React , { useEffect, useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import AboutSCInteractTeam from './AboutTeam';
import ReportSummaryCard from './reportSummaryCard'
// import Plot from 'react-plotly.js';
import dynamic from 'next/dynamic';
    const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

import { useTheme } from "next-themes";

import axios from 'axios';
import { Select, Option } from "@material-tailwind/react";
import Image from 'next/image'
import Link from "next/link";

import LoadingIndicator from '@/components/ui/LoadingIndicator';

import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
  ChevronDownIcon,
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
import ThemeToggler from '@/components/Header/ThemeToggler';



const mapIcon = (<svg width="25" height="25" viewBox="0 0 25 25" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path  d="M12.5035 6.47485C10.3854 6.47485 8.66846 8.19184 8.66846 10.3099C8.66846 12.4279 10.3854 14.1449 12.5035 14.1449C14.6215 14.1449 16.3385 12.4279 16.3385 10.3099C16.3385 8.19184 14.6215 6.47485 12.5035 6.47485ZM10.1685 10.3099C10.1685 9.02027 11.2139 7.97485 12.5035 7.97485C13.793 7.97485 14.8385 9.02027 14.8385 10.3099C14.8385 11.5994 13.793 12.6449 12.5035 12.6449C11.2139 12.6449 10.1685 11.5994 10.1685 10.3099Z"/>
  <path  d="M12.5033 2.83984C8.3766 2.83984 5.03125 6.1852 5.03125 10.3119C5.03125 13.1162 6.1028 15.6692 7.37569 17.7181C8.65084 19.7706 10.1581 21.3657 11.1026 22.2692C11.9045 23.0362 13.139 23.0348 13.9389 22.2653C14.8791 21.3609 16.3778 19.7657 17.6454 17.7137C18.9108 15.6653 19.9754 13.1139 19.9754 10.3119C19.9754 6.1852 16.63 2.83984 12.5033 2.83984ZM6.53125 10.3119C6.53125 7.01362 9.20503 4.33984 12.5033 4.33984C15.8016 4.33984 18.4754 7.01362 18.4754 10.3119C18.4754 12.7374 17.5503 15.0136 16.3692 16.9254C15.1904 18.8336 13.7859 20.3311 12.899 21.1843C12.6788 21.3961 12.3604 21.3966 12.1395 21.1852C11.2483 20.3328 9.83565 18.8352 8.64982 16.9265C7.46175 15.0142 6.53125 12.7375 6.53125 10.3119Z"/>
  </svg>
  );

const boxIcon = (<svg width="24" height="25" viewBox="0 0 24 25" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d="M5.91623 4.96229C6.31475 4.25385 7.0644 3.81543 7.87725 3.81543H16.1228C16.9356 3.81543 17.6852 4.25385 18.0838 4.96229L20.461 9.18826C20.6505 9.52506 20.75 9.90497 20.75 10.2914V19.0646C20.75 20.3072 19.7426 21.3146 18.5 21.3146H5.5C4.25736 21.3146 3.25 20.3072 3.25 19.0646V10.2914C3.25 9.90497 3.34952 9.52506 3.53898 9.18826L5.91623 4.96229ZM11.25 9.14853V5.31543H7.87725C7.6063 5.31543 7.35641 5.46157 7.22357 5.69772L5.28238 9.14853H11.25ZM4.75 10.6485V19.0646C4.75 19.4788 5.08579 19.8146 5.5 19.8146H18.5C18.9142 19.8146 19.25 19.4788 19.25 19.0646V10.6485H4.75ZM18.7176 9.14853L16.7764 5.69772C16.6436 5.46157 16.3937 5.31543 16.1228 5.31543H12.75V9.14853H18.7176Z"/>
  </svg>
  );



  function ColorByCombobox({ geneOptions, value, onChange }) {
    const { theme, resolvedTheme } = useTheme();
    const [query, setQuery] = useState('');
    const [filteredGenes, setFilteredGenes] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
  
    const itemsPerPage = 20;
    const shouldPaginate = geneOptions.length > 100;
  
    const fetchGenes = () => {
      let filtered = geneOptions;
  
      if (query) {
        const lowerQuery = query.toLowerCase();
        filtered = geneOptions
          .filter((gene) => gene.toLowerCase().includes(lowerQuery))
          .sort((a, b) => {
            const aLower = a.toLowerCase();
            const bLower = b.toLowerCase();
  
            if (aLower === lowerQuery) return -1;
            if (bLower === lowerQuery) return 1;
  
            if (aLower.startsWith(lowerQuery) && !bLower.startsWith(lowerQuery)) return -1;
            if (!aLower.startsWith(lowerQuery) && bLower.startsWith(lowerQuery)) return 1;
  
            return aLower.localeCompare(bLower);
          });
      }
  
      if (shouldPaginate) {
        const paged = filtered.slice(0, page * itemsPerPage);
        setFilteredGenes(paged);
        setHasMore(paged.length < filtered.length);
      } else {
        setFilteredGenes(filtered);
        setHasMore(false);
      }
    };
  
    useEffect(() => {
      fetchGenes();
    }, [query, page, geneOptions]);
  
    return (
      <div className="relative w-full">
        <Combobox value={value} onChange={onChange} nullable onClose={() => setQuery('')}>
          <div className="relative">
            <ComboboxInput
              className={`w-full rounded-md py-2 pl-3 pr-10 shadow-sm focus:outline-none ${
                resolvedTheme === "dark"
                  ? "bg-gray-800 text-white border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                  : "bg-white text-gray-900 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              }`}
              displayValue={(val) => val as string}
              onChange={(event) => {
                setQuery(event.target.value);
                setPage(1);
              }}
              placeholder="Type to search..."
            />
            <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </ComboboxButton>
          </div>
          <ComboboxOptions
            className={`absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${
              resolvedTheme === "dark"
                ? "bg-gray-700 text-white border-gray-600"
                : "bg-white text-gray-900 border-gray-200"
            }`}
          >
            {filteredGenes.length === 0 && query !== '' ? (
              <div className="cursor-default select-none px-4 py-2 text-gray-500">No match found.</div>
            ) : (
              filteredGenes.map((gene) => (
                <ComboboxOption
                  key={gene}
                  value={gene}
                  className="cursor-pointer select-none px-4 py-2 hover:bg-blue-100 data-[focus]:bg-blue-100"
                >
                  {gene}
                </ComboboxOption>
              ))
            )}
  
            {/* Show Load More button only if pagination is active */}
            {shouldPaginate && hasMore && (
              <div
                className="cursor-pointer select-none px-4 py-2 text-center text-blue-500 hover:bg-blue-50"
                onClick={() => setPage(page + 1)}
              >
                Load More...
              </div>
            )}
          </ComboboxOptions>
        </Combobox>
      </div>
    );
  }
  


const AxiosGetRequest = () => {

  const { theme, resolvedTheme } = useTheme();

  const [groupby, setGroupby] = useState('');
  const [groups, setGroups] = useState([]);
  const [color, setColor] = useState('');
  const [colorType, setColorType] = useState<'metadata' | 'gene'>('metadata');

  const [plotHtml, setPlotHtml] = useState('');
  const [plotData, setPlotData] = useState<any | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [meta, setMeta] = useState({
    groupby_options: [],
    gene_options: [],
    group_values: {}
  });


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

  const static_url = "http://127.0.0.1:8000" // "https://hts-biosensor-plumber-353269782212.us-central1.run.app";

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


  const [loading, setLoading] = useState(true);

  const [loadingUMAP, setLoadingUMAP] = useState(true);
  const [loadingHeatmap, setLoadingHeatmap] = useState(true);
  

  const [error, setError] = useState<string | null>(null); // const [error, setError] = useState(null);
  const [heatmapData, setHeatmapData] = useState<any>(null);


  const fetchDifferentialExpression = async (selectedCells: string[]) => {
    setLoadingHeatmap(true);

    try {
      const heatmap_response = await axios.post(`${static_url}/heatmap`, {
        cell_ids: selectedCells,
        groupby: groupby
      });
  
      // Handle the response (e.g., show in table or plot)
      setHeatmapData(heatmap_response.data);

    } catch (err) {
      console.error("Error fetching DE genes:", err);
    } finally {
      setLoadingHeatmap(false);
    }
  };


  useEffect( () => {

    const url =  `${static_url}/metadata_options`;

    const fetchData = async () => {

      setLoading(true);

      try {

        const response = await axios.get(url);
        const result = response; // JSON.parse(response.data);

        setMeta(result.data);
        setGroupby(result.data.groupby_options[0] || '');
        setColor(result.data.groupby_options[0] || '');

        

      } catch (err) {

        setError(err);

      } finally {

        setLoading(false);

      }


    };

    fetchData();



  }, []);

  useEffect(() => {
    if (!loading && groupby && color) {
      fetchPlot();
      fetchDifferentialExpression([]);
    }
  }, [loading, groupby, color]); // Refresh the plots when either groupby or color changes



  const fetchPlot = async () => {
    setLoadingUMAP(true);

    const params = new URLSearchParams({
      groupby,
      groups: groups.join(','),
      color
    });
    try {
      const res = await axios.get(`${static_url}/plot_umap?${params}`);
      setPlotData(JSON.parse(res.data));
    } catch (err) {
      console.error(err);
      setError(err.message || 'Unknown error');
    } finally {
      setLoadingUMAP(false);
    }

    if (error) return <div className="text-red-600">Error: {error}</div>;
    if (!plotData) return <div>Loading...</div>;


  };


  if (loading){

    return(

      <LoadingIndicator />


    );

  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Interactive UMAP Viewer</h1>

      <div>
  <label>Group by:</label>
  <select
    value={groupby}
    onChange={e => {
      const selectedGroupby = e.target.value;
      setGroupby(selectedGroupby);
      setColorType("metadata"); // Default colorType to metadata
      setColor(selectedGroupby); // Default color to match groupby
    }}
  >
    {meta.groupby_options.map(opt => (
      <option key={opt} value={opt}>{opt}</option>
    ))}
  </select>
</div>

<div>
  <label>Color by:</label>
  
  <div>
    <label>
      <input
        type="radio"
        name="colorType"
        value="metadata"
        checked={colorType === "metadata"}
        onChange={() => {
          setColorType("metadata");
          setColor(groupby); // default to groupby if switching to metadata
        }}
      />
      Metadata
    </label>

    <label style={{ marginLeft: "1rem" }}>
      <input
        type="radio"
        name="colorType"
        value="gene"
        checked={colorType === "gene"}
        onChange={() => {
          setColorType("gene");
          setColor(meta.gene_options[0] || ""); // default to first gene
        }}
      />
      Gene
    </label>
  </div>

  <div className="mt-2 w-[500px]">
    <ColorByCombobox
      geneOptions={colorType === "metadata" ? meta.groupby_options : meta.gene_options}
      value={color}
      onChange={(val) => setColor(val)}
    />
  </div>



</div>


      <button onClick={fetchPlot} style={{ marginTop: '1rem' }}>
        Refresh Plot
      </button>


    <div className="p-4">
      <h2 className="font-bold text-lg mb-4">UMAP Plot</h2>
      {loadingUMAP ? (

        <LoadingIndicator message = "Preparing UMAP plot ..." />

      ) : (
      <Plot
        data={plotData?.data}
        layout={{
          ...plotData?.layout,
          dragmode: 'select',
          paper_bgcolor: resolvedTheme === "dark" ? '#111' : '#fff',
          plot_bgcolor: resolvedTheme === "dark" ? '#111' : '#fff',
          font: { color: resolvedTheme === "dark" ? '#fff' : '#000' },
          xaxis: { ...plotData?.layout?.xaxis, showgrid: false, zeroline: false, gridcolor: resolvedTheme === "dark" ? '#333' : '#ccc' },
          yaxis: { ...plotData?.layout?.yaxis, showgrid: false, zeroline: false, gridcolor: resolvedTheme === "dark" ? '#333' : '#ccc' },
          legend: {
            x: -0.3,  // Move to the left of the plot
            y: 1,
            xanchor: 'left',
            yanchor: 'top',
            orientation: 'v',
            bgcolor: resolvedTheme === "dark" ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.8)',
            bordercolor: '#ccc',
            borderwidth: 1
            },
            margin: {
            l: 180,  // Make room on the left for the legend
            r: 40,
            t: 60,
            b: 60,
          },
        }}
        config={plotData?.config || { responsive: true }}
        style={{ width: '100%', height: '800px' }}
        onSelected={(event) => {
            if (event?.points?.length) {
              const selectedCellIds = event.points.map((pt: any) => pt.customdata?.[0]);
              fetchDifferentialExpression(selectedCellIds);
            } 
        }}
        onDeselect={() => {

          fetchDifferentialExpression([]);

        }}



      />
      )}
    </div>


  {heatmapData && (
    <div className="mt-10">
      <h2 className="font-bold text-lg mb-4">Expression Heatmap</h2>
      {loadingHeatmap ? (

        <LoadingIndicator message = "Preparing top group markers ..." />

      ) : (
      <Plot
        data={heatmapData.data}
        layout={{
          ...heatmapData.layout,
          paper_bgcolor: resolvedTheme === "dark" ? '#111' : '#fff',
          plot_bgcolor: resolvedTheme === "dark" ? '#111' : '#fff',
          font: { color: resolvedTheme === "dark" ? '#fff' : '#000' },
          margin: {
            l: 180,  // Make room on the left for the legend
            r: 40,
            t: 60,
            b: 60,
          },
        }}
        config={{ responsive: true }}
        style={{ width: '100%', height: '600px' }}
      />
    )}
    </div>
  )}


    </div>


  );

  




}

export default AxiosGetRequest