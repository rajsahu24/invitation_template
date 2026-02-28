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
  const events = Array.isArray(eventSection?.data) && eventSection.data.length > 0 
    ? eventSection.data 
    : [{
        name: 'Holi Celebration',
        date_time: '2026-03-14T11:00:00',
        location: 'Sharma Villa',
        address: '42 Juhu Beach Road, Mumbai - 400049'
      }];

  const getEventData = (event: any) => {
    const eventName = event.name || event.event_name || event.title || 'Holi Celebration';
    
    let eventDate = 'Saturday, March 14, 2026';
    let eventTime = '11:00 AM Onwards';
    
    const dateTimeValue = event.date_time || event.start_time || event.date;
    if (dateTimeValue) {
      const formatted = formatDateTime(dateTimeValue);
      eventDate = formatted.date;
      eventTime = formatted.time + ' Onwards';
    }
    
    if (event.time) {
      const timeMatch = event.time.match(/(\d{1,2}):(\d{2})/);
      if (timeMatch) {
        const hours = parseInt(timeMatch[1]);
        const minutes = timeMatch[2];
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const displayHours = hours % 12 || 12;
        eventTime = `${displayHours}:${minutes} ${ampm} Onwards`;
      } else {
        eventTime = event.time + ' Onwards';
      }
    }
    
    const eventLocation = event.location || event.event_location || 'Sharma Villa';
    const eventAddress = event.description || event.address || '42 Juhu Beach Road, Mumbai - 400049';
    
    return { eventName, eventDate, eventTime, eventLocation, eventAddress };
  };
  return (
    <section ref={ref} className="py-16 md:py-24 px-4">
      <div className="max-w-4xl mx-auto space-y-12">
        {events.map((event, index) => {
          const { eventName, eventDate, eventTime, eventLocation, eventAddress } = getEventData(event);
          
          return (
            <motion.div
              key={index}
              className="relative bg-cream ticket-tear"
              initial={{ x: -100, opacity: 0 }}
              animate={isInView ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, type: 'spring', delay: index * 0.2 }}>

          <div className="flex flex-col md:flex-row">
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
                initial={{ y: 20, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : {}}
                transition={{ delay: 0.2 + index * 0.2 }}>

                <h2 className="font-heading font-bold text-3xl md:text-4xl text-royal-purple mb-2">
                  🎬 {eventName}
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-magenta to-marigold mx-auto" />
              </motion.div>

              {/* Details Grid */}
              <div className="space-y-6">
                {/* When */}
                <motion.div
                  className="flex items-start gap-4 p-4 bg-royal-purple/10 rounded-lg border-2 border-royal-purple/30"
                  initial={{ x: -30, opacity: 0 }}
                  animate={isInView ? { x: 0, opacity: 1 } : {}}
                  transition={{ delay: 0.3 + index * 0.2 }}>

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
                  initial={{ x: -30, opacity: 0 }}
                  animate={isInView ? { x: 0, opacity: 1 } : {}}
                  transition={{ delay: 0.4 + index * 0.2 }}>

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
                  initial={{ x: -30, opacity: 0 }}
                  animate={isInView ? { x: 0, opacity: 1 } : {}}
                  transition={{ delay: 0.5 + index * 0.2 }}>

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
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.6 + index * 0.2 }}>

                <span className="font-heading text-royal-purple text-lg">
                  ✦ Padharo Mhare Des ✦
                </span>
              </motion.div>
            </div>
          </div>
        </motion.div>
          );
        })}
      </div>
    </section>
  );
}