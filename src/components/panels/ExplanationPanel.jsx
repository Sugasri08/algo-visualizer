import { useState, useRef } from "react"
import DataStructureVisualizer from "./DataStructureVisualizer"
import DijkstraTable from "./DijkstraTable"

function ExplanationPanel({ steps, currentStep, applyStep }) {
  const step = steps.length > 0 ? steps[currentStep] : null
  const [panelHeight, setPanelHeight] = useState(220)
  const dragRef = useRef(null)

  const onMouseDown = (e) => {
    e.preventDefault()
    const startY = e.clientY
    const startHeight = panelHeight

    const onMouseMove = (e) => {
      const delta = startY - e.clientY
      const newHeight = Math.min(500, Math.max(100, startHeight + delta))
      setPanelHeight(newHeight)
    }

    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("mouseup", onMouseUp)
    }

    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("mouseup", onMouseUp)
  }

  return (
    <div style={{ ...styles.explanation, height: `${panelHeight}px` }}>

      {/* Drag handle */}
      <div
        ref={dragRef}
        onMouseDown={onMouseDown}
        style={styles.dragHandle}
        title="Drag to resize"
      />

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

      <div style={{ display: "flex", gap: "24px", alignItems: "flex-start" }}>
        <p style={{ color: "white", fontSize: "13px", flex: 1 }}>
          {step ? step.explanation : "Run an algorithm to see explanation here..."}
        </p>

        {step?.queue !== undefined && (
          <DataStructureVisualizer items={step.queue} type="queue" currentIndex={0} />
        )}
        {step?.stack !== undefined && (
          <DataStructureVisualizer items={step.stack} type="stack" currentIndex={step.stack.length - 1} />
        )}
        {step?.distances !== undefined && (
          <DijkstraTable step={step} />
        )}
      </div>
    </div>
  )
}

const styles = {
  explanation: {
    background: "#16213e",
    padding: "16px",
    color: "#aaa",
    borderTop: "1px solid #e94560",
    overflowY: "auto",
    position: "relative",
  },
  dragHandle: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "6px",
    cursor: "ns-resize",
    background: "#e94560",
    opacity: 0.4,
    borderRadius: "4px 4px 0 0",
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