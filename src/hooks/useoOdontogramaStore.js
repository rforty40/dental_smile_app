import { useDispatch, useSelector } from "react-redux";
import { onChangeOdontogramaAct, onSetActiveTool } from "../store";

//
//

export const useOdontogramaStore = () => {
  //

  const dispatch = useDispatch();

  const { toolOdontActiva, odontogramaActual } = useSelector(
    (state) => state.odontograma
  );

  //

  const changeToolOdonto = (tool) => {
    dispatch(onSetActiveTool(tool));
  };

  const updateOdontoActual = (diente) => {
    dispatch(onChangeOdontogramaAct(diente));
  };
  // const startLoadDiagnosticos = async () => {
  //   try {
  //     const { data } = await getDiagnosticos(consultaActiva.id_consulta);

  //     dispatch(onLoadDiagnosticosList(formatearDataDiagToTable(data)));
  //   } catch (error) {
  //     console.log(error);
  //     console.log(error.response.data.message);
  //     dispatch(onLoadDiagnosticosList([]));
  //   }
  // };

  // const startSavingDiagnostico = async (diagData) => {
  //   dispatch(clearErrorMessageCons());
  //   try {
  //     if (diagActivo) {
  //       //actualizar
  //       const { data } = await updateDiagnostico(
  //         diagActivo.id,
  //         formatearDataDiagToBD(diagData)
  //       );

  //       dispatch(onUpdateDiag(formatearDataDiagToTable([data])[0]));
  //       dispatch(onSetActiveDiag(formatearDataDiagToTable([data])[0]));
  //     } else {
  //       //registrar

  //       const { data } = await createDiagnostico(
  //         consultaActiva.id_consulta,
  //         formatearDataDiagToBD(diagData)
  //       );

  //       dispatch(onSaveDiag(formatearDataDiagToTable([data])[0]));
  //       dispatch(onSetActiveDiag(formatearDataDiagToTable([data])[0]));
  //     }

  //     //actualizar errores
  //     dispatch(changeRegisterErrorCons({ msg: "Sin errores", error: "" }));

  //     //
  //   } catch (error) {
  //     console.log(error);
  //     console.log(error.response.data.message);
  //     dispatch(
  //       changeRegisterErrorCons({
  //         msg: "Hay errores",
  //         error: comprobarErrorDiag(error.response.data.message),
  //       })
  //     );
  //   }
  // };

  // const startDeletingDiagnostico = async () => {
  //   try {
  //     await deleteDiagnostico(diagActivo.id);
  //     dispatch(onDeleteDiag());
  //   } catch (error) {
  //     console.log(error.response.data.message);
  //   }
  // };

  return {
    //* Propiedades
    toolOdontActiva,
    odontogramaActual,

    //* Métodos
    changeToolOdonto,
    updateOdontoActual,
  };
};
