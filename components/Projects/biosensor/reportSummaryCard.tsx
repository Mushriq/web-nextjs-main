import React from 'react';
import { Card, CardHeader, CardBody, Typography, Tooltip } from '@material-tailwind/react';
import Image from 'next/image';


const ReportSummaryCard = ({ selectedSample, cellPic, print = false }) => {

  return (
    <>
    
    <div className={`flex flex-col figure-animation-appear col-span-full lg:col-span-full lg:row-start-1 lg:row-span-1 bg-white shadow-md rounded-xl ${selectedSample
                          ? "block"
                          : "hidden"
                      }
                  `}>

              
<Card className={`w-full ${print ? "flex-col place-items-center h-[970px]" : "flex-col  h-full "} lg:flex-row overflow-scroll`}>
      <CardHeader
        shadow={false}
        floated={false}
        className={` ${print ? "max-w-[256px] max-h-[256px]" : "w-full"}  m-0 lg:w-1/2 shrink-0 rounded-r-none`}
      >
      <img className={`h-full w-full object-cover  ${print ? "rounded-full py-1 px-1" : " py-4 px-4 "}`}  src={cellPic} />
      </CardHeader>
      <CardBody className="w-full">
        <Typography variant="h4" color="black" className={`${print ? "mb-1" : " mb-2 "} uppercase w-full`}>
          Sample: {selectedSample?.sk_id} ({selectedSample?.imaging_barcode})
        </Typography>
        <Typography variant="h5" color="gray" className={`${print ? "mb-1" : " mb-4 "} uppercase w-full`}>
          Clinical ID: {selectedSample?.clinical_id} ({selectedSample?.age_at_sample_collection}{selectedSample?.sex})
        </Typography>

        <div className = {`size-8 ${print ? "gap-1 mb-2" : "gap-4 mb-8"} flex flex-row w-full justify-start`}>
          
          <img
                              src="/images/bits/body_site.svg"
                              alt="Tx"
                              className="block"
                              width={32}
                              height={32}
                            />

           <div className = "block w-full">{selectedSample?.anatomic_tumor_type}</div>
          


          <img
                              src="/images/bits/drug_pill.svg"
                              alt="Tx"
                              className="block"
                              width={32}
                              height={32}
                            />

           <div className = "block w-full">{selectedSample?.treatment}</div>
          

        </div>

        <div className="flex flex-wrap justify-between">

          <div className="block w-1/3">
          <Typography color="gray" className="mb-0 font-normal w-full uppercase">
          PD-L1
        </Typography>
        <Typography color="gray" className="mb-8 font-small w-full">
          {selectedSample?.pd_l1}
        </Typography>
          </div>

          <div className="block w-1/3">
          <Typography color="gray" className="mb-0 font-normal w-full uppercase">
          HER2
        </Typography>
        <Typography color="gray" className="mb-8 font-small w-full">
          {selectedSample?.her2}
        </Typography>
          </div>

          <div className="block w-1/3">
          <Typography color="gray" className="mb-0 font-normal w-full uppercase">
          MMR
        </Typography>
        <Typography color="gray" className="mb-8 font-small w-full">
          {selectedSample?.mmr}
        </Typography>
          </div>



        </div>
        <Typography color="gray" className="mb-0 font-normal w-full uppercase">
          Molecular Notes
        </Typography>
        <Typography color="gray" className="mb-8 font-small w-full">
          {selectedSample?.molecular_notes}
        </Typography>

        
        

        <div className = {`grid ${print ? "grid-cols-3 gap-0" : "grid-cols-2 md:grid-cols-3  gap-2"} w-full place-items-center items-center justify-center`}>

        <Tooltip placement="top"       
          className="border border-blue-gray-50 bg-white px-4 py-3 shadow-xl shadow-black/10"
          content={
        <div className="w-80">
          <Typography color="blue-gray" className="font-medium">
            Days Since Collection
          </Typography>
          <Typography
            variant="small"
            color="blue-gray"
            className="font-normal opacity-80"
          >
            The number of days between collection at clinic and start of imaging.
          </Typography>
        </div>
      }>
        <div className={`relative size-32 `}>
              <svg className="rotate-180 size-full" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                <circle cx="18" cy="18" r="16" fill="none" className={`stroke-current text-gray-200`} strokeWidth="1" strokeDasharray={`50 100`} strokeLinecap="round"></circle>
                <circle cx="18" cy="18" r="16" fill="none" className={`stroke-current 
                  

                ${selectedSample?.delta_days !== 'NA' ? "block" : "hidden"}
               

                ${parseInt(selectedSample?.delta_days) == 0
                  ? "text-light-blue-500" 
                  : parseInt(selectedSample?.delta_days) == 1
                ? "text-green-600" 
                : parseInt(selectedSample?.delta_days) == 2 
                ? "text-amber-600" 
                : selectedSample?.delta_days !== 'NA' 
                ? "text-red-600"
                : "text-gray-600"}
                
                `} strokeWidth="1.5" strokeDasharray={`${0.5*100*selectedSample?.delta_days/3} 100`} strokeLinecap="round"></circle>
              </svg>
              <div className="absolute top-9 start-1/2 transform -translate-x-1/2 -translate-y-1/5 text-center">
                <span className={`text-2xl font-bold 

                ${parseInt(selectedSample?.delta_days) == 0
                  ? "text-light-blue-500" 
                  : parseInt(selectedSample?.delta_days) == 1
                ? "text-green-600" 
                : parseInt(selectedSample?.delta_days) == 2 
                ? "text-amber-600" 
                : selectedSample?.delta_days !== 'NA' 
                ? "text-red-600"
                : "text-gray-600"}
                
                `}>{selectedSample?.delta_days}<span className="text-xs">{selectedSample?.delta_days === "1" ? " day" : " days"}</span></span>
                <span className={`block text-xs   

                ${parseInt(selectedSample?.delta_days) == 0
                  ? "text-light-blue-500" 
                  : parseInt(selectedSample?.delta_days) == 1
                ? "text-green-600" 
                : parseInt(selectedSample?.delta_days) == 2 
                ? "text-amber-600" 
                : selectedSample?.delta_days !== 'NA' 
                ? "text-red-600"
                : "text-gray-600"}

                `}>Since Collection</span>
              </div>
            </div>
      </Tooltip>

      <Tooltip placement="top"       
          className="border border-blue-gray-50 bg-white px-4 py-3 shadow-xl shadow-black/10"
          content={
        <div className="w-80">
          <Typography color="blue-gray" className="font-medium">
            Starting Viability
          </Typography>
          <Typography
            variant="small"
            color="blue-gray"
            className="font-normal opacity-80"
          >
            This is the Countess measurement of viability after all processing steps are done.
          </Typography>
        </div>
      }>
        <div className={`relative size-32 `}>
              <svg className="rotate-180 size-full" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                <circle cx="18" cy="18" r="16" fill="none" className={`stroke-current text-gray-200`} strokeWidth="1" strokeDasharray={`50 100`} strokeLinecap="round"></circle>
                <circle cx="18" cy="18" r="16" fill="none" className={`stroke-current 
                
                
                 ${selectedSample?.post_process_viability_percent !== 'NA' ? "block" : "hidden"}
               

                ${parseFloat(selectedSample?.post_process_viability_percent) > 97.5
                  ? "text-light-blue-500" 
                  : parseFloat(selectedSample?.post_process_viability_percent) > 90
                ? "text-green-600" 
                : parseFloat(selectedSample?.post_process_viability_percent) > 80 
                ? "text-amber-600" 
                : selectedSample?.post_process_viability_percent !== 'NA' 
                ? "text-red-600"
                : "text-gray-600"}
                
                `} strokeWidth="1.5" strokeDasharray={`${0.5*selectedSample?.post_process_viability_percent} 100`} strokeLinecap="round"></circle>
              </svg>
              <div className="absolute top-9 start-1/2 transform -translate-x-1/2 -translate-y-1/5 text-center">
                <span className={`text-2xl font-bold 

                ${parseFloat(selectedSample?.post_process_viability_percent) > 97.5
                  ? "text-light-blue-500" 
                  : parseFloat(selectedSample?.post_process_viability_percent) > 90
                ? "text-green-600" 
                : parseFloat(selectedSample?.post_process_viability_percent) > 80 
                ? "text-amber-600" 
                : selectedSample?.post_process_viability_percent !== 'NA' 
                ? "text-red-600"
                : "text-gray-600"}
                
                `}>{selectedSample?.post_process_viability_percent}<span className="text-xs">%</span></span>
                <span className={`block text-xs   

                ${parseFloat(selectedSample?.post_process_viability_percent) > 97.5
                  ? "text-light-blue-500" 
                  : parseFloat(selectedSample?.post_process_viability_percent) > 90
                ? "text-green-600" 
                : parseFloat(selectedSample?.post_process_viability_percent) > 80 
                ? "text-amber-600" 
                : selectedSample?.post_process_viability_percent !== 'NA' 
                ? "text-red-600"
                : "text-gray-600"}


                `}>Starting Viability</span>
              </div>
            </div>
          </Tooltip>

          <Tooltip placement="top"       
          className="border border-blue-gray-50 bg-white px-4 py-3 shadow-xl shadow-black/10"
          content={
        <div className="w-80">
          <Typography color="blue-gray" className="font-medium">
            Average Cell Diameter
          </Typography>
          <Typography
            variant="small"
            color="blue-gray"
            className="font-normal opacity-80"
          >
            Average cell size of viable cells only. Line indicates percentile rank among all experiments.
          </Typography>
        </div>
      }>
            <div className={`relative size-32 `}>
              <svg className="rotate-180 size-full" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                <circle cx="18" cy="18" r="16" fill="none" className={`stroke-current text-gray-200`} strokeWidth="1" strokeDasharray={`50 100`} strokeLinecap="round"></circle>
                <circle cx="18" cy="18" r="16" fill="none" className={`stroke-current 
                
                 ${selectedSample?.post_process_diameter !== 'NA' ? "block" : "hidden"}
               

                ${parseFloat(selectedSample?.diameter_percentile) > 0.9
                  ? "text-light-blue-500" 
                  : parseFloat(selectedSample?.diameter_percentile) > 0.6
                ? "text-green-600" 
                : parseFloat(selectedSample?.diameter_percentile) > 0.4
                ? "text-amber-600" 
                : selectedSample?.post_process_diameter !== 'NA' 
                ? "text-red-600"
                : "text-gray-600"}
                
                `} strokeWidth="1.5" strokeDasharray={`${0.5*100*selectedSample?.diameter_percentile} 100`} strokeLinecap="round"></circle>
              </svg>
              <div className="absolute top-9 start-1/2 transform -translate-x-1/2 -translate-y-1/5 text-center">
                <span className={`text-2xl font-bold 

                ${parseFloat(selectedSample?.diameter_percentile) > 0.9
                  ? "text-light-blue-500" 
                  : parseFloat(selectedSample?.diameter_percentile) > 0.6
                ? "text-green-600" 
                : parseFloat(selectedSample?.diameter_percentile) > 0.4
                ? "text-amber-600" 
                : selectedSample?.post_process_diameter !== 'NA' 
                ? "text-red-600"
                : "text-gray-600"}
                
                `}>{selectedSample?.post_process_diameter}<span className="text-xs">μm</span></span>
                <span className={`block text-xs   

                ${parseFloat(selectedSample?.diameter_percentile) > 0.9
                  ? "text-light-blue-500" 
                  : parseFloat(selectedSample?.diameter_percentile) > 0.6
                ? "text-green-600" 
                : parseFloat(selectedSample?.diameter_percentile) > 0.4
                ? "text-amber-600" 
                : selectedSample?.post_process_diameter !== 'NA' 
                ? "text-red-600"
                : "text-gray-600"}

                `}>Average Diameter</span>
                        


              </div>
            </div>
          </Tooltip>


          <Tooltip placement="top"       
          className="border border-blue-gray-50 bg-white px-4 py-3 shadow-xl shadow-black/10"
          content={
        <div className="w-80">
          <Typography color="blue-gray" className="font-medium">
            Starting EPCAM+ Cells
          </Typography>
          <Typography
            variant="small"
            color="blue-gray"
            className="font-normal opacity-80"
          >
            The median per-well EPCAM+ TMRM+ total cell count (from 6 fields of view per well) from live staining. We use the 4-hour timepoint to allow TMRM time to activate. Line indicates percentile rank among all experiments.
          </Typography>
        </div>
      }>
            <div className={`relative size-32 `}>
              <svg className="rotate-180 size-full" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                <circle cx="18" cy="18" r="16" fill="none" className={`stroke-current text-gray-200`} strokeWidth="1" strokeDasharray={`50 100`} strokeLinecap="round"></circle>
                <circle cx="18" cy="18" r="16" fill="none" className={`stroke-current 
                  
                ${selectedSample?.start_tumor_alive_labelled !== 'NA' ? "block" : "hidden"}
                

                ${parseFloat(selectedSample?.start_tumor_alive_labelled_percentile) > 0.75
                  ? "text-light-blue-500" 
                  : parseFloat(selectedSample?.start_tumor_alive_labelled_percentile) > 0.5
                ? "text-green-600" 
                : parseFloat(selectedSample?.start_tumor_alive_labelled_percentile) > 0.4
                ? "text-amber-600" 
                : selectedSample?.start_tumor_alive_labelled !== 'NA' 
                ? "text-red-600"
                : "text-gray-600"}
                
                `} strokeWidth="1.5" strokeDasharray={`${0.5*100*selectedSample?.start_tumor_alive_labelled_percentile} 100`} strokeLinecap="round"></circle>
              </svg>
              <div className="absolute top-9 start-1/2 transform -translate-x-1/2 -translate-y-1/5 text-center">
                <span className={`text-2xl font-bold 

                ${parseFloat(selectedSample?.start_tumor_alive_labelled_percentile) > 0.75
                  ? "text-light-blue-500" 
                  : parseFloat(selectedSample?.start_tumor_alive_labelled_percentile) > 0.5
                ? "text-green-600" 
                : parseFloat(selectedSample?.start_tumor_alive_labelled_percentile) > 0.4
                ? "text-amber-600" 
                : selectedSample?.start_tumor_alive_labelled !== 'NA' 
                ? "text-red-600"
                : "text-gray-600"}
                
                `}>{selectedSample?.start_tumor_alive_labelled}<span className="text-xs">cells</span></span>
                <span className={`block text-xs   

                ${parseFloat(selectedSample?.start_tumor_alive_labelled_percentile) > 0.75
                  ? "text-light-blue-500" 
                  : parseFloat(selectedSample?.start_tumor_alive_labelled_percentile) > 0.5
                ? "text-green-600" 
                : parseFloat(selectedSample?.start_tumor_alive_labelled_percentile) > 0.4
                ? "text-amber-600" 
                : selectedSample?.start_tumor_alive_labelled !== 'NA' 
                ? "text-red-600"
                : "text-gray-600"}

                `}>EPCAM+ per Well</span>
              </div>
            </div>
        </Tooltip>


        <Tooltip placement="top"       
          className="border border-blue-gray-50 bg-white px-4 py-3 shadow-xl shadow-black/10"
          content={
        <div className="w-80">
          <Typography color="blue-gray" className="font-medium">
            Z&apos; Factor
          </Typography>
          <Typography
            variant="small"
            color="blue-gray"
            className="font-normal opacity-80"
          >
            Assay performance metric using label-free inference of log-fold changes in viable cancer count between Bortezomib and DMSO. Line indicates percentile rank among all experiments.
          </Typography>
        </div>
      }>
            <div className={`relative size-32 `}>
              <svg className="rotate-180 size-full" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                <circle cx="18" cy="18" r="16" fill="none" className={`stroke-current text-gray-200`} strokeWidth="1" strokeDasharray={`50 100`} strokeLinecap="round"></circle>
                <circle cx="18" cy="18" r="16" fill="none" className={`stroke-current 
                
                ${selectedSample?.control_delta_logfc_labelled !== 'NA' ? "block" : "hidden"}
                
                ${parseFloat(selectedSample?.control_delta_logfc_labelled) > 0.5
                  ? "text-light-blue-500" 
                  : parseFloat(selectedSample?.control_delta_logfc_labelled) > 0.3
                ? "text-green-600" 
                : parseFloat(selectedSample?.control_delta_logfc_labelled) > 0
                ? "text-amber-600" 
                : selectedSample?.control_delta_logfc_labelled !== 'NA' 
                ? "text-red-600"
                : "text-gray-600"}
                
                `} strokeWidth="1.5" strokeDasharray={`${0.5*100*selectedSample?.control_delta_logfc_labelled_percentile} 100`} strokeLinecap="round"></circle>
              </svg>
              <div className="absolute top-9 start-1/2 transform -translate-x-1/2 -translate-y-1/5 text-center">
                <span className={`text-2xl font-bold 

                ${parseFloat(selectedSample?.control_delta_logfc_labelled) > 0.5
                  ? "text-light-blue-500" 
                  : parseFloat(selectedSample?.control_delta_logfc_labelled) > 0.3
                ? "text-green-600" 
                : parseFloat(selectedSample?.control_delta_logfc_labelled) > 0
                ? "text-amber-600" 
                : selectedSample?.control_delta_logfc_labelled !== 'NA' 
                ? "text-red-600"
                : "text-gray-600"}
                
                `}>{selectedSample?.control_delta_logfc_labelled}</span>
                <span className={`block text-xs   

                ${parseFloat(selectedSample?.control_delta_logfc_labelled) > 0.5
                  ? "text-light-blue-500" 
                  : parseFloat(selectedSample?.control_delta_logfc_labelled) > 0.3
                ? "text-green-600" 
                : parseFloat(selectedSample?.control_delta_logfc_labelled) > 0
                ? "text-amber-600" 
                : selectedSample?.control_delta_logfc_labelled !== 'NA' 
                ? "text-red-600"
                : "text-gray-600"}

                `}>Z&apos; Factor</span>
              </div>
            </div>
        </Tooltip>





        <Tooltip placement="top"       
          className="border border-blue-gray-50 bg-white px-4 py-3 shadow-xl shadow-black/10"
          content={
        <div className="w-80">
          <Typography color="blue-gray" className="font-medium">
            Prediction Correlation
          </Typography>
          <Typography
            variant="small"
            color="blue-gray"
            className="font-normal opacity-80"
          >
            The pearson correlation between inferred label-free and fluorescence-based count of viable cancer cells per well in stained wells only at 24 hours. We use the 24-hour timepoint as fluorescence signal drops in some samples beyond ~30 hours.
          </Typography>
        </div>
      }>
            <div className={`relative size-32 `}>
              <svg className="rotate-180 size-full" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                <circle cx="18" cy="18" r="16" fill="none" className={`stroke-current text-gray-200`} strokeWidth="1" strokeDasharray={`50 100`} strokeLinecap="round"></circle>
                <circle cx="18" cy="18" r="16" fill="none" className={`stroke-current 
                 
                 ${selectedSample?.correlation !== 'NA' ? "block" : "hidden"}
                
                ${parseFloat(selectedSample?.correlation) > 0.75
                  ? "text-light-blue-500" 
                  : parseFloat(selectedSample?.correlation) > 0.5
                ? "text-green-600" 
                : parseFloat(selectedSample?.correlation) > 0.25
                ? "text-amber-600" 
                : selectedSample?.correlation !== 'NA' 
                ? "text-red-600"
                : "text-gray-600"}
                
                `} strokeWidth="1.5" strokeDasharray={`${0.5*100*(selectedSample?.correlation < 0 ? 0 : selectedSample?.correlation)} 100`} strokeLinecap="round"></circle>
              </svg>
              <div className="absolute top-9 start-1/2 transform -translate-x-1/2 -translate-y-1/5 text-center">
                <span className={`text-2xl font-bold 

                ${parseFloat(selectedSample?.correlation) > 0.75
                  ? "text-light-blue-500" 
                  : parseFloat(selectedSample?.correlation) > 0.5
                ? "text-green-600" 
                : parseFloat(selectedSample?.correlation) > 0.25
                ? "text-amber-600" 
                : selectedSample?.correlation !== 'NA' 
                ? "text-red-600"
                : "text-gray-600"}
                
                `}>{selectedSample?.correlation}</span>
                <span className={`block text-xs   

                ${parseFloat(selectedSample?.correlation) > 0.75
                  ? "text-light-blue-500" 
                  : parseFloat(selectedSample?.correlation) > 0.5
                ? "text-green-600" 
                : parseFloat(selectedSample?.correlation) > 0.25
                ? "text-amber-600" 
                : selectedSample?.correlation !== 'NA' 
                ? "text-red-600"
                : "text-gray-600"}

                `}>Prediction Correlation</span>
              </div>
            </div>
        </Tooltip>


        </div>
        
        <Typography color="gray" className="mb-0 font-normal w-full uppercase">
          Sample Comments
        </Typography>
        <Typography color="gray" className="mb-8 font-small w-full">
          {selectedSample?.process_comments}
        </Typography>
      </CardBody>
    </Card>





            </div>

    </>
  );
};

export default ReportSummaryCard;
