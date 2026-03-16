import { useEffect, useRef } from 'react'
import { usePreview } from '../../../../context/PreviewContext';

function BottomImages() {
    const DUMMY_IMAGES = [
  { image_url: 'https://res.cloudinary.com/dwbed0m72/image/upload/v1773663142/gallery-1-CndRyTXZ_iyzodz.jpg' },
  { image_url: 'https://res.cloudinary.com/dwbed0m72/image/upload/v1773663141/gallery-2-LJ9SqFT7_v8racm.jpg' },
  { image_url: 'https://res.cloudinary.com/dwbed0m72/image/upload/v1773663140/gallery-3-BqTMMcNY_l93gdk.jpg' },
  { image_url: 'https://res.cloudinary.com/dwbed0m72/image/upload/v1773663138/gallery-4-D3agzgGx_fzarh8.jpg' },
  { image_url: 'https://res.cloudinary.com/dwbed0m72/image/upload/v1773663138/gallery-5-Ca9X0lht_edxs5b.jpg' },
  { image_url: 'https://res.cloudinary.com/dwbed0m72/image/upload/v1773663135/gallery-7-CHFbVCJd_uyxjo1.jpg' },
  { image_url: 'https://res.cloudinary.com/dwbed0m72/image/upload/v1773663135/gallery-7-CHFbVCJd_uyxjo1.jpg' },
  { image_url: 'https://res.cloudinary.com/dwbed0m72/image/upload/v1773663134/gallery-9-C_h0QLUe_pa99vf.jpg' },
  { image_url: 'https://res.cloudinary.com/dwbed0m72/image/upload/v1773663134/gallery-8-LSBB5t-f_lcu6bd.jpg' },
  { image_url: 'https://res.cloudinary.com/dwbed0m72/image/upload/v1773663133/gallery-10-BbneIAac_hhikpp.jpg' },
  
];
  const { previewData } = usePreview();
  const imageSection = previewData?.image_section;
  const data = imageSection?.data;
  const images = data?.images;

  const displayImages = Array.isArray(images) && images.length > 0 ? images : DUMMY_IMAGES;

  // Duplicate for seamless loop
  const loopImages = [...displayImages, ...displayImages, ...displayImages];

  const trackRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number>(0);
  const posRef = useRef(0);
  const isPausedRef = useRef(false);

  useEffect(() => {
    const speed = 0.5; // px per frame

    const animate = () => {
      if (!isPausedRef.current && trackRef.current) {
        posRef.current += speed;
        const singleSetWidth = trackRef.current.scrollWidth / 3;
        if (posRef.current >= singleSetWidth) {
          posRef.current = 0;
        }
        trackRef.current.style.transform = `translateX(-${posRef.current}px)`;
      }
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, []);

  return (
    <section style={{ backgroundColor: '#F5F0E8' }} className="py-16 overflow-hidden">

      {/* Welcome text */}


      {/* Continuous slider */}
      <div
        className="relative w-full overflow-hidden"
        onMouseEnter={() => { isPausedRef.current = true; }}
        onMouseLeave={() => { isPausedRef.current = false; }}
      >
        <div
          ref={trackRef}
          className="flex gap-3 will-change-transform"
          style={{ width: 'max-content' }}
        >
          {loopImages.map((photo: any, index: number) => {
            // Alternate heights: center card taller
            
            return (
              <div
                key={index}
                className="flex-shrink-0 overflow-hidden rounded-sm"
                style={{
                //   width: isTall ? '200px' : '130px',
                //   height: isTall ? '280px' : '220px',
                  alignSelf: 'center',
                }}
              >
                <img
                  src={photo.image_url}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-80 object-cover"
                  draggable={false}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default BottomImages