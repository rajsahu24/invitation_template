import { useEffect, useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { ClosedCard } from './ClosedCard';
import { Balloons, Confetti, Sparkles } from './ParticleEffects';
import { BirthdayCake, MusicNotes } from './CakeAndMusic';
import { GiftBox, FloatingHearts, RainbowArc } from './AmbientEffects';
import { CardContent } from './CardContent';
import { Fireworks } from './Fireworks';
import { ShootingStars } from './ShootingStars';
import { GlowingOrbs } from './GlowingOrbs';
export function BirthdayCard() {
  const [isOpen, setIsOpen] = useState(false);
  // Animation stages
  const [showBalloons, setShowBalloons] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);
  const [showCake, setShowCake] = useState(false);
  const [showMusic, setShowMusic] = useState(false);
  const [showName, setShowName] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showShootingStars, setShowShootingStars] = useState(false);
  const [showGift, setShowGift] = useState(false);
  const [showOrbs, setShowOrbs] = useState(false);
  const [showHearts, setShowHearts] = useState(false);
  const [showRainbow, setShowRainbow] = useState(false);
  const [showPhotos, setShowPhotos] = useState(false);
  const [showReplay, setShowReplay] = useState(false);
  useEffect(() => {
    if (!isOpen) return;
    // Master Sequence Timing
    const timers = [
    setTimeout(() => setShowBalloons(true), 0),
    setTimeout(() => setShowConfetti(true), 300),
    setTimeout(() => setShowSparkles(true), 500),
    setTimeout(() => setShowCake(true), 700),
    setTimeout(() => setShowMusic(true), 900),
    setTimeout(() => setShowName(true), 1200),
    setTimeout(() => setShowFireworks(true), 1400),
    setTimeout(() => setShowMessage(true), 1600),
    setTimeout(() => setShowShootingStars(true), 1800),
    setTimeout(() => setShowGift(true), 2000),
    setTimeout(() => setShowOrbs(true), 2000),
    setTimeout(() => setShowHearts(true), 2200),
    setTimeout(() => setShowRainbow(true), 2400),
    setTimeout(() => setShowPhotos(true), 3000),
    setTimeout(() => setShowReplay(true), 4500) // Extended slightly for photos
    ];
    return () => timers.forEach(clearTimeout);
  }, [isOpen]);
  const handleReplay = () => {
    setIsOpen(false);
    setShowBalloons(false);
    setShowConfetti(false);
    setShowSparkles(false);
    setShowCake(false);
    setShowMusic(false);
    setShowName(false);
    setShowFireworks(false);
    setShowMessage(false);
    setShowShootingStars(false);
    setShowGift(false);
    setShowOrbs(false);
    setShowHearts(false);
    setShowRainbow(false);
    setShowPhotos(false);
    setShowReplay(false);
  };
  return (
    <main
      className={`min-h-screen w-full relative overflow-hidden transition-colors  bg-blue-100 duration-1000 ${isOpen ? 'bg-birthday-party' : 'bg-navy-950'}`}>
      
      {/* Centered Closed Card */}
      <div className="absolute inset-0 flex items-center justify-center">
        <ClosedCard isOpen={isOpen} onClick={() => setIsOpen(true)} />
      </div>

      {/* Open State Content */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
        
        {/* Ambient Background Effects (z-0 to z-5) */}
        <GlowingOrbs visible={showOrbs} />
        <RainbowArc visible={showRainbow} />
        <ShootingStars visible={showShootingStars} />
        <FloatingHearts visible={showHearts} />

        {/* Main Content (Title, Photo, Message, Gallery) */}
        <div className="pointer-events-auto h-full overflow-y-auto pb-32 relative z-10">
          <CardContent
            showTitle={isOpen}
            showName={showName}
            showMessage={showMessage}
            showPhotos={showPhotos} />
          
        </div>

        {/* Foreground Interactive/Animated Elements */}
        <BirthdayCake visible={showCake} />
        <MusicNotes visible={showMusic} />
        <GiftBox visible={showGift} />

        {/* Particle Overlays (z-10+) */}
        <Sparkles visible={showSparkles} />
        <Confetti visible={showConfetti} />
        <Balloons visible={showBalloons} />
        <Fireworks visible={showFireworks} />

        {/* Replay Button */}
        <button
          onClick={handleReplay}
          className={`fixed top-6 right-6 z-50 pointer-events-auto flex items-center space-x-2 bg-navy-800/80 hover:bg-navy-700 text-gold-400 px-4 py-2 rounded-full border border-gold-500/30 backdrop-blur-md transition-all duration-500 ${showReplay ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
          
          <RotateCcw size={16} />
          <span className="font-sans text-sm font-medium">Replay</span>
        </button>
      </div>
    </main>);

}