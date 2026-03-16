import { motion } from 'framer-motion';
import { usePreview } from '../../../../context/PreviewContext';

export function Footer() {
  const { previewData } = usePreview();
  const heroSection = previewData?.hero_section;
  const data = heroSection?.data;
  const schema = heroSection?.schema;

  const getFieldValue = (key: string) => (data && typeof data === 'object' ? (data as any)[key] : '') || '';

  let brideName = '';
  let groomName = '';
  let weddingDate = '';

  if (data && typeof data === 'object') {
    if (schema?.fields) {
      const findField = (keywords: string[]) =>
        schema.fields.find((f: any) => keywords.some((k: string) => f.key.toLowerCase().includes(k)));
      brideName = getFieldValue(findField(['bride'])?.key || '');
      groomName = getFieldValue(findField(['groom'])?.key || '');
      const dateVal = getFieldValue(findField(['date'])?.key || '');
      weddingDate = dateVal ? new Date(dateVal).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : '';
    } else {
      brideName = getFieldValue('bride_name');
      groomName = getFieldValue('groom_name');
      const dateVal = getFieldValue('date') || getFieldValue('wedding_date');
      weddingDate = dateVal ? new Date(dateVal).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : '';
    }
  }

  const displayBride = brideName || 'Andrea';
  const displayGroom = groomName || 'Pedro';
  const displayDate = weddingDate || '12 September 2026';

  return (
    <footer
      className="relative py-16 px-5 overflow-hidden"
      style={{ backgroundColor: '#F5F0E8' }}
    >
      {/* Decorative floral left */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 opacity-15 pointer-events-none select-none">
        <svg width="80" height="300" viewBox="0 0 80 300" fill="none">
          <ellipse cx="15" cy="150" rx="12" ry="110" stroke="#C4A882" strokeWidth="1" fill="none" />
          <ellipse cx="40" cy="110" rx="22" ry="65" stroke="#C4A882" strokeWidth="1" fill="none" transform="rotate(-20 40 110)" />
          <ellipse cx="40" cy="190" rx="22" ry="65" stroke="#C4A882" strokeWidth="1" fill="none" transform="rotate(20 40 190)" />
          <circle cx="15" cy="150" r="4" stroke="#C4A882" strokeWidth="1" fill="none" />
        </svg>
      </div>

      {/* Decorative floral right */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-15 pointer-events-none select-none">
        <svg width="80" height="300" viewBox="0 0 80 300" fill="none">
          <ellipse cx="65" cy="150" rx="12" ry="110" stroke="#C4A882" strokeWidth="1" fill="none" />
          <ellipse cx="40" cy="110" rx="22" ry="65" stroke="#C4A882" strokeWidth="1" fill="none" transform="rotate(20 40 110)" />
          <ellipse cx="40" cy="190" rx="22" ry="65" stroke="#C4A882" strokeWidth="1" fill="none" transform="rotate(-20 40 190)" />
          <circle cx="65" cy="150" r="4" stroke="#C4A882" strokeWidth="1" fill="none" />
        </svg>
      </div>

      <div className="max-w-xs mx-auto text-center relative z-10">

        {/* Bride name */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(2rem, 6vw, 2.6rem)',
            fontStyle: 'italic',
            color: '#8B7355',
            fontWeight: 400,
            lineHeight: 1.2,
          }}
        >
          {displayBride}
        </motion.p>

        {/* Ampersand */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="my-2"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '1.4rem',
            color: '#8B7355',
            fontStyle: 'italic',
          }}
        >
          &amp;
        </motion.p>

        {/* Groom name */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(2rem, 6vw, 2.6rem)',
            fontStyle: 'italic',
            color: '#8B7355',
            fontWeight: 400,
            lineHeight: 1.2,
          }}
        >
          {displayGroom}
        </motion.p>

        {/* Date */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-5 mb-10"
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: '0.85rem',
            color: '#8B7355',
            letterSpacing: '0.05em',
            fontWeight: 700,
          }}
        >
          {displayDate}
        </motion.p>

        {/* Divider */}
        <div className="w-20 h-px mx-auto mb-8" style={{ backgroundColor: '#C4A882', opacity: 0.5 }} />

        {/* Credit */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35 }}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '0.85rem',
            color: '#8B7355',
          }}
        >
          Made with love by{' '}
          <a
            href="https://inviteera.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#5C4A32', fontWeight: 700, textDecoration: 'underline' }}
          >
            Inviteera
          </a>
        </motion.p>
      </div>
    </footer>
  );
}
