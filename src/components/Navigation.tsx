import React, { useState } from 'react';
import {
  Map,
  BookOpen,
  PlayCircle,
  Terminal,
  Activity,
  Award,
  Search,
  CheckCircle2,
  Flame,
  Zap,
  Menu,
  X,
  Sparkles,
  Lock,
  Unlock,
} from 'lucide-react';
import { useLearning } from '../context/LearningContext';
import { CURRICULUM_DATA } from '../data/curriculumData';

export const Navigation: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    activeItemId,
    setActiveItemId,
    isUnlocked,
    isCompleted,
    progress,
    godMode,
    setGodMode,
    triggerConfetti
  } = useLearning();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSource, setSelectedSource] = useState<string>('All');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const sources = [
    'All',
    'Python Crash Course',
    'Corey Schafer OOP',
    'Common-Sense DSA'
  ];

  const filteredItems = CURRICULUM_DATA.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tierName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.order.toString() === searchQuery.trim();

    const matchesSource =
      selectedSource === 'All' ||
      (selectedSource === 'Python Crash Course' && item.source.includes('Python Crash Course')) ||
      (selectedSource === 'Corey Schafer OOP' && item.source.includes('Corey Schafer')) ||
      (selectedSource === 'Common-Sense DSA' && item.source.includes('Common-Sense DSA'));

    return matchesSearch && matchesSource;
  });

  const completionPercent = Math.round(
    (progress.completedIds.length / CURRICULUM_DATA.length) * 100
  );

  return (
    <>
      {/* Top Navbar */}
      <header className="top-navbar" style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(8, 9, 11, 0.95)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border-color)',
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '64px'
      }}>
        {/* Logo Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
            className="btn btn-secondary mobile-only"
            style={{ padding: '6px', marginRight: '4px' }}
            aria-label="Toggle menu"
          >
            {isMobileSidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>

          <div
            onClick={() => setActiveTab('roadmap')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              cursor: 'pointer',
              userSelect: 'none'
            }}
          >
            <div style={{
              width: '34px',
              height: '34px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              boxShadow: '0 0 12px rgba(16, 185, 129, 0.4)'
            }}>
              <Sparkles size={18} />
            </div>
            <div>
              <div style={{ fontSize: '1rem', fontWeight: 800, letterSpacing: '-0.01em', lineHeight: 1.1 }}>
                <span style={{ color: '#ffffff' }}>NeetCode</span>
                <span style={{ color: 'var(--accent-emerald)', marginLeft: '3px' }}>Python&DSA</span>
              </div>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                Crash Course • OOP • Jay Wengrow
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav style={{ display: 'flex', gap: '4px' }} className="nav-tabs-desktop">
          <button
            className={`nav-tab-btn ${activeTab === 'roadmap' ? 'active' : ''}`}
            onClick={() => setActiveTab('roadmap')}
          >
            <Map size={16} />
            <span>Roadmap</span>
          </button>
          <button
            className={`nav-tab-btn ${activeTab === 'curriculum' ? 'active' : ''}`}
            onClick={() => setActiveTab('curriculum')}
          >
            <BookOpen size={16} />
            <span>Lessons</span>
          </button>
          <button
            className={`nav-tab-btn ${activeTab === 'visualizer' ? 'active' : ''}`}
            onClick={() => setActiveTab('visualizer')}
          >
            <PlayCircle size={16} />
            <span>Visualizer Lab</span>
          </button>
          <button
            className={`nav-tab-btn ${activeTab === 'playground' ? 'active' : ''}`}
            onClick={() => setActiveTab('playground')}
          >
            <Terminal size={16} />
            <span>Python Lab</span>
          </button>
          <button
            className={`nav-tab-btn ${activeTab === 'bigo' ? 'active' : ''}`}
            onClick={() => setActiveTab('bigo')}
          >
            <Activity size={16} />
            <span>Big-O Lab</span>
          </button>
          <button
            className={`nav-tab-btn ${activeTab === 'flashcards' ? 'active' : ''}`}
            onClick={() => setActiveTab('flashcards')}
          >
            <Zap size={16} />
            <span>Flashcards</span>
          </button>
          <button
            className={`nav-tab-btn ${activeTab === 'mastery' ? 'active' : ''}`}
            onClick={() => setActiveTab('mastery')}
          >
            <Award size={16} />
            <span>Mastery</span>
          </button>
        </nav>

        {/* Right Stats & Badges */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* God Mode Indicator */}
          <button
            onClick={() => {
              setGodMode(!godMode);
              if (!godMode) triggerConfetti();
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              padding: '5px 10px',
              borderRadius: '20px',
              fontSize: '0.72rem',
              fontWeight: 700,
              background: godMode ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255,255,255,0.05)',
              border: godMode ? '1px solid #10b981' : '1px solid var(--border-color)',
              color: godMode ? 'var(--accent-emerald)' : 'var(--text-muted)',
              cursor: 'pointer'
            }}
            title={godMode ? 'God Mode Active: All 28 chapters unlocked' : 'Progressive Lock Active: Complete quizzes to unlock'}
          >
            {godMode ? <Unlock size={12} /> : <Lock size={12} />}
            <span>{godMode ? 'UNLOCKED' : 'GAME LOCK'}</span>
          </button>

          {/* Streak */}
          <div className="stat-pill" title="Daily Learning Streak" style={{ color: 'var(--accent-amber)' }}>
            <Flame size={14} fill="#f59e0b" />
            <span>{progress.streakDays}d</span>
          </div>

          {/* XP */}
          <div className="stat-pill" title="Experience Points" style={{ color: 'var(--accent-indigo-light)' }}>
            <Zap size={14} fill="#818cf8" />
            <span>{progress.xp} XP</span>
          </div>

          {/* Progress */}
          <div
            className="stat-pill"
            title="Curriculum Progress"
            style={{
              background: 'rgba(16, 185, 129, 0.12)',
              borderColor: 'rgba(16, 185, 129, 0.35)',
              color: 'var(--accent-emerald)',
            }}
          >
            <CheckCircle2 size={14} />
            <span>{completionPercent}%</span>
          </div>
        </div>
      </header>

      {/* Sidebar when in Curriculum/Lessons view */}
      {activeTab === 'curriculum' && (
        <aside className={`sidebar ${isMobileSidebarOpen ? 'open' : ''}`}>
          <div className="sidebar-header">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-secondary)', letterSpacing: '0.05em' }}>
                CURRICULUM TREE
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', fontWeight: 700 }}>
                {progress.completedIds.length} / {CURRICULUM_DATA.length} Done
              </span>
            </div>

            {/* Search Input */}
            <div className="sidebar-search">
              <Search className="sidebar-search-icon" size={14} />
              <input
                type="text"
                placeholder="Search 28 modules..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Source Filter Pills */}
          <div className="chapter-category-filters" style={{ padding: '0 12px 10px', display: 'flex', gap: '4px', overflowX: 'auto' }}>
            {sources.map((src) => (
              <button
                key={src}
                className={`category-filter-btn ${selectedSource === src ? 'active' : ''}`}
                onClick={() => setSelectedSource(src)}
                style={{ fontSize: '0.7rem', padding: '4px 8px', whiteSpace: 'nowrap' }}
              >
                {src}
              </button>
            ))}
          </div>

          {/* Chapters List */}
          <div className="sidebar-chapters-list">
            {filteredItems.map((item) => {
              const completed = isCompleted(item.id);
              const unlocked = isUnlocked(item.id);
              const isActive = item.id === activeItemId;

              return (
                <button
                  key={item.id}
                  className={`chapter-nav-item ${isActive ? 'active' : ''}`}
                  disabled={!unlocked}
                  style={{
                    opacity: unlocked ? 1 : 0.45,
                    cursor: unlocked ? 'pointer' : 'not-allowed',
                    borderLeft: isActive ? '3px solid var(--accent-emerald)' : '3px solid transparent'
                  }}
                  onClick={() => {
                    if (unlocked) {
                      setActiveItemId(item.id);
                      setIsMobileSidebarOpen(false);
                    }
                  }}
                >
                  <div className="chapter-num-badge">
                    {completed ? (
                      <CheckCircle2 size={16} color="var(--accent-emerald)" />
                    ) : unlocked ? (
                      item.order
                    ) : (
                      <Lock size={13} color="var(--text-muted)" />
                    )}
                  </div>
                  <div className="chapter-nav-meta">
                    <span className="chapter-nav-title" style={{ fontSize: '0.85rem' }}>{item.title}</span>
                    <div className="chapter-nav-subtitle">
                      <span>{item.estimatedMinutes}m</span>
                      <span>•</span>
                      <span className="chapter-nav-badge">{item.tierName.split('.')[1]?.trim() || item.tierName}</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </aside>
      )}
    </>
  );
};
