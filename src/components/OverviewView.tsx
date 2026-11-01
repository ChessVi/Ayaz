import React from 'react';
import ayazData from '../data/ayazData.json';
import { TabType } from './BottomNav';

interface OverviewViewProps {
  onSelectTab: (tab: TabType) => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({ onSelectTab }) => {
  const { white, black, recommendations } = ayazData;

  return (
    <div className="space-y-6 max-w-2xl mx-auto px-4 py-5">
      {/* Hero Alert: The 3-Month Summary */}
      <div className="bg-gradient-to-br from-[#18181c] to-[#121215] border border-amber-500/30 rounded-2xl p-5 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-[10px] font-bold uppercase tracking-wider mb-3">
          🔥 16-Year-Old FIDE Master In The Making
        </div>

        <h2 className="text-xl sm:text-2xl font-extrabold text-white leading-tight">
          Ayaz, your Rapid is <span className="text-amber-400">2451</span>. Here is how you push to <span className="text-emerald-400">2600+</span>.
        </h2>

        <p className="text-xs text-neutral-300 mt-2 leading-relaxed">
          Over the last 3 months across <strong>780 rated games</strong>, your opening choice directly dictated your results.
          In your best openings you score nearly <strong>70%</strong> against 2400+ masters.
          In your worst openings, you suffered over <strong>100 avoidable losses</strong>.
        </p>

        {/* Win/Loss Split Mini Bar */}
        <div className="mt-4 pt-3 border-t border-neutral-800">
          <div className="flex justify-between text-xs font-mono mb-1.5">
            <span className="text-emerald-400 font-bold">
              White: {white.winRate}% ({white.wins}W - {white.losses}L)
            </span>
            <span className="text-amber-400 font-bold">
              Black: {black.winRate}% ({black.wins}W - {black.losses}L)
            </span>
          </div>
          <div className="w-full h-2.5 rounded-full overflow-hidden flex bg-neutral-900 border border-neutral-800">
            <div style={{ width: `${white.winRate}%` }} className="bg-emerald-500" />
            <div style={{ width: `${black.winRate}%` }} className="bg-amber-500" />
            <div className="flex-1 bg-rose-500" />
          </div>
        </div>
      </div>

      {/* Stockfish Engine Missed-Win Trainer Banner */}
      <div
        onClick={() => onSelectTab('puzzles')}
        className="bg-gradient-to-r from-amber-500/20 via-neutral-900 to-emerald-500/10 border border-amber-500/40 rounded-2xl p-4 shadow-lg cursor-pointer hover:border-amber-400 transition-all flex items-center justify-between group"
      >
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform flex-shrink-0">
            🧩
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-extrabold text-white group-hover:text-amber-300 transition-colors">
                Stockfish 19 Tactical Puzzles
              </h3>
              <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                10 Puzzles
              </span>
            </div>
            <p className="text-[11px] text-neutral-300 mt-0.5 line-clamp-1">
              Positions where Ayaz had decisive advantage (+3.0 to +4.5) but let the win slip.
            </p>
          </div>
        </div>
        <div className="text-amber-400 font-extrabold text-sm pl-2 whitespace-nowrap">
          Solve →
        </div>
      </div>

      {/* Quick Verdict 1: AS WHITE */}
      <div className="bg-[#131316] border border-neutral-800 rounded-2xl p-5 space-y-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">♔</span>
            <h3 className="text-base font-bold text-white tracking-tight">
              White Repertoire Verdict
            </h3>
          </div>
          <button
            onClick={() => onSelectTab('white')}
            className="text-xs font-semibold text-amber-400 hover:text-amber-300 transition"
          >
            Deep Dive →
          </button>
        </div>

        <p className="text-xs text-neutral-300 leading-relaxed font-medium">
          {recommendations.whiteVerdict.headline}
        </p>

        {/* Cards for White: Best vs Worst */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {/* Weapon Card */}
          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                ⭐ Major Weapon
              </span>
              <span className="text-xs font-mono font-extrabold text-emerald-400">
                68.8% Win Rate
              </span>
            </div>
            <h4 className="text-sm font-bold text-white">B22 Sicilian: Alapin (2.c3)</h4>
            <p className="text-[11px] text-neutral-300 mt-1 leading-snug">
              11 Wins, 4 Losses against 2446 Elo masters. Absolute dominance!
            </p>
          </div>

          {/* Ditch Card */}
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/25">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400">
                🚨 Bleeding Losses
              </span>
              <span className="text-xs font-mono font-extrabold text-rose-400">
                37.6% (52 Losses!)
              </span>
            </div>
            <h4 className="text-sm font-bold text-white">B20 Open Sicilian</h4>
            <p className="text-[11px] text-neutral-300 mt-1 leading-snug">
              93 games played. 52 losses. 2400s exploit sharp open lines. Ditch it.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Verdict 2: AS BLACK */}
      <div className="bg-[#131316] border border-neutral-800 rounded-2xl p-5 space-y-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">♚</span>
            <h3 className="text-base font-bold text-white tracking-tight">
              Black Repertoire Verdict
            </h3>
          </div>
          <button
            onClick={() => onSelectTab('black')}
            className="text-xs font-semibold text-amber-400 hover:text-amber-300 transition"
          >
            Deep Dive →
          </button>
        </div>

        <p className="text-xs text-neutral-300 leading-relaxed font-medium">
          {recommendations.blackVerdict.headline}
        </p>

        {/* Cards for Black: Best vs Worst */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {/* Weapon Card */}
          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                🛡️ Trusted Pillar
              </span>
              <span className="text-xs font-mono font-extrabold text-emerald-400">
                157 Games (76W)
              </span>
            </div>
            <h4 className="text-sm font-bold text-white">C41 Philidor Defense</h4>
            <p className="text-[11px] text-neutral-300 mt-1 leading-snug">
              Solid 48.4% against 2388 avg opponents. Keep sharpening move orders.
            </p>
          </div>

          {/* Ditch Card */}
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/25">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400">
                🚨 Crisis vs 1.d4
              </span>
              <span className="text-xs font-mono font-extrabold text-rose-400">
                28.6% Win Rate
              </span>
            </div>
            <h4 className="text-sm font-bold text-white">A56 Benoni Defense</h4>
            <p className="text-[11px] text-neutral-300 mt-1 leading-snug">
              21 games, 13 losses. Weak d6 pawn and lack of space crush you.
            </p>
          </div>
        </div>
      </div>

      {/* Quick CTA to Study Plan */}
      <div className="bg-gradient-to-r from-amber-500/15 via-amber-500/10 to-transparent border border-amber-500/30 rounded-2xl p-5 flex items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block mb-1">
            📚 Custom Roadmap
          </span>
          <h4 className="text-sm font-bold text-white">
            Ayaz's 4-Week Repertoire Overhaul Plan
          </h4>
          <p className="text-xs text-neutral-400 mt-0.5">
            Move orders, pawn structures, and study themes from your games.
          </p>
        </div>
        <button
          onClick={() => onSelectTab('study')}
          className="bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-neutral-950 font-bold px-4 py-2.5 rounded-xl text-xs whitespace-nowrap shadow-md transition"
        >
          View Plan
        </button>
      </div>
    </div>
  );
};
