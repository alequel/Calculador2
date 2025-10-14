
import React from 'react';
import type { ServiceType } from '../types.ts';

interface ServiceSelectorProps {
  onSelect: (type: ServiceType) => void;
}

const ServiceCard: React.FC<{
  title: string;
  description: string;
  icon: React.ReactElement;
  onClick: () => void;
}> = ({ title, description, icon, onClick }) => (
  <button
    onClick={onClick}
    className="w-full text-left p-6 border-2 border-transparent rounded-xl bg-gray-50 hover:border-brand-primary hover:bg-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 group"
  >
    <div className="flex items-center space-x-4">
      <div className="text-brand-primary bg-brand-primary/10 p-3 rounded-lg">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-bold text-brand-dark">{title}</h3>
        <p className="text-sm text-brand-muted">{description}</p>
      </div>
       <div className="ml-auto text-gray-300 group-hover:text-brand-primary transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  </button>
);


const ServiceSelector: React.FC<ServiceSelectorProps> = ({ onSelect }) => {
  return (
    <div>
      <h2 className="text-xl font-bold text-brand-dark mb-4">1. Choose a Service Type</h2>
      <div className="space-y-4">
        <ServiceCard
          title="Photo Services"
          description="Generate high-quality images, product mockups, and more."
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          }
          onClick={() => onSelect('photo')}
        />
        <ServiceCard
          title="Video Services"
          description="Create short video clips from text prompts with optional add-ons."
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          }
          onClick={() => onSelect('video')}
        />
      </div>
    </div>
  );
};

export default ServiceSelector;