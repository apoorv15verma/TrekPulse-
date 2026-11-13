import React from 'react';
import { useTrekPulse } from '../../context/TrekPulseContext';
import { Mountain, Sparkles, Compass, ShieldCheck, Wifi, Battery } from 'lucide-react';

export const Header: React.FC = () => {
  const { mode, setMode, backendHealth } = useTrekPulse();

  return (
    <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-100 px-4 pt-2 pb-2.5 transition-all">
      {/* iOS style Status Bar Mock */}
      <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 mb-2 px-1">
        <span>9:41</span>
        <div className="flex items-center space-x-1.5">
          <span className="text-[10px] tracking-tighter">5G</span>
          <Wifi className="w-3 h-3 text-slate-600" />
          <Battery className="w-3.5 h-3.5 text-slate-700" />
        </div>
      </div>

      {/* Main Top Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#5046E4] to-indigo-500 flex items-center justify-center text-white shadow-sm shadow-indigo-200">
            <Mountain className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-extrabold text-[15px] tracking-tight text-slate-900">TrekPulse</span>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-indigo-50 text-[#5046E4] border border-indigo-100/60">
                AI v2
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium">Himalayan Route Intelligence</p>
          </div>
        </div>

        {/* Mode Switcher Pill */}
        <div className="bg-slate-100 p-0.5 rounded-full flex items-center border border-slate-200/60">
          <button
            onClick={() => setMode('trekker')}
            className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all flex items-center space-x-1 ${
              mode === 'trekker'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Compass className="w-3 h-3 text-[#5046E4]" />
            <span>Trekker</span>
          </button>
          <button
            onClick={() => setMode('guide')}
            className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all flex items-center space-x-1 ${
              mode === 'guide'
                ? 'bg-[#5046E4] text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Sparkles className="w-3 h-3 text-indigo-200" />
            <span>Guide Ops</span>
          </button>
        </div>
      </div>

      {/* Live AI Status Bar */}
      <div className="mt-2 pt-1.5 border-t border-slate-100/80 flex items-center justify-between text-[10px]">
        <div className="flex items-center space-x-1.5 text-slate-500">
          <span className={`w-1.5 h-1.5 rounded-full ${backendHealth?.liveGemini ? 'bg-emerald-500 animate-pulse' : 'bg-[#5046E4]'}`} />
          <span>
            {backendHealth?.liveGemini 
              ? 'Connected to Gemini 2.5 Flash' 
              : 'Mountain Intelligence AI Engine'}
          </span>
        </div>
        <span className="text-slate-400 font-mono text-[9px]">
          {mode === 'guide' ? 'Host Ops Terminal' : 'Traveller Discovery'}
        </span>
      </div>
    </div>
  );
};
