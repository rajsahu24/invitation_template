import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { usePreview } from '../../../../context/PreviewContext';

export function Countdown() {
  const { previewData } = usePreview();
  const countdownSection = previewData?.Countdown_section;
  const data = countdownSection?.data;

  const targetDateTime = data?.date_time || data?.target_date || '2026-09-12T00:00:00';

  const calculate = () => {
    const diff = new Date(targetDateTime).getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0 };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculate);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculate()), 1000);
    return () => clearInterval(timer);
  }, [targetDateTime]);

  const displayDate = (() => {
    const d = new Date(targetDateTime);
    return d.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }).toUpperCase();
  })();

  const units = [
    { value: timeLeft.days, label: 'DAYS' },
    { value: timeLeft.hours, label: 'HOURS' },
    { value: timeLeft.minutes, label: 'MINUTES' },
  ];

  return (
    <section className="relative py-16 md:py-24 px-4 overflow-hidden" style={{ backgroundColor: '#f5f3ef' }}>

      {/* Decorative floral left */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 opacity-20 pointer-events-none select-none">
        <svg width="120" height="220" viewBox="0 0 120 220" fill="none">
          <ellipse cx="30" cy="110" rx="28" ry="90" stroke="#C4A882" strokeWidth="1.5" fill="none" />
          <ellipse cx="30" cy="110" rx="14" ry="60" stroke="#C4A882" strokeWidth="1" fill="none" />
          <ellipse cx="60" cy="80" rx="22" ry="55" stroke="#C4A882" strokeWidth="1.5" fill="none" transform="rotate(-30 60 80)" />
          <ellipse cx="60" cy="140" rx="22" ry="55" stroke="#C4A882" strokeWidth="1.5" fill="none" transform="rotate(30 60 140)" />
          <circle cx="30" cy="110" r="6" stroke="#C4A882" strokeWidth="1.5" fill="none" />
        </svg>
      </div>

      {/* Decorative floral right */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-20 pointer-events-none select-none">
        <svg width="120" height="220" viewBox="0 0 120 220" fill="none">
          <ellipse cx="90" cy="110" rx="28" ry="90" stroke="#C4A882" strokeWidth="1.5" fill="none" />
          <ellipse cx="90" cy="110" rx="14" ry="60" stroke="#C4A882" strokeWidth="1" fill="none" />
          <ellipse cx="60" cy="80" rx="22" ry="55" stroke="#C4A882" strokeWidth="1.5" fill="none" transform="rotate(30 60 80)" />
          <ellipse cx="60" cy="140" rx="22" ry="55" stroke="#C4A882" strokeWidth="1.5" fill="none" transform="rotate(-30 60 140)" />
          <circle cx="90" cy="110" r="6" stroke="#C4A882" strokeWidth="1.5" fill="none" />
        </svg>
      </div>

      <div className="max-w-2xl mx-auto text-center relative z-10">

        {/* Script title */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-3"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(2rem, 5vw, 2.8rem)',
            fontStyle: 'italic',
            color: '#B8966E',
            fontWeight: 400,
          }}
        >
          Countdown
        </motion.h2>

        {/* Until date */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="tracking-[0.2em] mb-12 text-xs sm:text-sm"
          style={{ fontFamily: "'Cinzel', serif", color: '#8B7355' }}
        >
          UNTIL {displayDate}
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-24 h-px mx-auto mb-12"
          style={{ backgroundColor: '#C4A882' }}
        />

        {/* Countdown units */}
        <div className="flex items-start justify-center gap-0">
          {units.map((unit, i) => (
            <div key={unit.label} className="flex items-start">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                className="flex flex-col items-center px-6 sm:px-10"
              >
                <span
                  className="leading-none mb-2"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 'clamp(2.8rem, 8vw, 4.5rem)',
                    color: '#8B7355',
                    fontWeight: 300,
                  }}
                >
                  {unit.value.toString().padStart(2, '0')}
                </span>
                <span
                  className="tracking-[0.25em] text-xs"
                  style={{ fontFamily: "'Cinzel', serif", color: '#B8A898' }}
                >
                  {unit.label}
                </span>
              </motion.div>

              {/* Divider between units */}
              {i < units.length - 1 && (
                <div
                  className="self-center h-10 w-px mt-[-8px]"
                  style={{ backgroundColor: '#C4A882', opacity: 0.5 }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
