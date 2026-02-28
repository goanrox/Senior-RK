
import React from 'react';
import { hapticFeedback } from '../utils/haptics';

interface Game {
  name: string;
  description: string;
  icon: string;
  playStoreUrl: string;
  safetyNote: string;
  category: string;
}

const games: Game[] = [
  {
    name: "Microsoft Solitaire Collection",
    description: "The classic card game that everyone knows. Includes Klondike, Spider, and FreeCell.",
    icon: "🃏",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.microsoft.microsoftsolitairecollection",
    safetyNote: "Official Microsoft app. Very safe, contains some ads but no malicious content.",
    category: "Cards"
  },
  {
    name: "Wordle (NYT Games)",
    description: "A simple daily word puzzle. You have 6 tries to guess a 5-letter word.",
    icon: "📝",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.nytimes.crossword",
    safetyNote: "Part of the New York Times app. High quality and safe.",
    category: "Words"
  },
  {
    name: "Mahjong Solitaire",
    description: "Match identical tiles to clear the board. Very relaxing and good for focus.",
    icon: "🀄",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.microsoft.mahjong",
    safetyNote: "Microsoft version is clean and professional.",
    category: "Puzzle"
  },
  {
    name: "Sudoku.com",
    description: "Classic number placement puzzle. Great for keeping the mind sharp.",
    icon: "🔢",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.easybrain.sudoku.android",
    safetyNote: "Very popular and well-vetted. Watch out for 'Booster' ads between games.",
    category: "Numbers"
  },
  {
    name: "Jigsaw Puzzles Real",
    description: "Digital jigsaw puzzles. No missing pieces and no cleanup required!",
    icon: "🧩",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.rottzgames.jigsawpuzzlesreal",
    safetyNote: "Simple interface, very senior-friendly.",
    category: "Puzzle"
  },
  {
    name: "Chess.com",
    description: "Play chess against the computer or other people. Includes lessons.",
    icon: "♟️",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.chess",
    safetyNote: "The gold standard for chess. Very safe community.",
    category: "Strategy"
  },
  {
    name: "Crossword Quiz",
    description: "A fun mix of crosswords and trivia. Uses pictures as clues.",
    icon: "🔡",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.apprope.crosswordquiz",
    safetyNote: "Safe and engaging word game.",
    category: "Words"
  },
  {
    name: "2048",
    description: "Swipe tiles to merge numbers until you reach 2048. Simple but addictive.",
    icon: "➕",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.androbaby.game2048",
    safetyNote: "Small app size, no complex permissions needed.",
    category: "Numbers"
  }
];

const SafeGames: React.FC = () => {
  const handleGameClick = (url: string) => {
    hapticFeedback.medium();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="p-6 md:p-10">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-2xl md:text-3xl">🎮</span>
        <h2 className="text-2xl md:text-[28px] font-bold text-text-main">Safe Games for Seniors</h2>
      </div>
      <p className="mb-8 text-text-muted text-sm md:text-base font-medium">
        These games are hand-picked for being safe, easy to use, and great for brain health.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {games.map((game, index) => (
          <div 
            key={index}
            className="bg-white rounded-2xl border border-border-main p-5 md:p-6 shadow-sm hover:shadow-md transition-all group flex flex-col"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-bg-main rounded-2xl flex items-center justify-center text-2xl md:text-3xl shadow-inner">
                {game.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-black uppercase tracking-widest text-primary bg-primary/10 px-2 py-0.5 rounded-full mb-1 inline-block">
                    {game.category}
                  </span>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-text-main group-hover:text-primary transition-colors">
                  {game.name}
                </h3>
              </div>
            </div>
            
            <p className="text-sm text-text-muted mb-4 flex-grow font-medium leading-relaxed">
              {game.description}
            </p>

            <div className="bg-emerald-50 dark:bg-emerald-900/10 p-3 rounded-xl mb-5 border border-emerald-100 dark:border-emerald-900/20">
              <p className="text-[10px] font-black uppercase tracking-widest text-emerald-700 dark:text-emerald-400 mb-1 flex items-center gap-1">
                <span className="text-xs">🛡️</span> Safety Check
              </p>
              <p className="text-xs text-emerald-800 dark:text-emerald-300 font-medium">
                {game.safetyNote}
              </p>
            </div>

            <button 
              onClick={() => handleGameClick(game.playStoreUrl)}
              className="w-full py-3 bg-primary text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              Get on Play Store <span>↗</span>
            </button>
          </div>
        ))}
      </div>

      <div className="mt-10 p-6 bg-amber-50 dark:bg-amber-900/10 rounded-2xl border border-amber-100 dark:border-amber-900/20">
        <h4 className="font-bold text-amber-800 dark:text-amber-400 mb-2 flex items-center gap-2">
          <span>💡</span> A Quick Tip for Games
        </h4>
        <p className="text-sm text-amber-900/80 dark:text-amber-300/80 font-medium leading-relaxed">
          Many free games show ads between levels. If an ad tells you your phone has a virus or needs a "Cleaner," 
          <strong> ignore it!</strong> It's just an ad trying to get you to download something else. 
          Just wait for the "X" to appear in the corner to close the ad.
        </p>
      </div>
    </div>
  );
};

export default SafeGames;
