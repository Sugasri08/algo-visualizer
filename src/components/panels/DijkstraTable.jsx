function DijkstraTable({ step }) {
  if (!step || !step.distances) return null

  return (
    <div style={styles.container}>
      <p style={styles.title}>Distance table</p>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Node</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Distance</th>
            <th style={styles.th}>Previous</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(step.distances).map(([nodeId, dist]) => {
            const isCurrent = step.currentNode === nodeId
            const isVisited = step.visitedNodes.includes(nodeId)

            return (
              <tr key={nodeId} style={{
                background: isCurrent ? "#fff8ed" : isVisited ? "#f0faf5" : "transparent"
              }}>
                <td style={styles.td}>
                  <strong>Node {nodeId}</strong>
                </td>
                <td style={styles.td}>
                  {isCurrent
                    ? <span style={{ ...styles.badge, background: "#FAC775", color: "#633806" }}>current</span>
                    : isVisited
                    ? <span style={{ ...styles.badge, background: "#C0DD97", color: "#27500A" }}>visited</span>
                    : <span style={{ ...styles.badge, background: "#1a1a2e", color: "#aaa" }}>unvisited</span>
                  }
                </td>
                <td style={{ ...styles.td, color: dist === Infinity ? "#555" : "#378ADD", fontWeight: dist === Infinity ? 400 : 500 }}>
                  {dist === Infinity ? "∞" : dist}
                </td>
                <td style={{ ...styles.td, color: "#aaa" }}>
                  {step.previous?.[nodeId] ? `Node ${step.previous[nodeId]}` : "—"}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <div style={styles.legend}>
        <div style={styles.legendItem}>
          <div style={{ ...styles.dot, background: "#FAC775" }} /> Current
        </div>
        <div style={styles.legendItem}>
          <div style={{ ...styles.dot, background: "#C0DD97" }} /> Visited
        </div>
        <div style={styles.legendItem}>
          <div style={{ ...styles.dot, background: "#555" }} /> Unvisited
        </div>
        <div style={{ ...styles.legendItem, color: "#378ADD" }}>
          ● Updated distance
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    background: "#16213e",
    border: "1px solid #0f3460",
    borderRadius: "8px",
    padding: "12px",
    minWidth: "320px",
  },
  title: {
    color: "#aaa",
    fontSize: "11px",
    textTransform: "uppercase",
    marginBottom: "8px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "12px",
  },
  th: {
    background: "#0f3460",
    color: "#aaa",
    fontWeight: 500,
    padding: "6px 10px",
    textAlign: "left",
    borderBottom: "1px solid #1a1a2e",
  },
  td: {
    padding: "6px 10px",
    borderBottom: "1px solid #1a1a2e",
    color: "white",
  },
  badge: {
    display: "inline-block",
    padding: "2px 8px",
    borderRadius: "99px",
    fontSize: "10px",
    fontWeight: 500,
  },
  legend: {
    display: "flex",
    gap: "12px",
    marginTop: "8px",
  },
  legendItem: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    fontSize: "11px",
    color: "#aaa",
  },
  dot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
  },
}

export default DijkstraTable