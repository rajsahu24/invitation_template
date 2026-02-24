import { useState, useEffect, useCallback, useMemo } from 'react';
import type { InvitationData } from './getTemplateDataModel';
import { getIdFromUrl } from '../assets/utils';


export const useGetTemplateData = () => {
    const [previewData, setPreviewData] = useState<InvitationData | []>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasFetchedInitial, setHasFetchedInitial] = useState(false);

    const fetchGuestInvitationData = useCallback(async (rsvp_token: string) => {
        setIsLoading(true);
        console.log(rsvp_token)
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/invitation-data/rsvp/${rsvp_token}`);
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

    const fetchTemplateData = useCallback(async (template_id: string) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/templates/${template_id}`);
            if (response.ok) {
                const data = await response.json();
                setPreviewData(data);
                console.log('Template data fetched:', data);
            } else {
                setPreviewData([]);
            }
        } catch (error) {
            console.error('Failed to fetch template data:', error);
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
        } else if (type === 'template' && id) {
            fetchTemplateData(id);
        } else if (!id) {
            setPreviewData([]);
            setIsLoading(false);
        }

        setHasFetchedInitial(true);
    }, [hasFetchedInitial, fetchGuestInvitationData, fetchInvitationDetails, fetchInvitationData, fetchTemplateData]);

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
                    if (!prev) return payload;

                    // If it's a full data object
                    if (payload.invitation_id) {
                        return { ...prev, ...payload };
                    }

                    // If it's a section-specific update from DetailsForm
                    if (payload.section_type && payload.metadata) {
                        const sectionKey = payload.section_type;
                        const existingSection = (prev as any)[sectionKey] || {};

                        let newData;
                        if (Array.isArray(payload.metadata)) {
                            // If it's an array (repeated section), we take it as the new state for that section
                            newData = payload.metadata;
                        } else {
                            // If it's an object, we merge it
                            newData = {
                                ...(existingSection.data || {}),
                                ...payload.metadata
                            };
                        }

                        return {
                            ...prev,
                            [sectionKey]: {
                                ...existingSection,
                                data: newData
                            }
                        };
                    }

                    // For top-level invitation fields
                    const invitationFields = ['invitation_title', 'invitation_message', 'invitation_tag_line', 'invitation_type'];
                    let hasInvitationField = false;
                    const update: any = {};

                    invitationFields.forEach(field => {
                        if (payload[field] !== undefined) {
                            update[field] = payload[field];
                            hasInvitationField = true;
                        }
                    });

                    if (hasInvitationField || payload.metadata) {
                        return {
                            ...prev,
                            ...update,
                            // If metadata is present but no section_name, we merge it at top level or into existing metadata if it exists
                            metadata: payload.metadata ? { ...({}), ...payload.metadata } : ""
                        };
                    }

                    return { ...prev, ...payload };
                });
            } else if (event.data?.type === 'SCROLL_TO_SECTION') {
                const sectionId = event.data.sectionId;
                console.log('Scroll to section request received:', sectionId);
                if (sectionId) {
                    const element = document.getElementById(sectionId);
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        console.log('Scrolled to element:', sectionId);
                    } else {
                        console.warn('Scrolled element not found:', sectionId);
                    }
                }
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
