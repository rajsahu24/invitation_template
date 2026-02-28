import { useParams } from "react-router-dom";
import { PreviewProvider, usePreview } from "../context/PreviewContext";


// marriage
import MarriageTemplate1 from "../template/marriage/template-1";
import MarriageTemplate2 from "../template/marriage/template-2";
import MarriageTemplate3 from "../template/marriage/template-3";
import MarriageTemplate4 from "../template/marriage/template-4";
import BirthdayT1 from "../template/birthday/template-1";
import HoliTemolateT1 from '../template/holi/template-1'
import HoliTemolateT2 from '../template/holi/template-2'

const TEMPLATE_MAP: any = {
  Wedding: {
    "Classic Wedding": MarriageTemplate1,
    "Modern Wedding": MarriageTemplate2,
    "Culture Wedding": MarriageTemplate3,
    "Botanical Garden": MarriageTemplate4
  },
  Birthday: {
    "Birthday Celebration": BirthdayT1
  },
  holi:{
    "Splash & Play":HoliTemolateT1,
    "Retro Bollywood":  HoliTemolateT2,
  }
};  




function TemplateContent() {
  const { category, templateName } = useParams();
  const { previewData } = usePreview();
  console.log(previewData)
  const invitation = previewData;
  const urlTemplateName = templateName?.replace(/_/g, " ");
  
  // Prioritize URL params for preview overrides
  // We use URL params if they exist, otherwise fallback to invitation data
  const finalCategory = category || invitation?.template_type;
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

  


