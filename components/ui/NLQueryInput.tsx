import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, CircularProgress, Box, Chip } from '@mui/material';
import { useTheme } from 'next-themes'



type NLQueryInputProps = {
  setGroupby: (val: string) => void;
  setColor: (val: string) => void;
  setFilterBy: (val: string | null) => void;
  setColorType: (val: string | null) => void;
  parseApiUrl: string; // e.g., "http://localhost:8000/parse"
  metadataOptions: string[]; // List of metadata options
  geneList: string[]; // List of gene names
  themeColor: string;
};

const NLQueryInput: React.FC<NLQueryInputProps> = ({
  setGroupby,
  setColor,
  setFilterBy,
  setColorType,
  parseApiUrl,
  metadataOptions,
  geneList,
  themeColor
}) => {

  const { resolvedTheme } = useTheme()

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

  const boxClassNames = resolvedTheme === 'dark'
  ? 'relative p-4 border rounded-md bg-gray-900 text-white border-gray-700 shadow-lg'
  : 'relative p-4 border rounded-md bg-white text-gray-900 border-gray-200 shadow-lg'


  return (
    <Box className={boxClassNames}>
      {/* Container for chip and label */}
      <Box display="flex" alignItems="center" mb={1}>
        {/* Add the super small "alpha" tag to the left of the label */}
        <Chip
          label="AI"
          size="small"  // Small size for the chip
          sx={{
            marginRight: 1.5,
            fontSize: '14px',
            height: '16px',
            width: '36px',
            padding: '1px 2px',
            backgroundColor: themeColor,
            color: '#fff',
          }}
        />
        <label className="block text-sm font-medium dark:text-white text-gray-700">
          Describe how you want to visualize the data:
        </label>
      </Box>
    <TextField
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      multiline
      rows={3}
      variant="outlined"
      fullWidth
      className="mb-4 bg-white"
      placeholder='e.g. "Color by AXIN2 and group by clinical behavior"'
      sx={{
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: themeColor,
          },
          '&:hover fieldset': {
            borderColor: themeColor,
          },
          '&.Mui-focused fieldset': {
            borderColor: themeColor,
          },
        },
      }}
    />
    
    <Box display="flex" justifyContent="flex-end" mt={2}>
    <Button
        onClick={handleSubmit}
        disabled={loading}
        variant="contained"
        startIcon={loading && <CircularProgress size={20} color="inherit" />}
        sx={{
            backgroundColor: loading 
            ? (resolvedTheme === 'dark' ? '#d1d5db' : themeColor)  // Light gray for loading in dark mode
            : themeColor, // Normal color when not loading
            '&:hover': {
            backgroundColor: loading
                ? (resolvedTheme === 'dark' ? '#d1d5db' : themeColor) // Hover state for loading button
                : themeColor, 
            opacity: 0.85,
            },
            '&:disabled': {
            backgroundColor: loading
                ? (resolvedTheme === 'dark' ? '#d1d5db' : '#e5e7eb')  // Lighter gray when disabled in dark mode
                : '#e5e7eb',
            },
        }}
        >
        {loading ? 'Working on it..' : 'Go'}
      </Button>
    </Box>
    </Box>
  );
};

export default NLQueryInput;