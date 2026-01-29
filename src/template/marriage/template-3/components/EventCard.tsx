import React from 'react';
import { motion } from 'framer-motion';
import { CornerDecoration } from './ui/OrnateDecorations';
import { MapPin, Clock, Calendar } from 'lucide-react';
interface EventCardProps {
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image?: string;
  index: number;
}
export function EventCard({
  title,
  date,
  time,
  location,
  description,
  image,
  index
}: EventCardProps) {
  const isEven = index % 2 === 0;
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 50
      }}
      whileInView={{
        opacity: 1,
        y: 0
      }}
      viewport={{
        once: true,
        margin: '-100px'
      }}
      transition={{
        duration: 0.8,
        delay: index * 0.2
      }}
      className="relative w-full max-w-4xl mx-auto my-12">

      <div
        className={`flex flex-col md:flex-row ${isEven ? '' : 'md:flex-row-reverse'} bg-white shadow-xl rounded-lg overflow-hidden border border-[#D4AF37]/20`}>

        {/* Image Section */}
        <div className="w-full md:w-2/5 h-64 md:h-auto relative overflow-hidden group">
          {image ?
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" /> :


          <div className="w-full h-full bg-[#8B0000] flex items-center justify-center">
              <span className="text-[#D4AF37] opacity-20 text-6xl font-serif-display">
                {title.charAt(0)}
              </span>
            </div>
          }
          <div className="absolute inset-0 bg-[#8B0000]/10 group-hover:bg-transparent transition-colors duration-500"></div>
        </div>

        {/* Content Section */}
        <div className="w-full md:w-3/5 p-8 md:p-12 relative bg-[#FFFAF0]">
          {/* Decorative Corners */}
          <CornerDecoration className="top-2 left-2 w-8 h-8 opacity-60" />
          <CornerDecoration
            className="top-2 right-2 w-8 h-8 opacity-60"
            rotate={90} />

          <CornerDecoration
            className="bottom-2 right-2 w-8 h-8 opacity-60"
            rotate={180} />

          <CornerDecoration
            className="bottom-2 left-2 w-8 h-8 opacity-60"
            rotate={270} />


          <div className="text-center md:text-left relative z-10">
            <h3 className="text-3xl font-serif-display text-[#8B0000] mb-4">
              {title}
            </h3>

            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-center md:justify-start text-gray-700">
                <Calendar className="w-4 h-4 text-[#D4AF37] mr-2" />
                <span className="font-medium">{date}</span>
              </div>
              <div className="flex items-center justify-center md:justify-start text-gray-700">
                <Clock className="w-4 h-4 text-[#D4AF37] mr-2" />
                <span>{time}</span>
              </div>
              <div className="flex items-center justify-center md:justify-start text-gray-700">
                <MapPin className="w-4 h-4 text-[#D4AF37] mr-2" />
                <span>{location}</span>
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed font-light">
              {description}
            </p>

            <div className="mt-8 flex justify-center md:justify-start">
              <button className="px-6 py-2 border border-[#8B0000] text-[#8B0000] hover:bg-[#8B0000] hover:text-white transition-all duration-300 rounded-sm uppercase tracking-widest text-xs font-semibold">
                View Map
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>);

}