import React from 'react';

interface GrainBgTitleProps {
  title: string;
}

export default function GrainBgTitle({ title }: GrainBgTitleProps) {
  return (
    <div className="relative w-full mb-12">
      {/* Grain background */}
      <div className="absolute inset-0 bg-brand-darkblue-5 opacity-50 bg-[url('/images/grain.png')] rounded-lg"></div>
      
      {/* Title */}
      <div className="relative py-8 px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-brand-darkblue">{title}</h2>
        <div className="w-24 h-1 bg-brand-darkblue mx-auto mt-4"></div>
      </div>
    </div>
  );
} 