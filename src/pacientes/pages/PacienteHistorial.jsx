import { useEffect } from "react";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useAntecedenteStore, usePacienteStore, useUiStore } from "../../hooks";
import {
  CalendarMonth,
  ContactPage,
  MedicalInformation,
} from "@mui/icons-material";
import { InfoPagePaciente } from "./InfoPagePaciente";
import { HistorialPagePaciente } from "./HistorialPagePaciente";
import { useParams } from "react-router-dom";
import { ProxCitasPagePaciente } from "./ProxCitasPagePaciente";

//
//
//
export const PacienteHistorial = () => {
  //

  const { changePage, hookTabs, handleChangeTabs } = useUiStore();

  const { pacienteActivo, startLoadPaciente } = usePacienteStore();

  const { startLoadAntecedentes } = useAntecedenteStore();

  // const [hookTabs, setHookTabs] = useState(
  //   parseInt(localStorage.getItem("lastTabPaciente")) || 0
  // );

  useEffect(() => {
    handleChangeTabs(parseInt(localStorage.getItem("lastTabPaciente")) || 0);
  }, []);

  const { id_pac } = useParams();

  useEffect(() => {
    changePage();
    startLoadPaciente(id_pac);
    startLoadAntecedentes(id_pac);
  }, []);

  return (
    <div>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        padding="0px 20px"
        position="sticky"
        top="0px"
        zIndex="10000"
        boxShadow="3px 3px 5px rgba(0, 0, 0, 0.5)"
        sx={{
          // backgroundColor: "rgba(245, 247, 250, 0.9)",
          backgroundColor: "myBgColor.main",
          // borderBottom: "2px solid grey",
        }}
      >
        <Typography
          variant="h3"
          color="black"
          fontWeight="bold"
          fontSize="25px"
          fontStyle="italic"
          sx={{ textShadow: "0px 2px 2px rgba(0,0,0,0.20)  !important" }}
        >
          Paciente:{" "}
          <span style={{ color: "#9c27b0" }}>
            {pacienteActivo && pacienteActivo.nombre}
          </span>
        </Typography>

        <Tabs
          value={hookTabs}
          onChange={(event, newValue) => {
            handleChangeTabs(newValue);
          }}
        >
          <Tab
            sx={{ color: "black" }}
            icon={<ContactPage />}
            label="INFORMACIÓN"
          />
          <Tab
            sx={{ color: "black" }}
            icon={<CalendarMonth />}
            label="PRÓXIMAS CITAS"
          />
          <Tab
            sx={{ color: "black" }}
            icon={<MedicalInformation />}
            label="HISTORIAL"
          />
        </Tabs>
      </Box>

      <>
        {hookTabs === 0 && <InfoPagePaciente />}
        {hookTabs === 1 && <ProxCitasPagePaciente />}
        {hookTabs === 2 && <HistorialPagePaciente />}
      </>
    </div>
  );
};
