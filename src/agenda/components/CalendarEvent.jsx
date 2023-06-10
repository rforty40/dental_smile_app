import { useState } from "react";
import {
  Box,
  ClickAwayListener,
  Tooltip,
  Typography,
  Zoom,
} from "@mui/material";

import { styled } from "@mui/material/styles";

import { ViewCita } from "./ViewCita";
import { useNavigate } from "react-router-dom";

const StyledTooltip = styled((props) => (
  <Tooltip classes={{ popper: props.className }} {...props} />
))`
  & .MuiTooltip-tooltipArrow {
    background-color: transparent;
    margin:0px;
    padding:0px;
    max-width: none;

  }

  & .MuiTooltip-arrow {
    ::before {
      background-color:  black;
    
    },
   
  }
`;

//
//
//
//
export const CalendarEvent = ({ event }) => {
  //

  const [open, setOpen] = useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
    return;
  };

  const handleTooltipOpen = () => {
    setOpen(!open);
  };

  const {
    Cuando,
    fecha_cita,
    hora_inicio,
    hora_fin,
    id_paciente,
    Paciente,
    moti_citaAgen,
    esta_citaAgen,
  } = event;

  const navigate = useNavigate();

  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <div>
        <StyledTooltip
          title={<ViewCita closeCitaView={handleTooltipClose} />}
          arrow
          placement="top"
          onClose={handleTooltipClose}
          open={open}
          disableFocusListener
          disableHoverListener
          disableTouchListener
          TransitionComponent={Zoom}
        >
          <Box
            component="div"
            onClick={handleTooltipOpen}
            // display="flex"
            // flexDirection="row"
            // padding="5px"
            // height="100vh"
            // width="100%"
            sx={{
              borderRadius: "5px",
              // backgroundColor: "orange",
            }}
          >
            <Typography
              sx={{
                ":hover": {
                  color: "#01EBED",
                  cursor: "pointer",
                },
              }}
              fontSize="14px"
              fontStyle="italic"
              color="white"
              fontWeight="bold"
            >
              {moti_citaAgen}
            </Typography>

            {/* <div
              onClick={() => navigate(`/pacientes/${id_paciente}/historial`)}
            > */}
            <Typography
              // sx={{
              //   ":hover": {
              //     cursor: "pointer",
              //     color: "#01EBED",
              //   },
              // }}
              fontSize="13px"
              fontStyle="italic"
              color="black"
              fontWeight="bold"
            >
              {Paciente}
            </Typography>
            {/* </div> */}
          </Box>
        </StyledTooltip>
      </div>
    </ClickAwayListener>
  );
};
