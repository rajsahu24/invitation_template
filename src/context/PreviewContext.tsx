import React, { createContext, useContext } from 'react';
import type { ReactNode } from "react";
import { useGetTemplateData, DEFAULT_INVITATION_DATA } from '../hooks/useGetTemplateData';
import { GenericLoader } from '../components/LoadingScreen';
import type { RsvpInvitationResponse } from '../hooks/getTemplateDataModel';

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

interface PreviewData {
  invitation_title?: string;
  invitation_message?: string;
  invitation_tag_line?: string;
  invitation_type?: string;
  metadata?: Record<string, any>;
  events?: InvitationEvent[];
}

interface PreviewContextType {
  previewData: RsvpInvitationResponse;
  isLoading: boolean;
}

const PreviewContext = createContext< PreviewContextType | undefined>(undefined);

interface PreviewProviderProps {
  children: ReactNode;
  initialData?: PreviewData | RsvpInvitationResponse;
  theme?: 'birthday' | 'wedding' | 'default';
}

export const PreviewProvider: React.FC<PreviewProviderProps> = ({ children, theme = 'default' }) => {
  const { previewData: templateData, isLoading } = useGetTemplateData();
  const safePreviewData: RsvpInvitationResponse = (templateData as RsvpInvitationResponse) || DEFAULT_INVITATION_DATA;
  
  if (isLoading) {
    return <GenericLoader theme={theme} />;
  }
  
  return (
    <PreviewContext.Provider value={{ previewData: safePreviewData, isLoading: false }}>
      {children}
    </PreviewContext.Provider>
  );
};

export const usePreview = (): PreviewContextType => {
  const context = useContext(PreviewContext);
  if (!context) {
    throw new Error('usePreview must be used within a PreviewProvider');
  }
  return context;
};