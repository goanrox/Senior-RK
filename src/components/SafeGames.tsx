
import React from 'react';
import { hapticFeedback } from '../utils/haptics';
import { 
  Gamepad2, 
  ExternalLink, 
  ShieldCheck, 
  Lightbulb,
  Trophy,
  Puzzle,
  Hash,
  Type,
  LayoutGrid,
  Sword,
  CheckCircle2,
  Info
} from 'lucide-react';

interface Game {
  name: string;
  description: string;
  icon: string;
  playStoreUrl: string;
  safetyNote: string;
  category: string;
  lucideIcon: any;
}

const games: Game[] = [
  {
    name: "Microsoft Solitaire Collection",
    description: "The classic card game that everyone knows. Includes Klondike, Spider, and FreeCell.",
    icon: "🃏",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.microsoft.microsoftsolitairecollection",
    safetyNote: "Official Microsoft app. Very safe, contains some ads but no malicious content.",
    category: "Cards",
    lucideIcon: LayoutGrid
  },
  {
    name: "Wordle (NYT Games)",
    description: "A simple daily word puzzle. You have 6 tries to guess a 5-letter word.",
    icon: "📝",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.nytimes.crossword",
    safetyNote: "Part of the New York Times app. High quality and safe.",
    category: "Words",
    lucideIcon: Type
  },
  {
    name: "Mahjong Solitaire",
    description: "Match identical tiles to clear the board. Very relaxing and good for focus.",
    icon: "🀄",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.microsoft.mahjong",
    safetyNote: "Microsoft version is clean and professional.",
    category: "Puzzle",
    lucideIcon: Puzzle
  },
  {
    name: "Sudoku.com",
    description: "Classic number placement puzzle. Great for keeping the mind sharp.",
    icon: "🔢",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.easybrain.sudoku.android",
    safetyNote: "Very popular and well-vetted. Watch out for 'Booster' ads between games.",
    category: "Numbers",
    lucideIcon: Hash
  },
  {
    name: "Jigsaw Puzzles Real",
    description: "Digital jigsaw puzzles. No missing pieces and no cleanup required!",
    icon: "🧩",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.rottzgames.jigsawpuzzlesreal",
    safetyNote: "Simple interface, very senior-friendly.",
    category: "Puzzle",
    lucideIcon: Puzzle
  },
  {
    name: "Chess.com",
    description: "Play chess against the computer or other people. Includes lessons.",
    icon: "♟️",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.chess",
    safetyNote: "The gold standard for chess. Very safe community.",
    category: "Strategy",
    lucideIcon: Sword
  },
  {
    name: "Crossword Quiz",
    description: "A fun mix of crosswords and trivia. Uses pictures as clues.",
    icon: "🔡",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.apprope.crosswordquiz",
    safetyNote: "Safe and engaging word game.",
    category: "Words",
    lucideIcon: Type
  },
  {
    name: "2048",
    description: "Swipe tiles to merge numbers until you reach 2048. Simple but addictive.",
    icon: "➕",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.androbaby.game2048",
    safetyNote: "Small app size, no complex permissions needed.",
    category: "Numbers",
    lucideIcon: Hash
  }
];

const SafeGames: React.FC = () => {
  const handleGameClick = (url: string) => {
    hapticFeedback.medium();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="p-6 md:p-10 space-y-12">
      <div className="space-y-2">
        <h2 className="text-2xl md:text-[32px] font-bold text-text-main flex items-center gap-4">
          <div className="p-3 bg-white rounded-2xl shadow-sm border border-border-main">
            <Gamepad2 className="text-primary" size={28} />
          </div>
          Safe Games for Seniors
        </h2>
        <p className="text-text-muted text-lg font-medium">
          These games are hand-picked for being safe, easy to use, and great for brain health.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {games.map((game, index) => (
          <div 
            key={index}
            className="card-premium p-8 bg-white border border-border-main hover:shadow-lg transition-all group flex flex-col relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <game.lucideIcon size={80} />
            </div>
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-start gap-6 mb-6">
                <div className="w-16 h-16 bg-bg-main rounded-2xl flex items-center justify-center text-3xl shadow-inner border border-border-main group-hover:scale-110 transition-transform">
                  {game.icon}
                </div>
                <div className="flex-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full mb-2 inline-block">
                    {game.category}
                  </span>
                  <h3 className="text-xl font-bold text-text-main group-hover:text-primary transition-colors leading-tight">
                    {game.name}
                  </h3>
                </div>
              </div>
              
              <p className="text-base text-text-muted mb-8 flex-grow font-medium leading-relaxed">
                {game.description}
              </p>

              <div className="bg-emerald-50 p-4 rounded-2xl mb-8 border border-emerald-100">
                <p className="text-[11px] font-black uppercase tracking-widest text-emerald-700 mb-2 flex items-center gap-2">
                  <ShieldCheck size={14} /> Safety Check
                </p>
                <p className="text-sm text-emerald-800 font-medium leading-relaxed">
                  {game.safetyNote}
                </p>
              </div>

              <button 
                onClick={() => handleGameClick(game.playStoreUrl)}
                className="btn-primary w-full py-4 flex items-center justify-center gap-3 text-sm font-bold uppercase tracking-widest"
              >
                Get on Play Store
                <ExternalLink size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="card-premium p-8 bg-amber-50 border-amber-100 flex flex-col md:flex-row items-center gap-8 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5">
          <Lightbulb size={100} />
        </div>
        <div className="p-4 bg-amber-100 rounded-3xl text-amber-700 relative z-10">
          <Lightbulb size={40} />
        </div>
        <div className="text-center md:text-left relative z-10">
          <h4 className="text-xl font-bold mb-3 text-text-main flex items-center justify-center md:justify-start gap-2">
            A Quick Tip for Games
          </h4>
          <p className="text-base text-text-main font-medium leading-relaxed">
            Many free games show ads between levels. If an ad tells you your phone has a virus or needs a "Cleaner," 
            <strong> ignore it!</strong> It's just an ad trying to get you to download something else. 
            Just wait for the "X" to appear in the corner to close the ad.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SafeGames;
