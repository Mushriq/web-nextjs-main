"use client"
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  ComboboxButton
} from '@headlessui/react'
import Slider, { SliderThumb, SliderValueLabelProps } from '@mui/material/Slider';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import {
  Autocomplete,
  TextField,
  Switch,
  Typography,
  Box,
  Divider
} from "@mui/material";

import React , { useEffect, useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import AboutSCInteractTeam from './AboutTeam';
import ReportSummaryCard from './reportSummaryCard'
// import Plot from 'react-plotly.js';
import dynamic from 'next/dynamic';
    const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

import { useTheme } from "next-themes";

import axios from 'axios';
import { v4 as uuidv4 } from 'uuid'; 


import { Select, Option } from "@material-tailwind/react";
import Image from 'next/image'
import Link from "next/link";

import LoadingIndicator from '@/components/ui/LoadingIndicator';
import { getTopMarkers } from "@/components/utils/markers.js";
import NLQueryInput from '@/components/ui/NLQueryInput';

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

import Papa from 'papaparse';


const mapIcon = (<svg width="25" height="25" viewBox="0 0 25 25" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path  d="M12.5035 6.47485C10.3854 6.47485 8.66846 8.19184 8.66846 10.3099C8.66846 12.4279 10.3854 14.1449 12.5035 14.1449C14.6215 14.1449 16.3385 12.4279 16.3385 10.3099C16.3385 8.19184 14.6215 6.47485 12.5035 6.47485ZM10.1685 10.3099C10.1685 9.02027 11.2139 7.97485 12.5035 7.97485C13.793 7.97485 14.8385 9.02027 14.8385 10.3099C14.8385 11.5994 13.793 12.6449 12.5035 12.6449C11.2139 12.6449 10.1685 11.5994 10.1685 10.3099Z"/>
  <path  d="M12.5033 2.83984C8.3766 2.83984 5.03125 6.1852 5.03125 10.3119C5.03125 13.1162 6.1028 15.6692 7.37569 17.7181C8.65084 19.7706 10.1581 21.3657 11.1026 22.2692C11.9045 23.0362 13.139 23.0348 13.9389 22.2653C14.8791 21.3609 16.3778 19.7657 17.6454 17.7137C18.9108 15.6653 19.9754 13.1139 19.9754 10.3119C19.9754 6.1852 16.63 2.83984 12.5033 2.83984ZM6.53125 10.3119C6.53125 7.01362 9.20503 4.33984 12.5033 4.33984C15.8016 4.33984 18.4754 7.01362 18.4754 10.3119C18.4754 12.7374 17.5503 15.0136 16.3692 16.9254C15.1904 18.8336 13.7859 20.3311 12.899 21.1843C12.6788 21.3961 12.3604 21.3966 12.1395 21.1852C11.2483 20.3328 9.83565 18.8352 8.64982 16.9265C7.46175 15.0142 6.53125 12.7375 6.53125 10.3119Z"/>
  </svg>
  );

const boxIcon = (<svg width="24" height="25" viewBox="0 0 24 25" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d="M5.91623 4.96229C6.31475 4.25385 7.0644 3.81543 7.87725 3.81543H16.1228C16.9356 3.81543 17.6852 4.25385 18.0838 4.96229L20.461 9.18826C20.6505 9.52506 20.75 9.90497 20.75 10.2914V19.0646C20.75 20.3072 19.7426 21.3146 18.5 21.3146H5.5C4.25736 21.3146 3.25 20.3072 3.25 19.0646V10.2914C3.25 9.90497 3.34952 9.52506 3.53898 9.18826L5.91623 4.96229ZM11.25 9.14853V5.31543H7.87725C7.6063 5.31543 7.35641 5.46157 7.22357 5.69772L5.28238 9.14853H11.25ZM4.75 10.6485V19.0646C4.75 19.4788 5.08579 19.8146 5.5 19.8146H18.5C18.9142 19.8146 19.25 19.4788 19.25 19.0646V10.6485H4.75ZM18.7176 9.14853L16.7764 5.69772C16.6436 5.46157 16.3937 5.31543 16.1228 5.31543H12.75V9.14853H18.7176Z"/>
  </svg>
  );


  function NaturalLanguageViz({ static_url }) {
    const [input, setInput] = useState("Show me UMAP colored by CD8A")
    const [params, setParams] = useState(null)
  
    const get_params = new URLSearchParams({
      query: input,
    });


    const handleRun = async () => {
      const res = await axios.get(`${static_url}/parse?${get_params}`);
      setParams(JSON.parse(res.data));
      // TODO: Now send to your main visualization endpoint with response.data


    }
  
    return (
      <div className="space-y-4">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask a question like: show CD8A grouped by cell type"
          className="border p-2 rounded w-full"
        />
        <button onClick={handleRun} className="bg-blue-600 text-white px-4 py-2 rounded">
          Parse Query
        </button>
  
        {params && (
          <pre className="bg-gray-100 p-2 rounded text-sm">
            {JSON.stringify(params, null, 2)}
          </pre>
        )}
      </div>
    )
  }

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

  const FilterByPanel = ({
    metadataOptions,
    filterBy,
    setFilterBy,
    setFilterType,
    discreteValues,
    setDiscreteValues,
    numericRange,
    setNumericRange,
    plotReDraw,
    setPlotReDraw
  }: {
    metadataOptions: any;
    filterBy: string | null;
    setFilterBy: (val: string | null) => void;
    setFilterType: (val: string | null) => void;
    discreteValues: Record<string, boolean>;
    setDiscreteValues: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
    numericRange: number[];
    setNumericRange: (val: number[]) => void;
    plotReDraw: boolean;
    setPlotReDraw: React.Dispatch<React.SetStateAction<boolean>>;
  }) => {
    useEffect(() => {
      if (!filterBy || !metadataOptions) return;
  
      if (metadataOptions.discrete_categories.hasOwnProperty(filterBy)) {
        const initialState: Record<string, boolean> = {};
        metadataOptions.discrete_categories[filterBy].forEach((val: string) => {
          initialState[val] = true;
        });
        setDiscreteValues(initialState);
        setFilterType("discrete");

      }
  
      if (metadataOptions.numeric_categories.hasOwnProperty(filterBy)) {
        const range = metadataOptions.numeric_categories[filterBy];
        setNumericRange([range.min, range.max]);
        setFilterType("numeric");
      }
    }, [filterBy, metadataOptions]);
  
    const isDiscrete = filterBy && metadataOptions.discrete_categories.hasOwnProperty(filterBy);
    const isNumeric = filterBy && metadataOptions.numeric_categories.hasOwnProperty(filterBy);
  
    

    const handleReset = () => {
      if (!filterBy || !metadataOptions) return;
  
      if (isDiscrete) {
        const resetDiscrete: Record<string, boolean> = {};
        metadataOptions.discrete_categories[filterBy].forEach((val: string) => {
          resetDiscrete[val] = true;
        });
        setFilterType("discrete");
        setDiscreteValues(resetDiscrete);
      }
  
      if (isNumeric) {
        const range = metadataOptions.numeric_categories[filterBy];
        setFilterType("numeric");
        setNumericRange([range.min, range.max]);
      }

      setFilterBy(null);
      setFilterType("discrete");

      setPlotReDraw(true);


    };

    const { resolvedTheme } = useTheme()
    const themeColor = resolvedTheme === 'dark' ? '#ad85d8' : '#6721b4' 

    
    
    return (
      <Box > {/* sx={{ p: 2 }} */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <ColorByCombobox
            geneOptions={metadataOptions.groupby_options}
            value={filterBy}
            onChange={(val) => setFilterBy(val)}
          />
          {(isDiscrete || isNumeric) && (<Box>
                    <Button onClick={handleReset}>Reset</Button>
                  </Box>)}
        </Box>
  
        {isDiscrete && (
          <Box mt={2}>
            <Typography variant="subtitle1">Select Groups</Typography>
            {Object.entries(discreteValues).map(([value, checked]) => (
              <FormControlLabel
                key={value}
                control={
                  <Switch
                    checked={checked}
                    onChange={() =>
                      setDiscreteValues((prev) => ({
                        ...prev,
                        [value]: !prev[value],
                      }))
                    }
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': {
                        color: themeColor,
                      },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                        backgroundColor: themeColor,
                      },
                    }}
                  />
                }
                label={value}
              />
            ))}
          </Box>
        )}
  
        {isNumeric && (
          <Box mt={2}>
            <Typography variant="subtitle1">Select Range</Typography>
            <Slider
              value={numericRange}
              onChange={(e, newVal) => setNumericRange(newVal as number[])}
              valueLabelDisplay="auto"
              min={metadataOptions.numeric_categories[filterBy].min}
              max={metadataOptions.numeric_categories[filterBy].max}
              sx={{
                color: themeColor,
                '& .MuiSlider-thumb': {
                  backgroundColor: themeColor,
                },
                '& .MuiSlider-track': {
                  backgroundColor: themeColor,
                },
                '& .MuiSlider-rail': {
                  opacity: 0.3,
                },
              }}
            />
          </Box>
        )}

      </Box>
    );
  };
  


