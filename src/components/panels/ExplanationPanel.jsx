function ExplanationPanel({ steps, currentStep, applyStep }) {
  return (
    <div style={styles.explanation}>
      <div style={{ display: "flex", gap: "8px", marginBottom: "8px", alignItems: "center" }}>
        <button
          style={styles.controlBtn}
          onClick={() => applyStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0 || steps.length === 0}
        >
          ← Prev
        </button>
        <button
          style={styles.controlBtn}
          onClick={() => applyStep(Math.min(steps.length - 1, currentStep + 1))}
          disabled={currentStep === steps.length - 1 || steps.length === 0}
        >
          Next →
        </button>
        <span style={{ color: "#aaa", fontSize: "12px" }}>
          {steps.length > 0 ? `Step ${currentStep + 1} of ${steps.length}` : ""}
        </span>
      </div>
      <p style={{ color: "white", marginBottom: "4px" }}>
        {steps.length > 0 ? steps[currentStep].explanation : "Run an algorithm to see explanation here..."}
      </p>
      {steps.length > 0 && steps[currentStep].queue !== undefined && (
        <p style={{ color: "#f5a623", fontSize: "12px" }}>
          Queue: [{steps[currentStep].queue.join(" → ")}]
        </p>
      )}
      {steps.length > 0 && steps[currentStep].stack !== undefined && (
        <p style={{ color: "#f5a623", fontSize: "12px" }}>
            Stack: [{steps[currentStep].stack.join(" → ")}]
        </p>
        )}
    </div>
  )
}

const styles = {
  explanation: {
    height: "120px",
    background: "#16213e",
    padding: "16px",
    color: "#aaa",
    borderTop: "1px solid #e94560",
  },
  controlBtn: {
    padding: "6px 12px",
    borderRadius: "6px",
    background: "#0f3460",
    color: "white",
    border: "1px solid #e94560",
    cursor: "pointer",
    fontWeight: "bold",
  },
}

export default ExplanationPanel