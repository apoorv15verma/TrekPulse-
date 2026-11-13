import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';
import { 
  mockGenerateTrek, 
  mockMatchTreks, 
  mockTrailQnA, 
  mockPrepAdvisor 
} from './src/server/mockAi.js';
import { 
  GenerateTrekRequest, 
  MatchTreksRequest, 
  TrailQnARequest, 
  PrepAdvisorRequest 
} from './src/types/trek.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);
const apiKey = process.env.GEMINI_API_KEY || '';
const hasApiKey = Boolean(apiKey && apiKey.trim().length > 10 && !apiKey.includes('YOUR_'));

let aiClient: GoogleGenAI | null = null;
if (hasApiKey) {
  try {
    aiClient = new GoogleGenAI({ apiKey });
    console.log('[TrekPulse AI] Live Google GenAI client initialized with API key.');
  } catch (err) {
    console.warn('[TrekPulse AI] Could not initialize GoogleGenAI client, using fallback:', err);
  }
} else {
  console.log('[TrekPulse AI] GEMINI_API_KEY not configured. Running in high-fidelity mock AI mode.');
}

app.use(cors());
app.use(express.json({ limit: '2mb' }));

// Health Check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    liveGemini: Boolean(aiClient),
    model: 'gemini-2.5-flash',
    timestamp: new Date().toISOString()
  });
});

// 1. AI Trip Builder: POST /api/ai/generate-trek
app.post('/api/ai/generate-trek', async (req: Request<{}, {}, GenerateTrekRequest>, res: Response) => {
  const { prompt, preferredRegion } = req.body;
  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  if (aiClient) {
    try {
      console.log(`[TrekPulse AI] Generating trek with live Gemini for prompt: "${prompt.slice(0, 60)}..."`);
      const systemInstruction = `You are an elite Himalayan expedition director and route architect for TrekPulse.
Your task is to take a brief from a trek guide or group of travellers and turn it into a complete, professional, realistic expedition draft in India.
Regions must be one of: "Uttarakhand", "Himachal", "Kashmir", "Sikkim", "Ladakh".
Difficulty must be one of: "Easy", "Moderate", "Difficult", "Challenging".
Ensure realistic day-by-day camps, altitude increments (no dangerous jumps >3,000 ft/day above 9,000 ft), practical gear lists, and realistic pricing in Indian Rupees (₹).
Return ONLY valid JSON strictly matching the requested schema.`;

      const response = await aiClient.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          { role: 'user', parts: [{ text: `Create a comprehensive expedition draft based on this traveller brief: "${prompt}". Preferred region (if any): "${preferredRegion || 'Any'}".` }] }
        ],
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              subtitle: { type: Type.STRING },
              region: { type: Type.STRING },
              difficulty: { type: Type.STRING },
              travellerStyle: { type: Type.STRING },
              travellerSummary: { type: Type.STRING },
              maxAltitudeFt: { type: Type.NUMBER },
              basePriceInr: { type: Type.NUMBER },
              basecamp: { type: Type.STRING },
              durationDays: { type: Type.NUMBER },
              batchDateLabel: { type: Type.STRING },
              totalSeats: { type: Type.NUMBER },
              itinerary: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    day: { type: Type.NUMBER },
                    title: { type: Type.STRING },
                    campName: { type: Type.STRING },
                    altitudeFt: { type: Type.NUMBER },
                    distanceKm: { type: Type.NUMBER },
                    description: { type: Type.STRING },
                    highlight: { type: Type.STRING }
                  },
                  required: ['day', 'title', 'campName', 'altitudeFt', 'distanceKm', 'description']
                }
              },
              gearList: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    category: { type: Type.STRING },
                    name: { type: Type.STRING },
                    required: { type: Type.BOOLEAN },
                    rentable: { type: Type.BOOLEAN }
                  },
                  required: ['category', 'name', 'required', 'rentable']
                }
              }
            },
            required: ['title', 'subtitle', 'region', 'difficulty', 'travellerStyle', 'travellerSummary', 'maxAltitudeFt', 'basePriceInr', 'basecamp', 'durationDays', 'batchDateLabel', 'totalSeats', 'itinerary', 'gearList']
          }
        }
      });

      if (response.text) {
        const parsed = JSON.parse(response.text);
        return res.json(parsed);
      }
    } catch (error) {
      console.warn('[TrekPulse AI] Live Gemini error in generate-trek, using intelligent fallback:', error);
    }
  }

  // Fallback to intelligent mock
  const fallback = mockGenerateTrek(prompt, preferredRegion);
  return res.json(fallback);
});

