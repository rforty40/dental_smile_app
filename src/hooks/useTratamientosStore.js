import { useDispatch, useSelector } from "react-redux";
import {
  changeErrorLoadTratamientos,
  onDeleteTratam,
  onLoadTratamientosList,
  onSetActiveTratam,
} from "../store";
import { deleteTratamiento, getTratamientos } from "../api/tratamientos.api";

//
//

export const useTratamientosStore = () => {
  //

  const dispatch = useDispatch();

  const {
    tratamientosList,
    tratamActivo,
    errorLoadTratamientos,
    consultaActiva,
    errorMsgRegCons,
  } = useSelector((state) => state.consultas);

  //

  const changeDataTratam = (tratam) => {
    dispatch(onSetActiveTratam(tratam));
  };

  const startLoadTratamientos = async () => {
    try {
      console.log(consultaActiva);
      const { data } = await getTratamientos(consultaActiva.id_consulta);
      console.log(data);
      dispatch(onLoadTratamientosList(data));
      dispatch(changeErrorLoadTratamientos(null));
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);
      dispatch(changeErrorLoadTratamientos(error.response.data.message));
    }
  };

  const startSavingTratamiento = async (tratamiento) => {
    console.log(tratamiento.codigoCIE);
    console.log(tratamiento.arrComplicaciones);
    console.log(tratamiento.compDeleted);
    try {
      if (tratamActivo) {
        //actualizando
      } else {
        //registrando
      }
    } catch (error) {
      console.log(error.response.data.message);
    } finally {
      // startLoadTratamientos();
    }
  };

  const startDeletingTratamiento = async () => {
    try {
      await deleteTratamiento(tratamActivo.id_tratam);
      dispatch(onDeleteTratam());
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  //
  return {
    //* Propiedades
    tratamientosList,
    tratamActivo,
    errorLoadTratamientos,
    errorMsgRegCons,

    //* Métodos
    changeDataTratam,
    startLoadTratamientos,
    startDeletingTratamiento,
    startSavingTratamiento,
  };
};
