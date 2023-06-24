import { useEffect, useState } from "react";

import { DeleteForever, NoteAdd } from "@mui/icons-material";
import { Box, Portal, Typography } from "@mui/material";
import {
  ButtonCustom,
  CustomAlert,
  CustomTable,
  DeleteConfirm,
} from "../../../ui";
import { FormModalExam } from "../../components/FormModalExam";
import { FormModalPlan } from "../../components/FormModalPlan";
import { useDataStore, useExamenesStore, usePlanesStore } from "../../../hooks";

const TABLE_HEAD_EXAM = [
  { id: "region_afectada", label: "Región afectada", alignLeft: true },
  { id: "enfermedad", label: "Enfermedad", alignLeft: true },
  { id: "descripcion", label: "Descripción", alignLeft: true },
];

const TABLE_HEAD_PLAN_D = [
  { id: "examen_solicitado", label: "Examen solicitado", alignLeft: true },
  { id: "descripcion", label: "Descripción", alignLeft: true },
];

const TABLE_HEAD_PLAN_T = [
  { id: "tipo_de_tratamiento", label: "Tipo de Tratamiento", alignLeft: true },
  { id: "tratamiento", label: "Tratamiento", alignLeft: true },
  { id: "descripcion", label: "Descripción", alignLeft: true },
];

