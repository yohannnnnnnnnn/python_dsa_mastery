import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, SkipForward, Zap, Sparkles } from 'lucide-react';
import { useLearning } from '../../context/LearningContext';

export const BinarySearchVisualizer: React.FC = () => {
  const { incrementVisualizerInteractions } = useLearning();

  const [array] = useState<number[]>([3, 7, 12, 19, 24, 31, 45, 53, 62, 77, 88, 94, 105, 120, 142]);
  const [target, setTarget] = useState<number>(77);
  const [searchMode, setSearchMode] = useState<'binary' | 'linear'>('binary');

  // Binary Search State
  const [low, setLow] = useState<number>(0);
  const [high, setHigh] = useState<number>(14);
  const [mid, setMid] = useState<number | null>(null);

  // Linear Search State
  const [linearIndex, setLinearIndex] = useState<number | null>(null);

  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState<number>(800);
  const [stepsCount, setStepsCount] = useState<number>(0);
  const [statusMessage, setStatusMessage] = useState<string>('Ready. Select a target number and click Start.');
  const [foundIndex, setFoundIndex] = useState<number | null>(null);

  const timerRef = useRef<number | null>(null);

  const handleReset = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsRunning(false);
    setLow(0);
    setHigh(array.length - 1);
    setMid(null);
    setLinearIndex(null);
    setStepsCount(0);
    setFoundIndex(null);
    setStatusMessage('Ready. Select a target number and click Start.');
  };

  const stepBinarySearch = () => {
    incrementVisualizerInteractions();
    if (low > high) {
      setIsRunning(false);
      setStatusMessage(`Target ${target} was NOT found in the array.`);
      return;
    }

    const currentMid = Math.floor((low + high) / 2);
    setMid(currentMid);
    const midVal = array[currentMid];
    setStepsCount((prev) => prev + 1);

    if (midVal === target) {
      setFoundIndex(currentMid);
      setIsRunning(false);
      setStatusMessage(`🎉 FOUND! Target ${target} located at index ${currentMid} in ${stepsCount + 1} steps.`);
    } else if (target < midVal) {
      setStatusMessage(`Inspecting index ${currentMid} (value: ${midVal}). ${target} < ${midVal}, eliminating right half (indices ${currentMid}..${high}).`);
      setHigh(currentMid - 1);
    } else {
      setStatusMessage(`Inspecting index ${currentMid} (value: ${midVal}). ${target} > ${midVal}, eliminating left half (indices ${low}..${currentMid}).`);
      setLow(currentMid + 1);
    }
  };

  const stepLinearSearch = () => {
    incrementVisualizerInteractions();
    const nextIdx = linearIndex === null ? 0 : linearIndex + 1;

    if (nextIdx >= array.length) {
      setIsRunning(false);
      setStatusMessage(`Target ${target} was NOT found after inspecting all ${array.length} elements.`);
      return;
    }

    setLinearIndex(nextIdx);
    setStepsCount((prev) => prev + 1);

    if (array[nextIdx] === target) {
      setFoundIndex(nextIdx);
      setIsRunning(false);
      setStatusMessage(`🎉 FOUND! Target ${target} located at index ${nextIdx} in ${nextIdx + 1} steps.`);
    } else {
      setStatusMessage(`Inspecting index ${nextIdx} (value: ${array[nextIdx]}). Not a match, advancing to next item.`);
    }
  };

  const handleStep = () => {
    if (foundIndex !== null) return;
    if (searchMode === 'binary') {
      stepBinarySearch();
    } else {
      stepLinearSearch();
    }
  };

  useEffect(() => {
    if (isRunning) {
      timerRef.current = window.setInterval(() => {
        handleStep();
      }, speed);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, low, high, linearIndex, searchMode, target, stepsCount, foundIndex]);

  return (
    <div className="visualizer-sandbox">
      {/* Sandbox Toolbar */}
      <div className="sandbox-toolbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <div>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block' }}>
              Search Algorithm
            </label>
            <div style={{ display: 'flex', gap: '6px', marginTop: '4px' }}>
              <button
                className={`category-filter-btn ${searchMode === 'binary' ? 'active' : ''}`}
                onClick={() => {
                  handleReset();
                  setSearchMode('binary');
                }}
              >
                Binary Search O(log N)
              </button>
              <button
                className={`category-filter-btn ${searchMode === 'linear' ? 'active' : ''}`}
                onClick={() => {
                  handleReset();
                  setSearchMode('linear');
                }}
              >
                Linear Search O(N)
              </button>
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block' }}>
              Target Number
            </label>
            <select
              style={{
                marginTop: '4px',
                padding: '6px 12px',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--bg-input)',
                color: '#fff',
                border: '1px solid var(--border-subtle)',
                outline: 'none',
              }}
              value={target}
              onChange={(e) => {
                handleReset();
                setTarget(Number(e.target.value));
              }}
            >
              {array.map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
              <option value={999}>999 (Not in array)</option>
            </select>
          </div>
        </div>

        {/* Playback Controls */}
        <div className="sandbox-controls">
          <button
            className="btn btn-primary"
            style={{ padding: '8px 16px' }}
            onClick={() => setIsRunning(!isRunning)}
            disabled={foundIndex !== null}
          >
            {isRunning ? <Pause size={16} /> : <Play size={16} />}
            <span>{isRunning ? 'Pause' : 'Start'}</span>
          </button>
          <button
            className="btn btn-secondary"
            style={{ padding: '8px 14px' }}
            onClick={handleStep}
            disabled={isRunning || foundIndex !== null}
          >
            <SkipForward size={16} />
            <span>Step</span>
          </button>
          <button
            className="btn btn-secondary"
            style={{ padding: '8px 14px' }}
            onClick={handleReset}
          >
            <RotateCcw size={16} />
            <span>Reset</span>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: '12px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Speed</span>
            <input
              type="range"
              min="200"
              max="1500"
              step="100"
              value={1700 - speed}
              onChange={(e) => setSpeed(1700 - Number(e.target.value))}
              style={{ width: '80px', accentColor: 'var(--accent-indigo)' }}
            />
          </div>
        </div>
      </div>

      {/* Stage Area */}
      <div className="sandbox-stage">
        {/* Pointer Legend */}
        {searchMode === 'binary' && (
          <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span className="pointer-tag low">LOW</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Index {low <= high ? low : '-'}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span className="pointer-tag mid">MID</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Index {mid !== null ? mid : '-'}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span className="pointer-tag high">HIGH</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Index {low <= high ? high : '-'}
              </span>
            </div>
          </div>
        )}

        {/* Array Visualization Strip */}
        <div className="array-strip">
          {array.map((value, index) => {
            let isEliminated = false;
            let isMid = false;
            let isLinearActive = false;
            const isFound = foundIndex === index;

            if (searchMode === 'binary') {
              if (index < low || index > high) {
                isEliminated = true;
              }
              if (mid === index) {
                isMid = true;
              }
            } else {
              if (linearIndex === index) {
                isLinearActive = true;
              } else if (linearIndex !== null && index < linearIndex) {
                isEliminated = true;
              }
            }

            let cellClass = 'array-cell';
            if (isFound) cellClass += ' sorted';
            else if (isMid) cellClass += ' comparing';
            else if (isLinearActive) cellClass += ' active-pointer';

            return (
              <div key={index} className="array-cell-wrapper">
                {/* Pointer Tag Top */}
                <div style={{ height: '20px', display: 'flex', gap: '2px' }}>
                  {searchMode === 'binary' && index === low && <span className="pointer-tag low">L</span>}
                  {searchMode === 'binary' && index === mid && <span className="pointer-tag mid">M</span>}
                  {searchMode === 'binary' && index === high && <span className="pointer-tag high">H</span>}
                  {searchMode === 'linear' && index === linearIndex && (
                    <span className="pointer-tag mid">PTR</span>
                  )}
                </div>

                <div
                  className={cellClass}
                  style={{
                    opacity: isEliminated && !isFound ? 0.25 : 1,
                    transform: isMid || isFound ? 'translateY(-6px)' : 'none',
                  }}
                >
                  {value}
                </div>

                <span className="array-index-label">[{index}]</span>
              </div>
            );
          })}
        </div>

        {/* Comparison Stat Callout */}
        <div
          style={{
            marginTop: '24px',
            display: 'flex',
            gap: '20px',
            alignItems: 'center',
            padding: '12px 24px',
            borderRadius: 'var(--radius-lg)',
            background: 'rgba(30, 41, 59, 0.6)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Zap size={18} color="var(--accent-amber)" />
            <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              Operational Steps Taken: <strong style={{ color: '#fff' }}>{stepsCount}</strong>
            </span>
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Theoretical Worst-Case for 15 items:{' '}
            <strong style={{ color: 'var(--accent-cyan)' }}>
              {searchMode === 'binary' ? '4 steps (log₂ 15)' : '15 steps (N)'}
            </strong>
          </div>
        </div>
      </div>

      {/* Step Logger Status Bar */}
      <div className="sandbox-step-logger">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={16} color="var(--accent-indigo-light)" />
          <span style={{ color: '#e2e8f0', fontWeight: 500 }}>{statusMessage}</span>
        </div>
      </div>
    </div>
  );
};
