import React from 'react';

export type TabType = 'overview' | 'white' | 'black' | 'study' | 'puzzles';

interface BottomNavProps {
  activeTab: TabType;
  onChangeTab: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onChangeTab }) => {
  const tabs = [
    { id: 'overview' as TabType, label: 'Verdict', icon: '⚡' },
    { id: 'white' as TabType, label: 'White', icon: '♔' },
    { id: 'black' as TabType, label: 'Black', icon: '♚' },
    { id: 'study' as TabType, label: 'Study', icon: '📚' },
    { id: 'puzzles' as TabType, label: 'Puzzles', icon: '🧩' },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 bg-[#121215]/95 backdrop-blur-lg border-t border-neutral-800 z-40 pb-safe">
      <div className="max-w-2xl mx-auto px-1 flex justify-around items-center h-16">
        {tabs.map((t) => {
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => {
                onChangeTab(t.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex-1 flex flex-col items-center justify-center py-1 transition-all relative ${
                isActive
                  ? 'text-amber-400 font-bold scale-105'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              {isActive && (
                <span className="absolute -top-1 w-7 h-1 bg-gradient-to-r from-amber-500 to-amber-300 rounded-full" />
              )}
              <span className="text-lg sm:text-xl mb-0.5">{t.icon}</span>
              <span className="text-[10px] sm:text-[11px] font-medium tracking-tight">
                {t.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
