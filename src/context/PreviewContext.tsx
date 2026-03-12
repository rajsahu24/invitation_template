import React, { createContext, useContext } from 'react';
import type { ReactNode } from "react";
import { useGetTemplateData } from '../hooks/useGetTemplateData';
import { useMetadata } from '../hooks/useMetadata';
import { GenericLoader } from '../components/LoadingScreen';
import { DEFAULT_INVITATION_DATA } from '../assets/utils';
import type { PreviewContextType, PreviewData } from './PreviewContextModel';
import type { InvitationData } from '../hooks/getTemplateDataModel';



const PreviewContext = createContext< PreviewContextType | undefined>(undefined);

interface PreviewProviderProps {
  children: ReactNode;
  initialData?: PreviewData | InvitationData;
  theme?: 'birthday' | 'wedding' | 'default';
  public_id?:string;
  template_id?:string;
}

export const PreviewProvider: React.FC<PreviewProviderProps> = ({ children, theme }) => {
  
  const { previewData: templateData, isLoading } = useGetTemplateData();
  const safePreviewData: InvitationData = (templateData as InvitationData) || DEFAULT_INVITATION_DATA;
  
  
  const invitation = (safePreviewData as any).invitation || safePreviewData;
  const dynamicTheme = theme || (invitation?.invitation_type === 'birthday' ? 'birthday' : 'wedding');
  
  // Extract metadata from invitation data
  const title = invitation?.invitation_title || 'You are Invited!';
  const description = invitation?.invitation_message || invitation?.invitation_tag_line || 'Join us for a special celebration.';
  
  // Get public_id or slug from URL
  const pathParts = window.location.pathname.split('/');
  const idParam = pathParts[pathParts.length - 1];
  
  // Update metadata dynamically
  useMetadata({
    title,
    description,
    publicId: idParam,
    type: 'website'
  });
  
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