import { useState, useEffect } from 'react';
import type { Invitation, PreviewData, RsvpInvitationResponse } from './getTemplateDataModel';





export const DEFAULT_INVITATION_DATA: RsvpInvitationResponse = {
    invitation: {
        id: 'default',
        user_id: 'default',
        invitation_type: 'wedding',
        invitation_title: 'Alexander & Victoria',
        invitation_message: 'We invite you to celebrate our special day as we embark on a new journey together.',
        invitation_tag_line: 'Celebrate Love, Laughter, and Happily Ever After',
        public_id:'default',
        template: {
        id:"",
        template_key:"",
        template_name:"Modern Wedding",
        template_type:"Wedding",
        is_active:true,
        created_at:new Date().toISOString(),
        updated_at:new Date().toISOString(),
    },
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
    const [previewData, setPreviewData] = useState<PreviewData | RsvpInvitationResponse>(DEFAULT_INVITATION_DATA);
    const [hasReceivedMessage, setHasReceivedMessage] = useState(false);
    const [invitationDetails, setInvitationDetails] = useState<Invitation>();
    const [isLoading, setIsLoading] = useState(true);

    const getIdFromUrl = (): { id: string | null, type: 'template' | 'public' | 'rsvp_token'| null } => {
        const pathParts = window.location.pathname.split('/');
        const id = pathParts[1] || null;
        
        if (!id) return { id: null, type: null };
        
        // Check if it's a UUID (template_id)
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        if (uuidRegex.test(id)) {
            return { id, type: 'template' };
        }
        const rsvp_token = isRSVPToken(id)
        if(rsvp_token) return {id: id, type: 'rsvp_token'}  
        // Otherwise it's a nano ID (public_id)
        return { id, type: 'public' };
    };


    const isRSVPToken = (param: string): boolean => {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        return param.length === 10 && !uuidRegex.test(param);
    };

    const fetchGuestInvitationData = async (invitationId: string) => {
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
    };

    const fetchTemplateData = async (template_id: string) => {
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
    };

    const fetchInvitationDetails = async(public_id: string) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/invitations/public/${public_id}`);
            if(response.ok){
                const data = await response.json();
                setInvitationDetails(data);
                console.log(data)
            } else {
                setPreviewData(DEFAULT_INVITATION_DATA);
            }
        } catch (error) {
            console.error('Failed to fetch invitation data:', error);
            setPreviewData(DEFAULT_INVITATION_DATA);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchInvitationData = async (invitationId: string) => {
        
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
            console.error('Failed to fetch invitation data:', error);
            setPreviewData(DEFAULT_INVITATION_DATA);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (invitationDetails && invitationDetails.id) {
            console.log("Fetching full invitation data for:", invitationDetails.id);
            fetchInvitationData(invitationDetails.id);
        }
    }, [invitationDetails]);

    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (event.data?.type === 'INVITATION_PREVIEW_UPDATE') {
                console.log('Preview update received:', event.data.payload);
                const payload = event.data.payload;

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
        
        const { id, type } = getIdFromUrl();
        
        if (type === 'template' && id) {
            fetchTemplateData(id);
        } else if (type === 'rsvp_token' && id) {
            fetchGuestInvitationData(id);
        } else if (type === 'public' && id && !invitationDetails) {
            fetchInvitationDetails(id);
        } else if (!id && !hasReceivedMessage) {
            setPreviewData(DEFAULT_INVITATION_DATA);
            setIsLoading(false);
        }
        
        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, [hasReceivedMessage, invitationDetails]);
    console.log("faslkdjfakjerpwuierpoikjvlknv",previewData)
    return { previewData, isLoading };
};
