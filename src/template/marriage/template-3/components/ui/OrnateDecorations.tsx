import React from 'react';
import { motion } from 'framer-motion';
export const MandalaPattern = ({
  className = '',
  opacity = 0.1



}: {className?: string;opacity?: number;}) =>
<motion.div
  className={`absolute pointer-events-none ${className}`}
  style={{
    opacity
  }}
  animate={{
    rotate: 360
  }}
  transition={{
    duration: 120,
    repeat: Infinity,
    ease: 'linear'
  }}>

    <svg
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full text-[#D4AF37]">

      <path
      d="M100 0C100 0 110 40 140 50C170 60 200 50 200 50C200 50 160 80 160 110C160 140 190 180 190 180C190 180 140 160 110 170C80 180 60 200 60 200C60 200 50 150 20 130C-10 110 0 70 0 70C0 70 40 70 60 40C80 10 100 0 100 0Z"
      stroke="currentColor"
      strokeWidth="1"
      fill="none" />

      <circle cx="100" cy="100" r="30" stroke="currentColor" strokeWidth="1" />
      <circle cx="100" cy="100" r="10" stroke="currentColor" strokeWidth="1" />
      <path
      d="M100 20L110 40L130 45L115 60L120 80L100 70L80 80L85 60L70 45L90 40L100 20Z"
      stroke="currentColor"
      strokeWidth="0.5" />

      <path
      d="M100 180L110 160L130 155L115 140L120 120L100 130L80 120L85 140L70 155L90 160L100 180Z"
      stroke="currentColor"
      strokeWidth="0.5" />

      <path
      d="M20 100L40 110L45 130L60 115L80 120L70 100L80 80L60 85L45 70L40 90L20 100Z"
      stroke="currentColor"
      strokeWidth="0.5" />

      <path
      d="M180 100L160 110L155 130L140 115L120 120L130 100L120 80L140 85L155 70L160 90L180 100Z"
      stroke="currentColor"
      strokeWidth="0.5" />

    </svg>
  </motion.div>;

export const CornerDecoration = ({
  className = '',
  rotate = 0



}: {className?: string;rotate?: number;}) =>
<div
  className={`absolute w-16 h-16 pointer-events-none text-[#D4AF37] ${className}`}
  style={{
    transform: `rotate(${rotate}deg)`
  }}>

    <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full">

      <path
      d="M10 10H40C40 10 35 20 30 20H20V30C20 35 10 40 10 40V10Z"
      fill="currentColor" />

      <path
      d="M10 10C10 10 40 10 60 20C80 30 90 60 90 60"
      stroke="currentColor"
      strokeWidth="2" />

      <path
      d="M10 10C10 10 10 40 20 60C30 80 60 90 60 90"
      stroke="currentColor"
      strokeWidth="2" />

      <circle cx="15" cy="15" r="3" fill="currentColor" />
      <circle cx="35" cy="12" r="2" fill="currentColor" />
      <circle cx="12" cy="35" r="2" fill="currentColor" />
    </svg>
  </div>;

export const SectionDivider = ({ className = '' }: {className?: string;}) =>
<div className={`w-full flex justify-center items-center py-8 ${className}`}>
    <div className="h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent w-1/3"></div>
    <div className="mx-4 text-[#D4AF37]">
      <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">

        <rect
        x="15"
        y="0"
        width="30"
        height="30"
        transform="rotate(45 15 0)"
        fill="currentColor"
        fillOpacity="0.2" />

        <rect
        x="15"
        y="5"
        width="20"
        height="20"
        transform="rotate(45 15 5)"
        stroke="currentColor" />

      </svg>
    </div>
    <div className="h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent w-1/3"></div>
  </div>;