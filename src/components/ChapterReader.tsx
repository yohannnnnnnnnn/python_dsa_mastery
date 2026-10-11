import React, { useState } from 'react';
import {
  BookOpen,
  Play,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Copy,
  Check,
  ChevronRight,
  ChevronLeft,
  HelpCircle,
  Sparkles,
  Terminal,
  Lock,
  ArrowLeft,
  CheckCircle,
  Code2
} from 'lucide-react';
import { useLearning } from '../context/LearningContext';
import { CURRICULUM_DATA, type CurriculumItem } from '../data/curriculumData';

// Visualizer imports
import { BinarySearchVisualizer } from './visualizers/BinarySearchVisualizer';
import { SortingVisualizer } from './visualizers/SortingVisualizer';
import { HashTableVisualizer } from './visualizers/HashTableVisualizer';
import { StackQueueVisualizer } from './visualizers/StackQueueVisualizer';
import { RecursionCallStackVisualizer } from './visualizers/RecursionCallStackVisualizer';
import { LinkedListVisualizer } from './visualizers/LinkedListVisualizer';
import { BSTVisualizer } from './visualizers/BSTVisualizer';
import { HeapVisualizer } from './visualizers/HeapVisualizer';
import { TrieVisualizer } from './visualizers/TrieVisualizer';
import { GraphVisualizer } from './visualizers/GraphVisualizer';
import { SpaceTimeVisualizer } from './visualizers/SpaceTimeVisualizer';

