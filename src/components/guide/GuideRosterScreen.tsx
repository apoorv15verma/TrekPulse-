import React from 'react';
import { useTrekPulse } from '../../context/TrekPulseContext';
import { Users, Phone, MessageSquare, CheckCircle, Clock } from 'lucide-react';

const MOCK_TRAVELLERS = [
  { name: 'Arjun Mehta', group: 'Pune IT Group (5 members)', trek: 'Kedarkantha Winter Summit', status: 'Deposit Paid (₹15,000)', balance: '₹27,495 at basecamp', phone: '+91 98220 11223' },
  { name: 'Sneha Roy', group: 'Solo Trekker', trek: 'Brahmatal Alpine Ridge', status: 'Fully Paid (₹9,950)', balance: '₹0 (Verified)', phone: '+91 98310 99887' },
  { name: 'Dr. Vikram Malhotra', group: 'Trekker & Son (2 members)', trek: 'Hampta Pass Crossover', status: 'Medical Check Passed', balance: '₹11,200 at basecamp', phone: '+91 98111 44556' }
];

export const GuideRosterScreen: React.FC = () => {
  const { bookedExpeditions, expeditions } = useTrekPulse();

  return (
    <div className="p-4 space-y-4 pb-20 overflow-y-auto no-scrollbar">
      <div>
        <h1 className="text-base font-extrabold text-slate-900 tracking-tight">Traveller Manifest & Logistics</h1>
        <p className="text-xs text-slate-500">Track batch payments, medical readiness & WhatsApp contacts</p>
      </div>

      <div className="space-y-3">
        {MOCK_TRAVELLERS.map((t, i) => (
          <div key={i} className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2.5">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-extrabold text-xs text-slate-900">{t.name}</h3>
                <p className="text-[10px] text-slate-500 font-medium">{t.group}</p>
              </div>
              <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                {t.status}
              </span>
            </div>

            <div className="text-[11px] bg-slate-50 p-2 rounded-xl text-slate-700 space-y-0.5">
              <p className="font-medium"><span className="text-slate-400">Trek: </span>{t.trek}</p>
              <p className="font-medium"><span className="text-slate-400">Balance: </span>{t.balance}</p>
            </div>

            <div className="flex items-center justify-between pt-1 text-xs">
              <span className="text-[10px] text-slate-400">{t.phone}</span>
              <div className="flex items-center space-x-2">
                <a
                  href={`https://wa.me/${t.phone.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-bold text-[10px] flex items-center space-x-1 shadow-xs"
                >
                  <MessageSquare className="w-3 h-3" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
