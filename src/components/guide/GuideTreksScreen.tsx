import React from 'react';
import { useTrekPulse } from '../../context/TrekPulseContext';
import { Layers, Sparkles, TrendingUp, Users, Calendar, ArrowRight, Plus } from 'lucide-react';

export const GuideTreksScreen: React.FC = () => {
  const { expeditions, setGuideTab, selectExpedition, setMode, setTrekkerTab } = useTrekPulse();

  return (
    <div className="p-4 space-y-4 pb-20 overflow-y-auto no-scrollbar">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-base font-extrabold text-slate-900 tracking-tight">Your Expeditions Catalog</h1>
          <p className="text-xs text-slate-500">Manage batches, seats, and custom itineraries</p>
        </div>
        <button
          type="button"
          onClick={() => setGuideTab('create')}
          className="bg-[#5046E4] text-white text-xs font-bold py-1.5 px-3 rounded-xl shadow-pill flex items-center space-x-1"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Trek</span>
        </button>
      </div>

      {/* Guide Stats Strip */}
      <div className="grid grid-cols-3 gap-2 bg-indigo-50/70 p-3 rounded-2xl border border-indigo-100 text-center">
        <div>
          <span className="text-[9px] font-bold text-slate-400 uppercase">Live Treks</span>
          <p className="text-sm font-extrabold text-slate-900 mt-0.5">{expeditions.length}</p>
        </div>
        <div>
          <span className="text-[9px] font-bold text-slate-400 uppercase">Total Seats</span>
          <p className="text-sm font-extrabold text-[#5046E4] mt-0.5">
            {expeditions.reduce((acc, e) => acc + e.totalSeats, 0)}
          </p>
        </div>
        <div>
          <span className="text-[9px] font-bold text-slate-400 uppercase">Guide Rating</span>
          <p className="text-sm font-extrabold text-emerald-700 mt-0.5">★ 4.96</p>
        </div>
      </div>

      {/* Expeditions List */}
      <div className="space-y-3">
        {expeditions.map(exp => (
          <div
            key={exp.id}
            className="p-3 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2.5"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-0.5 flex-1 min-w-0 pr-2">
                <div className="flex items-center space-x-1.5">
                  <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-600">
                    {exp.region}
                  </span>
                  {exp.isCustomHostCreated && (
                    <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded bg-[#7EC845] text-white">
                      AI Generated
                    </span>
                  )}
                  <span className="text-[9px] font-bold text-slate-400">· {exp.difficulty}</span>
                </div>
                <h3 className="font-extrabold text-xs text-slate-900 truncate">{exp.title}</h3>
                <p className="text-[10px] text-slate-500">{exp.batchDateLabel}</p>
              </div>

              <div className="text-right shrink-0">
                <div className="text-xs font-extrabold text-slate-900">₹{exp.basePriceInr.toLocaleString()}</div>
                <span className="text-[10px] text-emerald-600 font-bold">{exp.availableSeats} of {exp.totalSeats} seats open</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[11px]">
              <span className="text-slate-400 font-medium">Base: {exp.basecamp.split(' ')[0]}</span>

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    selectExpedition(exp.id, 'detail');
                    setMode('trekker');
                  }}
                  className="text-[#5046E4] font-bold hover:underline flex items-center space-x-0.5"
                >
                  <span>Preview as Trekker</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
