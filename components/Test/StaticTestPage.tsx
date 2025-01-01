"use client"
import React , { useEffect, useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import SectionTitle from '../Common/SectionTitle';

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



export default function StaticTestPage({ selectedBarcodeId }) {
  
  const static_url = "http://0.0.0.0:8000"; // "https://hts-biosensor-plumber-353269782212.us-central1.run.app";
  const [cellPic, setCellPic] = useState<string | null>(null);

  useEffect(() => {
    const fetchCellPic = async () => {
      
      const cellPic_url = `${static_url}/cellpic`;

      const response = await axios.get(cellPic_url, {
        responseType: 'arraybuffer',
        headers: {
          'Content-Type': 'image/png',
          'Accept': 'image/png'
        },
        params: { id: selectedBarcodeId }
      });

      let blob = new Blob(
        [response.data],
        { type: response.headers['content-type'] }
      );

      let image = window.URL.createObjectURL(blob);
      setCellPic(image);
    };

    fetchCellPic();
  }, [selectedBarcodeId]);

  return (
    <>

      <section id="contact" className="pt-16 md:pt-20 lg:pt-24">
        <div className="container">
          <div className="border-b border-body-color/[.15] pb-4 dark:border-white/[.15] md:pb-6 lg:pb-8">
            <div className="-mx-4 flex flex-wrap items-center justify-center">
              <div className="w-full section-animation px-4">
                <div className="flex flex-wrap items-center justify-start w-full">
                <SectionTitle title={selectedBarcodeId} paragraph={`some text`} />
                </div>
                <div>
                  <div>Cell Pic:</div>
                  <img src={cellPic} />
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
