import  { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
interface HighlightBadge {
  emoji: string;
  title: string;
  subtitle: string;
  color: string;
  bgColor: string;
  rotation: number;
}
const highlights: HighlightBadge[] = [
{
  emoji: '🎵',
  title: 'DJ Wale Babu',
  subtitle: 'Live Music & Beats',
  color: 'text-magenta',
  bgColor: 'bg-magenta/20',
  rotation: -3
},
{
  emoji: '🍹',
  title: 'Thandai & Gujiya',
  subtitle: 'Traditional Treats',
  color: 'text-marigold',
  bgColor: 'bg-marigold/20',
  rotation: 2
},
{
  emoji: '🎨',
  title: 'Gulaal Galore',
  subtitle: 'Organic Colors',
  color: 'text-royal-purple',
  bgColor: 'bg-royal-purple/20',
  rotation: -2
},
{
  emoji: '💃',
  title: 'Bollywood Dance-Off',
  subtitle: 'Dance Competition',
  color: 'text-deep-red',
  bgColor: 'bg-deep-red/20',
  rotation: 4
},
{
  emoji: '💦',
  title: 'Pichkari Wars',
  subtitle: 'Water Gun Battles',
  color: 'text-gold',
  bgColor: 'bg-gold/20',
  rotation: -4
},
{
  emoji: '📸',
  title: 'Filmi Photo Booth',
  subtitle: 'Bollywood Props',
  color: 'text-magenta',
  bgColor: 'bg-magenta/20',
  rotation: 3
}];

export function Highlights() {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: '-100px'
  });
  return (
    <section ref={ref} className="py-16 md:py-24 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Section Title */}
        <motion.div
          className="text-center mb-12"
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
            duration: 0.5
          }}>

          <h2 className="font-heading font-bold text-3xl md:text-5xl text-gold mb-4">
            🎪 Party Highlights
          </h2>
          <p className="font-body text-cream/80 text-lg">
            Kya Kya Hoga? Here's What Awaits You!
          </p>
        </motion.div>

        {/* Badges Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {highlights.map((highlight, index) =>
          <motion.div
            key={highlight.title}
            className={`vintage-stamp ${highlight.bgColor} ${highlight.color} rounded-lg text-center`}
            style={{
              transform: `rotate(${highlight.rotation}deg)`
            }}
            initial={{
              scale: 0,
              rotate: highlight.rotation - 180
            }}
            animate={
            isInView ?
            {
              scale: 1,
              rotate: highlight.rotation
            } :
            {}
            }
            transition={{
              duration: 0.5,
              delay: 0.1 * index,
              type: 'spring',
              bounce: 0.4
            }}
            whileHover={{
              scale: 1.05,
              rotate: 0
            }}>

              <div className="py-4 px-2">
                <span className="text-4xl md:text-5xl block mb-2">
                  {highlight.emoji}
                </span>
                <h3 className="font-heading font-bold text-base md:text-lg leading-tight mb-1">
                  {highlight.title}
                </h3>
                <p className="font-body text-xs md:text-sm opacity-80">
                  {highlight.subtitle}
                </p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Bottom Text */}
        <motion.p
          className="text-center mt-10 font-body text-cream/60 text-sm"
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

          ...aur bahut kuch! (And much more!)
        </motion.p>
      </div>
    </section>);

}