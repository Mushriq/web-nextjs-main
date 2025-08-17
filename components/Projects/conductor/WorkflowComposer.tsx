"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";

type WorkflowStep = {
  id: string;
  operation: string;
  operation_label: string;
  method: string;
  method_label: string;
  device: string;
  device_label: string;
  duration?: number;
};

type AllowedStep = {
  operation: string;
  method: string;
  device: string;
  operation_label: string;
  method_label: string;
  device_label: string;
};

export default function WorkflowComposer() {
  const [steps, setSteps] = useState<WorkflowStep[]>([]);
  const [allowedSteps, setAllowedSteps] = useState<AllowedStep[]>([]);
  const [selectingStepIndex, setSelectingStepIndex] = useState<number | null>(
    null
  );

  const [projectId, setProjectId] = useState("");
  const [experimentId, setExperimentId] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [sourcePlateName, setSourcePlateName] = useState("");

  // menu + edit dialog state
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [menuStepIndex, setMenuStepIndex] = useState<number | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedStep, setSelectedStep] = useState<WorkflowStep | null>(null);

  useEffect(() => {
    axios
      .get(
        "https://conductor-sync-api-353269782212.us-central1.run.app/api/allowed-steps"
      )
      .then((res) => setAllowedSteps(res.data))
      .catch(() => alert("Failed to load allowed steps."));
  }, []);

  const reorder = (
    list: WorkflowStep[],
    startIndex: number,
    endIndex: number
  ) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    setSteps((prev) => reorder(prev, result.source.index, result.destination.index));
  };

  // add new step (empty, triggers tile select)
  const handleAddStep = () => {
    setSteps((prev) => [
      ...prev,
      { id: crypto.randomUUID(), operation: "", operation_label: "", method: "", method_label: "", device: "", device_label: "" },
    ]);
    setSelectingStepIndex(steps.length);
  };

  const groupedByOperation = allowedSteps.reduce((acc, step) => {
    if (!acc[step.operation_label]) acc[step.operation_label] = [];
    acc[step.operation_label].push(step);
    return acc;
  }, {} as Record<string, AllowedStep[]>);

  const handleSelectOperation = (operation: string, operation_label: string) => {
    setSteps((prev) => {
      const updated = [...prev];
      updated[selectingStepIndex!] = {
        ...updated[selectingStepIndex!],
        operation,
        operation_label,
        method: "",
        device: "",
      };
      return updated;
    });
  };

  const handleSelectMethod = (method: string, device: string, method_label: string, device_label: string) => {
    setSteps((prev) => {
      const updated = [...prev];
      const step = updated[selectingStepIndex!];

      if (step.operation === "Incubate") {
        step.method = "";
        step.method_label = method_label;
        step.device = device;
        step.device_label = device_label;
        step.duration = 0;
      } else {
        step.method = method;
        step.method_label = method_label;
        step.device = device;
        step.device_label = device_label;
        step.duration = undefined;
        setSelectingStepIndex(null);
      }

      updated[selectingStepIndex!] = step;
      return updated;
    });
  };

  const handleSetDuration = (duration: number, device: string, method_label: string) => {
    setSteps((prev) => {
      const updated = [...prev];
      const step = updated[selectingStepIndex!];
      step.duration = duration;
      step.method = String(duration); // send duration as string for API
      step.method_label = `${method_label} for ${duration} mins`;
      step.device = device;
      updated[selectingStepIndex!] = step;
      return updated;
    });
    setSelectingStepIndex(null);
  };

  // menu handlers
  const handleMenuClose = () => {
    setMenuAnchor(null);
    setMenuStepIndex(null);
  };

  const handleEditStep = () => {
    if (menuStepIndex !== null) {
      setSelectedStep({ ...steps[menuStepIndex] });
      setEditDialogOpen(true);
    }
    handleMenuClose();
  };

  const handleDeleteStep = () => {
    if (menuStepIndex !== null) {
      setSteps((prev) => prev.filter((_, i) => i !== menuStepIndex));
    }
    handleMenuClose();
  };

  const handleEditSave = () => {
    if (menuStepIndex !== null && selectedStep) {
      setSteps((prev) =>
        prev.map((step, idx) =>
          idx === menuStepIndex ? { ...selectedStep } : step
        )
      );
    }
    setEditDialogOpen(false);
    setMenuStepIndex(null);   // reset
    setSelectedStep(null);    // reset
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        project_id: projectId.trim(),
        experiment_id: experimentId.trim(),
        created_by: createdBy.trim(),
        source_plate_name: sourcePlateName.trim(),
        steps: steps.map((s) => ({
          operation: s.operation,
          method: s.method,
          device: s.device,
        })),
      };

      await axios.post(
        "https://conductor-sync-api-353269782212.us-central1.run.app/api/workflows/append-csv",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      alert("Workflow submitted successfully!");
      setSteps([]);
      setProjectId("");
      setExperimentId("");
      setCreatedBy("");
      setSourcePlateName("");
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        alert(`Error: ${err.response?.data || err.message}`);
      } else {
        alert(`Unexpected error: ${err}`);
      }
    }
  };

  const formComplete =
    projectId.trim() !== "" &&
    experimentId.trim() !== "" &&
    createdBy.trim() !== "" &&
    sourcePlateName.trim() !== "" &&
    steps.length > 0;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Workflow Composer</h1>

      {/* metadata form */}
      <div className="space-y-4 mb-6">
        <TextField label="Project ID" value={projectId} onChange={(e) => setProjectId(e.target.value)} fullWidth />
        <TextField label="Experiment ID" value={experimentId} onChange={(e) => setExperimentId(e.target.value)} fullWidth />
        <TextField label="Created By" value={createdBy} onChange={(e) => setCreatedBy(e.target.value)} fullWidth />
        <TextField label="Source Plate Name" value={sourcePlateName} onChange={(e) => setSourcePlateName(e.target.value)} fullWidth />
      </div>

      {/* drag + step list */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable
          droppableId="steps-list"
          direction="vertical"
          isDropDisabled={false}
          isCombineEnabled={false}
          ignoreContainerClipping={false}
        >

          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {steps.map((step, index) => (
                <Draggable key={step.id} draggableId={step.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`border rounded p-4 mb-3 bg-white shadow ${
                        snapshot.isDragging ? "opacity-80 shadow-lg" : ""
                      }`}
                    >
                      {/* if empty step: show tile options */}
                      {selectingStepIndex === index && step.operation === "" && (
                        <div>
                          <h3 className="font-semibold mb-2">Choose Operation:</h3>
                          <div className="grid grid-cols-2 gap-2">
                            {Object.keys(groupedByOperation).map((opLabel) => (
                            <Button
                              key={opLabel}
                              variant="outlined"
                              onClick={() =>
                                handleSelectOperation(
                                  groupedByOperation[opLabel][0].operation,
                                  groupedByOperation[opLabel][0].operation_label
                                )
                              }
                              sx={{
                                borderColor: "#6721b4",
                                color: "#6721b4",
                                "&:hover": {
                                  borderColor: "#8140c4",
                                  backgroundColor: "rgba(103, 33, 180, 0.08)",
                                },
                              }}
                            >
                              {opLabel}
                            </Button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* if operation chosen but method not yet */}
                      {selectingStepIndex === index &&
                        step.operation !== "" &&
                        step.method === "" && (
                          <div>
                            <h3 className="font-semibold mb-2">Choose Method:</h3>
                            <div className="grid grid-cols-2 gap-2">
                              {groupedByOperation[
                                allowedSteps.find((s) => s.operation_label === step.operation_label)?.operation_label || ""
                              ]?.map((s) => (
                            <Button
                              key={`${s.method}-${s.device}`}
                              variant="outlined"
                              onClick={() =>
                                handleSelectMethod(
                                  s.method,
                                  s.device,
                                  s.method_label,
                                  s.device_label
                                )
                              }
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                textTransform: "none",
                                borderColor: "#6721b4",
                                color: "#6721b4",
                                "&:hover": {
                                  borderColor: "#8140c4",
                                  backgroundColor: "rgba(103, 33, 180, 0.08)",
                                },
                              }}
                            >
                              <span style={{ fontWeight: 500 }}>{s.method_label}</span>
                              <span style={{ fontSize: "0.8rem", color: "#6b7280" }}>
                                {s.device_label}
                              </span>
                            </Button>

                              ))}
                            </div>
                          </div>
                        )}

                      {/* if incubate duration entry */}
                      {selectingStepIndex === index &&
                        step.operation === "Incubate" &&
                        step.device !== "" &&
                        step.method === "" && (
                          <div className="mt-2 flex items-center gap-2">
                            <TextField
                              type="number"
                              label="Duration (minutes)"
                              value={step.duration ?? ""}
                              onChange={(e) => {
                                const value = Number(e.target.value);
                                setSteps((prev) => {
                                  const updated = [...prev];
                                  updated[selectingStepIndex!] = {
                                    ...updated[selectingStepIndex!],
                                    duration: isNaN(value) ? undefined : value,
                                  };
                                  return updated;
                                });
                              }}
                              fullWidth
                            />
                            <Button
                              variant="contained"
                              onClick={() => {
                                if (step.duration !== undefined) {
                                  handleSetDuration(step.duration, step.device, step.method_label);
                                }
                              }}
                            >
                              Set
                            </Button>
                          </div>
                      )}

                      {/* final step card */}
                      {step.operation !== "" && (
                        <div className="flex justify-between items-center">
                          <div>
                            {/* human-friendly operation label */}
                            <p className="text-lg text-black">
                              {step.operation_label}
                            </p>
                            {/* human-friendly method and device */}
                            <p className="text-sm text-gray-500">
                              {step.method_label} using {step.device_label}
                            </p>
                            {/* technical parameters */}
                            <p className="text-xs text-gray-500">
                              {step.operation} – {step.method} – {step.device}
                            </p>
                          </div>
                          <IconButton
                            onClick={() => {
                              setSteps((prev) => prev.filter((_, i) => i !== index));
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </div>
                      )}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              <Button
                  variant="outlined"
                  onClick={handleAddStep}
                  sx={{
                    mt: 2,
                    borderColor: "#6721b4",
                    color: "#6721b4",
                    "&:hover": {
                      borderColor: "#8140c4",
                      backgroundColor: "rgba(103, 33, 180, 0.08)", // subtle purple hover
                    },
                  }}
                >
                + Add Step
              </Button>
            </div>
          )}
        </Droppable>
      </DragDropContext>


      {steps.length > 0 && (
        <div className="text-right mt-8">
          <Button
            variant="contained"
            startIcon={<CloudUploadIcon />}
            size="large"
            onClick={handleSubmit}
            disabled={!formComplete}
            sx={{
                  backgroundColor: "#6721b4",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#8140c4",
                  },
                }}
               >
            Submit Workflow
          </Button>
        </div>
      )}
    </div>
  );
}