// 2. Trekker Fit Matcher: POST /api/ai/match-treks
app.post('/api/ai/match-treks', async (req: Request<{}, {}, MatchTreksRequest>, res: Response) => {
  const { preferences, expeditionsSummary } = req.body;
  if (!preferences || !expeditionsSummary) {
    return res.status(400).json({ error: 'Preferences and expeditionsSummary are required' });
  }

  if (aiClient) {
    try {
      console.log(`[TrekPulse AI] Matching treks with live Gemini for fitness: ${preferences.fitness}, query: "${preferences.query}"`);
      const systemInstruction = `You are an expert Himalayan Trek Matcher for TrekPulse.
Given the trekker's fitness level, maximum available days, budget range, and custom query, evaluate the provided list of active Himalayan expeditions.
Pick the top 1 to 3 best matching expeditions strictly from the provided list.
For each match, provide a compelling headline, an honest 1-line reason why it fits their specific constraints, and an essential caution note (e.g. altitude or cold).
Also provide a 1-sentence overall summary.
Return ONLY valid JSON matching the schema.`;

      const promptText = `Trekker Preferences:
- Fitness: ${preferences.fitness || 'Moderate'}
- Max Days: ${preferences.maxDays || 'Any'}
- Budget: ${preferences.budgetInr || 'Any'}
- Custom Query: ${preferences.query || 'None'}

Available Expeditions:
${JSON.stringify(expeditionsSummary, null, 2)}

Select top 1-3 matches and explain why.`;

      const response = await aiClient.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [{ role: 'user', parts: [{ text: promptText }] }],
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              summary: { type: Type.STRING },
              matches: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    expeditionId: { type: Type.STRING },
                    matchHeadline: { type: Type.STRING },
                    reason: { type: Type.STRING },
                    caution: { type: Type.STRING }
                  },
                  required: ['expeditionId', 'matchHeadline', 'reason', 'caution']
                }
              }
            },
            required: ['summary', 'matches']
          }
        }
      });

      if (response.text) {
        const parsed = JSON.parse(response.text);
        return res.json(parsed);
      }
    } catch (error) {
      console.warn('[TrekPulse AI] Live Gemini error in match-treks, using fallback:', error);
    }
  }

  const fallback = mockMatchTreks(preferences, expeditionsSummary);
  return res.json(fallback);
});

// 3. Trail Q&A: POST /api/ai/trail-qna
app.post('/api/ai/trail-qna', async (req: Request<{}, {}, TrailQnARequest>, res: Response) => {
  const { question, expedition, history } = req.body;
  if (!question || !expedition) {
    return res.status(400).json({ error: 'Question and expedition details are required' });
  }

  if (aiClient) {
    try {
      console.log(`[TrekPulse AI] Answering Trail Q&A with live Gemini: "${question}"`);
      const systemInstruction = `You are Trail AI, a route-grounded mountain intelligence assistant on TrekPulse.
Answer questions strictly based on the provided expedition itinerary, altitudes, basecamp, region, and terrain.
Be concise (2-4 sentences max), practical, and authoritative. Give specific altitude and day references when relevant.
Always include 3 logical, interesting follow-up questions the trekker might ask next.
Return ONLY valid JSON matching the schema.`;

      const promptText = `Expedition Details:
- Title: ${expedition.title}
- Region: ${expedition.region}
- Difficulty: ${expedition.difficulty}
- Max Altitude: ${expedition.maxAltitudeFt} ft
- Duration: ${expedition.durationDays} days
- Basecamp: ${expedition.basecamp}
- Itinerary: ${JSON.stringify(expedition.itinerary || [])}

Trekker Question: "${question}"
Conversation History: ${JSON.stringify(history || [])}`;

      const response = await aiClient.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [{ role: 'user', parts: [{ text: promptText }] }],
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              answer: { type: Type.STRING },
              followUpSuggestions: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              }
            },
            required: ['answer', 'followUpSuggestions']
          }
        }
      });

      if (response.text) {
        const parsed = JSON.parse(response.text);
        return res.json(parsed);
      }
    } catch (error) {
      console.warn('[TrekPulse AI] Live Gemini error in trail-qna, using fallback:', error);
    }
  }

  const fallback = mockTrailQnA(question, expedition);
  return res.json(fallback);
});

