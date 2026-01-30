import { BrowserRouter, Routes, Route } from "react-router-dom";
import TemplateRenderer from "./pages/TemplateRenderer";
import { useGetTemplateData } from "./hooks/useGetTemplateData";
export default function App() {
  console.log("Hello App")
  console.log(useGetTemplateData()) 
  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route
          path="/template/:category/:id/:invitation_id?"
          element={<TemplateRenderer />}
        />
      </Routes>
    </BrowserRouter>
    </div>
  );
}