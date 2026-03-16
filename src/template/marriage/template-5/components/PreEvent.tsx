import { motion } from 'framer-motion';
import { usePreview } from '../../../../context/PreviewContext';

const DUMMY_PRE_EVENTS = [
  {
    title: 'Welcome Drinks',
    date: 'Friday, September 11th, 2026',
    time: '8:00 PM',
    location: 'Bodega García Hidalgo, Ronda',
    image: 'https://res.cloudinary.com/dwbed0m72/image/upload/v1773663107/sunday-lunch-illustration-Dn7RcvEs_b7chso.png',
  },
  {
    title: 'Farewell Brunch',
    date: 'Sunday, September 13th, 2026',
    time: '12:00 PM',
    location: 'Parador de Ronda (terrace)',
    image: 'https://res.cloudinary.com/dwbed0m72/image/upload/v1773663106/teacup-illustration-LM5oRWej_unmswm.png',
  },
];

const formatEventDate = (dateStr: string): string => {
  try {
    const d = new Date(dateStr);
    const day = d.getDate();
    const suffix = day % 10 === 1 && day !== 11 ? 'st'
      : day % 10 === 2 && day !== 12 ? 'nd'
      : day % 10 === 3 && day !== 13 ? 'rd' : 'th';
    return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', year: 'numeric' })
      .replace(/\d+/, `${day}${suffix}`);
  } catch { return dateStr; }
};

const formatTime = (dateStr: string): string => {
  try {
    if (/^\d{1,2}:\d{2}/.test(dateStr)) return dateStr;
    return new Date(dateStr).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  } catch { return dateStr; }
};

export function PreEvent() {
  const { previewData } = usePreview();
  const preEventSection = (previewData as any)?.pre_event_section;
  const data = preEventSection?.data;

  const events = Array.isArray(data) && data.length > 0 ? data : DUMMY_PRE_EVENTS;

  return (
    <section
      className="py-14 px-5"
      style={{ backgroundColor: '#C4A265' }}
    >
      <div className="max-w-sm mx-auto">

        {/* PRE-WEDDING EVENTS label */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center tracking-[0.25em] text-xs mb-3"
          style={{ fontFamily: "'Cinzel', serif", color: '#fff' }}
        >
          PRE-WEDDING EVENTS
        </motion.p>

        {/* Script heading */}
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-4"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(2rem, 6vw, 2.6rem)',
            fontStyle: 'italic',
            color: '#fff',
            fontWeight: 400,
          }}
        >
          Come Say Hello...
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center text-sm mb-10 leading-relaxed"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            color: '#fff',
            fontWeight: 600,
          }}
        >
          These are informal gatherings, so feel free to join us if you're in the area.
        </motion.p>

        {/* Event cards */}
        <div className="flex flex-col gap-5">
          {events.map((event: any, index: number) => {
            const title = event.title || event.event_name || event.name || '';
            const rawDate = event.date || event.date_time || '';
            const rawTime = event.time || event.date_time || '';
            const location = event.location || event.event_location || '';
            const image = event.image || event.image_url || '';

            const displayDate = rawDate.includes('T') || rawDate.match(/^\d{4}/)
              ? formatEventDate(rawDate)
              : rawDate;
            const displayTime = rawTime.includes('T') || rawTime.match(/^\d{4}/)
              ? formatTime(rawTime)
              : rawTime;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="rounded-2xl px-8 py-8 text-center"
                style={{ backgroundColor: '#fff' }}
              >
                {/* Image */}
                {image && (
                  <div className="flex justify-center mb-4">
                    <img
                      src={image}
                      alt={title}
                      className="h-16 w-auto object-contain"
                    />
                  </div>
                )}

                {/* Event title */}
                <h3
                  className="mb-4"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 'clamp(1.5rem, 4vw, 1.9rem)',
                    fontStyle: 'italic',
                    color: '#8B7355',
                    fontWeight: 400,
                  }}
                >
                  {title}
                </h3>

                {/* Date */}
                <p
                  className="mb-1"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '0.95rem',
                    color: '#3C2F1E',
                    fontWeight: 700,
                  }}
                >
                  {displayDate}
                </p>

                {/* Time */}
                <p
                  className="mb-2"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '0.95rem',
                    color: '#3C2F1E',
                    fontWeight: 700,
                  }}
                >
                  {displayTime}
                </p>

                {/* Location */}
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '0.9rem',
                    color: '#8B7355',
                    fontStyle: 'italic',
                  }}
                >
                  {location}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
