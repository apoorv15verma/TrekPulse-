import React from 'react';

export const ShimmerCard: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`p-4 rounded-2xl bg-white/80 border border-indigo-100/80 shadow-sm space-y-3 ${className}`}>
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-xl animate-shimmer" />
        <div className="space-y-1.5 flex-1">
          <div className="h-4 w-3/4 rounded-md animate-shimmer" />
          <div className="h-3 w-1/2 rounded-md animate-shimmer" />
        </div>
      </div>
      <div className="space-y-2 pt-1">
        <div className="h-3 w-full rounded animate-shimmer" />
        <div className="h-3 w-5/6 rounded animate-shimmer" />
      </div>
      <div className="flex items-center justify-between pt-2">
        <div className="h-4 w-20 rounded animate-shimmer" />
        <div className="h-7 w-24 rounded-lg animate-shimmer" />
      </div>
    </div>
  );
};

export const ShimmerLines: React.FC<{ count?: number; className?: string }> = ({ count = 3, className = '' }) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="h-3.5 rounded-md animate-shimmer"
          style={{ width: `${85 - i * 12}%` }}
        />
      ))}
    </div>
  );
};
