import { useDispatch, useSelector } from "react-redux";
import {
  clearErrorIngresoMsg,
  onChangeRegErrIngreso,
  onDeleteIngreso,
  onLoadIngresosConsList,
  onLoadIngresosList,
  onSaveIngreso,
  onSetActiveIngreso,
  onSetTotalesIngreso,
  onSetTotalesIngresoCons,
  onUpdateIngreso,
} from "../store/dashboard/ingresosSlice";
import {
  createIngreso,
  deleteIngreso,
  getAllingresos,
  updateIngreso,
} from "../api/dashboard.api";
import {
  comprobarErrorIngreso,
  formatearDataConsIngToTable,
  formatearDataIngresoToBD,
  formatearDataIngresosToTable,
} from "../dashboard/helpers";

//
//
//
//
//

export const useIngresosStore = () => {
  //

  const dispatch = useDispatch();

  const {
    ingresosList,
    ingresosConsList,
    ingresoActivo,
    errorMsgRegIngreso,
    totalIngCons,
    totalIngresos,
  } = useSelector((state) => state.ingresos);

  console.log(ingresosList);
  //funciones
  const startIngresosConsList = async (fil_tipo, fil_fecha, prm1, prm2) => {
    try {
      const { data } = await getAllingresos(fil_tipo, fil_fecha, prm1, prm2);
      // console.log(data);
      // console.log(formatearDataConsIngToTable(data));
      const dataFormateada = formatearDataConsIngToTable(data);
      dispatch(onLoadIngresosConsList(dataFormateada));

      const total = dataFormateada.reduce((acc, totalAct) => {
        console.log(typeof totalAct.total);
        return acc + totalAct.total;
      }, 0);

      dispatch(onSetTotalesIngresoCons(total.toFixed(2)));
    } catch (error) {
      console.log(error.response.data.message);
      if (error.response.data.message === "Ingresos no encontrados") {
        dispatch(onLoadIngresosConsList([]));
        dispatch(onSetTotalesIngresoCons(""));
      }
    }
  };

  const startIngresosList = async (fil_fecha, prm1, prm2) => {
    try {
      const { data } = await getAllingresos("usuario", fil_fecha, prm1, prm2);
      console.log(data);
      const dataFormateada = formatearDataIngresosToTable(data);

      dispatch(onLoadIngresosList(dataFormateada));

      const total = dataFormateada.reduce((acc, montoAct) => {
        return acc + montoAct.monto;
      }, 0);
      dispatch(onSetTotalesIngreso(total.toFixed(2)));
    } catch (error) {
      console.log(error.response.data.message);
      if (error.response.data.message === "Ingresos no encontrados") {
        dispatch(onLoadIngresosList([]));
        dispatch(onSetTotalesIngreso(""));
      }
    }
  };

  const changeDataIngreso = (dataIngreso) => {
    console.log(dataIngreso);
    dispatch(onSetActiveIngreso(dataIngreso));
  };

  const startSavingIngreso = async (dataIngreso) => {
    dispatch(clearErrorIngresoMsg());
    try {
      console.log(ingresoActivo);
      console.log(dataIngreso);
      console.log(formatearDataIngresoToBD(dataIngreso));

      if (ingresoActivo) {
        //actualizar
        const { data } = await updateIngreso(
          ingresoActivo.id,
          formatearDataIngresoToBD(dataIngreso)
        );
        // console.log(data);
        dispatch(onUpdateIngreso(formatearDataIngresosToTable([data])[0]));
        dispatch(onSetActiveIngreso(formatearDataIngresosToTable([data])[0]));
        //
      } else {
        //registrar
        const { data } = await createIngreso(
          formatearDataIngresoToBD(dataIngreso)
        );
        dispatch(onSaveIngreso(formatearDataIngresosToTable([data])[0]));
        dispatch(onSetActiveIngreso(formatearDataIngresosToTable([data])[0]));
      }

      dispatch(onChangeRegErrIngreso({ msg: "Sin errores", error: "" }));
    } catch (error) {
      console.log(error.response.data.message);
      dispatch(
        onChangeRegErrIngreso({
          msg: "Hay errores",
          error: comprobarErrorIngreso(error.response.data.message),
        })
      );
    }
  };

  const startDeletingIngresos = async (arrIdIngresos = []) => {
    try {
      if (arrIdIngresos.length === 0) {
        await deleteIngreso(ingresoActivo.id);
      } else {
        for (const i of arrIdIngresos) {
          await deleteIngreso(i);
        }
      }
      dispatch(onDeleteIngreso(arrIdIngresos));
      console.log(ingresosList);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    //* Propiedades
    ingresosList,
    ingresosConsList,
    ingresoActivo,
    errorMsgRegIngreso,
    totalIngCons,
    totalIngresos,

    //* Métodos
    startIngresosConsList,
    startIngresosList,
    changeDataIngreso,
    startSavingIngreso,
    startDeletingIngresos,
  };
};
