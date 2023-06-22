import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { DeleteForever } from "@mui/icons-material";
import { Calendar } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "./dragAndDrop.css";
import "./react-big-calendar.css";
import { getMessagesES } from "../helpers/getMessages";
import { localizer } from "../helpers/calendarLocalizer";
import { AgendaModal, CalendarEvent, ViewAgendaTable } from "../components/";
import { CustomAlert, DeleteConfirm, Topbar } from "../../ui";
import { useAgendaStore, usePacienteStore, useUiStore } from "../../hooks";
import { addMonths } from "date-fns";

const DnDCalendar = withDragAndDrop(Calendar);
import * as dates from "date-arithmetic";
import dayjs from "dayjs";
import { extraerFecha2 } from "../helpers/formatedDataCite";
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
    stateOpenVCita,
    startLoadCitesAgenda,
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
    console.log("aaa");
    changePage();
    startLoadCites();
    startLoadPacientes();
  }, []);

  const today = new Date();

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: event.estado === "Pendiente" ? "#116482" : "#d32f2f",
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
    localStorage.setItem("lastView", event);
    setLastView(event);
  };

  //click en la cita
  const onSelect = (event) => {
    changeDataCite(event);
  };

  //iniciar el arraste (drag) de la cita
  const onSelectDrag = ({ event }) => {
    changeDataCite(event);
  };

  //funcion se activa al seleccionar uno o varios slots

  const clickSlot = (slotInfo) => {
    if (!stateOpenVCita) {
      const { start, end } = slotInfo;

      changeDataCite({
        start,
        end,
      });

      handleOpenModalAgenda();
    }
  };

  //soltar la cita (Drop) la cita
  const onEventDropResizable = (data) => {
    const { start, end, event } = data;
    startUpdatingCita(event.fecha, event.hora, {
      statePacList: event.id_paciente,
      stateDatePicker: start,
      stateTimeIni: start,
      stateTimeFin: end,
      stateMotivo: event.motivo,
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
  const deleteRegisterCita = async () => {
    await startDeletingCite();
    handleOpenSnackbar();
  };

  const [rangeFecha, setRangeFecha] = useState({ fechaIni: "", fechaFin: "" });

  ViewAgendaTable.title = (start, { localizer }) => {
    console.log(start);

    // const end = dates.add(start, 1, "month");

    const end = addMonths(start, 1);
    console.log(end);
    const fechaIni = start
      .toLocaleString("sv-SE", { hour12: false })
      .split(" ")[0];
    const fechaFin = end
      .toLocaleString("sv-SE", { hour12: false })
      .split(" ")[0];
    console.log(fechaIni);
    console.log(fechaFin);

    // setRangeFecha({ fechaIni, fechaFin });
    console.log("aaaa");
    // startLoadCitesAgenda(fechaIni, fechaFin);
    return localizer.format({ start, end }, "agendaHeaderFormat");
  };

  ViewAgendaTable.navigate = (date, action) => {
    console.log(date);
    console.log(action);
    const fechaIni = date.toLocaleString("sv-SE", { hour12: false }).split(" ");
    console.log(fechaIni);

    switch (action) {
      case "PREV":
        console.log("PREV");
        const datePREV = addMonths(date, -1); //dates.add(date, -1, "month");
        console.log(datePREV);
        console.log("fi -> " + extraerFecha2(datePREV));
        console.log("ff -> " + extraerFecha2(date));
        startLoadCitesAgenda(extraerFecha2(datePREV), extraerFecha2(date));
        return datePREV;

      case "NEXT":
        const dateNEXT = addMonths(date, 1); //dates.add(sDate, 1, "month");
        const fi = extraerFecha2(dateNEXT);
        const ff = extraerFecha2(addMonths(dateNEXT, 1));
        console.log(fi);
        console.log(ff);
        startLoadCitesAgenda(fi, ff);
        return dateNEXT;

      //
      default:
        console.log("TODAY?");
        return date;
    }
  };

  const navegationFn = (newDate, view, action) => {
    console.log(newDate, view, action);
    console.log(extraerFecha2(newDate));
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
          selectable
          formats={{ dayRangeHeaderFormat }}
          views={{
            month: true,
            week: true,
            day: true,
            agenda: ViewAgendaTable,
          }}
          culture="es"
          localizer={localizer}
          events={citasList}
          defaultView={lastView}
          startAccessor="start"
          endAccessor="end"
          style={{
            width: "100%",
            height: "calc(100vh - 96px)",
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
          onDragStart={onSelectDrag}
          onEventDrop={onEventDropResizable}
          resizable
          onEventResize={onEventDropResizable}
          onSelectSlot={clickSlot}
          onNavigate={navegationFn}
          //bloquear la expansion en la vista de mes
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
              {activeCita && ` ${activeCita.paciente}`}
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
