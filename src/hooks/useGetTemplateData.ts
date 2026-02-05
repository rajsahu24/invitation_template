import { useState, useEffect, useCallback, useMemo } from 'react';
import type { Invitation, PreviewData, RsvpInvitationResponse } from './getTemplateDataModel';
import { DEFAULT_INVITATION_DATA, getIdFromUrl } from '../assets/utils';


export const useGetTemplateData = () => {
    const [previewData, setPreviewData] = useState<PreviewData | RsvpInvitationResponse>(DEFAULT_INVITATION_DATA);
    const [invitationDetails, setInvitationDetails] = useState<Invitation>();
    const [isLoading, setIsLoading] = useState(true);
    const [hasFetchedInitial, setHasFetchedInitial] = useState(false);

    const fetchGuestInvitationData = useCallback(async (invitationId: string) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/invitations/rsvp/${invitationId}`);
            if (response.ok) {
                const data = await response.json();
                setPreviewData(data);
            } else {
                setPreviewData(DEFAULT_INVITATION_DATA);
            }
        } catch (error) {
            console.error('Failed to fetch RSVP invitation data:', error);
            setPreviewData(DEFAULT_INVITATION_DATA);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const fetchTemplateData = useCallback(async (template_id: string) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/templates/${template_id}`);
            if (response.ok) {
                const templateData = await response.json();
                setPreviewData({
                    invitation: {
                        ...DEFAULT_INVITATION_DATA.invitation,
                        invitation_type: templateData.template_type?.toLowerCase() || 'wedding',
                        template: templateData
                    },
                    events: DEFAULT_INVITATION_DATA.events,
                    images: [],
                    guest: {},
                    invitation_tag_line: DEFAULT_INVITATION_DATA.invitation_tag_line
                });
            } else {
                setPreviewData(DEFAULT_INVITATION_DATA);
            }
        } catch (error) {
            console.error('Failed to fetch template data:', error);
            setPreviewData(DEFAULT_INVITATION_DATA);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const fetchInvitationData = useCallback(async (invitationId: string) => {
        setIsLoading(true);
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

                setPreviewData({
                    invitation: invitationData,
                    events: eventsData || [],
                    images: imageData || [],
                    guest: {},
                    invitation_tag_line: invitationData.invitation_tag_line || ''
                });
            } else {
                setPreviewData(DEFAULT_INVITATION_DATA);
            }
        } catch (error) {
            console.error('Failed to fetch full invitation data:', error);
            setPreviewData(DEFAULT_INVITATION_DATA);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const fetchInvitationDetails = useCallback(async (public_id: string) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/invitations/public/${public_id}`);
            if (response.ok) {
                const data = await response.json();
                console.log('Public invitation details fetched:', data);
                setInvitationDetails(data);
                // After getting details, we need to fetch the full data using the real ID
                if (data.id) {
                    await fetchInvitationData(data.id);
                }
            } else {
                setPreviewData(DEFAULT_INVITATION_DATA);
            }
        } catch (error) {
            console.error('Failed to fetch invitation details by public_id:', error);
            setPreviewData(DEFAULT_INVITATION_DATA);
        } finally {
            setIsLoading(false);
        }
    }, [fetchInvitationData]);

    // Initial data load effect
    useEffect(() => {
        if (hasFetchedInitial) return;

        const { id, type } = getIdFromUrl();
        console.log('Hook initialized. URL context:', { id, type });

        if (type === 'template' && id) {
            fetchTemplateData(id);
        } else if (type === 'rsvp_token' && id) {
            fetchGuestInvitationData(id);
        } else if (type === 'public' && id) {
            fetchInvitationDetails(id);
        } else if (!id) {
            setPreviewData(DEFAULT_INVITATION_DATA);
            setIsLoading(false);
        }

        setHasFetchedInitial(true);
    }, [hasFetchedInitial, fetchTemplateData, fetchGuestInvitationData, fetchInvitationDetails]);

    // Message listener effect
    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (event.data?.type === 'INVITATION_PREVIEW_UPDATE') {
                const payload = event.data.payload;
                console.log('Preview update message received:', payload);

                if (!payload || Object.keys(payload).length === 0) {
                    console.log('Empty payload received, ignoring update');
                    return;
                }

                setPreviewData(prev => {
                    // If the payload is a full RSVP response or PreviewData
                    if (payload.invitation) {
                        return { ...prev, ...payload };
                    }

                    // If the payload is just partial invitation fields (from DetailsForm)
                    if (payload.invitation_title || payload.invitation_message || payload.invitation_tag_line) {
                        // Merge with current invitation data if it exists
                        const currentInvitation = 'invitation' in prev ? prev.invitation : {};
                        return {
                            ...prev,
                            invitation: {
                                ...currentInvitation,
                                ...payload
                            }
                        } as RsvpInvitationResponse;
                    }

                    return { ...prev, ...payload };
                });
            }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, []);

    const result = useMemo(() => ({
        previewData,
        isLoading,
        invitationDetails
    }), [previewData, isLoading, invitationDetails]);

    return result;
};
