
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Navigation } from 'lucide-react';
export function EventDetails() {
  const details = [
  {
    icon: Calendar,
    label: 'Date',
    value: 'Saturday, March 14, 2026'
  },
  {
    icon: Clock,
    label: 'Time',
    value: '11:00 AM – 6:00 PM'
  },
  {
    icon: MapPin,
    label: 'Venue',
    value: 'The Garden Estate'
  },
  {
    icon: Navigation,
    label: 'Address',
    value: '42 Blossom Lane, Jaipur, Rajasthan'
  }];

  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 40
      }}
      whileInView={{
        opacity: 1,
        y: 0
      }}
      viewport={{
        once: true,
        amount: 0.2
      }}
      transition={{
        duration: 0.7,
        ease: 'easeOut'
      }}
      className="w-full max-w-4xl mx-auto">

      <div className="glass-panel-dark p-8 sm:p-12">
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-10 text-center">
          When & Where
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {details.map((detail, index) =>
          <div
            key={index}
            className="flex items-start space-x-4 p-4 rounded-2xl hover:bg-white/5 transition-colors duration-300">

              <div className="p-3 bg-white/10 rounded-xl shrink-0">
                <detail.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-white/60 text-sm font-medium uppercase tracking-wider mb-1">
                  {detail.label}
                </p>
                <p className="text-white text-lg font-medium">{detail.value}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.section>);

}