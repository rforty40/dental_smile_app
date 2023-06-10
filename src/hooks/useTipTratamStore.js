import { useDispatch, useSelector } from "react-redux";
import {
  createTipoTratam,
  deleteTipoTratam,
  getTipoDeTratam,
  updateTipoTratam,
} from "../api/dashboard.api";

import {
  clearErrorTipTratamMsg,
  onChangeRegErrTipTratam,
  onDeleteTipoTratam,
  onLoadTipoTratamList,
  onSaveTipoTratam,
  onSetActiveTipoTratam,
  onUpdateTipoTratam,
} from "../store";

import {
  comprobarErrorTipTratam,
  formatearDataTipTratamToBD,
  formatearDataTipTratamToTable,
} from "../dashboard/helpers";

//
//
//
//
//

export const useTipTratamStore = () => {
  //

  const dispatch = useDispatch();

  const { tipoTratamList, tipoTratamActivo, errorMsgRegTipoTratam } =
    useSelector((state) => state.tipoTratam);

  //funciones
  const startLoadTipTratamList = async (type, param2) => {
    try {
      const { data } = await getTipoDeTratam(type, param2);
      console.log(data);
      dispatch(onLoadTipoTratamList(formatearDataTipTratamToTable(data)));
      dispatch(clearErrorTipTratamMsg());
    } catch (error) {
      console.log(error.response.data.message);
      dispatch(
        onChangeRegErrTipTratam({ msg: error.response.data.message, error: "" })
      );
    }
  };

  const changeDataTipTratam = (dataTipTratam) => {
    dispatch(onSetActiveTipoTratam(dataTipTratam));
  };

  const startSavingTipTratam = async (dataTipTratam) => {
    dispatch(clearErrorTipTratamMsg());
    try {
      if (dataTipTratam.id) {
        //actualizar
        const { data } = await updateTipoTratam(
          dataTipTratam.id,
          formatearDataTipTratamToBD(dataTipTratam)
        );

        // console.log(data);
        dispatch(onUpdateTipoTratam(formatearDataTipTratamToTable([data])[0]));
        dispatch(
          onSetActiveTipoTratam(formatearDataTipTratamToTable([data])[0])
        );
        //
      } else {
        //registrar
        const { data } = await createTipoTratam(
          formatearDataTipTratamToBD(dataTipTratam)
        );
        dispatch(onSaveTipoTratam(formatearDataTipTratamToTable([data])[0]));
        dispatch(
          onSetActiveTipoTratam(formatearDataTipTratamToTable([data])[0])
        );
      }

      dispatch(onChangeRegErrTipTratam({ msg: "Sin errores", error: "" }));
    } catch (error) {
      console.log(error.response.data.message);
      dispatch(
        onChangeRegErrTipTratam({
          msg: "Hay errores",
          error: comprobarErrorTipTratam(error.response.data.message),
        })
      );
    }
  };

  const startDeletingTipTratam = async (arrIdTipTratam = []) => {
    try {
      if (arrIdTipTratam.length === 0) {
        await deleteTipoTratam(tipoTratamActivo.id);
      } else {
        for (const i of arrIdTipTratam) {
          await deleteTipoTratam(i);
        }
      }
      dispatch(onDeleteTipoTratam(arrIdTipTratam));
    } catch (error) {
      console.log(error);
    }
  };

  return {
    //* Propiedades
    tipoTratamList,
    tipoTratamActivo,
    errorMsgRegTipoTratam,
    //* Métodos
    startLoadTipTratamList,
    changeDataTipTratam,
    startSavingTipTratam,
    startDeletingTipTratam,
  };
};
