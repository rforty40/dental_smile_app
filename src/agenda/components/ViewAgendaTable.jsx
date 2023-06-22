import { ButtonCustom, CustomTable } from "../../ui";

import { Box } from "@mui/material";
import { useAgendaStore } from "../../hooks";
import { MdPostAdd } from "react-icons/md";
import { useEffect } from "react";

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
  const { citasListAgenda } = useAgendaStore();

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
        // onClick={openModalPaciente}
      />
    );
  };

  useEffect(() => {
    console.log("se renderiza");
  }, []);

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
        // openModalEdit={openModalPacienteEdit}
        // funcionBtnTblDelete={handleOpenDialogDel}
        // funcionDeleteVarious={deleteRegisterPaciente}
        routePaciente={(row) => `/pacientes/${row.id_paciente}/historial`}
      />
    </Box>
  );
};
