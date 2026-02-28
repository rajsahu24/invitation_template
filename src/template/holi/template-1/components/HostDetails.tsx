import  { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { usePreview } from '../../../../context/PreviewContext';
export function HostDetails() {
    const { previewData } = usePreview();
    const heroSection = previewData?.hero_section;
    const data = heroSection?.data;
    // const schema = heroSection?.schema;
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: '-100px'
  });
  return (
    <section ref={ref} className="py-16 md:py-24 px-4">
      <div className="max-w-4xl mx-auto flex justify-center">
        <motion.div
          className="relative"
          initial={{
            scale: 0,
            rotate: -180
          }}
          animate={
          isInView ?
          {
            scale: 1,
            rotate: 0
          } :
          {}
          }
          transition={{
            duration: 0.8,
            type: 'spring',
            bounce: 0.3
          }}>

          {/* Outer Decorative Ring with Beads */}
          <div className="absolute inset-0 rounded-full medallion-beads" />

          {/* Main Medallion */}
          <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full border-6 border-gold bg-gradient-to-br from-magenta via-royal-purple to-magenta p-1">
            {/* Inner Border */}
            <div className="w-full h-full rounded-full border-4 border-marigold/50 flex flex-col items-center justify-center text-center p-6">
              {/* Decorative Top */}
              <motion.span
                className="text-gold text-3xl mb-2"
                initial={{
                  opacity: 0,
                  y: -20
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
                  delay: 0.5
                }}>

                ✦
              </motion.span>

              {/* Subtitle */}
              <motion.p
                className="font-body text-cream/80 text-sm md:text-base mb-2"
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
                  delay: 0.6
                }}>

                Cordially invite you to celebrate
              </motion.p>

              {/* Host Names */}
              <motion.h2
                className="font-heading font-bold text-2xl md:text-3xl text-gold mb-2 leading-tight"
                initial={{
                  opacity: 0,
                  scale: 0.5
                }}
                animate={
                isInView ?
                {
                  opacity: 1,
                  scale: 1
                } :
                {}
                }
                transition={{
                  delay: 0.7,
                  type: 'spring'
                }}>

                {data?.family_name?data?.family_name:"invited person"}
              </motion.h2>

              {/* Decorative Line */}
              <motion.div
                className="w-20 h-0.5 bg-gold my-3"
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
                  delay: 0.8
                }} />


              {/* Event Name */}
              <motion.p
                className="font-heading text-cream text-lg md:text-xl"
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
                  delay: 0.9
                }}>

                {data?.tag_line?data?.tag_line:"Holi Milan 2026"}
              </motion.p>

              {/* Decorative Bottom */}
              <motion.span
                className="text-gold text-3xl mt-2"
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
                  delay: 1
                }}>

                ✦
              </motion.span>
            </div>
          </div>

          {/* Floating Decorative Elements */}
          <motion.div
            className="absolute -top-4 -right-4 w-8 h-8 bg-marigold rounded-full"
            animate={{
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity
            }} />

          <motion.div
            className="absolute -bottom-4 -left-4 w-6 h-6 bg-gold rounded-full"
            animate={{
              scale: [1, 1.3, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: 0.5
            }} />

        </motion.div>
      </div>
    </section>);

}