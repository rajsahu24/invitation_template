
import { motion } from 'framer-motion';
import { BotanicalLeaf } from './BotanicalLeaf';
import { usePreview } from '../../../../context/PreviewContext';

export function Hero() {
  const { previewData } = usePreview();
  const invitation = (previewData as any)?.invitation || previewData;
  const metadata = invitation?.metadata || {};
  
  const groomName = metadata.groom_name || invitation?.groom_name || 'Aarav';
  const brideName = metadata.bride_name || invitation?.bride_name || 'Meera';
  const weddingDate = metadata.wedding_date || invitation?.wedding_date || 'December 14, 2025';
  const location = metadata.location || invitation?.location || 'Udaipur, Rajasthan';
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Watercolor gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 20% 20%, rgba(232, 237, 229, 0.9) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 30%, rgba(212, 160, 160, 0.2) 0%, transparent 40%),
            radial-gradient(ellipse at 50% 80%, rgba(197, 209, 191, 0.6) 0%, transparent 50%),
            linear-gradient(180deg, #E8EDE5 0%, #FDF8F4 50%, #E8EDE5 100%)
          `
        }} />


      {/* Floating botanical decorations */}
      <motion.div
        className="absolute top-20 left-10 text-forest-light opacity-30"
        animate={{
          y: [0, -10, 0],
          rotate: [0, 5, 0]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut'
        }}>

        <BotanicalLeaf variant="branch" animate={false} className="w-24 h-32" />
      </motion.div>

      <motion.div
        className="absolute top-32 right-16 text-sage-dark opacity-40"
        animate={{
          y: [0, 8, 0],
          rotate: [0, -3, 0]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1
        }}>

        <BotanicalLeaf variant="single" animate={false} className="w-16 h-24" />
      </motion.div>

      <motion.div
        className="absolute bottom-32 left-20 text-forest-light opacity-25"
        animate={{
          y: [0, -6, 0],
          rotate: [0, -5, 0]
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2
        }}>

        <BotanicalLeaf
          variant="single"
          animate={false}
          className="w-20 h-28 rotate-45" />

      </motion.div>

      <motion.div
        className="absolute bottom-40 right-24 text-sage-dark opacity-35"
        animate={{
          y: [0, 10, 0],
          rotate: [0, 8, 0]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5
        }}>

        <BotanicalLeaf
          variant="branch"
          animate={false}
          className="w-20 h-28 -rotate-12" />

      </motion.div>

      {/* Main content */}
      <div className="relative z-10 text-center px-6">
        <motion.p
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 0.8
          }}
          className="text-forest-light font-medium tracking-[0.3em] uppercase text-sm mb-6">

          Together with their families
        </motion.p>

        <motion.div
          initial={{
            opacity: 0,
            y: 30
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 1,
            delay: 0.2
          }}
          className="mb-8">

          <h1 className="font-serif text-6xl md:text-8xl text-forest mb-4">
            {groomName}
          </h1>

          {/* Botanical divider */}
          <div className="flex items-center justify-center gap-4 my-4">
            <motion.div
              initial={{
                scaleX: 0
              }}
              animate={{
                scaleX: 1
              }}
              transition={{
                duration: 0.8,
                delay: 0.5
              }}
              className="h-px w-16 bg-gradient-to-r from-transparent to-rose" />

            <motion.div
              initial={{
                scale: 0,
                rotate: -180
              }}
              animate={{
                scale: 1,
                rotate: 0
              }}
              transition={{
                duration: 0.8,
                delay: 0.6,
                type: 'spring'
              }}>

              <svg
                viewBox="0 0 60 40"
                className="w-16 h-10 text-forest-light"
                fill="none">

                <path
                  d="M30 8C30 8 20 15 15 25C15 25 22 20 30 20C38 20 45 25 45 25C40 15 30 8 30 8Z"
                  fill="currentColor"
                  fillOpacity="0.4" />

                <path
                  d="M30 12V32M30 18C26 19 24 22 24 25M30 24C34 25 36 28 36 30"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round" />

                <circle
                  cx="15"
                  cy="20"
                  r="3"
                  fill="currentColor"
                  fillOpacity="0.3" />

                <circle
                  cx="45"
                  cy="20"
                  r="3"
                  fill="currentColor"
                  fillOpacity="0.3" />

              </svg>
            </motion.div>
            <motion.div
              initial={{
                scaleX: 0
              }}
              animate={{
                scaleX: 1
              }}
              transition={{
                duration: 0.8,
                delay: 0.5
              }}
              className="h-px w-16 bg-gradient-to-l from-transparent to-rose" />

          </div>

          <h1 className="font-serif text-6xl md:text-8xl text-forest">{brideName}</h1>
        </motion.div>

        <motion.p
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          transition={{
            duration: 0.8,
            delay: 0.8
          }}
          className="font-serif italic text-xl md:text-2xl text-forest-light mb-8">

          request the pleasure of your company
        </motion.p>

        <motion.div
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 0.8,
            delay: 1
          }}
          className="mb-10">

          <p className="text-lg md:text-xl text-forest font-medium tracking-wide">
            {weddingDate}
          </p>
          <p className="text-forest-light mt-1 flex items-center justify-center gap-2">
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">

              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />

              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />

            </svg>
            {location}
          </p>
        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.9
          }}
          animate={{
            opacity: 1,
            scale: 1
          }}
          transition={{
            duration: 0.6,
            delay: 1.2
          }}>

          {/* <a
            href="#rsvp"
            className="inline-block px-10 py-4 bg-rose text-white font-semibold rounded-full 
                       shadow-lg shadow-rose/30 hover:bg-rose-dark hover:shadow-xl 
                       hover:shadow-rose-dark/30 transition-all duration-300 
                       hover:-translate-y-0.5 active:translate-y-0">




            RSVP Now
          </a> */}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          transition={{
            delay: 2
          }}
          className="absolute -bottom-20 left-1/2 -translate-x-1/2">

          <motion.div
            animate={{
              y: [0, 8, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity
            }}
            className="flex flex-col items-center text-forest-light">

            <span className="text-xs tracking-widest uppercase mb-2">
              Scroll
            </span>
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">

              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3" />

            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>);

}