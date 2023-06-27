import { useDispatch, useSelector } from "react-redux";
import {
  changeRegisterErrorOdont,
  clearErrorMessageOdont,
  onChangePiezasDentales,
  onDeshacerCambios,
  onSetActiveTool,
  onSetOdontogramaAuxiliar,
  onSetOdontogramaConsAct,
} from "../store";
import {
  createOdontograma,
  createPiezaDental,
  deleteOdontograma,
  deletePiezaDental,
  getOdontogramas,
  updatePiezaDental,
} from "../api/consultas.api";
import {
  formatearDataOdontograma,
  formatearDataPiezaDentalToBD,
  verifyPiezaDentalEmpty,
} from "../pacientes/helpers";

//
//

export const useOdontogramaStore = () => {
  //

  const dispatch = useDispatch();

  const { toolOdontActiva, odontogramaActual, errorMsgRegOdontog } =
    useSelector((state) => state.odontograma);

  const { consultaActiva } = useSelector((state) => state.consultas);

  //

  const changeToolOdonto = (tool) => {
    dispatch(onSetActiveTool(tool));
  };

  const setearOdontoActual = (odontograma) => {
    dispatch(onSetOdontogramaConsAct(odontograma));
  };

  const updateOdontoActual = (piezas) => {
    dispatch(onChangePiezasDentales(piezas));
  };

  const desahacerCambios = () => {
    dispatch(onDeshacerCambios());
  };

  const startLoadOdontogramas = async () => {
    try {
      const { data } = await getOdontogramas(consultaActiva.id_consulta);

      dispatch(onSetOdontogramaConsAct(formatearDataOdontograma(data[0])));

      dispatch(onSetOdontogramaAuxiliar(formatearDataOdontograma(data[0])));
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);

      dispatch(onSetOdontogramaConsAct({ piezas: [], fecha_odontograma: "" }));

      dispatch(onSetOdontogramaAuxiliar({ piezas: [], fecha_odontograma: "" }));
    }
  };

  const startSavingOdontograma = async () => {
    dispatch(clearErrorMessageOdont());
    try {
      console.log(odontogramaActual);
      let id_odontograma = 0;

      if (Object.keys(odontogramaActual).length < 4) {
        //registro de odontograma
        const { data: dataOdon } = await createOdontograma(
          consultaActiva.id_consulta
        );
        id_odontograma = dataOdon.id_odontograma;
      } else {
        //actualizacion de las piezas dentales
        id_odontograma = odontogramaActual.id_odontograma;
      }

      for (const pieza of odontogramaActual.piezas) {
        //registro de pieza
        if (pieza.id === null && !verifyPiezaDentalEmpty(pieza)) {
          await createPiezaDental(
            id_odontograma,
            formatearDataPiezaDentalToBD(pieza)
          );
        }

        //actualizacion de pieza
        if (pieza.id !== null && !verifyPiezaDentalEmpty(pieza)) {
          await updatePiezaDental(
            pieza.id,
            formatearDataPiezaDentalToBD(pieza)
          );
        }

        //eliminacion de pieza
        if (pieza.id !== null && verifyPiezaDentalEmpty(pieza)) {
          await deletePiezaDental(pieza.id);
        }
      }

      await startLoadOdontogramas();

      dispatch(changeRegisterErrorOdont({ msg: "Sin errores", error: "" }));
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);

      dispatch(
        changeRegisterErrorOdont({
          msg: "Hay errores",
          error:
            error.response.data.message +
            " .Para mas información contactese con el administrador",
        })
      );
    }
  };

  const startDeletingOdontograma = async () => {
    try {
      await deleteOdontograma(odontogramaActual.id_odontograma);
    } catch (error) {
      console.log(error.response.data.message);
    } finally {
      await startLoadOdontogramas();
    }
  };
  return {
    //* Propiedades
    toolOdontActiva,
    odontogramaActual,
    errorMsgRegOdontog,

    //* Métodos
    changeToolOdonto,
    updateOdontoActual,
    setearOdontoActual,
    startSavingOdontograma,
    startLoadOdontogramas,
    startDeletingOdontograma,
    desahacerCambios,
  };
};
