import { useParams } from "react-router-dom";
import { PreviewProvider, usePreview } from "../context/PreviewContext";
import { useEffect } from "react";



// marriage
import MarriageTemplate1 from "../template/marriage/template-1";
import MarriageTemplate2 from "../template/marriage/template-2";
import MarriageTemplate3 from "../template/marriage/template-3";
import MarriageTemplate4 from "../template/marriage/template-4";
import BirthdayT1 from "../template/birthday/template-1";
import HoliTemolateT1 from '../template/holi/template-1'
import HoliTemolateT2 from '../template/holi/template-2'
import BirthdayWisht1 from '../template/birthday-wish/template-1'


const TEMPLATE_MAP: any = {
  Wedding: {
    "classic wedding": MarriageTemplate1,
    "modern wedding": MarriageTemplate2,
    "culture wedding": MarriageTemplate3,
    "botanical garden": MarriageTemplate4
  },
  Birthday: {
    "birthday celebration": BirthdayT1
  },
  holi:{
    "splash & play":HoliTemolateT1,
    "retro bollywood":  HoliTemolateT2,
  },
  birthday_wish:{
    "surprise birthday card":
    BirthdayWisht1
  }
};  




function TemplateContent() {
  const { category, templateName } = useParams();
  const { previewData } = usePreview();
  console.log(previewData)
  const invitation = previewData;
  const urlTemplateName = templateName?.replace(/_/g, " ");
  
  // Helper function to extract string value from either direct string or SectionResponse
  const extractString = (value: any): string => {
    if (!value) return '';
    if (typeof value === 'string') return value;
    if (typeof value.data === 'string') return value.data;
    return '';
  };

  // Update metadata when previewData changes
  useEffect(() => {
    if (invitation) {
      console.log('[TemplateRenderer] invitation data:', invitation);
      console.log('[TemplateRenderer] invitation_title:', invitation.invitation_title);
      
      const title = extractString(invitation.invitation_title) || 'You are Invited!';
      const description = extractString(invitation.invitation_message) || extractString(invitation.invitation_tag_line) || 'Join us for a special celebration.';
      console.log('[TemplateRenderer] extracted title:', title);
      console.log('[TemplateRenderer] extracted description:', description);
      // const currentUrl = window.location.href;
      
      // Get public_id or slug from URL
      // const pathParts = window.location.pathname.split('/');
      // const idParam = pathParts[pathParts.length - 1];
      
      // Generate OG image URL

    }
  }, [invitation]);
  

  const finalCategory = category || invitation?.template_type?.replace(/ /g, "_");
  const finalTemplateName = urlTemplateName || invitation?.template_name;
  
  console.log('Category:', finalCategory, 'Template Name:', finalTemplateName);

  // Normalize for lookup (case-insensitive keys in map would be better, but let's match existing structure)
  // The map has "Wedding" and "Birthday" (Title Case)
  // URL params might come in as "wedding" or "birthday" (lowercase)
  const categoryKey = Object.keys(TEMPLATE_MAP).find(
    k => k.toLowerCase() === finalCategory?.toLowerCase()
  ) || finalCategory || "";

  const templateKey = finalTemplateName || "";
  
  // Find template in the matching category (case-insensitive lookup for template name too)
  const categoryTemplates = TEMPLATE_MAP[categoryKey] || {};
  const foundTemplateKey = Object.keys(categoryTemplates).find(
    k => k.toLowerCase() === templateKey.toLowerCase()
  ) || templateKey;

  const Template = categoryTemplates[foundTemplateKey];
  
  if (!Template) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-stone-50 p-4 text-center">
        <h2 className="text-3xl font-[Caveat] text-stone-700 font-bold mb-4">Template Not Found</h2>
        <div className="text-stone-500 space-y-2">
          <p>Category: <span className="font-mono text-stone-800">{categoryKey || finalCategory}</span></p>
          <p>Template Name: <span className="font-mono text-stone-800">{foundTemplateKey || templateKey}</span></p>
        </div>
      </div>
    );
  }
  
  return <Template />;
}

export default function TemplateRenderer() {
  const { id, invitation_id } = useParams();
  const actualId = invitation_id || id;
  console.log('Params:', { id, invitation_id, actualId });
  
  if (!actualId) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-stone-50 p-4 text-center">
        <h2 className="text-3xl font-[Caveat] text-stone-700 font-bold mb-4">Invalid URL</h2>
        <p className="text-stone-500">No ID provided</p>
      </div>
    );
  }
  
  return (
    <PreviewProvider theme="default">
      <TemplateContent />
    </PreviewProvider>
  );
}

  


