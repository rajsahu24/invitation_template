
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { usePreview } from '../../../../context/PreviewContext';

const containerVariants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

// Paisley Corner SVG Component
const PaisleyCorner = ({
  className
}: {
  className?: string;
}) => <svg viewBox="0 0 100 100" className={className} fill="currentColor">
    <path d="M0,0 Q50,0 50,50 Q50,100 0,100 L0,0 Z" fill="none" />
    <path d="M10,10 C30,10 40,20 40,40 C40,70 10,70 10,40 C10,30 15,25 20,25 C25,25 25,35 20,35" stroke="currentColor" strokeWidth="2" fill="none" />
    <circle cx="20" cy="45" r="3" />
    <path d="M0,0 L30,0 L0,30 Z" fill="currentColor" opacity="0.2" />
  </svg>;

export function InvitationContent() {
  const { previewData } = usePreview();
  
  // Handle unified data structure
  const invitation = (previewData as any).invitation || previewData;
  const metadata = invitation?.metadata || {};
  
  // Extract data with fallbacks
  const groomName = metadata?.groom_name || 'Aarav';
  const brideName = metadata?.bride_name || 'Diya';
  const weddingDate = metadata?.wedding_date || 'Saturday, December 14th, 2024';
  const weddingLocation = metadata?.wedding_location || 'The Royal Palace';
  const invitationMessage = invitation?.invitation_message || 'With the blessings of our parents, we invite you to share in our joy as we embark on this new journey together. Join us for an evening of tradition, music, and celebration.';
  
  return <motion.div variants={containerVariants} initial="hidden" animate="visible" className="text-center space-y-12 relative">
      {/* Decorative Top Element */}
      <div className="flex justify-center mb-8">
        <div className="w-16 h-16 text-maroon opacity-80">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L14.5 9H22L16 13.5L18.5 21L12 16.5L5.5 21L8 13.5L2 9H9.5L12 2Z" />
          </svg>
        </div>
      </div>

      <motion.div  className="space-y-6">
        <div className="flex items-center justify-center gap-4">
          <div className="h-px w-12 bg-gold" />
          <span className="text-maroon tracking-[0.2em] text-sm font-bold uppercase font-serif">
            Shubh Vivah
          </span>
          <div className="h-px w-12 bg-gold" />
        </div>

        <h1 className="text-5xl md:text-7xl font-display text-maroon leading-tight drop-shadow-sm">
          {groomName} & {brideName}
        </h1>

        <p className="text-xl md:text-2xl text-brown font-serif italic">
          Request the honor of your presence
        </p>
      </motion.div>

      <motion.div  className="py-10 border-y-2 border-gold border-double max-w-lg mx-auto w-full relative">
        {/* Decorative corner accents for the box */}
        <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-maroon" />
        <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-maroon" />
        <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-maroon" />
        <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-maroon" />

        <div className="grid gap-8 md:gap-6">
          <div className="flex flex-col items-center space-y-2">
            <Calendar className="w-6 h-6 text-maroon mb-1" />
            <p className="text-xl font-serif font-bold text-brown">
              {weddingDate}
            </p>
          </div>

          <div className="flex flex-col items-center space-y-2">
            <Clock className="w-6 h-6 text-maroon mb-1" />
            <p className="text-xl font-serif text-brown">6:00 PM - Muhurat</p>
          </div>

          <div className="flex flex-col items-center space-y-2">
            <MapPin className="w-6 h-6 text-maroon mb-1" />
            <p className="text-xl font-serif font-bold text-brown">
              {weddingLocation}
            </p>
            <p className="text-base font-serif text-brown/80">
              Udaipur, Rajasthan
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div  className="max-w-xl mx-auto">
        <p className="text-lg md:text-xl text-brown font-serif leading-relaxed">
          {invitationMessage}
        </p>
      </motion.div>
    </motion.div>;
}