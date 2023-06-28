import { useDispatch, useSelector } from "react-redux";
import {
  changeRegisterErrorOdont,
  clearErrorMessageOdont,
  onChangePiezasDentales,
  onSetActiveTool,
  onSetOdontogramaConsAct,
  onSetPiezaActiva,
  onSetPiezasListOdon,
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
  convertOdonListPiezas,
  formatearDataOdontograma,
  formatearDataPiezaDentalToBD,
  verifyPiezaDentalEmpty,
} from "../pacientes/helpers";

//
//

export const useOdontogramaStore = () => {
  //

  const dispatch = useDispatch();

  const {
    toolOdontActiva,
    odontogramaActual,
    errorMsgRegOdontog,
    piezasListOdon,
    piezaActiva,
  } = useSelector((state) => state.odontograma);

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

  const startLoadOdontogramas = async () => {
    try {
      const { data } = await getOdontogramas(
        "consulta",
        consultaActiva.id_consulta
      );

      // console.log(data);
      // console.log(formatearDataOdontograma(data[0]));

      dispatch(onSetOdontogramaConsAct(formatearDataOdontograma(data[0])));

      dispatch(onSetPiezasListOdon(convertOdonListPiezas(data[0].piezas)));

      //
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);

      dispatch(onSetOdontogramaConsAct({ piezas: [], fecha_odontograma: "" }));

      dispatch(onSetPiezasListOdon([]));
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

      // await startLoadOdontogramas();

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

      //
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);
    } finally {
      await startLoadOdontogramas();
    }
  };

  const onChangePiezaActiva = (pieza) => {
    dispatch(onSetPiezaActiva(pieza));
  };

  const updateNotaPiezaDental = async (nota) => {
    try {
      await updatePiezaDental(piezaActiva.id, { nota_dent: nota });
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);
    } finally {
      await startLoadOdontogramas();
    }
  };

  //
  return {
    //* Propiedades
    toolOdontActiva,
    odontogramaActual,
    errorMsgRegOdontog,
    piezasListOdon,
    piezaActiva,

    //* Métodos
    changeToolOdonto,
    updateOdontoActual,
    setearOdontoActual,
    startSavingOdontograma,
    startLoadOdontogramas,
    startDeletingOdontograma,
    onChangePiezaActiva,
    updateNotaPiezaDental,
  };
};
