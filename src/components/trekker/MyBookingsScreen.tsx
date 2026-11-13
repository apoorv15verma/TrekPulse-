import React from 'react';
import { useTrekPulse } from '../../context/TrekPulseContext';
import { Ticket, Calendar, MapPin, Users, CheckCircle2, MessageSquare, ArrowRight } from 'lucide-react';

export const MyBookingsScreen: React.FC = () => {
  const { bookedExpeditions, expeditions, selectExpedition, setTrekkerTab } = useTrekPulse();

  return (
    <div className="p-4 space-y-4 pb-20 overflow-y-auto no-scrollbar">
      <div>
        <h1 className="text-base font-extrabold text-slate-900 tracking-tight">Your Expedition Passes</h1>
        <p className="text-xs text-slate-500">Confirmed seats, WhatsApp vouchers & basecamp details</p>
      </div>

      {bookedExpeditions.length === 0 ? (
        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-3 mt-6">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-[#5046E4] flex items-center justify-center mx-auto">
            <Ticket className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-800">No Active Bookings Yet</h3>
            <p className="text-xs text-slate-500 mt-1">Browse our Himalayan catalog or use the AI Fit Matcher to find your trek.</p>
          </div>
          <button
            type="button"
            onClick={() => setTrekkerTab('explore')}
            className="bg-[#5046E4] text-white text-xs font-bold py-2 px-4 rounded-xl shadow-pill"
          >
            Explore Expeditions
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {bookedExpeditions.map((b, i) => {
            const exp = expeditions.find(e => e.id === b.expeditionId);
            if (!exp) return null;

            return (
              <div key={i} className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
                <div className="bg-[#5046E4] p-3 text-white flex items-center justify-between">
                  <div className="flex items-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="font-extrabold text-xs">Confirmed Expedition Pass</span>
                  </div>
                  <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-mono">
                    TK-{exp.id.slice(0, 4).toUpperCase()}-{i + 1}
                  </span>
                </div>

                <div className="p-3.5 space-y-3">
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-900">{exp.title}</h3>
                    <p className="text-[11px] text-slate-500">{exp.batchDateLabel}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-2.5 rounded-xl text-slate-700">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold">Basecamp</span>
                      <p className="font-semibold truncate">{exp.basecamp}</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold">Seats Reserved</span>
                      <p className="font-semibold">{b.seats} Person(s)</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <button
                      type="button"
                      onClick={() => selectExpedition(exp.id, 'gear')}
                      className="text-xs text-[#5046E4] font-bold hover:underline"
                    >
                      Check Gear Checklist
                    </button>

                    <a
                      href={`https://wa.me/919876543210?text=Hi%20${encodeURIComponent(exp.guide.name)},%20I%20have%20booked%20${encodeURIComponent(exp.title)}%20for%20${exp.batchDateLabel}`}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-1.5 px-3 rounded-xl flex items-center space-x-1 shadow-xs transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Contact Guide</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
