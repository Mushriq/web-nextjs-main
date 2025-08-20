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
  Tooltip,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AttachFileIcon from "@mui/icons-material/AttachFile";

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
  // placeholder-only UI state for the dummy attachment
  analysisFileName?: string;
  analysisFile?: File;   // keep the real file object
  uploadStatus?: "pending" | "uploading" | "done" | "error";  // new
};

type AllowedStep = {
  operation: string;
  method: string;
  device: string;
  operation_label: string;
  method_label: string;
  device_label: string;
  // new flag from API: 1 allows analysis, 0 hides button
  allowed_analysis?: number; // 0 | 1
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

  const [submitting, setSubmitting] = useState(false);

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
    setSteps((prev) =>
      reorder(prev, result.source.index, result.destination.index)
    );
  };

  // add new step (empty, triggers tile select)
  const handleAddStep = () => {
    setSteps((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        operation: "",
        operation_label: "",
        method: "",
        method_label: "",
        device: "",
        device_label: "",
      },
    ]);
    setSelectingStepIndex(steps.length);
  };

  const groupedByOperation = allowedSteps.reduce((acc, step) => {
    if (!acc[step.operation_label]) acc[step.operation_label] = [];
    acc[step.operation_label].push(step);
    return acc;
  }, {} as Record<string, AllowedStep[]>);

  const handleSelectOperation = (
    operation: string,
    operation_label: string
  ) => {
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

  const handleSelectMethod = (
    method: string,
    device: string,
    method_label: string,
    device_label: string
  ) => {
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

  const handleSetDuration = (
    duration: number,
    device: string,
    method_label: string
  ) => {
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
        prev.map((step, idx) => (idx === menuStepIndex ? { ...selectedStep } : step))
      );
    }
    setEditDialogOpen(false);
    setMenuStepIndex(null); // reset
    setSelectedStep(null); // reset
  };

  const handleSubmit = async () => {
      try {
        setSubmitting(true);

        // --- Step 1: Send workflow
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

        const resp = await axios.post(
          "https://conductor-sync-api-353269782212.us-central1.run.app/api/workflows/append-csv",
          payload,
          { headers: { "Content-Type": "application/json" } }
        );

        const requestId = resp.data.request_id;

        // --- Step 2: Upload all analysis scripts in parallel
        const uploadPromises = steps.map((step, i) => {
          if (!step.analysisFile) return null;

          // mark as uploading
          setSteps((prev) => {
            const updated = [...prev];
            updated[i].uploadStatus = "uploading";
            return updated;
          });

          const formData = new FormData();
          formData.append("file", step.analysisFile);

          return axios
            .post(
              `https://conductor-sync-api-353269782212.us-central1.run.app/api/workflows/${requestId}/upload-analysis/${i + 1}`,
              formData,
              { headers: { "Content-Type": "multipart/form-data" } }
            )
            .then(() => {
              setSteps((prev) => {
                const updated = [...prev];
                updated[i].uploadStatus = "done";
                return updated;
              });
            })
            .catch(() => {
              setSteps((prev) => {
                const updated = [...prev];
                updated[i].uploadStatus = "error";
                return updated;
              });
            });
        });

        // filter out nulls and wait for all uploads
        await Promise.allSettled(uploadPromises.filter(Boolean) as Promise<any>[]);

        alert("Workflow and analysis scripts submitted successfully!");
        setSteps([]);
        setProjectId("");
        setExperimentId("");
        setCreatedBy("");
        setSourcePlateName("");
      } catch (err: any) {
        if (axios.isAxiosError(err)) {
          alert(`Error: ${err.response?.data?.detail || err.message}`);
        } else {
          alert(`Unexpected error: ${err}`);
        }
      } finally {
        setSubmitting(false);
      }
  };


  // === helper: does this step allow analysis? (allowed_analysis === 1) ===
  const stepAllowsAnalysis = (step: WorkflowStep) => {
    // Prefer exact match (op+method+device) else fall back to operation-only
    const exact = allowedSteps.find(
      (s) =>
        s.operation === step.operation &&
        s.method === step.method &&
        s.device === step.device
    );
    const byOp =
      exact ||
      allowedSteps.find((s) => s.operation === step.operation) ||
      null;

    const flag = byOp?.allowed_analysis;
    // handle 1/0 or "1"/"0"
    return flag === 1 || flag === (1 as unknown as any) || String(flag) === "1";
  };

  const handleFileChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSteps((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        analysisFileName: file ? file.name : undefined,
        analysisFile: file || undefined,
      };
      return updated;
    });
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
        <TextField
          label="Project ID"
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "#6721b4",
              },
            },
            "& label.Mui-focused": {
              color: "#6721b4",
            },
          }}

        />
        <TextField
          label="Experiment ID"
          value={experimentId}
          onChange={(e) => setExperimentId(e.target.value)}
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "#6721b4",
              },
            },
            "& label.Mui-focused": {
              color: "#6721b4",
            },
          }}
        />
        <TextField
          label="Created By"
          value={createdBy}
          onChange={(e) => setCreatedBy(e.target.value)}
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "#6721b4",
              },
            },
            "& label.Mui-focused": {
              color: "#6721b4",
            },
          }}
        />
        <TextField
          label="Source Plate Name"
          value={sourcePlateName}
          onChange={(e) => setSourcePlateName(e.target.value)}
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "#6721b4",
              },
            },
            "& label.Mui-focused": {
              color: "#6721b4",
            },
          }}
        />
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
                                allowedSteps.find(
                                  (s) => s.operation_label === step.operation_label
                                )?.operation_label || ""
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
                                  <span style={{ fontWeight: 500 }}>
                                    {s.method_label}
                                  </span>
                                  <span
                                    style={{ fontSize: "0.8rem", color: "#6b7280" }}
                                  >
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
                              sx={{
                                "& .MuiOutlinedInput-root": {
                                  "&.Mui-focused fieldset": {
                                    borderColor: "#6721b4",
                                  },
                                },
                              }}
                            />
                            <Button
                              variant="contained"
                              onClick={() => {
                                if (step.duration !== undefined) {
                                  handleSetDuration(
                                    step.duration,
                                    step.device,
                                    step.method_label
                                  );
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
                            {/* show chosen analysis filename (dummy) */}
                            {step.analysisFileName && (
                              <p className="text-xs text-gray-500 mt-1 italic">
                                Analysis script: {step.analysisFileName}{" "}
                                {step.uploadStatus === "uploading" && (
                                  <span style={{ color: "orange" }}>⏳ Uploading...</span>
                                )}
                                {step.uploadStatus === "done" && (
                                  <span style={{ color: "green" }}>✔ Uploaded</span>
                                )}
                                {step.uploadStatus === "error" && (
                                  <span style={{ color: "red" }}>⚠ Failed</span>
                                )}
                              </p>
                            )}
                          </div>

                          <div className="flex items-center gap-1">
                            {/* Attachment button appears only if allowed_analysis === 1 */}
                            {stepAllowsAnalysis(step) && (
                              <Tooltip
                                title={
                                  step.analysisFileName
                                    ? "Change analysis file"
                                    : "Attach analysis file"
                                }
                              >
                                <IconButton
                                  component="label"
                                  size="small"
                                  sx={{
                                    color: "#6721b4",
                                    borderRadius: "10px",
                                  }}
                                >
                                  <AttachFileIcon />
                                  <input
                                    hidden
                                    type="file"
                                    onChange={(e) => handleFileChange(index, e)}
                                    accept=".py,.R,.csv,.tsv,.txt,.xlsx,.zip,.json"
                                  />
                                </IconButton>
                              </Tooltip>
                            )}

                            <IconButton
                              onClick={() => {
                                setSteps((prev) =>
                                  prev.filter((_, i) => i !== index)
                                );
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </div>
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
            startIcon={submitting ? null : <CloudUploadIcon />}
            size="large"
            onClick={handleSubmit}
            disabled={!formComplete || submitting}
            sx={{
              backgroundColor: "#6721b4",
              color: "white",
              "&:hover": { backgroundColor: "#8140c4" },
            }}
          >
            {submitting ? "Submitting..." : "Submit Workflow"}
          </Button>
        </div>
      )}
    </div>
  );
}
