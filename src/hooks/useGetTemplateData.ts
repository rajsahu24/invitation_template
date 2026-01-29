import { useState, useEffect } from 'react';
import type { PreviewData, RsvpInvitationResponse } from './getTemplateDataModel';




export const useGetTemplateData = () => {
    const [previewData, setPreviewData] = useState<PreviewData | RsvpInvitationResponse>();
    const [hasReceivedMessage, setHasReceivedMessage] = useState(false);

    const getInvitationIdFromUrl = (): string | null => {
        const pathParts = window.location.pathname.split('/');
        return pathParts[4] || null;
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
            console.log("Helloadfskjlkfj", `${import.meta.env.VITE_API_URL}/api/invitations/${invitationId}`)

            if (invitationResponse.ok) {
                const invitationData = invitationResponse.ok ? await invitationResponse.json() : [];
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
                    guest: {} // No guest data for regular invitation flow
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
                setPreviewData(event.data.payload || {});
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
        }

        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, [hasReceivedMessage]);

    return previewData;
};