import React, { useState } from 'react';
import { useTrekPulse } from '../../context/TrekPulseContext';
import { Region, Difficulty, ItineraryDay, GearItem, GenerateTrekResponse } from '../../types/trek';
import { mockGenerateTrek } from '../../server/mockAi';
import { ShimmerCard } from '../common/Shimmer';
import { 
  Sparkles, 
  Send, 
  CheckCircle2, 
  Calendar, 
  MapPin, 
  Compass, 
  DollarSign, 
  TrendingUp, 
  Plus, 
  Trash2, 
  ShieldAlert,
  ArrowRight
} from 'lucide-react';

const STARTER_PROMPTS = [
  '5 IT folks from Pune in December, moderate fitness, want snow & views under ₹11k',
  'Beginners winter snow escape with lake camping under ₹9k',
  'Fit group 14k+ ft challenge crossing high mountain pass'
];

export const GuideCreateTrekScreen: React.FC = () => {
  const { publishTrek, setMode, setTrekkerTab } = useTrekPulse();

  // AI Prompt State
  const [briefPrompt, setBriefPrompt] = useState('');
  const [preferredRegion, setPreferredRegion] = useState<string>('Uttarakhand');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [aiDraftReceived, setAiDraftReceived] = useState(false);

  // Form State
  const [title, setTitle] = useState('Chopta Tungnath & Chandrashila Peak');
  const [subtitle, setSubtitle] = useState('Highest Shiva temple in the world with summit panorama of western Garhwal');
  const [region, setRegion] = useState<Region>('Uttarakhand');
  const [difficulty, setDifficulty] = useState<Difficulty>('Easy');
  const [travellerStyle, setTravellerStyle] = useState('Beginners, spiritual explorers, winter summit aspirants');
  const [travellerSummary, setTravellerSummary] = useState('A scenic trail through dense deodar forests leading to the sacred 1,000-year-old Tungnath temple and Chandrashila 13,100 ft peak.');
  const [maxAltitudeFt, setMaxAltitudeFt] = useState<number>(13100);
  const [basePriceInr, setBasePriceInr] = useState<number>(7999);
  const [basecamp, setBasecamp] = useState('Sari / Chopta (8,790 ft)');
  const [durationDays, setDurationDays] = useState<number>(4);
  const [batchDateLabel, setBatchDateLabel] = useState('18 Dec – 21 Dec 2026');
  const [totalSeats, setTotalSeats] = useState<number>(16);
  const [itinerary, setItinerary] = useState<ItineraryDay[]>([
    {
      day: 1,
      title: 'Rishikesh to Sari Village & Trek to Deoriatal',
      campName: 'Deoriatal Lake Camp',
      altitudeFt: 7800,
      distanceKm: 3,
      description: 'Scenic drive to Sari village; gentle uphill climb to the sacred emerald lake reflecting Chaukhamba peaks.'
    },
    {
      day: 2,
      title: 'Deoriatal to Chopta Meadow',
      campName: 'Chopta Forest Camp',
      altitudeFt: 8790,
      distanceKm: 14,
      description: 'Forest trail through rhododendron and oak woods with undulating gentle gradients.'
    },
    {
      day: 3,
      title: 'Chopta to Tungnath & Chandrashila Summit (13,100 ft)',
      campName: 'Chopta Meadow Camp',
      altitudeFt: 13100,
      distanceKm: 8,
      description: 'Early morning stone-paved trail to Tungnath temple and rocky ridge push to Chandrashila summit.'
    },
    {
      day: 4,
      title: 'Chopta to Rishikesh Return',
      campName: 'Rishikesh Tapovan',
      altitudeFt: 1200,
      distanceKm: 200,
      description: 'Drive back along the Alaknanda and Mandakini confluence at Rudraprayag, returning by 6 PM.'
    }
  ]);

  const [gearList, setGearList] = useState<GearItem[]>([
    { category: 'Footwear', name: 'Waterproof High-Ankle Trekking Boots', required: true, rentable: true },
    { category: 'Clothing', name: 'Thermal Base Layer & Fleece Jacket', required: true, rentable: false },
    { category: 'Clothing', name: 'Down Jacket (-5°C)', required: true, rentable: true },
    { category: 'Technical', name: 'Microspikes for icy summit section', required: true, rentable: true },
    { category: 'Personal', name: 'Thermos Water Flask', required: true, rentable: false }
  ]);

  const handleGenerateAI = async (promptToUse?: string) => {
    const text = promptToUse || briefPrompt;
    if (!text.trim()) {
      setGenerationError('Please enter a brief sentence describing your trek travellers.');
      return;
    }

    setIsGenerating(true);
    setGenerationError(null);

    try {
      const res = await fetch('/api/ai/generate-trek', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: text,
          preferredRegion
        })
      });

      if (!res.ok) throw new Error('AI Generation failed');
      const data: GenerateTrekResponse = await res.json();

      // Hydrate Form smoothly
      setTitle(data.title);
      setSubtitle(data.subtitle);
      setRegion(data.region);
      setDifficulty(data.difficulty);
      setTravellerStyle(data.travellerStyle);
      setTravellerSummary(data.travellerSummary);
      setMaxAltitudeFt(data.maxAltitudeFt);
      setBasePriceInr(data.basePriceInr);
      setBasecamp(data.basecamp);
      setDurationDays(data.durationDays);
      setBatchDateLabel(data.batchDateLabel || '24 Dec – 29 Dec 2026');
      setTotalSeats(data.totalSeats || 16);
      if (data.itinerary && data.itinerary.length > 0) setItinerary(data.itinerary);
      if (data.gearList && data.gearList.length > 0) setGearList(data.gearList);

      setAiDraftReceived(true);
    } catch (err: any) {
      console.warn('Backend API unavailable, falling back to local mountain intelligence:', err);
      const fallback = mockGenerateTrek(text, preferredRegion);
      setTitle(fallback.title);
      setSubtitle(fallback.subtitle);
      setRegion(fallback.region);
      setDifficulty(fallback.difficulty);
      setTravellerStyle(fallback.travellerStyle);
      setTravellerSummary(fallback.travellerSummary);
      setMaxAltitudeFt(fallback.maxAltitudeFt);
      setBasePriceInr(fallback.basePriceInr);
      setBasecamp(fallback.basecamp);
      setDurationDays(fallback.durationDays);
      setBatchDateLabel(fallback.batchDateLabel || '24 Dec – 29 Dec 2026');
      setTotalSeats(fallback.totalSeats || 16);
      if (fallback.itinerary && fallback.itinerary.length > 0) setItinerary(fallback.itinerary);
      if (fallback.gearList && fallback.gearList.length > 0) setGearList(fallback.gearList);
      setAiDraftReceived(true);
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePublish = () => {
    const newId = publishTrek({
      title,
      subtitle,
      region,
      difficulty,
      travellerStyle,
      travellerSummary,
      maxAltitudeFt,
      basePriceInr,
      basecamp,
      durationDays,
      batchDateLabel,
      totalSeats,
      coverImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1000&q=80',
      guide: {
        name: 'You (Guide Ops Lead)',
        badge: 'Verified High-Altitude Host',
        experienceYrs: 8,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
        rating: 5.0,
        phone: '+91 99887 76655'
      },
      itinerary,
      gearList
    });

    // Switch to Trekker mode to see it live!
    setTimeout(() => {
      setMode('trekker');
      setTrekkerTab('detail');
    }, 1200);
  };

  return (
    <div className="p-4 space-y-4 pb-20 overflow-y-auto no-scrollbar">
      {/* Top Banner */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-extrabold text-slate-900 tracking-tight">Quick Trek Builder</h1>
          <p className="text-xs text-slate-500">Draft customized Himalayan routes in seconds</p>
        </div>
        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E9EDFF] text-[#5046E4] border border-indigo-200/60">
          Guide Ops
        </span>
      </div>

      {/* Flagship AI Trip Builder Card */}
      <div className="rounded-2xl bg-gradient-to-br from-indigo-50/90 via-white to-purple-50/50 border-2 border-[#5046E4]/30 p-3.5 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-lg bg-[#5046E4] text-white flex items-center justify-center shadow-xs">
              <Sparkles className="w-4 h-4 text-amber-300" />
            </div>
            <div>
              <span className="font-extrabold text-xs text-slate-900">Draft with AI</span>
              <p className="text-[10px] text-slate-500">From brief sentence to full expedition</p>
            </div>
          </div>
          <span className="text-[9px] font-bold text-[#5046E4] bg-white px-2 py-0.5 rounded-full border border-indigo-100">
            gemini-2.5-flash
          </span>
        </div>

        {/* Starter Chips */}
        <div className="space-y-1.5">
          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Starter brief chips</p>
          <div className="flex flex-col gap-1.5">
            {STARTER_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setBriefPrompt(prompt);
                  handleGenerateAI(prompt);
                }}
                disabled={isGenerating}
                className="text-left text-[11px] font-medium text-slate-700 bg-white hover:bg-indigo-50/80 active:bg-indigo-100 p-2 rounded-xl border border-indigo-100/80 transition-all flex items-center justify-between group"
              >
                <span className="line-clamp-1 flex-1">"{prompt}"</span>
                <Sparkles className="w-3 h-3 text-[#5046E4] opacity-0 group-hover:opacity-100 transition-opacity ml-1.5 shrink-0" />
              </button>
            ))}
          </div>
        </div>

        {/* Custom Input */}
        <div className="space-y-2 pt-1">
          <textarea
            value={briefPrompt}
            onChange={(e) => setBriefPrompt(e.target.value)}
            placeholder="e.g. 5 IT folks from Pune in December, moderate fitness, want snow & views under ₹11k..."
            rows={2}
            className="w-full text-xs p-2.5 rounded-xl border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-[#5046E4] bg-white resize-none text-slate-800 placeholder:text-slate-400"
          />

          <div className="flex items-center space-x-2">
            <select
              value={preferredRegion}
              onChange={(e) => setPreferredRegion(e.target.value)}
              className="text-[11px] bg-white border border-indigo-200 rounded-xl px-2.5 py-1.5 text-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-[#5046E4]"
            >
              <option value="Uttarakhand">Uttarakhand</option>
              <option value="Himachal">Himachal</option>
              <option value="Kashmir">Kashmir</option>
              <option value="Sikkim">Sikkim</option>
              <option value="Ladakh">Ladakh</option>
            </select>

            <button
              type="button"
              onClick={() => handleGenerateAI()}
              disabled={isGenerating || !briefPrompt.trim()}
              className="flex-1 bg-[#5046E4] hover:bg-indigo-700 active:scale-[0.98] disabled:opacity-50 text-white text-xs font-bold py-2 px-3 rounded-xl shadow-pill transition-all flex items-center justify-center space-x-1.5"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="w-3.5 h-3.5 animate-spin text-amber-300" />
                  <span>Drafting Itinerary...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Generate Draft with Gemini</span>
                </>
              )}
            </button>
          </div>

          {generationError && (
            <div className="flex items-center space-x-1.5 text-[11px] text-red-600 bg-red-50 p-2 rounded-lg border border-red-100">
              <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
              <span>{generationError}</span>
            </div>
          )}

          {aiDraftReceived && (
            <div className="flex items-center space-x-1.5 text-[11px] text-emerald-700 bg-emerald-50 p-2 rounded-lg border border-emerald-100">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-600" />
              <span>Draft loaded into editable form below. Review & publish!</span>
            </div>
          )}
        </div>
      </div>

      {/* Shimmer Skeleton Placeholder while generating */}
      {isGenerating && (
        <div className="space-y-3">
          <p className="text-[11px] font-bold text-[#5046E4] flex items-center space-x-1">
            <Sparkles className="w-3 h-3 animate-spin" />
            <span>AI generating camp-by-camp itinerary and elevation curve...</span>
          </p>
          <ShimmerCard />
          <ShimmerCard />
        </div>
      )}

      {/* Editable Trip Form */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-3.5 shadow-xs space-y-3.5">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
            Expedition Blueprint
          </span>
          <span className="text-[10px] text-slate-400 font-medium">Inline Editable</span>
        </div>

        {/* Title & Subtitle */}
        <div className="space-y-2">
          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Trek Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-xs font-semibold p-2 rounded-lg border border-slate-200 text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#5046E4]"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Highlight / Subtitle</label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="w-full text-[11px] p-2 rounded-lg border border-slate-200 text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#5046E4]"
            />
          </div>
        </div>

        {/* Region & Difficulty Row */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Region</label>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value as Region)}
              className="w-full text-xs p-2 rounded-lg border border-slate-200 text-slate-800 bg-white font-medium"
            >
              <option value="Uttarakhand">Uttarakhand</option>
              <option value="Himachal">Himachal</option>
              <option value="Kashmir">Kashmir</option>
              <option value="Sikkim">Sikkim</option>
              <option value="Ladakh">Ladakh</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Difficulty</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as Difficulty)}
              className="w-full text-xs p-2 rounded-lg border border-slate-200 text-slate-800 bg-white font-medium"
            >
              <option value="Easy">Easy</option>
              <option value="Moderate">Moderate</option>
              <option value="Difficult">Difficult</option>
              <option value="Challenging">Challenging</option>
            </select>
          </div>
        </div>

        {/* Metrics Row: Price, Altitude, Days */}
        <div className="grid grid-cols-3 gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
          <div>
            <label className="text-[9px] font-bold text-slate-500 uppercase">Base Price</label>
            <div className="flex items-center text-xs font-bold text-slate-900 mt-0.5">
              <span>₹</span>
              <input
                type="number"
                value={basePriceInr}
                onChange={(e) => setBasePriceInr(Number(e.target.value))}
                className="w-full bg-transparent p-0 text-xs font-bold focus:outline-none ml-0.5"
              />
            </div>
          </div>

          <div>
            <label className="text-[9px] font-bold text-amber-600 uppercase">Max Alt</label>
            <div className="flex items-center text-xs font-bold text-slate-900 mt-0.5">
              <input
                type="number"
                value={maxAltitudeFt}
                onChange={(e) => setMaxAltitudeFt(Number(e.target.value))}
                className="w-full bg-transparent p-0 text-xs font-bold focus:outline-none"
              />
              <span className="text-[10px] text-slate-500 font-normal">ft</span>
            </div>
          </div>

          <div>
            <label className="text-[9px] font-bold text-slate-500 uppercase">Duration</label>
            <div className="flex items-center text-xs font-bold text-slate-900 mt-0.5">
              <input
                type="number"
                value={durationDays}
                onChange={(e) => setDurationDays(Number(e.target.value))}
                className="w-10 bg-transparent p-0 text-xs font-bold focus:outline-none"
              />
              <span className="text-[10px] text-slate-500 font-normal">Days</span>
            </div>
          </div>
        </div>

        {/* Basecamp & Dates */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Basecamp</label>
            <input
              type="text"
              value={basecamp}
              onChange={(e) => setBasecamp(e.target.value)}
              className="w-full text-xs p-2 rounded-lg border border-slate-200 text-slate-800"
            />
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Batch Dates</label>
            <input
              type="text"
              value={batchDateLabel}
              onChange={(e) => setBatchDateLabel(e.target.value)}
              className="w-full text-xs p-2 rounded-lg border border-slate-200 text-slate-800"
            />
          </div>
        </div>

        {/* Day-by-Day Itinerary Preview */}
        <div className="space-y-2 pt-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              Itinerary ({itinerary.length} Days)
            </span>
            <button
              type="button"
              onClick={() => {
                const nextDay = itinerary.length + 1;
                setItinerary(prev => [
                  ...prev,
                  {
                    day: nextDay,
                    title: `Day ${nextDay} Trail Segment`,
                    campName: `Camp ${nextDay}`,
                    altitudeFt: maxAltitudeFt,
                    distanceKm: 5,
                    description: 'Ascent / ridge transition.'
                  }
                ]);
              }}
              className="text-[10px] font-bold text-[#5046E4] flex items-center space-x-0.5"
            >
              <Plus className="w-3 h-3" />
              <span>Add Day</span>
            </button>
          </div>

          <div className="space-y-2 max-h-48 overflow-y-auto thin-scrollbar pr-1">
            {itinerary.map((day, idx) => (
              <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs space-y-1">
                <div className="flex items-center justify-between font-bold text-slate-800">
                  <span className="text-[#5046E4]">Day {day.day}: {day.title}</span>
                  <span className="text-[10px] font-mono text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200/50">
                    {day.altitudeFt.toLocaleString()} ft
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 line-clamp-2">{day.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Gear List Preview */}
        <div className="space-y-1.5 pt-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Mandatory & Rental Gear ({gearList.length} items)
          </span>
          <div className="flex flex-wrap gap-1.5">
            {gearList.map((g, i) => (
              <span
                key={i}
                className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200 flex items-center space-x-1"
              >
                <span>{g.name}</span>
                {g.rentable && <span className="text-[#5046E4] font-bold">· Rent</span>}
              </span>
            ))}
          </div>
        </div>

        {/* Publish Action Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={handlePublish}
            className="w-full bg-[#7EC845] hover:bg-[#6EB43C] active:scale-[0.98] text-white font-extrabold text-sm py-3 px-4 rounded-xl shadow-md shadow-emerald-200 transition-all flex items-center justify-center space-x-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Publish Trek to Marketplace</span>
          </button>
          <p className="text-[10px] text-center text-slate-400 mt-1.5">
            Instantly visible to trekkers in Explore & Trekker Fit Matcher
          </p>
        </div>
      </div>
    </div>
  );
};
