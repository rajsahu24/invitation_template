import { motion } from 'framer-motion';
import { usePreview } from '../../../../context/PreviewContext';

const BG_TEXTURE = 'https://res.cloudinary.com/dwbed0m72/image/upload/v1773658443/white-textured-paper-KasY8RAJ_zdnmaz.png';

const DUMMY = {
  intro: 'Finca El Olivar does not offer lodging. Here are some recommended options nearby.',
  footer_note: 'For hotels without direct agreements, please mention "Wedding at Finca El Olivar" to access preferential rates.',
  hotels: [
    {
      name: 'PARADOR DE RONDA',
      city: 'Ronda',
      distance: '2 km de la finca',
      phone: '+34 952.877.500',
      email: 'ronda@parador.es',
      website: 'https://parador.es',
      promo_code: '',
    },
    {
      name: 'HOTEL CATALONIA RONDA',
      city: 'Ronda',
      distance: '1.5 km',
      phone: '+34 952.872.315',
      email: 'ronda@hoteles-catalonia.es',
      website: 'https://hoteles-catalonia.es',
      promo_code: 'BODA2026',
    },
    {
      name: 'HOTEL MONTELIRIO',
      city: 'Ronda',
      distance: 'Boutique | Sobre el Tajo',
      phone: '+34 952.873.855',
      email: 'reservas@hotelmontelirio.com',
      website: 'https://hotelmontelirio.com',
      promo_code: '',
    },
  ],
};

export function Accommodation() {
  const { previewData } = usePreview();
  const section = (previewData as any)?.accommodation_section;
  const data = section?.data;

  const intro = data?.intro || DUMMY.intro;
  const footerNote = data?.footer_note || DUMMY.footer_note;
  const hotels = Array.isArray(data?.hotels) && data.hotels.length > 0 ? data.hotels : DUMMY.hotels;

  return (
    <section
      className="relative py-16 px-5 overflow-hidden"
      style={{
        backgroundImage: `url(${BG_TEXTURE})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#F5F0E8',
      }}
    >
      <div className="max-w-sm mx-auto">

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(1.9rem, 5vw, 2.5rem)',
            fontStyle: 'italic',
            color: '#8B7355',
            fontWeight: 400,
          }}
        >
          Accommodation
        </motion.h2>

        {/* Intro text */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-8 leading-relaxed"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '1rem',
            color: '#5C4A32',
            fontWeight: 600,
          }}
        >
          {intro}
        </motion.p>

        {/* Hotels card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-2xl px-8 py-8"
          style={{ backgroundColor: '#fff' }}
        >
          {hotels.map((hotel: any, index: number) => (
            <div key={index}>
              {/* Divider between hotels */}
              {index > 0 && (
                <div
                  className="w-16 h-px mx-auto my-7"
                  style={{ backgroundColor: '#E8E0D5' }}
                />
              )}

              <div className="text-center">
                {/* Hotel name */}
                <p
                  className="mb-1 tracking-[0.15em]"
                  style={{
                    fontFamily: "'Cinzel', serif",
                    fontSize: '0.75rem',
                    color: '#3C2F1E',
                    fontWeight: 700,
                  }}
                >
                  {hotel.name}
                </p>

                {/* City */}
                <p
                  className="mb-1"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '0.95rem',
                    color: '#8B7355',
                    fontStyle: 'italic',
                  }}
                >
                  {hotel.city}
                </p>

                {/* Distance / description */}
                {hotel.distance && (
                  <p
                    className="mb-1"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: '0.9rem',
                      color: '#7A6A58',
                    }}
                  >
                    {hotel.distance}
                  </p>
                )}

                {/* Phone · Email */}
                {(hotel.phone || hotel.email) && (
                  <p
                    className="mb-2 text-xs"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: '0.82rem',
                      color: '#7A6A58',
                    }}
                  >
                    {hotel.phone && hotel.email
                      ? `${hotel.phone} · ${hotel.email}`
                      : hotel.phone || hotel.email}
                  </p>
                )}

                {/* Visit Website */}
                {hotel.website && (
                  <a
                    href={hotel.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mb-2 tracking-[0.1em] text-xs"
                    style={{
                      fontFamily: "'Cinzel', serif",
                      color: '#8B7355',
                      textDecoration: 'none',
                      fontWeight: 600,
                    }}
                  >
                    Visit Website
                  </a>
                )}

                {/* Promo code */}
                {hotel.promo_code && (
                  <p
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: '0.9rem',
                      color: '#8B7355',
                      fontWeight: 700,
                    }}
                  >
                    Promo Code: {hotel.promo_code}
                  </p>
                )}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Footer note */}
        {footerNote && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-8 leading-relaxed"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '0.9rem',
              color: '#5C4A32',
              fontStyle: 'italic',
            }}
          >
            {footerNote}
          </motion.p>
        )}
      </div>
    </section>
  );
}
