import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, SkipForward, Sparkles, Layers, Zap } from 'lucide-react';
import { useLearning } from '../../context/LearningContext';

interface StackFrame {
  id: string;
  funcName: string;
  arg: number;
  returnValue?: number | string;
  status: 'active' | 'waiting' | 'returning';
}

interface RecursionStep {
  stack: StackFrame[];
  memoState: Record<number, number>;
  message: string;
  action: 'push' | 'base_hit' | 'pop_return' | 'memo_hit';
}

export const RecursionCallStackVisualizer: React.FC = () => {
  const { incrementVisualizerInteractions } = useLearning();

  const [funcChoice, setFuncChoice] = useState<'factorial' | 'fib_memo' | 'countdown'>('factorial');
  const [inputVal, setInputVal] = useState<number>(4);
  const [steps, setSteps] = useState<RecursionStep[]>([]);
  const [stepIndex, setStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(600);

  const timerRef = useRef<number | null>(null);

  // Generate Factorial Call Stack Steps
  const generateFactorialSteps = (n: number): RecursionStep[] => {
    const list: RecursionStep[] = [];
    const stack: StackFrame[] = [];

    list.push({
      stack: [],
      memoState: {},
      message: `Initiating factorial(${n})...`,
      action: 'push',
    });

    const fact = (val: number): number => {
      const frameId = `fact-${val}-${Math.random()}`;
      stack.push({
        id: frameId,
        funcName: 'factorial',
        arg: val,
        status: 'active',
      });

      // Update parent frames to waiting
      stack.forEach((f, idx) => {
        if (idx < stack.length - 1) f.status = 'waiting';
      });

      list.push({
        stack: stack.map((f) => ({ ...f })),
        memoState: {},
        message: `PUSH: Stack Frame factorial(${val}) pushed. Pauses to compute subproblem.`,
        action: 'push',
      });

      if (val <= 1) {
        list.push({
          stack: stack.map((f) => ({ ...f })),
          memoState: {},
          message: `BASE CASE HIT: factorial(${val}) returns 1 immediately!`,
          action: 'base_hit',
        });
        const current = stack[stack.length - 1];
        current.status = 'returning';
        current.returnValue = 1;
        const res = 1;

        list.push({
          stack: stack.map((f) => ({ ...f })),
          memoState: {},
          message: `POP: factorial(${val}) resolved with return value 1. Unwinding Call Stack!`,
          action: 'pop_return',
        });

        stack.pop();
        return res;
      }

      const subResult = fact(val - 1);
      const result = val * subResult;

      const current = stack[stack.length - 1];
      if (current) {
        current.status = 'returning';
        current.returnValue = result;
      }

      list.push({
        stack: stack.map((f) => ({ ...f })),
        memoState: {},
        message: `POP: factorial(${val}) computes ${val} × ${subResult} = ${result}. Frame popped!`,
        action: 'pop_return',
      });

      stack.pop();
      return result;
    };

    const finalRes = fact(n);
    list.push({
      stack: [],
      memoState: {},
      message: `🎉 Factorial(${n}) complete! Final output: ${finalRes}. Call Stack fully cleared.`,
      action: 'pop_return',
    });

    return list;
  };

  // Generate Fib with Memoization Steps
  const generateFibMemoSteps = (n: number): RecursionStep[] => {
    const list: RecursionStep[] = [];
    const stack: StackFrame[] = [];
    const memo: Record<number, number> = {};

    list.push({
      stack: [],
      memoState: {},
      message: `Initiating fib_memo(${n}) with Dynamic Programming cache...`,
      action: 'push',
    });

    const fib = (val: number): number => {
      const frameId = `fib-${val}-${Math.random()}`;
      stack.push({
        id: frameId,
        funcName: 'fib_memo',
        arg: val,
        status: 'active',
      });

      stack.forEach((f, idx) => {
        if (idx < stack.length - 1) f.status = 'waiting';
      });

      list.push({
        stack: stack.map((f) => ({ ...f })),
        memoState: { ...memo },
        message: `PUSH: Stack Frame fib_memo(${val}) pushed.`,
        action: 'push',
      });

      if (val in memo) {
        list.push({
          stack: stack.map((f) => ({ ...f })),
          memoState: { ...memo },
          message: `⚡ MEMOIZATION CACHE HIT! fib_memo(${val}) already in cache (${memo[val]}). Instant O(1) return!`,
          action: 'memo_hit',
        });
        stack.pop();
        return memo[val];
      }

      if (val <= 1) {
        list.push({
          stack: stack.map((f) => ({ ...f })),
          memoState: { ...memo },
          message: `BASE CASE HIT: fib_memo(${val}) = ${val}.`,
          action: 'base_hit',
        });
        memo[val] = val;
        stack.pop();
        return val;
      }

      const res = fib(val - 1) + fib(val - 2);
      memo[val] = res;

      list.push({
        stack: stack.map((f) => ({ ...f })),
        memoState: { ...memo },
        message: `POP: fib_memo(${val}) resolved = ${res}. Cached in memo dictionary!`,
        action: 'pop_return',
      });

      stack.pop();
      return res;
    };

    const finalRes = fib(n);
    list.push({
      stack: [],
      memoState: { ...memo },
      message: `🎉 fib_memo(${n}) complete = ${finalRes}! Exponential branching avoided via memoization.`,
      action: 'pop_return',
    });

    return list;
  };

  useEffect(() => {
    let generated: RecursionStep[] = [];
    if (funcChoice === 'factorial') generated = generateFactorialSteps(inputVal);
    else if (funcChoice === 'fib_memo') generated = generateFibMemoSteps(inputVal);
    else generated = generateFactorialSteps(inputVal);

    setSteps(generated);
    setStepIndex(0);
    setIsPlaying(false);
  }, [funcChoice, inputVal]);

  const handleStepForward = () => {
    incrementVisualizerInteractions();
    if (stepIndex < steps.length - 1) {
      setStepIndex((prev) => prev + 1);
    } else {
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = window.setInterval(() => {
        setStepIndex((prev) => {
          if (prev < steps.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, speed);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, steps, speed]);

  const currentStep = steps[stepIndex] || {
    stack: [],
    memoState: {},
    message: 'Ready',
    action: 'push',
  };

  return (
    <div className="visualizer-sandbox">
      {/* Toolbar */}
      <div className="sandbox-toolbar">
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
          <button
            className={`category-filter-btn ${funcChoice === 'factorial' ? 'active' : ''}`}
            onClick={() => setFuncChoice('factorial')}
          >
            Factorial(N)
          </button>
          <button
            className={`category-filter-btn ${funcChoice === 'fib_memo' ? 'active' : ''}`}
            onClick={() => setFuncChoice('fib_memo')}
          >
            Fibonacci + Memoization
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginLeft: '12px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Input N:</span>
            <select
              style={{
                padding: '4px 8px',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--bg-input)',
                border: '1px solid var(--border-subtle)',
                color: '#fff',
                outline: 'none',
              }}
              value={inputVal}
              onChange={(e) => setInputVal(Number(e.target.value))}
            >
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
          </div>
        </div>

        {/* Controls */}
        <div className="sandbox-controls">
          <button
            className="btn btn-primary"
            style={{ padding: '8px 16px' }}
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            <span>{isPlaying ? 'Pause' : 'Play'}</span>
          </button>
          <button
            className="btn btn-secondary"
            style={{ padding: '8px 14px' }}
            onClick={handleStepForward}
            disabled={isPlaying || stepIndex >= steps.length - 1}
          >
            <SkipForward size={16} />
            <span>Step</span>
          </button>
          <button
            className="btn btn-secondary"
            style={{ padding: '8px 14px' }}
            onClick={() => {
              setIsPlaying(false);
              setStepIndex(0);
            }}
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
        <div style={{ display: 'flex', gap: '40px', justifyContent: 'center', width: '100%', maxWidth: '850px', flexWrap: 'wrap' }}>
          {/* Visual Call Stack */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <Layers size={18} color="var(--accent-indigo)" />
              <strong>Internal Call Stack Memory</strong>
            </div>

            <div
              style={{
                width: '280px',
                minHeight: '280px',
                border: '3px solid var(--border-focus)',
                borderTop: 'none',
                borderRadius: '0 0 16px 16px',
                padding: '14px',
                display: 'flex',
                flexDirection: 'column-reverse',
                gap: '8px',
                background: 'rgba(15, 23, 42, 0.7)',
                position: 'relative',
              }}
            >
              {currentStep.stack.map((frame, idx) => {
                const isActive = frame.status === 'active';
                const isReturning = frame.status === 'returning';

                return (
                  <div
                    key={frame.id}
                    style={{
                      padding: '12px 14px',
                      borderRadius: 'var(--radius-md)',
                      background: isReturning
                        ? 'rgba(16, 185, 129, 0.25)'
                        : isActive
                        ? 'var(--grad-primary)'
                        : 'rgba(30, 41, 59, 0.9)',
                      border: `1px solid ${
                        isReturning
                          ? 'var(--accent-emerald)'
                          : isActive
                          ? 'var(--accent-indigo)'
                          : 'var(--border-subtle)'
                      }`,
                      boxShadow: isActive ? 'var(--glow-indigo)' : 'none',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.9rem',
                    }}
                  >
                    <div>
                      <strong style={{ color: '#fff' }}>
                        {frame.funcName}({frame.arg})
                      </strong>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        Frame #{idx + 1}
                      </div>
                    </div>

                    <span
                      style={{
                        fontSize: '0.75rem',
                        padding: '2px 8px',
                        borderRadius: 'var(--radius-full)',
                        background: 'rgba(0, 0, 0, 0.4)',
                        color: isReturning ? 'var(--accent-emerald)' : '#fff',
                        fontWeight: 700,
                      }}
                    >
                      {isReturning ? `Return: ${frame.returnValue}` : isActive ? 'EXECUTING' : 'PAUSED'}
                    </span>
                  </div>
                );
              })}

              {currentStep.stack.length === 0 && (
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textAlign: 'center', margin: 'auto' }}>
                  Call Stack is Empty
                </span>
              )}
            </div>

            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Stack Depth: <strong style={{ color: '#fff' }}>{currentStep.stack.length}</strong> frames
            </div>
          </div>

          {/* Dynamic Programming Memo Cache Box (When fib_memo selected) */}
          {funcChoice === 'fib_memo' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', minWidth: '220px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', color: 'var(--accent-cyan)' }}>
                <Zap size={18} />
                <strong>Memoization Hash Map</strong>
              </div>

              <div
                style={{
                  padding: '16px',
                  borderRadius: 'var(--radius-lg)',
                  background: 'rgba(15, 23, 42, 0.7)',
                  border: '1px solid var(--border-subtle)',
                  minHeight: '200px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                {Object.keys(currentStep.memoState).length === 0 ? (
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic', margin: 'auto' }}>
                    Cache is empty
                  </span>
                ) : (
                  Object.entries(currentStep.memoState).map(([k, v]) => (
                    <div
                      key={k}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '6px 12px',
                        borderRadius: 'var(--radius-sm)',
                        background: 'rgba(6, 182, 212, 0.15)',
                        border: '1px solid rgba(6, 182, 212, 0.3)',
                        fontSize: '0.85rem',
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      <span style={{ color: '#fff' }}>fib({k})</span>
                      <strong style={{ color: 'var(--accent-cyan)' }}>{v}</strong>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Step Logger Status */}
      <div className="sandbox-step-logger">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={16} color="var(--accent-indigo-light)" />
          <span style={{ color: '#e2e8f0', fontWeight: 500 }}>{currentStep.message}</span>
        </div>
      </div>
    </div>
  );
};
