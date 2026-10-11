import React, { useState } from 'react';
import { Play, RotateCcw, SkipForward, Sparkles } from 'lucide-react';
import { useLearning } from '../../context/LearningContext';

interface GraphNode {
  id: string;
  x: number;
  y: number;
  neighbors: string[];
}

const GRAPH_NODES: Record<string, GraphNode> = {
  Alice: { id: 'Alice', x: 140, y: 150, neighbors: ['Bob', 'Candy', 'Derek'] },
  Bob: { id: 'Bob', x: 280, y: 70, neighbors: ['Alice', 'Fred'] },
  Candy: { id: 'Candy', x: 280, y: 160, neighbors: ['Alice', 'Helen'] },
  Derek: { id: 'Derek', x: 280, y: 250, neighbors: ['Alice', 'Gina', 'Irena'] },
  Fred: { id: 'Fred', x: 440, y: 70, neighbors: ['Bob', 'Helen'] },
  Helen: { id: 'Helen', x: 440, y: 160, neighbors: ['Candy', 'Fred'] },
  Gina: { id: 'Gina', x: 440, y: 240, neighbors: ['Derek'] },
  Irena: { id: 'Irena', x: 440, y: 310, neighbors: ['Derek'] },
};

interface TraversalStep {
  currentNode: string;
  visited: string[];
  queueOrStack: string[];
  message: string;
}