export const ExamPlanConsultaPage = () => {
  //

  //store
  const { dataActiva } = useDataStore();

  const { examenesList, changeDataExamen, startDeletingExam } =
    useExamenesStore();

  const { planesList, changeDataPlan, startDeletingPlan } = usePlanesStore();

  //hook abrir el formulario
  const [stateModalFormExam, setStateModalFormExam] = useState(false);
  const [stateModalFormPlan, setStateModalFormPlan] = useState(false);

  //hook cambiar titulo del formulario
  const [titleFormExa, setTitleFormExa] = useState("");
  const [titleFormPlan, setTitleFormPlan] = useState("");

  //hook tipo de plan
  const [stateTipPlan, setStateTipPlan] = useState("diagnostico");

  //hook controlDialog Eliminar
  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const [openDialogDeletePlan, setOpenDialogDeletePlan] = useState(false);

  //hook abrir Alert de Eliminación
  const [stateSnackbar, setStateSnackbar] = useState(false);

  //hook mensaje de alerta despues de la eliminacion de un registro
  const [msgAlertDel, setMsgAlertDel] = useState("");

  useEffect(() => {
    if (dataActiva[0] === "examenEsto") {
      changeDataExamen(dataActiva[1]);
    }
    if (dataActiva[0] === "planDiag") {
      changeDataPlan(dataActiva[1]);
    }
  }, [dataActiva]);

  //abrir el modal para crear un examen
  const openModalFormExam = () => {
    setStateModalFormExam(true);
    setTitleFormExa("Registrar examen estomatognático");
    changeDataExamen(null);
  };
  const openModalFormPlan = () => {
    setStateModalFormPlan(true);
    changeDataPlan(null);
  };

  //abrir el modal para editar examen
  const openModalExamEdit = () => {
    setStateModalFormExam(true);
    setTitleFormExa("Editar examen estomatognático");
  };
  const openModalPlanEdit = () => {
    setStateModalFormPlan(true);
  };

  //abrir confirm dialog eliminar
  const handleOpenDialogDel = () => {
    setOpenDialogDelete(true);
  };
  const handleOpenDialogDelPlan = () => {
    setOpenDialogDeletePlan(true);
  };

  //control alert
  const handleCloseSnackbar = () => {
    setStateSnackbar(false);
  };
  const handleOpenSnackbar = () => {
    setStateSnackbar(true);
  };

  //eliminar Examenes
  const deleteExamenes = async (selected = []) => {
    await startDeletingExam(selected);
    if (selected.length <= 1) {
      setMsgAlertDel("El examen estomatognático fue eliminado.");
    } else {
      setMsgAlertDel(
        "Los examenes estomatognáticos fueron eliminados exitosamente."
      );
    }
    handleOpenSnackbar();
  };

  //eliminar planes
  const deletePlanes = async () => {
    await startDeletingPlan();
    setMsgAlertDel("El plan fue eliminado.");
    handleOpenSnackbar();
  };

  return (
    <Box
      component="div"
      className="animate__animated animate__fadeInUp animate__faster"
      sx={{ display: "flex", flexDirection: "column", rowGap: "30px" }}
    >
      <Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            columnGap: "15px",
            backgroundColor: "primary.main",
            color: "white",
            padding: "10px 20px",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            Exámenes del sistema estomatognático
          </Typography>
          <ButtonCustom
            altura="45px"
            txt_b_size="14px"
            flexDir="column-reverse"
            colorf="transparent"
            colorh="transparent"
            colort="white"
            colorth="celesteNeon.main"
            txt_b="Agregar"
            fontW="bold"
            iconB={<NoteAdd />}
            propsXS={{ boxShadow: "none !important" }}
            onClick={openModalFormExam}
          />
        </Box>
        <CustomTable
          txt_header="examenEsto"
          TABLE_HEAD={TABLE_HEAD_EXAM}
          DATALIST={examenesList}
          withToolbar={false}
          withCheckbox={false}
          iconosEnFila={false}
          columnaABuscarPri="region_afectada"
          bgColorPagination="white"
          bgColorTable="rgba(255,255,255,0.5)"
          dataOmitida={3}
          openModalEdit={openModalExamEdit}
          funcionBtnTblDelete={handleOpenDialogDel}
          funcionDeleteVarious={deleteExamenes}
        />
      </Box>

      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            height: "55px",
            backgroundColor: "primary.main",
          }}
        >
          <Typography
            className="text-shadow"
            variant="h6"
            sx={{
              color: "white",
              paddingLeft: "20px",
            }}
          >
            Planes de diagnóstico, terapéutico y educacional
          </Typography>
        </Box>

        {/* planes de diagnostico */}
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              columnGap: "15px",
              backgroundColor: "myBgColor.main",
              color: "primary.main",
              padding: "10px 20px",
              alignItems: "center",
            }}
          >
            <Typography variant="h7" fontWeight="bold">
              Planes de Diagnóstico
            </Typography>
            <ButtonCustom
              altura="40px"
              flexDir="column-reverse"
              colorf="transparent"
              colorh="transparent"
              colort="primary.main"
              colorth="blueSecondary.main"
              iconB={<NoteAdd />}
              propsXS={{ boxShadow: "none !important" }}
              onClick={() => {
                openModalFormPlan();
                setTitleFormPlan("Registrar plan de diagnóstico");
                setStateTipPlan("de Diagnóstico");
              }}
            />
          </Box>
          <CustomTable
            txt_header="planDiag"
            TABLE_HEAD={TABLE_HEAD_PLAN_D}
            DATALIST={planesList[0]}
            withToolbar={false}
            withCheckbox={false}
            iconosEnFila={false}
            columnaABuscarPri="examen_solicitado"
            bgColorPagination="white"
            bgColorTable="rgba(255,255,255,0.5)"
            dataOmitida={2}
            openModalEdit={() => {
              openModalPlanEdit();
              setTitleFormPlan("Editar plan de diagnóstico");
              setStateTipPlan("de Diagnóstico");
            }}
            funcionBtnTblDelete={handleOpenDialogDelPlan}
          />
        </Box>
        {/* planes terapeuticos */}
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              columnGap: "15px",
              backgroundColor: "myBgColor.main",
              color: "primary.main",
              padding: "10px 20px",
              alignItems: "center",
              marginTop: "10px",
            }}
          >
            <Typography variant="h7" fontWeight="bold">
              Planes Terapéuticos
            </Typography>
            <ButtonCustom
              altura="40px"
              flexDir="column-reverse"
              colorf="transparent"
              colorh="transparent"
              colort="primary.main"
              colorth="blueSecondary.main"
              iconB={<NoteAdd />}
              propsXS={{ boxShadow: "none !important" }}
              onClick={() => {
                openModalFormPlan();
                setTitleFormPlan("Registrar plan terapéutico");
                setStateTipPlan("terapéutico");
              }}
            />
          </Box>
          <CustomTable
            txt_header="planDiag"
            TABLE_HEAD={TABLE_HEAD_PLAN_T}
            DATALIST={planesList[1]}
            withToolbar={false}
            withCheckbox={false}
            iconosEnFila={false}
            columnaABuscarPri="tipo_de_tratamiento"
            bgColorPagination="white"
            bgColorTable="rgba(255,255,255,0.5)"
            dataOmitida={3}
            openModalEdit={() => {
              openModalPlanEdit();
              setTitleFormPlan("Editar plan terapéutico");
              setStateTipPlan("terapéutico");
            }}
            funcionBtnTblDelete={handleOpenDialogDelPlan}
          />
        </Box>

        {/* planes educacionales */}
        <Box
          sx={{ display: "flex", flexDirection: "column", marginBottom: "0px" }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              columnGap: "15px",
              backgroundColor: "myBgColor.main",
              color: "primary.main",
              padding: "10px 20px",
              alignItems: "center",
              marginTop: "10px",
            }}
          >
            <Typography variant="h7" fontWeight="bold">
              Planes Educacionales
            </Typography>
            <ButtonCustom
              altura="40px"
              flexDir="column-reverse"
              colorf="transparent"
              colorh="transparent"
              colort="primary.main"
              colorth="blueSecondary.main"
              iconB={<NoteAdd />}
              propsXS={{ boxShadow: "none !important" }}
              onClick={() => {
                openModalFormPlan();
                setTitleFormPlan("Registrar plan educacional");
                setStateTipPlan("educacional");
              }}
            />
          </Box>
          <CustomTable
            txt_header="planDiag"
            TABLE_HEAD={[]}
            DATALIST={planesList[2]}
            withToolbar={false}
            withCheckbox={false}
            iconosEnFila={false}
            columnaABuscarPri=""
            bgColorPagination="white"
            bgColorTable="rgba(255,255,255,0.5)"
            dataOmitida={2}
            openModalEdit={() => {
              openModalPlanEdit();
              setTitleFormPlan("Editar plan educacional");
              setStateTipPlan("educacional");
            }}
            funcionBtnTblDelete={handleOpenDialogDelPlan}
          />
        </Box>
      </Box>
      <FormModalExam
        openModal={stateModalFormExam}
        setOpenModal={setStateModalFormExam}
        title={titleFormExa}
      />
      <FormModalPlan
        openModal={stateModalFormPlan}
        setOpenModal={setStateModalFormPlan}
        title={titleFormPlan}
        tipoPlan={stateTipPlan}
      />

      <DeleteConfirm
        stateOpen={openDialogDelete}
        setStateOpen={setOpenDialogDelete}
        message="¿Está segura que desea eliminar el examen estomatognático?"
        funcionDelete={deleteExamenes}
      />

      <DeleteConfirm
        stateOpen={openDialogDeletePlan}
        setStateOpen={setOpenDialogDeletePlan}
        message="¿Está segura que desea eliminar el plan?"
        funcionDelete={deletePlanes}
      />

      <Portal>
        <CustomAlert
          stateSnackbar={stateSnackbar}
          handleCloseSnackbar={handleCloseSnackbar}
          title={"Completado"}
          message={msgAlertDel}
          colorbg="blueSecondary.main"
          colortxt="white"
          iconAlert={<DeleteForever sx={{ color: "white" }} />}
        />
      </Portal>
    </Box>
  );
};
