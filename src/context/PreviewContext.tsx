import React, { createContext, useContext } from 'react';
import type { ReactNode } from "react";
import { useGetTemplateData } from '../hooks/useGetTemplateData';

import { GenericLoader } from '../components/LoadingScreen';
import type { RsvpInvitationResponse } from '../hooks/getTemplateDataModel';
import { DEFAULT_INVITATION_DATA } from '../assets/utils';
import type { PreviewContextType, PreviewData } from './PreviewContextModel';



const PreviewContext = createContext< PreviewContextType | undefined>(undefined);

interface PreviewProviderProps {
  children: ReactNode;
  initialData?: PreviewData | RsvpInvitationResponse;
  theme?: 'birthday' | 'wedding' | 'default';
  public_id?:string;
  template_id?:string;
}

export const PreviewProvider: React.FC<PreviewProviderProps> = ({ children, theme }) => {
  
  const { previewData: templateData, isLoading } = useGetTemplateData();
  const safePreviewData: RsvpInvitationResponse = (templateData as RsvpInvitationResponse) || DEFAULT_INVITATION_DATA;
  
  
  const invitation = (safePreviewData as any).invitation || safePreviewData;
  const dynamicTheme = theme || (invitation?.invitation_type === 'birthday' ? 'birthday' : 'wedding');
  
  if (isLoading) {
    return <GenericLoader theme={dynamicTheme} />;
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