
import React from 'react';

interface CustomCheckboxProps {
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  description?: string;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ label, checked, onChange, description }) => {
  const id = label.replace(/\s+/g, '-').toLowerCase();
  return (
    <div className="relative flex items-start">
      <div className="flex items-center h-5 mt-1">
        <input
          id={id}
          aria-describedby={`${id}-description`}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="focus:ring-brand-primary h-5 w-5 text-brand-primary border-gray-300 rounded"
        />
      </div>
      <div className="ml-3 text-sm">
        <label htmlFor={id} className="font-medium text-brand-text">
          {label}
        </label>
        {description && (
          <p id={`${id}-description`} className="text-brand-muted text-xs mt-1">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default CustomCheckbox;
