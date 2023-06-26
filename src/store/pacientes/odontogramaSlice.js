import { createSlice } from "@reduxjs/toolkit";

export const odontogramaSlice = createSlice({
  name: "odontograma",

  initialState: {
    toolOdontActiva: null,
    odontogramaActual: [],
  },

  reducers: {
    onSetActiveTool: (state, { payload }) => {
      state.toolOdontActiva = payload;
    },
    onChangeOdontogramaAct: (state, { payload }) => {
      //comprobar si es registro o actualizacion
      const existente = state.odontogramaActual.some(
        (pieceDent) => pieceDent.numberTooth === payload.numberTooth
      );

      console.log(existente);
      console.log(payload);
      if (existente) {
        //actualizacion
        state.odontogramaActual = state.odontogramaActual.map((pieceDent) => {
          if (pieceDent.numberTooth === payload.numberTooth) {
            // if (
            //   payload.oclusal !== null ||
            //   payload.vestibular !== null ||
            //   payload.mesial !== null ||
            //   payload.lingual !== null ||
            //   payload.distal !== null
            // ) {
            return payload;
            // } else {
            //   return {};
            // }
          }

          return pieceDent;
        });
      } else {
        state.odontogramaActual.push(payload);
      }

      //   [...state.odontogramaActual, payload];
    },
  },
});

export const { onSetActiveTool, onChangeOdontogramaAct } =
  odontogramaSlice.actions;
