"use client";

import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  CircularProgress,
  Card,
  CardContent,
  CardActions,
  Typography,
} from "@mui/material";

type ResultEntry = {
  id: number;
  title: string;
  description: string;
  rel: string;
  url: string;
};

type ResultsResponse = {
  ok: boolean;
  request_id: string;
  counts: { figures: number; tables: number; artifacts: number };
  figures: ResultEntry[];
  tables: ResultEntry[];
  artifacts: ResultEntry[];
};

const API_BASE = "https://conductor-sync-api-353269782212.us-central1.run.app";

export default function ResultPortal() {
  const [requestId, setRequestId] = useState("");
  const [results, setResults] = useState<ResultsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetch = async () => {
    if (!requestId.trim()) return;
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const url = `${API_BASE}/api/results/${requestId}`;
      const res = await axios.get(url);
      setResults(res.data as ResultsResponse);
    } catch (err: any) {
      setError(err.response?.data?.detail || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (entry: ResultEntry) => {
    const url = `${API_BASE}${entry.url}?download=1`;
    window.open(url, "_blank");
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Result Portal</h1>

      {/* Request ID input */}
      <div className="flex gap-2 mb-6">
        <TextField
          label="Request ID"
          value={requestId}
          onChange={(e) => setRequestId(e.target.value)}
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": { borderColor: "#6721b4" },
            },
            "& label.Mui-focused": { color: "#6721b4" },
          }}
        />
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#6721b4",
            "&:hover": { backgroundColor: "#8140c4" },
          }}
          onClick={handleFetch}
          disabled={loading}
        >
          {loading ? <CircularProgress size={20} color="inherit" /> : "Fetch"}
        </Button>
      </div>

      {/* Error */}
      {error && <p className="text-red-600 mb-4">Error: {error}</p>}

      {/* Results */}
      {results && (
        <div className="space-y-6">
          <Typography variant="h6">
            Results for <code>{results.request_id}</code>
          </Typography>

          {/* Figures */}
          {results.figures.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-2">Figures</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {results.figures.map((f) => (
                  <Card key={f.id}>
                    <CardContent>
                      <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                        {f.title}
                      </Typography>
                      {f.description && (
                        <Typography variant="body2" color="text.secondary">
                          {f.description}
                        </Typography>
                      )}
                      <img
                        src={`${API_BASE}${f.url}`}
                        alt={f.title}
                        className="mt-2 max-h-64 object-contain"
                      />
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        onClick={() => handleDownload(f)}
                        sx={{ color: "#6721b4" }}
                      >
                        Download
                      </Button>
                    </CardActions>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Tables */}
          {results.tables.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-2">Tables</h2>
              <ul className="list-disc list-inside space-y-2">
                {results.tables.map((t) => (
                  <li key={t.id}>
                    <a
                      href={`${API_BASE}${t.url}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline"
                    >
                      {t.title || t.rel}
                    </a>
                    {t.description && (
                      <div className="text-sm text-gray-600 ml-4">
                        {t.description}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Artifacts */}
          {results.artifacts.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-2">Artifacts</h2>
              <ul className="list-disc list-inside space-y-2">
                {results.artifacts.map((a) => (
                  <li key={a.id}>
                    <a
                      href={`${API_BASE}${a.url}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline"
                    >
                      {a.title || a.rel}
                    </a>
                    {a.description && (
                      <div className="text-sm text-gray-600 ml-4">
                        {a.description}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
