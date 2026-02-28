
import { motion } from 'framer-motion';
export function Highlights() {
  const highlights = [
  {
    emoji: '🎵',
    title: 'Live DJ & Music',
    desc: 'Dance to the latest Bollywood and festive beats.'
  },
  {
    emoji: '🍛',
    title: 'Festive Feast',
    desc: 'Enjoy traditional delicacies and refreshing thandai.'
  },
  {
    emoji: '🎨',
    title: 'Color Play Zone',
    desc: 'Organic, skin-friendly colors provided for everyone.'
  },
  {
    emoji: '💃',
    title: 'Dance Floor',
    desc: 'Show off your moves on our massive open-air dance floor.'
  },
  {
    emoji: '🎮',
    title: 'Fun Games',
    desc: 'Water balloon fights and exciting group activities.'
  },
  {
    emoji: '🏆',
    title: 'Best Dressed',
    desc: 'Prizes for the most vibrant and creative outfits!'
  }];

  const container = {
    hidden: {
      opacity: 0
    },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <section className="w-full max-w-6xl mx-auto">
      <motion.div
        initial={{
          opacity: 0,
          y: 40
        }}
        whileInView={{
          opacity: 1,
          y: 0
        }}
        viewport={{
          once: true,
          amount: 0.2
        }}
        transition={{
          duration: 0.7,
          ease: 'easeOut'
        }}
        className="text-center mb-12">

        <h2 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-4">
          What Awaits You
        </h2>
        <p className="text-white/80 text-lg">
          A day packed with endless fun and excitement
        </p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{
          once: true,
          amount: 0.1
        }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {highlights.map((highlight, index) =>
        <motion.div
          key={index}
          
          className="glass-panel p-6 hover:bg-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(255,255,255,0.15)] group">

            <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300 origin-left">
              {highlight.emoji}
            </div>
            <h3 className="font-heading text-xl font-bold text-white mb-2">
              {highlight.title}
            </h3>
            <p className="text-white/80 leading-relaxed">{highlight.desc}</p>
          </motion.div>
        )}
      </motion.div>
    </section>);

}