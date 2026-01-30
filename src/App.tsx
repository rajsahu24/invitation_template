import { BrowserRouter, Routes, Route } from "react-router-dom";
import TemplateRenderer from "./pages/TemplateRenderer";
import { PreviewProvider } from "./context/PreviewContext";

export default function App() {
  return (
    <div>
    <BrowserRouter>
      <PreviewProvider>
        <Routes>
          <Route
            path="/:category/:id/:invitation_id?"
            element={<TemplateRenderer />}
          />
        </Routes>
      </PreviewProvider>
    </BrowserRouter>
    </div>
  );
}