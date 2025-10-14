
import React from 'react';
import type { PhotoState, PhotoModel } from '../types';
import { PRICING_DATA } from '../constants';
import CustomSelect from './CustomSelect';

interface PhotoFormProps {
  state: PhotoState;
  onChange: (newState: Partial<PhotoState>) => void;
}

const PhotoForm: React.FC<PhotoFormProps> = ({ state, onChange }) => {
  return (
    <div className="space-y-6">
      <CustomSelect
        label="AI Model"
        value={state.model}
        onChange={(e) => onChange({ model: e.target.value as PhotoModel })}
        options={Object.keys(PRICING_DATA.photo.models)}
      />
      <CustomSelect
        label="Photo Task"
        value={state.task}
        onChange={(e) => onChange({ task: e.target.value })}
        options={PRICING_DATA.photo.tasks}
      />
      <div>
        <label className="block text-sm font-medium text-brand-text mb-2">Quantity</label>
        <div className="grid grid-cols-3 gap-2">
          {PRICING_DATA.photo.quantities.map(qty => (
            <button
              key={qty}
              onClick={() => onChange({ quantity: qty })}
              className={`p-3 rounded-lg text-center font-semibold transition-all duration-200 ${
                state.quantity === qty
                  ? 'bg-brand-primary text-white shadow-md ring-2 ring-offset-2 ring-brand-primary'
                  : 'bg-gray-100 text-brand-text hover:bg-gray-200'
              }`}
            >
              {qty} Image{qty > 1 ? 's' : ''}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhotoForm;
