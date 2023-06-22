import { useDispatch, useSelector } from "react-redux";
import {
  changeRegisterCiteError,
  clearErrorCiteMessage,
  onChangeOpenFormAgenda,
  onChangeTitleFormAgenda,
  onLoadCitas,
  onSaveCita,
  onSetActiveCita,
  onUpdateCita,
  onDeleteCita,
  onChangeOpenDeleteConf,
  onChangeBlockPaciente,
  onChangeOpenVCita,
  onLoadCitasAgenda,
} from "../store";
import {
  createCita,
  deleteCita,
  getCites,
  updateCita,
} from "../api/agenda.api";
import {
  comprobarErrorCite,
  formatearDataCiteToBD,
  formatedDataCite,
} from "../agenda/helpers/formatedDataCite";

//
//

export const useAgendaStore = () => {
  //

  const dispatch = useDispatch();

  const {
    stateOpenFormAgenda,
    titleFormAgenda,
    citasList,
    citasListAgenda,
    activeCita,
    errorRegCiteMessage,
    stateOpenDeleteConf,
    blockPaciente,
    stateOpenVCita,
  } = useSelector((state) => state.agenda);

  const changeStateFormAgenda = (flag) => {
    dispatch(onChangeOpenFormAgenda(flag));
  };

  const changeStateDeleteCofirm = (flag) => {
    dispatch(onChangeOpenDeleteConf(flag));
  };

  const changeTitleFormAgenda = (flag) => {
    dispatch(onChangeTitleFormAgenda(flag));
  };

  const changeBlockPaciente = (flag) => {
    dispatch(onChangeBlockPaciente(flag));
  };

  const changeStateViewCita = (flag) => {
    dispatch(onChangeOpenVCita(flag));
  };

  const changeDataCite = (dataCite) => {
    dispatch(onSetActiveCita(dataCite));
  };

  const startLoadCites = async () => {
    try {
      const { data } = await getCites("all", "_", "_");

      dispatch(onLoadCitas(formatedDataCite(data)));
      dispatch(onLoadCitasAgenda(formatedDataCite(data)));
    } catch (error) {
      console.log("Error cargando lista de citas");
      console.log(error);
    }
  };

  const startLoadCitesAgenda = async (fechaIni, fechaFin) => {
    try {
      console.log(fechaIni.replaceAll("/", "-"));
      console.log(fechaFin.replaceAll("/", "-"));
      const { data } = await getCites(
        "range",
        fechaIni, //.replaceAll("/", "-"),
        fechaFin //.replaceAll("/", "-")
      );
      dispatch(onLoadCitasAgenda(formatedDataCite(data)));
    } catch (error) {
      console.log("Error cargando lista de citas");
      console.log(error);
      console.log(error.response.data.message);
      dispatch(onLoadCitasAgenda([]));
    }
  };

  const startSavingCita = async (dataCite) => {
    dispatch(clearErrorCiteMessage());

    try {
      //registrando al backend
      const { data } = await createCita(formatearDataCiteToBD(dataCite));

      // console.log(data);

      //guardando y actualizando el store

      dispatch(onSaveCita(formatedDataCite([data])[0]));
      dispatch(onSetActiveCita(formatedDataCite([data])[0]));

      //actualizar errores
      dispatch(changeRegisterCiteError({ msg: "Sin errores", error: "" }));

      //
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);
      dispatch(
        changeRegisterCiteError({
          msg: "Hay errores",
          error: comprobarErrorCite(error.response.data.message),
        })
      );
    } finally {
      await startLoadCites();
    }
  };

  const startUpdatingCita = async (fechaCite, horaIni, dataCite) => {
    dispatch(clearErrorCiteMessage());

    try {
      //registrando al backend
      const { data } = await updateCita(
        fechaCite.replaceAll("/", "-"),
        horaIni,
        formatearDataCiteToBD(dataCite)
      );

      //guardando y actualizando el store
      dispatch(onUpdateCita(formatedDataCite([data])[0]));
      dispatch(onSetActiveCita(formatedDataCite([data])[0]));

      //actualizar errores
      dispatch(changeRegisterCiteError({ msg: "Sin errores", error: "" }));

      //
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);
      dispatch(
        changeRegisterCiteError({
          msg: "Hay errores",
          error: comprobarErrorCite(error.response.data.message),
        })
      );
    } finally {
      await startLoadCites();
    }
  };

  const startUpdatingCitaState = async (fechaCite, horaIni, dataCite) => {
    try {
      await updateCita(fechaCite.replaceAll("/", "-"), horaIni, dataCite);
      //
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);
    } finally {
      await startLoadCites();
    }
  };

  const startDeletingCite = async () => {
    try {
      await deleteCita(activeCita.fecha.replaceAll("/", "-"), activeCita.hora);

      dispatch(onDeleteCita());
    } catch (error) {
      console.log(error.response.data.message);
    } finally {
      startLoadCites();
    }
  };

  return {
    //* Propiedades
    citasList,
    citasListAgenda,
    activeCita,
    errorRegCiteMessage,
    stateOpenFormAgenda,
    titleFormAgenda,
    stateOpenDeleteConf,
    blockPaciente,
    stateOpenVCita,

    //* Métodos
    changeStateFormAgenda,
    changeStateDeleteCofirm,
    changeTitleFormAgenda,
    changeBlockPaciente,
    changeDataCite,
    startLoadCites,
    startLoadCitesAgenda,
    startSavingCita,
    startUpdatingCita,
    startDeletingCite,
    startUpdatingCitaState,
    changeStateViewCita,
  };
};
