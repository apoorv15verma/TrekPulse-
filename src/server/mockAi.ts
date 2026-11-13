import { 
  GenerateTrekResponse, 
  MatchTreksResponse, 
  TrailQnAResponse, 
  PrepAdvisorResponse, 
  Expedition, 
  ExpeditionSummary,
  Region,
  Difficulty
} from '../types/trek';

const COVER_IMAGES: Record<string, string> = {
  Uttarakhand: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1000&q=80',
  Himachal: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80',
  Kashmir: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1000&q=80',
  Sikkim: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1000&q=80',
  Ladakh: 'https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?auto=format&fit=crop&w=1000&q=80',
};

export function mockGenerateTrek(prompt: string, preferredRegion?: string): GenerateTrekResponse {
  const p = prompt.toLowerCase();
  
  let region: Region = (preferredRegion as Region) || 'Uttarakhand';
  if (p.includes('himachal') || p.includes('manali') || p.includes('spiti')) region = 'Himachal';
  else if (p.includes('kashmir') || p.includes('sonamarg') || p.includes('srinagar')) region = 'Kashmir';
  else if (p.includes('sikkim') || p.includes('kanchenjunga')) region = 'Sikkim';
  else if (p.includes('ladakh') || p.includes('leh') || p.includes('zanskar')) region = 'Ladakh';

  let difficulty: Difficulty = 'Moderate';
  let maxAltitude = 12500;
  let durationDays = 5;
  let price = 8999;

  if (p.includes('beginner') || p.includes('first') || p.includes('easy')) {
    difficulty = 'Easy';
    maxAltitude = 11800;
    durationDays = 4;
    price = 7800;
  } else if (p.includes('challenge') || p.includes('14k') || p.includes('15k') || p.includes('difficult') || p.includes('pass')) {
    difficulty = 'Difficult';
    maxAltitude = 14850;
    durationDays = 6;
    price = 12500;
  } else if (p.includes('photo') || p.includes('meadow') || p.includes('lake') || p.includes('slow')) {
    difficulty = 'Moderate';
    maxAltitude = 12200;
    durationDays = 5;
    price = 9500;
  }

  // Extract budget hint if present (e.g. "under ₹11k" or "10000")
  const budgetMatch = prompt.match(/(?:under|below|₹|rs\.?)\s*(\d{1,2}(?:,\d{3})*|\d+)(?:k)?/i);
  if (budgetMatch) {
    const raw = budgetMatch[1].replace(/,/g, '');
    let val = parseInt(raw, 10);
    if (val < 100) val *= 1000;
    if (val > 4000 && val < 40000) {
      price = Math.round((val * 0.88) / 100) * 100;
    }
  }

  let title = 'Winter Valley & Snow Ridge Expedition';
  let subtitle = 'Curated high-altitude adventure designed for comfort, vistas, and steady pacing';
  let basecamp = 'Sankri Base (6,400 ft)';

  if (region === 'Uttarakhand') {
    title = p.includes('snow') ? 'Kuari Pass Winter Amphitheatre' : 'Dayara Bugyal Alpine Meadow Traverse';
    subtitle = 'Pristine snowline trail with unbroken views of Mt. Nanda Devi & Trishul';
    basecamp = p.includes('snow') ? 'Joshimath / Dhak (6,850 ft)' : 'Barsu / Raithal (7,200 ft)';
  } else if (region === 'Himachal') {
    title = 'Bhrigu Lake Alpine Ridge Trail';
    subtitle = 'High-altitude glacial lake nestled above the clouds in Kullu valley';
    basecamp = 'Gulaba / Manali (6,725 ft)';
  } else if (region === 'Kashmir') {
    title = 'Tarsar Marsar Twin Alpine Lakes';
    subtitle = 'Almond-shaped emerald glacial lakes tucked inside the Kolahoi mountain massif';
    basecamp = 'Aru Valley (7,958 ft)';
  } else if (region === 'Ladakh') {
    title = 'Sham Valley Heritage & Ridge Walk';
    subtitle = 'Gentle Himalayan apricot valley trail passing through ancient Ladakhi settlements';
    basecamp = 'Likir / Leh (11,500 ft)';
  } else if (region === 'Sikkim') {
    title = 'Dzongri Viewpoint & Kanchenjunga Sanctuary';
    subtitle = 'Trek through rhododendron forests to the grand panorama of Kanchenjunga';
    basecamp = 'Yuksom (5,840 ft)';
  }

  const itinerary = [
    {
      day: 1,
      title: `Arrival at ${basecamp.split(' ')[0]} Basecamp`,
      campName: `${basecamp.split(' ')[0]} Mountain Homestay`,
      altitudeFt: 6800,
      distanceKm: 180,
      description: 'Mountain road journey through river valleys. Acclimatization walk, document verification, and evening safety briefing.',
      highlight: 'Warm local mountain dinner & team orientation'
    },
    {
      day: 2,
      title: 'Trailhead Ascent into Oak & Pine Forest',
      campName: 'Rhododendron Camp 1',
      altitudeFt: 9200,
      distanceKm: 5,
      description: 'Steady gradual ascent on cushioned pine needles opening into snowy clearings with distant snow ridges.',
      highlight: 'First snowline contact and hot trail tea'
    },
    {
      day: 3,
      title: 'Climbing to Alpine Ridge Camp',
      campName: 'High Ridge Basecamp',
      altitudeFt: 11400,
      distanceKm: 5.5,
      description: 'Break tree line into expansive alpine terrain. Microspike orientation and evening ridge photography.',
      highlight: 'Alpenglow reflection on high Himalayan crests'
    },
    {
      day: 4,
      title: `Summit Push (${maxAltitude.toLocaleString()} ft) & Descent`,
      campName: 'Lower Meadow Camp',
      altitudeFt: maxAltitude,
      distanceKm: 7,
      description: `Early morning alpine push to the highest ridge crest at ${maxAltitude.toLocaleString()} ft. Celebration at summit cairn followed by controlled descent.`,
      highlight: `Standing on the ${maxAltitude.toLocaleString()} ft summit panorama`
    },
    {
      day: 5,
      title: 'Descent to Basecamp & Departure',
      campName: 'Roadhead Return Hub',
      altitudeFt: 6200,
      distanceKm: 6,
      description: 'Gentle descent through terrace farmlands to roadhead. Debriefing, certificate handover, and shared transport back to transit hub.',
      highlight: 'Celebratory farewell meal with mountain crew'
    }
  ];

  return {
    title,
    subtitle,
    region,
    difficulty,
    travellerStyle: 'Custom tailored: ' + (prompt.slice(0, 75) + '...'),
    travellerSummary: `Specially generated expedition draft reflecting the brief: "${prompt}". Balanced elevation curve with safe altitude ascent thresholds, comfortable camp distances, and authentic mountain hospitality.`,
    maxAltitudeFt: maxAltitude,
    basePriceInr: price,
    basecamp,
    durationDays,
    batchDateLabel: '24 Dec – 29 Dec 2026',
    totalSeats: 16,
    coverKey: COVER_IMAGES[region],
    itinerary,
    gearList: [
      { category: 'Footwear', name: 'Waterproof High-Ankle Trekking Boots', required: true, rentable: true },
      { category: 'Clothing', name: 'Thermal Base Layers (Merino Wool/Synthetic)', required: true, rentable: false },
      { category: 'Clothing', name: 'Heavy Down Jacket rated to -10°C', required: true, rentable: true },
      { category: 'Technical', name: 'Microspikes & Gaiters Set', required: true, rentable: true },
      { category: 'Technical', name: 'Trekking Poles with Snow Baskets', required: false, rentable: true },
      { category: 'Personal', name: 'Polarized Sunglasses & SPF 50 Sunscreen', required: true, rentable: false },
      { category: 'Personal', name: '1L Insulated Hot-Water Flask', required: true, rentable: false }
    ]
  };
}

