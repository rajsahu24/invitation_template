import  { useMemo } from 'react';
export function GlowingOrbs({ visible }: {visible: boolean;}) {
  if (!visible) return null;
  const orbs = useMemo(() => {
    const colors = ['bg-gold-500', 'bg-magenta', 'bg-mint', 'bg-skyblue'];
    return Array.from({
      length: 8
    }).map((_, i) => ({
      id: i,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: `${80 + Math.random() * 120}px`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `-${Math.random() * 10}s`,
      duration: `${15 + Math.random() * 10}s`,
      opacity: 0.1 + Math.random() * 0.15
    }));
  }, []);
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {orbs.map((orb) =>
      <div
        key={orb.id}
        className={`absolute rounded-full blur-3xl ${orb.color}`}
        style={{
          width: orb.size,
          height: orb.size,
          left: orb.left,
          top: orb.top,
          opacity: orb.opacity,
          animation: `orbDrift ${orb.duration} ease-in-out infinite alternate ${orb.delay}`
        }} />

      )}
    </div>);

}