
export type ServiceType = 'photo' | 'video';

export type PhotoModel = 'Midjourney' | 'Gemini 2.5 Flash Image' | 'Leonardo AI' | 'Nano Banana';
export type VideoModel = 'Veo 3' | 'Midjourney' | 'Kling AI' | 'Sora 2';
export type VideoQuality = 'FullHD' | '2K' | '4K';

export interface PhotoState {
  model: PhotoModel;
  task: string;
  quantity: number;
}

export interface VideoState {
  model: VideoModel;
  length: number;
  quality: VideoQuality;
  soundDesign: boolean;
  colorCorrection: boolean;
}

export interface AppState {
  serviceType: ServiceType | null;
  photo: PhotoState;
  video: VideoState;
  rushOrder: boolean;
}

export interface Quote {
  baseGenerationCost: number;
  addOns: { name: string; cost: number }[];
  subtotal: number;
  rushSurcharge: number;
  total: number;
}