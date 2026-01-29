// import { useState, useEffect } from 'react';

// interface PreviewData {
//   invitation_title?: string;
//   invitation_message?: string;
//   invitation_tag_line?: string;
//   invitation_type?: string;
//   metadata?: Record<string, any>;
//   events?: any[];
// }

// const ALLOWED_ORIGINS = [
//   'http://localhost:3000',
//    'http://localhost:3000'
// ];

// export const useLivePreview = (initialData?: PreviewData) => {
  
//   const [previewData, setPreviewData] = useState<PreviewData>(initialData || {});
//   const [hasReceivedMessage, setHasReceivedMessage] = useState(false);

//   // Extract invitation ID from URL path (e.g., /template/wedding/1/invitationId)
//   const getInvitationIdFromUrl = (): string | null => {
//     const pathParts = window.location.pathname.split('/');
//     // Assuming URL structure: /template/{type}/{templateId}/{invitationId}
//     console.log(pathParts[4])
    
//     return pathParts[4] || null;
//   };
   
//   // Fetch invitation data from API
//   const fetchInvitationData = async (invitationId: string) => {
//     try {
//       const [invitationResponse, eventsResponse] = await Promise.all([
//         fetch(`http://localhost:5000/api/invitations/${invitationId}`),
//         fetch(`http://localhost:5000/api/invitations/event/${invitationId}`)
//       ]);
      
//       if (invitationResponse.ok) {
//         const data = await invitationResponse.json();
//         const eventsData = eventsResponse.ok ? await eventsResponse.json() : [];
//         console.log(eventsData)
//         setPreviewData({
//           invitation_title: data.invitation_title,
//           invitation_message: data.invitation_message,
//           invitation_tag_line: data.invitation_tag_line,
//           invitation_type: data.invitation_type,
//           metadata: data.metadata || {},
//           events: eventsData || []
//         });
//       }
//     } catch (error) {
//       console.error('Failed to fetch invitation data:', error);
//     }
//   };

//   useEffect(() => {
//     const handleMessage = (event: MessageEvent) => {
//       // Validate origin for security
//       if (!ALLOWED_ORIGINS.includes(event.origin)) {
//         console.warn('Message received from unauthorized origin:', event.origin);
//         return;
//       }

//       // Check if this is a preview update message
//       if (event.data?.type === 'INVITATION_PREVIEW_UPDATE') {
//         console.log('Preview update received:', event.data.payload);
//         setPreviewData(event.data.payload || {});
//         setHasReceivedMessage(true);
//       }
//     };

//     window.addEventListener('message', handleMessage);

//     // If no real-time data received, try to fetch from API
//     const invitationId = getInvitationIdFromUrl();
//     if (invitationId && !hasReceivedMessage) {
//       fetchInvitationData(invitationId);
//     }

//     return () => {
//       window.removeEventListener('message', handleMessage);
//     };
//   }, [hasReceivedMessage]);

//   return previewData;
// };