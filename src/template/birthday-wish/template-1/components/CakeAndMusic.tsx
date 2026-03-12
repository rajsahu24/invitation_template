import React, { useMemo } from 'react';
export function BirthdayCake({ visible }: {visible: boolean;}) {
  if (!visible) return null;
  return (
    <div className="absolute bottom-10 left-1/4 -translate-x-1/2 z-30 pointer-events-none">
      <div
        className="relative flex flex-col items-center"
        style={{
          animation:
          'springBounce 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards'
        }}>
        
        {/* Candle */}
        <div className="relative z-10 -mb-2">
          <div className="w-3 h-8 bg-white rounded-sm border-2 border-warmpink overflow-hidden">
            <div className="w-full h-2 bg-warmpink mt-2 transform -skew-y-12" />
          </div>
          {/* Flame */}
          <div
            className="absolute -top-6 left-1/2 -translate-x-1/2 w-4 h-6 bg-gold-400 rounded-full blur-[1px] animate-flicker"
            style={{
              borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%'
            }}>
            
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-2 h-3 bg-white rounded-full" />
          </div>
          {/* Glow */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-12 h-12 bg-gold-500/30 rounded-full blur-xl animate-pulse" />
        </div>

        {/* Top Tier */}
        <div className="w-24 h-12 bg-magenta rounded-t-xl border-b-4 border-navy-900/20 relative z-0 shadow-lg">
          <div className="absolute top-0 w-full h-4 bg-white/20 rounded-t-xl" />
          {/* Drip */}
          <div className="absolute top-0 w-full flex justify-around">
            {[...Array(5)].map((_, i) =>
            <div
              key={i}
              className="w-3 h-4 bg-white rounded-b-full"
              style={{
                height: `${12 + Math.random() * 8}px`
              }} />

            )}
          </div>
        </div>

        {/* Bottom Tier */}
        <div className="w-32 h-16 bg-mint rounded-t-md rounded-b-xl relative shadow-xl">
          <div className="absolute top-0 w-full h-4 bg-white/20 rounded-t-md" />
          {/* Sprinkles */}
          <div className="absolute inset-0 overflow-hidden rounded-b-xl">
            {[...Array(10)].map((_, i) =>
            <div
              key={i}
              className="absolute w-2 h-1 rounded-full"
              style={{
                backgroundColor: ['#FFD700', '#FF6B6B', '#FFFFFF'][
                Math.floor(Math.random() * 3)],

                top: `${20 + Math.random() * 60}%`,
                left: `${10 + Math.random() * 80}%`,
                transform: `rotate(${Math.random() * 180}deg)`
              }} />

            )}
          </div>
        </div>

        {/* Plate */}
        <div className="w-40 h-4 bg-gray-300 rounded-full mt-1 shadow-2xl border-b-2 border-gray-400" />
      </div>
    </div>);

}
export function MusicNotes({ visible }: {visible: boolean;}) {
  if (!visible) return null;
  const notes = useMemo(() => {
    const symbols = ['🎵', '🎶', '♩', '♪'];
    return Array.from({
      length: 10
    }).map((_, i) => ({
      id: i,
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
      left: `${40 + Math.random() * 20}%`,
      delay: `${Math.random() * 1.5}s`,
      duration: `${3 + Math.random() * 2}s`,
      size: `${1.2 + Math.random() * 1}rem`,
      rot: `${Math.random() * 40 - 20}deg`
    }));
  }, []);
  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
      {notes.map((n) =>
      <div
        key={n.id}
        className="absolute bottom-32 text-gold-400 drop-shadow-md"
        style={
        {
          left: n.left,
          fontSize: n.size,
          '--rot': n.rot,
          animation: `floatUp ${n.duration} ease-in forwards ${n.delay}`,
          opacity: 0
        } as React.CSSProperties
        }>
        
          <div
          style={{
            animation: `sway 2s ease-in-out infinite alternate ${n.delay}`
          }}>
          
            {n.symbol}
          </div>
        </div>
      )}
    </div>);

}