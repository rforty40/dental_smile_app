import { useDispatch, useSelector } from "react-redux";
import {
  onLoadIngresosConsList,
  onSetActiveIngreso,
  onSetTotalesIngresoCons,
} from "../store/dashboard/ingresosSlice";
import { getAllingresos } from "../api/dashboard.api";
import { formatearDataConsIngToTable } from "../dashboard/helpers";

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
  } = useSelector((state) => state.ingresos);

  //funciones
  const startIngresosConsList = async (fil_tipo, fil_fecha, prm1, prm2) => {
    try {
      const { data } = await getAllingresos(fil_tipo, fil_fecha, prm1, prm2);
      // console.log(data);
      // console.log(formatearDataConsIngToTable(data));
      const dataFormateada = formatearDataConsIngToTable(data);
      dispatch(onLoadIngresosConsList(dataFormateada));

      const total = dataFormateada.reduce((acc, totalAct) => {
        return acc + parseFloat(totalAct.total);
      }, 0);

      dispatch(onSetTotalesIngresoCons(total));
    } catch (error) {
      console.log(error.response.data.message);
      if (error.response.data.message === "Ingresos no encontrados") {
        dispatch(onLoadIngresosConsList([]));
        dispatch(onSetTotalesIngresoCons(""));
      }
    }
  };

  const changeDataIngreso = (dataIngreso) => {
    dispatch(onSetActiveIngreso(dataIngreso));
  };

  // const startSavingProced = async (dataProced) => {
  //   dispatch(clearErrorProcedMsg());
  //   try {
  //     console.log(dataProced);
  //     console.log(formatearDataProcedToBD(dataProced));

  //     if (dataProced.id) {
  //       //actualizar
  //       const { data } = await updateProcedimiento(
  //         dataProced.id,
  //         formatearDataProcedToBD(dataProced)
  //       );
  //       // console.log(data);
  //       dispatch(onUpdateProced(formatearDataProcedToTable([data])[0]));
  //       dispatch(onSetActiveProced(formatearDataProcedToTable([data])[0]));
  //       //
  //     } else {
  //       //registrar
  //       const { data } = await createProcedimiento(
  //         formatearDataProcedToBD(dataProced)
  //       );
  //       dispatch(onSaveProced(formatearDataProcedToTable([data])[0]));
  //       dispatch(onSetActiveProced(formatearDataProcedToTable([data])[0]));
  //     }

  //     dispatch(onChangeRegErrProced({ msg: "Sin errores", error: "" }));
  //   } catch (error) {
  //     console.log(error.response.data.message);
  //     dispatch(
  //       onChangeRegErrProced({
  //         msg: "Hay errores",
  //         error: comprobarErrorProced(error.response.data.message),
  //       })
  //     );
  //   }
  // };

  // const startDeletingProced = async (arrIdProced = []) => {
  //   try {
  //     if (arrIdProced.length === 0) {
  //       await deleteProcedimiento(procedActivo.id);
  //     } else {
  //       for (const i of arrIdProced) {
  //         await deleteProcedimiento(i);
  //       }
  //     }
  //     dispatch(onDeleteProced(arrIdProced));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return {
    //* Propiedades
    ingresosList,
    ingresosConsList,
    ingresoActivo,
    errorMsgRegIngreso,
    totalIngCons,

    //* Métodos
    startIngresosConsList,
    // startIngresosList,
    changeDataIngreso,
  };
};
