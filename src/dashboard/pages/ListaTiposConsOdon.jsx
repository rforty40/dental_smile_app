import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { DeleteForever } from "@mui/icons-material";
import { MdPostAdd } from "react-icons/md";
import {
  ButtonCustom,
  CustomAlert,
  CustomTable,
  DeleteConfirm,
} from "../../ui";
import { FormTipCons } from "../components";
import { useDataStore, useTipConsStore, useUiStore } from "../../hooks";

const TABLE_HEAD = [
  { id: "tipo_de_consulta", label: "Tipo de consulta", alignLeft: true },
  { id: "precio", label: "Precio", alignLeft: true },
];

/*******************************ListaTiposConsultas*************************************** */

export const ListaTiposConsOdon = () => {
  //customs hooks store

  const { changePage } = useUiStore();

  const {
    tipoConsList,
    tipoConsActivo,
    startLoadTipConsList,
    changeDataTipCons,
    startDeletingTipCons,
  } = useTipConsStore();
  const { dataActiva } = useDataStore();

  //hooks

  const [stateModalTipCons, setStateModalTipCons] = useState(false);
  const [titleFormTipCons, setTitleFormTipCons] = useState("");
  const [msgAlertDel, setMsgAlertDel] = useState("");

  //control de modal registrar y editar
  const openModalTipConsReg = () => {
    setTitleFormTipCons("Registro de tipo de consulta");
    setStateModalTipCons(true);
  };

  const openModalTipConsEdit = () => {
    setTitleFormTipCons("Editar tipo de consulta");
    setStateModalTipCons(true);
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

  //funcion eliminar uno o varias tipos de consultas
  const deleteRegisterTipCons = async (selected = []) => {
    await startDeletingTipCons(selected);

    if (selected.length <= 1) {
      setMsgAlertDel("Tipo de consulta fue eliminado.");
    } else {
      setMsgAlertDel("Los tipos de consulta fueron eliminados exitosamente.");
    }
    handleOpenSnackbar();
  };

  //efectos secundarios
  useEffect(() => {
    changePage();
    startLoadTipConsList();
  }, []);

  //efecto secundario pasar la info del registro de la tabla
  //al tipo de consulta activo
  useEffect(() => {
    if (dataActiva[0] === "Tipos de consulta odontológica") {
      changeDataTipCons(dataActiva[1]);
    }
  }, [dataActiva]);

  const BtnToolbarTable = () => {
    return (
      <ButtonCustom
        altura={"42px"}
        colorf={"myBgColor.main"}
        colorh={"black"}
        colort={"black"}
        colorth={"celesteNeon.main"}
        txt_b={"Agregar tipo de consulta"}
        flexDir="row"
        txt_b_size="17px"
        fontW="bold"
        propsXS={{ boxShadow: "3px 5px 5px rgba(0, 0, 0, 0.5)" }}
        iconB={<MdPostAdd />}
        onClick={openModalTipConsReg}
      />
    );
  };
  return (
    <div
      style={{
        height: "100%",
        minHeight: "100vh",
        width: "100%",

        backgroundImage:
          "linear-gradient(rgba(250,250,250, 0.3),rgba(250,250,250, 0.3)) , url(/assets/img/fondos/listaTiposConsOdon.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
      }}
    >
      <Box
        className="box-shadow animate__animated animate__fadeInUp animate__faster"
        // margin="30px"
        padding="30px"
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ backgroundColor: "rgba(255,255,255,0.8)" }}
      >
        <Typography
          variant="h5"
          fontStyle="italic"
          fontWeight="bold"
          color="primary.main"
        >
          Lista de tipos de consultas odontológica
        </Typography>
      </Box>
      <Box
        className="box-shadow animate__animated animate__fadeInUp animate__faster"
        margin="50px 30px 0px 30px"
        padding="10px"
        borderRadius="5px"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{ backgroundColor: "rgba(255,255,255,0.5)" }}
      >
        <CustomTable
          TABLE_HEAD={TABLE_HEAD}
          DATALIST={tipoConsList}
          withToolbar
          withBoxSearch
          withButton
          btnToolbarTable={BtnToolbarTable}
          iconosEnFila={false}
          columnaABuscarPri="tipo_de_consulta"
          searchWhat={"Buscar tipo de consulta ..."}
          txt_header={"Tipos de consulta odontológica"}
          bgColorPagination="white"
          openModalEdit={openModalTipConsEdit}
          funcionBtnTblDelete={handleOpenDialogDel}
          funcionDeleteVarious={deleteRegisterTipCons}
        />
      </Box>
      <FormTipCons
        openModalForm={stateModalTipCons}
        setOpenModalForm={setStateModalTipCons}
        title={titleFormTipCons}
      />

      <DeleteConfirm
        stateOpen={openDialogDelete}
        setStateOpen={setOpenDialogDelete}
        message={
          <>
            <span style={{ color: "black" }}>
              {" "}
              ¿Está segura que desea eliminar
              {tipoConsActivo !== null &&
                ` ${tipoConsActivo.tipo_de_consulta} ?`}
            </span>
          </>
        }
        funcionDelete={deleteRegisterTipCons}
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
