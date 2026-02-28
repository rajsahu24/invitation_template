
import { motion } from 'framer-motion';
export function HeroSection() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center pt-20 pb-10">
      {/* Decorative blurred circles */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-holi-magenta/40 rounded-full mix-blend-overlay filter blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-holi-cyan/40 rounded-full mix-blend-overlay filter blur-3xl animate-pulse delay-1000" />

      <motion.div
        className="relative z-10 text-center px-4"
        initial={{
          opacity: 0,
          y: 40
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          duration: 1,
          ease: 'easeOut'
        }}>

        <motion.div
          animate={{
            y: [0, -15, 0]
          }}
          transition={{
            repeat: Infinity,
            duration: 6,
            ease: 'easeInOut'
          }}
          className="flex flex-col items-center">

          <div className="inline-block mb-6 px-6 py-2 rounded-full glass-panel border-white/40 shadow-lg">
            <span className="text-white font-medium tracking-wider uppercase text-sm">
              March 14, 2026
            </span>
          </div>

          <h1 className="font-heading font-black text-7xl sm:text-8xl lg:text-9xl text-white mb-4 drop-shadow-[0_0_25px_rgba(255,255,255,0.4)] tracking-tight">
            HOLI{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
              2026
            </span>
          </h1>

          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-white/90 font-bold mb-6 tracking-wide uppercase">
            Festival of Colors
          </h2>

          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto font-medium leading-relaxed">
            Join us for an explosion of joy, music & colors! Let's make memories
            that will paint our lives forever.
          </p>
        </motion.div>
      </motion.div>
    </section>);

}