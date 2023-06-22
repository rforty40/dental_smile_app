import { useNavigate } from "react-router-dom";
import { Box, Grid, Icon, IconButton, Typography } from "@mui/material";
import {
  AccessTime,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  Event,
  PersonSearch,
  PostAddOutlined,
  SegmentOutlined,
} from "@mui/icons-material";
import { ButtonCustom, IconTextField } from "../../ui";
import { useAgendaStore, useConsultasStore, useUiStore } from "../../hooks";
import { useEffect } from "react";

export const ViewCita = ({ closeCitaView, setOpen }) => {
  //
  const { handleChangeTabs } = useUiStore();

  const { changeStateFormCons, changeTitleFormCons, changeDataConsulta } =
    useConsultasStore();

  const {
    changeStateFormAgenda,
    changeTitleFormAgenda,
    activeCita,
    changeStateDeleteCofirm,
    changeBlockPaciente,
    changeStateViewCita,
  } = useAgendaStore();

  const navigate = useNavigate();

  const openFormEditCite = () => {
    changeTitleFormAgenda("Editar cita odontológica");
    changeStateFormAgenda(true);
    changeBlockPaciente(false);
    closeCitaView();
  };

  const openFormDeleteCite = () => {
    changeStateDeleteCofirm(true);
    closeCitaView();
  };

  useEffect(() => {
    changeStateViewCita(true);
    // console.log("se renderiza");
    return () => {
      // console.log("se desmontan");
      changeStateViewCita(false);
    };
  }, []);

  const handleOpenFormCons = () => {
    changeDataConsulta({
      updateCita: true,
      fecha_cita: activeCita.fecha,
      hora_inicio_cite: activeCita.hora,

      //
      id_tipoConsul: null,
      fecha_consulta_date: activeCita.start,
      hora_consulta_date: activeCita.start,
      mot_consulta: activeCita.motivo,
      probleAct_consulta: "",
    });
    navigate(`/pacientes/${activeCita.id_paciente}/historial`);
    handleChangeTabs(2);
    changeTitleFormCons("Registrar consulta odontológica");
    changeStateFormCons(true);
    console.log(activeCita.motivo);

    closeCitaView();
  };

  //
  return (
    <Box
      boxShadow="3px 5px 5px rgba(0, 0, 0, 0.5)"
      display="flex"
      sx={{
        width: 600,

        // backgroundImage: `linear-gradient(38deg, rgba(245,247,250,1) 0%, rgba(17,100,130,1) 100%)`,
        backgroundColor: "rgba(0,0,0,0.9)",
        // backgroundColor: "black",
        // background:
        //   "radial-gradient(ellipse at top, #f5f7fa), radial-gradient(ellipse at bottom, #602a90);",
        padding: "15px",
        borderRadius: "5px",
        // border: "5px solid #f5f7fa",
      }}
    >
      <Grid
        container
        sx={{
          display: "grid",
          paddingTop: "5px",
          alignItems: "center",
          gridTemplateColumns: "repeat(6, 1fr)",
          gridTemplateRows: "repeat(5, max-content)",

          gridTemplateAreas: `". . . . . cerrar" "titulo titulo paciente paciente paciente paciente"
                " fecha fecha horaIni  horaIni horaFin horaFin "
                " motivo motivo motivo motivo motivo motivo"
                " btnReg btnReg btnReg btnReg btnReg btnReg"`,
          rowGap: "30px",
          columnGap: "10px",
        }}
      >
        <Grid
          sx={{ height: "0px " }}
          item
          gridArea="cerrar"
          display="flex"
          justifyContent="end"
        >
          <IconButton
            onClick={() => {
              closeCitaView();
            }}
          >
            <CloseOutlined style={{ fontSize: "20px", color: "white" }} />
          </IconButton>
        </Grid>

        <Grid item gridArea="titulo" display="flex" justifyContent="start">
          <Typography
            fontSize="20px"
            fontStyle="italic"
            fontWeight="bold"
            color="#02ECEE"
          >
            Cita Agendada
          </Typography>
        </Grid>

        <Grid item gridArea="paciente">
          <IconTextField
            fullWidth
            label="Paciente:"
            type="text"
            // defaultValue={"Hello World"}
            value={activeCita.paciente}
            colorTxt="white"
            font_we="bold"
            font_sty="italic"
            InputProps={{
              readOnly: true,
            }}
            colorHover="#02ECEE"
            colorLabel="#02ECEE"
            propsXS={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "2px solid",
                  borderColor: "primary.main",
                },
              },
              "&:hover fieldset": {
                borderColor: "#602A90 !important ",
              },
              boxShadow: "3px 5px 5px rgba(0, 0, 0, 0.5)  !important",
            }}
            iconEnd={
              <IconButton
                onClick={() => {
                  handleChangeTabs(1);
                  navigate(`/pacientes/${activeCita.id_paciente}/historial`);
                }}
              >
                <PersonSearch
                  sx={{
                    color: "#02ECEE",
                    // ":hover": { color: "#02ECEE" },
                  }}
                />
              </IconButton>
            }
          />
        </Grid>
        <Grid item gridArea="fecha">
          <IconTextField
            fullWidth
            label="Fecha:"
            type="text"
            value={activeCita.fecha}
            colorTxt="white"
            font_we="bold"
            font_sty="italic"
            InputProps={{ readOnly: true }}
            colorIcon="blueSecondary.main"
            colorHover="#02ECEE"
            colorLabel="#02ECEE"
            propsXS={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "2px solid",
                  borderColor: "primary.main",
                },
              },
              "&:hover fieldset": {
                borderColor: "#602A90 !important ",
              },
              boxShadow: "3px 5px 5px rgba(0, 0, 0, 0.5)  !important",
            }}
            iconEnd={
              <Icon>
                <Event />
              </Icon>
            }
          />
        </Grid>
        <Grid item gridArea="horaIni">
          <IconTextField
            fullWidth
            label="Hora Inicio:"
            type="text"
            value={activeCita.hora}
            colorTxt="white"
            font_we="bold"
            font_sty="italic"
            InputProps={{ readOnly: true }}
            colorIcon="blueSecondary.main"
            colorHover="#02ECEE"
            colorLabel="#02ECEE"
            propsXS={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "2px solid",
                  borderColor: "primary.main",
                },
              },
              "&:hover fieldset": {
                borderColor: "#602A90 !important ",
              },
              boxShadow: "3px 5px 5px rgba(0, 0, 0, 0.5)  !important",
            }}
            iconEnd={
              <Icon>
                <AccessTime />
              </Icon>
            }
          />
        </Grid>
        <Grid item gridArea="horaFin">
          <IconTextField
            fullWidth
            label="Hora Fin:"
            type="text"
            value={activeCita.hora_fin}
            colorTxt="white"
            font_we="bold"
            font_sty="italic"
            InputProps={{ readOnly: true }}
            colorIcon="blueSecondary.main"
            colorHover="#02ECEE"
            colorLabel="#02ECEE"
            propsXS={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "2px solid",
                  borderColor: "primary.main",
                },
              },
              "&:hover fieldset": {
                borderColor: "#602A90 !important ",
              },
              boxShadow: "3px 5px 5px rgba(0, 0, 0, 0.5)  !important",
            }}
            iconEnd={
              <Icon>
                <AccessTime />
              </Icon>
            }
          />
        </Grid>
        <Grid item gridArea="motivo">
          <IconTextField
            fullWidth
            multiline
            label="Motivo de consulta:"
            type="text"
            value={activeCita.motivo}
            colorIcon="blueSecondary.main"
            colorHover="#02ECEE"
            colorLabel="#02ECEE"
            colorTxt="white"
            font_we="bold"
            font_sty="italic"
            InputProps={{ readOnly: true }}
            propsXS={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "2px solid",
                  borderColor: "primary.main",
                },
              },
              "&:hover fieldset": {
                borderColor: "#602A90 !important ",
              },
              boxShadow: "3px 5px 5px rgba(0, 0, 0, 0.5)  !important",
            }}
            iconEnd={
              <Icon>
                <SegmentOutlined />
              </Icon>
            }
          />
        </Grid>

        <Grid
          item
          gridArea="btnReg"
          display="flex"
          flexDirection="row"
          columnGap="10px"
          rowGap="10px"
          justifyContent="center"
        >
          <ButtonCustom
            // tipoBtn="submit"
            altura="40px"
            colorf="white"
            colorh="error.main"
            colorth="white"
            colort="black"
            txt_b="Eliminar"
            fontW="bold"
            onClick={openFormDeleteCite}
            iconB={<DeleteOutlined />}
          />

          <ButtonCustom
            // tipoBtn="submit"
            altura="40px"
            colorf="white"
            colorh="blueSecondary.main"
            colorth="white"
            colort="black"
            txt_b="Editar"
            fontW="bold"
            onClick={openFormEditCite}
            iconB={<EditOutlined />}
          />

          <ButtonCustom
            // tipoBtn="submit"
            altura="40px"
            colorf="white"
            colorh="primary.main"
            colort="black"
            colorth="white"
            txt_b="Atender"
            fontW="bold"
            onClick={handleOpenFormCons}
            iconB={<PostAddOutlined />}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
