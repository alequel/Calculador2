
import React, { useState, useMemo, useCallback } from 'react';
import { PhotoState, VideoState, ServiceType, AppState, Quote } from './types.ts';
import { PRICING_DATA } from './constants.ts';
import ServiceSelector from './components/ServiceSelector.tsx';
import PhotoForm from './components/PhotoForm.tsx';
import VideoForm from './components/VideoForm.tsx';
import QuoteDisplay from './components/QuoteDisplay.tsx';
import CommonOptions from './components/CommonOptions.tsx';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    serviceType: null,
    photo: {
      model: 'Midjourney',
      task: PRICING_DATA.photo.tasks[0],
      quantity: 1,
    },
    video: {
      model: 'Veo 3',
      length: 10,
      quality: 'FullHD',
      soundDesign: false,
      colorCorrection: false,
    },
    rushOrder: false,
  });

  const handleServiceSelect = useCallback((type: ServiceType) => {
    setState(prevState => ({ ...prevState, serviceType: type }));
  }, []);

  const handlePhotoChange = useCallback((newState: Partial<PhotoState>) => {
    setState(prevState => ({ ...prevState, photo: { ...prevState.photo, ...newState } }));
  }, []);

  const handleVideoChange = useCallback((newState: Partial<VideoState>) => {
    setState(prevState => ({ ...prevState, video: { ...prevState.video, ...newState } }));
  }, []);
  
  const handleRushOrderChange = useCallback((checked: boolean) => {
    setState(prevState => ({ ...prevState, rushOrder: checked }));
  }, []);

  const resetCalculator = useCallback(() => {
    setState(prevState => ({
      ...prevState,
      serviceType: null,
    }));
  }, []);

  const quote = useMemo<Quote | null>(() => {
    if (!state.serviceType) return null;

    let baseGenerationCost = 0;
    const addOns: { name: string; cost: number }[] = [];

    if (state.serviceType === 'photo') {
      const { model, quantity } = state.photo;
      baseGenerationCost = PRICING_DATA.photo.models[model].pricePerImage[quantity as 1 | 3 | 9] || 0;
      addOns.push({ name: 'Prompting & Setup', cost: PRICING_DATA.photo.promptingFee });
    } else if (state.serviceType === 'video') {
      const { model, length, quality, soundDesign, colorCorrection } = state.video;
      if (length > 0) {
        const generationUnits = Math.ceil(length / PRICING_DATA.video.generationUnitSeconds);
        const costPerUnit = PRICING_DATA.video.models[model].costPerUnit;
        const qualityMultiplier = PRICING_DATA.video.qualityMultipliers[quality];
        baseGenerationCost = generationUnits * costPerUnit * qualityMultiplier;
      }
      
      addOns.push({ name: 'Video Editing Fee', cost: PRICING_DATA.video.editingFee });
      if (soundDesign) addOns.push({ name: 'Sound Design', cost: PRICING_DATA.video.soundDesignFee });
      if (colorCorrection) addOns.push({ name: 'Color Correction', cost: PRICING_DATA.video.colorCorrectionFee });
    }

    const addOnsTotal = addOns.reduce((sum, item) => sum + item.cost, 0);
    const subtotal = baseGenerationCost + addOnsTotal;
    const rushSurcharge = state.rushOrder ? subtotal * PRICING_DATA.rushOrderSurcharge : 0;
    const total = subtotal + rushSurcharge;

    return { baseGenerationCost, addOns, subtotal, rushSurcharge, total };
  }, [state]);


  return (
    <div className="min-h-screen bg-brand-light font-sans text-brand-text p-4 sm:p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-dark mb-2">AI Media Service Calculator</h1>
          <p className="text-lg text-brand-muted">Instantly quote prices for AI-powered photo and video generation.</p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 bg-white rounded-2xl p-6 md:p-8 shadow-card">
            {!state.serviceType ? (
              <ServiceSelector onSelect={handleServiceSelect} />
            ) : (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-brand-dark capitalize">{state.serviceType} Services</h2>
                  <button onClick={resetCalculator} className="text-sm font-semibold text-brand-primary hover:text-brand-secondary transition-colors">
                    &larr; Change Service
                  </button>
                </div>
                {state.serviceType === 'photo' && <PhotoForm state={state.photo} onChange={handlePhotoChange} />}
                {state.serviceType === 'video' && <VideoForm state={state.video} onChange={handleVideoChange} />}
                 {state.serviceType && <CommonOptions rushOrder={state.rushOrder} onRushOrderChange={handleRushOrderChange}/>}
              </div>
            )}
          </div>

          <div className="lg:col-span-2">
            <QuoteDisplay quote={quote} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;