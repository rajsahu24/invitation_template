import  { useMemo } from 'react';
export function ShootingStars({ visible }: {visible: boolean;}) {
  if (!visible) return null;
  const stars = useMemo(() => {
    return Array.from({
      length: 6
    }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 50}%`,
      right: `${-10 + Math.random() * 40}%`,
      delay: `${Math.random() * 15}s`,
      duration: `${3 + Math.random() * 2}s`
    }));
  }, []);
  return (
    <div className="fixed inset-0 pointer-events-none z-5 overflow-hidden">
      {stars.map((star) =>
      <div
        key={star.id}
        className="absolute h-[2px] bg-gradient-to-r from-transparent via-white to-white rounded-full shadow-[0_0_10px_#fff]"
        style={{
          top: star.top,
          right: star.right,
          animation: `shootingStar ${star.duration} linear infinite ${star.delay}`
        }} />

      )}
    </div>);

}