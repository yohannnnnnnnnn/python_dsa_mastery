import React, { useState } from 'react';
import { Plus, Trash2, RotateCcw, ArrowRight, Sparkles } from 'lucide-react';
import { useLearning } from '../../context/LearningContext';

interface LLNode {
  id: string;
  value: string;
}

export const LinkedListVisualizer: React.FC = () => {
  const { incrementVisualizerInteractions } = useLearning();

  const [nodes, setNodes] = useState<LLNode[]>([
    { id: '1', value: '10' },
    { id: '2', value: '25' },
    { id: '3', value: '42' },
    { id: '4', value: '88' },
  ]);

  const [inputVal, setInputVal] = useState('');
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>(
    'Singly Linked List initialized. Notice how nodes point to the next node in memory.'
  );

  const handleInsertFront = () => {
    if (!inputVal.trim()) return;
    incrementVisualizerInteractions();
    const newNode: LLNode = {
      id: Math.random().toString(),
      value: inputVal.trim(),
    };
    setNodes([newNode, ...nodes]);
    setActiveNodeId(newNode.id);
    setStatusMessage(
      `⚡ Inserted "${newNode.value}" at Head in O(1) Constant Time! Pointed new node's next pointer to old head.`
    );
    setInputVal('');
  };

  const handleInsertEnd = () => {
    if (!inputVal.trim()) return;
    incrementVisualizerInteractions();
    const newNode: LLNode = {
      id: Math.random().toString(),
      value: inputVal.trim(),
    };
    setNodes([...nodes, newNode]);
    setActiveNodeId(newNode.id);
    setStatusMessage(
      `Inserted "${newNode.value}" at Tail in O(N) Time (traversed ${nodes.length} nodes to locate the end).`
    );
    setInputVal('');
  };

  const handleDelete = (id: string, value: string) => {
    incrementVisualizerInteractions();
    setNodes(nodes.filter((n) => n.id !== id));
    setStatusMessage(`Deleted node with value "${value}". Pointers stitched around the deleted node.`);
  };

  const handleReverse = () => {
    incrementVisualizerInteractions();
    setNodes([...nodes].reverse());
    setStatusMessage(
      'Reversed Linked List in O(N) Time using 3 pointers: prev, current, and next_node!'
    );
  };

  return (
    <div className="visualizer-sandbox">
      {/* Sandbox Toolbar */}
      <div className="sandbox-toolbar">
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
          <input
            type="text"
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
          <button className="btn btn-primary" style={{ padding: '6px 14px' }} onClick={handleInsertFront}>
            <Plus size={14} /> Insert at Front O(1)
          </button>
          <button className="btn btn-secondary" style={{ padding: '6px 14px' }} onClick={handleInsertEnd}>
            <Plus size={14} /> Insert at End O(N)
          </button>
          <button className="btn btn-secondary" style={{ padding: '6px 14px' }} onClick={handleReverse}>
            <RotateCcw size={14} /> Reverse List
          </button>
        </div>
      </div>

      {/* Stage Area */}
      <div className="sandbox-stage">
        {/* Head Indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
          <span className="pointer-tag mid">HEAD POINTER</span>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Points to first node at memory address #{nodes[0]?.id.slice(0, 4) || 'NULL'}
          </span>
        </div>

        {/* Linked Nodes Visual Chain */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '24px',
            maxWidth: '100%',
            overflowX: 'auto',
          }}
        >
          {nodes.map((node, index) => {
            const isHead = index === 0;
            const isTail = index === nodes.length - 1;
            const isHighlighted = activeNodeId === node.id;

            return (
              <React.Fragment key={node.id}>
                {/* Node Box with 2 Compartments: [ Value | Next Pointer ] */}
                <div
                  style={{
                    display: 'flex',
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    border: `2px solid ${
                      isHighlighted ? 'var(--accent-emerald)' : 'var(--border-subtle)'
                    }`,
                    background: '#1e293b',
                    boxShadow: isHighlighted ? '0 0 20px rgba(16, 185, 129, 0.4)' : 'var(--shadow-sm)',
                    transform: isHighlighted ? 'scale(1.08)' : 'none',
                    transition: 'all 0.25s ease',
                  }}
                >
                  {/* Left Compartment: Data Payload */}
                  <div
                    style={{
                      padding: '16px 20px',
                      background: isHead ? 'rgba(99, 102, 241, 0.2)' : 'transparent',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      minWidth: '70px',
                    }}
                  >
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>DATA</span>
                    <strong style={{ fontSize: '1.3rem', color: '#fff', fontFamily: 'var(--font-mono)' }}>
                      {node.value}
                    </strong>
                    {isHead && (
                      <span style={{ fontSize: '0.65rem', color: 'var(--accent-indigo-light)', fontWeight: 800 }}>
                        (HEAD)
                      </span>
                    )}
                    {isTail && !isHead && (
                      <span style={{ fontSize: '0.65rem', color: 'var(--accent-cyan)', fontWeight: 800 }}>
                        (TAIL)
                      </span>
                    )}
                  </div>

                  {/* Right Compartment: Next Pointer Arrow */}
                  <div
                    style={{
                      padding: '16px 12px',
                      background: 'rgba(15, 23, 42, 0.8)',
                      borderLeft: '1px solid var(--border-subtle)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>NEXT</span>
                    <span style={{ color: 'var(--accent-amber)', fontSize: '1.2rem' }}>•</span>
                    <button
                      onClick={() => handleDelete(node.id, node.value)}
                      style={{ marginTop: '4px', color: 'var(--text-muted)' }}
                      title="Delete Node"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>

                {/* Arrow to Next Node */}
                {!isTail ? (
                  <div style={{ display: 'flex', alignItems: 'center', color: 'var(--accent-amber)' }}>
                    <ArrowRight size={24} />
                  </div>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <ArrowRight size={24} color="var(--accent-amber)" />
                    <span
                      style={{
                        padding: '6px 12px',
                        borderRadius: 'var(--radius-sm)',
                        background: 'rgba(244, 63, 94, 0.15)',
                        border: '1px solid rgba(244, 63, 94, 0.3)',
                        color: 'var(--accent-rose)',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 700,
                        fontSize: '0.8rem',
                      }}
                    >
                      NULL
                    </span>
                  </div>
                )}
              </React.Fragment>
            );
          })}

          {nodes.length === 0 && (
            <span style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>
              Linked List is empty. Insert a node to begin.
            </span>
          )}
        </div>
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
