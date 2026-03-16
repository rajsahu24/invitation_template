import { motion } from 'framer-motion';
import { usePreview } from '../../../../context/PreviewContext';

const BG_IMAGE = 'https://res.cloudinary.com/dwbed0m72/image/upload/v1773658878/venue-hedsor-front-COdUzTcT_dngxiz.png';

export function DressCode() {
  const { previewData } = usePreview();
  const dressCodeSection = (previewData as any)?.dress_code_section;
  const data = dressCodeSection?.data;

  const womenDressCode = data?.women || data?.woman || 'Cocktail or formal dress';
  const menDressCode = data?.men || data?.man || 'Dark suit and tie';

  return (
    <section
      className="relative py-16 px-4 flex items-center justify-center min-h-[480px] overflow-hidden"
      style={{
        backgroundImage: `url(${BG_IMAGE})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Frosted glass card */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative w-full max-w-xs mx-auto rounded-2xl px-10 py-12 text-center"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.72)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      >
        {/* Title */}
        <h2
          className="mb-8"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(1.8rem, 5vw, 2.4rem)',
            fontStyle: 'italic',
            color: '#8B7355',
            fontWeight: 400,
          }}
        >
          Dress Code
        </h2>

        {/* Women */}
        <h3
          className="mb-2"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(1.4rem, 4vw, 1.9rem)',
            fontStyle: 'italic',
            color: '#8B7355',
            fontWeight: 400,
          }}
        >
          Women
        </h3>
        <p
          className="mb-6"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '0.95rem',
            color: '#5C4A32',
            fontStyle: 'italic',
            letterSpacing: '0.03em',
          }}
        >
          {womenDressCode}
        </p>

        {/* Divider */}
        <div
          className="w-16 h-px mx-auto mb-6"
          style={{ backgroundColor: '#C4A882' }}
        />

        {/* Men */}
        <h3
          className="mb-2"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(1.4rem, 4vw, 1.9rem)',
            fontStyle: 'italic',
            color: '#8B7355',
            fontWeight: 400,
          }}
        >
          Men
        </h3>
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '0.95rem',
            color: '#5C4A32',
            fontStyle: 'italic',
            letterSpacing: '0.03em',
          }}
        >
          {menDressCode}
        </p>
      </motion.div>
    </section>
  );
}
