// utils/markers.js
export const getTopMarkers = (fullTable, topNPerGroup = 50, fdr_limit = 0.1) => {
    const grouped = {};
  
    for (const row of fullTable) {
      if (row.pval_adj < fdr_limit) {
        if (!grouped[row.group]) grouped[row.group] = [];
        grouped[row.group].push(row);
      }
    }
  
    const topMarkers = new Set();
  
    for (const group in grouped) {
      const sorted = grouped[group]
        .sort((a, b) => b.score - a.score)
        .slice(0, topNPerGroup);
      sorted.forEach((row) => topMarkers.add(row.gene));
    }
  
    return Array.from(topMarkers);
  };

