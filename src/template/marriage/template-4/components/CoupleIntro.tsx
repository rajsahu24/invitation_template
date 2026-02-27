import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { BotanicalLeaf } from './BotanicalLeaf';
function AnimatedSection({
  children,
  delay = 0



}: {children: React.ReactNode;delay?: number;}) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: '-100px'
  });
  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        y: 40
      }}
      animate={
      isInView ?
      {
        opacity: 1,
        y: 0
      } :
      {
        opacity: 0,
        y: 40
      }
      }
      transition={{
        duration: 0.8,
        delay,
        ease: 'easeOut'
      }}>

      {children}
    </motion.div>);

}
export function CoupleIntro() {
  return (
    <section className="py-24 px-6 bg-cream relative overflow-hidden">
      {/* Background decorations */}
      <motion.div
        className="absolute top-10 right-10 text-sage-dark opacity-20"
        animate={{
          rotate: [0, 5, 0]
        }}
        transition={{
          duration: 10,
          repeat: Infinity
        }}>

        <BotanicalLeaf variant="branch" animate={false} className="w-32 h-40" />
      </motion.div>

      <motion.div
        className="absolute bottom-10 left-10 text-sage-dark opacity-20"
        animate={{
          rotate: [0, -5, 0]
        }}
        transition={{
          duration: 12,
          repeat: Infinity
        }}>

        <BotanicalLeaf
          variant="branch"
          animate={false}
          className="w-28 h-36 rotate-180" />

      </motion.div>

      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl text-forest mb-4">
              Our Love Story
            </h2>
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-12 bg-rose" />
              <BotanicalLeaf
                variant="small"
                animate={false}
                className="w-6 h-6 text-forest-light" />

              <div className="h-px w-12 bg-rose" />
            </div>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Aarav */}
          <AnimatedSection delay={0.2}>
            <div className="text-center">
              <div className="relative inline-block mb-6">
                <div className="w-64 h-64 md:w-72 md:h-72 rounded-3xl overflow-hidden border-4 border-sage shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
                    alt="Aarav"
                    className="w-full h-full object-cover" />

                </div>
                <motion.div
                  className="absolute -bottom-4 -right-4 text-forest-light"
                  animate={{
                    rotate: [0, 10, 0]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity
                  }}>

                  <BotanicalLeaf
                    variant="single"
                    animate={false}
                    className="w-12 h-16" />

                </motion.div>
              </div>
              <h3 className="font-serif text-3xl text-forest mb-2">
                Aarav Sharma
              </h3>
              <p className="text-rose font-medium mb-4">The Groom</p>
              <p className="text-forest-light leading-relaxed max-w-sm mx-auto">
                A dreamer with a heart full of adventure, Aarav believes that
                life's greatest journeys are the ones we take together. When
                he's not exploring new places, you'll find him lost in music or
                cooking up something special in the kitchen.
              </p>
            </div>
          </AnimatedSection>

          {/* Meera */}
          <AnimatedSection delay={0.4}>
            <div className="text-center">
              <div className="relative inline-block mb-6">
                <div className="w-64 h-64 md:w-72 md:h-72 rounded-3xl overflow-hidden border-4 border-sage shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face"
                    alt="Meera"
                    className="w-full h-full object-cover" />

                </div>
                <motion.div
                  className="absolute -bottom-4 -left-4 text-forest-light"
                  animate={{
                    rotate: [0, -10, 0]
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity
                  }}>

                  <BotanicalLeaf
                    variant="single"
                    animate={false}
                    className="w-12 h-16 -scale-x-100" />

                </motion.div>
              </div>
              <h3 className="font-serif text-3xl text-forest mb-2">
                Meera Patel
              </h3>
              <p className="text-rose font-medium mb-4">The Bride</p>
              <p className="text-forest-light leading-relaxed max-w-sm mx-auto">
                With a smile that lights up every room and a spirit as free as
                the wind, Meera finds magic in the little things. An artist at
                heart, she paints her world with love, laughter, and endless
                cups of chai.
              </p>
            </div>
          </AnimatedSection>
        </div>

        {/* How we met */}
        <AnimatedSection delay={0.6}>
          <div className="mt-20 text-center">
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 md:p-12 max-w-3xl mx-auto border border-sage/30 shadow-lg">
              <h3 className="font-serif text-2xl md:text-3xl text-forest mb-6">
                How We Met
              </h3>
              <p className="text-forest-light leading-relaxed">
                It was a rainy evening in Mumbai when fate brought us together
                at a friend's art exhibition. Aarav was admiring a painting, and
                Meera was the artist behind it. What started as a conversation
                about colors and dreams turned into late-night chai sessions,
                endless laughter, and a love story that we're now ready to
                celebrate with all of you.
              </p>
              <div className="flex items-center justify-center gap-2 mt-6 text-rose">
                <span className="text-2xl">♥</span>
                <span className="font-serif italic">Together since 2021</span>
                <span className="text-2xl">♥</span>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>);

}