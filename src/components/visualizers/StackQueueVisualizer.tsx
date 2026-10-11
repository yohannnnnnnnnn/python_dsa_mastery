import React, { useState } from 'react';
import { Plus, Trash2, CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react';
import { useLearning } from '../../context/LearningContext';

type LinterStep = {
  charIndex: number;
  char: string;
  action: 'push' | 'match_pop' | 'mismatch_error' | 'unclosed_error' | 'valid_complete';
  stackSnapshot: string[];
  message: string;
};

export const StackQueueVisualizer: React.FC = () => {
  const { incrementVisualizerInteractions } = useLearning();

  const [mode, setMode] = useState<'stack' | 'queue' | 'linter'>('linter');

  // Stack State
  const [stackItems, setStackItems] = useState<string[]>(['Tray #1', 'Tray #2', 'Tray #3']);
  const [stackInput, setStackInput] = useState('');

  // Queue State
  const [queueItems, setQueueItems] = useState<string[]>(['Patient A', 'Patient B', 'Patient C']);
  const [queueInput, setQueueInput] = useState('');

  // Bracket Linter State
  const [linterInput, setLinterInput] = useState<string>('({[]})');
  const [linterSteps, setLinterSteps] = useState<LinterStep[]>([]);
  const [currentLinterStepIdx, setCurrentLinterStepIdx] = useState<number>(0);

  const [statusMessage, setStatusMessage] = useState<string>(
    'Select a mode: Stack (LIFO), Queue (FIFO), or Bracket Matcher Linter.'
  );

  // Stack handlers
  const handlePushStack = () => {
    if (!stackInput.trim()) return;
    incrementVisualizerInteractions();
    setStackItems((prev) => [...prev, stackInput.trim()]);
    setStatusMessage(`Pushed "${stackInput.trim()}" onto top of Stack in O(1) time.`);
    setStackInput('');
  };

  const handlePopStack = () => {
    if (stackItems.length === 0) return;
    incrementVisualizerInteractions();
    const popped = stackItems[stackItems.length - 1];
    setStackItems((prev) => prev.slice(0, -1));
    setStatusMessage(`Popped "${popped}" from top of Stack in O(1) time.`);
  };

  // Queue handlers
  const handleEnqueue = () => {
    if (!queueInput.trim()) return;
    incrementVisualizerInteractions();
    setQueueItems((prev) => [...prev, queueInput.trim()]);
    setStatusMessage(`Enqueued "${queueInput.trim()}" to back of Queue in O(1) time.`);
    setQueueInput('');
  };

  const handleDequeue = () => {
    if (queueItems.length === 0) return;
    incrementVisualizerInteractions();
    const dequeued = queueItems[0];
    setQueueItems((prev) => prev.slice(1));
    setStatusMessage(`Dequeued "${dequeued}" from front of Queue in O(1) time.`);
  };

  // Linter Simulation Generator
  const generateLinterSteps = (codeStr: string) => {
    const steps: LinterStep[] = [];
    const stack: string[] = [];
    const pairs: Record<string, string> = { ')': '(', '}': '{', ']': '[' };

    steps.push({
      charIndex: -1,
      char: '',
      action: 'push',
      stackSnapshot: [],
      message: 'Beginning syntax analysis with an empty stack...',
    });

    for (let i = 0; i < codeStr.length; i++) {
      const char = codeStr[i];
      if ('({['.includes(char)) {
        stack.push(char);
        steps.push({
          charIndex: i,
          char,
          action: 'push',
          stackSnapshot: [...stack],
          message: `Found opening bracket '${char}' at index ${i}. Pushed onto stack.`,
        });
      } else if (')}]'.includes(char)) {
        if (stack.length === 0) {
          steps.push({
            charIndex: i,
            char,
            action: 'mismatch_error',
            stackSnapshot: [],
            message: `Syntax Error at index ${i}: Closing bracket '${char}' found with no matching opening bracket!`,
          });
          return steps;
        }

        const top = stack.pop()!;
        if (top !== pairs[char]) {
          steps.push({
            charIndex: i,
            char,
            action: 'mismatch_error',
            stackSnapshot: [...stack],
            message: `Syntax Error at index ${i}: Mismatched bracket '${char}' does not close '${top}'!`,
          });
          return steps;
        }

        steps.push({
          charIndex: i,
          char,
          action: 'match_pop',
          stackSnapshot: [...stack],
          message: `Matched '${char}' with '${top}'! Popped '${top}' from stack.`,
        });
      }
    }

    if (stack.length > 0) {
      steps.push({
        charIndex: codeStr.length - 1,
        char: stack[stack.length - 1],
        action: 'unclosed_error',
        stackSnapshot: [...stack],
        message: `Syntax Error: Unclosed bracket '${stack[stack.length - 1]}' remaining in stack at end of input!`,
      });
    } else {
      steps.push({
        charIndex: codeStr.length,
        char: '',
        action: 'valid_complete',
        stackSnapshot: [],
        message: '🎉 Syntax Verified! All brackets opened and closed in perfect balanced order.',
      });
    }

    return steps;
  };

  const handleStartLinter = () => {
    incrementVisualizerInteractions();
    const steps = generateLinterSteps(linterInput);
    setLinterSteps(steps);
    setCurrentLinterStepIdx(0);
  };

  const handleStepLinter = () => {
    incrementVisualizerInteractions();
    if (currentLinterStepIdx < linterSteps.length - 1) {
      setCurrentLinterStepIdx((prev) => prev + 1);
    }
  };

  const currentLinterStep = linterSteps[currentLinterStepIdx] || null;

  return (
    <div className="visualizer-sandbox">
      {/* Sandbox Toolbar */}
      <div className="sandbox-toolbar">
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button
            className={`category-filter-btn ${mode === 'linter' ? 'active' : ''}`}
            onClick={() => setMode('linter')}
          >
            Bracket Matcher Linter
          </button>
          <button
            className={`category-filter-btn ${mode === 'stack' ? 'active' : ''}`}
            onClick={() => setMode('stack')}
          >
            Stack (LIFO)
          </button>
          <button
            className={`category-filter-btn ${mode === 'queue' ? 'active' : ''}`}
            onClick={() => setMode('queue')}
          >
            Queue (FIFO)
          </button>
        </div>

        {/* Linter Toolbar Actions */}
        {mode === 'linter' && (
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <input
              type="text"
              value={linterInput}
              onChange={(e) => setLinterInput(e.target.value)}
              placeholder="e.g. ({[]})"
              style={{
                padding: '6px 12px',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--bg-input)',
                border: '1px solid var(--border-subtle)',
                color: '#fff',
                fontFamily: 'var(--font-mono)',
                width: '160px',
              }}
            />
            <button className="btn btn-primary" style={{ padding: '6px 12px' }} onClick={handleStartLinter}>
              Analyze
            </button>
            <button
              className="btn btn-secondary"
              style={{ padding: '6px 12px' }}
              onClick={handleStepLinter}
              disabled={linterSteps.length === 0 || currentLinterStepIdx >= linterSteps.length - 1}
            >
              Step Forward
            </button>
          </div>
        )}

        {/* Stack Toolbar Actions */}
        {mode === 'stack' && (
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <input
              type="text"
              placeholder="Item label..."
              value={stackInput}
              onChange={(e) => setStackInput(e.target.value)}
              style={{
                padding: '6px 12px',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--bg-input)',
                border: '1px solid var(--border-subtle)',
                color: '#fff',
                width: '130px',
              }}
            />
            <button className="btn btn-primary" style={{ padding: '6px 12px' }} onClick={handlePushStack}>
              <Plus size={14} /> Push
            </button>
            <button
              className="btn btn-secondary"
              style={{ padding: '6px 12px' }}
              onClick={handlePopStack}
              disabled={stackItems.length === 0}
            >
              <Trash2 size={14} /> Pop Top
            </button>
          </div>
        )}

        {/* Queue Toolbar Actions */}
        {mode === 'queue' && (
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <input
              type="text"
              placeholder="Item label..."
              value={queueInput}
              onChange={(e) => setQueueInput(e.target.value)}
              style={{
                padding: '6px 12px',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--bg-input)',
                border: '1px solid var(--border-subtle)',
                color: '#fff',
                width: '130px',
              }}
            />
            <button className="btn btn-primary" style={{ padding: '6px 12px' }} onClick={handleEnqueue}>
              <Plus size={14} /> Enqueue
            </button>
            <button
              className="btn btn-secondary"
              style={{ padding: '6px 12px' }}
              onClick={handleDequeue}
              disabled={queueItems.length === 0}
            >
              <Trash2 size={14} /> Dequeue
            </button>
          </div>
        )}
      </div>

      {/* Stage Area */}
      <div className="sandbox-stage">
        {/* Mode 1: Bracket Linter View */}
        {mode === 'linter' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', width: '100%' }}>
            {/* Input Characters Strip */}
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              {linterInput.split('').map((ch, idx) => {
                const isActiveChar = currentLinterStep?.charIndex === idx;
                return (
                  <div
                    key={idx}
                    style={{
                      width: '44px',
                      height: '48px',
                      borderRadius: 'var(--radius-md)',
                      background: isActiveChar ? 'var(--accent-indigo)' : '#1e293b',
                      border: `2px solid ${isActiveChar ? '#fff' : 'var(--border-subtle)'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '1.4rem',
                      fontWeight: 700,
                      color: '#fff',
                      boxShadow: isActiveChar ? '0 0 15px rgba(99, 102, 241, 0.6)' : 'none',
                      transform: isActiveChar ? 'scale(1.15)' : 'none',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {ch}
                  </div>
                );
              })}
            </div>

            {/* Presets Row */}
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Try Presets:</span>
              <button
                className="btn btn-secondary"
                style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                onClick={() => {
                  setLinterInput('({[]})');
                  setLinterSteps([]);
                }}
              >
                Valid: ({'{}'})
              </button>
              <button
                className="btn btn-secondary"
                style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                onClick={() => {
                  setLinterInput('({[}])');
                  setLinterSteps([]);
                }}
              >
                Mismatch: ({'[{]}'})
              </button>
              <button
                className="btn btn-secondary"
                style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                onClick={() => {
                  setLinterInput('((())');
                  setLinterSteps([]);
                }}
              >
                Unclosed: ((())
              </button>
            </div>

            {/* Live Call Stack Tower for Linter */}
            <div
              style={{
                width: '180px',
                minHeight: '160px',
                border: '2px dashed var(--border-focus)',
                borderTop: 'none',
                borderRadius: '0 0 16px 16px',
                padding: '12px',
                display: 'flex',
                flexDirection: 'column-reverse',
                gap: '6px',
                background: 'rgba(15, 23, 42, 0.6)',
              }}
            >
              {(currentLinterStep?.stackSnapshot || []).map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--grad-primary)',
                    color: '#fff',
                    textAlign: 'center',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    fontSize: '1.2rem',
                    boxShadow: 'var(--glow-indigo)',
                  }}
                >
                  {item}
                </div>
              ))}
              {(!currentLinterStep || currentLinterStep.stackSnapshot.length === 0) && (
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center', margin: 'auto' }}>
                  Stack is Empty (Base)
                </span>
              )}
            </div>
          </div>
        )}

        {/* Mode 2: Stack Tower */}
        {mode === 'stack' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              Top of Stack (LIFO: Push & Pop here)
            </div>
            <div
              style={{
                width: '220px',
                minHeight: '220px',
                border: '3px solid var(--border-focus)',
                borderTop: 'none',
                borderRadius: '0 0 16px 16px',
                padding: '12px',
                display: 'flex',
                flexDirection: 'column-reverse',
                gap: '8px',
                background: 'rgba(15, 23, 42, 0.6)',
              }}
            >
              {stackItems.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '12px',
                    borderRadius: 'var(--radius-sm)',
                    background: idx === stackItems.length - 1 ? 'var(--grad-primary)' : '#1e293b',
                    color: '#fff',
                    textAlign: 'center',
                    fontWeight: 700,
                    border: '1px solid var(--border-subtle)',
                    boxShadow: idx === stackItems.length - 1 ? 'var(--glow-indigo)' : 'none',
                  }}
                >
                  {item} {idx === stackItems.length - 1 ? ' (TOP)' : ''}
                </div>
              ))}
              {stackItems.length === 0 && (
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textAlign: 'center', margin: 'auto' }}>
                  Stack is Empty
                </span>
              )}
            </div>
          </div>
        )}

        {/* Mode 3: Queue Line */}
        {mode === 'queue' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: '600px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              <span>← FRONT (Dequeue first)</span>
              <span>BACK (Enqueue here) →</span>
            </div>
            <div
              style={{
                display: 'flex',
                gap: '10px',
                alignItems: 'center',
                padding: '16px',
                borderRadius: 'var(--radius-lg)',
                background: 'rgba(15, 23, 42, 0.6)',
                border: '2px solid var(--border-subtle)',
                minHeight: '100px',
                maxWidth: '700px',
                overflowX: 'auto',
                width: '100%',
              }}
            >
              {queueItems.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '12px 18px',
                    borderRadius: 'var(--radius-md)',
                    background: idx === 0 ? 'var(--grad-cyan)' : '#1e293b',
                    color: '#fff',
                    fontWeight: 700,
                    whiteSpace: 'nowrap',
                    border: '1px solid var(--border-subtle)',
                    boxShadow: idx === 0 ? 'var(--glow-cyan)' : 'none',
                  }}
                >
                  {item} {idx === 0 ? ' (FRONT)' : ''}
                </div>
              ))}
              {queueItems.length === 0 && (
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 'auto' }}>
                  Queue is Empty
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Step Logger Status */}
      <div className="sandbox-step-logger">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {currentLinterStep?.action === 'valid_complete' ? (
            <CheckCircle2 size={16} color="var(--accent-emerald)" />
          ) : currentLinterStep?.action.includes('error') ? (
            <AlertTriangle size={16} color="var(--accent-rose)" />
          ) : (
            <Sparkles size={16} color="var(--accent-indigo-light)" />
          )}
          <span style={{ color: '#e2e8f0', fontWeight: 500 }}>
            {mode === 'linter' ? currentLinterStep?.message || 'Click Analyze to start parsing.' : statusMessage}
          </span>
        </div>
      </div>
    </div>
  );
};
