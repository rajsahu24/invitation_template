import  { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CalendarIcon, MapPinIcon, ClockIcon } from 'lucide-react';
import { usePreview } from '../../../../context/PreviewContext';

const formatDateTime = (dateTimeString: string) => {
  const date = new Date(dateTimeString);
  return {
    date: date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }),
    time: date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
  };
};

export function EventDetails() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { previewData } = usePreview();
  const eventSection = previewData?.event_section;
  const events = eventSection?.data || [];
  
  const firstEvent = Array.isArray(events) && events.length > 0 ? events[0] : null;
  
  let eventDate = 'Saturday, March 14, 2026';
  let eventTime = '11:00 AM Onwards';
  let eventLocation = 'Sharma Villa';
  let eventAddress = '42 Juhu Beach Road, Mumbai - 400049';
  
  if (firstEvent) {
    const dateTimeValue = firstEvent.date_time || firstEvent.start_time || firstEvent.date;
    if (dateTimeValue) {
      const formatted = formatDateTime(dateTimeValue);
      eventDate = formatted.date;
      eventTime = formatted.time + ' Onwards';
    }
    eventLocation = firstEvent.location || firstEvent.event_location || eventLocation;
    eventAddress = firstEvent.description || firstEvent.address || eventAddress;
  }
  return (
    <section ref={ref} className="py-16 md:py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="relative bg-cream ticket-tear"
          initial={{
            x: -100,
            opacity: 0
          }}
          animate={
          isInView ?
          {
            x: 0,
            opacity: 1
          } :
          {}
          }
          transition={{
            duration: 0.6,
            type: 'spring'
          }}>

          <div className="flex flex-col md:flex-row">
            {/* Left Stub - Date */}
            <div className="bg-royal-purple p-4 md:p-6 md:w-32 flex md:flex-col items-center justify-center gap-2 md:gap-0">
              <motion.div
                className="md:writing-vertical-rl md:rotate-180 text-center"
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
                  delay: 0.3
                }}
                style={{
                  writingMode: 'vertical-rl'
                }}>

                <span className="hidden md:block font-heading font-bold text-gold text-xl tracking-widest transform rotate-180">
                  14 MARCH 2026
                </span>
                <span className="md:hidden font-heading font-bold text-gold text-lg">
                  14 MARCH 2026
                </span>
              </motion.div>
              <div className="hidden md:block w-full h-px bg-gold/30 my-4" />
              <span className="text-cream/60 text-xs md:text-sm font-body">
                ADMIT ONE
              </span>
            </div>

            {/* Perforated Divider */}
            <div className="hidden md:flex flex-col items-center justify-center px-2">
              {[...Array(12)].map((_, i) =>
              <div key={i} className="w-2 h-2 rounded-full bg-dark/20 my-1" />
              )}
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 md:p-8">
              {/* Header */}
              <motion.div
                className="text-center mb-6"
                initial={{
                  y: 20,
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
                  delay: 0.2
                }}>

                <h2 className="font-heading font-bold text-3xl md:text-4xl text-royal-purple mb-2">
                  🎬 Event Details
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-magenta to-marigold mx-auto" />
              </motion.div>

              {/* Details Grid */}
              <div className="space-y-6">
                {/* When */}
                <motion.div
                  className="flex items-start gap-4 p-4 bg-royal-purple/10 rounded-lg border-2 border-royal-purple/30"
                  initial={{
                    x: -30,
                    opacity: 0
                  }}
                  animate={
                  isInView ?
                  {
                    x: 0,
                    opacity: 1
                  } :
                  {}
                  }
                  transition={{
                    delay: 0.3
                  }}>

                  <div className="w-12 h-12 rounded-full bg-royal-purple flex items-center justify-center flex-shrink-0">
                    <CalendarIcon className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-royal-purple">
                      🗓️ Kab? When?
                    </h3>
                    <p className="font-body text-dark font-semibold">
                      {eventDate}
                    </p>
                    <p className="font-body text-dark/70 text-sm">
                      {eventTime}
                    </p>
                  </div>
                </motion.div>

                {/* Where */}
                <motion.div
                  className="flex items-start gap-4 p-4 bg-magenta/10 rounded-lg border-2 border-magenta/30"
                  initial={{
                    x: -30,
                    opacity: 0
                  }}
                  animate={
                  isInView ?
                  {
                    x: 0,
                    opacity: 1
                  } :
                  {}
                  }
                  transition={{
                    delay: 0.4
                  }}>

                  <div className="w-12 h-12 rounded-full bg-magenta flex items-center justify-center flex-shrink-0">
                    <MapPinIcon className="w-6 h-6 text-cream" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-magenta">
                      📍 Kahaan? Where?
                    </h3>
                    <p className="font-body text-dark font-semibold">
                      {eventLocation}
                    </p>
                    <p className="font-body text-dark/70 text-sm">
                      {eventAddress}
                    </p>
                  </div>
                </motion.div>

                {/* Till When */}
                <motion.div
                  className="flex items-start gap-4 p-4 bg-marigold/10 rounded-lg border-2 border-marigold/30"
                  initial={{
                    x: -30,
                    opacity: 0
                  }}
                  animate={
                  isInView ?
                  {
                    x: 0,
                    opacity: 1
                  } :
                  {}
                  }
                  transition={{
                    delay: 0.5
                  }}>

                  <div className="w-12 h-12 rounded-full bg-marigold flex items-center justify-center flex-shrink-0">
                    <ClockIcon className="w-6 h-6 text-dark" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-marigold">
                      🎭 Kitne Baje Tak? Till When?
                    </h3>
                    <p className="font-body text-dark font-semibold italic">
                      Jab Tak Rang Na Chhoote!
                    </p>
                    <p className="font-body text-dark/70 text-sm">
                      (Till the colors don't fade!)
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Bottom Decorative */}
              <motion.div
                className="mt-6 text-center"
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
                  delay: 0.6
                }}>

                <span className="font-heading text-royal-purple text-lg">
                  ✦ Padharo Mhare Des ✦
                </span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>);

}