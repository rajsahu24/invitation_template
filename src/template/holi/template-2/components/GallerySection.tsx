
import { motion } from 'framer-motion';
export function GallerySection() {
  const placeholders = [
  'from-holi-magenta/40 to-holi-violet/40',
  'from-holi-cyan/40 to-holi-magenta/40',
  'from-holi-yellow/40 to-holi-cyan/40',
  'from-holi-violet/40 to-holi-yellow/40',
  'from-holi-magenta/40 to-holi-cyan/40',
  'from-holi-cyan/40 to-holi-violet/40'];

  const captions = [
  'Colors in the air',
  'Joyful faces',
  'The grand feast',
  'Dancing to the beats',
  'Water balloon fights',
  'Unforgettable memories'];

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
      className="w-full max-w-6xl mx-auto">

      <div className="text-center mb-12">
        <h2 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-4">
          Moments to Cherish
        </h2>
        <p className="text-white/80 text-lg">
          Memories from previous celebrations
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {placeholders.map((gradient, index) =>
        <div
          key={index}
          className="relative aspect-square rounded-2xl overflow-hidden group glass-panel border-white/10 p-0">

            {/* Placeholder Gradient Background */}
            <div
            className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-80 group-hover:scale-110 transition-transform duration-700 ease-in-out`} />


            {/* Glass Overlay Caption */}
            <div className="absolute inset-x-0 bottom-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl p-3 text-center">
                <p className="text-white font-medium text-sm sm:text-base">
                  {captions[index]}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.section>);

}