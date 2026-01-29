import React from 'react';
import { motion } from 'framer-motion';
import { MandalaPattern, CornerDecoration } from './ui/OrnateDecorations';
import { ChevronDown } from 'lucide-react';
export function Hero() {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#FFFAF0]">
      {/* Background Patterns */}
      <div className="absolute inset-0 overflow-hidden">
        <MandalaPattern className="top-[-10%] left-[-10%] w-[40vw] h-[40vw] text-[#D4AF37] opacity-5" />
        <MandalaPattern className="bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] text-[#D4AF37] opacity-5" />
      </div>

      <div className="container mx-auto px-4 z-10 flex flex-col items-center">
        {/* Main Content */}
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.95
          }}
          animate={{
            opacity: 1,
            scale: 1
          }}
          transition={{
            duration: 1.2,
            ease: 'easeOut'
          }}
          className="relative p-8 md:p-16 text-center max-w-4xl w-full">

          {/* Decorative Frame */}
          <div className="absolute inset-0 border-2 border-[#D4AF37]/30 m-4 pointer-events-none"></div>
          <div className="absolute inset-0 border border-[#8B0000]/20 m-6 pointer-events-none"></div>

          <CornerDecoration className="top-0 left-0 w-16 h-16 md:w-24 md:h-24 text-[#D4AF37]" />
          <CornerDecoration
            className="top-0 right-0 w-16 h-16 md:w-24 md:h-24 text-[#D4AF37]"
            rotate={90} />

          <CornerDecoration
            className="bottom-0 right-0 w-16 h-16 md:w-24 md:h-24 text-[#D4AF37]"
            rotate={180} />

          <CornerDecoration
            className="bottom-0 left-0 w-16 h-16 md:w-24 md:h-24 text-[#D4AF37]"
            rotate={270} />


          {/* Text Content */}
          <motion.div
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              delay: 0.5,
              duration: 1
            }}>

            <h2 className="text-[#8B0000] uppercase tracking-[0.3em] text-sm md:text-base mb-6 font-semibold">
              The Wedding Celebration Of
            </h2>

            <h1 className="font-serif-display text-5xl md:text-7xl lg:text-8xl text-[#2D2D2D] mb-4 leading-tight">
              Aarav <span className="text-[#D4AF37]">&</span> Priya
            </h1>

            <div className="flex items-center justify-center space-x-4 my-8">
              <div className="h-[1px] w-12 bg-[#8B0000]"></div>
              <div className="w-2 h-2 rotate-45 bg-[#D4AF37]"></div>
              <div className="h-[1px] w-12 bg-[#8B0000]"></div>
            </div>

            <p className="font-serif-display text-2xl md:text-3xl text-[#8B0000] italic mb-8">
              December 12th, 2024
            </p>

            <p className="text-gray-600 uppercase tracking-widest text-xs md:text-sm">
              Udaipur, Rajasthan
            </p>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1,
            y: [0, 10, 0]
          }}
          transition={{
            delay: 2,
            duration: 2,
            repeat: Infinity
          }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-[#8B0000]">

          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </div>
    </section>);

}