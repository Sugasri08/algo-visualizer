export function dijkstra(nodes, edges, startNodeId) {
  const steps = []
  const distances = {}
  const visited = new Set()
  const previous = {}

  nodes.forEach(node => {
    distances[node.id] = Infinity
    previous[node.id] = null
  })
  distances[startNodeId] = 0

  const getNeighbors = (nodeId) => {
    return edges
      .filter(e => e.source === nodeId || e.target === nodeId)
      .map(e => ({
        id: e.source === nodeId ? e.target : e.source,
        weight: parseFloat(e.label) || 1
      }))
  }

  const getUnvisitedMinNode = () => {
    let minNode = null
    let minDist = Infinity
    Object.keys(distances).forEach(nodeId => {
      if (!visited.has(nodeId) && distances[nodeId] < minDist) {
        minDist = distances[nodeId]
        minNode = nodeId
      }
    })
    return minNode
  }

  steps.push({
    visitedNodes: [],
    currentNode: startNodeId,
    distances: { ...distances },
    previous: { ...previous },
    explanation: `Starting Dijkstra's from Node ${startNodeId}. Setting its distance to 0, all others to ∞.`
  })

  while (true) {
    const current = getUnvisitedMinNode()
    if (!current) break
    if (distances[current] === Infinity) break

    visited.add(current)

    steps.push({
      visitedNodes: [...visited],
      currentNode: current,
      distances: { ...distances },
      previous: { ...previous },
      explanation: `Visiting Node ${current} — shortest distance is ${distances[current]}.`
    })

    const neighbors = getNeighbors(current)
    for (const neighbor of neighbors) {
      if (visited.has(neighbor.id)) continue

      const newDist = distances[current] + neighbor.weight
      if (newDist < distances[neighbor.id]) {
        distances[neighbor.id] = newDist
        previous[neighbor.id] = current

        steps.push({
          visitedNodes: [...visited],
          currentNode: neighbor.id,
          distances: { ...distances },
          previous: { ...previous },
          explanation: `Updated distance to Node ${neighbor.id} → ${newDist} (via Node ${current}, weight ${neighbor.weight}).`
        })
      }
    }
  }

  steps.push({
    visitedNodes: [...visited],
    currentNode: null,
    distances: { ...distances },
    previous: { ...previous },
    explanation: `Dijkstra's complete!`
  })

  return steps
}