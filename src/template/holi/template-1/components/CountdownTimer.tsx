import  { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { usePreview } from '../../../../context/PreviewContext';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}
interface FlipUnitProps {
  value: number;
  label: string;
  hindiLabel: string;
  delay: number;
  isInView: boolean;
}
function FlipUnit({
  value,
  label,
  hindiLabel,
  delay,
  isInView
}: FlipUnitProps) {
  const displayValue = value.toString().padStart(2, '0');
  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{
        scale: 0,
        rotateX: -90
      }}
      animate={
      isInView ?
      {
        scale: 1,
        rotateX: 0
      } :
      {}
      }
      transition={{
        duration: 0.5,
        delay,
        type: 'spring'
      }}>

      <div className="flip-card">
        <div className="relative w-16 h-20 md:w-24 md:h-28 lg:w-28 lg:h-32">
          {/* Top Half */}
          <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-royal-purple to-royal-purple/90 rounded-t-lg overflow-hidden border-2 border-gold border-b-0">
            <div className="absolute inset-0 flex items-end justify-center pb-0">
              <span className="font-heading font-black text-3xl md:text-4xl lg:text-5xl text-gold leading-none translate-y-1/2">
                {displayValue}
              </span>
            </div>
          </div>

          {/* Bottom Half */}
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-b from-royal-purple/80 to-royal-purple/70 rounded-b-lg overflow-hidden border-2 border-gold border-t-0">
            <div className="absolute inset-0 flex items-start justify-center pt-0">
              <span className="font-heading font-black text-3xl md:text-4xl lg:text-5xl text-gold leading-none -translate-y-1/2">
                {displayValue}
              </span>
            </div>
          </div>

          {/* Center Line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-dark/50 transform -translate-y-1/2 z-10" />

          {/* Side Notches */}
          <div className="absolute top-1/2 -left-1 w-2 h-3 bg-dark rounded-r transform -translate-y-1/2" />
          <div className="absolute top-1/2 -right-1 w-2 h-3 bg-dark rounded-l transform -translate-y-1/2" />
        </div>
      </div>

      {/* Labels */}
      <div className="mt-3 text-center">
        <p className="font-heading font-bold text-gold text-sm md:text-base">
          {hindiLabel}
        </p>
        <p className="font-body text-cream/60 text-xs">{label}</p>
      </div>
    </motion.div>);

}
export function CountdownTimer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { previewData } = usePreview();
  const countdownSection = previewData?.Countdown_section;
 
  const data = countdownSection?.data;
 
  // Get target date from preview data
  const targetDateTime = data?.date_time || data?.target_date || '2026-03-14T11:00:00';
  console.log(targetDateTime)
  const calculateTimeLeft = (): TimeLeft => {
    const targetDate = new Date(targetDateTime).getTime();
    const now = new Date().getTime();
    const difference = targetDate - now;
    
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000)
    };
  };
  
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
  const [isExpired, setIsExpired] = useState(false);
  
  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);
      
      // Check if countdown has expired
      if (newTimeLeft.days === 0 && newTimeLeft.hours === 0 && 
          newTimeLeft.minutes === 0 && newTimeLeft.seconds === 0) {
        setIsExpired(true);
        clearInterval(timer);
      }
    }, 1000);
    
    return () => clearInterval(timer);
  }, [targetDateTime]);
  const units = [
  {
    value: timeLeft.days,
    label: 'Days',
    hindiLabel: 'Din'
  },
  {
    value: timeLeft.hours,
    label: 'Hours',
    hindiLabel: 'Ghante'
  },
  {
    value: timeLeft.minutes,
    label: 'Minutes',
    hindiLabel: 'Minute'
  },
  {
    value: timeLeft.seconds,
    label: 'Seconds',
    hindiLabel: 'Second'
  }];

  return (
    <section ref={ref} className="py-16 md:py-24 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Section Title */}
        <motion.div
          className="text-center mb-10"
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
            ⏰ Countdown Shuru!
          </h2>
          <p className="font-body text-cream/80 text-lg">
            (The Countdown Begins!)
          </p>
        </motion.div>

        {/* Countdown Display or Expired Message */}
        {isExpired ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center py-12">
            <div className="inline-block bg-gradient-to-r from-magenta via-gold to-marigold p-8 rounded-2xl border-4 border-gold">
              <h3 className="font-heading font-black text-4xl md:text-6xl text-dark mb-4">
                🎉 Holi Aa Gayi! 🎉
              </h3>
              <p className="font-body text-dark text-xl md:text-2xl">
                The celebration has begun!
              </p>
            </div>
          </motion.div>
        ) : (
          <div className="flex justify-center gap-3 md:gap-6 lg:gap-8">
            {units.map((unit, index) =>
            <FlipUnit
              key={unit.label}
              value={unit.value}
              label={unit.label}
              hindiLabel={unit.hindiLabel}
              delay={0.1 * index}
              isInView={isInView} />
            )}
          </div>
        )}

        {/* Excitement Text */}
        {!isExpired && (
          <motion.p
            className="text-center mt-10 font-heading text-marigold text-xl md:text-2xl"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}>
            Bas itne din baaki hain! 🎉
          </motion.p>
        )}
      </div>
    </section>);

}