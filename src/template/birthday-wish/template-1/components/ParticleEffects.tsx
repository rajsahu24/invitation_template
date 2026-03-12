import React, { useMemo } from 'react';
export function Balloons({ visible }: {visible: boolean;}) {
  if (!visible) return null;
  const balloons = useMemo(() => {
    const colors = [
    'bg-coral',
    'bg-magenta',
    'bg-mint',
    'bg-skyblue',
    'bg-gold-500'];

    return Array.from({
      length: 15
    }).map((_, i) => ({
      id: i,
      color: colors[Math.floor(Math.random() * colors.length)],
      left: `${Math.random() * 90 + 5}%`,
      delay: `${Math.random() * 2}s`,
      duration: `${4 + Math.random() * 3}s`,
      scale: 0.8 + Math.random() * 0.4
    }));
  }, []);
  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {balloons.map((b) =>
      <div
        key={b.id}
        className="absolute bottom-[-100px]"
        style={{
          left: b.left,
          animation: `floatUp ${b.duration} ease-in forwards ${b.delay}`,
          transform: `scale(${b.scale})`
        }}>
        
          <div
          style={{
            animation: `sway 3s ease-in-out infinite alternate ${b.delay}`
          }}>
          
            <div
            className={`w-12 h-16 rounded-[50%] ${b.color} relative shadow-lg before:content-[''] before:absolute before:bottom-[-4px] before:left-1/2 before:-translate-x-1/2 before:w-0 before:h-0 before:border-l-[4px] before:border-l-transparent before:border-r-[4px] before:border-r-transparent before:border-b-[6px] before:border-b-current text-${b.color.replace('bg-', '')}`} />
          
            <div className="w-[1px] h-24 bg-white/30 mx-auto mt-1" />
          </div>
        </div>
      )}
    </div>);

}
export function Confetti({ visible }: {visible: boolean;}) {
  if (!visible) return null;
  const confetti = useMemo(() => {
    const colors = [
    '#FF6B6B',
    '#FF2D95',
    '#4ECDC4',
    '#45B7D1',
    '#FFD700',
    '#FFFFFF'];

    const shapes = ['50%', '0%']; // circle or rect
    return Array.from({
      length: 80
    }).map((_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const velocity = 50 + Math.random() * 150;
      const tx = Math.cos(angle) * velocity;
      const ty = Math.sin(angle) * velocity;
      return {
        id: i,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        tx: `${tx}vw`,
        ty: `${ty}vh`,
        rot: `${Math.random() * 720 - 360}deg`,
        delay: `${Math.random() * 0.2}s`,
        size: `${4 + Math.random() * 8}px`
      };
    });
  }, []);
  return (
    <div className="fixed inset-0 pointer-events-none z-20 flex items-center justify-center overflow-hidden">
      {confetti.map((c) =>
      <div
        key={c.id}
        className="absolute"
        style={
        {
          width: c.size,
          height: c.shape === '0%' ? `${parseFloat(c.size) * 2}px` : c.size,
          backgroundColor: c.color,
          borderRadius: c.shape,
          '--tx': c.tx,
          '--ty': c.ty,
          '--rot': c.rot,
          animation: `confettiBurst 2.5s cubic-bezier(0.25, 1, 0.5, 1) forwards ${c.delay}`
        } as React.CSSProperties
        } />

      )}
    </div>);

}
export function Sparkles({ visible }: {visible: boolean;}) {
  if (!visible) return null;
  const sparkles = useMemo(() => {
    return Array.from({
      length: 25
    }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 1.5}s`,
      size: `${10 + Math.random() * 20}px`,
      color: Math.random() > 0.5 ? '#FFD700' : '#FFFFFF'
    }));
  }, []);
  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {sparkles.map((s) =>
      <div
        key={s.id}
        className="absolute"
        style={{
          left: s.left,
          top: s.top,
          width: s.size,
          height: s.size,
          backgroundColor: s.color,
          clipPath:
          'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
          animation: `twinkle 1.5s ease-in-out forwards ${s.delay}`,
          opacity: 0
        }} />

      )}
    </div>);

}