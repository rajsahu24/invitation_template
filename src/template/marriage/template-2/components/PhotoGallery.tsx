
import { motion } from 'framer-motion';

import { usePreview } from '../../../../context/PreviewContext';


const containerVariants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

// Ornate Corner SVG
const CornerFlourish = ({
  className
}: {
  className?: string;
}) => <svg viewBox="0 0 50 50" className={`absolute w-8 h-8 text-gold z-10 ${className}`} fill="currentColor">
    <path d="M0,0 L20,0 C10,0 5,5 5,15 L5,35 L0,35 Z" />
    <path d="M0,0 L0,20 C0,10 5,5 15,5 L35,5 L35,0 Z" />
  </svg>;
export function PhotoGallery() {
  const { previewData } = usePreview();
  const images = (previewData as any).images || [];


  return <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{
    once: true,
    margin: '-100px'
  }} className="max-w-4xl mx-auto py-8 px-4">
      <div className="text-center mb-12 relative">
        <div className="absolute left-1/2 -translate-x-1/2 -top-8 text-gold opacity-20 text-7xl font-display">
          ❦
        </div>
        <span className="text-maroon tracking-[0.2em] text-sm font-bold uppercase block mb-3 font-serif">
          Pre-Wedding
        </span>
        <h2 className="text-3xl md:text-5xl font-display text-brown drop-shadow-sm">
          Our Journey
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        <motion.div className="md:col-span-2 relative group">
          <div className="relative p-2 border-4 border-double border-gold/40 bg-white/50 shadow-lg transform transition-transform duration-500 hover:scale-[1.01]">
            <CornerFlourish className="top-0 left-0" />
            <CornerFlourish className="top-0 right-0 rotate-90" />
            <CornerFlourish className="bottom-0 right-0 rotate-180" />
            <CornerFlourish className="bottom-0 left-0 -rotate-90" />
            <div className="overflow-hidden aspect-[16/9]">
              <img src={images[0]?.image_url} alt="Gallery photo 1" className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110" />
            </div>
          </div>
        </motion.div>

        {images.slice(1).map((photo: any, index: number) => (
          <motion.div key={photo.id} className="relative group">
            <div className="relative p-2 border-4 border-double border-gold/40 bg-white/50 shadow-lg transform transition-transform duration-500 hover:scale-[1.02]">
              <CornerFlourish className="top-0 left-0 scale-75" />
              <CornerFlourish className="top-0 right-0 rotate-90 scale-75" />
              <CornerFlourish className="bottom-0 right-0 rotate-180 scale-75" />
              <CornerFlourish className="bottom-0 left-0 -rotate-90 scale-75" />
              <div className="overflow-hidden aspect-[4/3]">
                <img src={photo.image_url} alt={`Gallery photo ${index + 2}`} className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-12">
        <p className="font-serif italic text-brown/80 text-lg">
          "Capturing moments of love and laughter..."
        </p>
      </div>
    </motion.div>;
}