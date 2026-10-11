import React, { useState } from 'react';
import {
  Lock,
  Unlock,
  CheckCircle2,
  Play,
  Zap,
  Sparkles,
  Search,
  ChevronRight,
  ShieldAlert,
  Flame,
  GraduationCap
} from 'lucide-react';
import { useLearning } from '../context/LearningContext';
import { CURRICULUM_DATA, type CurriculumItem } from '../data/curriculumData';

interface TierMeta {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  color: string;
  badge: string;
  icon: string;
  filterTag: string;
}

const TIERS_META: TierMeta[] = [
  {
    id: 'tier-1',
    number: 1,
    title: 'Python Core Syntax & Data Types',
    subtitle: 'Python Crash Course 3rd Edition (Eric Matthes) • Ch 1-4',
    color: '#10b981',
    badge: 'Python Basics',
    icon: '🐍',
    filterTag: 'Python Basics',
  },
  {
    id: 'tier-2',
    number: 2,
    title: 'Control Flow, Dictionaries & Functions',
    subtitle: 'Python Crash Course 3rd Edition (Eric Matthes) • Ch 5-8',
    color: '#06b6d4',
    badge: 'Python Logic',
    icon: '⚙️',
    filterTag: 'Python Basics',
  },
  {
    id: 'tier-3',
    number: 3,
    title: 'Object-Oriented Programming (OOP) Deep-Dive',
    subtitle: 'Corey Schafer OOP Masterclass & Python Crash Course Ch 9',
    color: '#6366f1',
    badge: 'Corey Schafer OOP',
    icon: '🧱',
    filterTag: 'Corey Schafer OOP',
  },
  {
    id: 'tier-4',
    number: 4,
    title: 'Files, Exceptions, Unit Testing & Projects',
    subtitle: 'Python Crash Course 3rd Edition (Eric Matthes) • Ch 10-14',
    color: '#8b5cf6',
    badge: 'Python Pro & Pygame',
    icon: '🛡️',
    filterTag: 'Python Basics',
  },
  {
    id: 'tier-5',
    number: 5,
    title: 'DSA Foundations & Big-O Speed Analysis',
    subtitle: "Jay Wengrow's Common-Sense Guide to DSA (Vol 1) • Ch 1-3",
    color: '#ec4899',
    badge: 'DSA Foundations',
    icon: '📊',
    filterTag: 'DSA Foundations',
  },
  {
    id: 'tier-6',
    number: 6,
    title: 'Sorting Arena & Hash Table Speed',
    subtitle: "Jay Wengrow's Common-Sense Guide to DSA (Vol 1) • Ch 4-9",
    color: '#f59e0b',
    badge: 'Sorting & Hashing',
    icon: '⚡',
    filterTag: 'Sorting & Hashing',
  },
  {
    id: 'tier-7',
    number: 7,
    title: 'Recursion, Linked Lists & Dynamic Programming',
    subtitle: "Jay Wengrow's Common-Sense Guide to DSA (Vol 1) • Ch 10-14",
    color: '#3b82f6',
    badge: 'Recursion & DP',
    icon: '🌀',
    filterTag: 'Recursion & DP',
  },
  {
    id: 'tier-8',
    number: 8,
    title: 'Hierarchies, Graphs & System Optimization',
    subtitle: "Jay Wengrow's Common-Sense Guide to DSA (Vol 1) • Ch 15-20",
    color: '#14b8a6',
    badge: 'Trees, Graphs & BCR',
    icon: '🌳',
    filterTag: 'Trees & Graphs',
  },
];

