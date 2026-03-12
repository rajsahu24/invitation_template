import { useMemo, useState } from 'react';
import {  Heart, Star } from 'lucide-react';
export function GiftBox({ visible }: {visible: boolean;}) {
  const [isHovered, setIsHovered] = useState(false);
  if (!visible) return null;
  return (
    <div className="fixed bottom-6 right-6 z-40 cursor-pointer group">
      <div
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          animation:
          'dropIn 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards'
        }}>
        
        <div className="animate-pulse-glow rounded-full absolute inset-0 bg-gold-500/20 blur-xl" />

        <div
          className="relative"
          style={{
            animation: isHovered ? 'none' : 'shake 3s ease-in-out infinite'
          }}>
          
          {/* Lid */}
          <div
            className="absolute -top-2 left-1/2 -translate-x-1/2 w-14 h-4 bg-coral rounded-sm z-10 transition-transform duration-300 border-b border-black/20"
            style={{
              transform: isHovered ?
              'translate(-50%, -20px) rotate(-10deg)' :
              'translate(-50%, 0)'
            }}>
            
            <div className="absolute left-1/2 -translate-x-1/2 -top-3 w-6 h-4 border-2 border-gold-400 rounded-full" />
          </div>

          {/* Box */}
          <div className="w-12 h-12 bg-magenta rounded-sm relative border-t border-white/20 shadow-xl overflow-hidden mt-2 mx-auto">
            <div className="absolute left-1/2 -translate-x-1/2 w-2 h-full bg-gold-400" />
          </div>

          {/* Surprise pop out */}
          {isHovered &&
          <div
            className="absolute -top-8 left-1/2 -translate-x-1/2 text-gold-400"
            style={{
              animation: 'popOut 1s ease-out forwards'
            }}>
            
              <Star className="w-6 h-6 fill-current" />
            </div>
          }
        </div>
      </div>
    </div>);

}
export function FloatingHearts({ visible }: {visible: boolean;}) {
  if (!visible) return null;
  const hearts = useMemo(() => {
    const colors = ['text-warmpink', 'text-coral', 'text-gold-400'];
    const types = ['heart', 'heart', 'star']; // More hearts than stars
    return Array.from({
      length: 20
    }).map((_, i) => ({
      id: i,
      type: types[Math.floor(Math.random() * types.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${6 + Math.random() * 6}s`,
      size: 16 + Math.random() * 24,
      pulse: Math.random() > 0.5
    }));
  }, []);
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {hearts.map((h) =>
      <div
        key={h.id}
        className={`absolute bottom-[-50px] ${h.color} opacity-40`}
        style={{
          left: h.left,
          animation: `floatUp ${h.duration} linear infinite ${h.delay}`
        }}>
        
          <div
          style={{
            animation: `sway ${3 + Math.random() * 2}s ease-in-out infinite alternate`
          }}>
          
            <div
            style={{
              animation: h.pulse ?
              `pulseSize 2s ease-in-out infinite alternate ${h.delay}` :
              'none'
            }}>
            
              {h.type === 'heart' ?
            <Heart size={h.size} className="fill-current" /> :

            <Star size={h.size} className="fill-current" />
            }
            </div>
          </div>
        </div>
      )}
    </div>);

}
export function RainbowArc({ visible }: {visible: boolean;}) {
  if (!visible) return null;
  return (
    <div className="fixed top-0 left-0 w-full h-64 pointer-events-none z-0 overflow-hidden opacity-30">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1000 200"
        preserveAspectRatio="none">
        
        <defs>
          <linearGradient id="rainbow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF6B6B" />
            <stop offset="25%" stopColor="#FFD700" />
            <stop offset="50%" stopColor="#4ECDC4" />
            <stop offset="75%" stopColor="#45B7D1" />
            <stop offset="100%" stopColor="#FF2D95" />
          </linearGradient>
        </defs>
        <path
          d="M -100,250 Q 500,-100 1100,250"
          fill="none"
          stroke="url(#rainbow)"
          strokeWidth="40"
          strokeLinecap="round"
          style={{
            strokeDasharray: '1200',
            strokeDashoffset: '1200',
            animation: 'drawRainbow 2s ease-out forwards'
          }} />
        
      </svg>
    </div>);

}