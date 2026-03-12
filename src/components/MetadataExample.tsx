import { useMetadata } from '../hooks/useMetadata';
import { usePreview } from '../context/PreviewContext';

/**
 * Example: How to use dynamic metadata in your template components
 * 
 * This component demonstrates how to set custom metadata for specific templates
 */
export function ExampleTemplateWithMetadata() {
  const { previewData } = usePreview();
  
  // Extract data from your template
  const heroSection = previewData?.hero_section;
  const brideName = heroSection?.data?.bride_name || 'Bride';
  const groomName = heroSection?.data?.groom_name || 'Groom';
  const weddingDate = heroSection?.data?.date || 'Coming Soon';
  
  // Set custom metadata for this template
  useMetadata({
    title: `${brideName} & ${groomName} - Wedding Invitation`,
    description: `Join us in celebrating the wedding of ${brideName} and ${groomName} on ${weddingDate}`,
    publicId: window.location.pathname.split('/').pop(),
    type: 'website'
  });
  
  return (
    <div>
      {/* Your template content */}
      <h1>{brideName} & {groomName}</h1>
      <p>Wedding Date: {weddingDate}</p>
    </div>
  );
}

/**
 * Example: Birthday Template with Metadata
 */
export function ExampleBirthdayWithMetadata() {
  const { previewData } = usePreview();
  
  const heroSection = previewData?.hero_section;
  const celebrantName = heroSection?.data?.celebrant_name || 'Someone Special';
  const age = heroSection?.data?.age || heroSection?.data?.date || '';
  
  useMetadata({
    title: `${celebrantName}'s ${age} Birthday Celebration`,
    description: `You're invited to celebrate ${celebrantName}'s special day!`,
    publicId: window.location.pathname.split('/').pop(),
    type: 'website'
  });
  
  return (
    <div>
      {/* Your template content */}
      <h1>{celebrantName}'s Birthday</h1>
    </div>
  );
}

/**
 * Example: Custom OG Image URL
 */
export function ExampleCustomOGImage() {
  useMetadata({
    title: 'Custom Event Invitation',
    description: 'Join us for an amazing celebration',
    image: 'https://your-custom-image-url.com/image.jpg', // Use custom image instead of generated one
    type: 'website'
  });
  
  return <div>Template with custom OG image</div>;
}
