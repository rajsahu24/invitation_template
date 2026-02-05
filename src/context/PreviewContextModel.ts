import type { RsvpInvitationResponse } from "../hooks/getTemplateDataModel";

export interface InvitationEvent {
  id: string;                     // UUID
  invitation_id: string;          // UUID (foreign key)
  name: string;                   // e.g. "haldi"

  booking_id: string | null;
  venue_id: string | null;
  event_type: string | null;
  description: string | null;

  start_time: string;             // ISO date string
  end_time: string | null;
  event_location: string;
  metadata: {
    questionnaire: any[];         // can refine later if structure is known
  };

  created_at: string;             // ISO timestamp
  updated_at: string;             // ISO timestamp
}

export interface PreviewData {
  invitation_title?: string;
  invitation_message?: string;
  invitation_tag_line?: string;
  invitation_type?: string;
  public_id?: string;
  metadata?: Record<string, any>;
  events?: InvitationEvent[];
}

export interface PreviewContextType {
  previewData: RsvpInvitationResponse;
  isLoading: boolean;
}