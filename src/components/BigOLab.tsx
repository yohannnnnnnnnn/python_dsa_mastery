import React, { useState } from 'react';
import { Activity, Clock, Database } from 'lucide-react';

export const BigOLab: React.FC = () => {
  const [inputN, setInputN] = useState<number>(100);

  // Big O Complexity Matrix Data
  const complexityMatrix = [
    { name: 'Array / Python List', access: 'O(1)', search: 'O(N)', insertHead: 'O(N)', insertTail: 'O(1)', delete: 'O(N)', space: 'O(N)' },
    { name: 'Ordered Array', access: 'O(1)', search: 'O(log N)', insertHead: 'O(N)', insertTail: 'O(N)', delete: 'O(N)', space: 'O(N)' },
    { name: 'Hash Table / Dict', access: 'N/A', search: 'O(1)', insertHead: 'O(1)', insertTail: 'O(1)', delete: 'O(1)', space: 'O(N)' },
    { name: 'Singly Linked List', access: 'O(N)', search: 'O(N)', insertHead: 'O(1)', insertTail: 'O(N)', delete: 'O(N)', space: 'O(N)' },
    { name: 'Doubly Linked List', access: 'O(N)', search: 'O(N)', insertHead: 'O(1)', insertTail: 'O(1)', delete: 'O(1)', space: 'O(N)' },
    { name: 'Stack (LIFO)', access: 'N/A', search: 'O(N)', insertHead: 'O(1) Push', insertTail: 'N/A', delete: 'O(1) Pop', space: 'O(N)' },
    { name: 'Queue (FIFO)', access: 'N/A', search: 'O(N)', insertHead: 'O(1) Enq', insertTail: 'N/A', delete: 'O(1) Deq', space: 'O(N)' },
    { name: 'Binary Search Tree (Balanced)', access: 'N/A', search: 'O(log N)', insertHead: 'O(log N)', insertTail: 'O(log N)', delete: 'O(log N)', space: 'O(N)' },
    { name: 'Binary Heap (Priority Queue)', access: 'O(1) Root', search: 'O(N)', insertHead: 'O(log N)', insertTail: 'O(log N)', delete: 'O(log N)', space: 'O(N)' },
    { name: 'Trie (Prefix Tree)', access: 'N/A', search: 'O(K)', insertHead: 'O(K)', insertTail: 'O(K)', delete: 'O(K)', space: 'O(N · K)' },
  ];

  const sortingMatrix = [
    { name: 'Bubble Sort', best: 'O(N)', average: 'O(N²)', worst: 'O(N²)', space: 'O(1)', inPlace: 'Yes', stable: 'Yes' },
    { name: 'Selection Sort', best: 'O(N²)', average: 'O(N²)', worst: 'O(N²)', space: 'O(1)', inPlace: 'Yes', stable: 'No' },
    { name: 'Insertion Sort', best: 'O(N)', average: 'O(N²)', worst: 'O(N²)', space: 'O(1)', inPlace: 'Yes', stable: 'Yes' },
    { name: 'Quicksort', best: 'O(N log N)', average: 'O(N log N)', worst: 'O(N²)', space: 'O(log N)', inPlace: 'Yes', stable: 'No' },
  ];

  // Helper for operations calculation
  const calculateSteps = (n: number) => {
    return [
      { name: 'O(1) Constant', steps: 1, color: '#10b981', timeEst: '1 nanosecond' },
      { name: 'O(log N) Logarithmic', steps: Math.ceil(Math.log2(n)), color: '#06b6d4', timeEst: '< 1 microsecond' },
      { name: 'O(N) Linear', steps: n, color: '#3b82f6', timeEst: n > 1e7 ? '10 milliseconds' : '< 1 millisecond' },
      { name: 'O(N log N) Linearithmic', steps: Math.ceil(n * Math.log2(n)), color: '#8b5cf6', timeEst: n > 1e6 ? '20 milliseconds' : '< 1 millisecond' },
      { name: 'O(N²) Quadratic', steps: n * n, color: '#f59e0b', timeEst: n >= 100000 ? '1.5 hours' : n >= 10000 ? '10 seconds' : '< 1 millisecond' },
      { name: 'O(2^N) Exponential', steps: n > 40 ? 'Infinity (Trillions+)' : Math.pow(2, n).toLocaleString(), color: '#f43f5e', timeEst: n > 35 ? 'Years / Centuries!' : '< 1 second' },
    ];
  };

  const stepsData = calculateSteps(inputN);

  return (
    <div className="big-o-lab-view" style={{ maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-amber)', marginBottom: '6px' }}>
          <Activity size={20} />
          <span style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Mathematical Asymptotic Analysis
          </span>
        </div>
        <h1 style={{ fontSize: '2.2rem', marginBottom: '8px' }}>Big-O Benchmark & Matrix Lab</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
          Understand how algorithmic step growth diverges at scale and compare cheat sheets across all structures.
        </p>
      </div>

      {/* Interactive Time Machine Calculator */}
      <div className="glass-card" style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
          <div>
            <h3 style={{ fontSize: '1.3rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={20} color="var(--accent-amber)" />
              <span>Operation Step Calculator</span>
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              Change input size N to witness the explosive difference between O(log N), O(N), and O(N²).
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '0.9rem', color: '#fff', fontWeight: 600 }}>Input Size N:</span>
            <input
              type="number"
              min="1"
              max="1000000"
              value={inputN}
              onChange={(e) => setInputN(Math.max(1, Number(e.target.value)))}
              style={{
                padding: '8px 14px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-input)',
                border: '1px solid var(--border-focus)',
                color: '#fff',
                fontSize: '1rem',
                fontFamily: 'var(--font-mono)',
                width: '140px',
                outline: 'none',
              }}
            />
          </div>
        </div>

        {/* Quick Preset Buttons */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', alignSelf: 'center' }}>Presets:</span>
          {[10, 100, 1000, 10000, 100000, 1000000].map((preset) => (
            <button
              key={preset}
              className={`category-filter-btn ${inputN === preset ? 'active' : ''}`}
              onClick={() => setInputN(preset)}
            >
              N = {preset.toLocaleString()}
            </button>
          ))}
        </div>

        {/* Calculations Table */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
          {stepsData.map((item) => (
            <div
              key={item.name}
              style={{
                padding: '16px',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(30, 41, 59, 0.5)',
                borderTop: `4px solid ${item.color}`,
                borderLeft: '1px solid var(--border-subtle)',
                borderRight: '1px solid var(--border-subtle)',
                borderBottom: '1px solid var(--border-subtle)',
              }}
            >
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: item.color }}>
                {item.name}
              </span>
              <strong style={{ display: 'block', fontSize: '1.25rem', color: '#fff', fontFamily: 'var(--font-mono)', margin: '6px 0' }}>
                {typeof item.steps === 'number' ? item.steps.toLocaleString() : item.steps}
              </strong>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Time: <span style={{ color: '#e2e8f0' }}>{item.timeEst}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Data Structure Complexity Matrix */}
      <div className="glass-card" style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '1.3rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Database size={20} color="var(--accent-cyan)" />
          <span>Data Structure Complexity Cheat Sheet</span>
        </h3>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '12px 14px' }}>Data Structure</th>
                <th style={{ padding: '12px 14px' }}>Access (Read)</th>
                <th style={{ padding: '12px 14px' }}>Search</th>
                <th style={{ padding: '12px 14px' }}>Insert Head</th>
                <th style={{ padding: '12px 14px' }}>Insert Tail</th>
                <th style={{ padding: '12px 14px' }}>Delete</th>
                <th style={{ padding: '12px 14px' }}>Space</th>
              </tr>
            </thead>
            <tbody>
              {complexityMatrix.map((row, idx) => (
                <tr
                  key={idx}
                  style={{
                    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                    background: idx % 2 === 0 ? 'transparent' : 'rgba(255, 255, 255, 0.02)',
                  }}
                >
                  <td style={{ padding: '12px 14px', fontWeight: 700, color: '#fff' }}>{row.name}</td>
                  <td style={{ padding: '12px 14px', fontFamily: 'var(--font-mono)', color: row.access.includes('1') ? 'var(--accent-emerald)' : 'var(--text-secondary)' }}>
                    {row.access}
                  </td>
                  <td style={{ padding: '12px 14px', fontFamily: 'var(--font-mono)', color: row.search.includes('1') ? 'var(--accent-emerald)' : row.search.includes('log') ? 'var(--accent-cyan)' : 'var(--accent-amber)' }}>
                    {row.search}
                  </td>
                  <td style={{ padding: '12px 14px', fontFamily: 'var(--font-mono)', color: row.insertHead.includes('1') ? 'var(--accent-emerald)' : 'var(--accent-amber)' }}>
                    {row.insertHead}
                  </td>
                  <td style={{ padding: '12px 14px', fontFamily: 'var(--font-mono)', color: row.insertTail.includes('1') ? 'var(--accent-emerald)' : 'var(--accent-amber)' }}>
                    {row.insertTail}
                  </td>
                  <td style={{ padding: '12px 14px', fontFamily: 'var(--font-mono)', color: row.delete.includes('1') ? 'var(--accent-emerald)' : 'var(--accent-amber)' }}>
                    {row.delete}
                  </td>
                  <td style={{ padding: '12px 14px', fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)' }}>
                    {row.space}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sorting Algorithm Complexity Matrix */}
      <div className="glass-card">
        <h3 style={{ fontSize: '1.3rem', marginBottom: '16px' }}>Sorting Algorithms Complexity</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '12px 14px' }}>Algorithm</th>
                <th style={{ padding: '12px 14px' }}>Best Case</th>
                <th style={{ padding: '12px 14px' }}>Average Case</th>
                <th style={{ padding: '12px 14px' }}>Worst Case</th>
                <th style={{ padding: '12px 14px' }}>Space Complexity</th>
                <th style={{ padding: '12px 14px' }}>In-Place?</th>
              </tr>
            </thead>
            <tbody>
              {sortingMatrix.map((row, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  <td style={{ padding: '12px 14px', fontWeight: 700, color: '#fff' }}>{row.name}</td>
                  <td style={{ padding: '12px 14px', fontFamily: 'var(--font-mono)', color: 'var(--accent-emerald)' }}>{row.best}</td>
                  <td style={{ padding: '12px 14px', fontFamily: 'var(--font-mono)', color: row.average.includes('log') ? 'var(--accent-cyan)' : 'var(--accent-amber)' }}>{row.average}</td>
                  <td style={{ padding: '12px 14px', fontFamily: 'var(--font-mono)', color: 'var(--accent-rose)' }}>{row.worst}</td>
                  <td style={{ padding: '12px 14px', fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)' }}>{row.space}</td>
                  <td style={{ padding: '12px 14px', color: '#fff' }}>{row.inPlace}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
