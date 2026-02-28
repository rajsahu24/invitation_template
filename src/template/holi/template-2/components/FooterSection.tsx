
import { motion } from 'framer-motion';
import { Instagram, Twitter, Facebook, Youtube } from 'lucide-react';
export function FooterSection() {
  const socials = [
  {
    icon: Instagram,
    color:
    'hover:shadow-[0_0_15px_#E1306C] hover:text-[#E1306C] hover:border-[#E1306C]'
  },
  {
    icon: Twitter,
    color:
    'hover:shadow-[0_0_15px_#1DA1F2] hover:text-[#1DA1F2] hover:border-[#1DA1F2]'
  },
  {
    icon: Facebook,
    color:
    'hover:shadow-[0_0_15px_#4267B2] hover:text-[#4267B2] hover:border-[#4267B2]'
  },
  {
    icon: Youtube,
    color:
    'hover:shadow-[0_0_15px_#FF0000] hover:text-[#FF0000] hover:border-[#FF0000]'
  }];

  return (
    <motion.footer
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
        duration: 1
      }}
      className="w-full max-w-4xl mx-auto mt-20">

      <div className="glass-panel p-8 text-center flex flex-col items-center">
        <div className="flex space-x-6 mb-8">
          {socials.map((social, index) =>
          <a
            key={index}
            href="#"
            className={`p-3 rounded-full bg-white/10 border border-white/20 text-white transition-all duration-300 ${social.color}`}
            aria-label="Social Media Link">

              <social.icon className="w-6 h-6" />
            </a>
          )}
        </div>

        <p className="text-white/80 font-medium mb-2">
          Made with{' '}
          <span className="text-holi-magenta animate-pulse inline-block">
            ❤️
          </span>{' '}
          for Holi 2026
        </p>
        <p className="text-white/50 text-sm">
          © {new Date().getFullYear()} Festival of Colors. All rights reserved.
        </p>
      </div>
    </motion.footer>);

}