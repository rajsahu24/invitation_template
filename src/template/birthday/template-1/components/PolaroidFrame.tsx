import  { type ReactNode } from 'react';
import { motion } from 'framer-motion';
interface PolaroidProps {
  children: ReactNode;
  caption: string;
  rotation?: number;
  className?: string;
  delay?: number;
}
export function PolaroidFrame({
  children,
  caption,
  rotation = 0,
  className = '',
  delay = 0
}: PolaroidProps) {
  return (
    <motion.div
      className={`bg-white p-4 pb-12 shadow-lg rounded-sm inline-block relative group cursor-pointer ${className}`}
      initial={{
        opacity: 0,
        scale: 0.8,
        rotate: 0
      }}
      whileInView={{
        opacity: 1,
        scale: 1,
        rotate: rotation
      }}
      whileHover={{
        scale: 1.05,
        rotate: 0,
        zIndex: 10,
        boxShadow:
        '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }}
      transition={{
        duration: 0.6,
        delay: delay,
        type: 'spring',
        stiffness: 100
      }}
      viewport={{
        once: true,
        margin: '-50px'
      }}>

      {/* Tape effect */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-8 bg-white/40 backdrop-blur-sm rotate-1 shadow-sm z-10" />

      <div className="aspect-square bg-stone-100 overflow-hidden mb-4 border border-stone-100">
        {children}
      </div>

      <div className="absolute bottom-3 left-0 right-0 text-center">
        <p className="font-[Caveat] text-2xl text-stone-600 transform -rotate-1">
          {caption}
        </p>
      </div>
    </motion.div>);

}