import { motion } from 'framer-motion';
import { OrnateFrame } from './OrnateFrame';
import { usePreview } from '../../../../context/PreviewContext';




const DUMMY_IMAGES = [
  { image_url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80' },
  { image_url: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=80' },
  { image_url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80' },
  { image_url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80' },
  { image_url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80' },
  { image_url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=80' }
];

export function PhotoGallery() {
  const { previewData } = usePreview();
  const images = (previewData as any)?.image_section?.data?.images || [];
  
  const displayImages = Array.isArray(images) && images.length > 0 ? images : DUMMY_IMAGES;
  return <section className="py-24 bg-royal-cream relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl text-royal-deepPurple mb-4">
            Our Moments
          </h2>
          <div className="h-1 w-24 bg-royal-gold mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {displayImages.map((photo: any, index: number) => (
              <motion.div key={index} initial={{
                opacity: 0,
                y: 50
              }} whileInView={{
                opacity: 1,
                y: 0
              }} viewport={{
                once: true
              }} transition={{
                delay: index * 0.1,
                duration: 0.6
              }}>
                <OrnateFrame className="h-full">
                  <motion.div className="overflow-hidden rounded-sm aspect-[3/4] relative group cursor-pointer" whileHover={{
                    scale: 1.02
                  }} transition={{
                    duration: 0.3
                  }}>
                    <div className="absolute inset-0 border-4 border-royal-gold/20 z-10 pointer-events-none" />
                    <motion.img src={photo.image_url} alt={`Gallery photo ${index + 1}`} className="w-full h-full object-cover" whileHover={{
                      scale: 1.1
                    }} transition={{
                      duration: 0.6
                    }} />
                    <div className="absolute inset-0 bg-royal-purple/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>
                </OrnateFrame>
              </motion.div>
          ))}
        </div>
      </div>
    </section>;
}