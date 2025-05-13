export function dijkstra(grid, start, end) {
    const visited = [];
    start.distance = 0;
    const unvisited = getAllNodes(grid);
    while (!!unvisited.length) {
      sortNodesByDistance(unvisited);
      const closest = unvisited.shift();
      // If we encounter a wall, we skip it.
      if (closest.isWall) continue;
      // If the closest node is at a distance of infinity,
      // we must be trapped and should therefore stop.
      if (closest.distance === Infinity) return visited;
      closest.isVisited = true;
      visited.push(closest);
      if (closest === end) return visited;
      updateUnvisitedNeighbors(closest, grid);
    }
  }
  
  function sortNodesByDistance(unvisited) {
    unvisited.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
  }
  
  function updateUnvisitedNeighbors(node, grid) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
      neighbor.distance = node.distance + 1;
      neighbor.previousNode = node;
    }
  }
  
  function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const {col, row} = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isVisited);
  }
  
  function getAllNodes(grid) {
    const nodes = [];
    for (const row of grid) {
      for (const node of row) {
        nodes.push(node);
      }
    }
    return nodes;
  }
  
  // Backtracks from the finishNode to find the shortest path.
  // Only works when called *after* the dijkstra method above.
  export function getNodesInShortestPathOrder(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
  }