// import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin } from 'lucide-react';
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
const demoEvents = [{
  title: 'The Royal Ceremony',
  time: '2:00 PM',
  location: 'Grand Palace Cathedral',
  description: 'Witness the union in the historic cathedral grounds.',
  color: 'bg-royal-emerald'
}, {
  title: 'Cocktail Hour',
  time: '4:30 PM',
  location: 'Royal Gardens',
  description: 'Enjoy signature cocktails and quartets in the garden.',
  color: 'bg-royal-teal'
}, {
  title: 'The Grand Reception',
  time: '6:00 PM',
  location: 'Crystal Ballroom',
  description: 'Dinner, dancing, and festivities until midnight.',
  color: 'bg-royal-ruby'
}];
export function EventsSection() {
  const { previewData } = usePreview();

  const events = (previewData as any).events || [];
  return <section className="py-24 bg-royal-deepPurple text-white relative overflow-hidden">
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-5" style={{
      backgroundImage: 'url("https://www.transparenttextures.com/patterns/black-scales.png")'
    }}></div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <h2 className="font-playfair text-4xl md:text-5xl text-royal-goldLight mb-4">
            Order of Events
          </h2>
          <p className="font-cormorant text-xl text-gray-300 italic">
            A day of celebration and joy
          </p>
        </div>
        {}
        <div className="space-y-12">
          {Array.isArray(events) && events.length > 0? events.map((event, index) => {
            const { date, time } = formatDateTime(event.start_time);
            return (
              <motion.div key={index} initial={{
                opacity: 0,
                x: index % 2 === 0 ? -50 : 50
              }} whileInView={{
                opacity: 1,
                x: 0
              }} viewport={{
                once: true,
                margin: '-100px'
              }} transition={{
                duration: 0.8
              }} className="relative">
                <div className={`relative overflow-hidden rounded-lg border border-royal-gold/30 bg-black/30 backdrop-blur-sm p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                  {/* Decorative Side Bar */}
                  <div className={`absolute top-0 bottom-0 w-2 `} />

                  {/* Icon Circle */}
                  <div className="flex-shrink-0">
                    <div className={`w-20 h-20 rounded-full } flex items-center justify-center border-4 border-royal-gold/50 shadow-lg shadow-black/50`}>
                      <Clock className="w-10 h-10 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`flex-1 text-center ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                    <h3 className="font-playfair text-3xl text-royal-goldLight mb-2">
                      {event.name}
                    </h3>
                    <div className={`flex flex-col gap-2 font-cinzel text-sm text-gray-300 mb-4 ${index % 2 === 0 ? 'md:items-start' : 'md:items-end'}`}>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-royal-gold" />
                        <span>{date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-royal-gold" />
                        <span>{time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-royal-gold" />
                        <span>{event.event_location}</span>
                      </div>
                    </div>
                    <p className="font-cormorant text-xl leading-relaxed text-gray-200">
                      {event.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          }):
            demoEvents.map((event,index)=> <motion.div key={index} initial={{
          opacity: 0,
          x: index % 2 === 0 ? -50 : 50
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true,
          margin: '-100px'
        }} transition={{
          duration: 0.8
        }} className="relative">
              <div className={`relative overflow-hidden rounded-lg border border-royal-gold/30 bg-black/30 backdrop-blur-sm p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                {/* Decorative Side Bar */}
                <div className={`absolute top-0 bottom-0 w-2 `} />

                {/* Icon Circle */}
                <div className="flex-shrink-0">
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center border-4 border-royal-gold/50 shadow-lg shadow-black/50`}>
                    <Clock className="w-10 h-10 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className={`flex-1 text-center ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                  <h3 className="font-playfair text-3xl text-royal-goldLight mb-2">
                    {event.title}
                  </h3>
                  <div className={`flex flex-col gap-2 font-cinzel text-sm text-gray-300 mb-4 ${index % 2 === 0 ? 'md:items-start' : 'md:items-end'}`}>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-royal-gold" />
                      <span>October 24th, 2024</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-royal-gold" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-royal-gold" />
                      <span>Location</span>
                    </div>
                  </div>
                  <p className="font-cormorant text-xl leading-relaxed text-gray-200">
                    {event.description}
                  </p>
                </div>
              </div>
            </motion.div>)
            }
        </div>
      </div>
    </section>;
}