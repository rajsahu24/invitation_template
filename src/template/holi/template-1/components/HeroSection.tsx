import  { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { usePreview } from '../../../../context/PreviewContext';

// const formatDate = (dateString: string): string => {
//   const date = new Date(dateString);
//   return date.toLocaleDateString('en-US', {
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric'
//   });
// };

export function HeroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { previewData } = usePreview();
  const heroSection = previewData?.subhero_section;
  const data = heroSection?.data;
  const schema = heroSection?.schema;

  const getFieldValue = (key: string) => (data && typeof data === 'object' ? data[key] : '') || '';
  
  let eventTitle = '';
  let subtitle = '';
  let tagline = '';

  if (data && typeof data === 'object') {
    if (schema?.fields) {
      const findField = (keywords: string[]) => 
        schema.fields.find((f: any) => keywords.some(k => f.key.toLowerCase().includes(k)));
      
      const titleField = findField(['title', 'name']);
      const subtitleField = findField(['subtitle', 'tagline']);
      const descField = findField(['description', 'message']);

      eventTitle = titleField ? getFieldValue(titleField.key) : '';
      subtitle = subtitleField ? getFieldValue(subtitleField.key) : '';
      tagline = descField ? getFieldValue(descField.key) : '';
    } else {
      eventTitle = getFieldValue('event_title') || getFieldValue('title');
      subtitle = getFieldValue('subtitle') || getFieldValue('tagline');
      tagline = getFieldValue('description') || getFieldValue('message');
    }
  }

  const displayTitle = eventTitle || '🎨 Holi Hai! 🎨';
  const displaySubtitle = subtitle || 'Rang Barse... at the Party of the Year!';
  const displayTagline = tagline || 'Get ready for colors, music, dance & unlimited masti! 🌈';
  return (
    <section
      ref={ref}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden py-8 px-4">

      {/* Starburst Background */}
      <div className="absolute inset-0 starburst opacity-30" />

      {/* Radial Fade Overlay */}
      <div
        className="absolute inset-0 bg-gradient-radial from-transparent via-dark/50 to-dark"
        style={{
          background:
          'radial-gradient(circle at center, transparent 0%, #1A0A2E 70%)'
        }} />


      {/* Decorative Corner Elements */}
      <motion.div
        className="absolute top-8 left-8 text-gold text-4xl md:text-6xl"
        initial={{
          opacity: 0,
          rotate: -180,
          scale: 0
        }}
        animate={
        isInView ?
        {
          opacity: 1,
          rotate: 0,
          scale: 1
        } :
        {}
        }
        transition={{
          duration: 0.8,
          delay: 0.5
        }}>

        ❁
      </motion.div>
      <motion.div
        className="absolute top-8 right-8 text-magenta text-4xl md:text-6xl"
        initial={{
          opacity: 0,
          rotate: 180,
          scale: 0
        }}
        animate={
        isInView ?
        {
          opacity: 1,
          rotate: 0,
          scale: 1
        } :
        {}
        }
        transition={{
          duration: 0.8,
          delay: 0.6
        }}>

        ❁
      </motion.div>
      <motion.div
        className="absolute bottom-8 left-8 text-marigold text-4xl md:text-6xl"
        initial={{
          opacity: 0,
          rotate: -180,
          scale: 0
        }}
        animate={
        isInView ?
        {
          opacity: 1,
          rotate: 0,
          scale: 1
        } :
        {}
        }
        transition={{
          duration: 0.8,
          delay: 0.7
        }}>

        ❁
      </motion.div>
      <motion.div
        className="absolute bottom-8 right-8 text-royal-purple text-4xl md:text-6xl"
        initial={{
          opacity: 0,
          rotate: 180,
          scale: 0
        }}
        animate={
        isInView ?
        {
          opacity: 1,
          rotate: 0,
          scale: 1
        } :
        {}
        }
        transition={{
          duration: 0.8,
          delay: 0.8
        }}>

        ❁
      </motion.div>

      {/* Main Content Frame */}
      <motion.div
        className="relative z-10 double-border-frame corner-flourish bg-dark/90 p-8 md:p-16 max-w-3xl mx-auto text-center"
        initial={{
          scale: 0.3,
          rotate: -10,
          opacity: 0
        }}
        animate={
        isInView ?
        {
          scale: 1,
          rotate: 0,
          opacity: 1
        } :
        {}
        }
        transition={{
          duration: 0.8,
          type: 'spring',
          bounce: 0.4
        }}>

        {/* Paint Splashes */}
        <div className="absolute -top-4 -left-4 w-16 h-16 bg-magenta rounded-full opacity-60 blur-sm" />
        <div className="absolute -top-2 -right-6 w-12 h-12 bg-marigold rounded-full opacity-60 blur-sm" />
        <div className="absolute -bottom-3 -left-5 w-14 h-14 bg-royal-purple rounded-full opacity-60 blur-sm" />
        <div className="absolute -bottom-4 -right-4 w-10 h-10 bg-gold rounded-full opacity-70 blur-sm" />

        {/* Main Title */}
        <motion.div
          initial={{
            y: 50,
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
            duration: 0.6,
            delay: 0.3
          }}>

          <h1 className="font-heading font-black text-5xl md:text-7xl lg:text-8xl text-gold mb-4 drop-shadow-lg">
            {displayTitle}
          </h1>
        </motion.div>

        {/* Decorative Line */}
        <motion.div
          className="w-32 h-1 bg-gradient-to-r from-magenta via-gold to-marigold mx-auto mb-6"
          initial={{
            scaleX: 0
          }}
          animate={
          isInView ?
          {
            scaleX: 1
          } :
          {}
          }
          transition={{
            duration: 0.6,
            delay: 0.5
          }} />


        {/* Subtitle */}
        <motion.p
          className="font-heading text-xl md:text-3xl text-cream mb-6"
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
            duration: 0.6,
            delay: 0.5
          }}>

          {displaySubtitle}
        </motion.p>

        {/* Tagline */}
        <motion.p
          className="font-body text-lg md:text-xl text-marigold"
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
            duration: 0.6,
            delay: 0.7
          }}>

          {displayTagline}
        </motion.p>

        {/* Scroll Indicator */}
        <motion.div
          className="mt-8"
          initial={{
            opacity: 0
          }}
          animate={
          isInView ?
          {
            opacity: 1,
            y: [0, 10, 0]
          } :
          {}
          }
          transition={{
            duration: 1.5,
            delay: 1,
            repeat: Infinity
          }}>

          <span className="text-gold text-2xl">↓</span>
        </motion.div>
      </motion.div>
    </section>);

}