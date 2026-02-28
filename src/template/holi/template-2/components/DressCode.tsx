
import { motion } from 'framer-motion';
export function DressCode() {
  const tips = [
  'White clothes are traditional — colors show up best!',
  "Comfortable clothes you don't mind getting colorful",
  'Closed-toe shoes recommended',
  'Leave valuables and expensive jewelry at home'];

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

      <div className="glass-panel p-8 sm:p-12 relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute -right-20 -bottom-20 text-[15rem] opacity-10 rotate-12 pointer-events-none">
          👕
        </div>

        <div className="relative z-10">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-6 flex items-center gap-3">
            <span>Dress Code</span>
            <span className="text-3xl">👕</span>
          </h2>

          <div className="mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">Wear White!</h3>
            <p className="text-white/80 text-lg">
              A blank canvas makes for the most beautiful masterpiece.
            </p>
          </div>

          <ul className="space-y-4">
            {tips.map((tip, index) =>
            <li key={index} className="flex items-start gap-3">
                <span className="text-holi-cyan mt-1">✨</span>
                <span className="text-white/90 text-lg">{tip}</span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </motion.section>);

}