
import React from 'react';

interface CustomSelectProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
}

const CustomSelect: React.FC<CustomSelectProps> = ({ label, value, onChange, options }) => {
  return (
    <div>
      <label htmlFor={label} className="block text-sm font-medium text-brand-text mb-2">
        {label}
      </label>
      <div className="relative">
        <select
          id={label}
          value={value}
          onChange={onChange}
          className="w-full appearance-none bg-gray-50 border border-gray-300 text-brand-text text-sm rounded-lg focus:ring-brand-primary focus:border-brand-primary block p-3 pr-10"
        >
          {options.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
    </div>
  );
};

export default CustomSelect;
