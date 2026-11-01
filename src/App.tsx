import React, { useState } from 'react';
import { Header } from './components/Header';
import { BottomNav, TabType } from './components/BottomNav';
import { OverviewView } from './components/OverviewView';
import { ColorRepertoireView } from './components/ColorRepertoireView';
import { StudyPlanView } from './components/StudyPlanView';
import { PuzzleView } from './components/PuzzleView';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  return (
    <div className="min-h-screen bg-[#09090b] text-neutral-100 flex flex-col justify-between selection:bg-amber-500/30 pb-20">
      <div>
        <Header />

        <main className="animate-fadeIn">
          {activeTab === 'overview' && (
            <OverviewView onSelectTab={(tab) => setActiveTab(tab)} />
          )}

          {activeTab === 'white' && (
            <ColorRepertoireView color="white" />
          )}

          {activeTab === 'black' && (
            <ColorRepertoireView color="black" />
          )}

          {activeTab === 'study' && (
            <StudyPlanView />
          )}

          {activeTab === 'puzzles' && (
            <PuzzleView />
          )}
        </main>
      </div>

      <Footer />

      <BottomNav
        activeTab={activeTab}
        onChangeTab={(tab) => setActiveTab(tab)}
      />
    </div>
  );
};

export default App;
