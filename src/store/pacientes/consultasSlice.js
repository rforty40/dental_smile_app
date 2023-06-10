import { createSlice } from "@reduxjs/toolkit";

export const consultasSlice = createSlice({
  name: "consultas",

  initialState: {
    //Listar consultas
    consultaActiva: null,
    consultasList: [],
    errorLoadConsultas: null,
    //Modal Form
    stateOpenFormCons: false,
    titleFormConsulta: "",
    errorMsgRegCons: { msg: "", error: "" },
    stateOpenDelCons: false,
    signosVitales: null,

    //examenEstomagnatico
    examenesList: [],
    examenActivo: null,

    //enfermedades CIE
    enfermedadesCieList: [],

    //planes de diagnosticos, terapeuticos y educacionales
    planesList: [[], [], []],
    planActivo: null,

    //diagnosticos
    diagnosticosList: [],
    diagActivo: null,

    //tratamientos
    tratamientosList: [],
    tratamActivo: null,
    errorLoadTratamientos: null,
  },

  reducers: {
    onSetActivaConsulta: (state, { payload }) => {
      state.consultaActiva = payload;
    },

    onLoadConsultasList: (state, { payload }) => {
      state.consultasList = payload;
    },

    changeErrorLoadConsultas: (state, { payload }) => {
      state.errorLoadConsultas = payload;
    },

    onChangeOpenFormCons: (state, { payload }) => {
      state.stateOpenFormCons = payload;
    },

    onChangeTitleFormCons: (state, { payload }) => {
      state.titleFormConsulta = payload;
    },

    onChangeOpenDelCons: (state, { payload }) => {
      state.stateOpenDelCons = payload;
    },

    changeRegisterErrorCons: (state, { payload }) => {
      state.errorMsgRegCons = payload;
    },

    clearErrorMessageCons: (state) => {
      state.errorMsgRegCons = { msg: "", error: "" };
    },

    /*
    signos vitales
    */
    onSetActiveSignVit: (state, { payload }) => {
      state.signosVitales = payload;
    },

    /* 
  exmanes estomatognaticos
   */
    onLoadExamenesList: (state, { payload }) => {
      state.examenesList = payload;
    },
    onSetActiveExamen: (state, { payload }) => {
      state.examenActivo = payload;
    },
    onSaveExamen: (state, { payload }) => {
      state.examenesList.push(payload);
    },
    onUpdateExamen: (state, { payload }) => {
      state.examenesList = state.examenesList.map((examen) => {
        if (examen.id === payload.id) {
          return payload;
        }

        return examen;
      });
    },
    onDeleteExamen: (state, { payload }) => {
      if (payload.length === 0) {
        state.examenesList = state.examenesList.filter(
          (examen) => examen.id !== state.examenActivo.id
        );
      } else {
        state.examenesList = state.examenesList.filter(
          (examen) => !payload.includes(examen.id)
        );
      }
      state.examenActivo = null;
    },

    /*
    enfermedadesCIE
     */
    onLoadEnfermedadesCieList: (state, { payload }) => {
      state.enfermedadesCieList = payload;
    },

    /* 
  planes de diagnosticos, terapeuticos y educacionales
   */
    onLoadPlanesList: (state, { payload }) => {
      state.planesList = payload;
    },

    onSetActivePlan: (state, { payload }) => {
      state.planActivo = payload;
    },

    onSavePlan: (state, { payload }) => {
      state.planesList[payload.tipo].push(payload.plan);
    },

    onUpdatePlan: (state, { payload }) => {
      state.planesList[payload.tipo] = state.planesList[payload.tipo].map(
        (plan) => {
          if (plan.id === payload.plan.id) {
            return payload.plan;
          }

          return plan;
        }
      );
    },

    onDeletePlan: (state, { payload }) => {
      state.planesList[payload] = state.planesList[payload].filter(
        (plan) => plan.id !== state.planActivo.id
      );

      state.planActivo = null;
    },

    /* 
  diagnosticos
   */
    onLoadDiagnosticosList: (state, { payload }) => {
      state.diagnosticosList = payload;
    },
    onSetActiveDiag: (state, { payload }) => {
      state.diagActivo = payload;
    },
    onSaveDiag: (state, { payload }) => {
      state.diagnosticosList.push(payload);
    },
    onUpdateDiag: (state, { payload }) => {
      state.diagnosticosList = state.diagnosticosList.map((diag) => {
        if (diag.id === payload.id) {
          return payload;
        }

        return diag;
      });
    },
    onDeleteDiag: (state) => {
      state.diagnosticosList = state.diagnosticosList.filter(
        (diag) => diag.id !== state.diagActivo.id
      );

      state.diagActivo = null;
    },

    /*
     Tratamientos 
     */
    onLoadTratamientosList: (state, { payload }) => {
      state.tratamientosList = payload;
    },
    onSetActiveTratam: (state, { payload }) => {
      state.tratamActivo = payload;
    },
    changeErrorLoadTratamientos: (state, { payload }) => {
      state.errorLoadTratamientos = payload;
    },
    // onSaveTratam: (state, { payload }) => {
    //   state.tratamientosList.push(payload);
    // },
    // onUpdateTratam: (state, { payload }) => {
    //   state.tratamientosList = state.tratamientosList.map((tratam) => {
    //     if (tratam.id_tratam === payload.id_tratam) {
    //       return payload;
    //     }

    //     return tratam;
    //   });
    // },
    onDeleteTratam: (state) => {
      state.tratamientosList = state.tratamientosList.filter(
        (tratam) => tratam.id_tratam !== state.tratamActivo.id_tratam
      );

      state.tratamActivo = null;
    },
  },
});

export const {
  onSetActivaConsulta,
  onLoadConsultasList,
  changeErrorLoadConsultas,
  onChangeOpenFormCons,
  onChangeTitleFormCons,
  onChangeOpenDelCons,
  changeRegisterErrorCons,
  clearErrorMessageCons,

  //signos vitales
  onSetActiveSignVit,

  //examenes estomatognatico
  onLoadExamenesList,
  onSetActiveExamen,
  onSaveExamen,
  onUpdateExamen,
  onDeleteExamen,

  //enfermedades
  onLoadEnfermedadesCieList,

  // planes de diagnosticos, terapeuticos y educacionales
  onLoadPlanesList,
  onSetActivePlan,
  onSavePlan,
  onUpdatePlan,
  onDeletePlan,

  //diagnosticos
  onLoadDiagnosticosList,
  onSetActiveDiag,
  onSaveDiag,
  onUpdateDiag,
  onDeleteDiag,

  //tratamientos
  onLoadTratamientosList,
  onSetActiveTratam,
  changeErrorLoadTratamientos,
  onDeleteTratam,
} = consultasSlice.actions;
