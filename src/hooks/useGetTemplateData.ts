import { useState, useEffect, useCallback, useMemo } from 'react';
import type { InvitationData } from './getTemplateDataModel';
import {  DEFAULT_INVITATION_DATA, getIdFromUrl } from '../assets/utils';


export const useGetTemplateData = () => {
    const [previewData, setPreviewData] = useState<InvitationData | []>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasFetchedInitial, setHasFetchedInitial] = useState(false);

    const fetchGuestInvitationData = useCallback(async (invitationId: string) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/invitation-data/rsvp/${invitationId}`);
            if (response.ok) {
                const data = await response.json();
                const transformed = data;
                setPreviewData(transformed);
                console.log("Transformed RSVP data:", transformed);
            } else {
                setPreviewData([]);
            }
        } catch (error) {
            console.error('Failed to fetch RSVP invitation data:', error);
            setPreviewData([]);
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
                // setPreviewData({
                //     invitation: {
                //         ...DEFAULT_INVITATION_DATA.invitation,
                //         invitation_type: templateData.template_type?.toLowerCase() || 'wedding',
                //         template: templateData
                //     },
                //     events: DEFAULT_INVITATION_DATA.events,
                //     // images: [],
                //     // guest: {},
                //     invitation_tag_line: DEFAULT_INVITATION_DATA.invitation_tag_line
                // });
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
        console.log(invitationId)
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/invitation-data/invitation/${invitationId}`);

            if (response.ok) {
                const data = await response.json();
                console.log(data)
                const transformed = data;
                setPreviewData(transformed);
                console.log("Transformed invitation data:", transformed);
            } else {
                setPreviewData([]);
            }
        } catch (error) {
            console.error('Failed to fetch full invitation data:', error);
            setPreviewData([]);
        } finally {
            setIsLoading(false);
        }
    }, []);
    const fetchInvitationDetails = useCallback(async (public_id: string) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/invitation-data/public_id/${public_id}`);
            if (response.ok) {
                const data = await response.json();
                console.log('Public invitation details fetched:', data);

                const transformed = data;
                setPreviewData(transformed);
                console.log("Transformed public data:", transformed);
            } else {
                setPreviewData([]);
            }
        } catch (error) {
            console.error('Failed to fetch invitation details by public_id:', error);
            setPreviewData([]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Initial data load effect
    useEffect(() => {
        if (hasFetchedInitial) return;

        const { id, type } = getIdFromUrl();
        console.log('Hook initialized. URL context:', { id, type });

        if (type === 'invitation' && id) {
            fetchInvitationData(id);
        } else if (type === 'rsvp_token' && id) {
            fetchGuestInvitationData(id);
        } else if (type === 'public' && id) {
            fetchInvitationDetails(id);
        } else if (!id) {
            setPreviewData([]);
            setIsLoading(false);
        }

        setHasFetchedInitial(true);
    }, [hasFetchedInitial, fetchGuestInvitationData, fetchInvitationDetails, fetchInvitationData]);

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
                        if(!prev) return
                        // const currentInvitation = 'invitation' in  prev ? prev.invitation : {};
                        return {
                            ...prev,
                        } as InvitationData;
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
        isLoading
    }), [previewData, isLoading]);

    return result;
};
