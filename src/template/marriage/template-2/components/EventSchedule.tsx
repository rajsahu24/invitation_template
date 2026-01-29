import { motion } from 'framer-motion';
import { Wine, Utensils, Music, Sparkles } from 'lucide-react';
import { usePreview } from '../../../../context/PreviewContext';

// Utility function to format date and time
const formatDateTime = (dateTimeString: string) => {
  const date = new Date(dateTimeString);
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
  const formattedTime = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
  return { date: formattedDate, time: formattedTime };
};
const containerVariants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const schedule = [{
  time: '4:00 PM',
  title: 'Baraat Swagat',
  description: 'Welcoming the Groom with music and dance',
  icon: Music
}, {
  time: '6:00 PM',
  title: 'Phere',
  description: 'The sacred wedding ceremony',
  icon: Sparkles
}, {
  time: '8:00 PM',
  title: 'Dinner',
  description: 'Traditional Royal Feast',
  icon: Utensils
}, {
  time: '9:30 PM',
  title: 'Sangeet & Dance',
  description: 'Celebration continues into the night',
  icon: Wine
}];
export function EventSchedule() {
  const { previewData } = usePreview();
  const events = (previewData as any).events || [];
  return <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{
    once: true,
    margin: '-100px'
  }} className="max-w-xl mx-auto py-8">
      <div className="text-center mb-12 relative">
        <div className="absolute left-1/2 -translate-x-1/2 -top-6 text-gold opacity-20 text-6xl font-display">
          ❧
        </div>
        <span className="text-maroon tracking-[0.2em] text-sm font-bold uppercase block mb-3 font-serif">
          Program
        </span>
        <h2 className="text-3xl md:text-4xl font-display text-brown">
          Wedding Timeline
        </h2>
      </div>

      <div className="relative pl-4 md:pl-0">
        {/* Vertical Line with Pattern */}
        <div className="absolute left-8 md:left-1/2 top-4 bottom-4 w-0.5 bg-gold/30 -translate-x-1/2 hidden md:block border-l-2 border-dotted border-gold" />
        <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-gold/30 md:hidden border-l-2 border-dotted border-gold" />

        <div className="space-y-12">
          {Array.isArray(events) && events.length > 0
  ?events.map((event, index)=> {
          const { date, time } = formatDateTime(event.start_time);
          return <motion.div key={index}  className={`relative flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-0 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                {/* Time & Content Side */}
                <div className={`flex-1 md:w-1/2 ${index % 2 === 0 ? 'md:pl-12 text-left' : 'md:pr-12 md:text-right'} pl-12 md:pl-0`}>
                  <span className="text-maroon font-bold text-lg font-display block mb-1">
                    {time}
                  </span>
                  <span className="text-maroon/70 font-medium text-sm font-display block mb-2">
                    {date}
                  </span>
                  <h3 className="text-xl font-serif font-bold text-brown mb-1">
                    {event.name}
                  </h3>
                  <p className="text-brown/80 text-sm leading-relaxed font-serif italic">
                    {event.description}
                  </p>
                  <p className="text-brown/60 text-xs mt-1 font-serif">
                    📍 {event.event_location}
                  </p>
                </div>

                {/* Center Icon Marker */}
                {/* <div className="absolute left-4 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-maroon border-2 border-gold z-10 shadow-lg">
                  <Icon className="w-5 h-5 text-gold" />
                </div> */}

                {/* Empty side for balance on desktop */}
                <div className="hidden md:block flex-1" />
              </motion.div>;
        }):
          schedule.map((event, index) => {
          const Icon = event.icon;
          return <motion.div key={index}  className={`relative flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-0 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                {/* Time & Content Side */}
                <div className={`flex-1 md:w-1/2 ${index % 2 === 0 ? 'md:pl-12 text-left' : 'md:pr-12 md:text-right'} pl-12 md:pl-0`}>
                  <span className="text-maroon font-bold text-lg font-display block mb-1">
                    {event.time}
                  </span>
                  <h3 className="text-xl font-serif font-bold text-brown mb-1">
                    {event.title}
                  </h3>
                  <p className="text-brown/80 text-sm leading-relaxed font-serif italic">
                    {event.description}
                  </p>
                </div>

                {/* Center Icon Marker */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-maroon border-2 border-gold z-10 shadow-lg">
                  <Icon className="w-5 h-5 text-gold" />
                </div>

                {/* Empty side for balance on desktop */}
                <div className="hidden md:block flex-1" />
              </motion.div>;
        })}
        </div>
      </div>
    </motion.div>;
}