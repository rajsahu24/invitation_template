import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { SectionDivider } from './ui/OrnateDecorations';
export function StorySection() {
  return (
    <section className="py-20 px-4 bg-white relative overflow-hidden">
      <div className="container mx-auto max-w-4xl">
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
          className="text-center mb-12">

          <h2 className="text-4xl md:text-5xl font-serif-display text-[#8B0000] mb-4">
            Our Journey
          </h2>
          <SectionDivider />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{
              opacity: 0,
              x: -50
            }}
            whileInView={{
              opacity: 1,
              x: 0
            }}
            viewport={{
              once: true
            }}
            transition={{
              duration: 0.8
            }}
            className="relative">

            <div className="aspect-[3/4] rounded-t-full bg-gray-200 overflow-hidden border-4 border-[#D4AF37]/30 p-2">
              <div className="w-full h-full rounded-t-full overflow-hidden bg-[#8B0000]/5">
                {/* Placeholder for couple image */}
                <img
                  src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Couple"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />

              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              x: 50
            }}
            whileInView={{
              opacity: 1,
              x: 0
            }}
            viewport={{
              once: true
            }}
            transition={{
              duration: 0.8
            }}
            className="space-y-6 text-center md:text-left">

            <h3 className="text-2xl font-serif-display text-[#2D2D2D]">
              How We Met
            </h3>
            <p className="text-gray-600 leading-relaxed">
              It started with a chance encounter at a mutual friend's Diwali
              party. Amidst the lights and laughter, we found a conversation
              that felt like home. What began as a friendship blossomed into
              something beautiful, guided by shared values and a love for
              adventure.
            </p>

            <h3 className="text-2xl font-serif-display text-[#2D2D2D] pt-4">
              The Proposal
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Under the starlit sky of Jaipur, surrounded by the history of the
              Amber Fort, Aarav got down on one knee. It was a moment where time
              stood still, weaving our past, present, and future into a single,
              perfect "Yes".
            </p>

            <div className="pt-6">
              <p className="font-serif-display text-xl text-[#8B0000] italic">
                "Two souls, one heart, a lifetime of memories."
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>);

}