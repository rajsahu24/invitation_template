import { motion } from 'framer-motion';
import { usePreview } from '../../../../context/PreviewContext';

const VENUE_ILLUSTRATION = 'https://res.cloudinary.com/dwbed0m72/image/upload/v1773658878/venue-hedsor-front-COdUzTcT_dngxiz.png';

export function Venue() {
  const { previewData } = usePreview();
  const heroSection = previewData?.hero_section;
  const heroData = heroSection?.data;
  const heroSchema = heroSection?.schema;

  const eventSection = previewData?.event_section;
  const events = Array.isArray(eventSection?.data) ? eventSection.data : [];

  const getFieldValue = (key: string) =>
    (heroData && typeof heroData === 'object' ? (heroData as any)[key] : '') || '';

  let weddingDate = '';
  let weddingTime = '';
  let venueName = '';
  let venueAddress = '';
  let venueCity = '';
  let mapUrl = '';

  if (heroData && typeof heroData === 'object') {
    if (heroSchema?.fields) {
      const findField = (keywords: string[]) =>
        heroSchema.fields.find((f: any) => keywords.some((k: string) => f.key.toLowerCase().includes(k)));
      const dateVal = getFieldValue(findField(['date'])?.key || '');
      if (dateVal) {
        const d = new Date(dateVal);
        weddingDate = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
        weddingTime = d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false });
      }
      venueName = getFieldValue(findField(['venue', 'name'])?.key || '');
      venueAddress = getFieldValue(findField(['address', 'location'])?.key || '');
    } else {
      const dateVal = getFieldValue('date') || getFieldValue('wedding_date');
      if (dateVal) {
        const d = new Date(dateVal);
        weddingDate = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
        weddingTime = d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false });
      }
      venueName = getFieldValue('venue_name') || getFieldValue('venue');
      venueAddress = getFieldValue('location') || getFieldValue('address') || getFieldValue('wedding_location');
    }
  }

  // Try to get time from first event if not in hero
  if (!weddingTime && events.length > 0) {
    const raw = events[0]?.time || events[0]?.date_time || '';
    if (raw.includes('T')) {
      weddingTime = new Date(raw).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false });
    } else if (/^\d{1,2}:\d{2}/.test(raw)) {
      weddingTime = raw;
    }
  }

  const displayDate = weddingDate || '12 September 2026';
  const displayTime = weddingTime || '14:00';
  const displayVenueName = venueName || 'Finca El Olivar';
  const displayAddress = venueAddress || 'Camino de los Olivos s/n, Ronda';
  const displayCity = venueCity || 'Málaga, 29400 – España';
  mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(displayAddress + ' ' + displayCity)}&output=embed`;
  const mapsLink = `https://maps.google.com/?q=${encodeURIComponent(displayAddress + ' ' + displayCity)}`;

  return (
    <section style={{ backgroundColor: '#C4A265' }} className="py-14 px-5">
      <div className="max-w-sm mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2
            className="mb-2"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(2rem, 6vw, 2.6rem)',
              fontStyle: 'italic',
              color: '#fff',
              fontWeight: 400,
            }}
          >
            The Venue
          </h2>
          <p
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: '0.75rem',
              color: '#fff',
              letterSpacing: '0.1em',
              fontWeight: 600,
            }}
          >
            Where we celebrate
          </p>
        </motion.div>

        {/* White card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="rounded-2xl overflow-hidden"
          style={{ backgroundColor: '#fff' }}
        >
          {/* Venue illustration */}
          <div className="w-full px-6 pt-8 pb-4">
            <img
              src={VENUE_ILLUSTRATION}
              alt={displayVenueName}
              className="w-full object-cover rounded-lg"
              style={{ maxHeight: '220px', objectPosition: 'center top' }}
            />
          </div>

          {/* Venue name script */}
          <div className="text-center px-6 pb-4">
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(1.6rem, 5vw, 2rem)',
                fontStyle: 'italic',
                color: '#8B7355',
                fontWeight: 400,
              }}
            >
              {displayVenueName}
            </p>
          </div>

          {/* Divider */}
          <div className="w-16 h-px mx-auto mb-5" style={{ backgroundColor: '#E8E0D5' }} />

          {/* Date & Time */}
          <div className="flex items-center justify-center gap-6 px-6 mb-5">
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '0.95rem',
                color: '#5C4A32',
                fontStyle: 'italic',
                fontWeight: 600,
              }}
            >
              {displayDate}
            </p>
            <div className="w-px h-4" style={{ backgroundColor: '#C4A882' }} />
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '0.95rem',
                color: '#5C4A32',
                fontStyle: 'italic',
                fontWeight: 600,
              }}
            >
              {displayTime}
            </p>
          </div>

          {/* Divider */}
          <div className="w-16 h-px mx-auto mb-5" style={{ backgroundColor: '#E8E0D5' }} />

          {/* Address */}
          <div className="text-center px-6 mb-6">
            <p
              className="mb-1"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '1rem',
                color: '#8B7355',
                fontWeight: 700,
              }}
            >
              {displayAddress}
            </p>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '0.9rem',
                color: '#8B7355',
                fontStyle: 'italic',
              }}
            >
              {displayCity}
            </p>
          </div>

          {/* Embedded map */}
          <div className="relative w-full" style={{ height: '200px' }}>
            <iframe
              src={mapUrl}
              width="100%"
              height="200"
              style={{ border: 0, display: 'block' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Venue Map"
            />
            {/* Open in Maps overlay button */}
            <a
              href={mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-3 left-3 flex items-center gap-1 px-3 py-1.5 rounded-lg shadow text-xs"
              style={{
                backgroundColor: '#fff',
                fontFamily: "'Cinzel', serif",
                color: '#3C2F1E',
                fontWeight: 600,
                letterSpacing: '0.05em',
                textDecoration: 'none',
              }}
            >
              Open in Maps ↗
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
