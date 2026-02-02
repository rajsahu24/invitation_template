import { useParams } from "react-router-dom";
import { PreviewProvider, usePreview } from "../context/PreviewContext";


// marriage
import MarriageTemplate1 from "../template/marriage/template-1";
import MarriageTemplate2 from "../template/marriage/template-2";
import MarriageTemplate3 from "../template/marriage/template-3";
import BirthdayT1 from "../template/birthday/template-1";


const TEMPLATE_MAP: any = {
  Wedding: {
    "Classic Wedding": MarriageTemplate1,
    "Modern Wedding": MarriageTemplate2,
    "culture wedding": MarriageTemplate3
  },
  Birthday: {
    "Birthday Celebration": BirthdayT1
  }
};

function TemplateContent() {
  const { previewData } = usePreview();
  const invitation = previewData.invitation;
  console.log(invitation.template)
  const category = invitation.template.template_type
  const templateName = invitation.template.template_name

  const Template = TEMPLATE_MAP[category]?.[templateName];
  
  if (!Template) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-stone-50 p-4 text-center">
        <h2 className="text-3xl font-[Caveat] text-stone-700 font-bold mb-4">Template Not Found</h2>
        <div className="text-stone-500 space-y-2">
          <p>Category: <span className="font-mono text-stone-800">{category}</span></p>
          <p>Template Name: <span className="font-mono text-stone-800">{templateName}</span></p>
        </div>
      </div>
    );
  }
  
  return <Template />;
}

export default function TemplateRenderer() {
  const { id } = useParams();
  
  if (!id) {
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

  