// 4. Personalized Gear & Altitude Advisor: POST /api/ai/prep-advisor
app.post('/api/ai/prep-advisor', async (req: Request<{}, {}, PrepAdvisorRequest>, res: Response) => {
  const { expedition, priorMaxAltitude, coldSensitivity } = req.body;
  if (!expedition || !priorMaxAltitude || !coldSensitivity) {
    return res.status(400).json({ error: 'Expedition, priorMaxAltitude, and coldSensitivity are required' });
  }

  if (aiClient) {
    try {
      console.log(`[TrekPulse AI] Generating Prep Advice with live Gemini for prior alt: ${priorMaxAltitude}, cold: ${coldSensitivity}`);
      const systemInstruction = `You are the TrekPulse Medical & Altitude Readiness Advisor.
Compare the trekker's prior maximum altitude experience with this expedition's peak altitude.
Analyze their cold sensitivity against high-altitude Himalayan camp windchills.
Provide:
1. acclimatizationSummary: concise medical advice regarding their specific altitude delta.
2. altitudeTips: 3-4 bullet guidelines on hydration, ascent speed, and acclimatization.
3. priorityGear: 4-6 prioritized gear items, classifying each as "Must Pack" (bring own) or "Rent at Basecamp" (safe and economical to rent locally) with clear clinical/practical reasoning.
Return ONLY valid JSON matching the schema.`;

      const promptText = `Expedition:
- Title: ${expedition.title}
- Max Altitude: ${expedition.maxAltitudeFt} ft
- Basecamp: ${expedition.basecamp}
- Region: ${expedition.region}
- Camps: ${JSON.stringify(expedition.itinerary?.map(i => ({ day: i.day, camp: i.campName, alt: i.altitudeFt })) || [])}

Trekker Profile:
- Prior Maximum Altitude: ${priorMaxAltitude}
- Cold Sensitivity: ${coldSensitivity}`;

      const response = await aiClient.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [{ role: 'user', parts: [{ text: promptText }] }],
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              acclimatizationSummary: { type: Type.STRING },
              altitudeTips: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              priorityGear: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    itemName: { type: Type.STRING },
                    action: { type: Type.STRING },
                    reason: { type: Type.STRING }
                  },
                  required: ['itemName', 'action', 'reason']
                }
              }
            },
            required: ['acclimatizationSummary', 'altitudeTips', 'priorityGear']
          }
        }
      });

      if (response.text) {
        const parsed = JSON.parse(response.text);
        return res.json(parsed);
      }
    } catch (error) {
      console.warn('[TrekPulse AI] Live Gemini error in prep-advisor, using fallback:', error);
    }
  }

  const fallback = mockPrepAdvisor(expedition, priorMaxAltitude, coldSensitivity);
  return res.json(fallback);
});

// Vite Middleware for Frontend Serving
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`\n======================================================`);
    console.log(`🏔️  TrekPulse Contextual Mountain Intelligence running!`);
    console.log(`📡 Server & Mobile Frame: http://localhost:${PORT}`);
    console.log(`🤖 Mode: ${aiClient ? 'Live Gemini 2.5 Flash' : 'Intelligent High-Fidelity Mock Fallback'}`);
    console.log(`======================================================\n`);
  });
}

// Export for Vercel serverless functions
export default app;

if (!process.env.VERCEL) {
  startServer().catch((err) => {
    console.error('Failed to start TrekPulse server:', err);
  });
}
