import { motion } from 'framer-motion';
import { usePreview } from '../../../../context/PreviewContext';
import type { InvitationData } from '../../../../hooks/getTemplateDataModel';

const DUMMY_EVENTS = [
  { time: '14:00', name: 'ARRIVAL' },
  { time: '14:30', name: 'CEREMONY' },
  { time: '16:00', name: 'COCKTAILS' },
  { time: '18:00', name: 'DINNER' },
  { time: '20:00', name: 'CUTTING THE CAKE' },
  { time: '00:00', name: 'FINISH' },
];

const extractTime = (event: any): string => {
  const raw = event.time || event.date_time || event.start_time || event.date || '';
  if (!raw) return '';
  if (/^\d{1,2}:\d{2}$/.test(raw)) return raw;
  try {
    const d = new Date(raw);
    return d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false });
  } catch { return raw; }
};

const extractName = (event: any): string =>
  (event.event_name || event.name || event.title || '').toUpperCase();

const extractDate = (events: any[]): string => {
  const raw = events[0]?.date_time || events[0]?.date || '';
  if (!raw) return '';
  try {
    return new Date(raw).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  } catch { return ''; }
};

export function EventsSection() {
  const { previewData } = usePreview() as { previewData: InvitationData };
  const eventSection = previewData?.event_section;
  const rawEvents = eventSection?.data || [];
  const displayEvents = Array.isArray(rawEvents) && rawEvents.length > 0 ? rawEvents : DUMMY_EVENTS;

  const dateLabel = Array.isArray(rawEvents) && rawEvents.length > 0
    ? extractDate(rawEvents)
    : '12 September 2026';

  // Split into left (odd indices) and right (even indices) alternating
  return (
    <section className="relative py-16 md:py-24 px-4 overflow-hidden" style={{ backgroundColor: '#F5F0E8', backgroundImage: 'url(https://res.cloudinary.com/dwbed0m72/image/upload/v1773658443/white-textured-paper-KasY8RAJ_zdnmaz.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>

      {/* Decorative floral left */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none select-none">
        <svg width="100" height="400" viewBox="0 0 100 400" fill="none">
          <ellipse cx="20" cy="200" rx="18" ry="140" stroke="#C4A882" strokeWidth="1" fill="none" />
          <ellipse cx="50" cy="150" rx="30" ry="80" stroke="#C4A882" strokeWidth="1" fill="none" transform="rotate(-20 50 150)" />
          <ellipse cx="50" cy="250" rx="30" ry="80" stroke="#C4A882" strokeWidth="1" fill="none" transform="rotate(20 50 250)" />
          <ellipse cx="70" cy="200" rx="20" ry="100" stroke="#C4A882" strokeWidth="1" fill="none" transform="rotate(-10 70 200)" />
          <circle cx="20" cy="200" r="5" stroke="#C4A882" strokeWidth="1" fill="none" />
        </svg>
      </div>

      {/* Decorative floral right */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none select-none">
        <svg width="100" height="400" viewBox="0 0 100 400" fill="none">
          <ellipse cx="80" cy="200" rx="18" ry="140" stroke="#C4A882" strokeWidth="1" fill="none" />
          <ellipse cx="50" cy="150" rx="30" ry="80" stroke="#C4A882" strokeWidth="1" fill="none" transform="rotate(20 50 150)" />
          <ellipse cx="50" cy="250" rx="30" ry="80" stroke="#C4A882" strokeWidth="1" fill="none" transform="rotate(-20 50 250)" />
          <ellipse cx="30" cy="200" rx="20" ry="100" stroke="#C4A882" strokeWidth="1" fill="none" transform="rotate(10 30 200)" />
          <circle cx="80" cy="200" r="5" stroke="#C4A882" strokeWidth="1" fill="none" />
        </svg>
      </div>

      <div className="max-w-md mx-auto relative z-10">

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-2"
        >
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(2rem, 6vw, 2.8rem)',
              fontStyle: 'italic',
              color: '#8B7355',
              fontWeight: 400,
            }}
          >
            Day Programme
          </h2>
        </motion.div>

        {/* Date */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-center mb-12 text-sm tracking-wide"
          style={{ fontFamily: "'Cormorant Garamond', serif", color: '#8B7355' }}
        >
          {dateLabel}
        </motion.p>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical center line */}
          <div
            className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
            style={{ backgroundColor: '#C4A882', opacity: 0.6 }}
          />

          <div className="flex flex-col">
            {displayEvents.map((event: any, index: number) => {
              const time = event.time || extractTime(event);
              const name = event.name || extractName(event);
              const isRight = index % 2 === 0; // even → right side, odd → left side

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isRight ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="relative flex items-center min-h-[72px]"
                >
                  {/* Left side content */}
                  <div className="flex-1 flex justify-end pr-6 text-right">
                    {!isRight && (
                      <div>
                        <p
                          style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: '1.1rem',
                            color: '#5C4A32',
                            fontWeight: 600,
                            letterSpacing: '0.05em',
                          }}
                        >
                          {time}
                        </p>
                        <p
                          style={{
                            fontFamily: "'Cinzel', serif",
                            fontSize: '0.65rem',
                            color: '#8B7355',
                            letterSpacing: '0.15em',
                          }}
                        >
                          {name}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Center tick */}
                  <div
                    className="absolute left-1/2 -translate-x-1/2 w-3 h-px"
                    style={{ backgroundColor: '#C4A882' }}
                  />

                  {/* Right side content */}
                  <div className="flex-1 flex justify-start pl-6 text-left">
                    {isRight && (
                      <div>
                        <p
                          style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: '1.1rem',
                            color: '#5C4A32',
                            fontWeight: 600,
                            letterSpacing: '0.05em',
                          }}
                        >
                          {time}
                        </p>
                        <p
                          style={{
                            fontFamily: "'Cinzel', serif",
                            fontSize: '0.65rem',
                            color: '#8B7355',
                            letterSpacing: '0.15em',
                          }}
                        >
                          {name}
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom decorative anchor */}
          <div className="flex justify-center mt-4">
            <svg width="40" height="50" viewBox="0 0 40 50" fill="none" opacity="0.4">
              <line x1="20" y1="0" x2="20" y2="30" stroke="#C4A882" strokeWidth="1" />
              <circle cx="20" cy="35" r="5" stroke="#C4A882" strokeWidth="1" fill="none" />
              <line x1="10" y1="35" x2="30" y2="35" stroke="#C4A882" strokeWidth="1" />
              <line x1="10" y1="35" x2="8" y2="42" stroke="#C4A882" strokeWidth="1" />
              <line x1="30" y1="35" x2="32" y2="42" stroke="#C4A882" strokeWidth="1" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
