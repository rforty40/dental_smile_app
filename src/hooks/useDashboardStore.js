import { useDispatch, useSelector } from "react-redux";
import { getGananciasData, getPanelData } from "../api/dashboard.api";
import {
  onChangeMsgPanelCons,
  onChangeMsgPanelGastos,
  onChangeMsgPanelIngre,
  onChangeMsgPanelPac,
  onChangeMsgPanelProced,
  onLoadListConsPanel,
  onLoadListGastosPanel,
  onLoadListIngresoPanel,
  onLoadListPacPanel,
  onLoadListProcedPanel,
  onLoadListTotalGastos,
  onLoadListTotalIngreso,
  onChangeParametroBusqueda,
} from "../store";

import { switchDataDashboard } from "../dashboard/helpers";
import { formatearDataPacToTable } from "../pacientes/helpers";

export const useDashboardStore = () => {
  const dispatch = useDispatch();

  const {
    listPacientesPanel,
    listConsultasPanel,
    listProcedimientosPanel,

    //ganancias
    listGastosPanel,
    listIngresoPanel,
    totallistGastos,
    totallistIngreso,

    //Messages
    messagePanelPac,
    messagePanelCons,
    messagePanelProced,
    messagePanelIngre,
    messagePanelGastos,
    messagePanelGananc,

    //parametros
    parametrosBusqueda,
  } = useSelector((state) => state.dashboard);

  const startLoadPanel = async (tipo, param_fechaIni, fechaFin) => {
    //
    dispatch(
      onChangeParametroBusqueda({
        tipo,
        param_fechaIni,
        fechaFin,
      })
    );
    const parametroBusq = switchDataDashboard(tipo, param_fechaIni, fechaFin);

    //Pacientes
    try {
      const { data: dataPacientes } = await getPanelData(
        "pacientes",
        tipo,
        param_fechaIni,
        fechaFin
      );
      // console.log(dataPacientes);
      dispatch(onLoadListPacPanel(formatearDataPacToTable(dataPacientes)));

      // console.log(msgPanelPac + parametroBusq);
      dispatch(onChangeMsgPanelPac("Pacientes registrados " + parametroBusq));
    } catch (error) {
      if (error.response.data.message.includes("pacientes")) {
        dispatch(onLoadListPacPanel([]));
        dispatch(
          onChangeMsgPanelPac("No se registraron pacientes " + parametroBusq)
        );
      }
    }

    //Consultas
    try {
      const { data: dataConsultas } = await getPanelData(
        "consultas",
        tipo,
        param_fechaIni,
        fechaFin
      );
      //console.log(dataConsultas);
      dispatch(onLoadListConsPanel(dataConsultas));

      // console.log(msgPanelCons + parametroBusq);
      dispatch(onChangeMsgPanelCons("Consultas atendidas " + parametroBusq));
    } catch (error) {
      if (error.response.data.message.includes("consultas")) {
        dispatch(onLoadListConsPanel([]));
        dispatch(
          onChangeMsgPanelCons(
            "No existen consultas atendidas " + parametroBusq
          )
        );
      }
    }

    //Procedimientos
    try {
      const { data: dataProcedimientos } = await getPanelData(
        "procedimientos",
        tipo,
        param_fechaIni,
        fechaFin
      );
      //console.log(dataProcedimientos);
      dispatch(onLoadListProcedPanel(dataProcedimientos));
      // console.log(msgPanelProced + parametroBusq);

      dispatch(
        onChangeMsgPanelProced(`Procedimientos realizados ` + parametroBusq)
      );
    } catch (error) {
      if (error.response.data.message.includes("procedimientos")) {
        dispatch(onLoadListProcedPanel([]));
        dispatch(
          onChangeMsgPanelProced(
            "No se existen procedimientos " + parametroBusq
          )
        );
      }
    }
  };

  /***************************************************************************** */
  /***************************************************************************** */

  const startLoadGanancias = async (tipo, param_fechaIni, fechaFin) => {
    dispatch(
      onChangeParametroBusqueda({
        tipo,
        param_fechaIni,
        fechaFin,
      })
    );

    const parametroBusq = switchDataDashboard(tipo, param_fechaIni, fechaFin);

    //ingresos
    try {
      const { data: dataIngresos } = await getGananciasData(
        "ingresos",
        tipo,
        param_fechaIni,
        fechaFin
      );
      //console.log(dataIngresos);
      dispatch(onLoadListIngresoPanel(dataIngresos));

      // console.log(msgPanelIngre + parametroBusq);
      dispatch(onChangeMsgPanelIngre("Ingresos " + parametroBusq));
    } catch (error) {
      //console.log(error.response.data.message);
      if (error.response.data.message.includes("ingresos")) {
        dispatch(onLoadListIngresoPanel([]));
        dispatch(
          onChangeMsgPanelIngre("No se registran ingresos " + parametroBusq)
        );
      }
    }

    //totalDeIngreso
    try {
      const { data: totalIngresos } = await getGananciasData(
        "sum_ingresos",
        tipo,
        param_fechaIni,
        fechaFin
      );
      //console.log(totalIngresos);
      let valorIngreso = 0;
      if (Object.values(totalIngresos[0])[0] !== null) {
        valorIngreso = parseFloat(Object.values(totalIngresos[0])[0]);
      }
      dispatch(onLoadListTotalIngreso(valorIngreso));
    } catch (error) {
      //console.log(error.response.data.message);
    }

    //gastos
    try {
      const { data: dataGastos } = await getGananciasData(
        "gastos",
        tipo,
        param_fechaIni,
        fechaFin
      );
      //console.log(dataGastos);
      dispatch(onLoadListGastosPanel(dataGastos));

      // console.log(msgPanelGastos + parametroBusq);
      dispatch(onChangeMsgPanelGastos("Gastos " + parametroBusq));
    } catch (error) {
      //console.log(error.response.data.message);
      if (error.response.data.message.includes("gastos")) {
        dispatch(onLoadListGastosPanel([]));
        dispatch(
          onChangeMsgPanelGastos("No se registran gastos " + parametroBusq)
        );
      }
    }

    //totalDeGastos
    try {
      const { data: totalGastos } = await getGananciasData(
        "sum_gastos",
        tipo,
        param_fechaIni,
        fechaFin
      );
      //console.log(totalGastos);
      let valorGasto = 0;
      if (Object.values(totalGastos[0])[0] !== null) {
        valorGasto = parseFloat(Object.values(totalGastos[0])[0]);
      }
      //console.log(valorGasto);
      dispatch(onLoadListTotalGastos(valorGasto));
    } catch (error) {
      //console.log(error.response.data.message);
    }
  };

  //
  //

  return {
    // * Propiedades
    listPacientesPanel,
    listConsultasPanel,
    listProcedimientosPanel,
    listGastosPanel,
    listIngresoPanel,
    totallistGastos,
    totallistIngreso,
    messagePanelPac,
    messagePanelCons,
    messagePanelProced,
    messagePanelIngre,
    messagePanelGastos,
    messagePanelGananc,
    parametrosBusqueda,
    // * Métodos
    startLoadPanel,
    startLoadGanancias,
  };
};
