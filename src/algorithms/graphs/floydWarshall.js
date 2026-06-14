export function floydWarshall(nodes, edges) {
  const nodeIds = nodes.map((n) => n.id)
  const n = nodeIds.length
  const indexMap = {}
  nodeIds.forEach((id, i) => (indexMap[id] = i))

  // Initialize distance matrix
  const INF = Infinity
  const dist = Array.from({ length: n }, () => Array(n).fill(INF))
  const next = Array.from({ length: n }, () => Array(n).fill(null))

  // Distance from each node to itself is 0
  for (let i = 0; i < n; i++) {
    dist[i][i] = 0
  }

  // Fill in edge weights
  edges.forEach((e) => {
    const i = indexMap[e.source]
    const j = indexMap[e.target]
    const w = parseFloat(e.label) || 1
    if (i !== undefined && j !== undefined) {
      dist[i][j] = w
      next[i][j] = j
      // For undirected graphs, also set reverse
      if (dist[j][i] === INF) {
        dist[j][i] = w
        next[j][i] = i
      }
    }
  })

  const steps = []

  const snapshot = (matrix) =>
    matrix.map((row) => [...row])

  const snapshotNext = (matrix) =>
    matrix.map((row) => [...row])

  steps.push({
    visitedNodes: [],
    currentNode: null,
    distMatrix: snapshot(dist),
    nextMatrix: snapshotNext(next),
    nodeIds: [...nodeIds],
    highlightK: null,
    highlightI: null,
    highlightJ: null,
    explanation: `Floyd-Warshall initialized. Direct edge weights loaded into the distance matrix. All other pairs set to ∞.`,
  })

  // Main triple loop
  for (let k = 0; k < n; k++) {
    steps.push({
      visitedNodes: nodeIds.slice(0, k + 1),
      currentNode: nodeIds[k],
      distMatrix: snapshot(dist),
      nextMatrix: snapshotNext(next),
      nodeIds: [...nodeIds],
      highlightK: k,
      highlightI: null,
      highlightJ: null,
      explanation: `Using Node ${nodeIds[k]} as intermediate. Checking if routing through it shortens any path.`,
    })

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (dist[i][k] === INF || dist[k][j] === INF) continue
        const newDist = dist[i][k] + dist[k][j]
        if (newDist < dist[i][j]) {
          dist[i][j] = newDist
          next[i][j] = next[i][k]

          steps.push({
            visitedNodes: nodeIds.slice(0, k + 1),
            currentNode: nodeIds[k],
            distMatrix: snapshot(dist),
            nextMatrix: snapshotNext(next),
            nodeIds: [...nodeIds],
            highlightK: k,
            highlightI: i,
            highlightJ: j,
            explanation: `Shorter path found: ${nodeIds[i]} → ${nodeIds[j]} via ${nodeIds[k]} = ${newDist} (was ${dist[i][j] === newDist ? "∞ or more" : dist[i][j]}).`,
          })
        }
      }
    }
  }

  // Check for negative cycles
  let hasNegCycle = false
  for (let i = 0; i < n; i++) {
    if (dist[i][i] < 0) {
      hasNegCycle = true
      break
    }
  }

  steps.push({
    visitedNodes: [...nodeIds],
    currentNode: null,
    distMatrix: snapshot(dist),
    nextMatrix: snapshotNext(next),
    nodeIds: [...nodeIds],
    highlightK: null,
    highlightI: null,
    highlightJ: null,
    explanation: hasNegCycle
      ? `⚠️ Negative cycle detected! Some shortest paths are undefined.`
      : `✅ Floyd-Warshall complete! All-pairs shortest paths computed.`,
  })

  return steps
}