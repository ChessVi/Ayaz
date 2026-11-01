import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-12 mb-20 text-center text-xs text-neutral-500 space-y-3 px-4">
      <p className="text-[11px] leading-relaxed">
        Personalized Repertoire & Weakness Audit generated from 780 recent games on Chess.com.
      </p>

      <div className="pt-2">
        <a
          href="https://www.facebook.com/0Shohan0"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-neutral-900 border border-neutral-800 hover:border-amber-500/50 text-neutral-300 hover:text-amber-400 transition group text-xs font-semibold shadow-md active:scale-95"
        >
          <span>Made with</span>
          <span className="text-rose-500 group-hover:scale-125 transition-transform duration-200">❤️</span>
          <span>by <strong className="text-white group-hover:text-amber-400">Shohan</strong></span>
          <span className="text-neutral-500 group-hover:text-amber-400 text-[10px]">↗</span>
        </a>
      </div>
    </footer>
  );
};
