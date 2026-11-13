import React, { createContext, useContext, useState, useEffect } from 'react';
import { Expedition } from '../types/trek';
import { INITIAL_EXPEDITIONS } from '../data/expeditions';

export type UserMode = 'trekker' | 'guide';
export type TrekkerTab = 'explore' | 'detail' | 'gear' | 'bookings';
export type GuideTab = 'treks' | 'create' | 'bookings';

interface ToastData {
  title: string;
  desc?: string;
  type: 'success' | 'indigo' | 'amber';
}

interface TrekPulseContextType {
  mode: UserMode;
  setMode: (mode: UserMode) => void;
  trekkerTab: TrekkerTab;
  setTrekkerTab: (tab: TrekkerTab) => void;
  guideTab: GuideTab;
  setGuideTab: (tab: GuideTab) => void;
  expeditions: Expedition[];
  selectedExpeditionId: string;
  selectedExpedition: Expedition;
  selectExpedition: (id: string, targetTab?: TrekkerTab) => void;
  publishTrek: (trek: Omit<Expedition, 'id' | 'availableSeats'>) => string;
  bookSeats: (expeditionId: string, count?: number) => boolean;
  bookedExpeditions: { expeditionId: string; seats: number; bookedAt: string }[];
  backendHealth: { status: string; liveGemini: boolean; model: string } | null;
  toast: ToastData | null;
  showToast: (data: ToastData) => void;
}

const TrekPulseContext = createContext<TrekPulseContextType | undefined>(undefined);

export const TrekPulseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<UserMode>('trekker');
  const [trekkerTab, setTrekkerTab] = useState<TrekkerTab>('explore');
  const [guideTab, setGuideTab] = useState<GuideTab>('create');
  const [expeditions, setExpeditions] = useState<Expedition[]>(INITIAL_EXPEDITIONS);
  const [selectedExpeditionId, setSelectedExpeditionId] = useState<string>(INITIAL_EXPEDITIONS[0].id);
  const [bookedExpeditions, setBookedExpeditions] = useState<{ expeditionId: string; seats: number; bookedAt: string }[]>([]);
  const [backendHealth, setBackendHealth] = useState<{ status: string; liveGemini: boolean; model: string } | null>(null);
  const [toast, setToast] = useState<ToastData | null>(null);

  // Check backend health on mount
  useEffect(() => {
    fetch('/api/health')
      .then(res => res.json())
      .then(data => setBackendHealth(data))
      .catch(err => {
        console.warn('Backend health check error:', err);
        setBackendHealth({ status: 'offline', liveGemini: false, model: 'local-fallback' });
      });
  }, []);

  const showToast = (data: ToastData) => {
    setToast(data);
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const selectedExpedition = expeditions.find(e => e.id === selectedExpeditionId) || expeditions[0];

  const selectExpedition = (id: string, targetTab: TrekkerTab = 'detail') => {
    setSelectedExpeditionId(id);
    setTrekkerTab(targetTab);
  };

  const publishTrek = (newTrekData: Omit<Expedition, 'id' | 'availableSeats'>): string => {
    const newId = 'custom-' + Date.now();
    const created: Expedition = {
      ...newTrekData,
      id: newId,
      availableSeats: newTrekData.totalSeats,
      isCustomHostCreated: true,
      createdAt: new Date().toISOString()
    };

    setExpeditions(prev => [created, ...prev]);
    setSelectedExpeditionId(newId);
    showToast({
      title: 'Trek Published to Marketplace!',
      desc: `"${created.title}" is now live and discoverable by trekkers.`,
      type: 'success'
    });
    return newId;
  };

  const bookSeats = (expeditionId: string, count: number = 1): boolean => {
    const target = expeditions.find(e => e.id === expeditionId);
    if (!target || target.availableSeats < count) {
      showToast({
        title: 'Unable to Book',
        desc: 'Selected expedition does not have enough remaining seats.',
        type: 'amber'
      });
      return false;
    }

    setExpeditions(prev => prev.map(e => {
      if (e.id === expeditionId) {
        return { ...e, availableSeats: e.availableSeats - count };
      }
      return e;
    }));

    setBookedExpeditions(prev => [
      { expeditionId, seats: count, bookedAt: new Date().toLocaleDateString() },
      ...prev
    ]);

    showToast({
      title: 'Booking Confirmed!',
      desc: `Reserved ${count} seat(s) for ${target.title}. WhatsApp voucher sent.`,
      type: 'success'
    });
    return true;
  };

  return (
    <TrekPulseContext.Provider
      value={{
        mode,
        setMode,
        trekkerTab,
        setTrekkerTab,
        guideTab,
        setGuideTab,
        expeditions,
        selectedExpeditionId,
        selectedExpedition,
        selectExpedition,
        publishTrek,
        bookSeats,
        bookedExpeditions,
        backendHealth,
        toast,
        showToast
      }}
    >
      {children}
    </TrekPulseContext.Provider>
  );
};

export const useTrekPulse = () => {
  const context = useContext(TrekPulseContext);
  if (!context) {
    throw new Error('useTrekPulse must be used within a TrekPulseProvider');
  }
  return context;
};
