import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CURRICULUM_DATA, type CurriculumItem } from '../data/curriculumData';
import { BADGES_DATA, type Badge } from '../data/badgesData';

export type AppTab = 'roadmap' | 'curriculum' | 'visualizer' | 'playground' | 'bigo' | 'flashcards' | 'mastery';

interface UserProgress {
  completedIds: string[];
  unlockedIds: string[];
  quizScores: Record<string, number>;
  flashcardsMastered: string[];
  visualizerInteractions: number;
  codeRuns: number;
  xp: number;
  streakDays: number;
  lastActiveDate: string;
}

interface LearningContextType {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  activeItemId: string;
  setActiveItemId: (id: string) => void;
  currentItem: CurriculumItem;
  activeVisualizerType: string;
  setActiveVisualizerType: (type: string) => void;
  progress: UserProgress;
  isUnlocked: (itemId: string) => boolean;
  isCompleted: (itemId: string) => boolean;
  completeCurrentAndUnlockNext: (itemId: string) => void;
  recordQuizScore: (itemId: string, score: number) => void;
  toggleFlashcardMastered: (cardId: string) => void;
  incrementVisualizerInteractions: () => void;
  incrementCodeRuns: () => void;
  unlockedBadges: Badge[];
  triggerConfetti: () => void;
  resetProgress: () => void;
  godMode: boolean;
  setGodMode: (val: boolean) => void;
}

const STORAGE_KEY = 'neetcode_dsa_game_progress_v2';

const defaultProgress: UserProgress = {
  completedIds: [],
  unlockedIds: [CURRICULUM_DATA[0].id],
  quizScores: {},
  flashcardsMastered: [],
  visualizerInteractions: 0,
  codeRuns: 0,
  xp: 100,
  streakDays: 1,
  lastActiveDate: new Date().toISOString().split('T')[0],
};

const LearningContext = createContext<LearningContextType | undefined>(undefined);

export const LearningProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<AppTab>('roadmap');
  const [activeItemId, setActiveItemId] = useState<string>(CURRICULUM_DATA[0].id);
  const [activeVisualizerType, setActiveVisualizerType] = useState<string>('binarySearch');
  const [godMode, setGodMode] = useState<boolean>(false);

  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...defaultProgress,
          ...parsed,
          unlockedIds: Array.from(new Set([CURRICULUM_DATA[0].id, ...(parsed.unlockedIds || [])])),
        };
      }
    } catch {
      // Fallback
    }
    return defaultProgress;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // Ignore
    }
  }, [progress]);

  const currentItem =
    CURRICULUM_DATA.find((item) => item.id === activeItemId) || CURRICULUM_DATA[0];

  const isUnlocked = (itemId: string): boolean => {
    if (godMode) return true;
    return progress.unlockedIds.includes(itemId);
  };

  const isCompleted = (itemId: string): boolean => {
    return progress.completedIds.includes(itemId);
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#10b981', '#06b6d4', '#6366f1', '#f59e0b', '#22c55e'],
    });
  };

  const completeCurrentAndUnlockNext = (itemId: string) => {
    const currentIndex = CURRICULUM_DATA.findIndex((item) => item.id === itemId);
    const nextItem = currentIndex < CURRICULUM_DATA.length - 1 ? CURRICULUM_DATA[currentIndex + 1] : null;

    setProgress((prev) => {
      const newCompleted = prev.completedIds.includes(itemId)
        ? prev.completedIds
        : [...prev.completedIds, itemId];

      const newUnlocked = nextItem && !prev.unlockedIds.includes(nextItem.id)
        ? [...prev.unlockedIds, nextItem.id]
        : prev.unlockedIds;

      return {
        ...prev,
        completedIds: newCompleted,
        unlockedIds: newUnlocked,
        xp: prev.xp + 150,
      };
    });

    triggerConfetti();
  };

  const recordQuizScore = (itemId: string, score: number) => {
    setProgress((prev) => ({
      ...prev,
      quizScores: {
        ...prev.quizScores,
        [itemId]: score,
      },
      xp: prev.xp + Math.round(score * 1.5),
    }));

    if (score >= 80) {
      completeCurrentAndUnlockNext(itemId);
    }
  };

  const toggleFlashcardMastered = (cardId: string) => {
    setProgress((prev) => {
      const exists = prev.flashcardsMastered.includes(cardId);
      const updated = exists
        ? prev.flashcardsMastered.filter((id) => id !== cardId)
        : [...prev.flashcardsMastered, cardId];
      return {
        ...prev,
        flashcardsMastered: updated,
        xp: prev.xp + (exists ? -10 : 25),
      };
    });
  };

  const incrementVisualizerInteractions = () => {
    setProgress((prev) => ({
      ...prev,
      visualizerInteractions: prev.visualizerInteractions + 1,
      xp: prev.xp + 5,
    }));
  };

  const incrementCodeRuns = () => {
    setProgress((prev) => ({
      ...prev,
      codeRuns: prev.codeRuns + 1,
      xp: prev.xp + 10,
    }));
  };

  const resetProgress = () => {
    setProgress(defaultProgress);
    localStorage.removeItem(STORAGE_KEY);
  };

  const unlockedBadges = BADGES_DATA.filter((badge) =>
    badge.unlockedCondition({
      completedChapters: progress.completedIds.map((_, i) => i + 1),
      quizScores: progress.quizScores,
      flashcardsMastered: progress.flashcardsMastered.length,
      visualizerInteractions: progress.visualizerInteractions,
      codeRuns: progress.codeRuns,
    })
  );

  return (
    <LearningContext.Provider
      value={{
        activeTab,
        setActiveTab,
        activeItemId,
        setActiveItemId,
        currentItem,
        activeVisualizerType,
        setActiveVisualizerType,
        progress,
        isUnlocked,
        isCompleted,
        completeCurrentAndUnlockNext,
        recordQuizScore,
        toggleFlashcardMastered,
        incrementVisualizerInteractions,
        incrementCodeRuns,
        unlockedBadges,
        triggerConfetti,
        resetProgress,
        godMode,
        setGodMode,
      }}
    >
      {children}
    </LearningContext.Provider>
  );
};

export const useLearning = () => {
  const context = useContext(LearningContext);
  if (!context) {
    throw new Error('useLearning must be used within a LearningProvider');
  }
  return context;
};
