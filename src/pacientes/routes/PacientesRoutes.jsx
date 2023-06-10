import { Navigate, Route, Routes } from "react-router-dom";
import { ConsultaPage, PacienteHistorial, PacientesPage } from "../pages";

export const PacientesRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PacientesPage />} />
      <Route path="/:id_pac/historial" element={<PacienteHistorial />} />
      <Route path="/:id_pac/historial/:id_cons" element={<ConsultaPage />} />
      {/* <Route path="/*" element={<Navigate to="/" />} /> */}
    </Routes>
  );
};
