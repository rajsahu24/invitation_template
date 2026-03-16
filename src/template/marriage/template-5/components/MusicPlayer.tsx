import { useEffect, useRef, useState } from 'react';

const MUSIC_URL = 'https://res.cloudinary.com/dwbed0m72/video/upload/v1773665522/wedding-background-music-yxy0nS2O_cmrvyy.mp3';

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);

  // Start music on first click anywhere on the page
  useEffect(() => {
    const handleFirstClick = () => {
      if (started) return;
      setStarted(true);
      audioRef.current?.play();
      setPlaying(true);
    };
    document.addEventListener('click', handleFirstClick, { once: true });
    return () => document.removeEventListener('click', handleFirstClick);
  }, [started]);

  const toggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play();
      setPlaying(true);
      setStarted(true);
    }
  };

  return (
    <>
      <audio ref={audioRef} src={MUSIC_URL} loop preload="auto" />

      {/* Floating speaker button */}
      <button
        onClick={toggle}
        className="fixed bottom-6 right-5 z-50 flex items-center justify-center rounded-full shadow-lg"
        style={{
          width: '42px',
          height: '42px',
          backgroundColor: 'rgba(255,255,255,0.9)',
          border: '1px solid #E8E0D5',
          cursor: 'pointer',
        }}
        aria-label={playing ? 'Mute music' : 'Play music'}
      >
        {playing ? (
          // Speaker with sound waves
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M11 5L6 9H2v6h4l5 4V5z" fill="#8B7355" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" stroke="#8B7355" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" stroke="#8B7355" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        ) : (
          // Speaker muted
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M11 5L6 9H2v6h4l5 4V5z" fill="#8B7355" />
            <line x1="23" y1="9" x2="17" y2="15" stroke="#8B7355" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="17" y1="9" x2="23" y2="15" stroke="#8B7355" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        )}
      </button>
    </>
  );
}
