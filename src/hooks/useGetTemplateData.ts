import { useState, useEffect } from 'react';
import type { PreviewData, RsvpInvitationResponse } from './getTemplateDataModel';





export const DEFAULT_INVITATION_DATA: RsvpInvitationResponse = {
    invitation: {
        id: 'default',
        user_id: 'default',
        invitation_type: 'wedding',
        invitation_title: 'Alexander & Victoria',
        invitation_message: 'We invite you to celebrate our special day as we embark on a new journey together.',
        invitation_tag_line: 'Celebrate Love, Laughter, and Happily Ever After',
        metadata: {
            bride_name: 'Victoria',
            groom_name: 'Alexander',
            wedding_date: '2024-12-12',
            wedding_location: 'Grand Palace, London'
        },
        quick_action: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        invitation_template_id: '1'
    },
    events: [
        {
            id: 'e1',
            booking_id: null,
            name: 'Wedding Ceremony',
            event_type: 'ceremony',
            invitation_id: 'default',
            venue_id: null,
            start_time: '2024-12-12T10:00:00Z',
            end_time: '2024-12-12T12:00:00Z',
            description: 'The formal exchange of vows.',
            metadata: { questionnaire: [] },
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            event_location: 'St. Mary\'s Cathedral'
        },
        {
            id: 'e2',
            booking_id: null,
            name: 'Reception',
            event_type: 'reception',
            invitation_id: 'default',
            venue_id: null,
            start_time: '2024-12-12T18:00:00Z',
            end_time: '2024-12-13T00:00:00Z',
            description: 'Dinner, drinks, and dancing.',
            metadata: { questionnaire: [] },
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            event_location: 'Grand Ballroom'
        }
    ],
    images: [],
    guest: {},
    invitation_tag_line: 'Join us for our special day'
};

export const useGetTemplateData = () => {
    const [previewData, setPreviewData] = useState<PreviewData | RsvpInvitationResponse>();
    const [hasReceivedMessage, setHasReceivedMessage] = useState(false);

    const getInvitationIdFromUrl = (): string | null => {
        const pathParts = window.location.pathname.split('/');
        return pathParts[3] || null;
    };


    const isRSVPToken = (param: string): boolean => {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        return param.length === 10 && !uuidRegex.test(param);
    };

    const fetchGuestInvitationData = async (invitationId: string) => {
        console.log(invitationId)
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/invitations/rsvp/${invitationId}`);
            if (response.ok) {
                const data = await response.json();
                setPreviewData(data);

            }
        } catch (error) {
            console.error('Failed to fetch RSVP invitation data:', error);
        }
    };

    const fetchInvitationData = async (invitationId: string) => {
        try {
            const [invitationResponse, eventsResponse, imageResponse] = await Promise.all([
                fetch(`${import.meta.env.VITE_API_URL}/api/invitations/${invitationId}`),
                fetch(`${import.meta.env.VITE_API_URL}/api/invitations/event/${invitationId}`),
                fetch(`${import.meta.env.VITE_API_URL}/api/invitations/image/${invitationId}`)
            ]);

            if (invitationResponse.ok) {
                const invitationData = await invitationResponse.json();
                const eventsData = eventsResponse.ok ? await eventsResponse.json() : [];
                const imageData = imageResponse.ok ? await imageResponse.json() : [];

                // Format data to match RSVP response structure
                setPreviewData({
                    invitation: {
                        id: invitationData.id,
                        user_id: invitationData.user_id,
                        invitation_type: invitationData.invitation_type,
                        invitation_title: invitationData.invitation_title,
                        invitation_message: invitationData.invitation_message,
                        invitation_tag_line: invitationData.invitation_tag_line,
                        metadata: invitationData.metadata || {},
                        quick_action: invitationData.quick_action,
                        created_at: invitationData.created_at,
                        updated_at: invitationData.updated_at,
                        invitation_template_id: invitationData.invitation_template_id
                    },
                    events: eventsData || [],
                    images: imageData || [],
                    guest: {},
                    invitation_tag_line: invitationData.invitation_tag_line || ''
                });
            }
        } catch (error) {
            console.error('Failed to fetch invitation data:', error);
        }
    };

    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (event.data?.type === 'INVITATION_PREVIEW_UPDATE') {
                console.log('Preview update received:', event.data.payload);
                const payload = event.data.payload;

                // If payload is flat (direct invitation object), wrap it to match expected structure
                if (payload && !payload.invitation && payload.invitation_title) {
                    setPreviewData({
                        invitation: payload,
                        events: payload.events || [],
                        images: payload.images || [],
                        guest: {},
                        invitation_tag_line: payload.invitation_tag_line || ''
                    });
                } else {
                    setPreviewData(payload || {});
                }
                setHasReceivedMessage(true);
            }
        };

        window.addEventListener('message', handleMessage);

        const invitationId = getInvitationIdFromUrl();

        if (invitationId && !hasReceivedMessage) {
            if (isRSVPToken(invitationId)) {
                fetchGuestInvitationData(invitationId);
            } else {
                fetchInvitationData(invitationId);
            }
        } else if (!invitationId && !hasReceivedMessage) {
            // Set default data if no invitation ID is present
            setPreviewData(DEFAULT_INVITATION_DATA);
        }

        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, [hasReceivedMessage]);

    return previewData;
};
