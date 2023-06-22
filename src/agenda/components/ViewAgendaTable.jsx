import { useEffect } from "react";
import { Box } from "@mui/material";
import { MdPostAdd } from "react-icons/md";
import { ButtonCustom, CustomTable } from "../../ui";
import { useAgendaStore, useDataStore } from "../../hooks";

const TABLE_HEAD = [
  { id: "cuando", label: "¿Cuando?", alignLeft: true },
  { id: "hora", label: "Hora", alignLeft: true },
  { id: "fecha", label: "Fecha", alignLeft: true },
  { id: "paciente", label: "Paciente", alignLeft: true },
  { id: "telefono", label: "Teléfono", alignLeft: true },
  { id: "edad", label: "Edad", alignLeft: true },
  { id: "motivo", label: "Motivo", alignLeft: true },
  { id: "estado", label: "Estado", alignLeft: true },
];

//
//
//

export const ViewAgendaTable = () => {
  //

  const { dataActiva } = useDataStore();

  const {
    citasListAgenda,
    changeStateFormAgenda,
    changeTitleFormAgenda,
    changeBlockPaciente,
    changeDataCite,
    changeStateDeleteCofirm,
    startDeletingCite,
  } = useAgendaStore();

  const handleOpenModalAgenda = () => {
    changeDataCite({
      start: new Date(),
      end: new Date(0, 0, 0, new Date().getHours() + 2),
    });
    changeTitleFormAgenda("Agendar cita odontológica");
    changeStateFormAgenda(true);
    changeBlockPaciente(false);
  };

  const openFormEditCite = () => {
    changeTitleFormAgenda("Editar cita odontológica");
    changeStateFormAgenda(true);
    changeBlockPaciente(false);
  };
  const openFormDeleteCite = () => {
    changeStateDeleteCofirm(true);
  };

  const deleteRegisterCites = async (selected = []) => {
    await startDeletingCite(selected);
  };

  useEffect(() => {
    changeDataCite(dataActiva);
  }, [dataActiva]);

  //
  const BtnToolbarTable = () => {
    return (
      <ButtonCustom
        altura={"40px"}
        colorf="white"
        colorh="black"
        colort="black"
        colorth="celesteNeon.main"
        txt_b={"Registrar cita"}
        fontW="bold"
        iconB={<MdPostAdd />}
        onClick={handleOpenModalAgenda}
      />
    );
  };

  return (
    <Box display="flex" flexDirection="column" rowGap="20px" marginTop="20px">
      <CustomTable
        TABLE_HEAD={TABLE_HEAD}
        DATALIST={citasListAgenda}
        withToolbar
        withBoxSearch
        withButton
        iconosEnFila={false}
        btnToolbarTable={BtnToolbarTable}
        columnaABuscarPri="cuando"
        firstOrden="asc"
        searchWhat={"Buscar cita ..."}
        txt_header={"Lista de citas agendadas"}
        bgColorTable="white"
        dataOmitida={6}
        openModalEdit={openFormEditCite}
        funcionBtnTblDelete={openFormDeleteCite}
        funcionDeleteVarious={deleteRegisterCites}
        routePaciente={(row) => `/pacientes/${row.id_paciente}/historial`}
      />
    </Box>
  );
};
