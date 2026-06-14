function FloydWarshallMatrix({ step }) {
  if (!step?.distMatrix || !step?.nodeIds) return null

  const { distMatrix, nodeIds, highlightI, highlightJ, highlightK } = step

  const fmt = (val) => {
    if (val === Infinity || val === null || val === undefined) return "∞"
    return val
  }

  const getCellStyle = (i, j) => {
    const base = {
      width: "36px",
      height: "36px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "12px",
      fontWeight: "bold",
      borderRadius: "4px",
      border: "1px solid #1a2a4a",
      transition: "background 0.3s",
    }

    // Diagonal
    if (i === j) return { ...base, background: "#1a2a4a", color: "#aaa" }

    // Currently updated cell
    if (i === highlightI && j === highlightJ)
      return { ...base, background: "#e94560", color: "white" }

    // Row or column of intermediate node k
    if (i === highlightK || j === highlightK)
      return { ...base, background: "#2a3a6a", color: "#f5a623" }

    // Reachable
    if (distMatrix[i][j] !== Infinity)
      return { ...base, background: "#0f3460", color: "#27ae60" }

    // Unreachable
    return { ...base, background: "#0a1a30", color: "#555" }
  }

  const headerStyle = {
    width: "36px",
    height: "36px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "11px",
    fontWeight: "bold",
    color: highlightK !== null ? "#f5a623" : "#aaa",
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      <span style={{ color: "#aaa", fontSize: "11px", marginBottom: "4px" }}>
        Distance Matrix
      </span>

      {/* Header row */}
      <div style={{ display: "flex", gap: "2px" }}>
        <div style={{ width: "36px" }} /> {/* corner spacer */}
        {nodeIds.map((id, j) => (
          <div
            key={j}
            style={{
              ...headerStyle,
              color: j === highlightK ? "#f5a623" : "#aaa",
              background: j === highlightK ? "#1a2a4a" : "transparent",
              borderRadius: "4px",
            }}
          >
            {id.replace("node-", "")}
          </div>
        ))}
      </div>

      {/* Matrix rows */}
      {distMatrix.map((row, i) => (
        <div key={i} style={{ display: "flex", gap: "2px" }}>
          {/* Row label */}
          <div
            style={{
              ...headerStyle,
              color: i === highlightK ? "#f5a623" : "#aaa",
              background: i === highlightK ? "#1a2a4a" : "transparent",
              borderRadius: "4px",
            }}
          >
            {nodeIds[i].replace("node-", "")}
          </div>
          {row.map((val, j) => (
            <div key={j} style={getCellStyle(i, j)}>
              {fmt(val)}
            </div>
          ))}
        </div>
      ))}

      {/* Legend */}
      <div style={{ display: "flex", gap: "10px", marginTop: "6px", flexWrap: "wrap" }}>
        {[
          { color: "#e94560", label: "Updated" },
          { color: "#f5a623", label: "Intermediate (k)" },
          { color: "#27ae60", label: "Reachable" },
          { color: "#555", label: "∞" },
        ].map(({ color, label }) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <div style={{ width: "10px", height: "10px", borderRadius: "2px", background: color }} />
            <span style={{ color: "#aaa", fontSize: "10px" }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FloydWarshallMatrix