import React, { useState } from 'react';
import ayazData from '../data/ayazData.json';

export const StudyPlanView: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const { recommendations } = ayazData;

  const aiPrompt = `I am a 16-year-old FIDE rated chess player (FIDE ID: 532023472, Rapid: 2451 on Chess.com).
Here is my 3-month performance audit across 780 games:
- White strengths: Sicilian Alapin (68.8% win rate in 16 games), Italian Giuoco Piano (55.6%)
- White disasters: Open Sicilian Mainline (37.6% win rate with 52 losses in 93 games!), French Exchange (32.4% win rate)
- Black strengths: Philidor Defense (48.4% win rate across 157 games)
- Black disaster: Benoni Defense (28.6% win rate in 21 games) and Indian queen pawn setups (<32% win rate)

Please act as my Grandmaster Coach:
1. Help me structure my Alapin 2.c3 Sicilian repertoire against 2...d5 and 2...Nf6.
2. Recommend a complete replacement for the Benoni against 1.d4 (either King's Indian or Queen's Gambit Declined) with key pawn breaks.
3. Outline a 30-minute daily calculation and opening review routine for my mobile phone.`;

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(aiPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto px-4 py-5">
      {/* Header Banner */}
      <div className="bg-[#131316] border border-neutral-800 rounded-2xl p-5 shadow-lg">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">📚</span>
          <div>
            <h2 className="text-lg font-extrabold text-white">
              Ayaz's Repertoire Study Plan
            </h2>
            <p className="text-xs text-neutral-400">
              Personalized 4-Week Repertoire Overhaul Based on 780 Games
            </p>
          </div>
        </div>
        <p className="text-xs text-neutral-300 leading-relaxed mt-2">
          Ayaz, your tactical speed is already at 2400+ level. The only thing standing between you and 2600 is eliminating your 3 opening trap doors (Open Sicilian, French Exchange, and the Benoni).
        </p>
      </div>

      {/* 4 Study Modules */}
      <div className="space-y-4">
        {recommendations.studyModules.map((mod, idx) => (
          <div
            key={idx}
            className="bg-[#131316] border border-neutral-800/90 hover:border-neutral-700 rounded-2xl p-5 space-y-3 shadow-md"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center text-base">
                  {mod.icon}
                </span>
                <div>
                  <h3 className="text-sm font-bold text-white">
                    {mod.title}
                  </h3>
                  <span className="text-[10px] font-semibold text-amber-400">
                    {mod.tag}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-xs text-neutral-300 leading-relaxed">
              {mod.description}
            </p>

            {/* Key Themes List */}
            <div className="bg-[#0e0e11] rounded-xl p-3 border border-neutral-800/80 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
                Target Concepts to Master:
              </span>
              <ul className="space-y-1.5 text-xs text-neutral-200">
                {mod.keyThemes.map((theme, tIdx) => (
                  <li key={tIdx} className="flex items-start gap-2 leading-relaxed">
                    <span className="text-amber-400 font-bold mt-0.5">•</span>
                    <span>{theme}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* AI Coach Assistant Card */}
      <div className="bg-gradient-to-br from-[#18181c] to-[#121215] border border-amber-500/30 rounded-2xl p-5 shadow-xl space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">🤖</span>
          <h3 className="text-sm font-bold text-white">
            Ask Your AI Coach (ChatGPT / Claude / Gemini)
          </h3>
        </div>

        <p className="text-xs text-neutral-300 leading-relaxed">
          Copy this custom-tailored prompt to get full move trees, PGN files, and Grandmaster master game examples tailored to your exact stats:
        </p>

        <button
          onClick={handleCopyPrompt}
          className="w-full bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-neutral-950 font-bold py-3 px-4 rounded-xl text-xs transition shadow-md flex items-center justify-center gap-2"
        >
          <span>{copied ? '✓ Prompt Copied to Clipboard!' : '📋 Copy Personalized Coach Prompt'}</span>
        </button>
      </div>
    </div>
  );
};
