import { motion } from 'framer-motion';
import { MapPin, Car } from 'lucide-react';
import { usePreview } from '../../../../context/PreviewContext';

const DUMMY = {
  address: 'Finca El Olivar, Camino de los Olivos s/n,\n29400 Ronda, Málaga – Spain',
  map_url: 'https://maps.google.com',
  directions: [
    'From Málaga: ~1h 30min via A-357 and A-367',
    'From Seville: ~2h via A-376',
    'From Marbella: ~1h via A-397',
  ],
};

export function Location() {
  const { previewData } = usePreview();
  const locationSection = (previewData as any)?.location_section;
  const data = locationSection?.data;

  const address = data?.address || DUMMY.address;
  const mapUrl = data?.map_url || data?.google_maps_url || DUMMY.map_url;
  const rawDirections = data?.directions || data?.transportation || DUMMY.directions;
  const directions = Array.isArray(rawDirections)
    ? rawDirections
    : typeof rawDirections === 'string'
    ? rawDirections.split('\n').filter(Boolean)
    : DUMMY.directions;

  return (
    <section
      className="py-16 px-5"
      style={{ backgroundColor: '#F5F0E8' }}
    >
      <div className="max-w-sm mx-auto">

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(1.7rem, 5vw, 2.3rem)',
            fontStyle: 'italic',
            color: '#8B7355',
            fontWeight: 400,
          }}
        >
          Location &amp; Transportation
        </motion.h2>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="rounded-2xl px-8 py-10"
          style={{ backgroundColor: '#fff' }}
        >
          {/* Address block */}
          <div className="flex flex-col items-center text-center mb-6">
            <MapPin
              className="mb-3"
              style={{ color: '#8B7355' }}
              size={22}
              strokeWidth={1.5}
            />
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '1rem',
                color: '#3C2F1E',
                fontWeight: 700,
                lineHeight: 1.6,
                whiteSpace: 'pre-line',
              }}
            >
              {address}
            </p>

            {/* Google Maps link */}
            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 tracking-[0.2em] text-xs"
              style={{
                fontFamily: "'Cinzel', serif",
                color: '#8B7355',
                textDecoration: 'none',
              }}
            >
              GOOGLE MAPS
            </a>
          </div>

          {/* Divider */}
          <div
            className="w-full h-px mb-6"
            style={{ backgroundColor: '#E8E0D5' }}
          />

          {/* Directions block */}
          <div className="flex flex-col items-center text-center">
            <Car
              className="mb-4"
              style={{ color: '#8B7355' }}
              size={22}
              strokeWidth={1.5}
            />
            <div className="flex flex-col gap-1">
              {directions.map((line: string, i: number) => (
                <p
                  key={i}
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '0.95rem',
                    color: '#3C2F1E',
                    fontWeight: 600,
                    lineHeight: 1.7,
                  }}
                >
                  {line}
                </p>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
