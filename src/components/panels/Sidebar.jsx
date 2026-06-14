function Sidebar({ 
  selectedAlgorithm, setSelectedAlgorithm,
  isDirected, setIsDirected,
  startNode, runAlgorithm, clearGraph
}) {
  const noStartNeeded = selectedAlgorithm === "Floyd-Warshall"

  return (
    <div style={styles.sidebar}>
      <h2 style={styles.logo}>AlgoViz</h2>
      <p style={styles.label}>Select Algorithm</p>
      <select
        style={styles.select}
        value={selectedAlgorithm}
        onChange={(e) => setSelectedAlgorithm(e.target.value)}
      >
        <optgroup label="Graphs">
          <option>BFS</option>
          <option>DFS</option>
          <option>Topological Sort</option>
          <option>Dijkstra's</option>
          <option>Bellman-Ford</option>
          <option>Floyd-Warshall</option>
        </optgroup>
      </select>
      <p style={{ color: "#aaa", fontSize: "11px" }}>
        {noStartNeeded
          ? "No start node needed"
          : startNode
          ? `Start node: ${startNode}`
          : "Click a node to select start"}
      </p>
      <p style={styles.label}>Graph Type</p>
      <div style={styles.toggleContainer}>
        <button
          onClick={() => setIsDirected(false)}
          style={{ ...styles.toggleBtn, background: !isDirected ? "#e94560" : "#0f3460" }}
        >
          Undirected
        </button>
        <button
          onClick={() => setIsDirected(true)}
          style={{ ...styles.toggleBtn, background: isDirected ? "#e94560" : "#0f3460" }}
        >
          Directed
        </button>
      </div>
      <button style={styles.button} onClick={runAlgorithm}>Run Algorithm</button>
      <button style={styles.button} onClick={clearGraph}>Clear Graph</button>
    </div>
  )
}

const styles = {
  sidebar: {
    width: "220px",
    background: "#16213e",
    padding: "24px 16px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  logo: { color: "#e94560", marginBottom: "16px" },
  label: { color: "#aaa", fontSize: "12px", textTransform: "uppercase" },
  select: {
    padding: "8px",
    borderRadius: "6px",
    background: "#0f3460",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
  button: {
    padding: "10px",
    borderRadius: "6px",
    background: "#e94560",
    color: "white",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
  },
  toggleContainer: { display: "flex", gap: "8px" },
  toggleBtn: {
    flex: 1,
    padding: "8px",
    borderRadius: "6px",
    color: "white",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "11px",
  },
}

export default Sidebar