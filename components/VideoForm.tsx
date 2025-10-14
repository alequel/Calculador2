
import React from 'react';
import type { VideoState, VideoModel, VideoQuality } from '../types.ts';
import { PRICING_DATA } from '../constants.ts';
import CustomSelect from './CustomSelect.tsx';
import CustomCheckbox from './CustomCheckbox.tsx';

interface VideoFormProps {
  state: VideoState;
  onChange: (newState: Partial<VideoState>) => void;
}

const VideoForm: React.FC<VideoFormProps> = ({ state, onChange }) => {
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    const snaps = PRICING_DATA.video.sliderSnaps;
    const closest = snaps.reduce((prev, curr) => 
      (Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev)
    );
    onChange({ length: closest });
  };
  
  return (
    <div className="space-y-6">
      <CustomSelect
        label="AI Model"
        value={state.model}
        onChange={(e) => onChange({ model: e.target.value as VideoModel })}
        options={Object.keys(PRICING_DATA.video.models)}
      />
      
      <div>
        <label htmlFor="video-length" className="flex justify-between text-sm font-medium text-brand-text mb-2">
          <span>Video Length</span>
          <span className="font-bold text-brand-primary">{state.length} seconds</span>
        </label>
        <input
          id="video-length"
          type="range"
          min="0"
          max="60"
          step="1"
          value={state.length}
          onChange={handleSliderChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          {PRICING_DATA.video.sliderSnaps.filter(s => s > 0).map(snap => (
            <span key={snap}>|</span>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-brand-text mb-2">Video Quality</label>
        <div className="grid grid-cols-3 gap-2">
          {(['FullHD', '2K', '4K'] as VideoQuality[]).map(quality => (
            <button
              key={quality}
              onClick={() => onChange({ quality: quality })}
              className={`p-3 rounded-lg text-center font-semibold transition-all duration-200 ${
                state.quality === quality
                  ? 'bg-brand-primary text-white shadow-md ring-2 ring-offset-2 ring-brand-primary'
                  : 'bg-gray-100 text-brand-text hover:bg-gray-200'
              }`}
            >
              {quality}
            </button>
          ))}
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-brand-text mb-2">Additional Options</label>
        <div className="space-y-3">
          <CustomCheckbox
            label="Sound Design"
            checked={state.soundDesign}
            onChange={(e) => onChange({ soundDesign: e.target.checked })}
          />
          <CustomCheckbox
            label="Color Correction"
            checked={state.colorCorrection}
            onChange={(e) => onChange({ colorCorrection: e.target.checked })}
          />
        </div>
      </div>
    </div>
  );
};

export default VideoForm;