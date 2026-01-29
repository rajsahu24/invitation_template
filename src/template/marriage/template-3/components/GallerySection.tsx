
import { motion } from 'framer-motion';
import { SectionDivider } from './ui/OrnateDecorations';
const photos = [
'https://images.unsplash.com/photo-1605218427368-35b0f996d716?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
'https://images.unsplash.com/photo-1587271407850-8d43891882c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
'https://images.unsplash.com/photo-1621621667797-e06afc217fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
'https://images.unsplash.com/photo-1583939411023-147850f3ad4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'];

export function GallerySection() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{
            opacity: 0,
            y: 30
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          viewport={{
            once: true
          }}
          transition={{
            duration: 0.8
          }}
          className="text-center mb-16">

          <h2 className="text-4xl md:text-5xl font-serif-display text-[#8B0000] mb-4">
            Captured Moments
          </h2>
          <SectionDivider />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo, index) =>
          <motion.div
            key={index}
            initial={{
              opacity: 0,
              scale: 0.9
            }}
            whileInView={{
              opacity: 1,
              scale: 1
            }}
            viewport={{
              once: true
            }}
            transition={{
              duration: 0.6,
              delay: index * 0.1
            }}
            className="relative group overflow-hidden aspect-[3/4] rounded-lg shadow-lg cursor-pointer">

              <div className="absolute inset-0 border-8 border-white z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 border-2 border-[#D4AF37] m-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-95 group-hover:scale-100"></div>

              <img
              src={photo}
              alt={`Gallery ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />

              <div className="absolute inset-0 bg-[#8B0000]/20 group-hover:bg-transparent transition-colors duration-300"></div>
            </motion.div>
          )}
        </div>
      </div>
    </section>);

}