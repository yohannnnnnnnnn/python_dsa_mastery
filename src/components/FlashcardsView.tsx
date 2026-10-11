import React, { useState } from 'react';
import { Zap, RotateCw, CheckCircle2, XCircle, Shuffle, Lightbulb, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLearning } from '../context/LearningContext';
import { FLASHCARDS_DATA, type Flashcard } from '../data/flashcardsData';

export const FlashcardsView: React.FC = () => {
  const { progress, toggleFlashcardMastered, triggerConfetti } = useLearning();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);

  const categories = [
    'All',
    'Basics',
    'Big O',
    'Sorting',
    'Hash & Stacks',
    'Recursion & DP',
    'Trees & Heaps',
    'Graphs & Optimization',
  ];

  const filteredCards = FLASHCARDS_DATA.filter(
    (card) => selectedCategory === 'All' || card.category === selectedCategory
  );

  const currentCard: Flashcard | undefined = filteredCards[currentCardIndex];
  const isMastered = currentCard ? progress.flashcardsMastered.includes(currentCard.id) : false;

  const handleNext = () => {
    setIsFlipped(false);
    setShowHint(false);
    setCurrentCardIndex((prev) => (prev + 1) % filteredCards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setShowHint(false);
    setCurrentCardIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
  };

  const handleMarkMastered = () => {
    if (!currentCard) return;
    if (!isMastered) {
      triggerConfetti();
    }
    toggleFlashcardMastered(currentCard.id);
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    setShowHint(false);
    const randomIndex = Math.floor(Math.random() * filteredCards.length);
    setCurrentCardIndex(randomIndex);
  };

  if (!currentCard) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <h2>No flashcards found for this category.</h2>
        <button className="btn btn-primary" style={{ marginTop: '16px' }} onClick={() => setSelectedCategory('All')}>
          View All Flashcards
        </button>
      </div>
    );
  }

  return (
    <div className="flashcards-view" style={{ maxWidth: '800px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '28px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--accent-indigo-light)', marginBottom: '6px' }}>
          <Zap size={20} />
          <span style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Active Recall & Spaced Repetition
          </span>
        </div>
        <h1 style={{ fontSize: '2.2rem', marginBottom: '8px' }}>Flashcard Mastery Deck</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
          Test your intuition with quick recall questions across all 20 chapters.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div
        style={{
          display: 'flex',
          gap: '6px',
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginBottom: '24px',
        }}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            className={`category-filter-btn ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => {
              setSelectedCategory(cat);
              setCurrentCardIndex(0);
              setIsFlipped(false);
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Deck Stats & Shuffler */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Card <strong>{currentCardIndex + 1}</strong> of <strong>{filteredCards.length}</strong>
        </span>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.8rem' }} onClick={handleShuffle}>
            <Shuffle size={14} />
            <span>Shuffle</span>
          </button>
          <span
            style={{
              fontSize: '0.8rem',
              fontWeight: 700,
              color: 'var(--accent-emerald)',
              background: 'rgba(16, 185, 129, 0.1)',
              padding: '6px 12px',
              borderRadius: 'var(--radius-full)',
            }}
          >
            {progress.flashcardsMastered.length} Mastered
          </span>
        </div>
      </div>

      {/* Interactive 3D Flashcard */}
      <div className="flashcard-deck">
        <div
          className="flashcard"
          onClick={() => setIsFlipped(!isFlipped)}
          style={{
            borderColor: isMastered ? 'rgba(16, 185, 129, 0.5)' : undefined,
            background: isFlipped
              ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.98) 100%)'
              : 'var(--bg-card)',
          }}
        >
          {/* Card Top Meta */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="tag-pill indigo">
              Ch {currentCard.chapterNumber}: {currentCard.category}
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <RotateCw size={12} />
              <span>Click card to flip</span>
            </span>
          </div>

          {/* Card Center Content */}
          <div style={{ margin: '30px 0', textAlign: 'center' }}>
            {!isFlipped ? (
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '12px' }}>
                  QUESTION
                </span>
                <h3 style={{ fontSize: '1.4rem', lineHeight: 1.5, color: '#fff' }}>
                  {currentCard.question}
                </h3>
              </div>
            ) : (
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--accent-emerald)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '12px' }}>
                  ANSWER & INTUITION
                </span>
                <p style={{ fontSize: '1.2rem', lineHeight: 1.6, color: '#e2e8f0' }}>
                  {currentCard.answer}
                </p>
              </div>
            )}
          </div>

          {/* Card Bottom: Hint toggle */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '16px' }}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowHint(!showHint);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.8rem',
                color: showHint ? 'var(--accent-amber)' : 'var(--text-muted)',
              }}
            >
              <Lightbulb size={14} />
              <span>{showHint ? `Hint: ${currentCard.hint}` : 'Show Hint'}</span>
            </button>

            {isMastered && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--accent-emerald)', fontSize: '0.8rem', fontWeight: 700 }}>
                <CheckCircle2 size={14} /> Mastered
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Action Rating Buttons & Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <button className="btn btn-secondary" onClick={handlePrev}>
          <ChevronLeft size={16} /> Previous
        </button>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            className={`btn ${isMastered ? 'btn-secondary' : 'btn-primary'}`}
            onClick={handleMarkMastered}
          >
            {isMastered ? (
              <>
                <XCircle size={16} /> Mark as Needs Review
              </>
            ) : (
              <>
                <CheckCircle2 size={16} /> Mark as Mastered (+15 XP)
              </>
            )}
          </button>
        </div>

        <button className="btn btn-secondary" onClick={handleNext}>
          Next <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};
