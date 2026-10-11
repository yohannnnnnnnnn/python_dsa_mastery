import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, SkipForward, Shuffle, Sparkles } from 'lucide-react';
import { useLearning } from '../../context/LearningContext';

type SortAlgorithm = 'bubble' | 'selection' | 'insertion' | 'quicksort';

interface SortStep {
  array: number[];
  comparingIndices: number[];
  swappingIndices: number[];
  sortedIndices: number[];
  pivotIndex?: number;
  message: string;
  comparisons: number;
  swaps: number;
}

export const SortingVisualizer: React.FC = () => {
  const { incrementVisualizerInteractions } = useLearning();

  const [algorithm, setAlgorithm] = useState<SortAlgorithm>('bubble');
  const [initialArray, setInitialArray] = useState<number[]>([45, 12, 89, 34, 67, 23, 90, 15, 56, 78]);
  const [steps, setSteps] = useState<SortStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(400);

  const timerRef = useRef<number | null>(null);

  // Generate steps for Bubble Sort
  const generateBubbleSortSteps = (arr: number[]): SortStep[] => {
    const list = [...arr];
    const stepsList: SortStep[] = [];
    let comparisons = 0;
    let swaps = 0;
    const sortedIndices: number[] = [];

    stepsList.push({
      array: [...list],
      comparingIndices: [],
      swappingIndices: [],
      sortedIndices: [],
      message: 'Starting Bubble Sort O(N²)...',
      comparisons: 0,
      swaps: 0,
    });

    const n = list.length;
    for (let i = 0; i < n - 1; i++) {
      let swappedInPass = false;
      for (let j = 0; j < n - i - 1; j++) {
        comparisons++;
        stepsList.push({
          array: [...list],
          comparingIndices: [j, j + 1],
          swappingIndices: [],
          sortedIndices: [...sortedIndices],
          message: `Pass ${i + 1}: Comparing index ${j} (${list[j]}) and index ${j + 1} (${list[j + 1]})`,
          comparisons,
          swaps,
        });

        if (list[j] > list[j + 1]) {
          swaps++;
          const temp = list[j];
          list[j] = list[j + 1];
          list[j + 1] = temp;
          swappedInPass = true;

          stepsList.push({
            array: [...list],
            comparingIndices: [],
            swappingIndices: [j, j + 1],
            sortedIndices: [...sortedIndices],
            message: `Swapped ${list[j + 1]} with ${list[j]}!`,
            comparisons,
            swaps,
          });
        }
      }
      sortedIndices.push(n - i - 1);
      if (!swappedInPass) {
        stepsList.push({
          array: [...list],
          comparingIndices: [],
          swappingIndices: [],
          sortedIndices: Array.from({ length: n }, (_, k) => k),
          message: 'Early Exit Optimization: No swaps occurred during this pass, array is fully sorted!',
          comparisons,
          swaps,
        });
        return stepsList;
      }
    }
    sortedIndices.push(0);
    stepsList.push({
      array: [...list],
      comparingIndices: [],
      swappingIndices: [],
      sortedIndices: Array.from({ length: n }, (_, k) => k),
      message: '🎉 Bubble Sort Complete! All elements sorted.',
      comparisons,
      swaps,
    });
    return stepsList;
  };

  // Generate steps for Selection Sort
  const generateSelectionSortSteps = (arr: number[]): SortStep[] => {
    const list = [...arr];
    const stepsList: SortStep[] = [];
    let comparisons = 0;
    let swaps = 0;
    const sortedIndices: number[] = [];

    stepsList.push({
      array: [...list],
      comparingIndices: [],
      swappingIndices: [],
      sortedIndices: [],
      message: 'Starting Selection Sort O(N²)...',
      comparisons: 0,
      swaps: 0,
    });

    const n = list.length;
    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;
      for (let j = i + 1; j < n; j++) {
        comparisons++;
        stepsList.push({
          array: [...list],
          comparingIndices: [minIdx, j],
          swappingIndices: [],
          sortedIndices: [...sortedIndices],
          message: `Pass ${i + 1}: Checking if ${list[j]} < current minimum ${list[minIdx]}`,
          comparisons,
          swaps,
        });

        if (list[j] < list[minIdx]) {
          minIdx = j;
        }
      }

      if (minIdx !== i) {
        swaps++;
        const temp = list[i];
        list[i] = list[minIdx];
        list[minIdx] = temp;

        stepsList.push({
          array: [...list],
          comparingIndices: [],
          swappingIndices: [i, minIdx],
          sortedIndices: [...sortedIndices, i],
          message: `Swapped lowest value ${list[i]} into position ${i}! (Max 1 swap per pass)`,
          comparisons,
          swaps,
        });
      }
      sortedIndices.push(i);
    }
    sortedIndices.push(n - 1);
    stepsList.push({
      array: [...list],
      comparingIndices: [],
      swappingIndices: [],
      sortedIndices: Array.from({ length: n }, (_, k) => k),
      message: '🎉 Selection Sort Complete! Notice how few total swaps occurred.',
      comparisons,
      swaps,
    });
    return stepsList;
  };

  // Generate steps for Insertion Sort
  const generateInsertionSortSteps = (arr: number[]): SortStep[] => {
    const list = [...arr];
    const stepsList: SortStep[] = [];
    let comparisons = 0;
    let swaps = 0;
    const sortedIndices: number[] = [0];

    stepsList.push({
      array: [...list],
      comparingIndices: [],
      swappingIndices: [],
      sortedIndices: [0],
      message: 'Starting Insertion Sort... (Index 0 is sorted subarray of size 1)',
      comparisons: 0,
      swaps: 0,
    });

    for (let i = 1; i < list.length; i++) {
      const temp = list[i];
      let j = i - 1;

      stepsList.push({
        array: [...list],
        comparingIndices: [i],
        swappingIndices: [],
        sortedIndices: [...sortedIndices],
        message: `Extracted temp_value = ${temp} from index ${i} to insert into sorted left portion`,
        comparisons,
        swaps,
      });

      while (j >= 0) {
        comparisons++;
        if (list[j] > temp) {
          swaps++; // shifting is a memory write operation
          list[j + 1] = list[j];
          stepsList.push({
            array: [...list],
            comparingIndices: [j],
            swappingIndices: [j + 1],
            sortedIndices: [...sortedIndices],
            message: `${list[j]} > ${temp}: Shifted ${list[j]} right to index ${j + 1}`,
            comparisons,
            swaps,
          });
          j--;
        } else {
          break;
        }
      }
      list[j + 1] = temp;
      sortedIndices.push(i);

      stepsList.push({
        array: [...list],
        comparingIndices: [],
        swappingIndices: [j + 1],
        sortedIndices: [...sortedIndices],
        message: `Dropped temp_value ${temp} into position ${j + 1}!`,
        comparisons,
        swaps,
      });
    }

    stepsList.push({
      array: [...list],
      comparingIndices: [],
      swappingIndices: [],
      sortedIndices: Array.from({ length: list.length }, (_, k) => k),
      message: '🎉 Insertion Sort Complete!',
      comparisons,
      swaps,
    });

    return stepsList;
  };

  // Generate steps for Quicksort
  const generateQuicksortSteps = (arr: number[]): SortStep[] => {
    const list = [...arr];
    const stepsList: SortStep[] = [];
    let comparisons = 0;
    let swaps = 0;
    const sortedIndices: number[] = [];

    stepsList.push({
      array: [...list],
      comparingIndices: [],
      swappingIndices: [],
      sortedIndices: [],
      message: 'Starting Quicksort O(N log N) Partitioning...',
      comparisons: 0,
      swaps: 0,
    });

    const quickSortHelper = (left: number, right: number) => {
      if (left >= right) {
        if (left === right) sortedIndices.push(left);
        return;
      }

      const pivot = list[right];
      let i = left;

      stepsList.push({
        array: [...list],
        comparingIndices: [],
        swappingIndices: [],
        sortedIndices: [...sortedIndices],
        pivotIndex: right,
        message: `Partitioning subarray [${left}..${right}] with Pivot = ${pivot}`,
        comparisons,
        swaps,
      });

      for (let j = left; j < right; j++) {
        comparisons++;
        stepsList.push({
          array: [...list],
          comparingIndices: [j, right],
          swappingIndices: [],
          sortedIndices: [...sortedIndices],
          pivotIndex: right,
          message: `Comparing ${list[j]} with Pivot ${pivot}`,
          comparisons,
          swaps,
        });

        if (list[j] < pivot) {
          if (i !== j) {
            swaps++;
            const temp = list[i];
            list[i] = list[j];
            list[j] = temp;

            stepsList.push({
              array: [...list],
              comparingIndices: [],
              swappingIndices: [i, j],
              sortedIndices: [...sortedIndices],
              pivotIndex: right,
              message: `Swapped smaller item ${list[i]} with ${list[j]}`,
              comparisons,
              swaps,
            });
          }
          i++;
        }
      }

      // Swap pivot into place
      swaps++;
      const temp = list[i];
      list[i] = list[right];
      list[right] = temp;
      sortedIndices.push(i);

      stepsList.push({
        array: [...list],
        comparingIndices: [],
        swappingIndices: [i, right],
        sortedIndices: [...sortedIndices],
        pivotIndex: i,
        message: `Pivot ${pivot} locked into its permanent sorted index ${i}!`,
        comparisons,
        swaps,
      });

      quickSortHelper(left, i - 1);
      quickSortHelper(i + 1, right);
    };

    quickSortHelper(0, list.length - 1);

    stepsList.push({
      array: [...list],
      comparingIndices: [],
      swappingIndices: [],
      sortedIndices: Array.from({ length: list.length }, (_, k) => k),
      message: '🎉 Quicksort Complete! In-place divide and conquer achieved.',
      comparisons,
      swaps,
    });

    return stepsList;
  };

  // Re-generate steps when algorithm or initial array changes
  useEffect(() => {
    let generated: SortStep[] = [];
    if (algorithm === 'bubble') generated = generateBubbleSortSteps(initialArray);
    else if (algorithm === 'selection') generated = generateSelectionSortSteps(initialArray);
    else if (algorithm === 'insertion') generated = generateInsertionSortSteps(initialArray);
    else if (algorithm === 'quicksort') generated = generateQuicksortSteps(initialArray);

    setSteps(generated);
    setCurrentStepIndex(0);
    setIsPlaying(false);
  }, [algorithm, initialArray]);

  const handleRandomize = () => {
    const random = Array.from({ length: 10 }, () => Math.floor(Math.random() * 90) + 10);
    setInitialArray(random);
  };

  const handlePresetNearlySorted = () => {
    setInitialArray([10, 22, 35, 41, 56, 49, 70, 82, 91, 98]);
  };

  const handlePresetReversed = () => {
    setInitialArray([99, 85, 74, 63, 52, 41, 30, 22, 15, 8]);
  };

  const handleStepForward = () => {
    incrementVisualizerInteractions();
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = window.setInterval(() => {
        setCurrentStepIndex((prev) => {
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

  const currentStep = steps[currentStepIndex] || {
    array: initialArray,
    comparingIndices: [],
    swappingIndices: [],
    sortedIndices: [],
    message: 'Ready',
    comparisons: 0,
    swaps: 0,
  };

  return (
    <div className="visualizer-sandbox">
      {/* Sandbox Toolbar */}
      <div className="sandbox-toolbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <div>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block' }}>
              Sorting Algorithm
            </label>
            <div style={{ display: 'flex', gap: '6px', marginTop: '4px', flexWrap: 'wrap' }}>
              <button
                className={`category-filter-btn ${algorithm === 'bubble' ? 'active' : ''}`}
                onClick={() => setAlgorithm('bubble')}
              >
                Bubble Sort O(N²)
              </button>
              <button
                className={`category-filter-btn ${algorithm === 'selection' ? 'active' : ''}`}
                onClick={() => setAlgorithm('selection')}
              >
                Selection Sort O(N²)
              </button>
              <button
                className={`category-filter-btn ${algorithm === 'insertion' ? 'active' : ''}`}
                onClick={() => setAlgorithm('insertion')}
              >
                Insertion Sort O(N²)
              </button>
              <button
                className={`category-filter-btn ${algorithm === 'quicksort' ? 'active' : ''}`}
                onClick={() => setAlgorithm('quicksort')}
              >
                Quicksort O(N log N)
              </button>
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block' }}>
              Presets
            </label>
            <div style={{ display: 'flex', gap: '6px', marginTop: '4px' }}>
              <button className="btn btn-secondary" style={{ padding: '4px 10px', fontSize: '0.75rem' }} onClick={handleRandomize}>
                <Shuffle size={12} />
                <span>Random</span>
              </button>
              <button className="btn btn-secondary" style={{ padding: '4px 10px', fontSize: '0.75rem' }} onClick={handlePresetNearlySorted}>
                <span>Nearly Sorted</span>
              </button>
              <button className="btn btn-secondary" style={{ padding: '4px 10px', fontSize: '0.75rem' }} onClick={handlePresetReversed}>
                <span>Reverse Sorted</span>
              </button>
            </div>
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
            disabled={isPlaying || currentStepIndex >= steps.length - 1}
          >
            <SkipForward size={16} />
            <span>Step</span>
          </button>
          <button
            className="btn btn-secondary"
            style={{ padding: '8px 14px' }}
            onClick={() => {
              setIsPlaying(false);
              setCurrentStepIndex(0);
            }}
          >
            <RotateCcw size={16} />
            <span>Reset</span>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: '12px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Speed</span>
            <input
              type="range"
              min="50"
              max="1000"
              step="50"
              value={1050 - speed}
              onChange={(e) => setSpeed(1050 - Number(e.target.value))}
              style={{ width: '80px', accentColor: 'var(--accent-indigo)' }}
            />
          </div>
        </div>
      </div>

      {/* Stage Area */}
      <div className="sandbox-stage">
        {/* Array Visualization Cells */}
        <div className="array-strip">
          {currentStep.array.map((value, index) => {
            const isComparing = currentStep.comparingIndices.includes(index);
            const isSwapping = currentStep.swappingIndices.includes(index);
            const isSorted = currentStep.sortedIndices.includes(index);
            const isPivot = currentStep.pivotIndex === index;

            let cellClass = 'array-cell';
            if (isPivot) cellClass += ' pivot';
            else if (isSwapping) cellClass += ' swapping';
            else if (isComparing) cellClass += ' comparing';
            else if (isSorted) cellClass += ' sorted';

            return (
              <div key={index} className="array-cell-wrapper">
                <div style={{ height: '18px' }}>
                  {isPivot && <span className="pointer-tag mid">PIVOT</span>}
                  {isComparing && !isPivot && <span className="pointer-tag low">COMPARE</span>}
                  {isSwapping && !isPivot && <span className="pointer-tag high">SWAP</span>}
                </div>

                <div
                  className={cellClass}
                  style={{
                    height: `${Math.max(54, value * 1.8)}px`,
                  }}
                >
                  {value}
                </div>

                <span className="array-index-label">[{index}]</span>
              </div>
            );
          })}
        </div>

        {/* Real-time Operation Metrics */}
        <div
          style={{
            marginTop: '28px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '14px',
            width: '100%',
            maxWidth: '680px',
          }}
        >
          <div
            style={{
              padding: '10px 16px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(30, 41, 59, 0.6)',
              border: '1px solid var(--border-subtle)',
              textAlign: 'center',
            }}
          >
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>
              Comparisons
            </span>
            <strong style={{ fontSize: '1.25rem', color: 'var(--accent-amber)' }}>
              {currentStep.comparisons}
            </strong>
          </div>

          <div
            style={{
              padding: '10px 16px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(30, 41, 59, 0.6)',
              border: '1px solid var(--border-subtle)',
              textAlign: 'center',
            }}
          >
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>
              Swaps / Shifts
            </span>
            <strong style={{ fontSize: '1.25rem', color: 'var(--accent-rose)' }}>
              {currentStep.swaps}
            </strong>
          </div>

          <div
            style={{
              padding: '10px 16px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(30, 41, 59, 0.6)',
              border: '1px solid var(--border-subtle)',
              textAlign: 'center',
            }}
          >
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>
              Total Steps
            </span>
            <strong style={{ fontSize: '1.25rem', color: 'var(--accent-cyan)' }}>
              {currentStep.comparisons + currentStep.swaps}
            </strong>
          </div>

          <div
            style={{
              padding: '10px 16px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(30, 41, 59, 0.6)',
              border: '1px solid var(--border-subtle)',
              textAlign: 'center',
            }}
          >
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>
              Step Progress
            </span>
            <strong style={{ fontSize: '1.1rem', color: '#fff' }}>
              {currentStepIndex + 1} / {steps.length}
            </strong>
          </div>
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
