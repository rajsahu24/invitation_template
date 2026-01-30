import  { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Volume2, VolumeX } from 'lucide-react';

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Placeholder royalty-free birthday music URL
  const audioUrl = "https://cdn.pixabay.com/audio/2026/01/19/audio_909d3ca1fa.mp3";

  useEffect(() => {
    // Initialize audio object
    audioRef.current = new Audio(audioUrl);
    audioRef.current.loop = true;

    // Cleanup on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(error => {
        console.error("Audio playback failed:", error);
      });
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.button
        onClick={toggleMusic}
        className={`
          relative flex items-center justify-center w-14 h-14 rounded-full shadow-xl
          border-4 border-[#FFF8F0] 
          ${isPlaying ? 'bg-[#FFB3D9]' : 'bg-[#D4A574]'}
          transition-colors duration-300
        `}
        whileHover={{
          scale: 1.1
        }}
        whileTap={{
          scale: 0.95
        }}>

        {/* Spinning Record Effect */}
        <motion.div
          className="absolute inset-1 rounded-full border-2 border-dashed border-white/50"
          animate={{
            rotate: isPlaying ? 360 : 0
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'linear'
          }} />


        <AnimatePresence mode="wait">
          {isPlaying ?
          <motion.div
            key="playing"
            initial={{
              scale: 0
            }}
            animate={{
              scale: 1
            }}
            exit={{
              scale: 0
            }}>

              <Volume2 className="w-6 h-6 text-white" />
            </motion.div> :

          <motion.div
            key="muted"
            initial={{
              scale: 0
            }}
            animate={{
              scale: 1
            }}
            exit={{
              scale: 0
            }}>

              <VolumeX className="w-6 h-6 text-white" />
            </motion.div>
          }
        </AnimatePresence>

        {/* Floating Music Notes when playing */}
        {isPlaying &&
        <div className="absolute -top-10 -left-4 pointer-events-none">
            <MusicNote delay={0} x={0} />
            <MusicNote delay={0.5} x={20} />
            <MusicNote delay={1} x={-20} />
          </div>
        }
      </motion.button>
    </div>);

}
function MusicNote({ delay, x }: {delay: number;x: number;}) {
  return (
    <motion.div
      className="absolute text-[#FFB3D9]"
      initial={{
        y: 20,
        opacity: 0,
        x
      }}
      animate={{
        y: -40,
        opacity: [0, 1, 0],
        x: x + Math.sin(x) * 10
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        delay,
        ease: 'easeOut'
      }}>

      <Music className="w-4 h-4" />
    </motion.div>);

}