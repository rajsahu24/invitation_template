
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
export function HostDetails() {
  return (
    <motion.section
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
      className="w-full max-w-3xl mx-auto">

      <div className="glass-panel p-8 sm:p-12 text-center relative overflow-hidden group hover:bg-white/15 transition-colors duration-500">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all duration-500" />

        <Heart className="w-8 h-8 text-white/80 mx-auto mb-6" />

        <h3 className="font-heading text-2xl text-white/70 uppercase tracking-widest mb-2 text-sm font-bold">
          Your Hosts
        </h3>

        <h2 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-6">
          Priya & Arjun Sharma
        </h2>

        <p className="text-white/90 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">
          "We're thrilled to invite you to celebrate the most colorful festival
          of the year with us! Get ready for an unforgettable day of music,
          dance, and vibrant colors."
        </p>
      </div>
    </motion.section>);

}