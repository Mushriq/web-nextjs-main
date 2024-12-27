"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { Radio, Button, select } from "@material-tailwind/react";
 

export default class DynamicPlot extends React.Component {

  state = {
    plot_loading: "Loading ...",
    plot_height: 4,
    plot_width: 4,
    plot_data: []
  }
    
  

  handleChange = (e) => {
    this.setState({ plot_width:e.target.value});
  }

  componentDidMount() {

    this.Plot();

  }


  Plot(){
    
    this.setState({ plot_loading:"Loading ..."});

    axios.get("http://localhost:8000/plot",      // `https://api.iconify.design/fluent-emoji-flat/alarm-clock.svg`,
      {
        params: {
          width: this.state.plot_width,
          height: this.state.plot_height
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
        <div className="flex gap-10">
          <Radio name="type" label="set to 4" value="4" onChange={this.handleChange} defaultChecked />
          <Radio name="type" label="set to 8" value="8" onChange={this.handleChange} />
          <Button name="draw" onClick={this.redrawPlot}>ReDraw Plot</Button>

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