import React, { useState, useEffect } from 'react';
import { Chess, Square } from 'chess.js';

interface ChessBoardViewProps {
  fen: string;
  flipped?: boolean;
  solutionUci: string;
  solutionSan: string;
  ayazPlayed: string;
  onSolve: (correct: boolean) => void;
  showSolution: boolean;
}

const PIECE_SYMBOLS: Record<string, string> = {
  p: '♟',
  r: '♜',
  n: '♞',
  b: '♝',
  q: '♛',
  k: '♚',
  P: '♙',
  R: '♖',
  N: '♘',
  B: '♗',
  Q: '♕',
  K: '♔',
};

export const ChessBoardView: React.FC<ChessBoardViewProps> = ({
  fen,
  flipped = false,
  solutionUci,
  solutionSan,
  ayazPlayed,
  onSolve,
  showSolution,
}) => {
  const [game, setGame] = useState(() => new Chess(fen));
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
  const [possibleMoves, setPossibleMoves] = useState<Square[]>([]);
  const [status, setStatus] = useState<'playing' | 'solved' | 'failed'>('playing');

  // Reset when fen changes
  useEffect(() => {
    setGame(new Chess(fen));
    setSelectedSquare(null);
    setPossibleMoves([]);
    setStatus('playing');
  }, [fen]);

  const board = game.board();

  // Highlight squares from solution if showSolution is true
  const solFrom = solutionUci.slice(0, 2) as Square;
  const solTo = solutionUci.slice(2, 4) as Square;

  const handleSquareClick = (square: Square) => {
    if (status === 'solved') return;

    // If already selected, try to move
    if (selectedSquare) {
      if (selectedSquare === square) {
        setSelectedSquare(null);
        setPossibleMoves([]);
        return;
      }

      // Check if move is legal
      try {
        const moveAttempt = game.move({
          from: selectedSquare,
          to: square,
          promotion: 'q',
        });

        if (moveAttempt) {
          const moveUci = `${moveAttempt.from}${moveAttempt.to}${moveAttempt.promotion || ''}`;
          const isCorrect =
            moveUci.slice(0, 4) === solutionUci.slice(0, 4) ||
            moveAttempt.san.replace(/[+#x]/g, '') === solutionSan.replace(/[+#x]/g, '');

          if (isCorrect) {
            setStatus('solved');
            onSolve(true);
          } else {
            setStatus('failed');
            onSolve(false);
            // Revert after 1 second so user can try again
            setTimeout(() => {
              setGame(new Chess(fen));
              setSelectedSquare(null);
              setPossibleMoves([]);
              setStatus('playing');
            }, 1200);
          }

          setSelectedSquare(null);
          setPossibleMoves([]);
          return;
        }
      } catch (e) {
        // Not legal move, select new piece
      }
    }

    // Select new piece if it belongs to current player
    const piece = game.get(square);
    if (piece && piece.color === game.turn()) {
      setSelectedSquare(square);
      const moves = game.moves({ square, verbose: true }).map((m) => m.to);
      setPossibleMoves(moves);
    } else {
      setSelectedSquare(null);
      setPossibleMoves([]);
    }
  };

  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];

  const displayRanks = flipped ? [...ranks].reverse() : ranks;
  const displayFiles = flipped ? [...files].reverse() : files;

  return (
    <div className="flex flex-col items-center">
      {/* Visual Status Banner */}
      <div className="w-full max-w-[340px] sm:max-w-[400px] mb-2 flex items-center justify-between text-xs px-1">
        <span className="font-semibold text-neutral-300 flex items-center gap-1.5">
          <span>{flipped ? '♚ Black' : '♔ White'} to move</span>
          <span className="text-[10px] text-neutral-500 font-mono">
            ({flipped ? 'board flipped' : 'standard view'})
          </span>
        </span>

        {status === 'solved' && (
          <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30 text-xs animate-bounce">
            ✓ Correct!
          </span>
        )}
        {status === 'failed' && (
          <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 font-bold border border-rose-500/30 text-xs">
            ✕ Try again
          </span>
        )}
      </div>

      {/* Chess Board Grid */}
      <div className="w-full max-w-[340px] sm:max-w-[400px] aspect-square rounded-2xl overflow-hidden border-2 border-neutral-800 shadow-2xl relative select-none bg-neutral-900">
        <div className="grid grid-cols-8 grid-rows-8 w-full h-full">
          {displayRanks.map((rank, rankIdx) =>
            displayFiles.map((file, fileIdx) => {
              const square = `${file}${rank}` as Square;
              const isLight = (fileIdx + rankIdx) % 2 === 0;
              const piece = game.get(square);

              const isSelected = selectedSquare === square;
              const isPossibleMove = possibleMoves.includes(square);
              const isSolutionSquare = showSolution && (square === solFrom || square === solTo);

              return (
                <div
                  key={square}
                  onClick={() => handleSquareClick(square)}
                  className={`relative flex items-center justify-center cursor-pointer transition-colors duration-100 ${
                    isSolutionSquare
                      ? 'bg-amber-400/50'
                      : isSelected
                      ? 'bg-amber-500/60'
                      : isLight
                      ? 'bg-[#ebecd0]'
                      : 'bg-[#779556]'
                  }`}
                >
                  {/* Coordinates label on edge squares */}
                  {fileIdx === 0 && (
                    <span
                      className={`absolute top-0.5 left-1 text-[9px] font-bold ${
                        isLight ? 'text-[#779556]' : 'text-[#ebecd0]'
                      }`}
                    >
                      {rank}
                    </span>
                  )}
                  {rankIdx === 7 && (
                    <span
                      className={`absolute bottom-0.5 right-1 text-[9px] font-bold ${
                        isLight ? 'text-[#779556]' : 'text-[#ebecd0]'
                      }`}
                    >
                      {file}
                    </span>
                  )}

                  {/* Move destination dot */}
                  {isPossibleMove && !piece && (
                    <div className="w-3.5 h-3.5 rounded-full bg-black/30 pointer-events-none" />
                  )}
                  {isPossibleMove && piece && (
                    <div className="absolute inset-0 rounded-full border-4 border-black/30 pointer-events-none" />
                  )}

                  {/* Chess Piece Symbol */}
                  {piece && (
                    <span
                      className={`text-2xl sm:text-3xl font-bold transform hover:scale-105 transition-transform ${
                        piece.color === 'w'
                          ? 'text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]'
                          : 'text-[#18181b] drop-shadow-[0_1px_1px_rgba(255,255,255,0.4)]'
                      }`}
                    >
                      {PIECE_SYMBOLS[piece.color === 'w' ? piece.type.toUpperCase() : piece.type]}
                    </span>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
