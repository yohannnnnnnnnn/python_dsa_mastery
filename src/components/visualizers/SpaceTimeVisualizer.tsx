import React, { useState } from 'react';
import { HardDrive, Cpu, Sparkles } from 'lucide-react';
import { useLearning } from '../../context/LearningContext';

export const SpaceTimeVisualizer: React.FC = () => {
  const { incrementVisualizerInteractions } = useLearning();

  const [nSize, setNSize] = useState<number>(1000);
  const [scenario, setScenario] = useState<'intersection' | 'reversal'>('intersection');

  const handleNChange = (newN: number) => {
    setNSize(newN);
    incrementVisualizerInteractions();
  };

  return (
    <div className="visualizer-sandbox">
      {/* Toolbar */}
      <div className="sandbox-toolbar">
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button
            className={`category-filter-btn ${scenario === 'intersection' ? 'active' : ''}`}
            onClick={() => setScenario('intersection')}
          >
            Array Intersection: Hash Table vs Nested Loops
          </button>
          <button
            className={`category-filter-btn ${scenario === 'reversal' ? 'active' : ''}`}
            onClick={() => setScenario('reversal')}
          >
            Array Reverse: In-Place vs Copy
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Input Size N = <strong>{nSize.toLocaleString()}</strong>
          </span>
          <input
            type="range"
            min="10"
            max="10000"
            step="50"
            value={nSize}
            onChange={(e) => handleNChange(Number(e.target.value))}
            style={{ width: '120px', accentColor: 'var(--accent-indigo)' }}
          />
        </div>
      </div>

      {/* Stage Area */}
      <div className="sandbox-stage">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', width: '100%', maxWidth: '900px' }}>
          {/* Approach A */}
          <div className="glass-card" style={{ borderLeft: '4px solid var(--accent-rose)' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '8px', color: 'var(--accent-rose)' }}>
              Approach A: Low Space, Slow Time
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
              {scenario === 'intersection'
                ? 'Brute-force nested loops comparing each item.'
                : 'Allocates new array copy.'}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ padding: '12px', background: 'rgba(15, 23, 42, 0.8)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-amber)', fontSize: '0.85rem' }}>
                  <Cpu size={16} />
                  <span>Time Complexity</span>
                </div>
                <strong style={{ fontSize: '1.2rem', color: '#fff' }}>
                  {scenario === 'intersection' ? 'O(N²) Quadratic' : 'O(N) Linear'}
                </strong>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  Estimated operations:{' '}
                  <span style={{ color: 'var(--accent-rose)' }}>
                    {scenario === 'intersection'
                      ? (nSize * nSize).toLocaleString()
                      : nSize.toLocaleString()}
                  </span>
                </div>
              </div>

              <div style={{ padding: '12px', background: 'rgba(15, 23, 42, 0.8)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-cyan)', fontSize: '0.85rem' }}>
                  <HardDrive size={16} />
                  <span>Auxiliary Space</span>
                </div>
                <strong style={{ fontSize: '1.2rem', color: '#fff' }}>
                  {scenario === 'intersection' ? 'O(1) Constant' : 'O(N) Linear'}
                </strong>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  Extra RAM memory:{' '}
                  <span style={{ color: 'var(--accent-emerald)' }}>
                    {scenario === 'intersection' ? '0 bytes extra' : `${(nSize * 8).toLocaleString()} bytes`}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Approach B */}
          <div className="glass-card" style={{ borderLeft: '4px solid var(--accent-emerald)' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '8px', color: 'var(--accent-emerald)' }}>
              Approach B: Fast Time via Smart Space
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
              {scenario === 'intersection'
                ? 'Uses Hash Table set lookup to eliminate inner loop.'
                : 'In-place two-pointer direct memory swap.'}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ padding: '12px', background: 'rgba(15, 23, 42, 0.8)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-emerald)', fontSize: '0.85rem' }}>
                  <Cpu size={16} />
                  <span>Time Complexity</span>
                </div>
                <strong style={{ fontSize: '1.2rem', color: '#fff' }}>
                  {scenario === 'intersection' ? 'O(N) Linear' : 'O(N) Linear'}
                </strong>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  Estimated operations:{' '}
                  <span style={{ color: 'var(--accent-emerald)' }}>
                    {scenario === 'intersection' ? (nSize * 2).toLocaleString() : (nSize / 2).toLocaleString()}
                  </span>
                </div>
              </div>

              <div style={{ padding: '12px', background: 'rgba(15, 23, 42, 0.8)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-cyan)', fontSize: '0.85rem' }}>
                  <HardDrive size={16} />
                  <span>Auxiliary Space</span>
                </div>
                <strong style={{ fontSize: '1.2rem', color: '#fff' }}>
                  {scenario === 'intersection' ? 'O(N) Hash Set' : 'O(1) In-Place'}
                </strong>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  Extra RAM memory:{' '}
                  <span style={{ color: 'var(--accent-cyan)' }}>
                    {scenario === 'intersection'
                      ? `${(nSize * 16).toLocaleString()} bytes`
                      : '0 bytes extra'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {scenario === 'intersection' && (
          <div
            style={{
              marginTop: '24px',
              padding: '12px 20px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(99, 102, 241, 0.1)',
              border: '1px solid rgba(99, 102, 241, 0.3)',
              textAlign: 'center',
              fontSize: '0.9rem',
              color: '#e2e8f0',
            }}
          >
            ⚡ For N = {nSize.toLocaleString()}, Approach B is{' '}
            <strong style={{ color: 'var(--accent-emerald)' }}>
              {Math.round((nSize * nSize) / (nSize * 2))}x FASTER
            </strong>{' '}
            by simply allocating a {(nSize * 16 / 1024).toFixed(1)} KB Hash Map!
          </div>
        )}
      </div>

      {/* Step Logger */}
      <div className="sandbox-step-logger">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={16} color="var(--accent-indigo-light)" />
          <span style={{ color: '#e2e8f0', fontWeight: 500 }}>
            Mastering data structures means understanding when to trade auxiliary RAM to buy CPU speed.
          </span>
        </div>
      </div>
    </div>
  );
};
