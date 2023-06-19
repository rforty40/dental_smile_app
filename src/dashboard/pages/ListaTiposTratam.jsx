import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { DeleteForever } from "@mui/icons-material";
import { MdPostAdd } from "react-icons/md";
import {
  ButtonCustom,
  CustomAlert,
  CustomSelect,
  CustomTable,
  DeleteConfirm,
} from "../../ui";
import { FormTipTratam } from "../components";
import { useDataStore, useTipTratamStore, useUiStore } from "../../hooks";

const TABLE_HEAD = [
  { id: "tipo_de_tratamiento", label: "Tipo de tratamiento", alignLeft: true },
  { id: "tratamiento", label: "Tratamiento", alignLeft: true },
];

/*******************************ListaTiposTratam*************************************** */

export const ListaTiposTratam = () => {
  //customs hooks store

  const { changePage } = useUiStore();

  const {
    tipoTratamList,
    tipoTratamActivo,
    errorMsgRegTipoTratam,
    startLoadTipTratamList,
    changeDataTipTratam,
    startDeletingTipTratam,
  } = useTipTratamStore();

  const { dataActiva } = useDataStore();

  useEffect(() => {
    changePage();
  }, []);

  //hooks
  const [stateTipo, setStateTipo] = useState("Todos");
  const [stateModalTipTratam, setStateModalTipTratam] = useState(false);
  const [titleFormTiTratam, setTitleFormTiTratam] = useState("");
  const [msgAlertDel, setMsgAlertDel] = useState("");

  //control de modal registrar y editar
  const openModalTipTratamReg = () => {
    changeDataTipTratam({});
    setTitleFormTiTratam("Registro de tipo de tratamiento");
    setStateModalTipTratam(true);
  };

  const openModalTipTratamEdit = () => {
    setTitleFormTiTratam("Editar tipo de tratamiento");
    setStateModalTipTratam(true);
  };

  //controlDialog Confirm Delete
  const [openDialogDelete, setOpenDialogDelete] = useState(false);

  const handleOpenDialogDel = () => {
    setOpenDialogDelete(true);
  };

  //control alert de eliminacion
  const [stateSnackbar, setStateSnackbar] = useState(false);
  const handleCloseSnackbar = () => {
    setStateSnackbar(false);
  };
  const handleOpenSnackbar = () => {
    setStateSnackbar(true);
  };

  //funcion eliminar uno o varias tipos de pagos
  const deleteRegisterTipTratam = (selected = []) => {
    startDeletingTipTratam(selected);

    if (selected.length <= 1) {
      setMsgAlertDel("Tipo de tratamiento fue eliminado.");
    } else {
      setMsgAlertDel(
        "Los tipos de tratamientos fueron eliminados exitosamente."
      );
    }
    handleOpenSnackbar();
  };

  //efectos secundarios
  useEffect(() => {
    let tipoConsulta = "";
    let param2 = "";
    switch (stateTipo) {
      case "Todos":
        tipoConsulta = "todos";
        param2 = "_";
        break;
      case "Tratamientos clínicos":
        tipoConsulta = "tipo";
        param2 = "Clinico";
        break;
      case "Tratamientos preventivos":
        tipoConsulta = "tipo";
        param2 = "Preventivo";
        break;
      case "Tratamientos curativos":
        tipoConsulta = "tipo";
        param2 = "Curativo";
        break;

      default:
        break;
    }
    startLoadTipTratamList(tipoConsulta, param2);
  }, [stateTipo]);

  //efecto secundario pasar la info del registro de la tabla
  //al tipo de pago activo
  useEffect(() => {
    changeDataTipTratam(dataActiva);
  }, [dataActiva]);

  return (
    <div
      style={{
        height: "100%",
        minHeight: "100vh",
        width: "100%",
        backgroundImage:
          "linear-gradient(rgba(250,250,250, 0.3),rgba(250,250,250, 0.3)) , url(/assets/img/fondos/listaTiposTratam.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
      }}
    >
      <Box
        className="box-shadow animate__animated animate__fadeInUp animate__faster"
        // margin="30px"
        padding="20px"
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ backgroundColor: "rgba(255,255,255,0.5)" }}
      >
        <Typography
          variant="h5"
          fontStyle="italic"
          fontWeight="bold"
          color="primary.main"
        >
          Lista de tipos de tratamiento
        </Typography>

        <Box
          display="flex"
          columnGap="20px"
          flexDirection="row"
          alignItems="end"
        >
          <CustomSelect
            lblText="Tipos de tratamiento:"
            altura="42px"
            ancho="330px"
            listOptions={[
              "Todos",
              "Tratamientos preventivos",
              "Tratamientos clínicos",
              "Tratamientos curativos",
            ]}
            value={stateTipo}
            onChange={(event) => {
              setStateTipo(event.target.value);
            }}
          />
          <ButtonCustom
            altura={"42px"}
            colorf={"primary.main"}
            colorh={"black"}
            colort={"white"}
            colorth={"celesteNeon.main"}
            txt_b={"Agregar tipo de tratamiento"}
            flexDir="row"
            txt_b_size="17px"
            // fontW="bold"
            propsXS={{ boxShadow: "3px 5px 5px rgba(0, 0, 0, 0.5)" }}
            iconB={<MdPostAdd />}
            onClick={openModalTipTratamReg}
          />
        </Box>
      </Box>
      <Box
        className="box-shadow animate__animated animate__fadeInUp animate__faster"
        margin="30px 30px 0px 30px"
        padding="10px"
        borderRadius="5px"
        // width="90%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{ backgroundColor: "rgba(255,255,255,0.8)" }}
      >
        {errorMsgRegTipoTratam.msg !==
        "No se encontraron los tipos de tratamientos" ? (
          <CustomTable
            TABLE_HEAD={TABLE_HEAD}
            DATALIST={tipoTratamList}
            withToolbar
            withBoxSearch
            withButton={false}
            iconosEnFila={false}
            columnaABuscarPri="tratamiento"
            searchWhat={"Buscar tipo de tratamiento..."}
            txt_header={"Tipos de tratamiento"}
            openModalEdit={openModalTipTratamEdit}
            funcionBtnTblDelete={handleOpenDialogDel}
            funcionDeleteVarious={deleteRegisterTipTratam}
          />
        ) : (
          <h3>{errorMsgRegTipoTratam.msg}</h3>
        )}
      </Box>
      <FormTipTratam
        openModalForm={stateModalTipTratam}
        setOpenModalForm={setStateModalTipTratam}
        title={titleFormTiTratam}
      />

      <DeleteConfirm
        stateOpen={openDialogDelete}
        setStateOpen={setOpenDialogDelete}
        message={
          <>
            <span style={{ color: "black" }}>
              {" "}
              ¿Está segura que desea eliminar
              {tipoTratamActivo !== null &&
                ` ${tipoTratamActivo.tratamiento} ?`}
            </span>
          </>
        }
        funcionDelete={deleteRegisterTipTratam}
      />

      <CustomAlert
        stateSnackbar={stateSnackbar}
        handleCloseSnackbar={handleCloseSnackbar}
        title={"Completado"}
        message={msgAlertDel}
        colorbg="blueSecondary.main"
        colortxt="white"
        iconAlert={<DeleteForever sx={{ color: "white" }} />}
      />
    </div>
  );
};
