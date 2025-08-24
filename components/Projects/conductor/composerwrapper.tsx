"use client";

import WorkflowComposer from "./WorkflowComposer";
import ResultPortal from "./ResultPortal";

const WrapperComponent = () => {
  return (
    <div className="py-4 space-y-10">
      <WorkflowComposer />
      <ResultPortal />
    </div>
  );
};

export default WrapperComponent;
