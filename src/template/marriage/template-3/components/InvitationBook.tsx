import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Hand } from 'lucide-react';
import { Hero } from './Hero';
import { StorySection } from './StorySection';
import { EventsSection } from './EventsSection';
import { GallerySection } from './GallerySection';
import { RSVPSection } from './RSVPSection';
// Custom Cover Components
const FrontCover = ({ onOpen }: {onOpen: () => void;}) =>
<div
  className="h-full w-full bg-[#8B0000] flex flex-col items-center justify-center text-[#FFD700] p-8 border-[12px] border-double border-[#FFD700]/30 relative overflow-hidden cursor-pointer"
  onClick={onOpen}>

    {/* Decorative Corners */}
    <div className="absolute top-4 left-4 w-16 h-16 border-t-2 border-l-2 border-[#FFD700] rounded-tl-3xl opacity-60" />
    <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-[#FFD700] rounded-tr-3xl opacity-60" />
    <div className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-[#FFD700] rounded-bl-3xl opacity-60" />
    <div className="absolute bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 border-[#FFD700] rounded-br-3xl opacity-60" />

    {/* Mandala Background */}
    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')]" />

    <div className="text-center z-10 space-y-6">
      <p className="font-serif italic tracking-widest text-sm uppercase">
        The Wedding Of
      </p>
      <h1 className="font-serif-display text-5xl md:text-7xl mb-4 drop-shadow-lg">
        Aarav <br /> <span className="text-3xl">&</span> <br /> Priya
      </h1>
      <div className="w-24 h-1 bg-[#FFD700] mx-auto rounded-full my-6" />
      <p className="font-serif text-lg tracking-wide">October 12th, 2024</p>

      <motion.div
      animate={{
        y: [0, 5, 0]
      }}
      transition={{
        repeat: Infinity,
        duration: 2
      }}
      className="mt-12 text-xs uppercase tracking-[0.2em] border border-[#FFD700] px-6 py-2 rounded-full hover:bg-[#FFD700] hover:text-[#8B0000] transition-colors">

        Tap to Open
      </motion.div>
    </div>
  </div>;

const BackCover = () =>
<div className="h-full w-full bg-[#8B0000] flex flex-col items-center justify-center text-[#FFD700] p-8 border-[12px] border-double border-[#FFD700]/30 relative">
    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')]" />
    <div className="text-center z-10">
      <h2 className="font-serif-display text-4xl mb-6">Thank You</h2>
      <p className="font-serif italic max-w-xs mx-auto leading-relaxed opacity-90">
        "We can't wait to celebrate our special day with you."
      </p>
      <div className="mt-12 opacity-60 text-xs uppercase tracking-widest">
        #AaravWedsPriya
      </div>
    </div>
  </div>;

// Wrapper to fit existing sections into book pages
const PageWrapper = ({
  children,
  title



}: {children: React.ReactNode;title?: string;}) =>
<div className="h-full w-full overflow-y-auto custom-scrollbar bg-[#FFFAF0] p-4 md:p-8 relative">
    {title &&
  <div className="text-center mb-6 pb-4 border-b border-[#8B0000]/10">
        <h3 className="font-serif-display text-2xl text-[#8B0000]">{title}</h3>
      </div>
  }
    <div className="prose-sm md:prose max-w-none">{children}</div>

    {/* Page Number/Decoration */}
    <div className="absolute bottom-4 left-0 right-0 text-center">
      <span className="text-[#8B0000]/20 text-xs">❧</span>
    </div>
  </div>;

export function InvitationBook() {
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(0); // Track swipe direction
  const totalPages = 6;
  const nextPage = () => {
    if (page < totalPages) {
      setDirection(1);
      setPage((p) => p + 1);
    }
  };
  const prevPage = () => {
    if (page > 0) {
      setDirection(-1);
      setPage((p) => p - 1);
    }
  };
  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextPage();
      if (e.key === 'ArrowLeft') prevPage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [page]);
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#1a0505] via-[#2a0a0a] to-[#1a0505] flex items-center justify-center p-4 md:p-8 overflow-hidden relative">
      {/* Ambient Background */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-20" />
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/20 to-black/40 pointer-events-none" />

      {/* Navigation Controls */}
      <div className="absolute bottom-6 md:bottom-8 left-0 right-0 flex justify-center items-center gap-6 z-50">
        <button
          onClick={prevPage}
          disabled={page === 0}
          className="p-3 md:p-4 rounded-full bg-[#8B0000] disabled:opacity-20 disabled:cursor-not-allowed hover:bg-[#a00000] hover:scale-110 active:scale-95 transition-all shadow-xl border-2 border-[#FFD700]/40 text-[#FFD700]"
          aria-label="Previous page">

          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        {/* Page Indicators */}
        <div className="flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-sm rounded-full border border-[#FFD700]/20">
          {[...Array(totalPages + 1)].map((_, i) =>
          <button
            key={i}
            onClick={() => {
              setDirection(i > page ? 1 : -1);
              setPage(i);
            }}
            className={`transition-all ${i === page ? 'w-8 h-2 bg-[#FFD700]' : 'w-2 h-2 bg-[#FFD700]/30 hover:bg-[#FFD700]/60'} rounded-full`}
            aria-label={`Go to page ${i}`} />

          )}
        </div>

        <button
          onClick={nextPage}
          disabled={page === totalPages}
          className="p-3 md:p-4 rounded-full bg-[#8B0000] disabled:opacity-20 disabled:cursor-not-allowed hover:bg-[#a00000] hover:scale-110 active:scale-95 transition-all shadow-xl border-2 border-[#FFD700]/40 text-[#FFD700]"
          aria-label="Next page">

          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      </div>

      {/* Single Page Card Container */}
      <div
        className="relative w-full max-w-2xl aspect-[3/4] md:aspect-[2/3]"
        style={{
          perspective: '2000px'
        }}>

        <AnimatePresence mode="wait" custom={direction}>
          {/* Front Cover */}
          {page === 0 &&
          <motion.div
            key="cover"
            custom={direction}
            initial={{
              rotateY: direction > 0 ? 90 : -90,
              opacity: 0,
              scale: 0.8
            }}
            animate={{
              rotateY: 0,
              opacity: 1,
              scale: 1
            }}
            exit={{
              rotateY: direction > 0 ? -90 : 90,
              opacity: 0,
              scale: 0.8
            }}
            transition={{
              duration: 0.7,
              type: 'spring',
              stiffness: 80,
              damping: 20
            }}
            className="absolute inset-0 shadow-2xl rounded-lg overflow-hidden cursor-pointer"
            style={{
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden'
            }}
            onClick={nextPage}>

              <FrontCover onOpen={nextPage} />
            </motion.div>
          }

          {/* Inner Pages */}
          {page > 0 && page < totalPages &&
          <motion.div
            key={`page-${page}`}
            custom={direction}
            initial={{
              rotateY: direction > 0 ? 90 : -90,
              opacity: 0,
              scale: 0.8
            }}
            animate={{
              rotateY: 0,
              opacity: 1,
              scale: 1
            }}
            exit={{
              rotateY: direction > 0 ? -90 : 90,
              opacity: 0,
              scale: 0.8
            }}
            transition={{
              duration: 0.7,
              type: 'spring',
              stiffness: 80,
              damping: 20
            }}
            className="absolute inset-0 bg-[#FFFAF0] shadow-2xl rounded-lg overflow-hidden"
            style={{
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden'
            }}>

              {/* Paper Texture */}
              <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] mix-blend-multiply" />

              {/* Content */}
              <div className="h-full w-full overflow-y-auto custom-scrollbar">
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
                  delay: 0.3,
                  duration: 0.5
                }}
                className="h-full">

                  {page === 1 &&
                <PageWrapper>
                      <Hero />
                    </PageWrapper>
                }
                  {page === 2 &&
                <PageWrapper title="Our Story">
                      <StorySection />
                    </PageWrapper>
                }
                  {page === 3 &&
                <PageWrapper title="Events Timeline">
                      <EventsSection />
                    </PageWrapper>
                }
                  {page === 4 &&
                <PageWrapper title="Gallery & Moments">
                      <GallerySection />
                    </PageWrapper>
                }
                  {page === 5 &&
                <PageWrapper title="RSVP">
                      <RSVPSection />
                    </PageWrapper>
                }
                </motion.div>
              </div>

              {/* Page Edge Shadow */}
              <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black/10 to-transparent pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-black/10 to-transparent pointer-events-none" />
            </motion.div>
          }

          {/* Back Cover */}
          {page === totalPages &&
          <motion.div
            key="back-cover"
            custom={direction}
            initial={{
              rotateY: direction > 0 ? 90 : -90,
              opacity: 0,
              scale: 0.8
            }}
            animate={{
              rotateY: 0,
              opacity: 1,
              scale: 1
            }}
            exit={{
              rotateY: direction > 0 ? -90 : 90,
              opacity: 0,
              scale: 0.8
            }}
            transition={{
              duration: 0.7,
              type: 'spring',
              stiffness: 80,
              damping: 20
            }}
            className="absolute inset-0 shadow-2xl rounded-lg overflow-hidden"
            style={{
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden'
            }}>

              <BackCover />
            </motion.div>
          }
        </AnimatePresence>

        {/* Depth Shadow (behind the card) */}
        <div className="absolute inset-0 bg-black/60 blur-2xl transform translate-y-8 scale-95 -z-10 rounded-lg" />
      </div>

      {/* Interaction Hints */}
      {page === 0 &&
      <motion.div
        initial={{
          opacity: 0,
          y: 10
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          delay: 1,
          duration: 0.8
        }}
        className="absolute bottom-32 md:bottom-36 text-[#FFFAF0]/50 text-xs md:text-sm flex items-center gap-2 font-serif tracking-wider">

          <Hand className="w-4 h-4 animate-pulse" />
          <span>Tap to open invitation</span>
        </motion.div>
      }

      {page > 0 && page < totalPages &&
      <motion.div
        initial={{
          opacity: 0
        }}
        animate={{
          opacity: 1
        }}
        className="absolute top-6 md:top-8 right-6 md:right-8 text-[#FFFAF0]/40 text-xs font-serif tracking-widest">

          Use ← → arrows to navigate
        </motion.div>
      }
    </div>);

}