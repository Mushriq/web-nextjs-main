"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { Button, Select, Option } from "@material-tailwind/react";
import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'


export function ControlledSelect() {
    
    const [value, setValue] = React.useState("react");
   


    return (
      <div className="w-72">
        <Select
          label="Select Version"
          value={value}
          onChange={(val) => setValue(val)}
        >
          <Option value="html">Material Tailwind HTML</Option>
          <Option value="react">Material Tailwind React</Option>
          <Option value="vue">Material Tailwind Vue</Option>
          <Option value="angular">Material Tailwind Angular</Option>
          <Option value="svelte">Material Tailwind Svelte</Option>
        </Select>
      </div>
    );
}

export default class BarcodesPlotter extends React.Component {

  state = {
    plot_loading: "Loading ...",
    plot_height: 4,
    plot_width: 4,
    plot_data: [],
    plot_selectedBarcode: ""
  }
    
  

  handleChange = (e) => {
    this.setState({ plot_width:e.target.value});
  }

  componentDidMount() {

    this.Plot();

  }


  Plot(){
    
    this.setState({ plot_loading:"Loading ..."});

    axios.get("http://localhost:8000/list",      // `https://api.iconify.design/fluent-emoji-flat/alarm-clock.svg`,
      {
        params: {

        }
      }
    )
      .then(response => {
        const plot_input_data = JSON.parse(response.data);
        this.setState({ plot_data: plot_input_data });
      }).finally(() => {
        this.setState({ plot_loading:""});
      });


  }


  redrawPlot = () => {

    // this.setState({ plot_height: this.state.plot_height*100 });
   this.setState({ plot_loading:"Loading ..."});

    this.Plot();


  }

  setNewBarcode = (val) => {
    this.setState({ plot_selectedBarcode: val });
  }
  
  render() {
    return (
      <>
        <div>Choose Width:</div>
        <div className="flex flex-wrap gap-10">
          <Button name="draw" onClick={this.redrawPlot}>ReDraw Plot</Button>
        <div>
      </div>
        </div>
        
        <div>{this.state.plot_loading}</div>
        <div  className={` ${this.state.plot_loading === "Loading ..."
                                ? "hidden"
                                : "block"
                            }
                        `}
        >
        <div className="py-8 w-72">
        <Select
          label="Select Barcode"
          value={this.state.plot_selectedBarcode}
          onChange={(val) => this.setNewBarcode(val)}
          selected={(val) => {return val}}
        >
            {this.state.plot_data.map((barcodeID, index) => 
        <Option key = {index} value = {barcodeID.imaging_barcode}>{barcodeID.imaging_barcode}</Option>)}
          <Option value="blank">Blank</Option>
        </Select>
      </div>
      {this.state.plot_selectedBarcode}
        
        </div>


        
      </>

    )
  }
}