const AxiosGetRequest = () => {

  const { theme, resolvedTheme } = useTheme();
  const themeColor = resolvedTheme === 'dark' ? '#ad85d8' : '#6721b4' 


  // Group By
  const [groupby, setGroupby] = useState('');
  const [groups, setGroups] = useState([]);

  // Filter By
  const [filterBy, setFilterBy] = useState<string | null>(null);
  const [filterType, setFilterType] = useState("discrete");
  const [discreteValues, setDiscreteValues] = useState<Record<string, boolean>>({});
  const [numericRange, setNumericRange] = useState<number[]>([0, 1]);

  const [plotReDraw, setPlotReDraw] = useState(false);

  // Heatmap
  const [deInitialized, setDeInitialized] = useState(false);
  const [filteredMarkers, setFilteredMarkers] = useState([]);
  const [filteredZ, setFilteredZ] = useState([]);
  const [filteredCustom, setFilteredCustom] = useState([]);
  const [filteredX, setFilteredX] = useState([]);
  

  const [plotReady, setPlotReady] = useState(false);
  const [plotReadyData, setPlotReadyData] = useState<any[]>([]);
  const [selectionMade, setSelectionMade] = useState(false);
  const [plotKey, setPlotKey] = useState(0);
  const plotRef = useRef<any>(null);


  // Color By
  const [color, setColor] = useState('');
  const [colorType, setColorType] = React.useState('metadata');

  const [dotSize, setDotSize] = useState(6);
  const [viewport, setViewport] = useState({});

  const [plotHtml, setPlotHtml] = useState('');
  const [plotData, setPlotData] = useState<any | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [meta, setMeta] = useState({
    groupby_options: [],
    gene_options: [],
    discrete_categories: {},
    numeric_categories: {},
    group_values: {}
  });

  

  const [selectedSample, setSelectedSample] = useState(null);

  const table1_title = "Compound Activity";
  const table1_subtitle = "Log2-fold change in the number of viable cancer cells from start of the experiment.";
  const table1_subsubtitle = "Showing the final timepoint. Numbers in parentheses are number of detected or inferred viable cancer cells. LogFC calculation adds a pseudocount of 1 cell. Active compounds are those with label-free inferred log-fold killing activity of over 1.";
  
  const TABLE_HEAD = ["Status", "Timepoint", "Compound", "Mechanism", "LogFC Labelled", "LogFC Unlabelled"];
  const [TABLE_ROWS, setTABLE_ROWS] = useState([]);

  const static_url = "https://scinteract-353269782212.us-central1.run.app"  // "http://localhost:8000" // 

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
  const [loadingVolcano, setLoadingVolcano] = useState(true);

 
  const [error, setError] = useState<string | null>(null); // const [error, setError] = useState(null);
  const [heatmapData, setHeatmapData] = useState<any>(null);
  const [boxplotData, setBoxPlotData] = useState<any>([]);
  const [umapSelectedIds, setUmapSelectedIds] = useState<string[]>([]);
  const [subsetBoxplotData, setSubsetBoxplotData] = useState([]);

  const [volcanoData, setVolcanoData] = useState<any>(null);

  const [adjustedData, setAdjustedData] = useState([]);


  const [volcanoGroupOptions, setVolcanoGroupOptions] = useState<string[]>([]);
  const [volcanoSelectedGroup, setVolcanoSelectedGroup] = useState<string>("");

  const controllerRef = useRef<AbortController | null>(null);
  const latestTokenRef = useRef<string | null>(null);


  const handleNaturalLanguageQuery = async (input: string) => {
    try {

      const get_params = new URLSearchParams({
        query: input,
      });
      
      const response = await axios.get(`${static_url}/parse?${get_params}`);
      const parsedResponse = JSON.parse(response.data);
  
      const { group_by, color_by } = response.data;
  
      console.log("🧠 Parsed response:", response.data);
  
      if (group_by) {
        setGroupby(group_by);
      }
  
      if (color_by) {
        setColor(color_by);
      }
  
    } catch (error) {
      console.error("Error parsing natural language query:", error);
    }
  };


  const fetchDifferentialExpression = async (selectedCells: string[]) => {


    // Cancel the previous request if it's still ongoing
    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    // Create a new controller for this request
    const controller = new AbortController();
    controllerRef.current = controller;

    const requestToken = uuidv4(); // Generate a unique ID
    latestTokenRef.current = requestToken;

    setLoadingHeatmap(true);

    try {
      const heatmap_response = await axios.post(`${static_url}/heatmap1`, 
      {
        cell_ids: selectedCells,
        groupby: groupby,
        request_id: requestToken,
        zscore: false,
      },
      {
        signal: controller.signal // Pass the signal to axios
      }
    );
  
      // Check if this is the most recent request
      if (requestToken !== latestTokenRef.current) {
        console.log("Stale request from client ignored");
        return;
      }

      // Check if this is the most recent request
      if (heatmap_response.data.request_id !== latestTokenRef.current) {
        console.log("Stale response from server ignored");
        return;
      }

      const filteredMarkers = getTopMarkers(heatmap_response.data.full_table, 50, 0.1);

      // Handle the response (e.g., show in table or plot)
      setHeatmapData({
        ...heatmap_response.data,
        filteredMarkers,
      });




    } catch (err) {
      if (axios.isCancel(err) || err.name === "AbortError") {
        console.log("Previous request aborted");
      } else {
        console.error("Error fetching DE genes:", err);
      }
    } finally {
      if (requestToken === latestTokenRef.current) {
        controllerRef.current = null; // Clean up controller
        setLoadingHeatmap(false); // Only stop spinner if this is the latest
      }
    }
  };

  const fetchVolcano = async (selectedCells: string[]) => {
    setLoadingVolcano(true);

    try {
      const volcano_response = await axios.post(`${static_url}/volcano`, {
        cell_ids: selectedCells,
        groupby: groupby,
        group: volcanoSelectedGroup
      });
  
      // Handle the response (e.g., show in table or plot)
      setVolcanoData(volcano_response.data);

    } catch (err) {
      console.error("Error fetching Volcano data:", err);
    } finally {
      setLoadingVolcano(false);
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
        const defaultGroup = result.data.groupby_options.includes("leiden")
        ? "leiden"
        : result.data.groupby_options[0] || '';
      
        setGroupby(defaultGroup);
        setColor(defaultGroup);

        setFilterBy(null); // reset the filter when changing the data

      } catch (err) {

        setError(err);

      } finally {

        setLoading(false);

      }


    };

    fetchData();



  }, []);

  // Encapsulate shared logic
  const runPlotPipeline = () => {
    const calledReset = plotReDraw; // grab whether this was a reset call before turning it off
    setPlotReDraw(false);

    fetchPlot();

    if (!deInitialized) {

      setDeInitialized(true); // mark as initialized

      if (calledReset) {
        // fetchDifferentialExpression([]);
      } else if (plotData?.data) {
        const allCellIds = plotData.data.flatMap((trace: any) =>
          trace.customdata?.map((d: any) => d[0]) || []
        );
        // fetchDifferentialExpression(allCellIds);
      } else {
        // fetchDifferentialExpression([]);
      }
    
      
    }

    setDotSize(1);
    const timeouts = [
      setTimeout(() => setDotSize(5), 1000),
    ];

    return () => timeouts.forEach(clearTimeout); // cleanup
  };

  useEffect(() => {
    if (!loading && groupby && color) {
      const cleanup = runPlotPipeline();
      return cleanup;
    }
  }, [loading, groupby, color]);

  useEffect(() => {
    if (plotReDraw) {
      const cleanup = runPlotPipeline();
      return cleanup;
    }
  }, [plotReDraw]);





  const fetchPlot = async () => {

    setLoadingUMAP(true);

    const params = new URLSearchParams({
      groupby,
      groups: groups.join(','),
      color
    });

    // Add filters if present
    if (filterBy && filterType) {
      params.append('filter_by', filterBy);
      params.append('filter_type', filterType);
  
      if (filterType === "discrete") {
        const selected = Object.entries(discreteValues)
          .filter(([_, selected]) => selected)
          .map(([value]) => value);
        params.append('filter_values', selected.join(','));
      }
  
      if (filterType === "numeric" && numericRange.length === 2) {
        params.append('filter_min', numericRange[0].toString());
        params.append('filter_max', numericRange[1].toString());
      }
    }

    try {
      //const response = await fetch(`${static_url}/plot_umap?${params}`);
      //const data = await response.json();
      //setPlotData(data);

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



  useEffect(() => {
    if (plotData?.data && plotData?.layout && dotSize > 0) {

      const updated = plotData.data.map((trace: any) => ({
        ...trace,
        marker: {
          ...trace.marker,
          size: dotSize,
        },
      }));
      setPlotReadyData(updated);

      setTimeout(() => {
        setPlotReady(true);
      }, 1); // small async delay to let DOM stabilize

      setPlotKey(prev => prev + 1);

    }
  }, [plotData, dotSize]);


  useEffect(() => {
    if (plotData?.data) {
      const allCellIds = plotData.data.flatMap((trace: any) =>
        trace.customdata?.map((d: any) => d[0]) || []
      );
      fetchDifferentialExpression(allCellIds);
    }
  }, [plotData]);


  useEffect(() => {
    if (plotRef.current?.el) {
      window.Plotly.Plots.resize(plotRef.current.el);
    }
  }, [plotData, dotSize]);

  useEffect(() => {
    if (plotReadyData?.length) {
      setDotSize(1); // start small
      const timeouts = [
        setTimeout(() => setDotSize(5), 1000),
      ];
  
      return () => timeouts.forEach(clearTimeout); // cleanup if component unmounts
    }
  }, [plotData]);



  useEffect(() => {
    if (!plotData?.data || plotData.data.length === 0) return;

    const extractBoxplotData = () => {
        if (!plotData || !plotData.data || colorType === "metadata") {
            setBoxPlotData([]);
            return;
        }

        const extracted = plotData.data.flatMap((trace: any) => {
            return trace.customdata.map((entry: any) => {
                const [cell_id, group, value] = entry;

                // Parse the group: if it's an integer, format it, otherwise leave it as is
                const formattedGroup = Number.isInteger(group) 
                    ? `${groupby} ${group}` // Example format: add a prefix to integer group values
                    : group.toString(); // Ensure it's a string for all non-integers

                return {
                    cell_id,
                    group: formattedGroup, // Use the formatted group
                    expression: value,
                };
            });
        });

        setBoxPlotData(extracted);
    };

    extractBoxplotData();
}, [color, plotData, colorType]); // Added colorType to dependencies



  useEffect(() => {
    if (umapSelectedIds.length === 0) {
      setSubsetBoxplotData(boxplotData);
    } else {
      const filtered = boxplotData.filter((d: any) =>
        umapSelectedIds.includes(d.cell_id)
      );
      setSubsetBoxplotData(filtered);
    }
  }, [umapSelectedIds, boxplotData]);
  

  if (loading){

    return(

      <LoadingIndicator />


    );

  }





  const totalCells = plotData?.data?.reduce(
    (acc: number, trace: any) => acc + (trace?.x?.length || 0),
    0
  );
  
  // const umapTitle = `Showing UMAP of ${totalCells} cells grouped by ${groupby} and colored by ${color}`;

  return (

    
    <div style={{ padding: '2rem' }}>
      <h1>Interactive UMAP Viewer</h1>

{/* TOP PANEL */}
<div className="grid grid-flow-col grid-cols-2 grid-rows-3 gap-4">



  <div className="row-span-3">

      <div className="mt-4 w-[500px]"> 
        <label className="block font-medium mb-1">Filter By:</label>
        {meta && (
          <div>

            <FilterByPanel
              metadataOptions={meta}
              filterBy={filterBy}
              setFilterBy={setFilterBy}
              setFilterType={setFilterType}
              discreteValues={discreteValues}
              setDiscreteValues={setDiscreteValues}
              numericRange={numericRange}
              setNumericRange={setNumericRange}
              plotReDraw={plotReDraw}
              setPlotReDraw={setPlotReDraw}
            />

            <div className="mb-4">
                <Button onClick={runPlotPipeline} style={{ marginTop: '1rem' }}>
                Apply Filter
                </Button>
            </div>

            <Divider variant = "middle" className="my-6" />

          </div>


          )}

      </div>



      <div className="mt-4 w-[500px]">
          <label className="block font-medium mb-1">Group By:</label>
      <div className="mt-2 mb-4 w-[500px]">
      <ColorByCombobox
          geneOptions={meta.groupby_options}
          value={groupby}
          onChange={val => {
            setGroupby(val);
            setColorType("metadata"); // Default colorType to metadata
            setColor(val); // Default color to match groupby
          }}
        />
        </div>

        <Divider variant = "middle" className="my-6" />
      </div>





      <div className="mt-4 w-[500px]">

        <div>
        <FormControl>
        <label className="block font-medium mb-1">Color By:</label>
            <RadioGroup
              row
              aria-labelledby="color-by-radio-buttons-group"
              name="color-by-radio-buttons-group"
              value={colorType}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const selectedValue = (event.target as HTMLInputElement).value;
                setColorType(selectedValue);
                if (selectedValue === "gene") {
                  setColor(meta.gene_options[0] || ""); // default to first gene
                }
                if (selectedValue === "metadata") {
                  setColor(groupby); // default to groupby category
                }
              }}
            >
              <FormControlLabel value="metadata" control={<Radio sx={{
              color: themeColor,
              '&.Mui-checked': {
                color: themeColor,
              },
            }} />} label="Metadata" />
              <FormControlLabel value="gene" control={<Radio sx={{
              color: themeColor,
              '&.Mui-checked': {
                color: themeColor,
              },
            }} />} label="Gene" />
            </RadioGroup>
          </FormControl>

          <div className="mt-4 mb-4 w-[500px]">
          <ColorByCombobox
            geneOptions={colorType === "metadata" ? meta.groupby_options : meta.gene_options}
            value={color}
            onChange={(val) => setColor(val)}
          />
          </div>
          <Divider variant = "middle" className="my-6" />
        </div>





        <div className="mt-4 w-[500px]">
        <label className="block font-medium mb-1">UMAP Dot Size</label>
        <Slider
          aria-label = "Dot Size"
          defaultValue={6}
          min={1}
          max={10}
          valueLabelDisplay="auto"
          value={dotSize}
          onChange={(e, val) => setDotSize(val)}
          className="w-full"
          sx={{
            color: themeColor,
            '& .MuiSlider-thumb': {
              backgroundColor: themeColor,
            },
            '& .MuiSlider-track': {
              backgroundColor: themeColor,
            },
            '& .MuiSlider-rail': {
              opacity: 0.3,
            },
          }}
        />
        </div>






        </div>






  </div>





  <div className="row-span-3">
    <NLQueryInput 
        setGroupby={setGroupby}
        setColor={setColor}
        setFilterBy={setFilterBy}
        setColorType={setColorType}
        parseApiUrl={`${static_url}/parse`}
        metadataOptions={meta.groupby_options}
        geneList={meta.gene_options}
        themeColor={themeColor}
      />
  </div>


</div>
{/* END OF TOP PANEL */}


<div>


</div>


<Divider variant = "middle" className="my-6" />


    <div className="p-4">
      <h2 className="font-bold text-lg mb-4">UMAP Plot</h2>
      {loading || loadingUMAP || !plotReady ? (

        <LoadingIndicator message = "Preparing UMAP plot ..." />

      ) : (
        <Plot
        data={plotReadyData}
        layout={{
          ...plotData?.layout,
          title: {
            text: `UMAP of ${plotData?.data?.reduce(
              (acc: number, trace: any) => acc + (trace?.customdata?.length || 0),
              0
            )} cells grouped by ${groupby} and colored by ${color}`,
            font: {
              size: 20,
              color: resolvedTheme === "dark" ? '#fff' : '#000',
            },
            xref: 'paper',
            x: 0.05, // position on the x-axis (0 = left, 0.5 = center)
          },
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
              setUmapSelectedIds(selectedCellIds);
            }
        }}
        onDeselect={() => {

          const allCellIds = plotData.data.flatMap((trace: any) =>
            trace.customdata?.map((d: any) => d[0]) || []
          );
          fetchDifferentialExpression(allCellIds);
          setUmapSelectedIds(allCellIds);

        }}




      />
      )}
    </div>



    <div className="mt-10">
  <h2 className="font-bold text-lg mb-4">Gene Expression by {groupby}</h2>
  
  {loadingUMAP || !boxplotData ? (
    <LoadingIndicator message="Preparing boxplot..." />
  ) : boxplotData.length > 0 ? (

    <div>
          <div className="mb-4">
          <Plot
              data={[
                {
                  type: "box",
                  x: subsetBoxplotData
                    .sort((a: any, b: any) => {
                      // If group is numeric, sort by numeric value
                      return a.group - b.group;
                    })
                    .map((d: any) => d.group),
                  y: subsetBoxplotData
                    .sort((a: any, b: any) => {
                      // Ensure y values are in the same order as x
                      return a.group - b.group;
                    })
                    .map((d: any) => d.expression),
                  boxpoints: "all",  // Show all points as dots (instead of boxpoints: "all" for boxplot)
                  jitter: 0.3,
                  pointpos: 0,  
                  fillcolor: resolvedTheme === "dark" ? "#ad85d8" : "#6721b4",
                  line: { color: resolvedTheme === "dark" ? "white" : "black" },
                  marker: { 
                    color: resolvedTheme === "dark" ? "white" : "black",
                    size: 3  // Adjust this number to control the dot size
                  },
                },
              ]}
              layout={{
                title: `Expression of ${color} grouped by ${groupby}`,
                yaxis: { title: color },
                xaxis: { title: groupby, type: "category" },
                paper_bgcolor: resolvedTheme === "dark" ? "#111" : "#fff",
                plot_bgcolor: resolvedTheme === "dark" ? "#111" : "#fff",
                font: { color: resolvedTheme === "dark" ? "#fff" : "#000" },
                margin: { l: 60, r: 40, t: 60, b: 60 },
              }}
              config={{ responsive: true }}
              style={{ width: "100%", height: "600px" }}
            />
        </div>
        <Button
        onClick={() => {
          if (!boxplotData || boxplotData.length === 0) return;

          const renamedData = boxplotData.map(({ cell_id, group, expression }) => ({
            cell_id,
            group,
            [color]: expression, // dynamically name the column after the gene
          }));

          const csv = Papa.unparse(renamedData);
          const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.setAttribute("download", `boxplot_${color}.csv`);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }}
      >
        Download Boxplot Data
      </Button>
</div>


  ) : (
    <p className="text-gray-500">Select a gene to visualize its expression across groups in a boxplot.</p>
  )}
