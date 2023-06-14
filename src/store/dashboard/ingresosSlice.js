import { createSlice } from "@reduxjs/toolkit";

export const ingresosSlice = createSlice({
  name: "ingresos",

  initialState: {
    ingresosList: [],

    ingresosConsList: [],
    ingresoActivo: null,
    errorMsgRegIngreso: { msg: "", error: "" },
    totalIngCons: "",
  },

  reducers: {
    onLoadIngresosConsList: (state, { payload }) => {
      state.ingresosConsList = payload;
    },

    onLoadIngresosList: (state, { payload }) => {
      state.ingresosList = payload;
    },
    onSetActiveIngreso: (state, { payload }) => {
      state.ingresoActivo = payload;
    },

    onSetTotalesIngresoCons: (state, { payload }) => {
      state.totalIngCons = payload;
    },

    onSaveIngreso: (state, { payload }) => {
      state.ingresosList.push(payload);
    },

    onUpdateIngreso: (state, { payload }) => {
      state.ingresosList = state.ingresosList.map((ingreso) => {
        if (ingreso.id === payload.id) {
          return payload;
        }

        return ingreso;
      });
    },

    onDeleteIngreso: (state, { payload }) => {
      if (payload.length === 0) {
        state.ingresosList = state.ingresosList.filter(
          (ingreso) => ingreso.id !== state.ingresoActivo.id
        );
      } else {
        state.ingresosList = state.ingresosList.filter(
          (ingreso) => !payload.includes(ingreso.id)
        );
      }
      state.ingresoActivo = null;
    },

    onChangeRegErrIngreso: (state, { payload }) => {
      state.errorMsgRegIngreso = payload;
    },

    clearErrorIngresoMsg: (state) => {
      state.errorMsgRegIngreso = { msg: "", error: "" };
    },
  },
});

export const {
  onSetActiveIngreso,
  onLoadIngresosList,
  onLoadIngresosConsList,
  onSaveIngreso,
  onUpdateIngreso,
  onDeleteIngreso,
  onChangeRegErrIngreso,
  clearErrorIngresoMsg,
  onSetTotalesIngresoCons,
} = ingresosSlice.actions;
