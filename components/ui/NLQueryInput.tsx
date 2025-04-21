import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, CircularProgress, Box } from '@mui/material';



type NLQueryInputProps = {
  setGroupby: (val: string) => void;
  setColor: (val: string) => void;
  setFilterBy: (val: string | null) => void;
  parseApiUrl: string; // e.g., "http://localhost:8000/parse"
};

const NLQueryInput: React.FC<NLQueryInputProps> = ({
  setGroupby,
  setColor,
  setFilterBy,
  parseApiUrl,
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
        // setFilterBy(data.group_by); // optional
      }

      if (data.color_by) {
        setColor(data.color_by);
      }
    } catch (err) {
      console.error('Failed to fetch parsed query:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="relative p-4 border rounded-md bg-white shadow-lg">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Describe how you want to visualize the data:
      </label>
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
        {loading ? 'Parsing...' : 'Go'}
      </Button>
    </Box>
    </Box>
  );
};

export default NLQueryInput;