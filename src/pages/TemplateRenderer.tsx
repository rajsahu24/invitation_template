import { useParams } from "react-router-dom";

// marriage
// import MarriageT1 from "../templates/marriage/template-1/index";
import MarriageTemplate1 from "../template/marriage/template-1";
// import MarriageT2 from "../templates/marriage/template-2";
import MarriageTemplate2 from "../template/marriage/template-2";
import MarriageTemplate3 from "../template/marriage/template-3";
import BirthdayT1 from "../template/birthday/template-1";
// // birthday
// import BirthdayT1 from "../templates/birthday/template-1";

const TEMPLATE_MAP: any = {
  wedding: {
    "1": MarriageTemplate1,
    // "2": MarriageT2
    "2": MarriageTemplate2,
    "3": MarriageTemplate3
  },
  birthday: {
    "3": BirthdayT1
  }
};

export default function TemplateRenderer() {
  const { category, id } = useParams();
  console.log(category,id)
  const Template = TEMPLATE_MAP[category!]?.[id!];
  console.log(Template)
  console.log("Hello")
  
  if (!Template) {
    return (
      <div>
        <h2>Template Not Found</h2>
        <p>Category: {category}</p>
        <p>ID: {id}</p>
        <p>Available categories: {Object.keys(TEMPLATE_MAP).join(", ")}</p>
        {category && TEMPLATE_MAP[category] && (
          <p>Available IDs for {category}: {Object.keys(TEMPLATE_MAP[category]).join(", ")}</p>
        )}
      </div>
    );
  }
  
  return <Template />;
}
