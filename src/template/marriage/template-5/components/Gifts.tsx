import { motion } from 'framer-motion';
import { usePreview } from '../../../../context/PreviewContext';

const BG_IMAGE = 'https://res.cloudinary.com/dwbed0m72/image/upload/v1773658878/venue-hedsor-front-COdUzTcT_dngxiz.png';

const DUMMY = {
  intro: "Your presence is our greatest gift. If you wish to give us something, please find our bank account information below:",
  accounts: [
    {
      bank: 'CAIXABANK – ANDREA MORALES',
      iban: 'ES00 0000 0000 0000 0000 0000',
      bic: 'XXXXXXXXXX',
    },
    {
      bank: 'BANCO SANTANDER – PEDRO FERNÁNDEZ',
      iban: 'ES00 0000 0000 0000 0000 0000',
      bic: 'XXXXXXXXXX',
    },
  ],
};

export function Gifts() {
  const { previewData } = usePreview();
  const section = (previewData as any)?.gifts_section;
  const data = section?.data;

  const intro = data?.intro || DUMMY.intro;
  const accounts = Array.isArray(data?.accounts) && data.accounts.length > 0
    ? data.accounts
    : DUMMY.accounts;

  return (
    <section
      className="relative py-16 px-5 flex items-center justify-center min-h-[520px] overflow-hidden"
      style={{
        backgroundImage: `url(${BG_IMAGE})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Frosted main card */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative w-full max-w-xs mx-auto rounded-2xl px-8 py-10"
        style={{
          backgroundColor: 'rgba(255,255,255,0.82)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      >
        {/* Title */}
        <h2
          className="text-center mb-6"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(1.9rem, 5vw, 2.4rem)',
            fontStyle: 'italic',
            color: '#8B7355',
            fontWeight: 400,
          }}
        >
          Gifts
        </h2>

        {/* Intro */}
        <p
          className="text-center mb-8 leading-relaxed"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '0.97rem',
            color: '#5C4A32',
            fontStyle: 'italic',
            fontWeight: 500,
          }}
        >
          {intro}
        </p>

        {/* Bank account cards */}
        <div className="flex flex-col gap-4">
          {accounts.map((account: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="rounded-xl px-5 py-5"
              style={{ backgroundColor: '#F5F0E8' }}
            >
              {/* Bank / Account name */}
              <p
                className="mb-3 tracking-[0.08em] leading-snug"
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: '0.72rem',
                  color: '#3C2F1E',
                  fontWeight: 700,
                }}
              >
                {account.bank || account.name || account.account_name || ''}
              </p>

              {/* IBAN */}
              {(account.iban || account.account_number) && (
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '0.85rem',
                    color: '#5C4A32',
                  }}
                >
                  IBAN: {account.iban || account.account_number}
                </p>
              )}

              {/* BIC/SWIFT */}
              {(account.bic || account.swift) && (
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '0.85rem',
                    color: '#5C4A32',
                  }}
                >
                  BIC/SWIFT: {account.bic || account.swift}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
