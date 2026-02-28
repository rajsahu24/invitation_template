import  { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { usePreview } from '../../../../context/PreviewContext';

interface GalleryFrame {
  id: string;
  title: string;
  gradient: string;
  image_url?: string;
}

export function GallerySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { previewData } = usePreview();
  const gallerySection = previewData?.image_section;
  const apiImages = gallerySection?.data?.images || [];
  
  const defaultFrames: GalleryFrame[] = [
    { id: '01', title: 'Holi 2025 Madness', gradient: 'from-magenta to-marigold' },
    { id: '02', title: 'Color Explosion', gradient: 'from-royal-purple to-magenta' },
    { id: '03', title: 'Dance Floor Vibes', gradient: 'from-marigold to-gold' },
    { id: '04', title: 'Thandai Time', gradient: 'from-gold to-royal-purple' },
    { id: '05', title: 'Group Photo', gradient: 'from-deep-red to-marigold' },
    { id: '06', title: 'Sunset Colors', gradient: 'from-magenta to-royal-purple' }
  ];
  
  const gradients = ['from-magenta to-marigold', 'from-royal-purple to-magenta', 'from-marigold to-gold', 'from-gold to-royal-purple'];
  
  const frames: GalleryFrame[] = Array.isArray(apiImages) && apiImages.length > 0 
    ? apiImages.map((img: any, index: number) => ({
        id: String(index + 1).padStart(2, '0'),
        title: img.type || `Photo ${index + 1}`,
        gradient: gradients[index % gradients.length],
        image_url: img.image_url || img.url
      }))
    : defaultFrames;
  return (
    <section ref={ref} className="py-16 md:py-24">
      {/* Section Title */}
      <motion.div
        className="text-center mb-8 px-4"
        initial={{
          y: 30,
          opacity: 0
        }}
        animate={
        isInView ?
        {
          y: 0,
          opacity: 1
        } :
        {}
        }
        transition={{
          duration: 0.5
        }}>

        <h2 className="font-heading font-bold text-3xl md:text-5xl text-gold mb-4">
          🎞️ Pichle Saal Ki Yaadein
        </h2>
        <p className="font-body text-cream/80 text-lg">
          (Last Year's Memories)
        </p>
      </motion.div>

      {/* Filmstrip Container */}
      <motion.div
        className="filmstrip py-8"
        initial={{
          x: 100,
          opacity: 0
        }}
        animate={
        isInView ?
        {
          x: 0,
          opacity: 1
        } :
        {}
        }
        transition={{
          duration: 0.6,
          delay: 0.2
        }}>

        <div className="overflow-x-auto filmstrip-scroll px-4 py-6">
          <div className="flex gap-4 md:gap-6 w-max px-4">
            {frames.map((frame, index) =>
            <motion.div
              key={frame.id}
              className="relative flex-shrink-0 w-48 md:w-64 h-36 md:h-48 rounded-lg overflow-hidden border-4 border-cream/30"
              initial={{
                opacity: 0,
                y: 20
              }}
              animate={
              isInView ?
              {
                opacity: 1,
                y: 0
              } :
              {}
              }
              transition={{
                delay: 0.3 + index * 0.1
              }}
              whileHover={{
                scale: 1.05,
                borderColor: '#FFD700'
              }}>

                {/* Gradient Background or Image */}
                {frame.image_url ? (
                  <img 
                    src={frame.image_url} 
                    alt={frame.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div className={`absolute inset-0 bg-gradient-to-br ${frame.gradient}`} />
                )}


                {/* Frame Number */}
                <div className="absolute top-2 left-2 bg-dark/60 px-2 py-1 rounded">
                  <span className="font-body text-gold text-xs font-bold">
                    {frame.id}
                  </span>
                </div>

                {/* Frame Content */}
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <p className="font-heading text-cream text-center text-lg md:text-xl font-bold drop-shadow-lg">
                    {frame.title}
                  </p>
                </div>

                {/* Film Grain Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark/30 to-transparent" />
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Scroll Hint */}
      <motion.p
        className="text-center font-body text-cream/50 text-sm mt-4"
        initial={{
          opacity: 0
        }}
        animate={
        isInView ?
        {
          opacity: 1
        } :
        {}
        }
        transition={{
          delay: 0.8
        }}>

        ← Swipe to see more →
      </motion.p>
    </section>);

}