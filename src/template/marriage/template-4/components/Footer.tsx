
import { motion } from 'framer-motion';
import { BotanicalLeaf } from './BotanicalLeaf';
import { InstagramIcon, HeartIcon, MailIcon, PhoneIcon } from 'lucide-react';
import { usePreview } from '../../../../context/PreviewContext';

export function Footer() {
  const { previewData } = usePreview();
  const invitation = (previewData as any)?.invitation || previewData;
  const metadata = invitation?.metadata || {};
  
  const groomName = metadata.groom_name || invitation?.groom_name || 'Aarav';
  const brideName = metadata.bride_name || invitation?.bride_name || 'Meera';
  const weddingDate = metadata.wedding_date || invitation?.wedding_date || 'December 14, 2025';
  const location = metadata.location || invitation?.location || 'Udaipur';
  const hashtag = metadata.hashtag || `#${groomName}Weds${brideName}`.replace(/\s/g, '');
  
  return (
    <footer className="bg-sage py-16 px-6 relative overflow-hidden">
      {/* Background botanical illustration */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
        <svg
          viewBox="0 0 400 300"
          className="w-full max-w-2xl text-forest"
          fill="none">

          <path d="M200 280V50" stroke="currentColor" strokeWidth="3" />
          {/* Left branches */}
          <path
            d="M200 80C200 80 150 60 120 30"
            stroke="currentColor"
            strokeWidth="2" />

          <path
            d="M120 30C120 30 140 50 160 60C180 70 200 80 200 80"
            fill="currentColor"
            fillOpacity="0.3" />


          <path
            d="M200 130C200 130 140 110 100 70"
            stroke="currentColor"
            strokeWidth="2" />

          <path
            d="M100 70C100 70 130 100 160 115C190 130 200 130 200 130"
            fill="currentColor"
            fillOpacity="0.3" />


          <path
            d="M200 180C200 180 130 160 80 110"
            stroke="currentColor"
            strokeWidth="2" />

          <path
            d="M80 110C80 110 120 150 160 170C200 190 200 180 200 180"
            fill="currentColor"
            fillOpacity="0.3" />


          <path
            d="M200 230C200 230 120 210 60 150"
            stroke="currentColor"
            strokeWidth="2" />

          <path
            d="M60 150C60 150 110 200 160 220C210 240 200 230 200 230"
            fill="currentColor"
            fillOpacity="0.3" />


          {/* Right branches */}
          <path
            d="M200 80C200 80 250 60 280 30"
            stroke="currentColor"
            strokeWidth="2" />

          <path
            d="M280 30C280 30 260 50 240 60C220 70 200 80 200 80"
            fill="currentColor"
            fillOpacity="0.3" />


          <path
            d="M200 130C200 130 260 110 300 70"
            stroke="currentColor"
            strokeWidth="2" />

          <path
            d="M300 70C300 70 270 100 240 115C210 130 200 130 200 130"
            fill="currentColor"
            fillOpacity="0.3" />


          <path
            d="M200 180C200 180 270 160 320 110"
            stroke="currentColor"
            strokeWidth="2" />

          <path
            d="M320 110C320 110 280 150 240 170C200 190 200 180 200 180"
            fill="currentColor"
            fillOpacity="0.3" />


          <path
            d="M200 230C200 230 280 210 340 150"
            stroke="currentColor"
            strokeWidth="2" />

          <path
            d="M340 150C340 150 290 200 240 220C190 240 200 230 200 230"
            fill="currentColor"
            fillOpacity="0.3" />

        </svg>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <motion.div
            initial={{
              opacity: 0,
              y: 20
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            viewport={{
              once: true
            }}
            transition={{
              duration: 0.8
            }}>

            <h2 className="font-serif text-4xl md:text-5xl text-forest mb-4">
              {groomName} & {brideName}
            </h2>
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-12 bg-rose" />
              <BotanicalLeaf
                variant="small"
                animate={false}
                className="w-6 h-6 text-forest-light" />

              <div className="h-px w-12 bg-rose" />
            </div>
            <p className="font-serif italic text-xl text-forest-light">
              {weddingDate} · {location}
            </p>
          </motion.div>
        </div>

        {/* Contact Info */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          viewport={{
            once: true
          }}
          transition={{
            duration: 0.8,
            delay: 0.2
          }}
          className="flex flex-wrap justify-center gap-8 mb-12">

          <a
            href="mailto:aaravmeera2025@gmail.com"
            className="flex items-center gap-2 text-forest hover:text-rose transition-colors">

            <MailIcon className="w-5 h-5" />
            <span>aaravmeera2025@gmail.com</span>
          </a>
          <a
            href="tel:+919876543210"
            className="flex items-center gap-2 text-forest hover:text-rose transition-colors">

            <PhoneIcon className="w-5 h-5" />
            <span>+91 98765 43210</span>
          </a>
        </motion.div>

        {/* Social Icons */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          viewport={{
            once: true
          }}
          transition={{
            duration: 0.8,
            delay: 0.3
          }}
          className="flex justify-center gap-6 mb-12">

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-forest/10 hover:bg-forest hover:text-cream rounded-full 
                       flex items-center justify-center text-forest transition-all duration-300"

            aria-label="Instagram">

            <InstagramIcon className="w-5 h-5" />
          </a>
          <a
            href="#"
            className="w-12 h-12 bg-forest/10 hover:bg-forest hover:text-cream rounded-full 
                       flex items-center justify-center text-forest transition-all duration-300"

            aria-label="Wedding Hashtag">

            <span className="font-bold text-sm">#</span>
          </a>
        </motion.div>

        {/* Hashtag */}
        <motion.div
          initial={{
            opacity: 0
          }}
          whileInView={{
            opacity: 1
          }}
          viewport={{
            once: true
          }}
          transition={{
            duration: 0.8,
            delay: 0.4
          }}
          className="text-center mb-8">

          <p className="text-forest-light mb-2">Share your moments with us</p>
          <p className="font-serif text-2xl text-forest">{hashtag}</p>
        </motion.div>

        {/* Divider */}
        <div className="border-t border-forest/20 pt-8">
          <motion.p
            initial={{
              opacity: 0
            }}
            whileInView={{
              opacity: 1
            }}
            viewport={{
              once: true
            }}
            transition={{
              duration: 0.8,
              delay: 0.5
            }}
            className="text-center text-forest-light text-sm flex items-center justify-center gap-2">

            Made with
            <HeartIcon className="w-4 h-4 text-rose fill-rose" />
            for our special day
          </motion.p>
        </div>
      </div>
    </footer>);

}