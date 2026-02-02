export interface RsvpInvitationResponse {
  guest: Guest | {};
  invitation: Invitation;
  metadata?: Record<string, any>;
  invitation_tag_line:string
  events: Event[];
  images: Image[];
}

interface Guest {
  id: string;
  booking_id: string | null;
  invitation_id: string;
  name: string;
  guest_type: string | null;
  phone: string;
  email: string;
  metadata: Record<string, any>;
  status: number;   // 0–4 enum
  created_at: string;
  updated_at: string;
  rsvp_token: string;
}

 interface Template {
  id: string;                 
  template_type: string;      
  template_name: string;      
  template_key: string;       
  is_active: boolean;
  created_at: string;         
  updated_at: string;         
};

export interface Invitation {
  id: string;
  user_id: string;
  invitation_type: string;
  invitation_title: string;
  invitation_message: string;
  invitation_tag_line: string;
  metadata: InvitationMetadata;
  quick_action: string | null;
  template:Template;
  public_id:string
  created_at: string;
  updated_at: string;
  invitation_template_id: string;
}

interface InvitationMetadata {
  bride_name?: string;
  groom_name?: string;
  wedding_date?: string;
  wedding_location?: string;
  [key: string]: any;   // future safe
}
 interface EventMetadata {
  questionnaire: any[];
  [key: string]: any;
}

 interface Event {
  id: string;
  booking_id: string | null;
  name: string;
  event_type: string | null;
  invitation_id: string;
  venue_id: string | null;
  start_time: string;     // ISO date string
  end_time: string | null;
  description: string | null;
  metadata: EventMetadata;
  created_at: string;
  updated_at: string;
  event_location: string | null;
}

interface Image {
  id: string;
  invitation_id: string;
  image_url: string;
  public_id: string;
  type: string;          // 'general' | 'cover' | etc (future enum possible)
  position: number | null;
  created_at: string;
  updated_at: string;
}

export interface PreviewData {
  invitation_title?: string;
  invitation_message?: string;
  invitation_tag_line?: string;
  invitation_type?: string;
  metadata?: Record<string, any>;
  images?:Image
  events?: any[];
}