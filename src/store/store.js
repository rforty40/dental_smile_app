import { configureStore } from "@reduxjs/toolkit";
import {
  agendaSlice,
  consultasSlice,
  dashboardSlice,
  dataSlice,
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
    dataGlobal: dataSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
