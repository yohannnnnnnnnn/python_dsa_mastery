import React, { useState } from 'react';
import { Plus, Trash2, Sparkles } from 'lucide-react';
import { useLearning } from '../../context/LearningContext';

export const HeapVisualizer: React.FC = () => {
  const { incrementVisualizerInteractions } = useLearning();

  const [heapType, setHeapType] = useState<'max' | 'min'>('max');
  const [heapArray, setHeapArray] = useState<number[]>([100, 80, 70, 60, 50, 65, 45]);
  const [inputVal, setInputVal] = useState<string>('');
  const [activeIndices, setActiveIndices] = useState<number[]>([]);
  const [statusMessage, setStatusMessage] = useState<string>(
    'Max-Heap initialized. Condition: Parent >= Children. Stored directly in a flat array!'
  );

  const handleInsert = () => {
    const val = parseInt(inputVal, 10);
    if (isNaN(val)) return;
    incrementVisualizerInteractions();

    const arr = [...heapArray, val];
    let curr = arr.length - 1;
    const swaps: number[] = [curr];

    // Trickle Up
    while (curr > 0) {
      const parent = Math.floor((curr - 1) / 2);
      const shouldSwap = heapType === 'max' ? arr[curr] > arr[parent] : arr[curr] < arr[parent];

      if (shouldSwap) {
        const temp = arr[curr];
        arr[curr] = arr[parent];
        arr[parent] = temp;
        swaps.push(parent);
        curr = parent;
      } else {
        break;
      }
    }

    setHeapArray(arr);
    setActiveIndices(swaps);
    setStatusMessage(
      `Inserted ${val}. Trickled up to index ${curr} in O(log N) steps!`
    );
    setInputVal('');
  };

  const handleExtract = () => {
    if (heapArray.length === 0) return;
    incrementVisualizerInteractions();

    if (heapArray.length === 1) {
      const rootVal = heapArray[0];
      setHeapArray([]);
      setStatusMessage(`Extracted root value ${rootVal}. Heap is now empty.`);
      return;
    }

    const arr = [...heapArray];
    const rootVal = arr[0];
    arr[0] = arr.pop()!; // Move last item to root

    let curr = 0;
    const swaps: number[] = [0];

    // Trickle Down
    while (true) {
      const left = 2 * curr + 1;
      const right = 2 * curr + 2;
      let target = curr;

      if (heapType === 'max') {
        if (left < arr.length && arr[left] > arr[target]) target = left;
        if (right < arr.length && arr[right] > arr[target]) target = right;
      } else {
        if (left < arr.length && arr[left] < arr[target]) target = left;
        if (right < arr.length && arr[right] < arr[target]) target = right;
      }

      if (target !== curr) {
        const temp = arr[curr];
        arr[curr] = arr[target];
        arr[target] = temp;
        swaps.push(target);
        curr = target;
      } else {
        break;
      }
    }

    setHeapArray(arr);
    setActiveIndices(swaps);
    setStatusMessage(
      `Extracted ${heapType === 'max' ? 'Maximum' : 'Minimum'} root ${rootVal} in O(log N) time!`
    );
  };

  // Node coordinate builder for Complete Binary Tree
  const getCoordinates = (index: number): { x: number; y: number } => {
    // Level 0: 1 node (center)
    // Level 1: 2 nodes
    // Level 2: 4 nodes
    // Level 3: 8 nodes
    const level = Math.floor(Math.log2(index + 1));
    const nodesInLevel = Math.pow(2, level);
    const posInLevel = index - (nodesInLevel - 1);
    const spacing = 680 / (nodesInLevel + 1);
    const x = spacing * (posInLevel + 1);
    const y = 40 + level * 70;
    return { x, y };
  };

  return (
    <div className="visualizer-sandbox">
      {/* Sandbox Toolbar */}
      <div className="sandbox-toolbar">
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
          <button
            className={`category-filter-btn ${heapType === 'max' ? 'active' : ''}`}
            onClick={() => {
              setHeapType('max');
              setHeapArray([100, 80, 70, 60, 50, 65, 45]);
            }}
          >
            Max-Heap
          </button>
          <button
            className={`category-filter-btn ${heapType === 'min' ? 'active' : ''}`}
            onClick={() => {
              setHeapType('min');
              setHeapArray([10, 25, 15, 40, 55, 30, 70]);
            }}
          >
            Min-Heap
          </button>

          <input
            type="number"
            placeholder="Number..."
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            style={{
              padding: '6px 12px',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--bg-input)',
              border: '1px solid var(--border-subtle)',
              color: '#fff',
              width: '110px',
              marginLeft: '8px',
            }}
          />
          <button className="btn btn-primary" style={{ padding: '6px 12px' }} onClick={handleInsert}>
            <Plus size={14} /> Insert O(log N)
          </button>
          <button
            className="btn btn-secondary"
            style={{ padding: '6px 12px' }}
            onClick={handleExtract}
            disabled={heapArray.length === 0}
          >
            <Trash2 size={14} /> Extract {heapType === 'max' ? 'Max' : 'Min'} O(log N)
          </button>
        </div>
      </div>

      {/* Stage Area */}
      <div className="sandbox-stage" style={{ minHeight: '440px' }}>
        {/* Dual View 1: Flat Array Mapping */}
        <div style={{ marginBottom: '24px', width: '100%', maxWidth: '720px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
            <span>Dual View: Flat Memory Array Representation</span>
            <span>Formula: Left = 2i+1, Right = 2i+2</span>
          </div>

          <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', padding: '8px', background: 'rgba(15, 23, 42, 0.6)', borderRadius: 'var(--radius-md)' }}>
            {heapArray.map((val, idx) => {
              const isActive = activeIndices.includes(idx);
              return (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '46px',
                      borderRadius: 'var(--radius-sm)',
                      background: isActive ? 'var(--grad-primary)' : '#1e293b',
                      border: `1px solid ${isActive ? 'var(--accent-indigo)' : 'var(--border-subtle)'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 700,
                      fontSize: '1rem',
                      boxShadow: isActive ? 'var(--glow-indigo)' : 'none',
                    }}
                  >
                    {val}
                  </div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    [{idx}]
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dual View 2: SVG Complete Binary Tree */}
        <svg width="700" height="240" style={{ maxWidth: '100%', overflow: 'visible' }}>
          {/* Branch Lines */}
          {heapArray.map((_, idx) => {
            const leftIdx = 2 * idx + 1;
            const rightIdx = 2 * idx + 2;
            const parentCoord = getCoordinates(idx);

            return (
              <React.Fragment key={idx}>
                {leftIdx < heapArray.length && (
                  <line
                    x1={parentCoord.x}
                    y1={parentCoord.y}
                    x2={getCoordinates(leftIdx).x}
                    y2={getCoordinates(leftIdx).y}
                    stroke="rgba(255, 255, 255, 0.2)"
                    strokeWidth="2"
                  />
                )}
                {rightIdx < heapArray.length && (
                  <line
                    x1={parentCoord.x}
                    y1={parentCoord.y}
                    x2={getCoordinates(rightIdx).x}
                    y2={getCoordinates(rightIdx).y}
                    stroke="rgba(255, 255, 255, 0.2)"
                    strokeWidth="2"
                  />
                )}
              </React.Fragment>
            );
          })}

          {/* Node Circles */}
          {heapArray.map((val, idx) => {
            const coord = getCoordinates(idx);
            const isActive = activeIndices.includes(idx);

            return (
              <g key={idx}>
                <circle
                  cx={coord.x}
                  cy={coord.y}
                  r="20"
                  fill={isActive ? 'var(--accent-indigo)' : '#1e293b'}
                  stroke={isActive ? '#38bdf8' : 'rgba(255, 255, 255, 0.3)'}
                  strokeWidth="2"
                />
                <text
                  x={coord.x}
                  y={coord.y + 5}
                  textAnchor="middle"
                  fill="#fff"
                  fontFamily="var(--font-mono)"
                  fontWeight="bold"
                  fontSize="13"
                >
                  {val}
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
          <span style={{ color: '#e2e8f0', fontWeight: 500 }}>{statusMessage}</span>
        </div>
      </div>
    </div>
  );
};