export const GraphVisualizer: React.FC = () => {
  const { incrementVisualizerInteractions } = useLearning();

  const [traversalType, setTraversalType] = useState<'bfs' | 'dfs'>('bfs');
  const [startNode, setStartNode] = useState<string>('Alice');
  const [steps, setSteps] = useState<TraversalStep[]>([]);
  const [stepIdx, setStepIdx] = useState<number>(0);
  const statusMessage =
    'Select BFS (Queue FIFO for shortest paths) or DFS (Stack LIFO for deep exploration).';

  // Generate BFS Steps
  const generateBFSSteps = (start: string): TraversalStep[] => {
    const list: TraversalStep[] = [];
    const queue: string[] = [start];
    const visited: Set<string> = new Set([start]);

    list.push({
      currentNode: start,
      visited: Array.from(visited),
      queueOrStack: [...queue],
      message: `Enqueued starting vertex "${start}" into FIFO Queue and added to visited set.`,
    });

    while (queue.length > 0) {
      const current = queue.shift()!;

      list.push({
        currentNode: current,
        visited: Array.from(visited),
        queueOrStack: [...queue],
        message: `Dequeued "${current}". Visiting all unvisited neighbors...`,
      });

      const neighbors = GRAPH_NODES[current]?.neighbors || [];
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
          list.push({
            currentNode: current,
            visited: Array.from(visited),
            queueOrStack: [...queue],
            message: `Discovered new neighbor "${neighbor}". Enqueued and marked visited.`,
          });
        }
      }
    }

    list.push({
      currentNode: '',
      visited: Array.from(visited),
      queueOrStack: [],
      message: '🎉 BFS Complete! All reachable vertices visited in shortest-path layer order.',
    });

    return list;
  };

  // Generate DFS Steps
  const generateDFSSteps = (start: string): TraversalStep[] => {
    const list: TraversalStep[] = [];
    const stack: string[] = [start];
    const visited: Set<string> = new Set([start]);

    list.push({
      currentNode: start,
      visited: Array.from(visited),
      queueOrStack: [...stack],
      message: `Pushed starting vertex "${start}" onto LIFO Stack.`,
    });

    while (stack.length > 0) {
      const current = stack.pop()!;

      list.push({
        currentNode: current,
        visited: Array.from(visited),
        queueOrStack: [...stack],
        message: `Popped "${current}" from Stack. Exploring deeper...`,
      });

      const neighbors = GRAPH_NODES[current]?.neighbors || [];
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          stack.push(neighbor);
          list.push({
            currentNode: current,
            visited: Array.from(visited),
            queueOrStack: [...stack],
            message: `Plunging deep: Pushed unvisited neighbor "${neighbor}" onto Stack.`,
          });
        }
      }
    }

    list.push({
      currentNode: '',
      visited: Array.from(visited),
      queueOrStack: [],
      message: '🎉 DFS Complete! Explored graph to maximum depth before backtracking.',
    });

    return list;
  };

  const handleStart = () => {
    incrementVisualizerInteractions();
    const generated =
      traversalType === 'bfs' ? generateBFSSteps(startNode) : generateDFSSteps(startNode);
    setSteps(generated);
    setStepIdx(0);
  };

  const handleStepForward = () => {
    incrementVisualizerInteractions();
    if (stepIdx < steps.length - 1) {
      setStepIdx((prev) => prev + 1);
    }
  };

  const currentStep = steps[stepIdx] || null;

  return (
    <div className="visualizer-sandbox">
      {/* Toolbar */}
      <div className="sandbox-toolbar">
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
          <button
            className={`category-filter-btn ${traversalType === 'bfs' ? 'active' : ''}`}
            onClick={() => {
              setTraversalType('bfs');
              setSteps([]);
            }}
          >
            Breadth-First Search (BFS) [Queue]
          </button>
          <button
            className={`category-filter-btn ${traversalType === 'dfs' ? 'active' : ''}`}
            onClick={() => {
              setTraversalType('dfs');
              setSteps([]);
            }}
          >
            Depth-First Search (DFS) [Stack]
          </button>

          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginLeft: '12px' }}>
            Start Node:
          </span>
          <select
            style={{
              padding: '4px 8px',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--bg-input)',
              border: '1px solid var(--border-subtle)',
              color: '#fff',
              outline: 'none',
            }}
            value={startNode}
            onChange={(e) => {
              setStartNode(e.target.value);
              setSteps([]);
            }}
          >
            {Object.keys(GRAPH_NODES).map((k) => (
              <option key={k} value={k}>
                {k}
              </option>
            ))}
          </select>
        </div>

        {/* Controls */}
        <div className="sandbox-controls">
          <button className="btn btn-primary" style={{ padding: '8px 16px' }} onClick={handleStart}>
            <Play size={15} /> Start Traversal
          </button>
          <button
            className="btn btn-secondary"
            style={{ padding: '8px 14px' }}
            onClick={handleStepForward}
            disabled={steps.length === 0 || stepIdx >= steps.length - 1}
          >
            <SkipForward size={15} /> Step
          </button>
          <button
            className="btn btn-secondary"
            style={{ padding: '8px 14px' }}
            onClick={() => {
              setSteps([]);
              setStepIdx(0);
            }}
          >
            <RotateCcw size={15} /> Reset
          </button>
        </div>
      </div>

      {/* Stage Area */}
      <div className="sandbox-stage" style={{ minHeight: '450px' }}>
        {/* Status Pills */}
        <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <div className="stat-pill" style={{ color: 'var(--accent-indigo-light)' }}>
            <span>Visited Set: [{currentStep?.visited.join(', ') || 'none'}]</span>
          </div>
          <div className="stat-pill" style={{ color: 'var(--accent-cyan)' }}>
            <span>
              {traversalType === 'bfs' ? 'FIFO Queue' : 'LIFO Stack'}: [
              {currentStep?.queueOrStack.join(', ') || 'empty'}]
            </span>
          </div>
        </div>

        {/* SVG Graph Network */}
        <svg width="600" height="360" style={{ maxWidth: '100%', overflow: 'visible' }}>
          {/* Edges */}
          {Object.values(GRAPH_NODES).map((node) =>
            node.neighbors.map((nKey) => {
              const targetNode = GRAPH_NODES[nKey];
              if (!targetNode || node.id > targetNode.id) return null; // Avoid duplicate lines

              const isConnectedAndVisited =
                currentStep?.visited.includes(node.id) &&
                currentStep?.visited.includes(targetNode.id);

              return (
                <line
                  key={`${node.id}-${targetNode.id}`}
                  x1={node.x}
                  y1={node.y}
                  x2={targetNode.x}
                  y2={targetNode.y}
                  stroke={
                    isConnectedAndVisited
                      ? 'var(--accent-indigo)'
                      : 'rgba(255, 255, 255, 0.2)'
                  }
                  strokeWidth={isConnectedAndVisited ? '3' : '1.5'}
                />
              );
            })
          )}

          {/* Vertices (Nodes) */}
          {Object.values(GRAPH_NODES).map((node) => {
            const isVisited = currentStep?.visited.includes(node.id);
            const isCurrent = currentStep?.currentNode === node.id;

            return (
              <g
                key={node.id}
                onClick={() => {
                  setStartNode(node.id);
                  setSteps([]);
                }}
                style={{ cursor: 'pointer' }}
              >
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="26"
                  fill={
                    isCurrent
                      ? 'var(--grad-primary)'
                      : isVisited
                      ? 'rgba(99, 102, 241, 0.4)'
                      : '#1e293b'
                  }
                  stroke={
                    isCurrent
                      ? '#fff'
                      : isVisited
                      ? 'var(--accent-indigo)'
                      : 'rgba(255, 255, 255, 0.3)'
                  }
                  strokeWidth="2.5"
                />
                <text
                  x={node.x}
                  y={node.y + 4}
                  textAnchor="middle"
                  fill="#fff"
                  fontSize="12"
                  fontWeight="bold"
                >
                  {node.id}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Step Logger */}
      <div className="sandbox-step-logger">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={16} color="var(--accent-indigo-light)" />
          <span style={{ color: '#e2e8f0', fontWeight: 500 }}>
            {currentStep?.message || statusMessage}
          </span>
        </div>
      </div>
    </div>
  );
};
