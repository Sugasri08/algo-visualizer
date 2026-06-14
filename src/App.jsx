import { useState } from "react"
import { ReactFlowProvider, useNodesState, useEdgesState } from "@xyflow/react"
import GraphCanvas from "./components/canvas/GraphCanvas"
import Sidebar from "./components/panels/Sidebar"
import ExplanationPanel from "./components/panels/ExplanationPanel"
import { bfs } from "./algorithms/graphs/bfs"
import { dfs } from "./algorithms/graphs/dfs"
import { dijkstra } from "./algorithms/graphs/dijkstra"
import { bellmanFord } from "./algorithms/graphs/bellmanFord"
import { topologicalSort } from "./algorithms/graphs/topologicalSort"
import { floydWarshall } from "./algorithms/graphs/floydWarshall"

function App() {
  const [isDirected, setIsDirected] = useState(false)
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [nodeId, setNodeId] = useState(1)
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("BFS")
  const [startNode, setStartNode] = useState(null)
  const [steps, setSteps] = useState([])
  const [currentStep, setCurrentStep] = useState(0)

  const clearGraph = () => {
    setNodes([])
    setEdges([])
    setNodeId(1)
    setSteps([])
    setStartNode(null)
  }

  const runAlgorithm = () => {
    // Floyd-Warshall doesn't need a start node
    const needsStartNode = selectedAlgorithm !== "Floyd-Warshall"

    if (needsStartNode && !startNode) {
      alert("Please click a node to select a start node first!")
      return
    }

    if (selectedAlgorithm === "BFS") {
      const result = bfs(nodes, edges, startNode)
      applyFirstStep(result)
    } else if (selectedAlgorithm === "DFS") {
      const result = dfs(nodes, edges, startNode)
      applyFirstStep(result)
    } else if (selectedAlgorithm === "Dijkstra's") {
      const result = dijkstra(nodes, edges, startNode)
      applyFirstStep(result)
    } else if (selectedAlgorithm === "Bellman-Ford") {
      const result = bellmanFord(nodes, edges, startNode)
      applyFirstStep(result)
    } else if (selectedAlgorithm === "Topological Sort") {
      const result = topologicalSort(nodes, edges, startNode)
      applyFirstStep(result)
    } else if (selectedAlgorithm === "Floyd-Warshall") {
      // Floyd-Warshall computes ALL-PAIRS shortest paths — no start node needed
      const result = floydWarshall(nodes, edges)
      applyFirstStep(result)
    }
  }

  const applyFirstStep = (result) => {
    setSteps(result)
    setCurrentStep(0)
    if (result.length > 0) {
      const step = result[0]
      setNodes((nds) =>
        nds.map((node) => ({
          ...node,
          data: {
            ...node.data,
            color: node.id === step.currentNode ? "#f5a623" : "#e94560",
          },
        }))
      )
    }
  }

  const applyStep = (stepIndex) => {
    if (steps.length === 0) return
    const step = steps[stepIndex]
    setNodes((nds) =>
      nds.map((node) => {
        let color = "#e94560"
        if (node.id === step.currentNode) color = "#f5a623"
        else if (step.visitedNodes.includes(node.id)) color = "#27ae60"
        return { ...node, data: { ...node.data, color } }
      })
    )
    setCurrentStep(stepIndex)
  }

  return (
    <ReactFlowProvider>
      <div style={styles.container}>
        <Sidebar
          selectedAlgorithm={selectedAlgorithm}
          setSelectedAlgorithm={setSelectedAlgorithm}
          isDirected={isDirected}
          setIsDirected={setIsDirected}
          startNode={startNode}
          runAlgorithm={runAlgorithm}
          clearGraph={clearGraph}
        />
        <div style={styles.main}>
          <div style={styles.canvas}>
            <GraphCanvas
              isDirected={isDirected}
              nodes={nodes}
              edges={edges}
              setNodes={setNodes}
              setEdges={setEdges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              nodeId={nodeId}
              setNodeId={setNodeId}
              setStartNode={setStartNode}
              startNode={startNode}
            />
          </div>
          <ExplanationPanel
            steps={steps}
            currentStep={currentStep}
            applyStep={applyStep}
          />
        </div>
      </div>
    </ReactFlowProvider>
  )
}

const styles = {
  container: { display: "flex", height: "100vh" },
  main: { flex: 1, display: "flex", flexDirection: "column" },
  canvas: {
    flex: 1,
    background: "#0f3460",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
}

export default App