
import { motion } from 'framer-motion';
import { EventCard } from './EventCard';
import { SectionDivider, MandalaPattern } from './ui/OrnateDecorations';
import { usePreview } from '../../../../context/PreviewContext';
import type { InvitationData } from '../../../../hooks/getTemplateDataModel';

const DUMMY_EVENTS = [
  {
    event_name: 'Mehndi & Sangeet',
    date_time: '2024-12-11T16:00:00',
    location: 'The Oberoi Udaivilas, Udaipur',
    description: 'Join us for an evening of music, dance, and henna application. A colorful celebration to kickstart the wedding festivities with traditional folk performances and a gala dinner.',
    image: 'https://images.unsplash.com/photo-1596225577626-38b456897268?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    event_name: 'Wedding Ceremony',
    date_time: '2024-12-12T10:00:00',
    location: 'Jagmandir Island Palace',
    description: 'The sacred union. Witness the Baraat procession followed by the Pheras under the mandap, as we take our vows in the presence of the holy fire and our loved ones.',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0202128?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    event_name: 'Grand Reception',
    date_time: '2024-12-12T19:00:00',
    location: 'City Palace, Udaipur',
    description: 'A night of celebration as Mr. & Mrs. Join us for cocktails, dinner, and dancing under the stars to celebrate the beginning of our new chapter together.',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }
];

export function EventsSection() {
  const { previewData } = usePreview() as { previewData: InvitationData };
  const eventSection = previewData?.event_section;
  const events = eventSection?.data || [];

  const displayEvents = Array.isArray(events) && events.length > 0 ? events : DUMMY_EVENTS;
  return (
    <section className="py-24 bg-[#FFFAF0] relative overflow-hidden">
      {/* Background Decor */}
      <MandalaPattern className="top-0 left-0 w-[500px] h-[500px] text-[#D4AF37] opacity-5 -translate-x-1/2 -translate-y-1/2" />
      <MandalaPattern className="bottom-0 right-0 w-[500px] h-[500px] text-[#D4AF37] opacity-5 translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{
            opacity: 0,
            y: 30
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          viewport={{
            once: true
          }}
          transition={{
            duration: 0.8
          }}
          className="text-center mb-16">

          <h2 className="text-4xl md:text-5xl font-serif-display text-[#8B0000] mb-4">
            Wedding Events
          </h2>
          <SectionDivider />
          <p className="text-gray-600 max-w-2xl mx-auto mt-4">
            We invite you to be part of our celebrations spread across two
            magical days in the City of Lakes.
          </p>
        </motion.div>

        <div className="space-y-8">
          {displayEvents.map((event, index) =>
          <EventCard key={index} event={event} index={index} />
          )}
        </div>
      </div>
    </section>);

}