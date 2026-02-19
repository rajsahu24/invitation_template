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


export function EventSchedule() {
  const { previewData } = usePreview();
  const eventSection = previewData?.event_section;
  let events = eventSection?.data || [];
  const schema = eventSection?.schema;
  if(!events){
   events = [{
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
  }
  if (!Array.isArray(events) || events.length === 0) return null;

  const renderEvent = (event: any, index: number) => {
    let title = '';
    let location = '';
    let description = '';
    let dateDisplay = '';
    let timeDisplay = '';

    if (schema?.fields) {
      const titleField = schema.fields.find((f: any) => f.key.toLowerCase().includes('name') || f.key.toLowerCase().includes('title'));
      const dateField = schema.fields.find((f: any) => f.type === 'datetime' || f.type === 'date');
      const locationField = schema.fields.find((f: any) => f.key.toLowerCase().includes('location'));
      const descField = schema.fields.find((f: any) => f.key.toLowerCase().includes('description') || f.key.toLowerCase().includes('tag'));

      title = titleField ? event[titleField.key] : '';
      location = locationField ? event[locationField.key] : '';
      description = descField ? event[descField.key] : '';

      if (dateField && event[dateField.key]) {
        if (dateField.type === 'datetime') {
          const { date, time } = formatDateTime(event[dateField.key]);
          dateDisplay = date;
          timeDisplay = time;
        } else {
          dateDisplay = new Date(event[dateField.key]).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
        }
      }
    } else {
      title = event.event_name || event.name || event.title || '';
      location = event.location || event.event_location || '';
      description = event.description || event.tag_line || '';
      
      const dateTimeValue = event.date_time || event.start_time || event.date;
      if (dateTimeValue) {
        if (dateTimeValue.includes('T')) {
          const { date, time } = formatDateTime(dateTimeValue);
          dateDisplay = date;
          timeDisplay = time;
        } else {
          dateDisplay = new Date(dateTimeValue).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
        }
      }
    }

    return (
      <motion.div key={index} className={`relative flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-0 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
        <div className={`flex-1 md:w-1/2 ${index % 2 === 0 ? 'md:pl-12 text-left' : 'md:pr-12 md:text-right'} pl-12 md:pl-0`}>
          {timeDisplay && <span className="text-maroon font-bold text-lg font-display block mb-1">{timeDisplay}</span>}
          {dateDisplay && <span className="text-maroon/70 font-medium text-sm font-display block mb-2">{dateDisplay}</span>}
          {title && <h3 className="text-xl font-serif font-bold text-brown mb-1">{title}</h3>}
          {description && <p className="text-brown/80 text-sm leading-relaxed font-serif italic">{description}</p>}
          {location && <p className="text-brown/60 text-xs mt-1 font-serif">📍 {location}</p>}
        </div>
        <div className="hidden md:block flex-1" />
      </motion.div>
    );
  };
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
          {events.map((event, index) => renderEvent(event, index))}
        </div>
      </div>
    </motion.div>;
}