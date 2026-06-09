export function dfs(nodes, edges, startNodeId) {
  const steps = []
  const visited = new Set()
  const stack = [startNodeId]

  const getNeighbors = (nodeId) => {
    return edges
      .filter(e => e.source === nodeId || e.target === nodeId)
      .map(e => e.source === nodeId ? e.target : e.source)
  }

  steps.push({
    visitedNodes: [],
    currentNode: startNodeId,
    stack: [...stack],
    explanation: `Starting DFS from Node ${startNodeId}. Pushing it onto the stack.`
  })

  while (stack.length > 0) {
    const current = stack.pop()

    if (visited.has(current)) continue
    visited.add(current)

    steps.push({
      visitedNodes: [...visited],
      currentNode: current,
      stack: [...stack],
      explanation: `Popped Node ${current} from stack. Marking it as visited.`
    })

    const neighbors = getNeighbors(current)
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        stack.push(neighbor)
        steps.push({
          visitedNodes: [...visited],
          currentNode: current,
          stack: [...stack],
          explanation: `Found unvisited neighbor Node ${neighbor}. Pushing onto stack.`
        })
      }
    }
  }

  steps.push({
    visitedNodes: [...visited],
    currentNode: null,
    stack: [],
    explanation: `DFS complete! Visited all reachable nodes.`
  })

  return steps
}