export function bfs(nodes, edges, startNodeId) {
  const steps = []
  const visited = new Set()
  const queue = [startNodeId]
  visited.add(startNodeId)

  // Helper to get neighbors of a node
  const getNeighbors = (nodeId) => {
    return edges
      .filter(e => e.source === nodeId || e.target === nodeId)
      .map(e => e.source === nodeId ? e.target : e.source)
  }

  steps.push({
    visitedNodes: [startNodeId],
    currentNode: startNodeId,
    queue: [...queue],
    explanation: `Starting BFS from Node ${startNodeId}. Adding it to the queue.`
  })

  while (queue.length > 0) {
    const current = queue.shift()

    const neighbors = getNeighbors(current)

    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor)
        queue.push(neighbor)

        steps.push({
          visitedNodes: [...visited],
          currentNode: neighbor,
          queue: [...queue],
          explanation: `Visiting Node ${neighbor} from Node ${current}. Adding to queue.`
        })
      }
    }
  }

  steps.push({
    visitedNodes: [...visited],
    currentNode: null,
    queue: [],
    explanation: `BFS complete! Visited all reachable nodes.`
  })

  return steps
}