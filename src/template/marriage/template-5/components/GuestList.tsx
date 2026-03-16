// import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
const royalCourt = {
  bridesmaids: ['Lady Isabella Montgomery', 'Duchess Sophia of York', 'Countess Elena Rossi', 'Lady Charlotte Windsor'],
  groomsmen: ['Duke William of Cambridge', 'Lord Henry Cavill', 'Baron James Spencer', 'Sir Arthur Pendragon']
};
export function GuestList() {
  return <section className="py-24 bg-royal-cream text-royal-deepPurple relative">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} className="mb-16">
          <Star className="w-8 h-8 text-royal-gold mx-auto mb-4" />
          <h2 className="font-playfair text-4xl md:text-5xl mb-4">
            The Royal Court
          </h2>
          <p className="font-cormorant text-xl italic text-gray-600">
            Honored members of the wedding party
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Bridesmaids */}
          <motion.div initial={{
          opacity: 0,
          x: -30
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} transition={{
          delay: 0.2
        }}>
            <h3 className="font-cinzel text-2xl text-royal-goldDark mb-8 border-b-2 border-royal-gold/20 pb-4 inline-block px-8">
              Bridesmaids
            </h3>
            <ul className="space-y-6">
              {royalCourt.bridesmaids.map((name, i) => <motion.li key={i} initial={{
              opacity: 0
            }} whileInView={{
              opacity: 1
            }} transition={{
              delay: 0.4 + i * 0.1
            }} className="font-cormorant text-2xl md:text-3xl text-royal-deepPurple">
                  {name}
                </motion.li>)}
            </ul>
          </motion.div>

          {/* Groomsmen */}
          <motion.div initial={{
          opacity: 0,
          x: 30
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} transition={{
          delay: 0.4
        }}>
            <h3 className="font-cinzel text-2xl text-royal-goldDark mb-8 border-b-2 border-royal-gold/20 pb-4 inline-block px-8">
              Groomsmen
            </h3>
            <ul className="space-y-6">
              {royalCourt.groomsmen.map((name, i) => <motion.li key={i} initial={{
              opacity: 0
            }} whileInView={{
              opacity: 1
            }} transition={{
              delay: 0.6 + i * 0.1
            }} className="font-cormorant text-2xl md:text-3xl text-royal-deepPurple">
                  {name}
                </motion.li>)}
            </ul>
          </motion.div>
        </div>

      </div>
    </section>;
}