export function mockMatchTreks(
  preferences: { fitness: string; maxDays: string; budgetInr: string; query: string },
  expeditions: ExpeditionSummary[]
): MatchTreksResponse {
  const query = (preferences.query || '').toLowerCase();
  const fitness = (preferences.fitness || '').toLowerCase();
  const maxDaysStr = preferences.maxDays || '7';
  const maxDays = parseInt(maxDaysStr.replace(/\D/g, ''), 10) || 7;

  let ranked = [...expeditions];

  // Score matches
  ranked.sort((a, b) => {
    let scoreA = 0;
    let scoreB = 0;

    // Fitness matching
    if (fitness.includes('beginner') || fitness.includes('easy')) {
      if (a.difficulty === 'Easy') scoreA += 30;
      if (b.difficulty === 'Easy') scoreB += 30;
      if (a.difficulty === 'Moderate') scoreA += 15;
      if (b.difficulty === 'Moderate') scoreB += 15;
    } else if (fitness.includes('advanced') || fitness.includes('fit') || fitness.includes('difficult')) {
      if (a.difficulty === 'Difficult') scoreA += 30;
      if (b.difficulty === 'Difficult') scoreB += 30;
      if (a.difficulty === 'Moderate') scoreA += 15;
      if (b.difficulty === 'Moderate') scoreB += 15;
    }

    // Days matching
    if (a.durationDays <= maxDays) scoreA += 20;
    if (b.durationDays <= maxDays) scoreB += 20;

    // Query terms matching
    if (query) {
      if (query.includes('snow') && (a.title.toLowerCase().includes('winter') || a.title.toLowerCase().includes('snow') || a.title.toLowerCase().includes('kedarkantha'))) scoreA += 25;
      if (query.includes('snow') && (b.title.toLowerCase().includes('winter') || b.title.toLowerCase().includes('snow') || b.title.toLowerCase().includes('kedarkantha'))) scoreB += 25;

      if (query.includes('lake') && (a.title.toLowerCase().includes('lake') || a.title.toLowerCase().includes('tal'))) scoreA += 25;
      if (query.includes('lake') && (b.title.toLowerCase().includes('lake') || b.title.toLowerCase().includes('tal'))) scoreB += 25;

      if (query.includes('dec') || query.includes('winter')) {
        if (a.region === 'Uttarakhand') scoreA += 15;
        if (b.region === 'Uttarakhand') scoreB += 15;
      }
    }

    return scoreB - scoreA;
  });

  const topMatches = ranked.slice(0, 3).map((exp, idx) => {
    let matchHeadline = 'Top Match for your criteria';
    let reason = `Fits your ${preferences.fitness || 'current'} fitness profile with a balanced ${exp.durationDays}-day timeline at ₹${exp.price.toLocaleString()}.`;
    let caution = 'Maintain steady hydration (3.5L/day) above 10,000 ft.';

    if (idx === 0) {
      matchHeadline = 'Best Overall Match';
      if (exp.difficulty === 'Easy') {
        reason = `Gentle ascent slope to ${exp.maxAltitudeFt.toLocaleString()} ft makes it exceptionally safe for your fitness level without compromising on Himalayan summits.`;
        caution = 'Sub-zero summit morning requires a warm thermal base layer and microspikes.';
      } else if (exp.difficulty === 'Moderate') {
        reason = `Outstanding scenery-to-effort ratio with gradual acclimatization camps up to ${exp.maxAltitudeFt.toLocaleString()} ft.`;
        caution = 'Cold ridge winds on days 3 and 4 call for a windproof outer shell.';
      } else {
        reason = `High-thrill route with rewarding alpine challenges at ${exp.maxAltitudeFt.toLocaleString()} ft.`;
        caution = 'Requires prior endurance training and consistent aerobic conditioning.';
      }
    } else if (idx === 1) {
      matchHeadline = 'Alternative Route with Spectacular Views';
      reason = `Slightly different terrain in ${exp.region} with strong trail support and high guide-to-trekker ratio.`;
      caution = `Check packing list for cold-night camp at ${exp.basecamp}.`;
    } else {
      matchHeadline = 'Budget & Scenery Contender';
      reason = `Competitively priced at ₹${exp.price.toLocaleString()} with panoramic high-pass vistas.`;
      caution = 'Trail features occasional rocky moraine sections.';
    }

    return {
      expeditionId: exp.id,
      matchHeadline,
      reason,
      caution
    };
  });

  return {
    summary: `Analyzed ${expeditions.length} active Himalayan expeditions against your preferences (${preferences.fitness || 'All Fitness'}, ${preferences.maxDays || 'Flexible Days'}, ${preferences.budgetInr || 'Any Budget'}). Found ${topMatches.length} strong contenders.`,
    matches: topMatches
  };
}