export const RoadmapView: React.FC = () => {
  const {
    activeItemId,
    setActiveItemId,
    setActiveTab,
    setActiveVisualizerType,
    isUnlocked,
    isCompleted,
    progress,
    godMode,
    setGodMode,
    triggerConfetti,
  } = useLearning();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');

  // Filter tags
  const tags = [
    'All',
    'Python Basics',
    'Corey Schafer OOP',
    'DSA Foundations',
    'Sorting & Hashing',
    'Recursion & DP',
    'Trees & Graphs',
  ];

  // Group items by tier
  const getItemsForTier = (tierIndex: number): CurriculumItem[] => {
    switch (tierIndex) {
      case 0:
        return CURRICULUM_DATA.filter((item) => item.id === 'pcc-1' || item.id === 'pcc-2');
      case 1:
        return CURRICULUM_DATA.filter((item) => item.id === 'pcc-3' || item.id === 'pcc-4');
      case 2:
        return CURRICULUM_DATA.filter((item) => item.id.startsWith('oop-'));
      case 3:
        return CURRICULUM_DATA.filter((item) => item.id === 'pcc-5' || item.id === 'pcc-6');
      case 4:
        return CURRICULUM_DATA.filter((item) => ['dsa-1', 'dsa-2', 'dsa-3'].includes(item.id));
      case 5:
        return CURRICULUM_DATA.filter((item) => ['dsa-4', 'dsa-5', 'dsa-6', 'dsa-7', 'dsa-8', 'dsa-9'].includes(item.id));
      case 6:
        return CURRICULUM_DATA.filter((item) => ['dsa-10', 'dsa-11', 'dsa-12', 'dsa-13', 'dsa-14'].includes(item.id));
      case 7:
        return CURRICULUM_DATA.filter((item) => ['dsa-15', 'dsa-16', 'dsa-17', 'dsa-18', 'dsa-19', 'dsa-20'].includes(item.id));
      default:
        return [];
    }
  };

  const handleOpenNode = (item: CurriculumItem) => {
    if (!isUnlocked(item.id)) return;
    setActiveItemId(item.id);
    setActiveTab('curriculum');
  };

  const handleLaunchVisualizer = (e: React.MouseEvent, item: CurriculumItem) => {
    e.stopPropagation();
    if (!isUnlocked(item.id) || !item.visualizerType) return;
    setActiveVisualizerType(item.visualizerType);
    setActiveTab('visualizer');
  };

  const completedCount = progress.completedIds.length;
  const totalCount = CURRICULUM_DATA.length;
  const completionPercentage = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="roadmap-container" style={{ maxWidth: '1200px', margin: '0 auto', paddingBottom: '80px' }}>
      {/* NeetCode Style Top Hero Banner */}
      <div className="roadmap-hero-card" style={{
        background: 'linear-gradient(180deg, rgba(16, 185, 129, 0.08) 0%, rgba(13, 17, 23, 0.95) 100%)',
        border: '1px solid rgba(16, 185, 129, 0.25)',
        borderRadius: '16px',
        padding: '32px',
        marginBottom: '32px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '220px', height: '220px', background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span className="tag-pill emerald" style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.05em' }}>
                <Sparkles size={13} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                PROGRESSIVE LEARNING TREE
              </span>
              <span className="tag-pill indigo" style={{ fontSize: '0.75rem' }}>
                NeetCode.io Standard
              </span>
            </div>
            <h1 style={{ fontSize: '2.4rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', marginBottom: '8px' }}>
              Python + OOP + DSA Interactive Roadmap
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '780px', lineHeight: 1.5 }}>
              Master foundational Python (<em>Python Crash Course 3rd Ed</em>), Object-Oriented architecture (<em>Corey Schafer Masterclass</em>), and every chapter of <em>A Common-Sense Guide to Data Structures and Algorithms</em>. Complete each lesson's interactive challenges to unlock the next node!
            </p>
          </div>

          {/* Quick Stats Widget */}
          <div style={{
            display: 'flex',
            gap: '16px',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            padding: '16px 20px',
            borderRadius: '12px',
            alignItems: 'center'
          }}>
            <div style={{ textAlign: 'center', minWidth: '70px' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>
                {completedCount}/{totalCount}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                Completed
              </div>
            </div>

            <div style={{ width: '1px', height: '36px', background: 'var(--border-color)' }} />

            <div style={{ textAlign: 'center', minWidth: '70px' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-amber)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                <Flame size={18} fill="#f59e0b" />
                {progress.streakDays}d
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                Streak
              </div>
            </div>

            <div style={{ width: '1px', height: '36px', background: 'var(--border-color)' }} />

            <div style={{ textAlign: 'center', minWidth: '70px' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-indigo-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                <Zap size={18} fill="#818cf8" />
                {progress.xp}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                Total XP
              </div>
            </div>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div style={{ marginTop: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '8px', color: 'var(--text-secondary)' }}>
            <span>Overall Roadmap Progress</span>
            <span style={{ color: 'var(--accent-emerald)', fontWeight: 700 }}>{completionPercentage}% Complete ({completedCount} of {totalCount} lessons)</span>
          </div>
          <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.06)', borderRadius: '999px', overflow: 'hidden' }}>
            <div style={{
              width: `${completionPercentage}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #10b981, #06b6d4)',
              borderRadius: '999px',
              transition: 'width 0.4s ease'
            }} />
          </div>
        </div>

        {/* God Mode Developer Toggle */}
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <ShieldAlert size={16} color={godMode ? '#10b981' : '#64748b'} />
            <span>Developer Mode:</span>
            <button
              onClick={() => {
                setGodMode(!godMode);
                if (!godMode) triggerConfetti();
              }}
              style={{
                background: godMode ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255,255,255,0.06)',
                border: godMode ? '1px solid #10b981' : '1px solid var(--border-color)',
                color: godMode ? '#10b981' : 'var(--text-secondary)',
                padding: '4px 12px',
                borderRadius: '6px',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {godMode ? '🔓 God Mode Active (All Unlocked)' : '🔒 Progressive Game Locked'}
            </button>
            <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>
              {godMode ? '(All 28 nodes unlocked for free testing)' : '(Complete quizzes/tasks to unlock next node)'}
            </span>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '28px' }}>
        {/* Category Pills */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className="btn"
              style={{
                background: selectedTag === tag ? 'var(--accent-emerald)' : 'var(--bg-secondary)',
                color: selectedTag === tag ? '#000000' : 'var(--text-secondary)',
                border: selectedTag === tag ? '1px solid var(--accent-emerald)' : '1px solid var(--border-color)',
                borderRadius: '20px',
                padding: '6px 16px',
                fontSize: '0.85rem',
                fontWeight: selectedTag === tag ? 700 : 500,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Search */}
        <div style={{ position: 'relative', width: '280px' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search lessons & algorithms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              color: '#ffffff',
              borderRadius: '8px',
              padding: '8px 12px 8px 36px',
              fontSize: '0.85rem',
              outline: 'none'
            }}
          />
        </div>
      </div>

      {/* Tiers List */}
      <div className="roadmap-tiers-stack" style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
        {TIERS_META.map((tierMeta, tierIndex) => {
          const tierItems = getItemsForTier(tierIndex);

          // Filter by search and category
          const filteredItems = tierItems.filter((item) => {
            const matchesSearch =
              !searchQuery ||
              item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
              item.keyConcepts.some((kc) => kc.heading.toLowerCase().includes(searchQuery.toLowerCase()));

            const matchesTag =
              selectedTag === 'All' ||
              tierMeta.filterTag === selectedTag ||
              (selectedTag === 'Python Basics' && item.source.includes('Python Crash Course')) ||
              (selectedTag === 'Corey Schafer OOP' && item.source.includes('Corey Schafer')) ||
              (selectedTag === 'DSA Foundations' && item.id.startsWith('dsa-') && ['dsa-1', 'dsa-2', 'dsa-3'].includes(item.id));

            return matchesSearch && matchesTag;
          });

          if (filteredItems.length === 0) return null;

          const tierCompletedCount = tierItems.filter((item) => isCompleted(item.id)).length;
          const tierTotalCount = tierItems.length;
          const tierPct = Math.round((tierCompletedCount / tierTotalCount) * 100);

          return (
            <div
              key={tierMeta.id}
              className="roadmap-tier-section"
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: '16px',
                padding: '24px 28px',
                position: 'relative'
              }}
            >
              {/* Tier Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    background: `${tierMeta.color}18`,
                    border: `1px solid ${tierMeta.color}40`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.4rem'
                  }}>
                    {tierMeta.icon}
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: tierMeta.color, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Tier {tierMeta.number}
                      </span>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>•</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                        {tierMeta.badge}
                      </span>
                    </div>
                    <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#ffffff', margin: '2px 0 0 0' }}>
                      {tierMeta.title}
                    </h2>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {tierMeta.subtitle}
                    </div>
                  </div>
                </div>

                {/* Tier Progress */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '120px', height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '999px', overflow: 'hidden' }}>
                    <div style={{ width: `${tierPct}%`, height: '100%', background: tierMeta.color, borderRadius: '999px' }} />
                  </div>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: tierPct === 100 ? 'var(--accent-emerald)' : 'var(--text-secondary)' }}>
                    {tierCompletedCount}/{tierTotalCount} ({tierPct}%)
                  </span>
                </div>
              </div>

              {/* Tier Cards Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '16px'
              }}>
                {filteredItems.map((item) => {
                  const unlocked = isUnlocked(item.id);
                  const completed = isCompleted(item.id);
                  const isCurrent = item.id === activeItemId;
                  const quizScore = progress.quizScores[item.id];

                  return (
                    <div
                      key={item.id}
                      onClick={() => handleOpenNode(item)}
                      style={{
                        background: completed
                          ? 'rgba(16, 185, 129, 0.04)'
                          : unlocked
                          ? 'var(--bg-tertiary)'
                          : 'rgba(15, 23, 42, 0.4)',
                        border: isCurrent
                          ? '2px solid var(--accent-emerald)'
                          : completed
                          ? '1px solid rgba(16, 185, 129, 0.35)'
                          : unlocked
                          ? '1px solid var(--border-color)'
                          : '1px dashed rgba(255,255,255,0.1)',
                        borderRadius: '12px',
                        padding: '18px 20px',
                        cursor: unlocked ? 'pointer' : 'not-allowed',
                        position: 'relative',
                        transition: 'all 0.2s ease',
                        boxShadow: isCurrent ? '0 0 20px rgba(16, 185, 129, 0.15)' : 'none',
                        opacity: unlocked ? 1 : 0.65,
                      }}
                      className={unlocked ? 'roadmap-card-hover' : ''}
                    >
                      {/* Top Header Row of Card */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            padding: '2px 8px',
                            borderRadius: '4px',
                            background: item.difficulty === 'Easy' ? 'rgba(16, 185, 129, 0.15)' : item.difficulty === 'Medium' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                            color: item.difficulty === 'Easy' ? 'var(--accent-emerald)' : item.difficulty === 'Medium' ? 'var(--accent-amber)' : 'var(--accent-rose)',
                          }}>
                            {item.difficulty}
                          </span>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            {item.estimatedMinutes} min
                          </span>
                        </div>

                        {/* Status Icon */}
                        <div>
                          {completed ? (
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--accent-emerald)', fontSize: '0.75rem', fontWeight: 600 }}>
                              <CheckCircle2 size={16} fill="rgba(16, 185, 129, 0.2)" />
                              {quizScore ? `${quizScore}%` : 'Done'}
                            </span>
                          ) : unlocked ? (
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--accent-indigo-light)', fontSize: '0.75rem', fontWeight: 600 }}>
                              <Unlock size={14} />
                              Available
                            </span>
                          ) : (
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                              <Lock size={14} />
                              Locked
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Card Title & Subtitle */}
                      <h3 style={{
                        fontSize: '1.05rem',
                        fontWeight: 700,
                        color: unlocked ? '#ffffff' : 'var(--text-secondary)',
                        marginBottom: '6px',
                        lineHeight: 1.3
                      }}>
                        {item.title}
                      </h3>
                      <p style={{
                        fontSize: '0.82rem',
                        color: 'var(--text-muted)',
                        marginBottom: '14px',
                        lineHeight: 1.4,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>
                        {item.subtitle}
                      </p>

                      {/* Source tag & Visualizer Badge */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <GraduationCap size={13} />
                          {item.source.split('(')[0]}
                        </span>

                        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                          {item.visualizerType && (
                            <button
                              onClick={(e) => handleLaunchVisualizer(e, item)}
                              disabled={!unlocked}
                              style={{
                                background: 'rgba(6, 182, 212, 0.15)',
                                border: '1px solid rgba(6, 182, 212, 0.3)',
                                color: 'var(--accent-cyan)',
                                padding: '3px 8px',
                                borderRadius: '6px',
                                fontSize: '0.72rem',
                                fontWeight: 600,
                                cursor: unlocked ? 'pointer' : 'not-allowed',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px'
                              }}
                              title="Launch interactive visualization"
                            >
                              <Play size={11} fill="currentColor" />
                              Visualizer
                            </button>
                          )}
                          <span style={{ color: unlocked ? 'var(--accent-emerald)' : 'var(--text-muted)' }}>
                            <ChevronRight size={16} />
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
