import { Expedition } from '../types/trek';

export const INITIAL_EXPEDITIONS: Expedition[] = [
  {
    id: 'kedarkantha-winter',
    title: 'Kedarkantha Winter Summit',
    subtitle: 'Classic beginner-friendly snow peak with 360° Himalayan amphitheatre',
    region: 'Uttarakhand',
    difficulty: 'Easy',
    travellerStyle: 'First-time winter trekkers, snow lovers, stargazers',
    travellerSummary: 'Perfect introduction to high-altitude winter trekking. Crisp oak forest trails, overnight stay by the mythical Juda Ka Talab lake, and an exhilarating sunrise push to 12,500 ft summit with panoramic vistas of Swargarohini, Bandarpoonch, and Black Peak.',
    maxAltitudeFt: 12500,
    basePriceInr: 8499,
    basecamp: 'Sankri (6,400 ft)',
    durationDays: 5,
    batchDateLabel: '12 Dec – 16 Dec 2026',
    totalSeats: 18,
    availableSeats: 5,
    coverImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1000&q=80',
    guide: {
      name: 'Rajesh Rawat',
      badge: 'Verified Lead Guide · 9 Yrs',
      experienceYrs: 9,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      rating: 4.92,
      phone: '+91 98765 43210'
    },
    itinerary: [
      {
        day: 1,
        title: 'Dehradun to Sankri Basecamp',
        campName: 'Sankri Homestay',
        altitudeFt: 6400,
        distanceKm: 210,
        description: 'Scenic 8-hour drive alongside the Yamuna and Tons rivers through Mussoorie, Purola, and Mori pine valleys.',
        highlight: 'Briefing & gear verification at Sankri'
      },
      {
        day: 2,
        title: 'Sankri to Juda Ka Talab',
        campName: 'Juda Ka Talab Lake Camp',
        altitudeFt: 9100,
        distanceKm: 4,
        description: 'Ascend through dense pine and maple forests to reach the mystical frozen lake nestled beneath towering oak ridges.',
        highlight: 'Camping beside the frozen high-altitude lake'
      },
      {
        day: 3,
        title: 'Juda Ka Talab to Kedarkantha Base',
        campName: 'Kedarkantha Base Camp (KKBC)',
        altitudeFt: 11250,
        distanceKm: 4,
        description: 'Steep incline through snowy clearings opening up to sweeping alpine meadows directly facing the summit ridge.',
        highlight: 'Alpenglow on Bandarpoonch & Swargarohini'
      },
      {
        day: 4,
        title: 'Summit Push (12,500 ft) & Descend to Hargaon',
        campName: 'Hargaon Meadow Camp',
        altitudeFt: 12500,
        distanceKm: 6,
        description: 'Pre-dawn 3:30 AM start with headlamps and microspikes. Reach the Shiva shrine summit right for golden sunrise, then descend to Hargaon.',
        highlight: 'Golden sunrise 360° summit panorama'
      },
      {
        day: 5,
        title: 'Hargaon to Sankri & Dehradun Return',
        campName: 'Dehradun ISBT / Railway Stn',
        altitudeFt: 6400,
        distanceKm: 6,
        description: 'Gentle descent through apple orchards and village terraces to Sankri, followed by transfer back to Dehradun by evening.',
        highlight: 'Local Garhwali celebration lunch'
      }
    ],
    gearList: [
      { category: 'Footwear', name: 'High-Ankle Waterproof Trekking Boots', required: true, rentable: true },
      { category: 'Clothing', name: 'Waterproof Thermal Down Jacket (-10°C)', required: true, rentable: true },
      { category: 'Clothing', name: 'Fleece Mid-Layer & Merino Thermals', required: true, rentable: false },
      { category: 'Technical', name: 'Microspikes & Gaiters Set', required: true, rentable: true },
      { category: 'Technical', name: 'Trekking Poles (Pair)', required: false, rentable: true },
      { category: 'Personal', name: 'UV Category 3 Polarized Glacier Sunglasses', required: true, rentable: false },
      { category: 'Personal', name: 'Thermos Insulated Flask (1 Litre)', required: true, rentable: false }
    ]
  },
  {
    id: 'brahmatal-winter-ridge',
    title: 'Brahmatal Alpine Ridge & Frozen Lake',
    subtitle: 'Dramatic winter ridge walk with up-close views of Mt. Trishul & Nanda Ghunti',
    region: 'Uttarakhand',
    difficulty: 'Moderate',
    travellerStyle: 'Photographers, ridge lovers, fit beginners',
    travellerSummary: 'Famous for its frozen lake where Lord Brahma is said to have meditated. Unmatched vantage points looking directly into the colossal face of Mt. Trishul (7,120m) and panoramic views of the Roopkund trail.',
    maxAltitudeFt: 12250,
    basePriceInr: 9950,
    basecamp: 'Lohajung (7,600 ft)',
    durationDays: 6,
    batchDateLabel: '20 Dec – 25 Dec 2026',
    totalSeats: 16,
    availableSeats: 4,
    coverImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
    guide: {
      name: 'Kavita Negi',
      badge: 'Certified Mountaineer · 7 Yrs',
      experienceYrs: 7,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      rating: 4.96,
      phone: '+91 98234 56789'
    },
    itinerary: [
      {
        day: 1,
        title: 'Kathgodam to Lohajung Base',
        campName: 'Lohajung Lodge',
        altitudeFt: 7600,
        distanceKm: 215,
        description: 'Drive through Almora, Kausani, and Gwaldam with glimpses of Trishul peak.',
        highlight: 'Sun setting over the Pindar valley'
      },
      {
        day: 2,
        title: 'Lohajung to Bekaltal',
        campName: 'Bekaltal Lake Camp',
        altitudeFt: 9680,
        distanceKm: 6,
        description: 'Trek through rhododendron, oak and chestnut groves to the secluded Bekaltal lake.',
        highlight: 'Oak canopy walking over crisp snow'
      },
      {
        day: 3,
        title: 'Bekaltal to Brahmatal Camp',
        campName: 'Brahmatal Meadow Camp',
        altitudeFt: 10450,
        distanceKm: 5,
        description: 'Climb above tree line onto exposed snow ridges with breathtaking Himalayan horizons.',
        highlight: 'First sighting of Mt. Trishul wall'
      },
      {
        day: 4,
        title: 'Brahmatal Top (12,250 ft) to Daldum',
        campName: 'Daldum Forest Camp',
        altitudeFt: 12250,
        distanceKm: 7,
        description: 'Summit the high pass ridge above Brahmatal Lake with jaw-dropping views of Nanda Ghunti and descend to Daldum forest.',
        highlight: '360° view of western Garhwal peaks'
      },
      {
        day: 5,
        title: 'Daldum to Lohajung',
        campName: 'Lohajung Lodge',
        altitudeFt: 7600,
        distanceKm: 4,
        description: 'Easy descent through Malling village back to Lohajung for warm shower and community dinner.',
        highlight: 'Garhwali folklore evening around fireplace'
      },
      {
        day: 6,
        title: 'Lohajung to Kathgodam',
        campName: 'Kathgodam Railway Station',
        altitudeFt: 1800,
        distanceKm: 215,
        description: 'Scenic return journey concluding at Kathgodam by early evening for onward trains.',
        highlight: 'Passing scenic Kausani tea estates'
      }
    ],
    gearList: [
      { category: 'Footwear', name: 'High-Ankle Waterproof Trekking Boots', required: true, rentable: true },
      { category: 'Clothing', name: 'Windproof Shell Jacket with Hardshell Hood', required: true, rentable: true },
      { category: 'Clothing', name: 'Heavy Down Jacket (-12°C)', required: true, rentable: true },
      { category: 'Technical', name: 'Crampons / Microspikes', required: true, rentable: true },
      { category: 'Personal', name: 'Balaclava & Windproof Fleece Gloves', required: true, rentable: false }
    ]
  },
  {
    id: 'hampta-pass-chandratal',
    title: 'Hampta Pass & Chandratal Crossover',
    subtitle: 'High-contrast transition from Kullu lush green to Spiti desert solitude',
    region: 'Himachal',
    difficulty: 'Moderate',
    travellerStyle: 'Crossover seekers, dynamic scenery lovers',
    travellerSummary: 'Nowhere else in the Himalayas do landscapes change so fast: from alpine meadows, silver oak forests, and hanging waterfalls in Manali to the barren, stark moonscape of Spiti, culminating at the jewel-blue Chandratal lake.',
    maxAltitudeFt: 14065,
    basePriceInr: 11200,
    basecamp: 'Manali / Jobra (9,800 ft)',
    durationDays: 5,
    batchDateLabel: '28 Dec – 01 Jan 2027',
    totalSeats: 20,
    availableSeats: 7,
    coverImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80',
    guide: {
      name: 'Tenzin Dorje',
      badge: 'Certified Mountaineer · 11 Yrs',
      experienceYrs: 11,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      rating: 4.88,
      phone: '+91 97111 22334'
    },
    itinerary: [
      {
        day: 1,
        title: 'Manali to Jobra drive & Trek to Chika',
        campName: 'Chika River Campsite',
        altitudeFt: 10100,
        distanceKm: 4,
        description: 'Drive along 42 hairpin bends to Jobra hydro dam; gentle 2-hour walk across birch trees along Rani Nallah river.',
        highlight: 'Cascading Rani Nallah waterfall view'
      },
      {
        day: 2,
        title: 'Chika to Balu Ka Ghera',
        campName: 'Balu Ka Ghera Sands Camp',
        altitudeFt: 11900,
        distanceKm: 6,
        description: 'Cross boulder fields, cross cold streams, and enter the vast glacial sand basin surrounded by jagged granite towers.',
        highlight: 'Challenging knee-deep river crossing'
      },
      {
        day: 3,
        title: 'Balu Ka Ghera over Hampta Pass (14,065 ft) to Shea Goru',
        campName: 'Shea Goru Valley Camp',
        altitudeFt: 14065,
        distanceKm: 7,
        description: 'Steep zigzag ascent to the dramatic pass crest. Step from lush green Kullu into Spiti desert; descend to the oasis camp of Shea Goru.',
        highlight: 'Standing directly at the pass divide'
      },
      {
        day: 4,
        title: 'Shea Goru to Chatru & Excursion to Chandratal',
        campName: 'Chatru Basecamp',
        altitudeFt: 11000,
        distanceKm: 5,
        description: 'Cold morning river crossing at Shea Goru, descend to Chatru roadhead, and drive along rugged Spiti road to the crescent-shaped Moon Lake.',
        highlight: 'Reflection of Chandra Bhaga peaks in Chandratal'
      },
      {
        day: 5,
        title: 'Chatru to Manali via Atal Tunnel',
        campName: 'Manali Mall Road',
        altitudeFt: 6725,
        distanceKm: 85,
        description: 'Spectacular mountain drive back across the engineering marvel of Atal Tunnel arriving in Manali by 3 PM.',
        highlight: 'Rohtang Pass views through the tunnel'
      }
    ],
    gearList: [
      { category: 'Footwear', name: 'Waterproof Boots with Vibram Sole', required: true, rentable: true },
      { category: 'Clothing', name: 'Quick-Dry River Crossing Pants & Floaters', required: true, rentable: false },
      { category: 'Clothing', name: 'Heavy Down Jacket (-10°C)', required: true, rentable: true },
      { category: 'Technical', name: 'Adjustable Trekking Poles with Mud Baskets', required: true, rentable: true },
      { category: 'Personal', name: 'Electrolyte Packets (ORS/Hydration salt)', required: true, rentable: false }
    ]
  },
  {
    id: 'kashmir-great-lakes',
    title: 'Kashmir Great Lakes Alpine Traverse',
    subtitle: 'Turquoise glacial lakes, wildflowers, and untamed Himalayan passes',
    region: 'Kashmir',
    difficulty: 'Difficult',
    travellerStyle: 'Experienced alpine trekkers, wilderness campers',
    travellerSummary: 'The crown jewel of Indian trekking. Every day crosses a dramatic high-altitude pass into a new alpine valley sheltering emerald and turquoise glacial lakes like Vishansar, Kishansar, Gadsar, and Gangabal.',
    maxAltitudeFt: 13800,
    basePriceInr: 15800,
    basecamp: 'Sonamarg / Shitkadi (7,800 ft)',
    durationDays: 7,
    batchDateLabel: '05 Jan – 11 Jan 2027',
    totalSeats: 14,
    availableSeats: 3,
    coverImage: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1000&q=80',
    guide: {
      name: 'Bilal Lone',
      badge: 'Himalayan Rescue Specialist · 12 Yrs',
      experienceYrs: 12,
      avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80',
      rating: 4.98,
      phone: '+91 94190 12345'
    },
    itinerary: [
      {
        day: 1,
        title: 'Srinagar to Sonamarg / Shitkadi',
        campName: 'Shitkadi River Camp',
        altitudeFt: 7800,
        distanceKm: 85,
        description: 'Drive along Sindh river with willow trees and walnut groves to basecamp.',
        highlight: 'Aromatic Kashmiri Rogan Josh camp dinner'
      },
      {
        day: 2,
        title: 'Shitkadi to Nichnai via Shekdur',
        campName: 'Nichnai Meadow Camp',
        altitudeFt: 11500,
        distanceKm: 9,
        description: 'Ascend silver birch and maple forest with sweeping views of Thajiwas glacier to Nichnai valley.',
        highlight: 'Panoramic views of Sonamarg valley'
      },
      {
        day: 3,
        title: 'Nichnai over Nichnai Pass (13,100 ft) to Vishansar',
        campName: 'Vishansar Lake Shore Camp',
        altitudeFt: 12000,
        distanceKm: 12,
        description: 'Cross the high Nichnai pass and descend into wide meadows dotted with wild irises to the cobalt-blue Vishansar lake.',
        highlight: 'Trout fishing & lake reflections'
      },
      {
        day: 4,
        title: 'Vishansar to Gadsar via Gadsar Pass (13,800 ft)',
        campName: 'Gadsar Flower Meadow Camp',
        altitudeFt: 13800,
        distanceKm: 14,
        description: 'Steep climb to Gadsar Pass overlooking both Vishansar & Kishansar twins simultaneously; descend into Gadsar lake valley.',
        highlight: 'Twin lake view from the pass pinnacle'
      },
      {
        day: 5,
        title: 'Gadsar to Satsar Lakes',
        campName: 'Satsar Meadow Camp',
        altitudeFt: 12000,
        distanceKm: 9,
        description: 'Cross military checkpoint and traverse green rolling hills holding a cluster of seven interconnected alpine lakes.',
        highlight: 'Sunset over the remote border ridges'
      },
      {
        day: 6,
        title: 'Satsar over Zaj Pass (13,400 ft) to Gangabal',
        campName: 'Gangabal Lakeside Camp',
        altitudeFt: 11500,
        distanceKm: 11,
        description: 'Cross the rocky Zaj Pass with Mt. Harmukh (5,142m) looming majestic in the backdrop; camp between Gangabal and Nundkol lakes.',
        highlight: 'Mt. Harmukh reflecting in Gangabal lake'
      },
      {
        day: 7,
        title: 'Gangabal to Naranag & Srinagar Return',
        campName: 'Srinagar Dal Lake Houseboat',
        altitudeFt: 7450,
        distanceKm: 15,
        description: 'Long knee-testing descent through Pine forests to the 8th-century stone temple ruins of Naranag, drive to Srinagar.',
        highlight: 'Exploring the ancient Naranag temple'
      }
    ],
    gearList: [
      { category: 'Footwear', name: 'High-Traction Ankle-Support Waterproof Boots', required: true, rentable: true },
      { category: 'Clothing', name: 'Waterproof Rain Poncho / GORE-TEX Jacket', required: true, rentable: true },
      { category: 'Clothing', name: 'Thermal Base Layers & Fleece', required: true, rentable: false },
      { category: 'Technical', name: 'Heavy-Duty Trekking Poles (Pair)', required: true, rentable: true },
      { category: 'Personal', name: 'Water Purification Tablets (Aquatabs)', required: true, rentable: false }
    ]
  },
  {
    id: 'sandakphu-singalila',
    title: 'Sandakphu & Singalila Border Ridge',
    subtitle: 'Walking the Indo-Nepal ridge with views of Everest, Lhotse, and Kanchenjunga',
    region: 'Sikkim',
    difficulty: 'Moderate',
    travellerStyle: 'Panorama seekers, cultural buffs, tea-house lovers',
    travellerSummary: 'Famous for the breathtaking "Sleeping Buddha" formation—where Mt. Kanchenjunga forms the shape of a reclining Buddha. Traverse along the international border of India and Nepal with warm local tea-house hospitality.',
    maxAltitudeFt: 11930,
    basePriceInr: 13500,
    basecamp: 'Manebhanjan (7,054 ft)',
    durationDays: 6,
    batchDateLabel: '15 Jan – 20 Jan 2027',
    totalSeats: 15,
    availableSeats: 6,
    coverImage: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1000&q=80',
    guide: {
      name: 'Pemba Sherpa',
      badge: 'Sikkim Alpine Veteran · 14 Yrs',
      experienceYrs: 14,
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80',
      rating: 4.96,
      phone: '+91 97330 98765'
    },
    itinerary: [
      {
        day: 1,
        title: 'NJP / Bagdogra to Manebhanjan & Tumling',
        campName: 'Tumling Nepal Teahouse',
        altitudeFt: 9600,
        distanceKm: 11,
        description: 'Drive from plains to border town Manebhanjan; gentle uphill trail through Chitre monastery to Tumling.',
        highlight: 'Golden sunset over Kanchenjunga'
      },
      {
        day: 2,
        title: 'Tumling to Kalipokhri',
        campName: 'Kalipokhri Teahouse',
        altitudeFt: 10400,
        distanceKm: 13,
        description: 'Walk inside Singalila National Park, pass through Kaiyakatta and reach the sacred black water lake of Kalipokhri.',
        highlight: 'Witnessing red panda habitat forests'
      },
      {
        day: 3,
        title: 'Kalipokhri to Sandakphu Summit',
        campName: 'Sandakphu Ridge Lodge',
        altitudeFt: 11930,
        distanceKm: 6,
        description: 'Steep climb through Bikheybhanjang (Valley of Poison) to reach Bengal’s highest point with panorama of four of the world’s 5 highest peaks.',
        highlight: 'Everest, Kanchenjunga, Lhotse, Makalu simultaneous view'
      },
      {
        day: 4,
        title: 'Sandakphu to Phalut Alpine Ridge',
        campName: 'Phalut Border Hut',
        altitudeFt: 11811,
        distanceKm: 21,
        description: 'Spectacular 21 km rolling ridge walk with Kanchenjunga right beside your left shoulder all day long.',
        highlight: 'Touching Nepal and India boundary markers'
      },
      {
        day: 5,
        title: 'Phalut to Gorkhey Village',
        campName: 'Gorkhey Pine Cottage',
        altitudeFt: 7700,
        distanceKm: 15,
        description: 'Descent through mystical bamboo and pine forest into the fairy-tale valley of Gorkhey river.',
        highlight: 'Organic farmhouse feast in Gorkhey'
      },
      {
        day: 6,
        title: 'Gorkhey to Sepi & NJP Transfer',
        campName: 'New Jalpaiguri Stn',
        altitudeFt: 400,
        distanceKm: 15,
        description: 'Walk through Rammam village to Sepi suspension bridge, board private vehicles to NJP railway station.',
        highlight: 'Crossing the suspension bridge over Rammam'
      }
    ],
    gearList: [
      { category: 'Footwear', name: 'Comfortable Hiking Shoes with Good Grip', required: true, rentable: false },
      { category: 'Clothing', name: 'Windproof Shell & Fleece Jacket', required: true, rentable: true },
      { category: 'Clothing', name: 'Thermal Inners & Woolen Gloves', required: true, rentable: false },
      { category: 'Technical', name: 'Trekking Pole (Single or Pair)', required: false, rentable: true },
      { category: 'Personal', name: 'Power Bank (10,000+ mAh) for cold temperatures', required: true, rentable: false }
    ]
  },
  {
    id: 'markha-valley-ladakh',
    title: 'Markha Valley & Kongmaru La Circuit',
    subtitle: 'Cross cold rivers and high passes under the shadow of Kang Yatse peak',
    region: 'Ladakh',
    difficulty: 'Difficult',
    travellerStyle: 'High-altitude endurance seekers, cultural heritage buffs',
    travellerSummary: 'The most popular Ladakh trek for good reason. Walk through Hemis National Park, visit ancient cliffside monasteries, cross waist-deep rivers, and conquer the 17,060 ft Kongmaru La pass with staggering views of the Karakoram range.',
    maxAltitudeFt: 17060,
    basePriceInr: 19900,
    basecamp: 'Leh (11,500 ft)',
    durationDays: 8,
    batchDateLabel: '22 Jan – 29 Jan 2027',
    totalSeats: 12,
    availableSeats: 2,
    coverImage: 'https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?auto=format&fit=crop&w=1000&q=80',
    guide: {
      name: 'Stanzin Norbu',
      badge: 'UIAA Certified Guide · 15 Yrs',
      experienceYrs: 15,
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
      rating: 5.0,
      phone: '+91 94199 87654'
    },
    itinerary: [
      {
        day: 1,
        title: 'Acclimatization in Leh & Shanti Stupa',
        campName: 'Leh Heritage Hotel',
        altitudeFt: 11500,
        distanceKm: 0,
        description: 'Mandatory rest day in Leh to adapt to thin air. Hydrate, short evening stroll to Shanti Stupa for sunset.',
        highlight: 'Sunset prayer bells at Shanti Stupa'
      },
      {
        day: 2,
        title: 'Leh to Chilling & Trek to Skiu',
        campName: 'Skiu Village Camp',
        altitudeFt: 11150,
        distanceKm: 7,
        description: 'Drive along Indus-Zanskar confluence, cross Zanskar river on bridge, trek into Markha gorge.',
        highlight: 'Crossing ancient Buddhist chortens'
      },
      {
        day: 3,
        title: 'Skiu to Sara',
        campName: 'Sara Riverside Camp',
        altitudeFt: 11600,
        distanceKm: 10,
        description: 'Gentle walk along Markha river crossing wild rose bushes and traditional Ladakhi mills.',
        highlight: 'Tea with local nomads at Chalak'
      },
      {
        day: 4,
        title: 'Sara to Markha Village',
        campName: 'Markha Fortress Camp',
        altitudeFt: 12450,
        distanceKm: 11,
        description: 'Arrive at the largest village in the valley with ruined hill fort and an ancient monastery perched on cliff.',
        highlight: 'Visiting the 500-year-old Markha Gompa'
      },
      {
        day: 5,
        title: 'Markha to Thachungtse',
        campName: 'Thachungtse Meadow Camp',
        altitudeFt: 13600,
        distanceKm: 12,
        description: 'Cross waist-deep river waters and enter the upper alpine pastures where blue sheep (Bharal) roam.',
        highlight: 'Blue sheep sightings on cliffs'
      },
      {
        day: 6,
        title: 'Thachungtse to Nimaling Plateau',
        campName: 'Nimaling High Camp',
        altitudeFt: 15400,
        distanceKm: 7,
        description: 'Climb onto the vast high plateau of Nimaling dominated by the towering snow dome of Kang Yatse (6,400m).',
        highlight: 'Up-close views of colossal Kang Yatse I & II'
      },
      {
        day: 7,
        title: 'Nimaling over Kongmaru La (17,060 ft) to Chokdo & Leh',
        campName: 'Leh Heritage Hotel',
        altitudeFt: 17060,
        distanceKm: 16,
        description: 'Challenging 2-hour morning climb to the high pass adorned with prayer flags; descent through dramatic multi-colored red rock canyons to Chokdo; drive back to Leh.',
        highlight: 'Kongmaru La pass prayer flags & Karakoram views'
      },
      {
        day: 8,
        title: 'Leh Departure / Buffer Day',
        campName: 'Leh Kushok Bakula Airport',
        altitudeFt: 11500,
        distanceKm: 5,
        description: 'Transfer to Leh airport for early morning flight over the Himalayas.',
        highlight: 'Aerial view of Zanskar & Ladakh ranges'
      }
    ],
    gearList: [
      { category: 'Footwear', name: 'High-Altitude Waterproof Mountaineering Boots', required: true, rentable: true },
      { category: 'Footwear', name: 'Neoprene River-Crossing Booties / Sandals', required: true, rentable: false },
      { category: 'Clothing', name: 'Extreme Cold Down Parka (-20°C)', required: true, rentable: true },
      { category: 'Clothing', name: 'Thermal Windstopper Balaclava', required: true, rentable: false },
      { category: 'Technical', name: 'Dual Adjustable Trekking Poles', required: true, rentable: true },
      { category: 'Personal', name: 'Diamox (Acetazolamide) & Pulse Oximeter', required: true, rentable: false }
    ]
  }
];
