"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { Radio, Button } from "@material-tailwind/react";
import { useRef } from "react";


export default class BiosensorPlot extends React.Component {

 
  state = {
    plot_loading: "Loading ...",
    plot_height: 4,
    plot_width: 4,
    plot_data: [],
  }
    
  

  handleChange = (e) => {
    this.setState({ plot_width:e.target.value});
  }

  componentDidMount() {

    this.Plot();

  }


  Plot(){
    
    this.setState({ plot_loading:"Loading ..."});

    axios.get("https://api.iconify.design/fluent-emoji-flat/alarm-clock.svg", 
      {
        params: {
          width: this.state.plot_width*10,
          height: this.state.plot_height*10
        }
      }
    )
      .then(response => {
        const plot_input_data = response.data;
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

  render() {
    return (
      <>
        <div>Choose Width:</div>
        <div className="flex flex-wrap gap-10">
          <Radio name="type" label="Sample 1 (2403)" value="000012112403" onChange={this.handleChange} defaultChecked />
          <Radio name="type" label="Sample 2 (2603)" value="000012112603" onChange={this.handleChange} />
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
        dangerouslySetInnerHTML={{ __html: this.state.plot_data }} />
        
      </>

    )
  }
}