import { Box } from "@mui/material";

import { Calendar } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";

import "./react-big-calendar.css";

import { AgendaModal, CalendarEvent } from "../components/";
import { useAgendaStore, usePacienteStore, useUiStore } from "../../hooks";
import { useEffect, useState } from "react";

import { CustomAlert, DeleteConfirm, Topbar } from "../../ui";
import { getMessagesES } from "../helpers/getMessages";
import { localizer } from "../helpers/calendarLocalizer";
import { DeleteForever } from "@mui/icons-material";

const DnDCalendar = withDragAndDrop(Calendar);

//
//

export const AgendaPage = () => {
  //store
  const { changePage } = useUiStore();

  const { startLoadPacientes } = usePacienteStore();

  const {
    citasList,
    activeCita,
    changeStateFormAgenda,
    changeTitleFormAgenda,
    startLoadCites,
    startUpdatingCita,
    changeDataCite,
    startDeletingCite,
    stateOpenDeleteConf,
    changeStateDeleteCofirm,
    changeBlockPaciente,
  } = useAgendaStore();

  //

  const handleOpenModalAgenda = () => {
    changeTitleFormAgenda("Agendar cita odontológica");
    changeStateFormAgenda(true);
    changeBlockPaciente(false);
  };

  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "week"
  );

  useEffect(() => {
    changePage();
    startLoadCites();
    startLoadPacientes();
  }, []);

  const today = new Date();

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor:
        event.esta_citaAgen === "Pendiente" ? "#116482" : "#d32f2f",
    };

    return {
      style,
    };
  };

  const dayRangeHeaderFormat = ({ start, end }, culture, local) =>
    local.format(start, "MMMM dd", culture) +
    " – " +
    // updated to use this localizer 'eq()' method
    local.format(
      end,
      local.eq(start, end, "month") ? "dd yyyy" : "MMMM dd yyyy",
      culture
    );

  //eventos del calendario
  const onViewChanged = (event) => {
    console.log(event);
    localStorage.setItem("lastView", event);
    setLastView(event);
  };

  const onSelect = (event) => {
    console.log("onSelect");

    changeDataCite(event);
  };

  const onSelectDrag = ({ event }) => {
    console.log("onSelectedDrag");
    changeDataCite(event);
  };

  //funcion se activa al seleccionar uno o varios slots
  const clickSlot = (slotInfo) => {
    // console.log(slotInfo);
    const { start, end } = slotInfo;

    changeDataCite({
      start,
      end,
    });

    handleOpenModalAgenda();
  };

  const onEventDropResizable = (data) => {
    console.log("onEventDropResizable");
    const { start, end, event } = data;

    startUpdatingCita(event.fecha_cita, event.hora_inicio, {
      statePacList: event.id_paciente,
      stateDatePicker: start,
      stateTimeIni: start,
      stateTimeFin: end,
      stateMotivo: event.moti_citaAgen,
    });
  };

  //control alert
  const [stateSnackbar, setStateSnackbar] = useState(false);
  const handleCloseSnackbar = () => {
    setStateSnackbar(false);
  };
  const handleOpenSnackbar = () => {
    setStateSnackbar(true);
  };

  //Confirm Dialog
  const deleteRegisterCita = () => {
    startDeletingCite();
    handleOpenSnackbar();
  };

  return (
    <div
      style={{
        height: "100%",
        minHeight: "100vh",
        width: "100%",
        backgroundImage: " url(/assets/img/fondos/agendaPage2.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
      }}
    >
      <Topbar />
      <Box
        margin="0px 20px 20px 20px"
        display="flex"
        justifyContent="end"
        className="box-shadow animate__animated animate__fadeIn"
      >
        <DnDCalendar
          // className="animate__animated animate__fadeIn"
          // selectable
          selectable
          formats={{ dayRangeHeaderFormat }}
          views={{
            month: true,
            week: true,
            day: true,
            agenda: true,
          }}
          culture="es"
          localizer={localizer}
          events={citasList}
          // defaultView="week"
          defaultView={lastView}
          startAccessor="start"
          endAccessor="end"
          style={{
            width: "100%",
            height: "calc(100vh - 100px)",
            backgroundColor: "transparent",
            padding: "20px",
            borderRadius: "10px",
          }}
          messages={getMessagesES()}
          eventPropGetter={eventStyleGetter}
          components={{
            event: CalendarEvent,
          }}
          timeslots={lastView === "week" ? 4 : 1} // number of per section
          step={15} // number of minutes per timeslot
          min={
            // start time 7:00am
            new Date(today.getFullYear(), today.getMonth(), today.getDate(), 7)
          }
          // end time 8:00pm
          max={
            new Date(today.getFullYear(), today.getMonth(), today.getDate(), 20)
          }
          onView={onViewChanged}
          onSelectEvent={onSelect}
          // onKeyPressEvent={onSelect}
          onDragStart={onSelectDrag}
          // onDragOver={onSelectDrag}
          onEventDrop={onEventDropResizable}
          resizable
          onEventResize={onEventDropResizable}
          onSelectSlot={clickSlot}
          resizableAccessor={() => lastView !== "month"}

          // tooltipAccessor={null}
          // dayLayoutAlgorithm={"no-overlap"}
        />

        <AgendaModal />
      </Box>

      <DeleteConfirm
        stateOpen={stateOpenDeleteConf}
        setStateOpen={changeStateDeleteCofirm}
        message={
          <>
            ¿Está segura que desea eliminar la cita agendada de
            <span style={{ color: "#9c27b0" }}>
              {" "}
              {JSON.stringify(activeCita) !== "{}" &&
                activeCita.Paciente !== undefined &&
                `${activeCita.Paciente}`}
            </span>
            ?
          </>
        }
        funcionDelete={deleteRegisterCita}
      />
      <CustomAlert
        stateSnackbar={stateSnackbar}
        handleCloseSnackbar={handleCloseSnackbar}
        title={"Completado"}
        message={"Cita eliminada"}
        colorbg="blueSecondary.main"
        colortxt="white"
        iconAlert={<DeleteForever sx={{ color: "white" }} />}
      />
    </div>
  );
};
