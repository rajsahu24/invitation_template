import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { usePreview } from '../../../../context/PreviewContext';
import type { InvitationData } from '../../../../hooks/getTemplateDataModel';

const formatDateTime = (dateTimeString: string) => {
  const date = new Date(dateTimeString);
  return {
    date: date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    time: date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
  };
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
};
const DUMMY_EVENTS = [
  {
    event_name: 'The Royal Ceremony',
    date_time: '2024-12-12T14:00:00',
    location: 'Grand Palace Cathedral',
    tag_line: 'Witness the union in the historic cathedral grounds.'
  },
  {
    event_name: 'Cocktail Hour',
    date_time: '2024-12-12T16:30:00',
    location: 'Royal Gardens',
    tag_line: 'Enjoy signature cocktails and live music in the garden.'
  },
  {
    event_name: 'The Grand Reception',
    date_time: '2024-12-12T18:00:00',
    location: 'Crystal Ballroom',
    tag_line: 'Dinner, dancing, and festivities until midnight.'
  }
];

export function EventsSection() {
  const { previewData } = usePreview() as { previewData: InvitationData };
  const eventSection = previewData?.event_section;
  const events = eventSection?.data || [];
  const schema = eventSection?.schema;

  const displayEvents = Array.isArray(events) && events.length > 0 ? events : DUMMY_EVENTS;

  const renderEvent = (event: any, index: number) => {
    let title = '';
    let dateDisplay = null;
    let timeDisplay = null;
    let location = '';
    let description = '';

    if (schema?.fields) {
      const titleField = schema.fields.find((f: any) => f.key.toLowerCase().includes('name') || f.key.toLowerCase().includes('title'));
      title = titleField ? event[titleField.key] : '';

      return (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className={`relative overflow-hidden rounded-lg border border-royal-gold/30 bg-black/30 backdrop-blur-sm p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
            <div className="flex-shrink-0">
              <div className="w-20 h-20 rounded-full flex items-center justify-center border-4 border-royal-gold/50 shadow-lg shadow-black/50">
                <Clock className="w-10 h-10 text-white" />
              </div>
            </div>

            <div className={`flex-1 text-center ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
              {title && <h3 className="font-playfair text-3xl text-royal-goldLight mb-2">{title}</h3>}
              
              <div className={`flex flex-col gap-2 font-cinzel text-sm text-gray-300 mb-4 ${index % 2 === 0 ? 'md:items-start' : 'md:items-end'}`}>
                {schema.fields.map((field: any) => renderFieldValue(event, field))}
              </div>

              {schema.fields.filter((f: any) => !['datetime', 'date'].includes(f.type) && !f.key.toLowerCase().includes('location') && !f.key.toLowerCase().includes('name') && !f.key.toLowerCase().includes('title')).map((field: any) => {
                const value = event[field.key];
                return value ? <p key={field.key} className="font-cormorant text-xl leading-relaxed text-gray-200">{value}</p> : null;
              })}
            </div>
          </div>
        </motion.div>
      );
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
          dateDisplay = formatDate(dateTimeValue);
        }
      }

      return (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className={`relative overflow-hidden rounded-lg border border-royal-gold/30 bg-black/30 backdrop-blur-sm p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
            <div className="flex-shrink-0">
              <div className="w-20 h-20 rounded-full flex items-center justify-center border-4 border-royal-gold/50 shadow-lg shadow-black/50">
                <Clock className="w-10 h-10 text-white" />
              </div>
            </div>

            <div className={`flex-1 text-center ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
              {title && <h3 className="font-playfair text-3xl text-royal-goldLight mb-2">{title}</h3>}
              
              <div className={`flex flex-col gap-2 font-cinzel text-sm text-gray-300 mb-4 ${index % 2 === 0 ? 'md:items-start' : 'md:items-end'}`}>
                {dateDisplay && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-royal-gold" />
                    <span>{dateDisplay}</span>
                  </div>
                )}
                {timeDisplay && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-royal-gold" />
                    <span>{timeDisplay}</span>
                  </div>
                )}
                {location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-royal-gold" />
                    <span>{location}</span>
                  </div>
                )}
              </div>

              {description && <p className="font-cormorant text-xl leading-relaxed text-gray-200">{description}</p>}
            </div>
          </div>
        </motion.div>
      );
    }
  };

  const renderFieldValue = (event: any, field: any) => {
    const value = event[field.key];
    if (!value) return null;

    if (field.type === 'datetime') {
      const { date, time } = formatDateTime(value);
      return (
        <>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-royal-gold" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-royal-gold" />
            <span>{time}</span>
          </div>
        </>
      );
    }

    if (field.type === 'date') {
      return (
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-royal-gold" />
          <span>{formatDate(value)}</span>
        </div>
      );
    }

    if (field.key.toLowerCase().includes('location')) {
      return (
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-royal-gold" />
          <span>{value}</span>
        </div>
      );
    }

    return null;
  };

  return (
    <section className="py-24 bg-royal-deepPurple text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/black-scales.png")' }} />
      
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <h2 className="font-playfair text-4xl md:text-5xl text-royal-goldLight mb-4">
            Order of Events
          </h2>
          <p className="font-cormorant text-xl text-gray-300 italic">
            A day of celebration and joy
          </p>
        </div>

        <div className="space-y-12">
          {displayEvents.map((event, index) => renderEvent(event, index))}
        </div>
      </div>
    </section>
  );
}