import  { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [hasStarted, setHasStarted] = useState(false);
  useEffect(() => {
    const targetDate = new Date('2026-03-14T00:00:00').getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;
      if (difference <= 0) {
        clearInterval(interval);
        setHasStarted(true);
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            difference % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)
          ),
          minutes: Math.floor(difference % (1000 * 60 * 60) / (1000 * 60)),
          seconds: Math.floor(difference % (1000 * 60) / 1000)
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const timeBlocks = [
  {
    label: 'Days',
    value: timeLeft.days
  },
  {
    label: 'Hours',
    value: timeLeft.hours
  },
  {
    label: 'Minutes',
    value: timeLeft.minutes
  },
  {
    label: 'Seconds',
    value: timeLeft.seconds
  }];

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
      className="w-full max-w-4xl mx-auto text-center">

      <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-10">
        The Celebration Begins In
      </h2>

      {hasStarted ?
      <div className="glass-panel p-8 inline-block animate-bounce">
          <h3 className="font-heading text-3xl font-bold text-white">
            The celebration has begun! 🎉
          </h3>
        </div> :

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {timeBlocks.map((block, index) =>
        <motion.div
          key={block.label}
          animate={{
            scale: [1, 1.02, 1]
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
            delay: index * 0.2,
            ease: 'easeInOut'
          }}
          className="glass-panel p-6 flex flex-col items-center justify-center">

              <span className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-2 drop-shadow-md">
                {block.value.toString().padStart(2, '0')}
              </span>
              <span className="text-white/70 font-medium uppercase tracking-widest text-xs sm:text-sm">
                {block.label}
              </span>
            </motion.div>
        )}
        </div>
      }
    </motion.section>);

}