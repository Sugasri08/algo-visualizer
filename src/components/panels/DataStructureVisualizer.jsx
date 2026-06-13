function DataStructureVisualizer({ items, type, currentIndex = 0 }) {
  if (!items || items.length === 0) return null

  return (
    <div style={styles.container}>
      <p style={styles.label}>{type === "queue" ? "Queue" : "Stack"}:</p>
      <div style={styles.wrapper}>

        {/* Arrow/Pointer */}
        <div style={styles.pointerContainer}>
          {items.map((_, i) => (
            <div key={i} style={{
              ...styles.pointerSlot,
              opacity: i === currentIndex ? 1 : 0,
            }}>
              ▼
            </div>
          ))}
        </div>

        {/* Boxes */}
        <div style={styles.boxRow}>
          {items.map((item, i) => (
            <div key={i} style={{
              ...styles.box,
              background: i === currentIndex ? "#f5a623" : "#0f3460",
              border: i === currentIndex ? "2px solid #f5a623" : "2px solid #e94560",
              transform: i === currentIndex ? "scale(1.1)" : "scale(1)",
            }}>
              {item}
            </div>
          ))}
        </div>

        {/* Index labels */}
        <div style={styles.boxRow}>
          {items.map((_, i) => (
            <div key={i} style={styles.indexLabel}>
              {type === "queue" && i === 0 ? "front" : 
               type === "stack" && i === items.length - 1 ? "top" : 
               i === currentIndex ? "→" : ""}
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginTop: "8px",
  },
  label: {
    color: "#aaa",
    fontSize: "12px",
    minWidth: "40px",
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },
  pointerContainer: {
    display: "flex",
    flexDirection: "row",
  },
  pointerSlot: {
    width: "40px",
    textAlign: "center",
    color: "#f5a623",
    fontSize: "12px",
    transition: "opacity 0.3s ease",
  },
  boxRow: {
    display: "flex",
    flexDirection: "row",
    gap: "4px",
  },
  box: {
    width: "40px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "6px",
    color: "white",
    fontWeight: "bold",
    fontSize: "13px",
    transition: "all 0.3s ease",
  },
  indexLabel: {
    width: "40px",
    textAlign: "center",
    color: "#aaa",
    fontSize: "10px",
  },
}

export default DataStructureVisualizer