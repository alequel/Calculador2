
import React from 'react';
import CustomCheckbox from './CustomCheckbox.tsx';

interface CommonOptionsProps {
  rushOrder: boolean;
  onRushOrderChange: (checked: boolean) => void;
}

const CommonOptions: React.FC<CommonOptionsProps> = ({ rushOrder, onRushOrderChange }) => {
  return (
    <div className="mt-8 pt-6 border-t border-gray-200">
      <h3 className="text-lg font-bold text-brand-dark mb-4">Common Options</h3>
      <CustomCheckbox
        label="Rush Order (completed in a few hours)"
        checked={rushOrder}
        onChange={(e) => onRushOrderChange(e.target.checked)}
        description="Adds a 15% surcharge to the subtotal for expedited delivery."
      />
    </div>
  );
};

export default CommonOptions;