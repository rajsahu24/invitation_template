
import { motion } from 'framer-motion';
import { MandalaPattern, CornerDecoration } from './ui/OrnateDecorations';
import { ChevronDown } from 'lucide-react';
import { usePreview } from '../../../../context/PreviewContext';
export function Hero() {
  const { previewData } = usePreview();
  const heroSection = previewData?.hero_section;
  const data = heroSection?.data;
  const schema = heroSection?.schema;
  console.log("data",data)
  const getFieldValue = (key: string) => (data && typeof data === 'object' ? data[key] : '') || '';
  
  let brideName = '';
  let groomName = '';
  let weddingDate = '';
  let weddingLocation = '';
  let tagLine = '';

  if (data && typeof data === 'object') {
    if (schema?.fields) {
      const findField = (keywords: string[]) => 
        schema.fields.find((f: any) => keywords.some(k => f.key.toLowerCase().includes(k)));

      const brideField = findField(['bride']);
      const groomField = findField(['groom']);
      const dateField = findField(['date']);
      const locationField = findField(['location']);
      const tagLineField = findField(['tag', 'line']);

      brideName = brideField ? getFieldValue(brideField.key) : '';
      groomName = groomField ? getFieldValue(groomField.key) : '';
      weddingDate = dateField ? getFieldValue(dateField.key) : '';
      weddingLocation = locationField ? getFieldValue(locationField.key) : '';
      tagLine = tagLineField ? getFieldValue(tagLineField.key) : '';
    } else {
      brideName = getFieldValue('bride_name');
      groomName = getFieldValue('groom_name');
      weddingDate = getFieldValue('date') || getFieldValue('wedding_date');
      weddingLocation = getFieldValue('location') || getFieldValue('wedding_location');
      tagLine = getFieldValue('tag_line') || getFieldValue('invitation_tag_line');
    }
  }

  const displayGroomName = groomName || 'Aarav';
  const displayBrideName = brideName || 'Priya';
  const displayWeddingDate = weddingDate || 'December 12th, 2024';
  const displayWeddingLocation = weddingLocation || 'Udaipur, Rajasthan';
  const displayTagLine = tagLine || 'The Wedding Celebration Of';
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
              {displayTagLine}
            </h2>

            <h1 className="font-serif-display text-5xl md:text-7xl lg:text-8xl text-[#2D2D2D] mb-4 leading-tight">
              {displayGroomName} <span className="text-[#D4AF37]">&</span> {displayBrideName}
            </h1>

            <div className="flex items-center justify-center space-x-4 my-8">
              <div className="h-[1px] w-12 bg-[#8B0000]"></div>
              <div className="w-2 h-2 rotate-45 bg-[#D4AF37]"></div>
              <div className="h-[1px] w-12 bg-[#8B0000]"></div>
            </div>

            <p className="font-serif-display text-2xl md:text-3xl text-[#8B0000] italic mb-8">
              {displayWeddingDate}
            </p>

            <p className="text-gray-600 uppercase tracking-widest text-xs md:text-sm">
              {displayWeddingLocation}
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