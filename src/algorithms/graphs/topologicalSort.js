export function topologicalSort(nodes, edges, startNodeId) {
  const steps = []
  const visited = new Set()
  const stack = []

  const getNeighbors = (nodeId) => {
    return edges
      .filter(e => e.source === nodeId)
      .map(e => e.target)
  }

  const dfs = (nodeId) => {
    visited.add(nodeId)

    steps.push({
      visitedNodes: [...visited],
      currentNode: nodeId,
      stack: [...stack],
      explanation: `Visiting Node ${nodeId} — exploring all its outgoing neighbors first.`
    })

    const neighbors = getNeighbors(nodeId)
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        steps.push({
          visitedNodes: [...visited],
          currentNode: neighbor,
          stack: [...stack],
          explanation: `Going deeper — visiting neighbor Node ${neighbor} from Node ${nodeId}.`
        })
        dfs(neighbor)
      }
    }

    stack.unshift(nodeId)
    steps.push({
      visitedNodes: [...visited],
      currentNode: nodeId,
      stack: [...stack],
      explanation: `All neighbors of Node ${nodeId} visited. Adding it to the front of the result stack.`
    })
  }

  steps.push({
    visitedNodes: [],
    currentNode: startNodeId,
    stack: [],
    explanation: `Starting Topological Sort. Note: only works on Directed Acyclic Graphs (DAGs).`
  })

  // Run DFS from start node first
  dfs(startNodeId)

  // Then visit any remaining unvisited nodes
  nodes.forEach(node => {
    if (!visited.has(node.id)) {
      dfs(node.id)
    }
  })

  steps.push({
    visitedNodes: [...visited],
    currentNode: null,
    stack: [...stack],
    explanation: `Topological Sort complete! Order: ${stack.join(" → ")}`
  })

  return steps
}