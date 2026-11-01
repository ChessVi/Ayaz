import React from 'react';
import ayazData from '../data/ayazData.json';

export const Header: React.FC = () => {
  const { profile, timeframe } = ayazData;

  return (
    <header className="bg-[#121215] border-b border-neutral-800/80 sticky top-0 z-30 backdrop-blur-md bg-opacity-95">
      <div className="max-w-2xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          {/* Avatar and Identity */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-12 h-12 rounded-2xl border-2 border-amber-500/40 object-cover shadow-md"
              />
              <span
                className="absolute -bottom-1 -right-1 text-sm bg-neutral-900 rounded-full px-1 border border-neutral-700"
                title="Bangladesh"
              >
                🇧🇩
              </span>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="font-extrabold text-white text-base leading-tight tracking-tight">
                  {profile.name}
                </h1>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-400 border border-amber-500/30">
                  Age {profile.age}
                </span>
              </div>
              <p className="text-xs text-neutral-400 font-mono mt-0.5">
                @{profile.username} • FIDE: <strong className="text-neutral-200">{profile.fideId}</strong>
              </p>
            </div>
          </div>

          {/* Quick Rating Chip */}
          <div className="text-right">
            <div className="inline-flex flex-col items-end">
              <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400">
                Rapid Rating
              </span>
              <span className="text-xl font-extrabold font-mono text-white tracking-tight">
                {profile.ratings.rapid}
              </span>
              <span className="text-[9px] text-neutral-500">
                Peak: {profile.ratings.peakRapid}
              </span>
            </div>
          </div>
        </div>

        {/* 3-Month Badge Strip */}
        <div className="mt-2.5 pt-2 border-t border-neutral-800/60 flex items-center justify-between text-[11px] text-neutral-400">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Audit: <strong className="text-neutral-200">{timeframe.label}</strong></span>
          </div>
          <span className="font-mono text-neutral-300 font-semibold">
            {timeframe.totalGames} Games Analyzed
          </span>
        </div>
      </div>
    </header>
  );
};
