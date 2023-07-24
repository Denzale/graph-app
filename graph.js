class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  ddVertices(vertexArray) {
    for (const vertex of vertexArray) {
      this.addVertex(vertex);
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }


  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }


  removeVertex(vertex) {
    // Remove the vertex from the nodes property
    this.nodes.delete(vertex);

    // Update the adjacency lists of other vertices to remove references to the removed vertex
    for (const v of this.nodes) {
      v.adjacent.delete(vertex);
    }
  }


  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    const visited = new Set();
    const result = [];

    function dfsHelper(node) {
      if (!node || visited.has(node)) {
        return;
      }

      visited.add(node);
      result.push(node.value);

      for (const neighbor of node.adjacent) {
        dfsHelper(neighbor);
      }
    }

    dfsHelper(start);
    return result;
  }


  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    const visited = new Set();
    const result = [];
    const queue = [];

    queue.push(start);
    visited.add(start);

    while (queue.length !== 0) {
      const current = queue.shift();
      result.push(current.value);

      for (const neighbor of current.adjacent) {
        if (!visited.has(neighbor)) {
          queue.push(neighbor);
          visited.add(neighbor);
        }
      }
    }

    return result;
  }
}

module.exports = { Graph, Node }