</div>


    <div className="mt-10">
      <h2 className="font-bold text-lg mb-4">Expression Heatmap</h2>
      {loadingHeatmap || !heatmapData?.data ? (

        <LoadingIndicator message = "Preparing top group markers ..." />

      ) : (
      <div>
        <div className = "mb-4">
            <Plot
                data={
                  heatmapData?.filteredMarkers
                    ? [
                        {
                          ...heatmapData.data[0],
                          x: heatmapData.data[0].x.filter((gene) =>
                            heatmapData.filteredMarkers.includes(gene)
                          ),
                          z: heatmapData.data[0].z.map((row) =>
                            heatmapData.data[0].x
                              .map((gene, i) =>
                                heatmapData.filteredMarkers.includes(gene) ? row[i] : null
                              )
                              .filter((val) => val !== null)
                          ),
                          customdata: heatmapData.data[0].customdata.map((row) =>
                            heatmapData.data[0].x
                              .map((gene, i) =>
                                heatmapData.filteredMarkers.includes(gene) ? row[i] : null
                              )
                              .filter((val) => val !== null)
                          ),
                        },
                      ]
                    : heatmapData.data
                }
                layout={{
                  ...heatmapData.layout,
                  paper_bgcolor: resolvedTheme === "dark" ? "#111" : "#fff",
                  plot_bgcolor: resolvedTheme === "dark" ? "#111" : "#fff",
                  font: { color: resolvedTheme === "dark" ? "#fff" : "#000" },
                  margin: {
                    l: 180,
                    r: 40,
                    t: 60,
                    b: 60,
                  },
                }}
                config={{ responsive: true }}
                style={{ width: "100%", height: "600px" }}
              />
        </div>

        <Button
          onClick={() => {
        const csv = Papa.unparse(heatmapData.full_table);
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.setAttribute("download", "de_results.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
          }}
        >
          Download Heatmap Data
        </Button>
      </div>
    )}
    </div>


    <div className="mt-10">
  <h2 className="font-bold text-lg mb-4">Group-Level Correlation Matrix</h2>
  {loadingHeatmap || !heatmapData?.correlation_matrix ? (
    <LoadingIndicator message="Preparing correlation matrix ..." />
  ) : (
    <div>
      <div className="mb-4">
  <Plot
    data={[
      {
        z: heatmapData?.correlation_matrix?.values,  // Access the correlation values
        x: heatmapData?.correlation_matrix?.labels,  // X-axis as the correlation matrix labels (groups)
        y: heatmapData?.correlation_matrix?.labels,  // Y-axis as the correlation matrix labels (groups)
        type: "heatmap",
        colorscale:  [
          [0, "rgb(0, 0, 255)"],    // blue at lowest (-1)
          [0.5, "rgb(255, 255, 255)"],  // white at 0
          [1, "rgb(255, 0, 0)"]     // red at highest (+1)
        ],
        zmin: -1,         // Set minimum value for correlation (to align with blue)
        zmax: 1,          // Set maximum value for correlation (to align with red)
        colorbar: {
          title: 'Correlation',
          tickvals: [-1, 0, 1],
          ticktext: ['-1', '0', '1'],
        },
        hovertemplate: "Group: %{y}<br>Group: %{x}<br>Correlation: %{z:.2f}<extra></extra>",  // Adjust hover info
      },
    ]}
    layout={{
      title: `Group-Level Correlation Matrix (Grouped by ${groupby})`,
      xaxis: {
        title: "",
        tickangle: -45,
        automargin: true,
        type: "category", // Treat the x-axis as categorical (discrete)
      },
      yaxis: {
        title: "",
        automargin: true,
        autorange: "reversed",  // To ensure the matrix is displayed with the first group at the top
        type: "category", // Treat the y-axis as categorical (discrete)
      },
      paper_bgcolor: resolvedTheme === "dark" ? "#111" : "#fff",
      plot_bgcolor: resolvedTheme === "dark" ? "#111" : "#fff",
      font: { color: resolvedTheme === "dark" ? "#fff" : "#000" },
      margin: {
        l: 180,
        r: 40,
        t: 60,
        b: 60,
      },
      height: 600,
    }}
    config={{ responsive: true }}
    style={{ width: "100%", height: "600px" }}
  />
</div>
            <Button
        className="mt-4"
        onClick={() => {
          const correlation = heatmapData?.correlation_matrix;
          if (!correlation?.values || !correlation?.labels) return;

          const { values, labels } = correlation;

          // Flatten for CSV
          const flatData = [];
          for (let i = 0; i < labels.length; i++) {
            for (let j = 0; j < labels.length; j++) {
              flatData.push({
                group1: labels[i],
                group2: labels[j],
                correlation: values[i][j],
              });
            }
          }

          const csv = Papa.unparse(flatData);
          const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.setAttribute("download", "correlation_matrix.csv");
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }}
      >
        Download Correlation Matrix
      </Button>
  </div>
  )}
</div>



    </div>


  );

  




}

export default AxiosGetRequest