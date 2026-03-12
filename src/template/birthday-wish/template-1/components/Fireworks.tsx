import React, { useMemo } from 'react';
export function Fireworks({ visible }: {visible: boolean;}) {
  if (!visible) return null;
  const bursts = useMemo(() => {
    return Array.from({
      length: 5
    }).map((_, i) => {
      const x = 20 + Math.random() * 60; // 20% to 80% width
      const y = 10 + Math.random() * 40; // 10% to 50% height (upper half)
      const colors = ['#FFD700', '#FF6B6B', '#FF2D95', '#4ECDC4', '#45B7D1'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      const sparks = Array.from({
        length: 16
      }).map((_, j) => {
        const angle = j * 360 / 16;
        const distance = 50 + Math.random() * 100;
        return {
          id: j,
          sx: `${Math.cos(angle * Math.PI / 180) * distance}px`,
          sy: `${Math.sin(angle * Math.PI / 180) * distance}px`
        };
      });
      return {
        id: i,
        x: `${x}%`,
        y: `${y}vh`,
        color,
        delay: `${i * 0.5 + Math.random() * 0.3}s`,
        sparks
      };
    });
  }, []);
  return (
    <div className="fixed inset-0 pointer-events-none z-15 overflow-hidden">
      {bursts.map((burst) =>
      <div key={burst.id} className="absolute inset-0">
          {/* Trail */}
          <div
          className="absolute bottom-0 w-1 h-20 rounded-t-full"
          style={
          {
            left: burst.x,
            backgroundColor: burst.color,
            '--by': `-${100 - parseFloat(burst.y)}vh`,
            animation: `fireworkTrail 1s ease-out forwards ${burst.delay}`,
            opacity: 0
          } as React.CSSProperties
          } />
        

          {/* Burst Center */}
          <div
          className="absolute"
          style={{
            left: burst.x,
            top: burst.y
          }}>
          
            {/* Sparks */}
            {burst.sparks.map((spark) =>
          <div
            key={spark.id}
            className="absolute w-2 h-2 rounded-full"
            style={
            {
              backgroundColor: burst.color,
              boxShadow: `0 0 6px ${burst.color}`,
              '--sx': spark.sx,
              '--sy': spark.sy,
              animation: `fireworkBurst 1.2s cubic-bezier(0.25, 1, 0.5, 1) forwards calc(${burst.delay} + 0.9s)`,
              opacity: 0
            } as React.CSSProperties
            } />

          )}
          </div>
        </div>
      )}
    </div>);

}