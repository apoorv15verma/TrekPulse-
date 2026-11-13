export type Region = 'Uttarakhand' | 'Himachal' | 'Kashmir' | 'Sikkim' | 'Ladakh';
export type Difficulty = 'Easy' | 'Moderate' | 'Difficult' | 'Challenging';

export interface ItineraryDay {
  day: number;
  title: string;
  campName: string;
  altitudeFt: number;
  distanceKm: number;
  description: string;
  highlight?: string;
}

export interface GearItem {
  category: 'Clothing' | 'Footwear' | 'Technical' | 'Personal';
  name: string;
  required: boolean;
  rentable: boolean;
}

export interface GuideInfo {
  name: string;
  badge: string;
  experienceYrs: number;
  avatar: string;
  rating: number;
  phone?: string;
}

export interface Expedition {
  id: string;
  title: string;
  subtitle: string;
  region: Region;
  difficulty: Difficulty;
  travellerStyle: string;
  travellerSummary: string;
  maxAltitudeFt: number;
  basePriceInr: number;
  basecamp: string;
  durationDays: number;
  batchDateLabel: string;
  totalSeats: number;
  availableSeats: number;
  coverImage: string;
  guide: GuideInfo;
  itinerary: ItineraryDay[];
  gearList: GearItem[];
  isCustomHostCreated?: boolean;
  createdAt?: string;
}

export interface GenerateTrekRequest {
  prompt: string;
  preferredRegion?: string;
}

export interface GenerateTrekResponse {
  title: string;
  subtitle: string;
  region: Region;
  difficulty: Difficulty;
  travellerStyle: string;
  travellerSummary: string;
  maxAltitudeFt: number;
  basePriceInr: number;
  basecamp: string;
  durationDays: number;
  batchDateLabel: string;
  totalSeats: number;
  coverKey?: string;
  itinerary: ItineraryDay[];
  gearList: GearItem[];
}

export interface ExpeditionSummary {
  id: string;
  title: string;
  region: Region;
  difficulty: Difficulty;
  durationDays: number;
  price: number;
  maxAltitudeFt: number;
  basecamp: string;
}

export interface MatchTreksRequest {
  preferences: {
    fitness: string;
    maxDays: string;
    budgetInr: string;
    query: string;
  };
  expeditionsSummary: ExpeditionSummary[];
}

export interface MatchedTrek {
  expeditionId: string;
  matchHeadline: string;
  reason: string;
  caution: string;
}

export interface MatchTreksResponse {
  summary: string;
  matches: MatchedTrek[];
}

export interface QnAMessage {
  role: 'user' | 'model';
  text: string;
}

export interface TrailQnARequest {
  question: string;
  expedition: Partial<Expedition>;
  history?: QnAMessage[];
}

export interface TrailQnAResponse {
  answer: string;
  followUpSuggestions: string[];
}

export interface PrepAdvisorRequest {
  expedition: Partial<Expedition>;
  priorMaxAltitude: string;
  coldSensitivity: string;
}

export interface PriorityGearAdvice {
  itemName: string;
  action: 'Must Pack' | 'Rent at Basecamp';
  reason: string;
}

export interface PrepAdvisorResponse {
  acclimatizationSummary: string;
  altitudeTips: string[];
  priorityGear: PriorityGearAdvice[];
}
