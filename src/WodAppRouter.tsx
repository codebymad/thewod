import { Navigate, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ProgramsPage from "./pages/ProgramsPage";
import HistoryPage from "./pages/HistoryPage";
import ResultsPage from "./pages/ResultsPage";
// import AddWorkoutPage from "./pages/AddWorkoutPage";
import AddWodPage from "./pages/AddWodPage";

function WodAppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />

      <Route path="/home" element={<HomePage />} />
      <Route path="/programs" element={<ProgramsPage />} />
      <Route path="/history" element={<HistoryPage />} />
      <Route path="/results" element={<ResultsPage />} />
      <Route path="/addworkout" element={<AddWodPage />} />

      {/* Unknown routes */}
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}

export default WodAppRouter;