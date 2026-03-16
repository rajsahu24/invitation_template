import { useState, useRef, useEffect } from 'react';

interface VideoIntroProps {
  onVideoEnd: () => void;
}

const VIDEO_URL = 'https://res.cloudinary.com/dwbed0m72/video/upload/v1773643818/intro-envelope-HFQPjaLP_ocpflr.mp4';

export function VideoIntro({ onVideoEnd }: VideoIntroProps) {
  const [hasStarted, setHasStarted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleClick = () => {
    if (!hasStarted && videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error('Play was prevented:', error);
      });
      setHasStarted(true);
    }
  };

  const handleVideoEnd = () => {
    onVideoEnd();
  };

  // Prevent scrolling while video is playing
  useEffect(() => {
    if (hasStarted) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [hasStarted]);

  return (
    <div className="video-intro-container" onClick={handleClick}>
      <video
        ref={videoRef}
        className="video-intro"
        src={VIDEO_URL}
        playsInline
        onEnded={handleVideoEnd}
      />
    </div>
  );
}
