import React, { useState } from 'react';
import {
  Award,
  Zap,
  Flame,
  CheckCircle2,
  Lock,
  BookOpen,
  Sparkles,
} from 'lucide-react';
import { useLearning } from '../context/LearningContext';
import { CURRICULUM_DATA } from '../data/curriculumData';
import { BADGES_DATA } from '../data/badgesData';

export const MasteryDashboard: React.FC = () => {
  const {
    progress,
    unlockedBadges,
    setActiveItemId,
    setActiveTab,
    resetProgress,
    triggerConfetti,
    isUnlocked,
    isCompleted,
  } = useLearning();

  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const completedCount = progress.completedIds.length;
  const totalItems = CURRICULUM_DATA.length;
  const percentage = Math.round((completedCount / totalItems) * 100);

  const handleJumpToItem = (id: string) => {
    setActiveItemId(id);
    setActiveTab('curriculum');
  };

  return (
    <div className="mastery-dashboard-view" style={{ maxWidth: '1100px', margin: '0 auto', paddingBottom: '80px' }}>
      {/* Header */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-emerald)', marginBottom: '6px' }}>
          <Award size={20} />
          <span style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Gamified Mastery & Progress
          </span>
        </div>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#ffffff', marginBottom: '8px' }}>
          Mastery Dashboard
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.5 }}>
          Track your progressive journey across <strong>Python Crash Course</strong>, <strong>Corey Schafer OOP</strong>, and <strong>Jay Wengrow's Common-Sense DSA</strong>.
        </p>
      </div>

      {/* Progress Overview Hero Card */}
      <div style={{
        background: 'linear-gradient(180deg, rgba(16, 185, 129, 0.08) 0%, rgba(13, 17, 23, 0.95) 100%)',
        border: '1px solid rgba(16, 185, 129, 0.25)',
        borderRadius: '16px',
        padding: '28px 32px',
        marginBottom: '32px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', marginBottom: '20px' }}>
          <div>
            <span style={{ fontSize: '0.85rem', color: 'var(--accent-emerald)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              OVERALL ROADMAP COMPLETION
            </span>
            <h2 style={{ fontSize: '2.6rem', fontWeight: 800, color: '#ffffff', marginTop: '4px', letterSpacing: '-0.02em' }}>
              {percentage}% Mastered
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>
              {completedCount} of {totalItems} Curriculum Nodes Completed
            </p>
          </div>

          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <div style={{ padding: '14px 20px', borderRadius: '12px', background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.3)', textAlign: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', color: 'var(--accent-indigo-light)' }}>
                <Zap size={16} />
                <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>XP EARNED</span>
              </div>
              <strong style={{ fontSize: '1.4rem', color: '#ffffff', display: 'block', marginTop: '4px' }}>
                {progress.xp} XP
              </strong>
            </div>

            <div style={{ padding: '14px 20px', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)', textAlign: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', color: 'var(--accent-amber)' }}>
                <Flame size={16} />
                <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>DAILY STREAK</span>
              </div>
              <strong style={{ fontSize: '1.4rem', color: '#ffffff', display: 'block', marginTop: '4px' }}>
                {progress.streakDays} Days
              </strong>
            </div>

            <div style={{ padding: '14px 20px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', textAlign: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', color: 'var(--accent-emerald)' }}>
                <Award size={16} />
                <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>BADGES</span>
              </div>
              <strong style={{ fontSize: '1.4rem', color: '#ffffff', display: 'block', marginTop: '4px' }}>
                {unlockedBadges.length} / {BADGES_DATA.length}
              </strong>
            </div>
          </div>
        </div>

        {/* Big Progress Bar */}
        <div style={{ width: '100%', height: '10px', borderRadius: '999px', background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
          <div
            style={{
              width: `${percentage}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #10b981, #06b6d4)',
              borderRadius: '999px',
              transition: 'width 0.4s ease',
              boxShadow: '0 0 15px rgba(16, 185, 129, 0.5)',
            }}
          />
        </div>
      </div>

      {/* Achievement Badges Showcase */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#ffffff' }}>Achievement Badges</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
              Unlock trophies as you conquer lessons, pass active recall quizzes, and experiment in the playground.
            </p>
          </div>
          <button className="btn btn-secondary" style={{ padding: '6px 14px', fontSize: '0.82rem' }} onClick={triggerConfetti}>
            <Sparkles size={14} color="var(--accent-amber)" /> Celebrate
          </button>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '14px'
        }}>
          {BADGES_DATA.map((badge) => {
            const isBadgeUnlocked = unlockedBadges.some((b) => b.id === badge.id);

            return (
              <div
                key={badge.id}
                style={{
                  background: isBadgeUnlocked ? 'rgba(16, 185, 129, 0.05)' : 'var(--bg-secondary)',
                  border: isBadgeUnlocked ? '1px solid rgba(16, 185, 129, 0.35)' : '1px solid var(--border-color)',
                  borderRadius: '12px',
                  padding: '16px',
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'flex-start',
                  opacity: isBadgeUnlocked ? 1 : 0.6
                }}
              >
                <div style={{
                  fontSize: '1.6rem',
                  background: 'var(--bg-tertiary)',
                  width: '42px',
                  height: '42px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  {badge.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <strong style={{ color: '#ffffff', fontSize: '0.9rem' }}>{badge.title}</strong>
                    {!isBadgeUnlocked && <Lock size={12} color="var(--text-muted)" />}
                  </div>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: '4px 0 6px 0', lineHeight: 1.4 }}>
                    {badge.description}
                  </p>
                  <span style={{ fontSize: '0.7rem', color: isBadgeUnlocked ? 'var(--accent-emerald)' : 'var(--text-muted)', fontWeight: 600 }}>
                    {isBadgeUnlocked ? '✓ Unlocked' : `Req: ${badge.requirement}`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 28-Node Syllabus Completion Checklist */}
      <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '24px 28px', marginBottom: '32px' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#ffffff', marginBottom: '16px' }}>
          Complete 28-Lesson Curriculum Matrix
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {CURRICULUM_DATA.map((item) => {
            const completed = isCompleted(item.id);
            const unlocked = isUnlocked(item.id);
            const quizScore = progress.quizScores[item.id];

            return (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 18px',
                  borderRadius: '8px',
                  background: completed ? 'rgba(16, 185, 129, 0.05)' : 'var(--bg-tertiary)',
                  border: `1px solid ${completed ? 'rgba(16, 185, 129, 0.25)' : 'var(--border-color)'}`,
                  flexWrap: 'wrap',
                  gap: '12px',
                  opacity: unlocked ? 1 : 0.5
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '6px',
                      background: completed ? 'var(--accent-emerald)' : 'rgba(255,255,255,0.06)',
                      color: completed ? '#000000' : '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                    }}
                  >
                    {completed ? <CheckCircle2 size={16} /> : unlocked ? item.order : <Lock size={12} />}
                  </div>
                  <div>
                    <strong style={{ color: '#ffffff', fontSize: '0.92rem' }}>
                      {item.order}. {item.title}
                    </strong>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {item.source.split('(')[0]} • {item.estimatedMinutes} min read
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  {quizScore !== undefined && (
                    <span style={{ fontSize: '0.8rem', color: quizScore >= 80 ? 'var(--accent-emerald)' : 'var(--accent-amber)', fontWeight: 700 }}>
                      Quiz: {quizScore}%
                    </span>
                  )}
                  <button
                    className="btn btn-secondary"
                    disabled={!unlocked}
                    style={{ padding: '5px 12px', fontSize: '0.75rem', cursor: unlocked ? 'pointer' : 'not-allowed' }}
                    onClick={() => handleJumpToItem(item.id)}
                  >
                    <BookOpen size={12} />
                    <span>{completed ? 'Review' : unlocked ? 'Open Lesson' : 'Locked 🔒'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reset Progress Section */}
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        {!showResetConfirm ? (
          <button
            onClick={() => setShowResetConfirm(true)}
            style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            Reset All Course Progress
          </button>
        ) : (
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', padding: '12px 20px', borderRadius: '8px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
            <span style={{ fontSize: '0.85rem', color: '#ffe4e6' }}>
              Are you sure? This will reset all your XP, badges, and unlock status.
            </span>
            <button
              className="btn btn-primary"
              style={{ background: 'var(--accent-rose)', padding: '4px 12px', fontSize: '0.8rem' }}
              onClick={() => {
                resetProgress();
                setShowResetConfirm(false);
              }}
            >
              Yes, Reset
            </button>
            <button
              className="btn btn-secondary"
              style={{ padding: '4px 12px', fontSize: '0.8rem' }}
              onClick={() => setShowResetConfirm(false)}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
