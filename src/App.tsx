import { BrowserRouter, Routes, Route } from "react-router-dom";
import TemplateRenderer from "./pages/TemplateRenderer";

export default function App() {
  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route
          path="/preview/:category/:templateName/:invitation_id"
          element={<TemplateRenderer />}
        />
        <Route
          path="/:id"
          element={<TemplateRenderer />}
        />
      </Routes>
    </BrowserRouter>
    </div>
  );
}