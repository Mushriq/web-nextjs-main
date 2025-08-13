import { useState } from 'react'
import axios from 'axios'

export default function NaturalLanguageViz({ geneList, metadataColumns }) {
  const [input, setInput] = useState("Show me UMAP colored by CD8A")
  const [params, setParams] = useState(null)

  const handleRun = async () => {
    const response = await axios.post("/api/parse", {
      query: input,
      metadata_keys: metadataColumns,
      gene_names: geneList,
    })
    setParams(response.data)
    // Now send to your main visualization endpoint with response.data
  }

  return (
    <div className="space-y-4">
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Ask a question like: show CD8A grouped by cell type"
        className="border p-2 rounded w-full"
      />
      <button onClick={handleRun} className="bg-blue-600 text-white px-4 py-2 rounded">
        Parse Query
      </button>

      {params && (
        <pre className="bg-gray-100 p-2 rounded text-sm">
          {JSON.stringify(params, null, 2)}
        </pre>
      )}
    </div>
  )
}