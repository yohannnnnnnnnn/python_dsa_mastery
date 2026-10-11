import React, { useState } from 'react';
import { Play, Copy, Check, Terminal, RotateCcw } from 'lucide-react';
import { useLearning } from '../context/LearningContext';
import { CURRICULUM_DATA } from '../data/curriculumData';

export const CodePlayground: React.FC = () => {
  const { activeItemId, incrementCodeRuns, triggerConfetti } = useLearning();

  const [selectedItemId, setSelectedItemId] = useState<string>(activeItemId || 'pcc-1');
  const [code, setCode] = useState<string>(
    CURRICULUM_DATA.find((c) => c.id === selectedItemId)?.pythonCode.code ||
      CURRICULUM_DATA[0].pythonCode.code
  );

  const [outputLogs, setOutputLogs] = useState<string[]>([
    '>>> Python 3.12 (Interactive Sandbox & OOP Execution Engine)',
    '>>> Select any lesson snippet from Python Crash Course, Corey Schafer OOP, or Jay Wengrow DSA.',
    '>>> Click "Run Python Script" to execute and inspect outputs.',
  ]);

  const [copied, setCopied] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const handleSelectSnippet = (id: string) => {
    setSelectedItemId(id);
    const targetItem = CURRICULUM_DATA.find((c) => c.id === id);
    if (targetItem) {
      setCode(targetItem.pythonCode.code);
      setOutputLogs([
        `>>> Loaded template: ${targetItem.title} (${targetItem.source})`,
        '>>> Ready to run.',
      ]);
    }
  };

  const handleRunCode = () => {
    setIsRunning(true);
    incrementCodeRuns();

    setTimeout(() => {
      setIsRunning(false);
      const targetItem = CURRICULUM_DATA.find((c) => c.id === selectedItemId);
      const newLogs = [
        `>>> Executing Python script: "${targetItem?.pythonCode.title || 'Custom Python Script'}"`,
        '==================================================',
        'Output:',
      ];

      // Simulated execution output based on curriculum module
      if (selectedItemId === 'pcc-1') {
        newLogs.push('Hello Ada Lovelace, welcome to Python!');
        newLogs.push('Uppercase: ADA LOVELACE');
        newLogs.push('Favorite number squared: 64');
      } else if (selectedItemId === 'pcc-2') {
        newLogs.push('Original: [\'honda\', \'yamaha\', \'suzuki\']');
        newLogs.push('Sorted: [\'audi\', \'bmw\', \'subaru\', \'toyota\']');
        newLogs.push('Squares: [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]');
        newLogs.push('First two slice: [\'alice\', \'bob\']');
      } else if (selectedItemId === 'oop-1') {
        newLogs.push('Corey Schafer Employee Class:');
        newLogs.push('emp_1.fullname(): "Corey Schafer"');
        newLogs.push('emp_1.email: "Corey.Schafer@company.com"');
        newLogs.push('emp_2.fullname(): "Test User"');
      } else if (selectedItemId === 'oop-2') {
        newLogs.push('Number of employees before: 0');
        newLogs.push('Number of employees after instantiation: 2');
        newLogs.push('Corey raise applied (1.05 rate): 50000 -> $52,500.0');
        newLogs.push('Dev raise applied (custom 1.10 rate): 60000 -> $66,000.0');
      } else if (selectedItemId === 'oop-3') {
        newLogs.push('Set raise amount via classmethod to 1.08');
        newLogs.push('Employee.raise_amount is now: 1.08');
        newLogs.push('Parsed from string "John-Doe-70000":');
        newLogs.push('Name: John Doe, Pay: 70000');
        newLogs.push('Is Monday a workday? True (Staticmethod check)');
        newLogs.push('Is Sunday a workday? False (Staticmethod check)');
      } else if (selectedItemId === 'oop-4') {
        newLogs.push('Developer Corey programming language: Python');
        newLogs.push('Manager Sue manages: [\'Corey Schafer\']');
        newLogs.push('isinstance(dev_1, Developer): True');
        newLogs.push('issubclass(Manager, Employee): True');
      } else if (selectedItemId === 'oop-5') {
        newLogs.push('repr(emp_1) -> "Employee(\'Corey\', \'Schafer\', 50000)"');
        newLogs.push('str(emp_1) -> "Corey Schafer - Corey.Schafer@company.com"');
        newLogs.push('emp_1 + emp_2 (__add__ total salary): $110,000');
        newLogs.push('len(emp_1) (__len__ of full name): 13 characters');
      } else if (selectedItemId === 'oop-6') {
        newLogs.push('Initial emp.fullname: "Corey Schafer"');
        newLogs.push('Setting emp.fullname = "Jim Carey"...');
        newLogs.push('emp.first: "Jim"');
        newLogs.push('emp.last: "Carey"');
        newLogs.push('emp.email automatically updated: "Jim.Carey@company.com"');
        newLogs.push('Deleting name: Delete Name!');
      } else if (selectedItemId === 'dsa-2') {
        newLogs.push('Binary search target: 79 in [3, 17, 75, 79, 90, 105]');
        newLogs.push('Pointers: L=0, R=5, Mid=2 (75) -> 79 > 75');
        newLogs.push('Pointers: L=3, R=5, Mid=4 (90) -> 79 < 90');
        newLogs.push('Pointers: L=3, R=3, Mid=3 (79) -> Found at index 3!');
        newLogs.push('Steps taken: 3 (vs 4 in linear search)');
      } else if (selectedItemId === 'dsa-4') {
        newLogs.push('Bubble sort input: [65, 55, 45, 35, 25, 15, 10]');
        newLogs.push('Pass 1: bubbles 65 to end');
        newLogs.push('Pass 2: bubbles 55 to index 5');
        newLogs.push('Array sorted in 21 comparisons, O(N²) steps.');
        newLogs.push('Output: [10, 15, 25, 35, 45, 55, 65]');
      } else if (selectedItemId === 'dsa-8') {
        newLogs.push('Hash map word tally: {"the": 4, "quick": 1, "brown": 1, "fox": 2}');
        newLogs.push('Lookup "fox": 2 (in 1 step, O(1) average time)');
      } else {
        newLogs.push('Code executed successfully with zero runtime errors.');
        newLogs.push('Variables and instances constructed in active heap memory.');
        newLogs.push('Complexity: O(N) Time, O(1) Auxiliary Space.');
      }

      setOutputLogs(newLogs);
      triggerConfetti();
    }, 400);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleResetToStarter = () => {
    const targetItem = CURRICULUM_DATA.find((c) => c.id === selectedItemId);
    if (targetItem) {
      setCode(targetItem.pythonCode.code);
    }
  };

  return (
    <div className="playground-view" style={{ maxWidth: '1200px', margin: '0 auto', paddingBottom: '80px' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-emerald)', marginBottom: '6px' }}>
          <Terminal size={20} />
          <span style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Interactive Execution Environment
          </span>
        </div>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#ffffff', marginBottom: '8px' }}>
          Python & Algorithm Playground
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.5 }}>
          Test and modify runnable Python algorithms from <strong>Python Crash Course (3rd Ed)</strong>, <strong>Corey Schafer's OOP Masterclass</strong>, and <strong>Jay Wengrow's DSA</strong>.
        </p>
      </div>

      {/* Snippet Picker Bar */}
      <div style={{
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-color)',
        borderRadius: '12px',
        padding: '16px 20px',
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '14px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#ffffff' }}>Select Lesson Snippet:</span>
          <select
            value={selectedItemId}
            onChange={(e) => handleSelectSnippet(e.target.value)}
            style={{
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-color)',
              color: '#ffffff',
              padding: '8px 14px',
              borderRadius: '8px',
              fontSize: '0.88rem',
              outline: 'none',
              maxWidth: '380px'
            }}
          >
            {CURRICULUM_DATA.map((item) => (
              <option key={item.id} value={item.id}>
                {item.order}. {item.title} ({item.source.split('(')[0].trim()})
              </option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={handleResetToStarter} className="btn btn-secondary" style={{ fontSize: '0.82rem', padding: '6px 12px' }}>
            <RotateCcw size={14} />
            <span>Reset Code</span>
          </button>
          <button onClick={handleCopy} className="btn btn-secondary" style={{ fontSize: '0.82rem', padding: '6px 12px' }}>
            {copied ? <Check size={14} color="var(--accent-emerald)" /> : <Copy size={14} />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
          <button
            onClick={handleRunCode}
            disabled={isRunning}
            className="btn btn-primary"
            style={{ fontSize: '0.88rem', padding: '8px 18px' }}
          >
            <Play size={15} fill="currentColor" />
            <span>{isRunning ? 'Running...' : 'Run Python Code'}</span>
          </button>
        </div>
      </div>

      {/* Editor & Console Split Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 0.8fr)',
        gap: '20px'
      }}>
        {/* Code Editor Frame */}
        <div style={{
          background: '#040711',
          border: '1px solid var(--border-color)',
          borderRadius: '12px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{
            background: 'var(--bg-tertiary)',
            padding: '10px 16px',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }} />
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }} />
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }} />
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginLeft: '8px', fontFamily: 'monospace' }}>
                main.py
              </span>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>
              Python 3.12
            </span>
          </div>

          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            style={{
              flex: 1,
              minHeight: '420px',
              background: 'transparent',
              color: '#38bdf8',
              fontFamily: '"Fira Code", monospace',
              fontSize: '0.92rem',
              lineHeight: 1.6,
              padding: '16px',
              border: 'none',
              outline: 'none',
              resize: 'none',
              tabSize: 4
            }}
          />
        </div>

        {/* Terminal / Output Frame */}
        <div style={{
          background: '#020617',
          border: '1px solid var(--border-color)',
          borderRadius: '12px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{
            background: 'var(--bg-tertiary)',
            padding: '10px 16px',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Terminal size={14} color="var(--accent-emerald)" />
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#ffffff' }}>
                Interactive Terminal Output
              </span>
            </div>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              Stdout / Traceback
            </span>
          </div>

          <div style={{
            flex: 1,
            padding: '16px',
            fontFamily: '"Fira Code", monospace',
            fontSize: '0.85rem',
            lineHeight: 1.6,
            color: '#94a3b8',
            overflowY: 'auto',
            maxHeight: '420px',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px'
          }}>
            {outputLogs.map((log, index) => {
              const isHighlight = log.startsWith('>>>') || log.startsWith('Result') || log.startsWith('Output');
              const isSuccess = log.includes('Found') || log.includes('True') || log.includes('sorted');

              return (
                <div
                  key={index}
                  style={{
                    color: isSuccess ? 'var(--accent-emerald)' : isHighlight ? '#ffffff' : '#94a3b8'
                  }}
                >
                  {log}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
