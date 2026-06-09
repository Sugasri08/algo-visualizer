import { useState, useCallback } from "react"
import {
  ReactFlow,
  addEdge,
  reconnectEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
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

function GraphCanvas({ isDirected, nodes, edges, setNodes, setEdges, onNodesChange, onEdgesChange, nodeId, setNodeId, setStartNode, startNode }) {
  
  const onConnect = useCallback(
  (connection) => {
    const weight = prompt("Enter edge weight:", "1")
    if (weight === null) return

    if (isNaN(weight) || weight.trim() === "") {
      alert("Invalid input! Please enter a number for the edge weight.")
      return
    }

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
  },
  [setEdges, isDirected, edges]
)

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