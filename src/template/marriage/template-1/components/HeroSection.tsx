// import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Sparkles } from 'lucide-react';
import { usePreview } from '../../../../context/PreviewContext';

export function HeroSection() {
  const { previewData } = usePreview();

  
  // Handle both RSVP and regular invitation data structures
  const invitation = (previewData as any).invitation || previewData;
  const metadata = invitation?.metadata || {};
  
  // Extract data with fallbacks
  const groomName = metadata?.groom_name || 'Alexander';
  const brideName = metadata?.bride_name || 'Victoria';
  const rawWeddingDate = metadata?.wedding_date || '2024-10-24';
  const weddingDate = formatDate(rawWeddingDate);
  const weddingLocation = metadata?.wedding_location || 'The Grand Palace Gardens';
  const invitation_tag_line = invitation?.invitation_tag_line || 'royal invites you';
  
  
  // Format date function
  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return date.toLocaleDateString('en-US', options).replace(/\d+/, (day) => {
      const num = parseInt(day);
      const suffix = num % 10 === 1 && num !== 11 ? 'st' :
                    num % 10 === 2 && num !== 12 ? 'nd' :
                    num % 10 === 3 && num !== 13 ? 'rd' : 'th';
      return num + suffix;
    });
  }
  
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-royal-gradient text-royal-cream">
      {/* Background Pattern Overlay */}
      <div className="absolute inset-0 opacity-10" style={{
      backgroundImage: 'radial-gradient(circle at 2px 2px, #D4AF37 1px, transparent 0)',
      backgroundSize: '40px 40px'
    }}></div>

      {/* Animated Decorative Circles */}
      <motion.div className="absolute top-0 left-0 w-96 h-96 bg-royal-purple rounded-full blur-3xl opacity-30" animate={{
      scale: [1, 1.2, 1],
      opacity: [0.3, 0.5, 0.3]
    }} transition={{
      duration: 8,
      repeat: Infinity
    }} />
      <motion.div className="absolute bottom-0 right-0 w-96 h-96 bg-royal-teal rounded-full blur-3xl opacity-30" animate={{
      scale: [1.2, 1, 1.2],
      opacity: [0.3, 0.5, 0.3]
    }} transition={{
      duration: 8,
      repeat: Infinity,
      delay: 1
    }} />

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <motion.div initial={{
        opacity: 0,
        y: 50
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 1,
        ease: 'easeOut'
      }} className="border-4 border-royal-gold/30 p-8 md:p-16 relative backdrop-blur-sm bg-black/20 rounded-lg">
          {/* Decorative Top Icon */}
          <motion.div initial={{
          scale: 0
        }} animate={{
          scale: 1
        }} transition={{
          delay: 0.5,
          type: 'spring'
        }} className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-royal-deepPurple p-3 rounded-full border-2 border-royal-gold">
            <Crown className="w-8 h-8 text-royal-gold" />
          </motion.div>

          {/* Invitation Text */}
          <motion.p initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          delay: 0.8
        }} className="font-cinzel text-royal-gold tracking-[0.2em] mb-6 text-sm md:text-base uppercase">
            {invitation_tag_line}
          </motion.p>

          {/* Names */}
          <div className="font-playfair text-5xl md:text-7xl lg:text-8xl text-white mb-8 space-y-2">
            <motion.div initial={{
            x: -50,
            opacity: 0
          }} animate={{
            x: 0,
            opacity: 1
          }} transition={{
            delay: 1,
            duration: 0.8
          }}>
              {groomName}
            </motion.div>
            <motion.div initial={{
            scale: 0,
            opacity: 0
          }} animate={{
            scale: 1,
            opacity: 1
          }} transition={{
            delay: 1.5,
            type: 'spring'
          }} className="text-3xl md:text-4xl text-royal-gold font-cormorant italic">
              &
            </motion.div>
            <motion.div initial={{
            x: 50,
            opacity: 0
          }} animate={{
            x: 0,
            opacity: 1
          }} transition={{
            delay: 1.2,
            duration: 0.8
          }}>
              {brideName}
            </motion.div>
          </div>

          {/* Date & Location */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 1.8
        }} className="font-cormorant text-xl md:text-2xl tracking-wide border-t border-b border-royal-gold/30 py-4 inline-block px-12">
            <p className="mb-2">{weddingDate}</p>
            <p className="text-royal-goldLight">{weddingLocation}</p>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2" animate={{
          y: [0, 10, 0]
        }} transition={{
          duration: 2,
          repeat: Infinity
        }}>
            <Sparkles className="w-6 h-6 text-royal-gold opacity-70" />
          </motion.div>
        </motion.div>
      </div>
    </section>;
}