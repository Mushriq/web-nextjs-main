"use client"
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
// componentRef.current

const  Example = () => {
  const contentRef = useRef();
  const reactToPrintFn = useReactToPrint({ contentRef });
  
  return (
    <div >
    <button onClick={() => reactToPrintFn()}> 
      PRINT ME
    </button>
    <div ref={contentRef}>Hello World</div> 
  </div>
  );
};

export default Example;