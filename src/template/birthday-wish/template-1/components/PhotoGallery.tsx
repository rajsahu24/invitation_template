import React, { useMemo,} from 'react';
export function PhotoGallery({ visible }: {visible: boolean;}) {
  if (!visible) return null;
  const photos = useMemo(() => {
    const captions = [
    'Best memories 💫',
    'That amazing trip ✈️',
    'Friends forever 🥂',
    'Laughing always 😂',
    'Adventures await 🌟',
    'Golden moments 💛'];

    return Array.from({
      length: 6
    }).map((_, i) => ({
      id: i,
      url: `https://picsum.photos/300/300?random=${10 + i}`,
      caption: captions[i],
      rot: `${-3 + Math.random() * 6}deg`,
      delay: `${i * 0.15}s`
    }));
  }, []);
  return (
    <div className="w-full mt-16 mb-24">
      <div className="text-center mb-8 opacity-0 animate-[dropIn_1s_ease-out_forwards]">
        <h3 className="font-script text-4xl text-gold-400 drop-shadow-md">
          Memories Together 📸
        </h3>
        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mt-2 opacity-50" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8 px-2 sm:px-6">
        {photos.map((photo) =>
        <div
          key={photo.id}
          className="group relative bg-white p-2 sm:p-3 pb-8 sm:pb-10 rounded-sm shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:z-10"
          style={
          {
            '--rot': photo.rot,
            transform: `rotate(${photo.rot})`,
            animation: `polaroidReveal 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards ${photo.delay}`,
            opacity: 0
          } as React.CSSProperties
          }>
          
            {/* Photo */}
            <div className="aspect-square overflow-hidden bg-gray-200">
              <img
              src={photo.url}
              alt={photo.caption}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy" />
            
            </div>

            {/* Caption */}
            <div className="absolute bottom-2 sm:bottom-3 left-0 w-full text-center px-2">
              <p className="font-script text-lg sm:text-xl text-gray-800 leading-tight">
                {photo.caption}
              </p>
            </div>

            {/* Tape effect */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-4 bg-white/40 backdrop-blur-sm rotate-[-2deg] shadow-sm" />
          </div>
        )}
      </div>
    </div>);

}