export function mockTrailQnA(
  question: string, 
  expedition: Partial<Expedition>
): TrailQnAResponse {
  const q = question.toLowerCase();
  const maxAlt = expedition.maxAltitudeFt || 12500;
  const days = expedition.durationDays || 5;
  const basecamp = expedition.basecamp || 'Basecamp';
  const region = expedition.region || 'Himalayas';

  let answer = '';
  let followUpSuggestions: string[] = [];

  if (q.includes('diamox') || q.includes('altitude') || q.includes('ams') || q.includes('sickness')) {
    answer = `On the ${expedition.title || 'this trek'} (max altitude ${maxAlt.toLocaleString()} ft), AMS is generally preventable through natural pacing. Because daily elevation gain is capped below 2,500 ft between camps, most trekkers with normal fitness acclimatize without medication. However, if you have never been above 10,000 ft, consult a doctor regarding prophylactic Diamox (125mg BD starting at ${basecamp}). Always notify your trek leader immediately if you feel persistent headache or nausea.`;
    followUpSuggestions = [
      'What is the daily hydration requirement?',
      'How cold does it get at high camp?',
      'Can I rent an oximeter at basecamp?'
    ];
  } else if (q.includes('signal') || q.includes('network') || q.includes('phone') || q.includes('cellular') || q.includes('wifi')) {
    answer = `Mobile connectivity on ${expedition.title} is available at ${basecamp} (Airtel and Jio usually have 4G/5G). Once you ascend past Day 1 into the higher valley and camps, cellular network drops completely. We recommend alerting your family that you will be off-grid from Day 2 through Day ${days - 1}. Guides carry satellite radios and emergency VHF communication.`;
    followUpSuggestions = [
      'Are power banks allowed in tents?',
      'Where can I charge camera batteries?',
      'What emergency protocols does the guide carry?'
    ];
  } else if (q.includes('steep') || q.includes('summit day') || q.includes('how hard') || q.includes('difficulty')) {
    answer = `The summit day on ${expedition.title} starts early around 3:30 AM to catch firm snow crust and golden morning views. The climb from high camp to ${maxAlt.toLocaleString()} ft has an average gradient of 22° to 30°, with a few steeper zigzags near the ridge cairn. It takes approximately 3.5 to 4.5 hours of steady ascent, followed by a 2.5-hour descent. Microspikes and trekking poles make this significantly more manageable.`;
    followUpSuggestions = [
      'What time do we wake up for summit push?',
      'Do I need crampons or microspikes?',
      'Is there hot tea provided before the push?'
    ];
  } else if (q.includes('camera') || q.includes('photo') || q.includes('view') || q.includes('scenery')) {
    answer = `The absolute prime photography moments on ${expedition.title} happen during alpenglow at the high camp (sunset around 5:15 PM) and the 360° summit panorama at sunrise. Bring extra camera batteries kept inside warm socks or an inner jacket pocket, as sub-zero night temperatures drain lithium batteries 40% faster.`;
    followUpSuggestions = [
      'Is a drone permitted on this route?',
      'What focal length lens is best for this trek?',
      'How cold are night temperatures in tents?'
    ];
  } else {
    answer = `Regarding your question about "${question}" on ${expedition.title || 'this expedition'}: The route in ${region} is structured over ${days} days with a safe ascent curve leading to ${maxAlt.toLocaleString()} ft. Your certified guide conducts daily pulse oximeter readings and hot meal checkpoints at every camp. Basecamp rentals and briefing take place on Day 1.`;
    followUpSuggestions = [
      'Is Diamox needed on this trek?',
      'How steep is the summit day?',
      'Will my phone get cellular signal?'
    ];
  }

  return { answer, followUpSuggestions };
}

