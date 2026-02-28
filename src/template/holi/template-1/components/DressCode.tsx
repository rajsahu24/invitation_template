import  { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
export function DressCode() {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: '-100px'
  });
  const tips = [
  {
    emoji: '👕',
    text: 'Old kapde pehno — Purane, not Armani!',
    subtext: "(Wear old clothes — they won't survive!)"
  },
  {
    emoji: '🕶️',
    text: 'Sunglasses are your best friend',
    subtext: '(Protect those eyes from gulaal!)'
  },
  {
    emoji: '📱',
    text: 'Waterproof phone cover lao!',
    subtext: '(Your phone will thank you later)'
  }];

  return (
    <section ref={ref} className="py-16 md:py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="bg-cream rounded-lg ornate-border p-8 md:p-12"
          initial={{
            scale: 0.8,
            opacity: 0
          }}
          animate={
          isInView ?
          {
            scale: 1,
            opacity: 1
          } :
          {}
          }
          transition={{
            duration: 0.5
          }}>

          {/* Main Heading */}
          <motion.div
            className="text-center mb-8"
            initial={{
              y: 20,
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
              delay: 0.2
            }}>

            <h2 className="font-heading font-bold text-3xl md:text-5xl text-royal-purple mb-4">
              👗 Dress Code
            </h2>
            <div className="inline-block bg-royal-purple px-6 py-3 rounded-lg">
              <p className="font-heading font-bold text-2xl md:text-3xl text-gold">
                WHITE Pehnna Zaroori Hai!
              </p>
            </div>
            <p className="font-body text-dark/70 mt-3 text-lg">
              (Wearing White is Mandatory — the colors need a canvas!)
            </p>
          </motion.div>

          {/* White Outfit Illustration */}
          <motion.div
            className="flex justify-center mb-10"
            initial={{
              scale: 0
            }}
            animate={
            isInView ?
            {
              scale: 1
            } :
            {}
            }
            transition={{
              delay: 0.3,
              type: 'spring'
            }}>

            <div className="relative">
              {/* T-Shirt Shape */}
              <div className="w-32 h-36 md:w-40 md:h-44 bg-white border-4 border-dark/20 rounded-lg relative">
                {/* Collar */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1">
                  <div className="w-8 h-4 bg-white border-2 border-dark/20 rounded-b-full" />
                </div>
                {/* Sleeves */}
                <div className="absolute -left-6 top-2 w-8 h-12 bg-white border-4 border-dark/20 rounded-lg transform -rotate-12" />
                <div className="absolute -right-6 top-2 w-8 h-12 bg-white border-4 border-dark/20 rounded-lg transform rotate-12" />

                {/* Color Splashes */}
                <div className="absolute top-4 left-4 w-6 h-6 bg-magenta rounded-full opacity-60" />
                <div className="absolute top-8 right-6 w-4 h-4 bg-marigold rounded-full opacity-60" />
                <div className="absolute bottom-8 left-6 w-5 h-5 bg-royal-purple rounded-full opacity-60" />
                <div className="absolute bottom-4 right-4 w-3 h-3 bg-gold rounded-full opacity-70" />
              </div>

              {/* Arrow pointing to shirt */}
              <div className="absolute -right-16 top-1/2 transform -translate-y-1/2 text-royal-purple">
                <span className="font-heading font-bold text-lg">← This!</span>
              </div>
            </div>
          </motion.div>

          {/* Tips */}
          <div className="space-y-4">
            {tips.map((tip, index) =>
            <motion.div
              key={index}
              className="flex items-start gap-4 p-4 bg-royal-purple/10 rounded-lg border-2 border-royal-purple/20"
              initial={{
                x: -30,
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
                delay: 0.4 + index * 0.1
              }}>

                <span className="text-3xl flex-shrink-0">{tip.emoji}</span>
                <div>
                  <p className="font-heading font-bold text-dark text-lg">
                    {tip.text}
                  </p>
                  <p className="font-body text-dark/60 text-sm">
                    {tip.subtext}
                  </p>
                </div>
              </motion.div>
            )}
          </div>

          {/* Bottom Note */}
          <motion.p
            className="text-center mt-8 font-body text-royal-purple text-sm"
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

            Pro tip: Coconut oil lagao baalon mein! 🥥
          </motion.p>
        </motion.div>
      </div>
    </section>);

}