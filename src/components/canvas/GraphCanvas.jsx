import { useState, useCallback } from "react"
import {
  ReactFlow,
  addEdge,
  reconnectEdge,
  MiniMap,
  Controls,
  Background,
  Handle,
  Position,
} from "@xyflow/react"
import "@xyflow/react/dist/style.css"

// Custom node with 4 handles (top, bottom, left, right)
function CustomNode({ data }) {
  return (
    <div style={{
      background: data.color || "#e94560",
      color: "white",
      borderRadius: "50%",
      width: 60,
      height: 60,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: "bold",
      fontSize: "12px",
      transition: "background 0.3s ease",
    }}>
      <Handle type="source" position={Position.Top} id="top" style={{ background: "white" }} />
      <Handle type="source" position={Position.Bottom} id="bottom" style={{ background: "white" }} />
      <Handle type="source" position={Position.Left} id="left" style={{ background: "white" }} />
      <Handle type="source" position={Position.Right} id="right" style={{ background: "white" }} />
      <Handle type="target" position={Position.Top} id="top-target" style={{ background: "white" }} />
      <Handle type="target" position={Position.Bottom} id="bottom-target" style={{ background: "white" }} />
      <Handle type="target" position={Position.Left} id="left-target" style={{ background: "white" }} />
      <Handle type="target" position={Position.Right} id="right-target" style={{ background: "white" }} />
      {data.label}
    </div>
  )
}

const nodeTypes = { custom: CustomNode }

// Weight input modal
function WeightModal({ onConfirm, onCancel }) {
  const [value, setValue] = useState("1")

  const handleConfirm = () => {
    const num = parseFloat(value)
    if (isNaN(num)) return
    onConfirm(value.trim())
  }

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.box}>
        <p style={modalStyles.title}>Edge Weight</p>
        <input
          autoFocus
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleConfirm()
            if (e.key === "Escape") onCancel()
          }}
          style={modalStyles.input}
        />
        <div style={modalStyles.buttons}>
          <button onClick={onCancel} style={modalStyles.cancel}>Cancel</button>
          <button onClick={handleConfirm} style={modalStyles.confirm}>Add Edge</button>
        </div>
      </div>
    </div>
  )
}

const modalStyles = {
  overlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
  },
  box: {
    background: "#16213e",
    border: "1px solid #e94560",
    borderRadius: "10px",
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    minWidth: "220px",
  },
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: "14px",
    margin: 0,
  },
  input: {
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #e94560",
    background: "#0f3460",
    color: "white",
    fontSize: "14px",
    outline: "none",
  },
  buttons: {
    display: "flex",
    gap: "8px",
    justifyContent: "flex-end",
  },
  cancel: {
    padding: "6px 14px",
    borderRadius: "6px",
    background: "#0f3460",
    color: "#aaa",
    border: "1px solid #aaa",
    cursor: "pointer",
  },
  confirm: {
    padding: "6px 14px",
    borderRadius: "6px",
    background: "#e94560",
    color: "white",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
  },
}

function GraphCanvas({ isDirected, nodes, edges, setNodes, setEdges, onNodesChange, onEdgesChange, nodeId, setNodeId, setStartNode, startNode }) {
  const [pendingConnection, setPendingConnection] = useState(null)

  const onConnect = useCallback(
    (connection) => {
      setPendingConnection(connection)
    },
    []
  )

  const handleWeightConfirm = (weight) => {
    const connection = pendingConnection
    setPendingConnection(null)

    const reverseExists = edges.some(
      (e) => e.source === connection.target && e.target === connection.source
    )

    setEdges((eds) => addEdge({
      ...connection,
      label: weight,
      type: reverseExists ? "simplebezier" : "smoothstep",
      markerEnd: isDirected ? { type: "arrowclosed", color: "#e94560" } : undefined,
      style: { stroke: "#e94560" },
      labelStyle: { fill: "white", fontWeight: "bold" },
      labelBgStyle: { fill: "#16213e" },
    }, eds))
  }

  const handleWeightCancel = () => {
    setPendingConnection(null)
  }

  const onReconnect = useCallback(
    (oldEdge, newConnection) =>
      setEdges((els) => reconnectEdge(oldEdge, newConnection, els)),
    []
  )

  const addNode = () => {
    const newNode = {
      id: `${nodeId}`,
      type: "custom",
      position: { x: Math.random() * 400 + 50, y: Math.random() * 300 + 50 },
      data: { label: `Node ${nodeId}` },
    }
    setNodes((nds) => [...nds, newNode])
    setNodeId((id) => id + 1)
  }

  const onNodeClick = (event, node) => {
    setStartNode(node.id)
  }

  return (
    <div style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}>
      <button
        onClick={addNode}
        style={{
          position: "absolute",
          zIndex: 10,
          top: "12px",
          left: "240px",
          padding: "8px 16px",
          background: "#e94560",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        + Add Node
      </button>

      {pendingConnection && (
        <WeightModal
          onConfirm={handleWeightConfirm}
          onCancel={handleWeightCancel}
        />
      )}

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onReconnect={onReconnect}
        nodeTypes={nodeTypes}
        fitView
        onNodeClick={onNodeClick}
      >
        <MiniMap />
        <Controls />
        <Background color="#1a1a2e" gap={16} />
      </ReactFlow>
    </div>
  )
}

export default GraphCanvas