export function mockPrepAdvisor(
  expedition: Partial<Expedition>,
  priorMaxAltitude: string,
  coldSensitivity: string
): PrepAdvisorResponse {
  const targetAlt = expedition.maxAltitudeFt || 12500;
  const isHighJump = priorMaxAltitude.includes('Below 8,000') || priorMaxAltitude.includes('First time');
  const runsCold = coldSensitivity.toLowerCase().includes('high') || coldSensitivity.toLowerCase().includes('cold quickly');

  let acclimatizationSummary = `Target summit is ${targetAlt.toLocaleString()} ft. `;
  if (isHighJump) {
    acclimatizationSummary += `Since your previous maximum exposure is ${priorMaxAltitude}, this route involves a significant altitude elevation jump. The structured camps provide a safe daily ascent of ~2,000 ft, but your body will require disciplined pacing: maintain a slow rhythmic walking pace ('Himalayan shuffle') and never rush ahead of the sweep guide.`;
  } else {
    acclimatizationSummary += `With your prior experience at ${priorMaxAltitude}, your physiology will adapt comfortably to ${targetAlt.toLocaleString()} ft provided you maintain hydration and avoid cold exposure.`;
  }

  const altitudeTips = [
    'Drink 3.5 to 4 Litres of fluids daily: 2L water + 1L electrolyte/ORS + warm soup/tea.',
    'Climb high, sleep low: Participate in the 45-minute evening acclimatization walk above camp on Days 2 and 3.',
    'Avoid caffeine and alcohol 48 hours prior to basecamp arrival.',
    'Monitor morning Resting Heart Rate and SpO2 at guide checkpoints (target SpO2 > 82% at high camp).'
  ];

  if (isHighJump) {
    altitudeTips.unshift('Discuss preventive Diamox (125mg BD) with your doctor for peace of mind given your altitude delta.');
  }

  const priorityGear: PrepAdvisorResponse['priorityGear'] = [
    {
      itemName: 'Waterproof High-Ankle Trekking Boots',
      action: 'Must Pack',
      reason: 'Essential for ankle stability on moraine scree and preventing snow ingress. Break them in 2 weeks before trip.'
    },
    {
      itemName: runsCold ? 'Heavy Down Parka (-15°C rated)' : 'Down Jacket (-10°C rated)',
      action: runsCold ? 'Must Pack' : 'Rent at Basecamp',
      reason: runsCold 
        ? 'High cold sensitivity means camp windchill below -8°C will feel intense. Bring your own high-loft down layer.' 
        : 'Quality high-altitude down jackets are readily available for rent at basecamp homestays (₹350/day).'
    },
    {
      itemName: 'Microspikes & Snow Gaiters',
      action: 'Rent at Basecamp',
      reason: 'Basecamp stock is calibrated specifically for current summit trail ice conditions. Easy to inspect and rent on Day 1.'
    },
    {
      itemName: '100% Merino Wool Thermal Base Layer',
      action: 'Must Pack',
      reason: 'Moisture-wicking next-to-skin layer prevents hypothermia when sweat cools down during summit rest breaks.'
    },
    {
      itemName: 'UV Category 3/4 Polarized Sunglasses',
      action: 'Must Pack',
      reason: 'Snow reflects 80%+ of UV radiation; essential to prevent snow blindness on open high meadows.'
    }
  ];

  if (runsCold) {
    priorityGear.push({
      itemName: 'Fleece Sleeping Bag Liner & Reusable Hand Warmers',
      action: 'Must Pack',
      reason: 'Adds +5°C warmth inside expedition sleeping bags for comfortable undisturbed sleep.'
    });
  }

  return {
    acclimatizationSummary,
    altitudeTips,
    priorityGear
  };
}
