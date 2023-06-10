import { Navigate, Route, Routes } from "react-router-dom";
import { AgendaRoutes } from "../agenda";
import { DashboardRoutes } from "../dashboard";
import { PacientesRoutes } from "../pacientes";

export const AppRouter = () => {
  //

  return (
    <Routes>
      {/* ruta de inicio por defecto */}
      <Route path="/*" element={<Navigate to="/agenda" />} />
      {/* {status === "authenticated" ? (
        <Route path="/*" element={<JournalRoutes />} />
      ) : (
        <Route path="/auth/*" element={<AuthRoutes />} />
      )}

      <Route path="/*" element={<Navigate to="/auth/login" />} /> */}

      {/* Login y Registro */}
      {/* <Route path="/auth/*" element={ <AuthRoutes /> } /> */}

      {/* DentalSmileApp */}
      <Route path="/agenda/*" element={<AgendaRoutes />} />
      <Route path="/administracion/*" element={<DashboardRoutes />} />
      <Route path="/pacientes/*" element={<PacientesRoutes />} />
    </Routes>
  );
};
