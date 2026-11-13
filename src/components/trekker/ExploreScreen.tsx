import React, { useState } from 'react';
import { useTrekPulse } from '../../context/TrekPulseContext';
import { Region, MatchTreksResponse, MatchedTrek } from '../../types/trek';
import { mockMatchTreks } from '../../server/mockAi';
import { ShimmerCard } from '../common/Shimmer';
import { 
  Sparkles, 
  Search, 
  MapPin, 
  TrendingUp, 
  Calendar, 
  Users, 
  ChevronRight, 
  X, 
  Check, 
  AlertCircle,
  Compass,
  ArrowUpRight
} from 'lucide-react';

const REGIONS: (Region | 'All')[] = ['All', 'Uttarakhand', 'Himachal', 'Kashmir', 'Sikkim', 'Ladakh'];

export const ExploreScreen: React.FC = () => {
  const { expeditions, selectExpedition } = useTrekPulse();

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<Region | 'All'>('All');

  // AI Fit Matcher Sheet State
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [fitness, setFitness] = useState('Beginner');
  const [maxDays, setMaxDays] = useState('5–6 Days');
  const [budget, setBudget] = useState('Under ₹10k');
  const [customGoal, setCustomGoal] = useState('');
  const [isMatching, setIsMatching] = useState(false);
  const [matchResult, setMatchResult] = useState<MatchTreksResponse | null>(null);
  const [matchError, setMatchError] = useState<string | null>(null);

  // Filter expeditions
  const filteredExpeditions = expeditions.filter(exp => {
    const matchesRegion = selectedRegion === 'All' || exp.region === selectedRegion;
    const matchesQuery = !searchQuery.trim() || 
      exp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.region.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRegion && matchesQuery;
  });

  const handleRunMatcher = async () => {
    setIsMatching(true);
    setMatchError(null);

    // Prepare live expeditions summary
    const summaryList = expeditions.map(e => ({
      id: e.id,
      title: e.title,
      region: e.region,
      difficulty: e.difficulty,
      durationDays: e.durationDays,
      price: e.basePriceInr,
      maxAltitudeFt: e.maxAltitudeFt,
      basecamp: e.basecamp
    }));

    try {
      const res = await fetch('/api/ai/match-treks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          preferences: {
            fitness,
            maxDays,
            budgetInr: budget,
            query: customGoal
          },
          expeditionsSummary: summaryList
        })
      });

      if (!res.ok) throw new Error('Matching failed');
      const data: MatchTreksResponse = await res.json();
      setMatchResult(data);
    } catch (err: any) {
      console.warn('Backend API unavailable, falling back to local matcher:', err);
      const fallback = mockMatchTreks(
        { fitness, maxDays, budgetInr: budget, query: customGoal },
        summaryList
      );
      setMatchResult(fallback);
    } finally {
      setIsMatching(false);
    }
  };

  return (
    <div className="p-4 space-y-4 pb-20 overflow-y-auto no-scrollbar relative">
      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search peaks, lakes, regions (e.g. Kedarkantha)..."
          className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5046E4]"
        />
      </div>

      {/* Region Filter Chips */}
      <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar py-0.5">
        {REGIONS.map(reg => (
          <button
            key={reg}
            type="button"
            onClick={() => setSelectedRegion(reg)}
            className={`px-3 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap transition-all ${
              selectedRegion === reg
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {reg}
          </button>
        ))}
      </div>

      {/* Flagship High-Pass Indigo AI Trigger: "Find My Trek Fit" */}
      <div className="rounded-2xl bg-gradient-to-r from-[#5046E4] to-indigo-600 p-3.5 text-white shadow-md shadow-indigo-200 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-white/5 transform skew-x-12" />
        
        <div className="relative z-10 flex items-center justify-between">
          <div className="space-y-0.5 max-w-[210px]">
            <div className="flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-200">
                Gemini Route Fit
              </span>
            </div>
            <h2 className="text-sm font-extrabold tracking-tight">Find My Trek Fit</h2>
            <p className="text-[10px] text-indigo-100 line-clamp-1">
              Match your fitness & days to live Himalayan batches
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setIsSheetOpen(true);
              if (!matchResult) handleRunMatcher();
            }}
            className="bg-white text-[#5046E4] hover:bg-indigo-50 active:scale-95 px-3 py-2 rounded-xl text-xs font-extrabold shadow-sm flex items-center space-x-1 transition-all"
          >
            <span>Match Me</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Expeditions Catalog Title */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <span className="text-xs font-extrabold text-slate-900 tracking-tight">Active Expeditions</span>
          <span className="text-xs text-slate-400 font-medium ml-1.5">({filteredExpeditions.length})</span>
        </div>
        <span className="text-[10px] text-slate-500 font-medium">All guide verified</span>
      </div>

      {/* Expedition Cards List */}
      <div className="space-y-3">
        {filteredExpeditions.map(exp => (
          <div
            key={exp.id}
            onClick={() => selectExpedition(exp.id)}
            className="group rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md hover:border-indigo-200 transition-all overflow-hidden cursor-pointer"
          >
            {/* Card Hero Image */}
            <div className="relative h-36 w-full overflow-hidden bg-slate-100">
              <img
                src={exp.coverImage}
                alt={exp.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Badges on Cover */}
              <div className="absolute top-2.5 left-2.5 flex items-center space-x-1.5">
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-black/60 backdrop-blur-md text-white border border-white/20">
                  {exp.region}
                </span>
                {exp.isCustomHostCreated && (
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-[#7EC845] text-white">
                    New Host Trek
                  </span>
                )}
              </div>

              <div className="absolute top-2.5 right-2.5">
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold text-white ${
                  exp.difficulty === 'Easy' ? 'bg-emerald-600/90' :
                  exp.difficulty === 'Moderate' ? 'bg-[#FF9F1C]' : 'bg-red-600/90'
                }`}>
                  {exp.difficulty}
                </span>
              </div>

              {/* Title & Stats over image bottom */}
              <div className="absolute bottom-2.5 left-3 right-3 text-white">
                <h3 className="font-extrabold text-sm leading-tight drop-shadow-sm">{exp.title}</h3>
                <p className="text-[10px] text-slate-200 line-clamp-1 mt-0.5">{exp.subtitle}</p>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-3 space-y-2.5">
              <div className="grid grid-cols-3 gap-2 py-1.5 px-2 rounded-xl bg-slate-50 text-[11px] font-semibold text-slate-700">
                <div className="flex items-center space-x-1">
                  <TrendingUp className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span className="truncate">{exp.maxAltitudeFt.toLocaleString()} ft</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span className="truncate">{exp.durationDays} Days</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span className="truncate">{exp.availableSeats} Left</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-0.5">
                <div>
                  <span className="text-[10px] text-slate-400 font-medium">From</span>
                  <div className="text-sm font-extrabold text-slate-900 leading-none">
                    ₹{exp.basePriceInr.toLocaleString()}
                    <span className="text-[10px] font-normal text-slate-400 ml-1">/ trekker</span>
                  </div>
                </div>

                <button
                  type="button"
                  className="bg-indigo-50 group-hover:bg-[#5046E4] group-hover:text-white text-[#5046E4] text-xs font-bold py-1.5 px-3 rounded-xl transition-colors flex items-center space-x-1"
                >
                  <span>View Details</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Slide-Up Bottom Sheet: "Find My Trek Fit" */}
      {isSheetOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          {/* Backdrop */}
          <div
            onClick={() => setIsSheetOpen(false)}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
          />

          {/* Drawer Container (rounded-t-3xl) */}
          <div className="relative z-10 bg-white rounded-t-3xl shadow-sheet max-h-[85vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-200">
            {/* Drag Handle & Header */}
            <div className="pt-2.5 pb-2 px-4 border-b border-slate-100 flex flex-col items-center">
              <div className="w-10 h-1 rounded-full bg-slate-300 mb-2" />
              <div className="w-full flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-lg bg-[#5046E4] text-white flex items-center justify-center">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-900">Trekker AI Fit Matcher</h3>
                    <p className="text-[10px] text-slate-500">Live evaluation of {expeditions.length} routes</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsSheetOpen(false)}
                  className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Scrollable Sheet Content */}
            <div className="p-4 overflow-y-auto thin-scrollbar space-y-3.5">
              {/* Fitness Filter */}
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Fitness Level</label>
                <div className="grid grid-cols-3 gap-1.5 mt-1">
                  {['Beginner', 'Moderate', 'Advanced'].map(f => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setFitness(f)}
                      className={`py-1.5 px-2 rounded-xl text-xs font-semibold border transition-all ${
                        fitness === f
                          ? 'bg-[#E9EDFF] border-[#5046E4] text-[#5046E4]'
                          : 'bg-slate-50 border-slate-200 text-slate-600'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Duration & Budget Row */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Max Days</label>
                  <select
                    value={maxDays}
                    onChange={(e) => setMaxDays(e.target.value)}
                    className="w-full mt-1 text-xs p-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 font-medium"
                  >
                    <option value="3–4 Days">3–4 Days</option>
                    <option value="5–6 Days">5–6 Days</option>
                    <option value="7+ Days">7+ Days</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Budget</label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full mt-1 text-xs p-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 font-medium"
                  >
                    <option value="Under ₹10k">Under ₹10,000</option>
                    <option value="₹10k–₹15k">₹10k – ₹15k</option>
                    <option value="Flexible">Any Budget</option>
                  </select>
                </div>
              </div>

              {/* Custom Goal Text */}
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Specific Wish / Goal (Optional)
                </label>
                <input
                  type="text"
                  value={customGoal}
                  onChange={(e) => setCustomGoal(e.target.value)}
                  placeholder="e.g. First snow trek in Dec with lake camping..."
                  className="w-full mt-1 text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#5046E4]"
                />
              </div>

              {/* Run Match Button */}
              <button
                type="button"
                onClick={handleRunMatcher}
                disabled={isMatching}
                className="w-full bg-[#5046E4] hover:bg-indigo-700 active:scale-[0.98] disabled:opacity-50 text-white font-extrabold text-xs py-2.5 px-4 rounded-xl shadow-pill transition-all flex items-center justify-center space-x-1.5"
              >
                {isMatching ? (
                  <>
                    <Sparkles className="w-3.5 h-3.5 animate-spin text-amber-300" />
                    <span>Matching live catalog with Gemini...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>Recalculate AI Trek Matches</span>
                  </>
                )}
              </button>

              {matchError && (
                <div className="text-[11px] text-red-600 bg-red-50 p-2 rounded-lg border border-red-100 flex items-center space-x-1.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{matchError}</span>
                </div>
              )}

              {/* Loading Shimmer while matching */}
              {isMatching && (
                <div className="space-y-2 pt-2">
                  <ShimmerCard />
                  <ShimmerCard />
                </div>
              )}

              {/* Matched Results Display */}
              {matchResult && !isMatching && (
                <div className="space-y-3 pt-2">
                  <div className="p-2.5 rounded-xl bg-indigo-50/80 border border-indigo-100 text-[11px] text-indigo-900 leading-relaxed">
                    <p className="font-semibold">{matchResult.summary}</p>
                  </div>

                  <div className="space-y-2.5">
                    {matchResult.matches.map((item, index) => {
                      const trek = expeditions.find(e => e.id === item.expeditionId);
                      if (!trek) return null;

                      return (
                        <div
                          key={item.expeditionId}
                          onClick={() => {
                            setIsSheetOpen(false);
                            selectExpedition(trek.id);
                          }}
                          className="p-3 rounded-2xl bg-white border border-indigo-200/90 shadow-sm hover:border-[#5046E4] transition-all cursor-pointer space-y-2 group"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#E9EDFF] text-[#5046E4]">
                              #{index + 1} {item.matchHeadline}
                            </span>
                            <span className="text-[11px] font-bold text-slate-900">
                              ₹{trek.basePriceInr.toLocaleString()}
                            </span>
                          </div>

                          <div className="flex items-center space-x-2.5">
                            <img
                              src={trek.coverImage}
                              alt={trek.title}
                              className="w-12 h-12 rounded-xl object-cover shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="font-bold text-xs text-slate-900 truncate group-hover:text-[#5046E4] transition-colors">
                                {trek.title}
                              </h4>
                              <p className="text-[10px] text-slate-500">
                                {trek.region} · {trek.durationDays} Days · {trek.maxAltitudeFt.toLocaleString()} ft
                              </p>
                            </div>
                            <ArrowUpRight className="w-4 h-4 text-[#5046E4] shrink-0" />
                          </div>

                          <div className="text-[11px] text-slate-700 bg-slate-50 p-2 rounded-xl border border-slate-100 space-y-1">
                            <p className="font-medium text-emerald-800">
                              <span className="font-bold">Why it fits: </span>{item.reason}
                            </p>
                            <p className="text-amber-800 text-[10px]">
                              <span className="font-bold">Caution: </span>{item.caution}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
