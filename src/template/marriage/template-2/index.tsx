import { InvitationContent } from './components/InvitationContent';
import { EventSchedule } from './components/EventSchedule';
import { PhotoGallery } from './components/PhotoGallery';
import { RSVPForm } from './components/RSVPForm';
import { motion } from 'framer-motion';
// Decorative Mandala Component
const MandalaHeader = () => <div className="w-full h-64 md:h-80 bg-maroon relative overflow-hidden flex items-center justify-center">
    {/* Background Pattern */}
    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/henna.png')]"></div>

    {/* Central Mandala */}
    <motion.div initial={{
    rotate: 0,
    opacity: 0
  }} animate={{
    rotate: 360,
    opacity: 1
  }} transition={{
    duration: 60,
    repeat: Infinity,
    ease: 'linear',
    opacity: {
      duration: 1
    }
  }} className="w-[600px] h-[600px] absolute opacity-20">
      <svg viewBox="0 0 100 100" fill="none" stroke="#D4AF37" strokeWidth="0.5">
        <circle cx="50" cy="50" r="45" />
        <circle cx="50" cy="50" r="35" />
        <circle cx="50" cy="50" r="25" />
        <path d="M50 5 L50 95 M5 50 L95 50 M18 18 L82 82 M18 82 L82 18" />
        <path d="M50 0 Q65 35 100 50 Q65 65 50 100 Q35 65 0 50 Q35 35 50 0" fill="#D4AF37" opacity="0.1" />
      </svg>
    </motion.div>

    {/* Title Overlay */}
    <div className="relative z-10 text-center">
      <motion.div initial={{
      y: 20,
      opacity: 0
    }} animate={{
      y: 0,
      opacity: 1
    }} transition={{
      duration: 1
    }}>
        <h1 className="text-4xl md:text-6xl font-display text-gold drop-shadow-lg tracking-widest">
          ॐ
        </h1>
      </motion.div>
    </div>

    {/* Bottom Decorative Border */}
    <div className="absolute bottom-0 left-0 right-0 h-4 bg-gold/20 backdrop-blur-sm border-t border-gold"></div>
  </div>;
const DecorativeDivider = () => <div className="my-16 flex items-center justify-center">
    <div className="h-px bg-gold/40 w-full max-w-[100px]" />
    <div className="mx-4 text-maroon text-2xl">❦</div>
    <div className="h-px bg-gold/40 w-full max-w-[100px]" />
  </div>;
export default function App() {
        const getInvitationIdFromUrl = (): string | null => {
        const pathParts = window.location.pathname.split('/');
        return pathParts[4] || null;
    };
    const param = getInvitationIdFromUrl()

    const isRSVPToken = (param: string): boolean => {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        return param.length === 10 && !uuidRegex.test(param);
    };
    const isRSVp = param ? isRSVPToken(param) : false;
  return (
    <div className="min-h-screen bg-cream selection:bg-maroon selection:text-gold pb-24">
      <header>
        <MandalaHeader />
      </header>

      <main className="container mx-auto px-4 md:px-8">
        <div className="max-w-4xl mx-auto -mt-12 relative z-10 bg-cream pt-12 md:pt-16 pb-12 px-6 md:px-12 shadow-2xl rounded-t-lg md:rounded-lg border border-gold/20">
          {/* Corner Decorations */}
          <div className="absolute top-0 left-0 w-24 h-24 pointer-events-none opacity-20">
            <svg viewBox="0 0 100 100" fill="#8B1538">
              <path d="M0 0 L100 0 Q50 50 0 100 Z" />
            </svg>
          </div>
          <div className="absolute top-0 right-0 w-24 h-24 pointer-events-none opacity-20 rotate-90">
            <svg viewBox="0 0 100 100" fill="#8B1538">
              <path d="M0 0 L100 0 Q50 50 0 100 Z" />
            </svg>
          </div>

          <InvitationContent />

          <DecorativeDivider />

          <EventSchedule />

          <DecorativeDivider />

          <PhotoGallery />

          <DecorativeDivider />

          {isRSVp && <RSVPForm />}

          {/* Bottom Corner Decorations */}
          <div className="absolute bottom-0 left-0 w-24 h-24 pointer-events-none opacity-20 -rotate-90">
            <svg viewBox="0 0 100 100" fill="#8B1538">
              <path d="M0 0 L100 0 Q50 50 0 100 Z" />
            </svg>
          </div>
          <div className="absolute bottom-0 right-0 w-24 h-24 pointer-events-none opacity-20 rotate-180">
            <svg viewBox="0 0 100 100" fill="#8B1538">
              <path d="M0 0 L100 0 Q50 50 0 100 Z" />
            </svg>
          </div>
        </div>
      </main>

      <footer className="text-center text-brown/60 text-sm py-12 mt-12 border-t border-gold/20 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-cream px-4 text-gold text-xl">
          ❖
        </div>
        <p className="font-serif italic">
          We look forward to celebrating with you
        </p>
      </footer>
    </div>
  )
}