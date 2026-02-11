import { useState, useEffect, useCallback, useMemo } from 'react';
import type { PreviewData, RsvpInvitationResponse, TemplateSection } from './getTemplateDataModel';
import { DEFAULT_INVITATION_DATA, getIdFromUrl } from '../assets/utils';


export const useGetTemplateData = () => {
    const [previewData, setPreviewData] = useState<PreviewData | RsvpInvitationResponse>(DEFAULT_INVITATION_DATA);
    const [isLoading, setIsLoading] = useState(true);
    const [hasFetchedInitial, setHasFetchedInitial] = useState(false);

    const transformApiResponse = useCallback((sections: TemplateSection[]): RsvpInvitationResponse => {
        const result: RsvpInvitationResponse = JSON.parse(JSON.stringify(DEFAULT_INVITATION_DATA));

        if (!sections || !Array.isArray(sections) || sections.length === 0) return result;

        // Use template info from the first section
        const firstSection = sections[0];
        result.invitation.template = {
            ...result.invitation.template,
            template_name: firstSection.template_name,
            template_type: firstSection.template_type,
        };
        result.invitation.invitation_type = firstSection.template_type.toLowerCase();

        sections.forEach(section => {
            switch (section.section_name) {
                case 'hero_section':
                    if (section.data) {
                        result.invitation.metadata = {
                            ...result.invitation.metadata,
                            ...section.data
                        };
                        result.invitation.invitation_tag_line = section.data.tag_line || result.invitation.invitation_tag_line;
                        result.invitation_tag_line = section.data.tag_line || result.invitation_tag_line;

                        // Also update names specifically if they are in hero_section
                        if (section.data.bride_name) result.invitation.metadata.bride_name = section.data.bride_name;
                        if (section.data.groom_name) result.invitation.metadata.groom_name = section.data.groom_name;
                        if (section.data.date) result.invitation.metadata.wedding_date = section.data.date;
                        if (section.data.location) result.invitation.metadata.wedding_location = section.data.location;
                    }
                    break;
                case 'event_section':
                    if (Array.isArray(section.data)) {
                        result.events = section.data.map((evt: any, idx: number) => ({
                            id: `e${idx}`,
                            name: evt.event_name,
                            booking_id: null,
                            event_type: null,
                            invitation_id: firstSection.invitation_data_id,
                            venue_id: null,
                            start_time: evt.date_time,
                            end_time: null,
                            description: evt.tag_line,
                            metadata: { questionnaire: [] },
                            created_at: new Date().toISOString(),
                            updated_at: new Date().toISOString(),
                            event_location: evt.location
                        }));
                    }
                    break;
                case 'image_section':
                    if (section.data && Array.isArray(section.data.images)) {
                        result.images = section.data.images.map((img: any, idx: number) => ({
                            id: img.public_id || `i${idx}`,
                            invitation_id: firstSection.invitation_data_id,
                            image_url: img.image_url,
                            public_id: img.public_id,
                            type: img.type || 'general',
                            position: idx,
                            created_at: new Date().toISOString(),
                            updated_at: new Date().toISOString(),
                        }));
                    }
                    break;
                case 'family_info_section':
                    if (Array.isArray(section.data)) {
                        result.family_info = section.data;
                    }
                    break;
            }
        });

        return result;
    }, []);

    const fetchGuestInvitationData = useCallback(async (invitationId: string) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/invitation-data/rsvp/${invitationId}`);
            if (response.ok) {
                const data = await response.json();
                const transformed = transformApiResponse(data);
                setPreviewData(transformed);
                console.log("Transformed RSVP data:", transformed);
            } else {
                setPreviewData(DEFAULT_INVITATION_DATA);
            }
        } catch (error) {
            console.error('Failed to fetch RSVP invitation data:', error);
            setPreviewData(DEFAULT_INVITATION_DATA);
        } finally {
            setIsLoading(false);
        }
    }, [transformApiResponse]);

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
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/invitation-data/${invitationId}`);

            if (response.ok) {
                const data = await response.json();
                const transformed = transformApiResponse(data);
                setPreviewData(transformed);
                console.log("Transformed invitation data:", transformed);
            } else {
                setPreviewData(DEFAULT_INVITATION_DATA);
            }
        } catch (error) {
            console.error('Failed to fetch full invitation data:', error);
            setPreviewData(DEFAULT_INVITATION_DATA);
        } finally {
            setIsLoading(false);
        }
    }, [transformApiResponse]);

    const fetchInvitationDetails = useCallback(async (public_id: string) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/invitation-data/public_id/${public_id}`);
            if (response.ok) {
                const data = await response.json();
                console.log('Public invitation details fetched:', data);
                const transformed = transformApiResponse(data);
                setPreviewData(transformed);
                console.log("Transformed public data:", transformed);
            } else {
                setPreviewData(DEFAULT_INVITATION_DATA);
            }
        } catch (error) {
            console.error('Failed to fetch invitation details by public_id:', error);
            setPreviewData(DEFAULT_INVITATION_DATA);
        } finally {
            setIsLoading(false);
        }
    }, [transformApiResponse]);

    // Initial data load effect
    useEffect(() => {
        if (hasFetchedInitial) return;

        const { id, type } = getIdFromUrl();
        console.log('Hook initialized. URL context:', { id, type });

        if (type === 'invitation' && id) {
            fetchInvitationData(id);
        } else if (type === 'template' && id) {
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
    }, [hasFetchedInitial, fetchTemplateData, fetchGuestInvitationData, fetchInvitationDetails, fetchInvitationData]);

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
        isLoading
    }), [previewData, isLoading]);

    return result;
};
