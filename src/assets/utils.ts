

export const DEFAULT_INVITATION_DATA:any  = {
    invitation: {
        id: 'default',
        user_id: 'default',
        invitation_type: 'wedding',
        invitation_title: 'Alexander & Victoria',
        invitation_message: 'We invite you to celebrate our special day as we embark on a new journey together.',
        invitation_tag_line: 'Celebrate Love, Laughter, and Happily Ever After',
        public_id: 'default',
        template: {
            id: "",
            template_key: "",
            template_name: "Modern Wedding",
            template_type: "Wedding",
            is_active: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
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


export const getIdFromUrl = (): { id: string | null, type: 'template' | 'public' | 'rsvp_token' | 'invitation' | null } => {
    const pathParts = window.location.pathname.split('/').filter(Boolean);

    // Check if it's the new route format: /preview/category/templateName/invitation_id
    if (pathParts[0] === 'preview' && pathParts.length === 4) {
        const invitation_id = pathParts[3];
        return { id: invitation_id, type: 'invitation' };
    }

    const id = pathParts[0] || null;

    if (!id) return { id: null, type: null };


    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (uuidRegex.test(id)) {
        return { id, type: 'template' };
    }
    const rsvp_token = isRSVPToken(id)
    if (rsvp_token) return { id: id, type: 'rsvp_token' }

    return { id, type: 'public' };
};


export const isRSVPToken = (param: string): boolean => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return param.length === 10 && !uuidRegex.test(param);
};
