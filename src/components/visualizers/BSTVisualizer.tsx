import React, { useState } from 'react';
import { Plus, Search, Trash2, Play, Sparkles } from 'lucide-react';
import { useLearning } from '../../context/LearningContext';

class BSTNode {
  val: number;
  left: BSTNode | null = null;
  right: BSTNode | null = null;
  constructor(val: number) {
    this.val = val;
  }
}

export const BSTVisualizer: React.FC = () => {
  const { incrementVisualizerInteractions } = useLearning();

  const [root, setRoot] = useState<BSTNode | null>(() => {
    // Initial sample tree: [50, 25, 75, 12, 37, 63, 88]
    const r = new BSTNode(50);
    r.left = new BSTNode(25);
    r.right = new BSTNode(75);
    r.left.left = new BSTNode(12);
    r.left.right = new BSTNode(37);
    r.right.left = new BSTNode(63);
    r.right.right = new BSTNode(88);
    return r;
  });

  const [inputVal, setInputVal] = useState<string>('');
  const [highlightedNodes, setHighlightedNodes] = useState<number[]>([]);
  const [traversalOutput, setTraversalOutput] = useState<number[]>([]);
  const [statusMessage, setStatusMessage] = useState<string>(
    'Binary Search Tree ready. Invariant: Left < Root < Right. Operations take O(log N) average time.'
  );

  // Deep clone tree helper
  const cloneTree = (node: BSTNode | null): BSTNode | null => {
    if (!node) return null;
    const cloned = new BSTNode(node.val);
    cloned.left = cloneTree(node.left);
    cloned.right = cloneTree(node.right);
    return cloned;
  };

  // Insert helper
  const insertNode = (node: BSTNode | null, val: number): BSTNode => {
    if (!node) return new BSTNode(val);
    if (val < node.val) {
      node.left = insertNode(node.left, val);
    } else if (val > node.val) {
      node.right = insertNode(node.right, val);
    }
    return node;
  };

  const handleInsert = () => {
    const num = parseInt(inputVal, 10);
    if (isNaN(num)) return;
    incrementVisualizerInteractions();

    const newTree = cloneTree(root);
    const updated = insertNode(newTree, num);
    setRoot(updated);
    setHighlightedNodes([num]);
    setStatusMessage(`Inserted node ${num} into BST in O(log N) steps!`);
    setInputVal('');
  };

  // Search helper
  const handleSearch = () => {
    const num = parseInt(inputVal, 10);
    if (isNaN(num) || !root) return;
    incrementVisualizerInteractions();

    const path: number[] = [];
    let curr: BSTNode | null = root;
    let found = false;

    while (curr) {
      path.push(curr.val);
      if (num === curr.val) {
        found = true;
        break;
      } else if (num < curr.val) {
        curr = curr.left;
      } else {
        curr = curr.right;
      }
    }

    setHighlightedNodes(path);
    if (found) {
      setStatusMessage(
        `🎉 FOUND ${num} in ${path.length} comparisons! Search path: ${path.join(' → ')}`
      );
    } else {
      setStatusMessage(
        `${num} was NOT found in BST. Examined path: ${path.join(' → ')}`
      );
    }
  };

  // In-order successor finder
  const findMin = (node: BSTNode): BSTNode => {
    let curr = node;
    while (curr.left) curr = curr.left;
    return curr;
  };

  // Delete node helper (handles 0, 1, and 2 children cases)
  const deleteNode = (node: BSTNode | null, val: number): BSTNode | null => {
    if (!node) return null;
    if (val < node.val) {
      node.left = deleteNode(node.left, val);
    } else if (val > node.val) {
      node.right = deleteNode(node.right, val);
    } else {
      // Found node to delete!
      // Case 1 & 2: 0 or 1 child
      if (!node.left) return node.right;
      if (!node.right) return node.left;

      // Case 3: 2 children -> replace with In-Order Successor
      const successor = findMin(node.right);
      node.val = successor.val;
      node.right = deleteNode(node.right, successor.val);
    }
    return node;
  };

  const handleDelete = () => {
    const num = parseInt(inputVal, 10);
    if (isNaN(num) || !root) return;
    incrementVisualizerInteractions();

    const newTree = cloneTree(root);
    const updated = deleteNode(newTree, num);
    setRoot(updated);
    setHighlightedNodes([]);
    setStatusMessage(`Deleted node ${num} from BST! Replaced with In-Order Successor if 2 children.`);
    setInputVal('');
  };

  const handleInOrderTraversal = () => {
    incrementVisualizerInteractions();
    const result: number[] = [];
    const traverse = (node: BSTNode | null) => {
      if (!node) return;
      traverse(node.left);
      result.push(node.val);
      traverse(node.right);
    };
    traverse(root);
    setTraversalOutput(result);
    setHighlightedNodes(result);
    setStatusMessage(
      `In-Order Traversal (Left → Root → Right) always outputs values in ASCENDING sorted order: [${result.join(
        ', '
      )}]`
    );
  };

  // Render SVG tree coordinates
  interface RenderNode {
    val: number;
    x: number;
    y: number;
    left?: RenderNode;
    right?: RenderNode;
  }

  const buildCoordinates = (
    node: BSTNode | null,
    x: number,
    y: number,
    offset: number
  ): RenderNode | null => {
    if (!node) return null;
    const rNode: RenderNode = { val: node.val, x, y };
    if (node.left) {
      rNode.left = buildCoordinates(node.left, x - offset, y + 70, offset / 1.9)!;
    }
    if (node.right) {
      rNode.right = buildCoordinates(node.right, x + offset, y + 70, offset / 1.9)!;
    }
    return rNode;
  };

  const coordTree = buildCoordinates(root, 360, 50, 160);

  const renderSvgLines = (node: RenderNode | null): React.ReactNode => {
    if (!node) return null;
    return (
      <>
        {node.left && (
          <line
            x1={node.x}
            y1={node.y}
            x2={node.left.x}
            y2={node.left.y}
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="2"
          />
        )}
        {node.right && (
          <line
            x1={node.x}
            y1={node.y}
            x2={node.right.x}
            y2={node.right.y}
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="2"
          />
        )}
        {renderSvgLines(node.left || null)}
        {renderSvgLines(node.right || null)}
      </>
    );
  };

  const renderSvgNodes = (node: RenderNode | null): React.ReactNode => {
    if (!node) return null;
    const isHighlighted = highlightedNodes.includes(node.val);

    return (
      <>
        <g style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}>
          <circle
            cx={node.x}
            cy={node.y}
            r="22"
            fill={isHighlighted ? 'url(#nodeGradActive)' : '#1e293b'}
            stroke={isHighlighted ? '#10b981' : 'rgba(255, 255, 255, 0.3)'}
            strokeWidth="2.5"
            filter={isHighlighted ? 'url(#glow)' : 'none'}
          />
          <text
            x={node.x}
            y={node.y + 5}
            textAnchor="middle"
            fill="#fff"
            fontFamily="var(--font-mono)"
            fontWeight="bold"
            fontSize="14"
          >
            {node.val}
          </text>
        </g>
        {renderSvgNodes(node.left || null)}
        {renderSvgNodes(node.right || null)}
      </>
    );
  };

  return (
    <div className="visualizer-sandbox">
      {/* Sandbox Toolbar */}
      <div className="sandbox-toolbar">
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
          <input
            type="number"
            placeholder="Node value..."
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            style={{
              padding: '6px 12px',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--bg-input)',
              border: '1px solid var(--border-subtle)',
              color: '#fff',
              width: '120px',
            }}
          />
          <button className="btn btn-primary" style={{ padding: '6px 12px' }} onClick={handleInsert}>
            <Plus size={14} /> Insert O(log N)
          </button>
          <button className="btn btn-secondary" style={{ padding: '6px 12px' }} onClick={handleSearch}>
            <Search size={14} /> Search Path
          </button>
          <button className="btn btn-secondary" style={{ padding: '6px 12px' }} onClick={handleDelete}>
            <Trash2 size={14} /> Delete Node
          </button>
          <button className="btn btn-secondary" style={{ padding: '6px 12px' }} onClick={handleInOrderTraversal}>
            <Play size={14} /> In-Order Sort
          </button>
        </div>
      </div>

      {/* Stage Area */}
      <div className="sandbox-stage" style={{ minHeight: '420px' }}>
        {traversalOutput.length > 0 && (
          <div
            style={{
              marginBottom: '16px',
              padding: '8px 16px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              color: '#d1fae5',
              fontSize: '0.85rem',
            }}
          >
            <strong>In-Order Output:</strong> [{traversalOutput.join(', ')}]
          </div>
        )}

        <svg width="720" height="320" style={{ maxWidth: '100%', overflow: 'visible' }}>
          <defs>
            <linearGradient id="nodeGradActive" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {renderSvgLines(coordTree)}
          {renderSvgNodes(coordTree)}
        </svg>
      </div>

      {/* Step Logger */}
      <div className="sandbox-step-logger">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={16} color="var(--accent-indigo-light)" />
          <span style={{ color: '#e2e8f0', fontWeight: 500 }}>{statusMessage}</span>
        </div>
      </div>
    </div>
  );
};
