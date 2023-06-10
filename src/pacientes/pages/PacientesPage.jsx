import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import {
  ButtonCustom,
  CustomAlert,
  CustomTable,
  DeleteConfirm,
  Topbar,
} from "../../ui";

import { usePacienteStore, useUiStore } from "../../hooks";

import { FormModalPac } from "../components";

import { DeleteForever, PersonAddAlt } from "@mui/icons-material";

const TABLE_HEAD = [
  { id: "nombre", label: "Nombre", alignLeft: true },
  { id: "cedula", label: "Cédula", alignLeft: true },
  { id: "edad", label: "Edad", alignLeft: true },
  { id: "sexo", label: "Sexo", alignLeft: true },
  { id: "telefono", label: "Teléfono", alignLeft: true },
  { id: "email", label: "Email", alignLeft: true },
  { id: "responsable", label: "Responsable", alignLeft: true },
  { id: "fecha", label: "Fecha", alignLeft: true },
];

export const PacientesPage = () => {
  //control form
  const [stateModalPac, setStateModalPac] = useState(false);

  const { changePage } = useUiStore();
  const {
    pacientesList,
    pacienteActivo,
    startLoadPacientes,
    startDeletingPaciente,
    changeTitleFormReg,
  } = usePacienteStore();

  useEffect(() => {
    console.log("PacientePage");
    changePage();
  }, []);

  useEffect(() => {
    startLoadPacientes();
  }, []);

  //funcion abrir modal registrar
  const openModalPaciente = () => {
    changeTitleFormReg("Registro de paciente");
    // changeModalFormReg(true);
    setStateModalPac(true);
  };
  //funcion abrir modal editar
  const openModalPacienteEdit = () => {
    changeTitleFormReg("Editar datos del paciente");
    // changeModalFormReg(true);
    setStateModalPac(true);
  };
  //controlDialog
  const [openDialogDelete, setOpenDialogDelete] = useState(false);

  const handleOpenDialogDel = () => {
    setOpenDialogDelete(true);
  };

  //control alert
  const [stateSnackbar, setStateSnackbar] = useState(false);
  const handleCloseSnackbar = () => {
    setStateSnackbar(false);
  };
  const handleOpenSnackbar = () => {
    setStateSnackbar(true);
  };

  const [msgAlertDel, setMsgAlertDel] = useState("");

  //funcion eliminar registro paciente y eliminar varios registros
  const deleteRegisterPaciente = (selected = []) => {
    startDeletingPaciente(selected);
    if (selected.length <= 1) {
      setMsgAlertDel("El registro del paciente fue eliminado.");
    } else {
      setMsgAlertDel("Los registros fueron eliminados exitosamente.");
    }
    handleOpenSnackbar();
  };

  const BtnToolbarTable = ({ bgHeaderColor }) => {
    return (
      <ButtonCustom
        altura={"40px"}
        colorf="white"
        colorh="black"
        colort="black"
        colorth="celesteNeon.main"
        txt_b={"Registrar Paciente"}
        fontW="bold"
        iconB={<PersonAddAlt />}
        onClick={openModalPaciente}
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
          "linear-gradient(rgba(250,250,250, 0.1),rgba(250,250,250, 0.1)) , url(/assets/img/fondos/pacientesPage.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
      }}
    >
      <Topbar />
      <Box
        margin="0px 20px"
        display="flex"
        justifyContent="end"
        padding="15px"
        borderRadius="10px"
        className="box-shadow animate__animated animate__fadeIn"
        sx={{
          backgroundColor: "rgba(255,255,255,0.7)",
        }}
      >
        <CustomTable
          TABLE_HEAD={TABLE_HEAD}
          DATALIST={pacientesList}
          withToolbar
          withBoxSearch
          withButton
          iconosEnFila={false}
          btnToolbarTable={BtnToolbarTable}
          // columnaABuscarPri="fecha"
          columnaABuscarPri="nombre"
          searchWhat={"Buscar pacientes ..."}
          txt_header={"Lista de pacientes"}
          // bgHeaderColor={""}
          bgColorPagination="rgba(255,255,255,0.7)"
          dataOmitida={9}
          openModalEdit={openModalPacienteEdit}
          funcionBtnTblDelete={handleOpenDialogDel}
          funcionDeleteVarious={deleteRegisterPaciente}
          routePaciente={(rowId) => `${rowId}/historial`}
        />

        <FormModalPac
          openModalForm={stateModalPac}
          setOpenModalForm={setStateModalPac}
        />

        <DeleteConfirm
          stateOpen={openDialogDelete}
          setStateOpen={setOpenDialogDelete}
          message={
            <>
              ¿Está segura que desea eliminar el registro de
              <span style={{ color: "#9c27b0" }}>
                {" "}
                {pacienteActivo !== null &&
                  `${pacienteActivo.nombre} - ${pacienteActivo.cedula}`}
              </span>
              ?
            </>
          }
          funcionDelete={deleteRegisterPaciente}
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
      </Box>
    </div>
  );
};
