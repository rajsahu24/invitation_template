interface MetadataConfig {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

export function updateMetadata(config: MetadataConfig) {
  // Update title
  if (config.title) {
    document.title = config.title;
    updateMetaTag('og:title', config.title);
    updateMetaTag('twitter:title', config.title);
  }

  // Update description
  if (config.description) {
    updateMetaTag('description', config.description, 'name');
    updateMetaTag('og:description', config.description);
    updateMetaTag('twitter:description', config.description);
  }

  // Update image
  if (config.image) {
    updateMetaTag('og:image', config.image);
    updateMetaTag('twitter:image', config.image);
  }

  // Update URL
  if (config.url) {
    updateMetaTag('og:url', config.url);
  }

  // Update type
  if (config.type) {
    updateMetaTag('og:type', config.type);
  }
}

function updateMetaTag(property: string, content: string, attribute: 'property' | 'name' = 'property') {
  let element = document.querySelector(`meta[${attribute}="${property}"]`) as HTMLMetaElement;
  
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, property);
    document.head.appendChild(element);
  }
  
  element.content = content;
}

export function generateOGImageUrl(params: { public_id?: string; slug?: string }): string {
  const baseUrl = window.location.origin;
  const queryParam = params.public_id 
    ? `public_id=${params.public_id}` 
    : `slug=${params.slug}`;
  return `${baseUrl}/api/og?${queryParam}`;
}
