
import { motion } from 'framer-motion';
import { Calendar,  MapPin } from 'lucide-react';
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
export const PaisleyCorner = ({
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
  const heroSection = previewData?.hero_section;
  const data = heroSection?.data;
  const schema = heroSection?.schema;
  


  const getFieldValue = (key: string) => data?.[key] || '';
  
  let brideName = 'Meera';
  let groomName = 'Deepak';
  let weddingDate = '15 nav 2025';
  let weddingLocation = 'Jaipur';
  let message = 'Please join';

  if (schema?.fields) {
    const findField = (keywords: string[]) => 
      schema.fields.find((f: any) => keywords.some(k => f.key.toLowerCase().includes(k)));

    const brideField = findField(['bride']);
    const groomField = findField(['groom']);
    const dateField = findField(['date']);
    const locationField = findField(['location']);
    const messageField = findField(['message', 'description', 'tag']);

    brideName = brideField ? getFieldValue(brideField.key) : 'Meera';
    groomName = groomField ? getFieldValue(groomField.key) : 'Deepak';
    weddingDate = dateField ? getFieldValue(dateField.key) : '15 November 2025';
    weddingLocation = locationField ? getFieldValue(locationField.key) : 'Jaipur, Rajasthan';
    message = messageField ? getFieldValue(messageField.key) : 'Join us in celebrating our special day';
  } else {
    brideName = getFieldValue('bride_name') || 'Meera';
    groomName = getFieldValue('groom_name') || 'Deepak';
    weddingDate = getFieldValue('date') || getFieldValue('wedding_date') || '15 November 2025';
    weddingLocation = getFieldValue('location') || getFieldValue('wedding_location') || 'Jaipur, Rajasthan';
    message = getFieldValue('tag_line') || getFieldValue('message') || getFieldValue('description') || 'Join us in celebrating our special day';
  }
  
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
          {groomName}{groomName && brideName && ' & '}{brideName}
        </h1>

        <p className="text-xl md:text-2xl text-brown font-serif italic">
          Request the honor of your presence
        </p>
      </motion.div>

      <motion.div  className="py-10 border-y-2 border-gold border-double max-w-lg mx-auto w-full relative">
        <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-maroon" />
        <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-maroon" />
        <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-maroon" />
        <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-maroon" />

        <div className="grid gap-8 md:gap-6">
          {weddingDate && (
            <div className="flex flex-col items-center space-y-2">
              <Calendar className="w-6 h-6 text-maroon mb-1" />
              <p className="text-xl font-serif font-bold text-brown">{weddingDate}</p>
            </div>
          )}
          {weddingLocation && (
            <div className="flex flex-col items-center space-y-2">
              <MapPin className="w-6 h-6 text-maroon mb-1" />
              <p className="text-xl font-serif font-bold text-brown">{weddingLocation}</p>
            </div>
          )}
        </div>
      </motion.div>

      {message && (
        <motion.div  className="max-w-xl mx-auto">
          <p className="text-lg md:text-xl text-brown font-serif leading-relaxed">{message}</p>
        </motion.div>
      )}
    </motion.div>;
}