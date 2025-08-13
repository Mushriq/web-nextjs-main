// components/EnrollmentForm.tsx
"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Tabs,
  Tab,
  TextField,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  RadioGroup,
  Radio,
  MenuItem,
  Tooltip,
  IconButton,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import formStructure from "public/data/Enrollment_Questions_with_Tabs.json";

const InfoTip = ({ field, text }: { field: string; text: string }) => (
  <Tooltip
    title={
      <div className="w-72 text-black">
        <Typography className="font-medium text-black">{field}</Typography>
        <Typography
          variant="body2"
          className="font-normal text-black opacity-80"
        >
          {text}
        </Typography>
      </div>
    }
    placement="top"
  >
    <IconButton size="small">
      <InfoOutlinedIcon fontSize="small" />
    </IconButton>
  </Tooltip>
);

const EnrollmentForm = () => {
  const tabs = Object.keys(formStructure);
  const [tabIndex, setTabIndex] = useState(0);
  const [formData, setFormData] = useState<Record<string, any>>({});

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (
    name: string,
    option: string,
    checked: boolean
  ) => {
    const prevOptions = formData[name] || [];
    const newOptions = checked
      ? [...new Set([...prevOptions, option])]
      : prevOptions.filter((o: string) => o !== option);
    setFormData((prev) => ({ ...prev, [name]: newOptions }));
  };

  const renderField = (q: any) => {
    const name = `q${q.question_number || q.question_text?.replace(/\s+/g, "_")}`;
    const value = formData[name] || "";
    const options =
      Array.isArray(q.options) && typeof q.options[0] === "string"
        ? q.options[0].split("\n").map((opt) => opt.trim()).filter(Boolean)
        : [];

    switch ((q.field_type || "").toLowerCase()) {
      case "text":
        return (
          <TextField
            label={q.question_text}
            name={name}
            value={value}
            onChange={(e) => handleChange(name, e.target.value)}
            fullWidth
          />
        );
      case "date":
        return (
          <TextField
            label={q.question_text}
            name={name}
            type="date"
            value={value}
            onChange={(e) => handleChange(name, e.target.value)}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        );
      case "dropdown":
        return (
          <TextField
            select
            label={q.question_text}
            name={name}
            value={value}
            onChange={(e) => handleChange(name, e.target.value)}
            fullWidth
          >
            {options.map((opt: string, i: number) => (
              <MenuItem key={i} value={opt}>
                {opt}
              </MenuItem>
            ))}
          </TextField>
        );
      case "radio":
        return (
          <div>
            <FormLabel>{q.question_text}</FormLabel>
            <RadioGroup
              name={name}
              value={value}
              onChange={(e) => handleChange(name, e.target.value)}
            >
              {options.map((opt: string, i: number) => (
                <FormControlLabel
                  key={i}
                  value={opt}
                  control={<Radio />}
                  label={opt}
                />
              ))}
            </RadioGroup>
          </div>
        );
      case "checkbox":
        return (
          <div>
            <FormLabel>{q.question_text}</FormLabel>
            <FormGroup>
              {options.map((opt: string, i: number) => (
                <FormControlLabel
                  key={i}
                  control={
                    <Checkbox
                      checked={(formData[name] || []).includes(opt)}
                      onChange={(e) =>
                        handleCheckboxChange(name, opt, e.target.checked)
                      }
                    />
                  }
                  label={opt}
                />
              ))}
            </FormGroup>
          </div>
        );
      case "submit":
        return (
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        );
      default:
        return null;
    }
  };

  const renderWithTooltip = (
    field: React.ReactNode,
    tooltip: string,
    label: string
  ) => (
    <div className="flex items-center gap-2">
      <div className="flex-grow">{field}</div>
      {tooltip && (
        <div className="shrink-0">
          <InfoTip field={label} text={tooltip} />
        </div>
      )}
    </div>
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted:", formData);
  };

  return (
    <Box className="p-6 space-y-6 max-w-4xl mx-auto">
      <Typography variant="h4">Participant Enrollment Form</Typography>
      <Tabs
        value={tabIndex}
        onChange={(_, newVal) => setTabIndex(newVal)}
        variant="scrollable"
        allowScrollButtonsMobile
      >
        {tabs.map((tab, i) => (
          <Tab key={i} label={tab} />
        ))}
      </Tabs>

      <form onSubmit={handleSubmit} className="space-y-4">
        {(formStructure[tabs[tabIndex]] || []).map(
          (q: any, i: number) =>
            q.question_text &&
            q.field_type &&
            renderWithTooltip(renderField(q), q.instruction_text || "", q.question_text)
        )}
        {tabIndex < tabs.length - 1 && (
          <div className="flex justify-end">
            <Button
              variant="contained"
              onClick={() => setTabIndex((prev) => prev + 1)}
            >
              Next
            </Button>
          </div>
        )}
      </form>
    </Box>
  );
};

export default EnrollmentForm;
