import {
  Box,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { ButtonCustom, CustomStandardTF } from "../../ui";
import { invertDateFormat } from "../../agenda/helpers/formatedDataCite";
import { FaRegFolderOpen } from "react-icons/fa";
import { useUiStore } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { PersonSearch } from "@mui/icons-material";

export const ConsultaPanelItem = ({ consultaItem }) => {
  const navigate = useNavigate();
  const { handleChangeTabsCons, handleChangeTabs } = useUiStore();

  const diagnosticosStr = consultaItem.diagnosticos.reduce((acc, diag) => {
    acc = `${acc}\n${
      diag.Diagnosticos.split("-")[0] +
      "-" +
      diag.Diagnosticos.split("-")[1].slice(0, 2) +
      diag.Diagnosticos.split("-")[1].slice(2).toLowerCase()
    }`;
    return acc;
  }, "");

  const handleOpenCons = () => {
    // changeDataConsulta(consultaItem);
    handleChangeTabsCons(0);
    // navigate(
    //   `/pacientes/${consultaItem.id_paciente}/historial/${consultaItem.id_consulta}`
    // );
  };

  const handleOpenPac = () => {
    handleChangeTabs(0);
    // navigate(`/pacientes/${consultaItem.id_paciente}/historial`);
  };
  return (
    <>
      {/* <Box width="90%"> */}
      <Grid
        container
        display="grid"
        // flexDirection="row"
        // border="2px solid"
        boxShadow="5px 7px 7px rgba(0, 0, 0, 0.5)"
        sx={{
          //
          cursor: "pointer",
          padding: "20px 0px",
          marginTop: "5px",
          borderRadius: "10px",
          transitionProperty: "transform",
          // transitionDelay: "0.1s",
          transition: "all 0.1s ease-in-out",
          // backgroundColor: "rgba(255,255,255,0.6)",
          //   ":hover": {
          //     transform: "scale(1.04)",
          //   },
          backgroundColor: "white",
          //   backgroundColor: colorChoose ? "primary.main" : "white",
          // alignItems: "center",
          gridTemplateColumns: "8% 62% 20% 10%",
          gridTemplateRows: "repeat(2, max-content)",
          gridTemplateAreas: `". . infoCons infoCons" 
              "icono info info botones"`,

          rowGap: "15px",
        }}
      >
        <Grid
          item
          gridArea="icono"
          display="flex"
          alignItems="start"
          justifyContent="center"
        >
          <img
            type="img/svg"
            width="65px"
            height="65px"
            src={`/assets/icons/consultaItem/icon_consulta_primary.svg`}
            alt="dentist_date.svg"
          />
        </Grid>

        <Grid
          item
          gridArea="infoCons"
          display="flex"
          flexDirection="row"
          alignItems="start"
          justifyContent="end"
          paddingRight="15px"
          columnGap="15px"
        >
          <Typography
            sx={{
              fontSize: "14px",
              backgroundColor: "primary.main",
              color: "white",
              fontWeight: "bold",
              padding: "0.5px 4px",
            }}
          >
            {consultaItem.hora_consulta}
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              backgroundColor: "primary.main",
              color: "white",
              fontWeight: "bold",
              padding: "0.5px 4px",
            }}
          >
            {invertDateFormat(consultaItem.fecha_consulta)}
          </Typography>

          <Typography
            sx={{
              fontSize: "14px",
              backgroundColor: "primary.main",
              color: "white",
              fontWeight: "bold",
              padding: "0.5px 4px",
            }}
          >
            {consultaItem.dias}
          </Typography>
        </Grid>

        <Grid
          item
          gridArea="info"
          display="flex"
          rowGap="15px"
          flexDirection="column"
        >
          <Box display="flex" flexDirection="row" columnGap="20px">
            <CustomStandardTF
              fullWidth
              value={consultaItem.tipo_tipoConsul}
              helperText="Tipo de consulta"
              colorTxt="black"
              colorHelp="#602A90"
              colorBrd="#602A90"
            />

            <CustomStandardTF
              fullWidth
              value={consultaItem.Paciente}
              helperText="Paciente"
              colorTxt="black"
              colorHelp="#602A90"
              colorBrd="#602A90"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton
                      onClick={handleOpenPac}
                      sx={{
                        ":hover": {
                          backgroundColor: "transparent",
                        },
                      }}
                    >
                      <Link
                        component={RouterLink}
                        to={`/pacientes/${consultaItem.id_paciente}/historial`}
                        style={{ textDecoration: "none" }}
                      >
                        <PersonSearch
                          fontSize="medium"
                          sx={{
                            color: "blueSecondary.main",

                            ":hover": {
                              color: "primary.main",
                            },
                          }}
                        />
                      </Link>
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <CustomStandardTF
            multiline
            value={consultaItem.mot_consulta}
            helperText="Motivo"
            colorTxt="black"
            colorHelp="#602A90"
            colorBrd="#602A90"
          />
          {consultaItem.probleAct_consulta.length > 0 && (
            <CustomStandardTF
              multiline
              value={consultaItem.probleAct_consulta}
              helperText="Problema"
              colorTxt="black"
              colorHelp="#602A90"
              colorBrd="#602A90"
            />
          )}
          {diagnosticosStr.length > 0 && (
            <CustomStandardTF
              multiline
              value={diagnosticosStr}
              helperText="Diagnóstico"
              colorTxt="black"
              colorHelp="#602A90"
              colorBrd="#602A90"
            />
          )}

          {consultaItem.tratamientos.length > 0 &&
            consultaItem.tratamientos.map((tratam) => {
              return (
                <>
                  <CustomStandardTF
                    key={tratam.id_tratam}
                    multiline
                    value={"\n" + invertDateFormat(tratam.Tratamiento)}
                    helperText="Tratamiento"
                    colorTxt="black"
                    colorHelp="#602A90"
                    colorBrd="#602A90"
                  />

                  {
                    tratam.procedimientos.length > 0 && (
                      // tratam.procedimientos.map((proced, index) => {
                      // return (
                      <CustomStandardTF
                        // key={index}
                        multiline
                        // value={proced.Procedimiento}
                        line_he="30px"
                        propsSX={{ paddingLeft: "40px" }}
                        value={tratam.procedimientos.reduce(
                          (acc, procAct, index) => {
                            if (index === 0) {
                              acc = `${procAct.Procedimiento}`;
                            } else {
                              acc = `${acc}\n${procAct.Procedimiento}`;
                            }
                            return acc;
                          },
                          ""
                        )}
                        helperText="Procedimientos"
                        colorTxt="black"
                        colorHelp="#602A90"
                        colorBrd="#602A90"
                      />
                    )
                    // );
                    // })
                  }
                </>
              );
            })}
        </Grid>

        <Grid
          item
          gridArea="botones"
          display="flex"
          flexDirection="column"
          rowGap="20px"
          alignItems="center"
          justifyContent="start"
        >
          <Link
            component={RouterLink}
            to={`/pacientes/${consultaItem.id_paciente}/historial/${consultaItem.id_consulta}`}
            style={{ textDecoration: "none" }}
          >
            <ButtonCustom
              txt_b_size="13px"
              altura="35px"
              colorf="transparent"
              colorh="transparent"
              colort="blueSecondary.main"
              colorth="primary.main"
              flexDir="column-reverse"
              txt_b="Abrir"
              fontW="bold"
              onClick={handleOpenCons}
              iconB={<FaRegFolderOpen />}
              propsXS={{ boxShadow: "none !important" }}
            />
          </Link>
        </Grid>
      </Grid>
      {/* </Box> */}
    </>
  );
};
