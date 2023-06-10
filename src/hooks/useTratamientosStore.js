import { useDispatch, useSelector } from "react-redux";
import {
  changeErrorLoadTratamientos,
  changeRegisterErrorTratam,
  clearErrorMessageTram,
  onDeleteTratam,
  onLoadTratamientosList,
  onSetActiveTratam,
} from "../store";
import {
  createComplicacion,
  createTratamiento,
  deleteComplicacion,
  deleteTratamiento,
  getTratamientos,
  updateComplicacion,
  updateTratamiento,
} from "../api/tratamientos.api";

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
    errorMsgRegTratam,
  } = useSelector((state) => state.consultas);

  //

  const changeDataTratam = (tratam) => {
    dispatch(onSetActiveTratam(tratam));
  };

  const startLoadTratamientos = async () => {
    try {
      const { data } = await getTratamientos(consultaActiva.id_consulta);

      dispatch(onLoadTratamientosList(data));
      dispatch(changeErrorLoadTratamientos(null));
      console.log(data);
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);
      dispatch(changeErrorLoadTratamientos(error.response.data.message));
    }
  };

  const crudComplicaciones = async (dataArr, delArr, tratamIdReg) => {
    try {
      dataArr.forEach(async (complicacion) => {
        if (complicacion.txt_compli.length > 0) {
          //
          if (tratamIdReg > 0) {
            console.log(complicacion);
            //se registra todo
            await createComplicacion(tratamIdReg, {
              txt_compli: complicacion.txt_compli,
            });
          } else {
            console.log(complicacion);
            if (complicacion.id_compli === undefined) {
              //son registros nuevos
              await createComplicacion(tratamActivo.id_tratam, {
                txt_compli: complicacion.txt_compli,
              });
            } else {
              //se actualizan
              await updateComplicacion(complicacion.id_compli, {
                txt_compli: complicacion.txt_compli,
              });
            }
          }
        }
      });

      delArr.forEach(async (idCompli) => {
        if (idCompli !== undefined) {
          //eliminar
          await deleteComplicacion(idCompli);
        }
      });
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);
    }
  };
  // const crudProcedimientos = (dataArr, delArr, tratamIdReg) => {
  //   try {
  //   } catch (error) {
  //     console.log(error);
  //     console.log(error.response.data.message);
  //   }
  // };

  // const crudPrescripciones = (dataArr, delArr, tratamIdReg) => {
  //   try {
  //   } catch (error) {
  //     console.log(error);
  //     console.log(error.response.data.message);
  //   }
  // };

  const startSavingTratamiento = async (tratamiento) => {
    dispatch(clearErrorMessageTram());
    console.log(tratamiento.codigoCIE);
    console.log(tratamiento.arrComplicaciones);
    console.log(tratamiento.compDeleted);
    console.log(tratamiento.arrProcedimientos);
    console.log(tratamiento.proceDeleted);
    console.log(tratamiento.arrPrescripciones);
    console.log(tratamiento.prescDeleted);
    try {
      let tratamIdReg = 0;
      if (tratamActivo) {
        //actualizando
        await updateTratamiento(tratamActivo.id_tratam, {
          codigoCIE:
            tratamiento.codigoCIE === "" ? null : tratamiento.codigoCIE,
        });
      } else {
        //registrando
        const { data } = await createTratamiento(consultaActiva.id_consulta, {
          codigoCIE: tratamiento.codigoCIE,
        });

        tratamIdReg = data.id_tratam;
      }

      //registrar, actualizar, eliminar complicaciones
      await crudComplicaciones(
        tratamiento.arrComplicaciones,
        tratamiento.compDeleted,
        tratamIdReg
      );

      // //registrar, eliminar procedimientos
      // crudProcedimientos(
      //   tratamiento.arrProcedimientos,
      //   tratamiento.proceDeleted,
      //   tratamIdReg
      // );

      // //registrar, actualizar, eliminar prescripciones
      // crudPrescripciones(
      //   tratamiento.arrPrescripciones,
      //   tratamiento.prescDeleted,
      //   tratamIdReg
      // );

      dispatch(changeRegisterErrorTratam({ msg: "Sin errores", error: "" }));

      //
    } catch (error) {
      console.log(error.response.data.message);
      dispatch(
        changeRegisterErrorTratam({
          msg: "Hay errores",
          error: error.response.data.message,
        })
      );
    } finally {
      setTimeout(() => {
        startLoadTratamientos();
      }, 3000);
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
    errorMsgRegTratam,

    //* Métodos
    changeDataTratam,
    startLoadTratamientos,
    startDeletingTratamiento,
    startSavingTratamiento,
  };
};
