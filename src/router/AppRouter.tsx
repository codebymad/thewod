import { Routes, Route, Navigate } from "react-router-dom";
import WodHome from "../pages/WodHome";
import ProgramsPage from "../pages/Programs";
import NotesPage from "../pages/NotesPage";
import NotFoundPage from "../pages/NotFoundPage";

function AppRouter() {
  return (
    <Routes>
      <Route path="/home" element={<WodHome />} />
      <Route path="/programs" element={<ProgramsPage />} />
      <Route path="/notes" element={<NotesPage />} />
      <Route path="/error" element={<NotFoundPage />} />
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="*" element={<Navigate to="/error" replace />} />
      <Route path="/index.html" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}

export default AppRouter;