export const ChapterReader: React.FC = () => {
  const {
    activeItemId,
    setActiveItemId,
    setActiveTab,
    setActiveVisualizerType,
    isUnlocked,
    isCompleted,
    progress,
    completeCurrentAndUnlockNext,
    recordQuizScore,
    triggerConfetti,
    setGodMode,
  } = useLearning();

  const [readerTab, setReaderTab] = useState<'concept' | 'visualizer' | 'code' | 'quiz'>('concept');
  const [copiedCode, setCopiedCode] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [showFeynmanSample, setShowFeynmanSample] = useState(false);
  const [feynmanAnswerText, setFeynmanAnswerText] = useState('');

  const currentItem: CurriculumItem =
    CURRICULUM_DATA.find((item) => item.id === activeItemId) || CURRICULUM_DATA[0];

  const unlocked = isUnlocked(currentItem.id);
  const completed = isCompleted(currentItem.id);
  const quizScore = progress.quizScores[currentItem.id];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentItem.pythonCode.code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (quizSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleSubmitQuiz = () => {
    let correctCount = 0;
    currentItem.quiz.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correctCount++;
      }
    });

    const scorePercentage = Math.round((correctCount / currentItem.quiz.length) * 100);
    setQuizSubmitted(true);
    recordQuizScore(currentItem.id, scorePercentage);

    if (scorePercentage >= 80) {
      triggerConfetti();
    }
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setQuizSubmitted(false);
  };

  const handleLaunchVisualizerLab = () => {
    if (currentItem.visualizerType) {
      setActiveVisualizerType(currentItem.visualizerType);
      setActiveTab('visualizer');
    }
  };

  const currentIndex = CURRICULUM_DATA.findIndex((c) => c.id === currentItem.id);
  const prevItem = currentIndex > 0 ? CURRICULUM_DATA[currentIndex - 1] : null;
  const nextItem = currentIndex < CURRICULUM_DATA.length - 1 ? CURRICULUM_DATA[currentIndex + 1] : null;

  // Render embedded visualizer if available
  const renderEmbeddedVisualizer = () => {
    switch (currentItem.visualizerType) {
      case 'binarySearch':
        return <BinarySearchVisualizer />;
      case 'sorting':
        return <SortingVisualizer />;
      case 'hashTable':
        return <HashTableVisualizer />;
      case 'stackQueue':
        return <StackQueueVisualizer />;
      case 'recursion':
        return <RecursionCallStackVisualizer />;
      case 'linkedList':
        return <LinkedListVisualizer />;
      case 'bst':
        return <BSTVisualizer />;
      case 'heap':
        return <HeapVisualizer />;
      case 'trie':
        return <TrieVisualizer />;
      case 'graph':
        return <GraphVisualizer />;
      case 'spaceTime':
        return <SpaceTimeVisualizer />;
      default:
        return (
          <div style={{ padding: '40px', textAlign: 'center', background: 'var(--bg-tertiary)', borderRadius: '12px' }}>
            <Terminal size={40} color="var(--accent-indigo-light)" style={{ marginBottom: '16px' }} />
            <h3 style={{ color: '#ffffff', marginBottom: '8px' }}>Python Code Simulation Mode</h3>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto 20px' }}>
              This foundational lesson focuses on code patterns, object-oriented memory model, and syntax. Test the code live in our Python Playground!
            </p>
            <button className="btn btn-primary" onClick={() => setActiveTab('playground')}>
              <Terminal size={16} />
              <span>Open in Python Playground</span>
            </button>
          </div>
        );
    }
  };

  // If locked, render lock screen card
  if (!unlocked) {
    return (
      <div style={{ maxWidth: '720px', margin: '60px auto', textAlign: 'center', padding: '48px 32px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '16px' }}>
        <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
          <Lock size={32} color="var(--accent-rose)" />
        </div>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff', marginBottom: '12px' }}>
          Lesson Locked: Progressive Gate
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '28px' }}>
          To unlock <strong>{currentItem.title}</strong>, you must first complete and pass the active recall quiz (≥80%) for previous lessons in the roadmap.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
          <button className="btn btn-secondary" onClick={() => setActiveTab('roadmap')}>
            <ArrowLeft size={16} />
            <span>Return to Roadmap</span>
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              setGodMode(true);
              triggerConfetti();
            }}
          >
            <Sparkles size={16} />
            <span>Unlock All (God Mode)</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="chapter-reader-view" style={{ maxWidth: '1000px', margin: '0 auto', paddingBottom: '80px' }}>
      {/* Top Breadcrumb & Back button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <button
          onClick={() => setActiveTab('roadmap')}
          className="btn btn-secondary"
          style={{ padding: '6px 14px', fontSize: '0.82rem' }}
        >
          <ArrowLeft size={14} />
          <span>Back to Roadmap Tree</span>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {completed && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--accent-emerald)', fontSize: '0.82rem', fontWeight: 700, background: 'rgba(16, 185, 129, 0.15)', padding: '4px 10px', borderRadius: '20px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
              <CheckCircle2 size={14} />
              Lesson Mastered (+150 XP)
            </span>
          )}
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            Lesson {currentItem.order} of {CURRICULUM_DATA.length}
          </span>
        </div>
      </div>

      {/* Lesson Hero Header */}
      <div className="chapter-hero" style={{
        background: 'linear-gradient(180deg, rgba(16, 185, 129, 0.06) 0%, rgba(13, 17, 23, 0.95) 100%)',
        border: '1px solid rgba(16, 185, 129, 0.25)',
        borderRadius: '16px',
        padding: '28px 32px',
        marginBottom: '28px'
      }}>
        <div className="chapter-tag-row" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '14px' }}>
          <span className="tag-pill emerald" style={{ fontSize: '0.75rem', fontWeight: 700 }}>
            {currentItem.tierName}
          </span>
          <span className="tag-pill indigo" style={{ fontSize: '0.75rem' }}>
            {currentItem.source}
          </span>
          <span className="tag-pill amber" style={{ fontSize: '0.75rem' }}>
            {currentItem.difficulty}
          </span>
          <span className="tag-pill cyan" style={{ fontSize: '0.75rem' }}>
            {currentItem.estimatedMinutes} Min Study
          </span>
        </div>

        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#ffffff', marginBottom: '8px', letterSpacing: '-0.02em' }}>
          {currentItem.title}
        </h1>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '20px', lineHeight: 1.5 }}>
          {currentItem.subtitle}
        </p>

        {/* Lesson Subtabs: Concept, Visualizer, Code, Quiz */}
        <div style={{
          display: 'flex',
          gap: '8px',
          borderBottom: '1px solid var(--border-color)',
          paddingBottom: '12px',
          marginTop: '20px',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={() => setReaderTab('concept')}
            style={{
              background: readerTab === 'concept' ? 'var(--accent-emerald)' : 'var(--bg-secondary)',
              color: readerTab === 'concept' ? '#000000' : 'var(--text-secondary)',
              border: readerTab === 'concept' ? '1px solid var(--accent-emerald)' : '1px solid var(--border-color)',
              borderRadius: '8px',
              padding: '8px 18px',
              fontSize: '0.88rem',
              fontWeight: readerTab === 'concept' ? 700 : 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <BookOpen size={15} />
            <span>1. Concept & Analogy</span>
          </button>

          {currentItem.visualizerType && (
            <button
              onClick={() => setReaderTab('visualizer')}
              style={{
                background: readerTab === 'visualizer' ? 'var(--accent-cyan)' : 'var(--bg-secondary)',
                color: readerTab === 'visualizer' ? '#000000' : 'var(--text-secondary)',
                border: readerTab === 'visualizer' ? '1px solid var(--accent-cyan)' : '1px solid var(--border-color)',
                borderRadius: '8px',
                padding: '8px 18px',
                fontSize: '0.88rem',
                fontWeight: readerTab === 'visualizer' ? 700 : 500,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Play size={15} fill="currentColor" />
              <span>2. Interactive Visualizer</span>
            </button>
          )}

          <button
            onClick={() => setReaderTab('code')}
            style={{
              background: readerTab === 'code' ? 'var(--accent-indigo-light)' : 'var(--bg-secondary)',
              color: readerTab === 'code' ? '#000000' : 'var(--text-secondary)',
              border: readerTab === 'code' ? '1px solid var(--accent-indigo-light)' : '1px solid var(--border-color)',
              borderRadius: '8px',
              padding: '8px 18px',
              fontSize: '0.88rem',
              fontWeight: readerTab === 'code' ? 700 : 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Terminal size={15} />
            <span>3. Python Implementation</span>
          </button>

          <button
            onClick={() => setReaderTab('quiz')}
            style={{
              background: readerTab === 'quiz' ? 'var(--accent-amber)' : 'var(--bg-secondary)',
              color: readerTab === 'quiz' ? '#000000' : 'var(--text-secondary)',
              border: readerTab === 'quiz' ? '1px solid var(--accent-amber)' : '1px solid var(--border-color)',
              borderRadius: '8px',
              padding: '8px 18px',
              fontSize: '0.88rem',
              fontWeight: readerTab === 'quiz' ? 700 : 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Sparkles size={15} />
            <span>4. Active Recall Quiz ({completed ? '✓ Mastered' : 'Unlock Next'})</span>
          </button>
        </div>
      </div>

      {/* Tab 1: CONCEPT & INTUITION ANALOGY */}
      {readerTab === 'concept' && (
        <div className="reader-tab-content" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          {/* Executive Summary Card */}
          <div className="card" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', padding: '24px', borderRadius: '12px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ffffff', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BookOpen size={18} color="var(--accent-emerald)" />
              Executive Overview
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6 }}>
              {currentItem.summary}
            </p>
          </div>

          {/* Intuition Analogy Card (Wengrow / Matthes / Schafer) */}
          <div className="card" style={{
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(13, 17, 23, 0.8) 100%)',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            padding: '24px',
            borderRadius: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <Lightbulb size={20} color="var(--accent-indigo-light)" />
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--accent-indigo-light)', margin: 0 }}>
                Intuition & Mental Model
              </h3>
            </div>
            <p style={{ color: '#e2e8f0', fontSize: '1.02rem', lineHeight: 1.65, fontStyle: 'normal' }}>
              {currentItem.intuitionAnalogy}
            </p>
          </div>

          {/* Key Concepts Breakdown */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#ffffff', margin: '12px 0 4px 0' }}>
              Core Technical Mechanics
            </h3>
            {currentItem.keyConcepts.map((kc, idx) => (
              <div
                key={idx}
                className="card"
                style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  padding: '20px 24px',
                  borderRadius: '12px'
                }}
              >
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--accent-emerald)', marginBottom: '8px' }}>
                  {kc.heading}
                </h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: kc.points ? '12px' : 0 }}>
                  {kc.body}
                </p>
                {kc.points && (
                  <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                    {kc.points.map((pt, pIdx) => (
                      <li key={pIdx} style={{ marginBottom: '6px' }}>
                        {pt}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* Golden Rules & Common Pitfalls Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
            {/* Golden Rules */}
            <div className="card" style={{
              background: 'rgba(16, 185, 129, 0.04)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              padding: '20px 24px',
              borderRadius: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                <CheckCircle2 size={18} color="var(--accent-emerald)" />
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--accent-emerald)', margin: 0 }}>
                  Golden Principles
                </h4>
              </div>
              <ul style={{ paddingLeft: '18px', color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                {currentItem.goldenRules.map((rule, idx) => (
                  <li key={idx} style={{ marginBottom: '8px' }}>{rule}</li>
                ))}
              </ul>
            </div>

            {/* Pitfalls */}
            <div className="card" style={{
              background: 'rgba(239, 68, 68, 0.04)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              padding: '20px 24px',
              borderRadius: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                <AlertTriangle size={18} color="var(--accent-rose)" />
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--accent-rose)', margin: 0 }}>
                  Common Pitfalls & Gotchas
                </h4>
              </div>
              <ul style={{ paddingLeft: '18px', color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                {currentItem.commonPitfalls.map((pitfall, idx) => (
                  <li key={idx} style={{ marginBottom: '8px' }}>{pitfall}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Feynman Technique Self-Test */}
          <div className="card" style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            padding: '24px',
            borderRadius: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <HelpCircle size={20} color="var(--accent-amber)" />
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>
                The Feynman Technique Challenge
              </h4>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '16px' }}>
              <strong>Prompt:</strong> {currentItem.feynmanPrompt.question}
            </p>

            <textarea
              value={feynmanAnswerText}
              onChange={(e) => setFeynmanAnswerText(e.target.value)}
              placeholder="Explain this concept in plain English without jargon, as if teaching a beginner..."
              rows={4}
              style={{
                width: '100%',
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                padding: '12px',
                color: '#ffffff',
                fontSize: '0.9rem',
                fontFamily: 'inherit',
                outline: 'none',
                marginBottom: '14px',
                resize: 'vertical'
              }}
            />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
              <button
                className="btn btn-secondary"
                onClick={() => setShowFeynmanSample(!showFeynmanSample)}
                style={{ fontSize: '0.82rem', padding: '6px 14px' }}
              >
                {showFeynmanSample ? 'Hide Model Explanation' : 'Compare with Model Explanation'}
              </button>

              <button
                className="btn btn-primary"
                onClick={() => setReaderTab('quiz')}
                style={{ fontSize: '0.85rem' }}
              >
                <span>Take Active Recall Quiz →</span>
              </button>
            </div>

            {showFeynmanSample && (
              <div style={{ marginTop: '16px', padding: '16px', background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: '8px' }}>
                <h5 style={{ color: 'var(--accent-amber)', fontSize: '0.9rem', fontWeight: 700, marginBottom: '6px' }}>
                  Model Feynman Explanation:
                </h5>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.5, marginBottom: '10px' }}>
                  {currentItem.feynmanPrompt.sampleExplanation}
                </p>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  <strong>Key Rubric Criteria:</strong>
                  <ul style={{ paddingLeft: '18px', marginTop: '4px' }}>
                    {currentItem.feynmanPrompt.rubricPoints.map((r, rIdx) => (
                      <li key={rIdx}>{r}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: INTERACTIVE VISUALIZER */}
      {readerTab === 'visualizer' && (
        <div className="reader-tab-content">
          <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              Interactive Sandbox for: <strong>{currentItem.title}</strong>
            </span>
            <button className="btn btn-secondary" onClick={handleLaunchVisualizerLab} style={{ fontSize: '0.82rem' }}>
              <span>Expand in Visualizer Lab</span>
              <ChevronRight size={14} />
            </button>
          </div>
          {renderEmbeddedVisualizer()}
        </div>
      )}

      {/* Tab 3: PYTHON IMPLEMENTATION */}
      {readerTab === 'code' && (
        <div className="reader-tab-content" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="card" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#ffffff', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Code2 size={18} color="var(--accent-indigo-light)" />
                {currentItem.pythonCode.title}
              </h3>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={handleCopyCode}
                  className="btn btn-secondary"
                  style={{ fontSize: '0.82rem', padding: '6px 12px' }}
                >
                  {copiedCode ? <Check size={14} color="var(--accent-emerald)" /> : <Copy size={14} />}
                  <span>{copiedCode ? 'Copied!' : 'Copy Code'}</span>
                </button>
                <button
                  onClick={() => setActiveTab('playground')}
                  className="btn btn-primary"
                  style={{ fontSize: '0.82rem', padding: '6px 12px' }}
                >
                  <Terminal size={14} />
                  <span>Run in Playground</span>
                </button>
              </div>
            </div>

            <pre style={{
              background: '#040711',
              border: '1px solid rgba(255,255,255,0.08)',
              padding: '18px 20px',
              borderRadius: '8px',
              overflowX: 'auto',
              color: '#38bdf8',
              fontSize: '0.92rem',
              lineHeight: 1.55,
              fontFamily: 'monospace'
            }}>
              <code>{currentItem.pythonCode.code}</code>
            </pre>

            <div style={{ marginTop: '16px', padding: '14px 18px', background: 'var(--bg-tertiary)', borderRadius: '8px', borderLeft: '3px solid var(--accent-indigo-light)' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>
                Code Architecture Breakdown:
              </span>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.5, margin: '6px 0 0 0' }}>
                {currentItem.pythonCode.explanation}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: ACTIVE RECALL QUIZ & PROGRESSIVE UNLOCK */}
      {readerTab === 'quiz' && (
        <div className="reader-tab-content" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="card" style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            borderRadius: '16px',
            padding: '28px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffffff', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Sparkles size={20} color="var(--accent-amber)" />
                  Active Recall Knowledge Check
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', margin: '4px 0 0 0' }}>
                  Score 80% or higher to unlock the next chapter in your roadmap tree.
                </p>
              </div>

              {quizSubmitted && (
                <div style={{
                  padding: '8px 16px',
                  borderRadius: '10px',
                  background: (quizScore ?? 0) >= 80 ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                  border: (quizScore ?? 0) >= 80 ? '1px solid #10b981' : '1px solid #ef4444',
                  textAlign: 'right'
                }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: (quizScore ?? 0) >= 80 ? 'var(--accent-emerald)' : 'var(--accent-rose)' }}>
                    {quizScore}% Score
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {(quizScore ?? 0) >= 80 ? '🎉 Passed & Unlocked!' : 'Try again for ≥80%'}
                  </div>
                </div>
              )}
            </div>

            {/* Questions List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              {currentItem.quiz.map((q, qIndex) => {
                const selectedOption = selectedAnswers[q.id];
                const isAnswered = selectedOption !== undefined;
                const isCorrect = isAnswered && selectedOption === q.correctIndex;

                return (
                  <div
                    key={q.id}
                    style={{
                      background: 'var(--bg-tertiary)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '12px',
                      padding: '20px'
                    }}
                  >
                    <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', marginBottom: '14px', lineHeight: 1.4 }}>
                      <span style={{ color: 'var(--accent-emerald)', marginRight: '8px' }}>Q{qIndex + 1}.</span>
                      {q.question}
                    </h4>

                    {/* Options */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {q.options.map((opt, optIndex) => {
                        const isChosen = selectedOption === optIndex;
                        let optionStyle = {
                          background: 'var(--bg-secondary)',
                          border: '1px solid var(--border-color)',
                          color: 'var(--text-primary)',
                        };

                        if (isChosen) {
                          optionStyle = {
                            background: 'rgba(99, 102, 241, 0.15)',
                            border: '1px solid var(--accent-indigo-light)',
                            color: '#ffffff',
                          };
                        }

                        if (quizSubmitted) {
                          if (optIndex === q.correctIndex) {
                            optionStyle = {
                              background: 'rgba(16, 185, 129, 0.18)',
                              border: '1px solid var(--accent-emerald)',
                              color: 'var(--accent-emerald)',
                            };
                          } else if (isChosen && optIndex !== q.correctIndex) {
                            optionStyle = {
                              background: 'rgba(239, 68, 68, 0.18)',
                              border: '1px solid var(--accent-rose)',
                              color: 'var(--accent-rose)',
                            };
                          }
                        }

                        return (
                          <button
                            key={optIndex}
                            onClick={() => handleSelectOption(q.id, optIndex)}
                            disabled={quizSubmitted}
                            style={{
                              ...optionStyle,
                              padding: '12px 16px',
                              borderRadius: '8px',
                              textAlign: 'left',
                              fontSize: '0.9rem',
                              cursor: quizSubmitted ? 'default' : 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              transition: 'all 0.15s ease',
                              fontFamily: 'inherit'
                            }}
                          >
                            <span>{opt}</span>
                            {quizSubmitted && optIndex === q.correctIndex && (
                              <CheckCircle size={16} color="var(--accent-emerald)" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Explanation if submitted */}
                    {quizSubmitted && (
                      <div style={{
                        marginTop: '14px',
                        padding: '12px 16px',
                        borderRadius: '8px',
                        background: isCorrect ? 'rgba(16, 185, 129, 0.08)' : 'rgba(245, 158, 11, 0.08)',
                        border: isCorrect ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(245, 158, 11, 0.3)',
                        fontSize: '0.85rem',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.5
                      }}>
                        <strong style={{ color: isCorrect ? 'var(--accent-emerald)' : 'var(--accent-amber)' }}>
                          {isCorrect ? 'Correct! ' : 'Explanation: '}
                        </strong>
                        {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Quiz Action Bar */}
            <div style={{ marginTop: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
              {!quizSubmitted ? (
                <button
                  onClick={handleSubmitQuiz}
                  disabled={Object.keys(selectedAnswers).length < currentItem.quiz.length}
                  className="btn btn-primary"
                  style={{ padding: '10px 24px', fontSize: '0.95rem' }}
                >
                  <Sparkles size={16} />
                  <span>Submit Quiz Answers</span>
                </button>
              ) : (
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <button onClick={handleResetQuiz} className="btn btn-secondary">
                    <span>Retake Quiz</span>
                  </button>
                  {nextItem && (quizScore ?? 0) >= 80 && (
                    <button
                      onClick={() => {
                        completeCurrentAndUnlockNext(currentItem.id);
                        setActiveItemId(nextItem.id);
                        setReaderTab('concept');
                        setSelectedAnswers({});
                        setQuizSubmitted(false);
                      }}
                      className="btn btn-primary"
                      style={{ background: 'var(--accent-emerald)', color: '#000' }}
                    >
                      <span>Proceed to Next Lesson ({nextItem.title}) →</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Pager Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '48px', paddingTop: '24px', borderTop: '1px solid var(--border-color)', flexWrap: 'wrap', gap: '16px' }}>
        {prevItem ? (
          <button
            onClick={() => {
              setActiveItemId(prevItem.id);
              setReaderTab('concept');
              setSelectedAnswers({});
              setQuizSubmitted(false);
            }}
            className="btn btn-secondary"
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <ChevronLeft size={16} />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>PREVIOUS LESSON</div>
              <div style={{ fontSize: '0.88rem', fontWeight: 600 }}>{prevItem.title}</div>
            </div>
          </button>
        ) : <div />}

        {nextItem && (
          <button
            onClick={() => {
              if (isUnlocked(nextItem.id)) {
                setActiveItemId(nextItem.id);
                setReaderTab('concept');
                setSelectedAnswers({});
                setQuizSubmitted(false);
              }
            }}
            disabled={!isUnlocked(nextItem.id)}
            className={`btn ${isUnlocked(nextItem.id) ? 'btn-primary' : 'btn-secondary'}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              opacity: isUnlocked(nextItem.id) ? 1 : 0.5,
              cursor: isUnlocked(nextItem.id) ? 'pointer' : 'not-allowed'
            }}
          >
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                {isUnlocked(nextItem.id) ? 'NEXT LESSON' : 'LOCKED (Pass Quiz First)'}
              </div>
              <div style={{ fontSize: '0.88rem', fontWeight: 600 }}>{nextItem.title}</div>
            </div>
            {isUnlocked(nextItem.id) ? <ChevronRight size={16} /> : <Lock size={16} />}
          </button>
        )}
      </div>
    </div>
  );
};
