import React, { useState } from 'react';
import { TrekPulseProvider, useTrekPulse } from './context/TrekPulseContext';
import { Header } from './components/common/Header';
import { BottomNav } from './components/common/BottomNav';
import { GuideCreateTrekScreen } from './components/guide/GuideCreateTrekScreen';
import { GuideTreksScreen } from './components/guide/GuideTreksScreen';
import { GuideRosterScreen } from './components/guide/GuideRosterScreen';
import { ExploreScreen } from './components/trekker/ExploreScreen';
import { ExpeditionDetailScreen } from './components/trekker/ExpeditionDetailScreen';
import { GearReadinessScreen } from './components/trekker/GearReadinessScreen';
import { MyBookingsScreen } from './components/trekker/MyBookingsScreen';
import { 
  Sparkles, 
  Smartphone, 
  Monitor, 
  Mountain, 
  CheckCircle2, 
  Bot, 
  ShieldCheck, 
  Compass, 
  Github,
  Layers
} from 'lucide-react';

const MobileAppShell: React.FC = () => {
  const { mode, trekkerTab, guideTab, toast } = useTrekPulse();

  return (
    <div className="relative w-full h-full flex flex-col bg-white overflow-hidden select-none">
      {/* Top Mobile Bar */}
      <Header />

      {/* Main View Area */}
      <div className="flex-1 overflow-y-auto no-scrollbar relative bg-white">
        {mode === 'guide' ? (
          <>
            {guideTab === 'create' && <GuideCreateTrekScreen />}
            {guideTab === 'treks' && <GuideTreksScreen />}
            {guideTab === 'bookings' && <GuideRosterScreen />}
          </>
        ) : (
          <>
            {trekkerTab === 'explore' && <ExploreScreen />}
            {trekkerTab === 'detail' && <ExpeditionDetailScreen />}
            {trekkerTab === 'gear' && <GearReadinessScreen />}
            {trekkerTab === 'bookings' && <MyBookingsScreen />}
          </>
        )}
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className="absolute top-16 left-3 right-3 z-50 animate-in slide-in-from-top duration-200">
          <div className={`p-3 rounded-2xl shadow-lg border text-xs flex items-start space-x-2.5 ${
            toast.type === 'success' ? 'bg-emerald-950 text-white border-emerald-800' :
            toast.type === 'indigo' ? 'bg-[#5046E4] text-white border-indigo-700' :
            'bg-amber-950 text-white border-amber-800'
          }`}>
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <h5 className="font-extrabold leading-tight">{toast.title}</h5>
              {toast.desc && <p className="text-[11px] opacity-90 mt-0.5">{toast.desc}</p>}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation Dock */}
      <BottomNav />
    </div>
  );
};

const ShowcaseDashboard: React.FC = () => {
  const { setMode, setGuideTab, setTrekkerTab, backendHealth } = useTrekPulse();
  const [deviceFrame, setDeviceFrame] = useState(true);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Desktop Top Bar */}
      <header className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md px-6 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#5046E4] to-indigo-500 flex items-center justify-center text-white shadow-sm shadow-indigo-500/20">
            <Mountain className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-black text-base tracking-tight text-white">TrekPulse</span>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#5046E4]/20 text-indigo-300 border border-indigo-500/30">
                Gemini AI Upgrade
              </span>
            </div>
            <p className="text-xs text-slate-400">Contextual Mountain Intelligence for Guides & Trekkers</p>
          </div>
        </div>

        {/* Quick Workflow Jump Buttons */}
        <div className="hidden lg:flex items-center space-x-2 text-xs">
          <span className="text-slate-500 text-[11px] font-semibold mr-1">Direct Workflows:</span>
          
          <button
            onClick={() => {
              setMode('guide');
              setGuideTab('create');
            }}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-indigo-300 font-bold border border-slate-700/80 transition-all flex items-center space-x-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>AI Trip Builder</span>
          </button>

          <button
            onClick={() => {
              setMode('trekker');
              setTrekkerTab('explore');
            }}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-indigo-300 font-bold border border-slate-700/80 transition-all flex items-center space-x-1.5"
          >
            <Compass className="w-3.5 h-3.5 text-[#5046E4]" />
            <span>Trekker Fit Matcher</span>
          </button>

          <button
            onClick={() => {
              setMode('trekker');
              setTrekkerTab('detail');
            }}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-indigo-300 font-bold border border-slate-700/80 transition-all flex items-center space-x-1.5"
          >
            <Bot className="w-3.5 h-3.5 text-amber-300" />
            <span>Trail Q&A AI</span>
          </button>

          <button
            onClick={() => {
              setMode('trekker');
              setTrekkerTab('gear');
            }}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-indigo-300 font-bold border border-slate-700/80 transition-all flex items-center space-x-1.5"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Gear & Alt Advisor</span>
          </button>
        </div>

        {/* View Controls & Status */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 text-[11px] font-mono bg-slate-800/80 px-2.5 py-1.5 rounded-xl border border-slate-700">
            <span className={`w-2 h-2 rounded-full ${backendHealth?.liveGemini ? 'bg-emerald-400 animate-pulse' : 'bg-[#5046E4]'}`} />
            <span className="text-slate-300">
              {backendHealth?.liveGemini ? 'Live Gemini 2.5' : 'Smart Mock Engine'}
            </span>
          </div>

          <button
            onClick={() => setDeviceFrame(!deviceFrame)}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
            title="Toggle device frame"
          >
            {deviceFrame ? <Smartphone className="w-4 h-4" /> : <Monitor className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div
          style={{ width: deviceFrame ? '390px' : '100%', height: deviceFrame ? '844px' : '844px', maxWidth: deviceFrame ? '390px' : '480px' }}
          className={`transition-all duration-300 relative ${
            deviceFrame
              ? 'rounded-[50px] shadow-phone ring-1 ring-slate-700/80 p-3 bg-slate-900'
              : 'rounded-2xl shadow-2xl border border-slate-800'
          }`}
        >
          {/* Dynamic Island Pill (Mockup only) */}
          {deviceFrame && (
            <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-5 rounded-full bg-black z-50 flex items-center justify-end px-2 space-x-1">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-900/80 ring-1 ring-slate-800" />
            </div>
          )}

          {/* Device Screen Frame */}
          <div className={`w-full h-full overflow-hidden bg-white ${deviceFrame ? 'rounded-[40px]' : 'rounded-xl'}`}>
            <MobileAppShell />
          </div>
        </div>
      </main>

      {/* Desktop Footer Bar */}
      <footer className="border-t border-slate-800/60 bg-slate-950 px-6 py-2.5 text-center text-[11px] text-slate-500 flex items-center justify-between">
        <span>TrekPulse AI Upgrade · Contextual Mountain Intelligence</span>
        <span className="font-mono">Port 3000 · 390×844 Mobile Ergonomics</span>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <TrekPulseProvider>
      <ShowcaseDashboard />
    </TrekPulseProvider>
  );
}
