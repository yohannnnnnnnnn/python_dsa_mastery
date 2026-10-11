import React from 'react';
import { LearningProvider, useLearning } from './context/LearningContext';
import { Navigation } from './components/Navigation';
import { RoadmapView } from './components/RoadmapView';
import { ChapterReader } from './components/ChapterReader';
import { VisualizerLab } from './components/VisualizerLab';
import { CodePlayground } from './components/CodePlayground';
import { BigOLab } from './components/BigOLab';
import { FlashcardsView } from './components/FlashcardsView';
import { MasteryDashboard } from './components/MasteryDashboard';

const AppContent: React.FC = () => {
  const { activeTab } = useLearning();

  return (
    <div className="app-shell" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <Navigation />
      <div className="app-container" style={{ flex: 1, padding: '24px' }}>
        <main className="main-content" style={{ width: '100%' }}>
          {activeTab === 'roadmap' && <RoadmapView />}
          {activeTab === 'curriculum' && <ChapterReader />}
          {activeTab === 'visualizer' && <VisualizerLab />}
          {activeTab === 'playground' && <CodePlayground />}
          {activeTab === 'bigo' && <BigOLab />}
          {activeTab === 'flashcards' && <FlashcardsView />}
          {activeTab === 'mastery' && <MasteryDashboard />}
        </main>
      </div>
    </div>
  );
};

export function App() {
  return (
    <LearningProvider>
      <AppContent />
    </LearningProvider>
  );
}

export default App;
