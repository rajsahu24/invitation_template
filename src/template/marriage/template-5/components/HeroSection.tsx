// import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { usePreview } from '../../../../context/PreviewContext';

const VIDEO_URL = 'https://res.cloudinary.com/dwbed0m72/video/upload/v1773653757/hero-video-BkP1eoiB_d6pqrn.mp4';

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).replace(/\d+/, (day) => {
    const num = parseInt(day);
    const suffix = num % 10 === 1 && num !== 11 ? 'st' :
                   num % 10 === 2 && num !== 12 ? 'nd' :
                   num % 10 === 3 && num !== 13 ? 'rd' : 'th';
    return num + suffix;
  });
};

export function HeroSection() {
  const { previewData } = usePreview();
  const heroSection = previewData?.hero_section;
  const data = heroSection?.data;
  const schema = heroSection?.schema;

  const getFieldValue = (key: string) => (data && typeof data === 'object' ? data[key] : '') || '';
  
  let brideName = '';
  let groomName = '';
  let weddingDate = '';
  let tagLine = '';

  if (data && typeof data === 'object') {
    if (schema?.fields) {
      const findField = (keywords: string[]) => 
        schema.fields.find((f: any) => keywords.some(k => f.key.toLowerCase().includes(k)));
      
      const brideField = findField(['bride']);
      const groomField = findField(['groom']);
      const dateField = findField(['date']);
      const tagLineField = findField(['tag', 'line']);

      brideName = brideField ? getFieldValue(brideField.key) : '';
      groomName = groomField ? getFieldValue(groomField.key) : '';
      weddingDate = dateField ? formatDate(getFieldValue(dateField.key)) : '';
      tagLine = tagLineField ? getFieldValue(tagLineField.key) : '';
    } else {
      brideName = getFieldValue('bride_name');
      groomName = getFieldValue('groom_name');
      const dateValue = getFieldValue('date') || getFieldValue('wedding_date');
      weddingDate = dateValue ? formatDate(dateValue) : '';
      tagLine = getFieldValue('tag_line') || getFieldValue('invitation_tag_line');
    }
  }

  const displayGroomName = groomName || 'Alexander';
  const displayBrideName = brideName || 'Victoria';
  const displayWeddingDate = weddingDate || formatDate('2024-12-12');
  const displayTagLine = tagLine || 'Join us to celebrate our special day';


  return (
    <section className="relative min-h-screen flex flex-col items-center justify-between py-20 overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src={VIDEO_URL} type="video/mp4" />
      </video>

      {/* Dark Overlay for readability */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Additional gradient overlay for better text visibility */}
      <div className="absolute inset-0 " />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 h-[48rem] flex flex-col items-center justify-between ">
        
        {/* TOP: Tagline */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mt-8"
        >
          <p className="font-cinzel text-white tracking-[0.3em] text-center text-sm md:text-base uppercase">
            {displayTagLine}
          </p>
        </motion.div>

        {/* MIDDLE: Names */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-center"
        >
          <div className="font-playfair text-5xl md:text-7xl lg:text-8xl text-white space-y-2">
            <div className="leading-tight">
              <span className="inline-block">{displayGroomName}</span>
            </div>
            
            {/* Ampersand with decorative elements */}
            <motion.div 
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, type: 'spring' }}
              className="flex items-center justify-center gap-4 my-4"
            >
              <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent to-amber-300" />
              <span className="text-3xl md:text-4xl text-amber-300 font-cormorant italic">&</span>
              <div className="h-px w-16 md:w-24 bg-gradient-to-l from-transparent to-amber-300" />
            </motion.div>
            
            <div className="leading-tight">
              <span className="inline-block">{displayBrideName}</span>
            </div>
          </div>
        </motion.div>

        {/* BOTTOM: Wedding Date */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mb-8"
        >
          <div className="font-cormorant text-xl md:text-2xl tracking-wide">
            <span className="inline-block px-8 py-3 border-t border-b border-white/30 text-white/90">
              {displayWeddingDate}
            </span>
          </div>
        </motion.div>

        {/* Scroll Indicator at very bottom */}
        <motion.div 
          className="absolute bottom-8"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Sparkles className="w-6 h-6 text-amber-300 mx-auto opacity-70" />
        </motion.div>
      </div>
    </section>
  );
}
