import { motion } from 'framer-motion';
import { OrnateFrame } from './OrnateFrame';
import { usePreview } from '../../../../context/PreviewContext';




export function PhotoGallery() {
   const { previewData } = usePreview();
   const images = (previewData as any).images || [];
  return <section className="py-24 bg-royal-cream relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl text-royal-deepPurple mb-4">
            Our Moments
          </h2>
          <div className="h-1 w-24 bg-royal-gold mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {images.length=== 0  ? (
            <div className="col-span-full flex items-center justify-center py-20">
              <div className="w-8 h-8 border-2 border-royal-gold border-t-transparent rounded-full animate-spin" />
            </div>
          ) : images.length === 0 ? (
            <div className="col-span-full text-center py-20">
              <p className="text-royal-deepPurple/60 font-playfair italic">No photos available yet</p>
            </div>
          ) : (
            images.map((photo:any, index:number) => (
              <motion.div key={photo.id} initial={{
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
            ))
          )}
        </div>
      </div>
    </section>;
}