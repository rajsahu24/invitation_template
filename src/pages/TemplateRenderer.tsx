import { useParams } from "react-router-dom";

// marriage
import MarriageTemplate1 from "../template/marriage/template-1";
import MarriageTemplate2 from "../template/marriage/template-2";
import MarriageTemplate3 from "../template/marriage/template-3";
import BirthdayT1 from "../template/birthday/template-1";

const TEMPLATE_MAP: any = {
  wedding: {
    "1": MarriageTemplate1,
    "2": MarriageTemplate2,
    "3": MarriageTemplate3
  },
  birthday: {
    "1": BirthdayT1,
    "3": BirthdayT1
  }
};

export default function TemplateRenderer() {
  const { category, id } = useParams();

  const Template = TEMPLATE_MAP[category!]?.[id!];
  
  if (!Template) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-stone-50 p-4 text-center">
        <h2 className="text-3xl font-[Caveat] text-stone-700 font-bold mb-4">Template Not Found</h2>
        <div className="text-stone-500 space-y-2">
          <p>Category: <span className="font-mono text-stone-800">{category}</span></p>
          <p>ID: <span className="font-mono text-stone-800">{id}</span></p>
        </div>
      </div>
    );
  }
  
  return <Template />;
}
