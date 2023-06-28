import { createSlice } from "@reduxjs/toolkit";

export const odontogramaSlice = createSlice({
  name: "odontograma",

  initialState: {
    toolOdontActiva: null,
    odontogramaActual: null,
    errorMsgRegOdontog: { msg: "", error: "" },
    piezasListOdon: [],
    piezaActiva: null,
  },

  reducers: {
    onSetActiveTool: (state, { payload }) => {
      state.toolOdontActiva = payload;
    },

    onSetOdontogramaConsAct: (state, { payload }) => {
      state.odontogramaActual = payload;
    },

    onSetPiezasListOdon: (state, { payload }) => {
      state.piezasListOdon = payload;
    },

    onSetPiezaActiva: (state, { payload }) => {
      state.piezaActiva = payload;
    },

    onChangePiezasDentales: (state, { payload }) => {
      //comprobar si es registro o actualizacion
      const existente = state.odontogramaActual.piezas.some(
        (pieceDent) => pieceDent.numberTooth === payload.numberTooth
      );
      // console.log(existente);
      // console.log(payload);
      if (existente) {
        //actualizacion
        state.odontogramaActual.piezas = state.odontogramaActual.piezas.map(
          (pieceDent) => {
            if (pieceDent.numberTooth === payload.numberTooth) {
              return payload;
            }
            return pieceDent;
          }
        );
      } else {
        state.odontogramaActual.piezas.push(payload);
      }
    },

    changeRegisterErrorOdont: (state, { payload }) => {
      state.errorMsgRegOdontog = payload;
    },

    clearErrorMessageOdont: (state) => {
      state.errorMsgRegOdontog = { msg: "", error: "" };
    },
  },
});

export const {
  onSetActiveTool,
  onChangePiezasDentales,
  onSetOdontogramaConsAct,
  changeRegisterErrorOdont,
  clearErrorMessageOdont,
  onSetPiezasListOdon,
  onSetPiezaActiva,
} = odontogramaSlice.actions;
