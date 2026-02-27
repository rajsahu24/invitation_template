import  { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { BotanicalLeaf } from './BotanicalLeaf';
import { XIcon, ZoomInIcon } from 'lucide-react';
import { usePreview } from '../../../../context/PreviewContext';
const photos = [
{
  src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop',
  alt: 'Couple at sunset',
  span: 'col-span-1'
},
{
  src: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&h=800&fit=crop',
  alt: 'Engagement moment',
  span: 'col-span-1 row-span-2'
},
{
  src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&h=400&fit=crop',
  alt: 'Wedding preparation',
  span: 'col-span-1'
},
{
  src: 'https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=600&h=400&fit=crop',
  alt: 'Together in garden',
  span: 'col-span-1'
},
{
  src: 'https://images.unsplash.com/photo-1460978812857-470ed1c77af0?w=600&h=400&fit=crop',
  alt: 'Romantic walk',
  span: 'col-span-1'
},
{
  src: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=600&h=400&fit=crop',
  alt: 'Celebration',
  span: 'col-span-1'
},
{
  src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=400&fit=crop',
  alt: 'Indian wedding ceremony',
  span: 'col-span-1'
},
{
  src: 'https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?w=600&h=800&fit=crop',
  alt: 'Traditional attire',
  span: 'col-span-1 row-span-2'
},
{
  src: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=600&h=400&fit=crop',
  alt: 'Mehendi ceremony',
  span: 'col-span-1'
}];

function GalleryImage({
  photo,
  index,
  onClick




}: {photo: (typeof photos)[0];index: number;onClick: () => void;}) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: '-50px'
  });
  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        y: 30
      }}
      animate={
      isInView ?
      {
        opacity: 1,
        y: 0
      } :
      {
        opacity: 0,
        y: 30
      }
      }
      transition={{
        duration: 0.6,
        delay: index * 0.1
      }}
      className={`${photo.span} group cursor-pointer`}
      onClick={onClick}>

      <div className="relative h-full overflow-hidden rounded-2xl shadow-lg">
        <img
          src={photo.src}
          alt={photo.alt}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />

        <div className="absolute inset-0 bg-rose/0 group-hover:bg-rose/60 transition-all duration-300 flex items-center justify-center">
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.5
            }}
            whileHover={{
              opacity: 1,
              scale: 1
            }}
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">

            <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
              <ZoomInIcon className="w-6 h-6 text-forest" />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>);

}
function Lightbox({
  photo,
  onClose



}: {photo: (typeof photos)[0];onClose: () => void;}) {
  return (
    <motion.div
      initial={{
        opacity: 0
      }}
      animate={{
        opacity: 1
      }}
      exit={{
        opacity: 0
      }}
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
      onClick={onClose}>

      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full 
                   flex items-center justify-center transition-colors">


        <XIcon className="w-6 h-6 text-white" />
      </button>

      <motion.img
        initial={{
          scale: 0.9,
          opacity: 0
        }}
        animate={{
          scale: 1,
          opacity: 1
        }}
        exit={{
          scale: 0.9,
          opacity: 0
        }}
        src={photo.src}
        alt={photo.alt}
        className="max-w-full max-h-[90vh] object-contain rounded-lg"
        onClick={(e) => e.stopPropagation()} />

    </motion.div>);

}
export function Gallery() {
  const { previewData } = usePreview();
  const apiImages = (previewData as any)?.images || [];
  
  const defaultPhotos = [
    {
      src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop',
      alt: 'Couple at sunset',
      span: 'col-span-1'
    },
    {
      src: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&h=800&fit=crop',
      alt: 'Engagement moment',
      span: 'col-span-1 row-span-2'
    }
  ];
  
  const photos = apiImages.length > 0 ? apiImages.map((img: any, index: number) => ({
    src: img.image_url || img.url,
    alt: img.type || `Photo ${index + 1}`,
    span: index % 4 === 1 || index % 4 === 3 ? 'col-span-1 row-span-2' : 'col-span-1'
  })) : defaultPhotos;
  
  const [selectedPhoto, setSelectedPhoto] = useState<(typeof photos)[0] | null>(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, {
    once: true,
    margin: '-100px'
  });
  return (
    <section
      className="py-24 px-6 bg-cream relative overflow-hidden"
      id="gallery">

      {/* Background decorations */}
      <motion.div
        className="absolute top-10 left-10 text-sage-dark opacity-20"
        animate={{
          rotate: [0, 5, 0]
        }}
        transition={{
          duration: 12,
          repeat: Infinity
        }}>

        <BotanicalLeaf variant="single" animate={false} className="w-20 h-28" />
      </motion.div>

      <motion.div
        className="absolute bottom-10 right-10 text-sage-dark opacity-20"
        animate={{
          rotate: [0, -5, 0]
        }}
        transition={{
          duration: 10,
          repeat: Infinity
        }}>

        <BotanicalLeaf
          variant="single"
          animate={false}
          className="w-16 h-24 rotate-45" />

      </motion.div>

      <div className="max-w-6xl mx-auto" ref={containerRef}>
        <motion.div
          initial={{
            opacity: 0,
            y: 30
          }}
          animate={
          isInView ?
          {
            opacity: 1,
            y: 0
          } :
          {
            opacity: 0,
            y: 30
          }
          }
          transition={{
            duration: 0.8
          }}
          className="text-center mb-16">

          <h2 className="font-serif text-4xl md:text-5xl text-forest mb-4">
            Our Moments
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-rose" />
            <BotanicalLeaf
              variant="small"
              animate={false}
              className="w-6 h-6 text-forest-light" />

            <div className="h-px w-12 bg-rose" />
          </div>
          <p className="mt-6 text-forest-light max-w-xl mx-auto">
            A glimpse into our journey together — moments we've cherished and
            memories we've made
          </p>
        </motion.div>

        {/* Gallery grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[200px]">
          {photos.map((photo:any, index:number) =>
          <GalleryImage
            key={index}
            photo={photo}
            index={index}
            onClick={() => setSelectedPhoto(photo)} />

          )}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto &&
        <Lightbox
          photo={selectedPhoto}
          onClose={() => setSelectedPhoto(null)} />

        }
      </AnimatePresence>
    </section>);

}