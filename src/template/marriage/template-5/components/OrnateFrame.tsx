import React from 'react';
// import { motion } from 'framer-motion';
interface OrnateFrameProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'gold' | 'silver';
}
export function OrnateFrame({
  children,
  className = '',
  variant = 'gold'
}: OrnateFrameProps) {
  const borderColor = variant === 'gold' ? 'border-royal-gold' : 'border-gray-300';
  const cornerColor = variant === 'gold' ? 'text-royal-gold' : 'text-gray-300';
  return <div className={`relative p-8 ${className}`}>
      {/* Outer Border */}
      <div className={`absolute inset-0 border-2 ${borderColor} opacity-50 rounded-lg`} />

      {/* Inner Border */}
      <div className={`absolute inset-2 border ${borderColor} opacity-30 rounded-sm`} />

      {/* Decorative Corners */}
      <Corner position="top-left" color={cornerColor} />
      <Corner position="top-right" color={cornerColor} />
      <Corner position="bottom-left" color={cornerColor} />
      <Corner position="bottom-right" color={cornerColor} />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>;
}
function Corner({
  position,
  color
}: {
  position: string;
  color: string;
}) {
  const rotation = {
    'top-left': 'rotate(0deg)',
    'top-right': 'rotate(90deg)',
    'bottom-right': 'rotate(180deg)',
    'bottom-left': 'rotate(270deg)'
  }[position];
  const style = {
    top: position.includes('top') ? '-8px' : 'auto',
    bottom: position.includes('bottom') ? '-8px' : 'auto',
    left: position.includes('left') ? '-8px' : 'auto',
    right: position.includes('right') ? '-8px' : 'auto',
    transform: rotation
  };
  return <div className={`absolute w-8 h-8 ${color}`} style={style}>
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M0 0v12h2v-8h8v-2h-8v-2z" />
        <path d="M4 4v4h4v-4h-4z" opacity="0.5" />
      </svg>
    </div>;
}