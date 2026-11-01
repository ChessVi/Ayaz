import React, { useState, useEffect } from 'react';
import puzzlesData from '../data/puzzles.json';
import { ChessBoardView } from './ChessBoardView';

interface Puzzle {
  id: string;
  gameId: string;
  date: string;
  timeControl: string;
  playerColor: 'white' | 'black';
  opponent: string;
  opponentRating: number;
  opening: string;
  fen: string;
  ayazPlayed: string;
  bestMoveUci: string;
  bestMoveSan: string;
  evalBefore: string;
  theme: string;
  hint: string;
  solutionExplanation: string;
}

const puzzles: Puzzle[] = puzzlesData as Puzzle[];

export const PuzzleView: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [solvedIds, setSolvedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('ayaz_solved_puzzles');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [key, setKey] = useState(0); // Used to force-reset board

  const currentPuzzle = puzzles[currentIndex];
  const isSolved = solvedIds.includes(currentPuzzle.id);

  // Save solved puzzles to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ayaz_solved_puzzles', JSON.stringify(solvedIds));
    } catch (e) {
      // ignore
    }
  }, [solvedIds]);

  // Reset state when switching puzzle
  useEffect(() => {
    setShowHint(false);
    setShowSolution(false);
    setKey((prev) => prev + 1);
  }, [currentIndex]);

  const handleSolve = (correct: boolean) => {
    if (correct && !solvedIds.includes(currentPuzzle.id)) {
      setSolvedIds((prev) => [...prev, currentPuzzle.id]);
    }
  };

  const handleNext = () => {
    if (currentIndex < puzzles.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setShowSolution(false);
    setKey((prev) => prev + 1);
  };

  return (
    <div className="space-y-5 max-w-2xl mx-auto px-4 py-5 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-[#1b1917] via-[#141416] to-[#0c0a09] border border-amber-500/30 rounded-2xl p-5 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-36 h-36 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center justify-between mb-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-[10px] font-bold uppercase tracking-wider">
            ⚡ Stockfish 19 Engine Trainer
          </div>
          <span className="text-xs font-mono font-bold text-neutral-400">
            Solved: <span className="text-emerald-400 font-bold">{solvedIds.length}</span> / {puzzles.length}
          </span>
        </div>

        <h2 className="text-xl sm:text-2xl font-extrabold text-white leading-tight">
          Puzzles From Ayaz's Real Games
        </h2>
        <p className="text-xs text-neutral-300 mt-1.5 leading-relaxed">
          Extracted directly from Ayaz's loss/draw archives using <strong>Stockfish 19 NNUE</strong>. In every position below, Ayaz had a decisive advantage but played a sub-optimal move. Can you find the winning move?
        </p>

        {/* Progress Bar */}
        <div className="mt-3.5 w-full bg-neutral-900 h-2 rounded-full overflow-hidden border border-neutral-800">
          <div
            className="bg-gradient-to-r from-emerald-500 to-amber-400 h-full transition-all duration-300"
            style={{ width: `${(solvedIds.length / puzzles.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Puzzle Navigation Pills */}
      <div className="bg-[#121215] border border-neutral-800 rounded-2xl p-3 shadow-md">
        <div className="flex items-center justify-between text-xs font-bold text-neutral-400 mb-2 px-1">
          <span>Select Tactical Position:</span>
          <span>Puzzle {currentIndex + 1} of {puzzles.length}</span>
        </div>
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5">
          {puzzles.map((p, idx) => {
            const isDone = solvedIds.includes(p.id);
            const isActive = idx === currentIndex;
            return (
              <button
                key={p.id}
                onClick={() => setCurrentIndex(idx)}
                className={`h-9 rounded-xl font-bold text-xs flex flex-col items-center justify-center transition-all ${
                  isActive
                    ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20 scale-105'
                    : isDone
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    : 'bg-neutral-800/80 text-neutral-400 hover:bg-neutral-700'
                }`}
              >
                <span>{idx + 1}</span>
                {isDone && <span className="text-[9px] -mt-1 leading-none">✓</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Game Context & Mistake Alert */}
      <div className="bg-[#141417] border border-neutral-800 rounded-2xl p-4 shadow-lg space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-extrabold text-white">
                vs {currentPuzzle.opponent}
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 border border-neutral-700">
                {currentPuzzle.opponentRating}
              </span>
            </div>
            <div className="text-xs text-neutral-400 mt-0.5">
              {currentPuzzle.opening} • {currentPuzzle.date}
            </div>
          </div>

          <div className="text-right">
            <span
              className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-bold ${
                currentPuzzle.playerColor === 'black'
                  ? 'bg-neutral-800 text-amber-300 border border-neutral-700'
                  : 'bg-neutral-100 text-neutral-900 border border-white'
              }`}
            >
              Ayaz playing {currentPuzzle.playerColor === 'black' ? '♚ Black' : '♔ White'}
            </span>
          </div>
        </div>

        {/* The Mistake Callout */}
        <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl p-3 text-xs leading-relaxed">
          <div className="flex items-center gap-1.5 font-bold text-rose-400 mb-1">
            <span>⚠️</span>
            <span>Ayaz's Real In-Game Blunder:</span>
          </div>
          <p className="text-neutral-200">
            Stockfish evaluation before this turn was <strong className="text-emerald-400">{currentPuzzle.evalBefore}</strong> (Winning).
            Ayaz played <span className="font-mono font-bold bg-rose-500/20 text-rose-300 px-1.5 py-0.5 rounded border border-rose-500/30">{currentPuzzle.ayazPlayed}</span> and allowed the opponent to escape!
          </p>
        </div>
      </div>

      {/* The Interactive Chess Board */}
      <div className="bg-[#121215] border border-neutral-800 rounded-2xl p-3 sm:p-5 shadow-xl flex flex-col items-center">
        <ChessBoardView
          key={key}
          fen={currentPuzzle.fen}
          flipped={currentPuzzle.playerColor === 'black'}
          solutionUci={currentPuzzle.bestMoveUci}
          solutionSan={currentPuzzle.bestMoveSan}
          ayazPlayed={currentPuzzle.ayazPlayed}
          showSolution={showSolution}
          onSolve={handleSolve}
        />

        {/* Puzzle Themes & Info */}
        <div className="w-full max-w-[340px] sm:max-w-[400px] mt-3 flex items-center justify-between text-xs text-neutral-400 px-1">
          <span className="font-semibold text-neutral-400">
            Tactical Theme: <span className="text-amber-400">{currentPuzzle.theme}</span>
          </span>
          <span className="font-mono text-[11px] text-neutral-500">
            Stockfish 19
          </span>
        </div>
      </div>

      {/* Solution / Feedback Section */}
      {(isSolved || showSolution) ? (
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-4 text-xs space-y-2 animate-fadeIn shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-emerald-400 font-extrabold text-sm flex items-center gap-1.5">
              <span>🎉</span>
              <span>Solution: {currentPuzzle.bestMoveSan}</span>
            </span>
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono font-bold text-[10px]">
              Engine Confirmed
            </span>
          </div>
          <p className="text-neutral-200 leading-relaxed">
            {currentPuzzle.solutionExplanation}
          </p>
          {currentIndex < puzzles.length - 1 && (
            <button
              onClick={handleNext}
              className="mt-2 w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-500/20"
            >
              <span>Next Puzzle</span>
              <span>➔</span>
            </button>
          )}
        </div>
      ) : (
        /* Action Buttons: Hint & Reveal */
        <div className="space-y-2.5">
          {showHint && (
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 text-xs text-amber-200 animate-fadeIn">
              <span className="font-bold text-amber-400">💡 Tactical Hint: </span>
              {currentPuzzle.hint}
            </div>
          )}

          <div className="flex gap-2">
            <button
              onClick={() => setShowHint((prev) => !prev)}
              className="flex-1 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-amber-400 font-bold text-xs border border-neutral-700 transition-colors flex items-center justify-center gap-1.5"
            >
              <span>💡</span>
              <span>{showHint ? 'Hide Hint' : 'Get Hint'}</span>
            </button>

            <button
              onClick={() => setShowSolution(true)}
              className="flex-1 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-bold text-xs border border-neutral-700 transition-colors flex items-center justify-center gap-1.5"
            >
              <span>👁️</span>
              <span>Show Solution</span>
            </button>

            <button
              onClick={handleReset}
              title="Reset Board"
              className="px-3.5 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-bold text-xs border border-neutral-700 transition-colors"
            >
              🔄
            </button>
          </div>
        </div>
      )}

      {/* Prev / Next Bottom Controls */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
            currentIndex === 0
              ? 'border-neutral-800 text-neutral-600 cursor-not-allowed'
              : 'border-neutral-700 text-neutral-300 hover:bg-neutral-800'
          }`}
        >
          ← Previous
        </button>

        <span className="text-xs font-mono text-neutral-500">
          {currentIndex + 1} of {puzzles.length}
        </span>

        <button
          onClick={handleNext}
          disabled={currentIndex === puzzles.length - 1}
          className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
            currentIndex === puzzles.length - 1
              ? 'border-neutral-800 text-neutral-600 cursor-not-allowed'
              : 'border-neutral-700 text-neutral-300 hover:bg-neutral-800'
          }`}
        >
          Next →
        </button>
      </div>
    </div>
  );
};
