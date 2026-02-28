import  { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MessageCircleIcon, MailIcon, CopyIcon } from 'lucide-react';
export function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: '-50px'
  });
  const handleShare = (type: 'whatsapp' | 'email' | 'copy') => {
    const message =
    "🎨 You're invited to Holi 2026! Join us for colors, music, and unlimited masti at Sharma Villa on March 14th! 🌈";
    const url = window.location.href;
    switch (type) {
      case 'whatsapp':
        window.open(
          `https://wa.me/?text=${encodeURIComponent(message + '\n\n' + url)}`,
          '_blank'
        );
        break;
      case 'email':
        window.location.href = `mailto:?subject=You're Invited to Holi 2026!&body=${encodeURIComponent(message + '\n\n' + url)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        alert('Link copied! 📋 Ab share karo!');
        break;
    }
  };
  const shareButtons = [
  {
    type: 'whatsapp' as const,
    icon: MessageCircleIcon,
    label: 'WhatsApp',
    color: 'text-green-500',
    rotation: -5
  },
  {
    type: 'email' as const,
    icon: MailIcon,
    label: 'Email',
    color: 'text-marigold',
    rotation: 3
  },
  {
    type: 'copy' as const,
    icon: CopyIcon,
    label: 'Copy Link',
    color: 'text-magenta',
    rotation: -3
  }];

  return (
    <footer ref={ref} className="py-16 md:py-24 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Ornate Top Border */}
        <motion.div
          className="ornate-divider mb-12"
          initial={{
            scaleX: 0
          }}
          animate={
          isInView ?
          {
            scaleX: 1
          } :
          {}
          }
          transition={{
            duration: 0.6
          }}>

          <span className="text-gold text-3xl">❖</span>
        </motion.div>

        {/* Main Message */}
        <motion.div
          className="text-center mb-12"
          initial={{
            y: 30,
            opacity: 0
          }}
          animate={
          isInView ?
          {
            y: 0,
            opacity: 1
          } :
          {}
          }
          transition={{
            duration: 0.5,
            delay: 0.2
          }}>

          <h2 className="font-heading font-bold text-4xl md:text-6xl text-gold mb-4">
            Bura Na Mano, Holi Hai! 🌈
          </h2>
          <p className="font-body text-cream/80 text-lg md:text-xl">
            Share the joy, spread the colors!
          </p>
        </motion.div>

        {/* Share Buttons */}
        <div className="flex justify-center gap-6 md:gap-10 mb-12">
          {shareButtons.map((btn, index) =>
          <motion.button
            key={btn.type}
            onClick={() => handleShare(btn.type)}
            className={`vintage-stamp ${btn.color} bg-dark/50 hover:bg-dark/80 transition-colors`}
            style={{
              transform: `rotate(${btn.rotation}deg)`
            }}
            initial={{
              scale: 0,
              rotate: btn.rotation - 180
            }}
            animate={
            isInView ?
            {
              scale: 1,
              rotate: btn.rotation
            } :
            {}
            }
            transition={{
              delay: 0.3 + index * 0.1,
              type: 'spring'
            }}
            whileHover={{
              scale: 1.1,
              rotate: 0
            }}
            whileTap={{
              scale: 0.95
            }}
            aria-label={`Share via ${btn.label}`}>

              <div className="flex flex-col items-center gap-2 py-2">
                <btn.icon className="w-6 h-6 md:w-8 md:h-8" />
                <span className="font-body text-xs md:text-sm font-semibold">
                  {btn.label}
                </span>
              </div>
            </motion.button>
          )}
        </div>

        {/* Decorative Elements */}
        <motion.div
          className="flex justify-center gap-4 mb-8"
          initial={{
            opacity: 0
          }}
          animate={
          isInView ?
          {
            opacity: 1
          } :
          {}
          }
          transition={{
            delay: 0.6
          }}>

          <span className="text-magenta text-2xl">🎨</span>
          <span className="text-marigold text-2xl">💜</span>
          <span className="text-royal-purple text-2xl">🎉</span>
          <span className="text-gold text-2xl">✨</span>
          <span className="text-deep-red text-2xl">🌸</span>
        </motion.div>

        {/* Credits */}
        <motion.div
          className="text-center"
          initial={{
            opacity: 0
          }}
          animate={
          isInView ?
          {
            opacity: 1
          } :
          {}
          }
          transition={{
            delay: 0.7
          }}>

          <p className="font-body text-cream/60 text-sm mb-2">
            Made with 💜 and Gulaal
          </p>
          <p className="font-body text-cream/40 text-xs">
            © 2026 Sharma & Kapoor Parivaar | Holi Milan
          </p>
        </motion.div>

        {/* Bottom Ornate Border */}
        <motion.div
          className="ornate-divider mt-12"
          initial={{
            scaleX: 0
          }}
          animate={
          isInView ?
          {
            scaleX: 1
          } :
          {}
          }
          transition={{
            duration: 0.6,
            delay: 0.8
          }}>

          <span className="text-gold text-3xl">❖</span>
        </motion.div>
      </div>
    </footer>);

}