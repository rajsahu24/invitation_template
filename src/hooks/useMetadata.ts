import { useEffect } from 'react';
import { updateMetadata, generateOGImageUrl } from '../utils/metadata';

interface UseMetadataOptions {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  publicId?: string;
  slug?: string;
}

export function useMetadata(options: UseMetadataOptions) {
  useEffect(() => {
    const {
      title,
      description,
      image,
      url = window.location.href,
      type = 'website',
      publicId,
      slug
    } = options;

    // Generate OG image if publicId or slug is provided
    const ogImage = image || (publicId || slug ? generateOGImageUrl({ public_id: publicId, slug }) : undefined);

    updateMetadata({
      title,
      description,
      image: ogImage,
      url,
      type
    });
  }, [options.title, options.description, options.image, options.url, options.type, options.publicId, options.slug]);
}
