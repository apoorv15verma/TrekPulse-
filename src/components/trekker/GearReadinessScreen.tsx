import React, { useState } from 'react';
import { useTrekPulse } from '../../context/TrekPulseContext';
import { PrepAdvisorResponse } from '../../types/trek';
import { mockPrepAdvisor } from '../../server/mockAi';
import { ShimmerCard } from '../common/Shimmer';
import { 
  Sparkles, 
  ShieldCheck, 
  AlertTriangle, 
  ThermometerSnowflake, 
  TrendingUp, 
  CheckCircle2, 
  ShoppingBag, 
  ChevronRight,
  Info
} from 'lucide-react';

export const GearReadinessScreen: React.FC = () => {
  const { selectedExpedition, expeditions, selectExpedition } = useTrekPulse();
  const exp = selectedExpedition;

  const [priorMaxAltitude, setPriorMaxAltitude] = useState('Below 8,000 ft (First high trek)');
  const [coldSensitivity, setColdSensitivity] = useState('Normal (Standard layers)');
  const [isAdvising, setIsAdvising] = useState(false);
  const [adviceResult, setAdviceResult] = useState<PrepAdvisorResponse | null>(null);
  const [adviceError, setAdviceError] = useState<string | null>(null);

  const handleGenerateAdvice = async () => {
    setIsAdvising(true);
    setAdviceError(null);

    try {
      const res = await fetch('/api/ai/prep-advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          expedition: exp,
          priorMaxAltitude,
          coldSensitivity
        })
      });

      if (!res.ok) throw new Error('Advisor request failed');
      const data: PrepAdvisorResponse = await res.json();
      setAdviceResult(data);
    } catch (err: any) {
      console.warn('Backend API unavailable, falling back to local prep advisor:', err);
      const fallback = mockPrepAdvisor(exp, priorMaxAltitude, coldSensitivity);
      setAdviceResult(fallback);
    } finally {
      setIsAdvising(false);
    }
  };

  return (
    <div className="p-4 space-y-4 pb-20 overflow-y-auto no-scrollbar">
      {/* Header */}
      <div>
        <div className="flex items-center space-x-1.5">
          <ShieldCheck className="w-4 h-4 text-[#5046E4]" />
          <h1 className="text-base font-extrabold text-slate-900 tracking-tight">Altitude & Gear Advisor</h1>
        </div>
        <p className="text-xs text-slate-500">Personalized acclimatization & pack checklist</p>
      </div>

      {/* Target Route Selector */}
      <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
          Currently Selected Route
        </label>
        <select
          value={exp.id}
          onChange={(e) => selectExpedition(e.target.value, 'gear')}
          className="w-full text-xs font-bold p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900"
        >
          {expeditions.map(item => (
            <option key={item.id} value={item.id}>
              {item.title} ({item.maxAltitudeFt.toLocaleString()} ft · {item.region})
            </option>
          ))}
        </select>
      </div>

      {/* Flagship Advisor Form Card */}
      <div className="rounded-2xl bg-gradient-to-br from-indigo-50/90 via-white to-purple-50/50 border-2 border-[#5046E4]/30 p-3.5 shadow-sm space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-lg bg-[#5046E4] text-white flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-amber-300" />
            </div>
            <div>
              <span className="font-extrabold text-xs text-slate-900">Personalize Prep Plan</span>
              <p className="text-[10px] text-slate-500">Tailored to your altitude tolerance</p>
            </div>
          </div>
          <span className="text-[9px] font-bold text-[#5046E4] bg-white px-2 py-0.5 rounded-full border border-indigo-100">
            Medical Safety
          </span>
        </div>

        {/* Input 1: Prior Altitude Experience */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Your Prior Maximum Altitude
          </label>
          <div className="space-y-1.5">
            {[
              'Below 8,000 ft (First high trek)',
              '10,000 – 12,000 ft (e.g. Kedarkantha, Triund)',
              '14,000+ ft (e.g. Hampta, Roopkund, Ladakh)'
            ].map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setPriorMaxAltitude(opt)}
                className={`w-full text-left p-2 rounded-xl text-xs font-semibold border transition-all flex items-center justify-between ${
                  priorMaxAltitude === opt
                    ? 'bg-[#E9EDFF] border-[#5046E4] text-[#5046E4]'
                    : 'bg-white border-slate-200 text-slate-700'
                }`}
              >
                <span>{opt}</span>
                {priorMaxAltitude === opt && <CheckCircle2 className="w-3.5 h-3.5 text-[#5046E4]" />}
              </button>
            ))}
          </div>
        </div>

        {/* Input 2: Cold Sensitivity */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Cold Sensitivity
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { id: 'Low (Run warm)', label: 'Low', desc: 'Run warm' },
              { id: 'Normal (Standard layers)', label: 'Normal', desc: 'Standard' },
              { id: 'High (Feel cold quickly)', label: 'High', desc: 'Get cold fast' }
            ].map(c => (
              <button
                key={c.id}
                type="button"
                onClick={() => setColdSensitivity(c.id)}
                className={`p-2 rounded-xl text-center border transition-all ${
                  coldSensitivity === c.id
                    ? 'bg-[#E9EDFF] border-[#5046E4] text-[#5046E4]'
                    : 'bg-white border-slate-200 text-slate-700'
                }`}
              >
                <div className="text-xs font-bold">{c.label}</div>
                <div className="text-[9px] text-slate-400 mt-0.5">{c.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <button
          type="button"
          onClick={handleGenerateAdvice}
          disabled={isAdvising}
          className="w-full bg-[#5046E4] hover:bg-indigo-700 active:scale-[0.98] disabled:opacity-50 text-white font-extrabold text-xs py-2.5 px-4 rounded-xl shadow-pill transition-all flex items-center justify-center space-x-1.5"
        >
          {isAdvising ? (
            <>
              <Sparkles className="w-3.5 h-3.5 animate-spin text-amber-300" />
              <span>Analyzing Altitude & Thermal Load...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Generate Tailored Altitude & Gear Plan</span>
            </>
          )}
        </button>

        {adviceError && (
          <div className="text-[11px] text-red-600 bg-red-50 p-2 rounded-lg border border-red-100">
            {adviceError}
          </div>
        )}
      </div>

      {/* Shimmer skeleton while advising */}
      {isAdvising && (
        <div className="space-y-3">
          <ShimmerCard />
          <ShimmerCard />
        </div>
      )}

      {/* Output Results */}
      {adviceResult && !isAdvising && (
        <div className="space-y-3.5 animate-in fade-in duration-300">
          {/* Acclimatization Summary Box */}
          <div className="p-3.5 rounded-2xl bg-[#FFF6E8] border border-amber-200 space-y-1.5">
            <div className="flex items-center space-x-1.5 text-amber-800">
              <TrendingUp className="w-4 h-4 shrink-0 text-[#FF9F1C]" />
              <span className="font-extrabold text-xs">Acclimatization Pacing Plan</span>
            </div>
            <p className="text-xs text-amber-950 leading-relaxed font-medium">
              {adviceResult.acclimatizationSummary}
            </p>
          </div>

          {/* Clinical Altitude Tips */}
          <div className="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-xs space-y-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Essential Altitude Guidelines
            </span>
            <div className="space-y-2">
              {adviceResult.altitudeTips.map((tip, idx) => (
                <div key={idx} className="flex items-start space-x-2 text-xs text-slate-700">
                  <div className="w-4 h-4 rounded-full bg-indigo-50 text-[#5046E4] flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold">
                    {idx + 1}
                  </div>
                  <p className="leading-snug">{tip}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Priority Gear Breakdown: Must Pack vs Rent at Basecamp */}
          <div className="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-xs space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Prioritized Gear Allocation
              </span>
              <span className="text-[10px] text-slate-400">Pack vs Rent</span>
            </div>

            <div className="space-y-2">
              {adviceResult.priorityGear.map((g, idx) => {
                const isPack = g.action === 'Must Pack';
                return (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{g.itemName}</span>
                      <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full ${
                        isPack
                          ? 'bg-red-50 text-red-700 border border-red-200'
                          : 'bg-[#E9EDFF] text-[#5046E4] border border-indigo-200'
                      }`}>
                        {g.action}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      {g.reason}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
