import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, CircularProgress, Box, Chip } from '@mui/material';



type NLQueryInputProps = {
  setGroupby: (val: string) => void;
  setColor: (val: string) => void;
  setFilterBy: (val: string | null) => void;
  setColorType: (val: string | null) => void;
  parseApiUrl: string; // e.g., "http://localhost:8000/parse"
  metadataOptions: string[]; // List of metadata options
  geneList: string[]; // List of gene names
};

const NLQueryInput: React.FC<NLQueryInputProps> = ({
  setGroupby,
  setColor,
  setFilterBy,
  setColorType,
  parseApiUrl,
  metadataOptions,
  geneList
}) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (query.trim().length < 3) return;
    setLoading(true);
    try {
      const response = await axios.get(parseApiUrl, {
        params: { query },
      });

      const data = response.data;
      console.log('Parsed Result:', data);


      if (data.group_by) {
        setGroupby(data.group_by);
      }

      if (data.color_by) {
        setColor(data.color_by);

        // Determine if the colorBy is a metadata field or a gene
        const colorBy = data.color_by;
        
        if (metadataOptions.includes(colorBy)) {
          setColorType('metadata');  // Set colorType to 'metadata' if found in metadata options
        } else if (geneList.includes(colorBy)) {
          setColorType('gene');  // Set colorType to 'Gene' if found in gene list
        } else {
          setColorType('metadata');  // Optional: Handle if not found in either
        }
      }
    } catch (err) {
      console.error('Failed to fetch parsed query:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="relative p-4 border rounded-md bg-white shadow-lg">
      {/* Container for chip and label */}
      <Box display="flex" alignItems="center" mb={1}>
        {/* Add the super small "alpha" tag to the left of the label */}
        <Chip
          label="AI"
          color="secondary"
          size="small"  // Small size for the chip
          style={{
            marginRight: 10,  // Adds space between the chip and label
            fontSize: '14px',  // Adjust the font size
            height: '16px',  // Adjust the height to make it more compact
            width: '36px',  // Adjust the height to make it more compact
            padding: '1px 2px',  // Reduce padding for a smaller chip
          }}
        />
        <label className="block text-sm font-medium text-gray-700">
          Describe how you want to visualize the data:
        </label>
      </Box>
    <TextField
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      multiline
      rows={3}
      variant="outlined"
      color="secondary"
      fullWidth
      className="mb-4"
      placeholder='e.g. "Color by AXIN2 and group by clinical behavior"'
    />
    
    <Box display="flex" justifyContent="flex-end" mt={2}>
      <Button
        onClick={handleSubmit}
        disabled={loading}
        variant="contained"
        color="secondary"
        startIcon={loading && <CircularProgress size={20} color="inherit" />}
      >
        {loading ? 'Working on it..' : 'Go'}
      </Button>
    </Box>
    </Box>
  );
};

export default NLQueryInput;