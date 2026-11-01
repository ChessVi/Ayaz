import React, { useState } from 'react';
import ayazData from '../data/ayazData.json';

interface ColorRepertoireViewProps {
  color: 'white' | 'black';
}

export const ColorRepertoireView: React.FC<ColorRepertoireViewProps> = ({ color }) => {
  const [subTab, setSubTab] = useState<'pursue' | 'ditch' | 'all'>('pursue');
  const [expandedEco, setExpandedEco] = useState<string | null>(null);

  const isWhite = color === 'white';
  const colorData = isWhite ? ayazData.white : ayazData.black;
  const recommendations = isWhite
    ? ayazData.recommendations.whiteVerdict
    : ayazData.recommendations.blackVerdict;

  const currentList =
    subTab === 'pursue'
      ? colorData.pursue
      : subTab === 'ditch'
      ? colorData.ditch
      : colorData.all;

  const toggleExpand = (key: string) => {
    setExpandedEco(expandedEco === key ? null : key);
  };

  return (
    <div className="space-y-5 max-w-2xl mx-auto px-4 py-5">
      {/* Title & Headline */}
      <div className="bg-[#131316] border border-neutral-800 rounded-2xl p-5 shadow-lg">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">{isWhite ? '♔' : '♚'}</span>
          <div>
            <h2 className="text-lg font-extrabold text-white">
              {isWhite ? 'White Repertoire Audit' : 'Black Repertoire Audit'}
            </h2>
            <p className="text-xs text-neutral-400 font-mono">
              {colorData.total} Games ({colorData.wins}W - {colorData.losses}L - {colorData.draws}D) • {colorData.winRate}% Win Rate
            </p>
          </div>
        </div>

        <p className="text-xs text-neutral-300 mt-3 p-3 bg-neutral-900/80 rounded-xl border border-neutral-800/80 leading-relaxed font-medium">
          💡 <strong className="text-white">Coach Verdict:</strong> {recommendations.headline}
        </p>
      </div>

      {/* Sub Tabs: Pursue vs Ditch vs All */}
      <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#131316] border border-neutral-800 rounded-xl text-xs font-semibold">
        <button
          onClick={() => setSubTab('pursue')}
          className={`py-2 px-3 rounded-lg transition text-center flex items-center justify-center gap-1.5 ${
            subTab === 'pursue'
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold shadow-sm'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <span>⭐</span>
          <span>Pursue ({colorData.pursue.length})</span>
        </button>

        <button
          onClick={() => setSubTab('ditch')}
          className={`py-2 px-3 rounded-lg transition text-center flex items-center justify-center gap-1.5 ${
            subTab === 'ditch'
              ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30 font-bold shadow-sm'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <span>🚨</span>
          <span>Ditch ({colorData.ditch.length})</span>
        </button>

        <button
          onClick={() => setSubTab('all')}
          className={`py-2 px-3 rounded-lg transition text-center flex items-center justify-center gap-1.5 ${
            subTab === 'all'
              ? 'bg-neutral-800 text-white font-bold shadow-sm'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <span>📋</span>
          <span>All ({colorData.all.length})</span>
        </button>
      </div>

      {/* Opening List */}
      <div className="space-y-3">
        {currentList.length === 0 ? (
          <div className="p-8 text-center bg-[#131316] border border-neutral-800 rounded-2xl text-xs text-neutral-500 italic">
            No openings found in this category.
          </div>
        ) : (
          currentList.map((op) => {
            const key = `${op.eco}-${op.name}`;
            const isExpanded = expandedEco === key;
            const isPursue = op.winRate >= 50;
            const isDitch = op.winRate <= 38;

            return (
              <div
                key={key}
                className={`bg-[#131316] border rounded-2xl overflow-hidden transition-all duration-200 ${
                  isExpanded
                    ? 'border-amber-500/50 shadow-xl'
                    : isDitch
                    ? 'border-rose-500/25 hover:border-rose-500/40'
                    : isPursue
                    ? 'border-emerald-500/25 hover:border-emerald-500/40'
                    : 'border-neutral-800 hover:border-neutral-700'
                }`}
              >
                {/* Header Row */}
                <div
                  onClick={() => toggleExpand(key)}
                  className="p-4 cursor-pointer flex items-start justify-between gap-3 active:bg-neutral-800/40"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-neutral-900 text-neutral-300 border border-neutral-800">
                        {op.eco}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                          isPursue
                            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                            : isDitch
                            ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                            : 'bg-neutral-800 text-neutral-400'
                        }`}
                      >
                        {isPursue ? '⭐ Weapon' : isDitch ? '🚨 Ditch Now' : '⚠️ Refine'}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-white truncate">
                      {op.name}
                    </h3>

                    <div className="flex items-center gap-3 text-[11px] text-neutral-400 mt-1 font-mono">
                      <span>{op.total} games</span>
                      <span>•</span>
                      <span className="text-emerald-400">{op.wins}W</span>
                      <span className="text-neutral-500">{op.draws}D</span>
                      <span className="text-rose-400">{op.losses}L</span>
                      <span>•</span>
                      <span>Avg Opp: {op.avgOpp}</span>
                    </div>
                  </div>

                  {/* Win Rate Badge */}
                  <div className="text-right flex-shrink-0">
                    <span
                      className={`text-lg font-extrabold font-mono ${
                        isPursue
                          ? 'text-emerald-400'
                          : isDitch
                          ? 'text-rose-400'
                          : 'text-amber-400'
                      }`}
                    >
                      {op.winRate.toFixed(1)}%
                    </span>
                    <span className="text-[10px] text-neutral-500 block">
                      {isExpanded ? 'Hide ▲' : 'Inspect ▼'}
                    </span>
                  </div>
                </div>

                {/* Progress Mini Bar */}
                <div className="px-4 pb-3">
                  <div className="w-full h-1.5 rounded-full overflow-hidden flex bg-neutral-900">
                    <div
                      style={{ width: `${(op.wins / op.total) * 100}%` }}
                      className="bg-emerald-500"
                    />
                    <div
                      style={{ width: `${(op.draws / op.total) * 100}%` }}
                      className="bg-neutral-600"
                    />
                    <div
                      style={{ width: `${(op.losses / op.total) * 100}%` }}
                      className="bg-rose-500"
                    />
                  </div>
                </div>

                {/* Expanded Game Inspector */}
                {isExpanded && (
                  <div className="bg-[#0e0e11] border-t border-neutral-800/80 p-4 space-y-3">
                    <div className="flex items-center justify-between text-xs text-neutral-400">
                      <span className="font-semibold text-white">
                        Recent Games in this Opening:
                      </span>
                      <span className="text-[11px] font-mono text-neutral-500">
                        {op.games.length} games recorded
                      </span>
                    </div>

                    <div className="space-y-2">
                      {op.games.map((g, idx) => {
                        const isWin = g.result === 'win';
                        const isLoss = g.result === 'loss';
                        return (
                          <div
                            key={idx}
                            className="p-2.5 rounded-xl bg-[#141418] border border-neutral-800 flex items-center justify-between text-xs"
                          >
                            <div>
                              <div className="flex items-center gap-2">
                                <span
                                  className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase font-mono ${
                                    isWin
                                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                                      : isLoss
                                      ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                                      : 'bg-neutral-800 text-neutral-400'
                                  }`}
                                >
                                  {g.result}
                                </span>
                                <span className="font-semibold text-white truncate max-w-[140px] sm:max-w-none">
                                  vs {g.opponent}
                                </span>
                                <span className="text-neutral-500 font-mono text-[11px]">
                                  ({g.opponentRating})
                                </span>
                              </div>
                              <p className="text-[10px] text-neutral-500 mt-0.5">
                                {g.date} • {g.timeControl}
                              </p>
                            </div>

                            <a
                              href={`https://www.chess.com/analysis?pgn=${encodeURIComponent(
                                g.pgn
                              )}`}
                              target="_blank"
                              rel="noreferrer"
                              className="px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 active:bg-neutral-600 text-neutral-300 hover:text-white transition text-[11px] font-semibold"
                            >
                              Analyze ↗
                            </a>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
