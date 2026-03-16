import React, { useEffect, useState } from 'react';
import { Mail, MailOpen } from 'lucide-react';

import { usePreview } from '../../../../context/PreviewContext';

interface CardContentProps {
  showTitle: boolean;
  showName: boolean;
  showMessage: boolean;
  showPhotos: boolean;
}

// Helper to extract string value from data
const getFieldValue = (data: any, key: string): string => {
  if (!data || typeof data !== 'object') return '';
  if (typeof data[key] === 'string') return data[key];
  if (data[key]?.data && typeof data[key].data === 'string') return data[key].data;
  return '';
};

export function CardContent({
  showTitle,
  showName,
  showMessage,

}: CardContentProps): React.ReactElement {
  const { previewData } = usePreview();
  
  // Get hero section data (celebrant_name, tag_line)
  const heroSection = previewData?.hero_section;
  const heroData = heroSection?.data;
  const celebrantName = heroData?.celebrant || 'Alex';
  console.log("previewData....",previewData)
  const tagLine = heroData?.tag_line || 'Happy Birthday!';
  
  // Get image section data
  const imageSection = previewData?.image_section;
  const imageData = imageSection?.data;
  const imageUrl = imageData?.images[0].image_url || 'https://picsum.photos/300/300?random=1';

  // Get message section data (message, relation)
  const messageSection = previewData?.message_section;
  const messageData = messageSection?.data;
  const messageText = getFieldValue(messageData, 'message') || 'Wishing you a day filled with joy, laughter, and unforgettable moments. May this year bring you closer to your dreams. You deserve the world!';
  const relation = getFieldValue(messageData, 'relation') || 'Your Friend';
  console.log("previewData....",previewData)
  return (
    <div className="relative z-30 flex flex-col items-center justify-start pt-16 sm:pt-24 px-4 w-full max-w-3xl mx-auto h-full text-center space-y-8">
      {/* Title - uses tag_line from hero_section */}
      <div
        className={`transition-all duration-1000 ${showTitle ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
        
        <h1 className="font-script text-5xl sm:text-7xl text-gray tracking-tight">
          {tagLine}
        </h1>
      </div>

      {/* Name Spotlight - uses celebrant_name from hero_section */}
      <div className="h-20">{showName && <NameSpotlight name={celebrantName} />}</div>

      {/* Photo & Badge - uses image_url from image_section */}
      <div
        className={`transition-all duration-1000 delay-300 ${showName ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
        
        <div className="relative inline-block mt-4">
          <div className="absolute -inset-3 bg-gradient-to-r from-gold-400 via-coral to-magenta rounded-full blur-md opacity-70 animate-pulse-glow" />

          {/* Rotating dashed border */}
          <div className="absolute -inset-2 rounded-full border-2 border-dashed border-gold-400/50 animate-[spin_10s_linear_infinite]" />

          <img
            src={imageUrl}
            alt="Birthday Person"
            className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-white shadow-lg z-10" />
          
          {/* <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-navy-800 border border-gold-500/50 text-gold-400 px-5 py-1.5 rounded-full font-sans text-xs font-medium uppercase tracking-[0.2em] shadow-sm z-20 flex items-center space-x-2">
            <span>Cheers to</span>
            <AnimatedAgeCounter targetAge={25} startCounting={showName} />
            <span>!</span>
          </div> */}
        </div>
      </div>

      {/* Envelope & Message - uses message and relation from message_section */}
      <div className="w-full max-w-md mt-12 h-48 text-gray">
        {showMessage && <TypewriterMessage message={messageText} relation={relation} />}
      </div>

      {/* Photo Gallery */}
      {/* <div className="w-full mt-12">
        <PhotoGallery visible={showPhotos} />
      </div> */}
    </div>);

}

function NameSpotlight({ name }: {name: string;}) {
  return (
    <div className="flex justify-center space-x-1 relative">
      <div className="absolute inset-0 bg-indigo-500/5 blur-3xl rounded-full" />
      {name.split('').map((char, i) => {
        const colors = ['#FFD700', '#FF6B8A', '#98D8C8', '#FFD700', '#FF6B8A'];
        return (
          <span
            key={i}
            className="font-script text-6xl sm:text-8xl relative z-10"
            style={{
              color: colors[i % colors.length],
              display: 'inline-block',
              opacity: 0,
              animation: `dropIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards ${i * 0.1}s`
            }}>
            
              {char}
            </span>
        );
      })}
    </div>);
}

function TypewriterMessage({ message, relation }: { message: string; relation: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState('');
  const fullText = message;
  const [isDone, setIsDone] = useState(false);
  useEffect(() => {
    // Open envelope after a short delay
    const openTimer = setTimeout(() => setIsOpen(true), 500);
    // Start typing after envelope opens
    let typeTimer: any
    if (isOpen) {
      let i = 0;
      typeTimer = setInterval(() => {
        setText(fullText.substring(0, i + 1));
        i++;
        if (i === fullText.length) {
          clearInterval(typeTimer);
          setTimeout(() => setIsDone(true), 500);
        }
      }, 40); // Typing speed
    }
    return () => {
      clearTimeout(openTimer);
      if (typeTimer) clearInterval(typeTimer);
    };
  }, [isOpen]);
  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="text-gold-400 transition-transform duration-500 hover:scale-110 opacity-60">
        {isOpen ?
        <MailOpen size={24} strokeWidth={1.5} /> :

        <Mail size={24} strokeWidth={1.5} className="animate-bounce" />
        }
      </div>

      <div className="bg-navy-800/80 backdrop-blur-xl border border-navy-700 p-10 rounded-2xl shadow-sm w-full relative min-h-[160px]">
        <p className="font-sans text-gray leading-relaxed text-sm sm:text-base font-light italic">
          {text}
          {!isDone &&
          <span className="inline-block w-1 h-4 ml-1 bg-gold-400 animate-pulse" />
          }
        </p>

        <div
          className={`mt-8 text-right transition-opacity duration-1000 ${isDone ? 'opacity-100' : 'opacity-0'}`}>
          
          <p className="font-script text-2xl text-gold-400 text-center opacity-80">
            Warmly, {relation}
          </p>
        </div>
      </div>
    </div>);

}
