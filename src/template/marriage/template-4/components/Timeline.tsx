import  { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { BotanicalLeaf } from './BotanicalLeaf';
import { MapPinIcon, CalendarIcon, ClockIcon } from 'lucide-react';
import { usePreview } from '../../../../context/PreviewContext';

interface Event {
  name: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  mapLink: string;
  description: string;
}
const defaultEvents: Event[] = [
{
  name: 'Engagement Ceremony',
  date: 'December 12, 2025',
  time: '11:00 AM',
  venue: 'Jagmandir Island Palace',
  address: 'Lake Pichola, Udaipur',
  mapLink: 'https://maps.google.com/?q=Jagmandir+Island+Palace+Udaipur',
  description:
  'Join us as we exchange rings and promises in an intimate ceremony surrounded by the serene waters of Lake Pichola.'
},
{
  name: 'Mehendi Celebration',
  date: 'December 13, 2025',
  time: '3:00 PM',
  venue: 'Amet Haveli',
  address: 'Outside Chandpole, Udaipur',
  mapLink: 'https://maps.google.com/?q=Amet+Haveli+Udaipur',
  description:
  'An afternoon of intricate henna designs, folk music, and joyful celebrations as we prepare for the big day.'
},
{
  name: 'Sangeet Night',
  date: 'December 13, 2025',
  time: '7:00 PM',
  venue: 'Fateh Prakash Palace',
  address: 'City Palace Complex, Udaipur',
  mapLink: 'https://maps.google.com/?q=Fateh+Prakash+Palace+Udaipur',
  description:
  'A magical evening of music, dance performances, and celebration under the stars at the magnificent palace.'
},
{
  name: 'Wedding Ceremony',
  date: 'December 14, 2025',
  time: '6:00 PM',
  venue: 'The Oberoi Udaivilas',
  address: 'Haridasji Ki Magri, Udaipur',
  mapLink: 'https://maps.google.com/?q=Oberoi+Udaivilas+Udaipur',
  description:
  'The sacred ceremony where two souls become one, surrounded by loved ones in a setting of unparalleled beauty.'
},
{
  name: 'Reception Dinner',
  date: 'December 15, 2025',
  time: '7:30 PM',
  venue: 'Taj Lake Palace',
  address: 'Lake Pichola, Udaipur',
  mapLink: 'https://maps.google.com/?q=Taj+Lake+Palace+Udaipur',
  description:
  'A grand celebration dinner on the floating palace, marking the beginning of our new journey together.'
}];

function TimelineEvent({ event, index }: {event: Event;index: number;}) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: '-50px'
  });
  const isEven = index % 2 === 0;
  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        x: isEven ? -50 : 50
      }}
      animate={
      isInView ?
      {
        opacity: 1,
        x: 0
      } :
      {
        opacity: 0,
        x: isEven ? -50 : 50
      }
      }
      transition={{
        duration: 0.8,
        delay: 0.2
      }}
      className={`flex items-center gap-4 md:gap-8 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>

      {/* Content card */}
      <div className={`flex-1 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
        <div className="bg-cream rounded-2xl p-6 shadow-lg border border-sage/30 inline-block max-w-md">
          <h3 className="font-serif text-2xl text-forest mb-3">{event.name}</h3>

          <div
            className={`flex flex-wrap gap-4 mb-4 text-sm text-forest-light ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>

            <span className="flex items-center gap-1">
              <CalendarIcon className="w-4 h-4" />
              {event.date}
            </span>
            <span className="flex items-center gap-1">
              <ClockIcon className="w-4 h-4" />
              {event.time}
            </span>
          </div>

          <p className="text-forest-light mb-4 text-sm leading-relaxed">
            {event.description}
          </p>

          <div
            className={`flex items-start gap-2 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>

            <MapPinIcon className="w-4 h-4 text-rose mt-0.5 flex-shrink-0" />
            <div className={isEven ? 'md:text-right' : 'md:text-left'}>
              <p className="font-medium text-forest text-sm">{event.venue}</p>
              <p className="text-forest-light text-xs">{event.address}</p>
            </div>
          </div>

          <a
            href={event.mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1 mt-3 text-rose hover:text-rose-dark 
                       transition-colors text-sm font-medium ${isEven ? 'md:justify-end' : ''}`}>

            View on Map
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">

              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />

            </svg>
          </a>
        </div>
      </div>

      {/* Timeline marker - visible on mobile */}
      <div className="hidden md:block w-px" />
    </motion.div>);

}
export function Timeline() {
  const { previewData } = usePreview();
    const eventSection = previewData?.event_section;
  const events = eventSection?.data || [];
  // const defaultEvents: Event[] = [
  //   {
  //     name: 'Engagement Ceremony',
  //     date: 'December 12, 2025',
  //     time: '11:00 AM',
  //     venue: 'Jagmandir Island Palace',
  //     address: 'Lake Pichola, Udaipur',
  //     mapLink: 'https://maps.google.com/?q=Jagmandir+Island+Palace+Udaipur',
  //     description: 'Join us as we exchange rings and promises in an intimate ceremony.'
  //   }
  // ];
  
  const displayEvents: Event[] = events.length > 0 ? events.map((event: any) => ({
    name: event.name || event.event_name || 'Event',
    date: event.start_time ? new Date(event.start_time).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : '',
    time: event.start_time ? new Date(event.start_time).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }) : '',
    venue: event.event_location || '',
    address: event.description || '',
    mapLink: `https://maps.google.com/?q=${encodeURIComponent(event.event_location || '')}`,
    description: event.description || ''
  })) : defaultEvents;
  
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, {
    once: true,
    margin: '-100px'
  });
  return (
    <section
      className="py-24 px-6 bg-sage relative overflow-hidden"
      id="events">

      {/* Background decorations */}
      <motion.div
        className="absolute top-20 left-5 text-forest-light opacity-15"
        animate={{
          y: [0, -10, 0]
        }}
        transition={{
          duration: 8,
          repeat: Infinity
        }}>

        <BotanicalLeaf variant="branch" animate={false} className="w-24 h-32" />
      </motion.div>

      <motion.div
        className="absolute bottom-20 right-5 text-forest-light opacity-15"
        animate={{
          y: [0, 10, 0]
        }}
        transition={{
          duration: 10,
          repeat: Infinity
        }}>

        <BotanicalLeaf
          variant="branch"
          animate={false}
          className="w-28 h-36 rotate-180" />

      </motion.div>

      <div className="max-w-5xl mx-auto" ref={containerRef}>
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
          className="text-center mb-16">

          <h2 className="font-serif text-4xl md:text-5xl text-forest mb-4">
            Wedding Events
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-rose" />
            <BotanicalLeaf
              variant="small"
              animate={false}
              className="w-6 h-6 text-forest-light" />

            <div className="h-px w-12 bg-rose" />
          </div>
          <p className="mt-6 text-forest-light max-w-xl mx-auto">
            Join us for a celebration of love spanning five magical days in the
            enchanting city of Udaipur
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vine line - center on desktop, left on mobile */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 md:-translate-x-1/2">
            <motion.div
              initial={{
                scaleY: 0
              }}
              animate={
              isInView ?
              {
                scaleY: 1
              } :
              {
                scaleY: 0
              }
              }
              transition={{
                duration: 1.5,
                ease: 'easeOut'
              }}
              className="h-full bg-gradient-to-b from-forest-light via-forest to-forest-light origin-top"
              style={{
                backgroundImage: `repeating-linear-gradient(
                  to bottom,
                  #3D5A3D 0px,
                  #3D5A3D 20px,
                  #5A7A5A 20px,
                  #5A7A5A 25px
                )`
              }} />

          </div>

          {/* Events */}
          <div className="space-y-12">
            {displayEvents.map((event, index) =>
            <div key={event.name} className="relative">
                {/* Leaf marker */}
                <motion.div
                initial={{
                  scale: 0
                }}
                animate={
                isInView ?
                {
                  scale: 1
                } :
                {
                  scale: 0
                }
                }
                transition={{
                  duration: 0.5,
                  delay: 0.3 + index * 0.2
                }}
                className="absolute left-4 md:left-1/2 -translate-x-1/2 z-10">

                  <div className="w-10 h-10 bg-cream rounded-full flex items-center justify-center shadow-lg border-2 border-forest-light">
                    <BotanicalLeaf
                    variant="small"
                    animate={false}
                    className="w-6 h-6 text-forest" />

                  </div>
                </motion.div>

                {/* Event content - offset for mobile */}
                <div className="pl-16 md:pl-0">
                  <TimelineEvent event={event} index={index} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>);

}