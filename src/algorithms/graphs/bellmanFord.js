export function bellmanFord(nodes, edges, startNodeId) {
  const steps = []
  const distances = {}
  const previous = {}

  nodes.forEach(node => {
    distances[node.id] = Infinity
    previous[node.id] = null
  })
  distances[startNodeId] = 0

  steps.push({
    visitedNodes: [],
    currentNode: startNodeId,
    distances: { ...distances },
    previous: { ...previous },
    explanation: `Starting Bellman-Ford from Node ${startNodeId}. Setting its distance to 0, all others to ∞.`
  })

  const nodeCount = nodes.length

  // Relax all edges nodeCount - 1 times
  for (let i = 0; i < nodeCount - 1; i++) {
    let updatedThisRound = false

    for (const edge of edges) {
      const u = edge.source
      const v = edge.target
      const weight = parseFloat(edge.label) || 1

      if (distances[u] !== Infinity && distances[u] + weight < distances[v]) {
        distances[v] = distances[u] + weight
        previous[v] = u
        updatedThisRound = true

        steps.push({
          visitedNodes: Object.keys(distances).filter(k => distances[k] !== Infinity),
          currentNode: v,
          distances: { ...distances },
          previous: { ...previous },
          explanation: `Round ${i + 1}: Relaxing edge Node ${u} → Node ${v} (weight ${weight}). Updated distance to Node ${v} → ${distances[v]}.`
        })
      }

      // For undirected graphs, relax the reverse edge too
      if (distances[v] !== Infinity && distances[v] + weight < distances[u]) {
        distances[u] = distances[v] + weight
        previous[u] = v
        updatedThisRound = true

        steps.push({
          visitedNodes: Object.keys(distances).filter(k => distances[k] !== Infinity),
          currentNode: u,
          distances: { ...distances },
          previous: { ...previous },
          explanation: `Round ${i + 1}: Relaxing edge Node ${v} → Node ${u} (weight ${weight}). Updated distance to Node ${u} → ${distances[u]}.`
        })
      }
    }

    if (!updatedThisRound) {
      steps.push({
        visitedNodes: Object.keys(distances).filter(k => distances[k] !== Infinity),
        currentNode: null,
        distances: { ...distances },
        previous: { ...previous },
        explanation: `Round ${i + 1}: No updates made — algorithm converged early!`
      })
      break
    }
  }

  // Check for negative cycles
  let hasNegativeCycle = false
  for (const edge of edges) {
    const u = edge.source
    const v = edge.target
    const weight = parseFloat(edge.label) || 1
    if (distances[u] !== Infinity && distances[u] + weight < distances[v]) {
      hasNegativeCycle = true
      break
    }
  }

  steps.push({
    visitedNodes: Object.keys(distances).filter(k => distances[k] !== Infinity),
    currentNode: null,
    distances: { ...distances },
    previous: { ...previous },
    explanation: hasNegativeCycle
      ? `Bellman-Ford complete — ⚠️ Negative cycle detected! Shortest paths are not reliable.`
      : `Bellman-Ford complete! No negative cycles found. Final shortest distances calculated.`
  })

  return steps
}