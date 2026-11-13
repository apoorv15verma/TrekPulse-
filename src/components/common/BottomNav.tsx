import React from 'react';
import { useTrekPulse } from '../../context/TrekPulseContext';
import { Compass, Mountain, ShieldCheck, Ticket, Layers, Sparkles, Users } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { mode, trekkerTab, setTrekkerTab, guideTab, setGuideTab, bookedExpeditions } = useTrekPulse();

  return (
    <div className="sticky bottom-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-100 py-1.5 px-3">
      {mode === 'trekker' ? (
        <div className="flex items-center justify-around">
          <button
            onClick={() => setTrekkerTab('explore')}
            className={`flex flex-col items-center py-1 px-2.5 rounded-xl transition-all ${
              trekkerTab === 'explore'
                ? 'text-[#5046E4]'
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <Compass className="w-5 h-5" />
            <span className="text-[10px] font-semibold mt-0.5">Explore</span>
          </button>

          <button
            onClick={() => setTrekkerTab('detail')}
            className={`flex flex-col items-center py-1 px-2.5 rounded-xl transition-all ${
              trekkerTab === 'detail'
                ? 'text-[#5046E4]'
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <Mountain className="w-5 h-5" />
            <span className="text-[10px] font-semibold mt-0.5">Expedition</span>
          </button>

          <button
            onClick={() => setTrekkerTab('gear')}
            className={`flex flex-col items-center py-1 px-2.5 rounded-xl transition-all relative ${
              trekkerTab === 'gear'
                ? 'text-[#5046E4]'
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <div className="relative">
              <ShieldCheck className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#5046E4]" />
            </div>
            <span className="text-[10px] font-semibold mt-0.5">Gear & Alt</span>
          </button>

          <button
            onClick={() => setTrekkerTab('bookings')}
            className={`flex flex-col items-center py-1 px-2.5 rounded-xl transition-all relative ${
              trekkerTab === 'bookings'
                ? 'text-[#5046E4]'
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <div className="relative">
              <Ticket className="w-5 h-5" />
              {bookedExpeditions.length > 0 && (
                <span className="absolute -top-1 -right-2 bg-[#7EC845] text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {bookedExpeditions.length}
                </span>
              )}
            </div>
            <span className="text-[10px] font-semibold mt-0.5">Passes</span>
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-around">
          <button
            onClick={() => setGuideTab('treks')}
            className={`flex flex-col items-center py-1 px-3 rounded-xl transition-all ${
              guideTab === 'treks'
                ? 'text-[#5046E4]'
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <Layers className="w-5 h-5" />
            <span className="text-[10px] font-semibold mt-0.5">Catalog</span>
          </button>

          <button
            onClick={() => setGuideTab('create')}
            className={`flex items-center space-x-1.5 py-1 px-4 rounded-full shadow-sm transition-all ${
              guideTab === 'create'
                ? 'bg-[#5046E4] text-white shadow-indigo-200'
                : 'bg-indigo-50 text-[#5046E4] hover:bg-indigo-100'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span className="text-[11px] font-bold">Draft with AI</span>
          </button>

          <button
            onClick={() => setGuideTab('bookings')}
            className={`flex flex-col items-center py-1 px-3 rounded-xl transition-all ${
              guideTab === 'bookings'
                ? 'text-[#5046E4]'
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <Users className="w-5 h-5" />
            <span className="text-[10px] font-semibold mt-0.5">Travellers</span>
          </button>
        </div>
      )}
    </div>
  );
};
