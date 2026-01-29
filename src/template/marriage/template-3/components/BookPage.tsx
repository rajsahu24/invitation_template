import React from 'react';
import { motion } from 'framer-motion';
interface BookPageProps {
  children: ReactNode;
  pageNumber: number;
  isFlipped: boolean;
  zIndex: number;
  onFlip?: () => void;
  className?: string;
  position?: 'left' | 'right' | 'single'; // 'single' for mobile
}
export function BookPage({
  children,
  pageNumber,
  isFlipped,
  zIndex,
  onFlip,
  className = '',
  position = 'single'
}: BookPageProps) {
  // Desktop "Spread" logic vs Mobile "Single" logic
  // For a realistic book, pages rotate around the spine (left edge for right pages, right edge for left pages)
  const isMobile = position === 'single';
  return (
    <motion.div
      className={`absolute top-0 ${isMobile ? 'left-0 w-full' : 'w-1/2'} h-full bg-[#FFFAF0] shadow-xl overflow-hidden origin-left backface-hidden ${className}`}
      style={{
        zIndex,
        transformStyle: 'preserve-3d',
        left: isMobile ? 0 : '50%',
        transformOrigin: 'left center'
      }}
      animate={{
        rotateY: isFlipped ? -180 : 0
      }}
      transition={{
        duration: 0.8,
        type: 'spring',
        stiffness: 60,
        damping: 15
      }}
      onClick={onFlip}>

      {/* Front of the page (Right side content) */}
      <div className="absolute inset-0 backface-hidden bg-[#FFFAF0] overflow-hidden">
        <div className="w-full h-full relative">
          {/* Paper Texture Overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] mix-blend-multiply" />

          {/* Inner Shadow for Spine */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/10 to-transparent pointer-events-none z-10" />

          {children}
        </div>
      </div>

      {/* Back of the page (Left side content for the NEXT spread) -
             Note: In a real DOM implementation, the back of this div would be the "left" page of the next spread.
             However, for simplicity in React, we often just render the front and handle the "back" as a separate component or just let this be single sided
             and rely on the page underneath.
             
             BUT for a true flip, we need the back content.
             For this implementation, we will assume this component renders ONE physical sheet of paper.
             The 'children' is the FRONT content.
             We might need a 'backContent' prop if we want to render the other side.
         */}
    </motion.div>);

}