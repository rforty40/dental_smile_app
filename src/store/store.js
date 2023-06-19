import { configureStore } from "@reduxjs/toolkit";
import {
  agendaSlice,
  authSlice,
  consultasSlice,
  dashboardSlice,
  dataSlice,
  gastosSlice,
  ingresosSlice,
  pacientesSlice,
  procedSlice,
  tipoConsSlice,
  tiposPagoSlice,
  tiposTratamSlice,
  uiSlice,
} from "./";

export const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    agenda: agendaSlice.reducer,
    pacientes: pacientesSlice.reducer,
    consultas: consultasSlice.reducer,
    dashboard: dashboardSlice.reducer,
    tipoPago: tiposPagoSlice.reducer,
    tipoCons: tipoConsSlice.reducer,
    tipoTratam: tiposTratamSlice.reducer,
    procedimientos: procedSlice.reducer,
    ingresos: ingresosSlice.reducer,
    gastos: gastosSlice.reducer,
    dataGlobal: dataSlice.reducer,
    auth: authSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
