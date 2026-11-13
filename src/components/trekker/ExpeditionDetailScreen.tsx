import React, { useState } from 'react';
import { useTrekPulse } from '../../context/TrekPulseContext';
import { QnAMessage, TrailQnAResponse } from '../../types/trek';
import { 
  Sparkles, 
  MapPin, 
  TrendingUp, 
  Calendar, 
  Users, 
  ChevronLeft, 
  Send, 
  CheckCircle2, 
  Bot, 
  X, 
  PhoneCall, 
  Activity,
  ArrowRight
} from 'lucide-react';

const PRE_SEEDED_QUESTIONS = [
  'Is Diamox needed on this trek?',
  'Best camera spots for sunrise/sunset?',
  'How steep is the summit day?',
  'Will my phone get cellular signal?'
];

export const ExpeditionDetailScreen: React.FC = () => {
  const { selectedExpedition, bookSeats, setTrekkerTab } = useTrekPulse();
  const exp = selectedExpedition;

  const [activeTab, setActiveTab] = useState<'overview' | 'itinerary' | 'elevation' | 'gear'>('overview');

  // Trail Q&A Sheet State
  const [isQnAOpen, setIsQnAOpen] = useState(false);
  const [questionInput, setQuestionInput] = useState('');
  const [isAsking, setIsAsking] = useState(false);
  const [conversation, setConversation] = useState<QnAMessage[]>([
    {
      role: 'model',
      text: `Namaste! I'm Trail AI for ${exp.title}. Ask me anything about the ${exp.maxAltitudeFt.toLocaleString()} ft summit push, camp altitudes, mobile coverage, or gear requirements.`
    }
  ]);
  const [suggestedFollowUps, setSuggestedFollowUps] = useState<string[]>(PRE_SEEDED_QUESTIONS);

  const handleAskQuestion = async (qText?: string) => {
    const q = (qText || questionInput).trim();
    if (!q || isAsking) return;

    const newHistory: QnAMessage[] = [...conversation, { role: 'user', text: q }];
    setConversation(newHistory);
    setQuestionInput('');
    setIsAsking(true);

    try {
      const res = await fetch('/api/ai/trail-qna', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: q,
          expedition: exp,
          history: newHistory
        })
      });

      if (!res.ok) throw new Error('Q&A failed');
      const data: TrailQnAResponse = await res.json();

      setConversation(prev => [...prev, { role: 'model', text: data.answer }]);
      if (data.followUpSuggestions && data.followUpSuggestions.length > 0) {
        setSuggestedFollowUps(data.followUpSuggestions);
      }
    } catch (err: any) {
      console.error(err);
      setConversation(prev => [
        ...prev,
        {
          role: 'model',
          text: `On ${exp.title}, the highest elevation is ${exp.maxAltitudeFt.toLocaleString()} ft with basecamp at ${exp.basecamp}. Guide checkpoints monitor acclimatization daily.`
        }
      ]);
    } finally {
      setIsAsking(false);
    }
  };

  return (
    <div className="relative pb-24 overflow-y-auto no-scrollbar">
      {/* Hero Header with Cover Image */}
      <div className="relative h-56 w-full bg-slate-900">
        <img
          src={exp.coverImage}
          alt={exp.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

        {/* Top Floating Bar */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
          <button
            type="button"
            onClick={() => setTrekkerTab('explore')}
            className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-md text-white flex items-center justify-center border border-white/20"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <div className="flex items-center space-x-1.5">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-black/60 backdrop-blur-md text-white border border-white/20">
              {exp.region}
            </span>
            <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold text-white ${
              exp.difficulty === 'Easy' ? 'bg-emerald-600' :
              exp.difficulty === 'Moderate' ? 'bg-[#FF9F1C]' : 'bg-red-600'
            }`}>
              {exp.difficulty}
            </span>
          </div>
        </div>

        {/* Hero Title Info */}
        <div className="absolute bottom-3 left-4 right-4 text-white">
          <h1 className="text-lg font-extrabold leading-tight tracking-tight drop-shadow-sm">{exp.title}</h1>
          <p className="text-xs text-slate-200 line-clamp-1 mt-0.5">{exp.subtitle}</p>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="p-4 space-y-4">
        {/* Core Metrics Strip */}
        <div className="grid grid-cols-4 gap-2 bg-slate-50 p-2.5 rounded-2xl border border-slate-200/80 text-center">
          <div>
            <span className="text-[9px] font-bold text-amber-600 uppercase">Max Alt</span>
            <p className="text-xs font-extrabold text-slate-900 mt-0.5">{exp.maxAltitudeFt.toLocaleString()} ft</p>
          </div>
          <div>
            <span className="text-[9px] font-bold text-slate-400 uppercase">Duration</span>
            <p className="text-xs font-extrabold text-slate-900 mt-0.5">{exp.durationDays} Days</p>
          </div>
          <div>
            <span className="text-[9px] font-bold text-slate-400 uppercase">Seats</span>
            <p className="text-xs font-extrabold text-emerald-700 mt-0.5">{exp.availableSeats} Left</p>
          </div>
          <div>
            <span className="text-[9px] font-bold text-slate-400 uppercase">Basecamp</span>
            <p className="text-xs font-extrabold text-slate-900 truncate mt-0.5">{exp.basecamp.split(' ')[0]}</p>
          </div>
        </div>

        {/* Flagship High-Pass Indigo "Ask Trail AI" Action Pill */}
        <div className="rounded-2xl bg-gradient-to-r from-indigo-50 via-white to-purple-50 border-2 border-[#5046E4]/30 p-3 shadow-xs flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#5046E4] text-white flex items-center justify-center shadow-xs">
              <Bot className="w-4 h-4 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-xs font-extrabold text-slate-900">Trail Q&A AI</span>
                <span className="text-[9px] font-bold text-[#5046E4] bg-indigo-50 px-1.5 py-0.2 rounded border border-indigo-100">
                  Grounded
                </span>
              </div>
              <p className="text-[10px] text-slate-500">Ask Diamox, snow, phone signal, camps</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsQnAOpen(true)}
            className="bg-[#5046E4] hover:bg-indigo-700 active:scale-95 text-white text-xs font-extrabold py-1.5 px-3 rounded-xl shadow-pill flex items-center space-x-1 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Ask Trail AI</span>
          </button>
        </div>

        {/* Tabs Navigation */}
        <div className="flex items-center border-b border-slate-200">
          {(['overview', 'itinerary', 'elevation', 'gear'] as const).map(tab => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 text-xs font-bold capitalize transition-all border-b-2 -mb-px text-center ${
                activeTab === tab
                  ? 'border-[#5046E4] text-[#5046E4]'
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              {tab === 'gear' ? 'Gear & Prep' : tab}
            </button>
          ))}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Traveller Style Fit</span>
              <p className="font-semibold text-slate-800">{exp.travellerStyle}</p>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Expedition Summary</span>
              <p className="text-slate-600 leading-relaxed">{exp.travellerSummary}</p>
            </div>

            {/* Guide Card */}
            <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center space-x-3">
              <img
                src={exp.guide.avatar}
                alt={exp.guide.name}
                className="w-11 h-11 rounded-full object-cover border-2 border-indigo-100"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-1.5">
                  <h4 className="font-extrabold text-xs text-slate-900 truncate">{exp.guide.name}</h4>
                  <span className="text-[9px] font-bold text-[#5046E4] bg-indigo-50 px-1 rounded">
                    ★ {exp.guide.rating}
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 font-medium">{exp.guide.badge}</p>
              </div>
              <a
                href={`tel:${exp.guide.phone || '+919876543210'}`}
                className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center hover:bg-emerald-100 transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 bg-slate-50 p-2.5 rounded-xl">
              <span>Next Confirmed Batch:</span>
              <span className="font-bold text-slate-900">{exp.batchDateLabel}</span>
            </div>
          </div>
        )}

        {/* TAB 2: ITINERARY */}
        {activeTab === 'itinerary' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-800">Route Milestones</span>
              <span className="text-[10px] text-slate-400">{exp.itinerary.length} Days</span>
            </div>

            <div className="relative pl-4 space-y-4 before:absolute before:left-1.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-indigo-100">
              {exp.itinerary.map(day => (
                <div key={day.day} className="relative space-y-1">
                  <div className="absolute -left-4 top-1 w-3 h-3 rounded-full bg-[#5046E4] ring-4 ring-white" />
                  
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-extrabold text-slate-900">
                      Day {day.day}: {day.title}
                    </span>
                    <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">
                      {day.altitudeFt.toLocaleString()} ft
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-600 leading-relaxed">{day.description}</p>
                  
                  {day.highlight && (
                    <div className="flex items-center space-x-1 text-[10px] text-[#5046E4] font-medium pt-0.5">
                      <Sparkles className="w-3 h-3" />
                      <span>{day.highlight}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: ELEVATION PROFILE */}
        {activeTab === 'elevation' && (
          <div className="space-y-3">
            <div className="p-3 rounded-2xl bg-slate-900 text-white space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">Summit Elevation</span>
                  <p className="text-lg font-extrabold">{exp.maxAltitudeFt.toLocaleString()} ft</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Altitude Gain</span>
                  <p className="text-xs font-bold text-emerald-400">
                    +{(exp.maxAltitudeFt - exp.itinerary[0].altitudeFt).toLocaleString()} ft
                  </p>
                </div>
              </div>

              {/* Graphic Elevation Curve */}
              <div className="pt-4 pb-2">
                <div className="h-28 flex items-end justify-between gap-1 border-b border-slate-700 px-1">
                  {exp.itinerary.map((d, i) => {
                    const minAlt = 4000;
                    const heightPercent = Math.max(15, Math.min(100, ((d.altitudeFt - minAlt) / (exp.maxAltitudeFt - minAlt + 1000)) * 100));
                    const isSummit = d.altitudeFt === exp.maxAltitudeFt;

                    return (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                        <span className={`text-[8px] font-bold ${isSummit ? 'text-amber-400' : 'text-slate-400'}`}>
                          {d.altitudeFt > 9999 ? `${(d.altitudeFt/1000).toFixed(1)}k` : d.altitudeFt}
                        </span>
                        <div
                          style={{ height: `${heightPercent}%` }}
                          className={`w-full rounded-t-md transition-all ${
                            isSummit
                              ? 'bg-gradient-to-t from-amber-500 to-[#FF9F1C] ring-2 ring-amber-300'
                              : 'bg-gradient-to-t from-indigo-900 to-[#5046E4]'
                          }`}
                        />
                        <span className="text-[9px] font-bold text-slate-400 mt-1">D{d.day}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <p className="text-[10px] text-slate-300 leading-tight">
                Daily altitude gain strictly conforms to UIAA high-altitude safety guidelines (average ≤ 2,500 ft/day).
              </p>
            </div>
          </div>
        )}

        {/* TAB 4: GEAR & PREP */}
        {activeTab === 'gear' && (
          <div className="space-y-3">
            <div className="p-3 rounded-2xl bg-[#E9EDFF] border border-indigo-200 flex items-center justify-between">
              <div className="space-y-0.5">
                <h4 className="text-xs font-extrabold text-[#5046E4]">Personalize Prep Plan</h4>
                <p className="text-[10px] text-indigo-900">Get altitude pacing & cold weather advice</p>
              </div>
              <button
                type="button"
                onClick={() => setTrekkerTab('gear')}
                className="bg-[#5046E4] text-white text-xs font-bold py-1.5 px-3 rounded-xl shadow-xs"
              >
                Open Advisor
              </button>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Expedition Gear Checklist ({exp.gearList.length})
              </span>
              <div className="space-y-1.5">
                {exp.gearList.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center space-x-2">
                      <span className={`w-1.5 h-1.5 rounded-full ${item.required ? 'bg-red-500' : 'bg-slate-400'}`} />
                      <span className="font-semibold text-slate-800">{item.name}</span>
                    </div>

                    <div className="flex items-center space-x-1.5">
                      {item.required && (
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-red-50 text-red-700 border border-red-200/60">
                          Mandatory
                        </span>
                      )}
                      {item.rentable && (
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-indigo-50 text-[#5046E4] border border-indigo-200/60">
                          Rent at Base
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Sticky Bottom Booking Dock */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[390px] mx-auto z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 flex items-center justify-between">
        <div>
          <span className="text-[10px] text-slate-400 font-medium">All-Inclusive Price</span>
          <div className="text-base font-extrabold text-slate-900 leading-none">
            ₹{exp.basePriceInr.toLocaleString()}
            <span className="text-[10px] font-normal text-slate-400 ml-1">/ seat</span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => bookSeats(exp.id, 1)}
          className="bg-[#7EC845] hover:bg-[#6EB43C] active:scale-95 text-white font-extrabold text-xs py-2.5 px-5 rounded-xl shadow-md shadow-emerald-100 flex items-center space-x-1.5 transition-all"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Book Batch Seat</span>
        </button>
      </div>

      {/* Flagship Contextual Trail Q&A Sheet Drawer */}
      {isQnAOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          <div
            onClick={() => setIsQnAOpen(false)}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
          />

          <div className="relative z-10 bg-white rounded-t-3xl shadow-sheet max-h-[85vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-200">
            {/* Header */}
            <div className="pt-2.5 pb-2 px-4 border-b border-slate-100 flex flex-col items-center">
              <div className="w-10 h-1 rounded-full bg-slate-300 mb-2" />
              <div className="w-full flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-7 h-7 rounded-xl bg-[#5046E4] text-white flex items-center justify-center">
                    <Bot className="w-4 h-4 text-amber-300" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-xs text-slate-900">Trail AI · {exp.title}</h3>
                    <p className="text-[10px] text-slate-500">Route-grounded mountain intelligence</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsQnAOpen(false)}
                  className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Conversation Area */}
            <div className="p-4 overflow-y-auto thin-scrollbar space-y-3 flex-1 min-h-[220px]">
              {conversation.map((msg, i) => (
                <div
                  key={i}
                  className={`flex space-x-2 text-xs ${
                    msg.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {msg.role === 'model' && (
                    <div className="w-6 h-6 rounded-lg bg-[#5046E4] text-white flex items-center justify-center shrink-0 mt-0.5">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div
                    className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-[#5046E4] text-white rounded-tr-xs'
                        : 'bg-slate-100 text-slate-800 rounded-tl-xs'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {isAsking && (
                <div className="flex items-center space-x-2 text-xs text-slate-400">
                  <div className="w-6 h-6 rounded-lg bg-indigo-100 text-[#5046E4] flex items-center justify-center shrink-0">
                    <Sparkles className="w-3.5 h-3.5 animate-spin" />
                  </div>
                  <span>Checking itinerary and route logs with Gemini...</span>
                </div>
              )}
            </div>

            {/* Smart Tap-to-Ask Follow-Up Chips */}
            <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 space-y-1">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Suggested questions</span>
              <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar py-0.5">
                {suggestedFollowUps.map((chip, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleAskQuestion(chip)}
                    disabled={isAsking}
                    className="text-[10px] font-medium text-slate-700 bg-white hover:bg-indigo-50 active:bg-indigo-100 px-2.5 py-1 rounded-full border border-slate-200 whitespace-nowrap shadow-xs transition-colors shrink-0"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>

            {/* Text Input Row */}
            <div className="p-3 bg-white border-t border-slate-200 flex items-center space-x-2">
              <input
                type="text"
                value={questionInput}
                onChange={(e) => setQuestionInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAskQuestion()}
                placeholder="Ask about snowfall, terrain, water..."
                className="flex-1 text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-[#5046E4] text-slate-800 placeholder:text-slate-400"
              />
              <button
                type="button"
                onClick={() => handleAskQuestion()}
                disabled={isAsking || !questionInput.trim()}
                className="w-9 h-9 rounded-xl bg-[#5046E4] text-white flex items-center justify-center hover:bg-indigo-700 active:scale-95 disabled:opacity-50 transition-all shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
