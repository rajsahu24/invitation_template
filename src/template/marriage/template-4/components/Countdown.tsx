import  { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { BotanicalLeaf } from './BotanicalLeaf';
import { usePreview } from '../../../../context/PreviewContext';
// const WEDDING_DATE = new Date('2025-12-14T18:00:00+05:30');
interface TimeUnit {
  value: number;
  label: string;
}
function CountdownUnit({
  value,
  label,
  delay


}: TimeUnit & {delay: number;}) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true
  });
  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        scale: 0.8
      }}
      animate={
      isInView ?
      {
        opacity: 1,
        scale: 1
      } :
      {
        opacity: 0,
        scale: 0.8
      }
      }
      transition={{
        duration: 0.6,
        delay
      }}
      className="flex flex-col items-center">

      <div className="relative">
        {/* Circular badge */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 rounded-full bg-sage flex items-center justify-center shadow-lg border-2 border-sage-dark/30">
          <motion.span
            key={value}
            initial={{
              opacity: 0,
              y: -10
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            className="font-serif text-2xl sm:text-3xl md:text-5xl text-forest">

            {value.toString().padStart(2, '0')}
          </motion.span>
        </div>

        {/* Leaf accent */}
        <motion.div
          className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 text-forest-light"
          animate={{
            rotate: [0, 10, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity
          }}>

          <BotanicalLeaf variant="small" animate={false} className="w-4 h-4 sm:w-6 sm:h-6" />
        </motion.div>
      </div>

      <span className="mt-2 sm:mt-3 text-forest-light text-xs sm:text-sm md:text-base font-medium tracking-wide uppercase">
        {label}
      </span>
    </motion.div>);

}
export function Countdown() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, {
    once: true,
    margin: '-100px'
  });
  const { previewData } = usePreview();
  const countdownSection = previewData?.Countdown_section;
  const data = countdownSection?.data;
  
  const targetDateTime = data?.date_time || data?.target_date || '2025-12-14T18:00:00+05:30';
  const WEDDING_DATE = new Date(targetDateTime);
  
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = WEDDING_DATE.getTime() - now.getTime();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(difference / (1000 * 60 * 60) % 24),
          minutes: Math.floor(difference / 1000 / 60 % 60),
          seconds: Math.floor(difference / 1000 % 60)
        });
      }
    };
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDateTime]);
  const units: TimeUnit[] = [
  {
    value: timeLeft.days,
    label: 'Days'
  },
  {
    value: timeLeft.hours,
    label: 'Hours'
  },
  {
    value: timeLeft.minutes,
    label: 'Minutes'
  },
  {
    value: timeLeft.seconds,
    label: 'Seconds'
  }];

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-gradient-to-b from-cream to-sage/30 relative overflow-hidden">
      {/* Background decorations */}
      <motion.div
        className="absolute top-4 left-2 sm:top-10 sm:left-10 text-sage-dark opacity-25"
        animate={{
          y: [0, -8, 0]
        }}
        transition={{
          duration: 6,
          repeat: Infinity
        }}>

        <BotanicalLeaf variant="branch" animate={false} className="w-12 h-16 sm:w-20 sm:h-28" />
      </motion.div>

      <motion.div
        className="absolute bottom-4 right-2 sm:bottom-10 sm:right-10 text-sage-dark opacity-25"
        animate={{
          y: [0, 8, 0]
        }}
        transition={{
          duration: 8,
          repeat: Infinity
        }}>

        <BotanicalLeaf
          variant="branch"
          animate={false}
          className="w-14 h-20 sm:w-24 sm:h-32 rotate-180" />

      </motion.div>

      <div className="max-w-4xl mx-auto" ref={containerRef}>
        <motion.div
          initial={{
            opacity: 0,
            y: 30
          }}
          animate={
          isInView ?
          {
            opacity: 1,
            y: 0
          } :
          {
            opacity: 0,
            y: 30
          }
          }
          transition={{
            duration: 0.8
          }}
          className="text-center mb-8 sm:mb-12">

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-forest mb-3 sm:mb-4">
            Counting Down
          </h2>
          <div className="flex items-center justify-center gap-2 sm:gap-3">
            <div className="h-px w-8 sm:w-12 bg-rose" />
            <BotanicalLeaf
              variant="small"
              animate={false}
              className="w-5 h-5 sm:w-6 sm:h-6 text-forest-light" />

            <div className="h-px w-8 sm:w-12 bg-rose" />
          </div>
          <p className="mt-4 sm:mt-6 text-sm sm:text-base text-forest-light">Until we say "I do"</p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-8">
          {units.map((unit, index) =>
          <CountdownUnit
            key={unit.label}
            value={unit.value}
            label={unit.label}
            delay={index * 0.15} />

          )}
        </div>

        <motion.p
          initial={{
            opacity: 0
          }}
          animate={
          isInView ?
          {
            opacity: 1
          } :
          {
            opacity: 0
          }
          }
          transition={{
            duration: 0.8,
            delay: 0.8
          }}
          className="text-center mt-6 sm:mt-8 md:mt-10 font-serif text-base sm:text-lg md:text-xl text-forest-light italic">

          December 14, 2025 · Udaipur
        </motion.p>
      </div>
    </section>);

}