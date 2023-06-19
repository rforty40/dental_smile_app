import { Grid, Typography } from "@mui/material";
import { ButtonCustom, CustomStandardTF } from "../../ui";
import { DeleteOutlined, EditNoteOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useConsultasStore, useUiStore } from "../../hooks";
import { invertDateFormat } from "../../agenda/helpers/formatedDataCite";
import { FaRegFolderOpen } from "react-icons/fa";

export const ConsultaItem = ({ consultaItem, iteratorColor }) => {
  const colorChoose = iteratorColor % 2 > 0 ? true : false;
  const navigate = useNavigate();

  const {
    changeDataConsulta,
    changeStateFormCons,
    changeTitleFormCons,
    changeStateDelCons,
  } = useConsultasStore();

  const { handleChangeTabsCons } = useUiStore();

  const handleOpenFormEditCons = () => {
    changeDataConsulta(consultaItem);
    changeTitleFormCons("Editar consulta odontológica");
    changeStateFormCons(true);
  };

  const handleOpenFormDeleteCons = () => {
    changeDataConsulta(consultaItem);
    changeStateDelCons(true);
  };

  const handleOpenCons = () => {
    changeDataConsulta(consultaItem);
    handleChangeTabsCons(0);
    navigate(`${consultaItem.id_consulta}`);
  };
  const diagnosticosStr = consultaItem.diagnosticos.reduce((acc, diag) => {
    acc = `${acc}\n${
      diag.Diagnosticos.split("-")[0] +
      "-" +
      diag.Diagnosticos.split("-")[1].slice(0, 2) +
      diag.Diagnosticos.split("-")[1].slice(2).toLowerCase()
    }`;
    return acc;
  }, "");

  return (
    <>
      <Grid
        container
        display="grid"
        boxShadow="3px 5px 5px rgba(0, 0, 0, 0.5)"
        sx={{
          //
          cursor: "pointer",
          padding: "20px 0px",
          marginTop: "5px",
          borderRadius: "10px",
          transitionProperty: "transform",

          transition: "all 0.1s ease-in-out",

          ":hover": {
            transform: "scale(1.04)",
          },

          backgroundColor: colorChoose ? "primary.main" : "white",

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
            src={`/assets/icons/consultaItem/icon_consulta_${
              colorChoose ? "white" : "primary"
            }.svg`}
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
              backgroundColor: colorChoose ? "white" : "primary.main",
              color: colorChoose ? "black" : "white",
              fontWeight: colorChoose && "bold",
              padding: "0.5px 4px",
            }}
          >
            {consultaItem.hora_consulta}
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              backgroundColor: colorChoose ? "white" : "primary.main",
              color: colorChoose ? "black" : "white",
              fontWeight: colorChoose && "bold",
              padding: "0.5px 4px",
            }}
          >
            {invertDateFormat(consultaItem.fecha_consulta)}
          </Typography>

          <Typography
            sx={{
              fontSize: "14px",
              backgroundColor: colorChoose ? "white" : "primary.main",
              color: colorChoose ? "black" : "white",
              fontWeight: colorChoose && "bold",
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
          <CustomStandardTF
            value={consultaItem.tipo_tipoConsul}
            helperText="Tipo de consulta"
            colorTxt={colorChoose ? "white" : "black"}
            colorHelp={colorChoose ? "#02ECEE" : "#602A90"}
            colorBrd={colorChoose ? "white" : "#602A90"}
          />
          <CustomStandardTF
            multiline
            value={consultaItem.mot_consulta}
            helperText="Motivo"
            colorTxt={colorChoose ? "white" : "black"}
            colorHelp={colorChoose ? "#02ECEE" : "#602A90"}
            colorBrd={colorChoose ? "white" : "#602A90"}
          />

          {consultaItem.probleAct_consulta.length > 0 && (
            <CustomStandardTF
              multiline
              value={consultaItem.probleAct_consulta}
              helperText="Problema"
              colorTxt={colorChoose ? "white" : "black"}
              colorHelp={colorChoose ? "#02ECEE" : "#602A90"}
              colorBrd={colorChoose ? "white" : "#602A90"}
            />
          )}

          {diagnosticosStr.length > 0 && (
            <CustomStandardTF
              multiline
              value={diagnosticosStr}
              helperText="Diagnóstico"
              colorTxt={colorChoose ? "white" : "black"}
              colorHelp={colorChoose ? "#02ECEE" : "#602A90"}
              colorBrd={colorChoose ? "white" : "#602A90"}
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
                    colorTxt={colorChoose ? "white" : "black"}
                    colorHelp={colorChoose ? "#02ECEE" : "#602A90"}
                    colorBrd={colorChoose ? "white" : "#602A90"}
                  />

                  {tratam.procedimientos.length > 0 && (
                    <CustomStandardTF
                      multiline
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
                      colorTxt={colorChoose ? "white" : "black"}
                      colorHelp={colorChoose ? "#02ECEE" : "#602A90"}
                      colorBrd={colorChoose ? "white" : "#602A90"}
                    />
                  )}
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
          <ButtonCustom
            txt_b_size="13px"
            altura="35px"
            colorf="transparent"
            colorh="transparent"
            colort={colorChoose ? "white" : "blueSecondary.main"}
            colorth={colorChoose ? "celesteNeon.main" : "primary.main"}
            flexDir="column-reverse"
            txt_b="Editar"
            fontW="bold"
            onClick={handleOpenFormEditCons}
            iconB={<EditNoteOutlined />}
            propsXS={{ boxShadow: "none !important" }}
          />

          <ButtonCustom
            txt_b_size="13px"
            altura="35px"
            colorf="transparent"
            colorh="transparent"
            colort={colorChoose ? "white" : "error.main"}
            colorth={colorChoose ? "celesteNeon.main" : "primary.main"}
            flexDir="column-reverse"
            txt_b="Eliminar"
            fontW="bold"
            onClick={handleOpenFormDeleteCons}
            iconB={<DeleteOutlined />}
            propsXS={{ boxShadow: "none !important" }}
          />

          <ButtonCustom
            txt_b_size="13px"
            altura="35px"
            colorf="transparent"
            colorh="transparent"
            colort={colorChoose ? "white" : "blueSecondary.main"}
            colorth={colorChoose ? "celesteNeon.main" : "primary.main"}
            flexDir="column-reverse"
            txt_b="Abrir"
            fontW="bold"
            onClick={handleOpenCons}
            iconB={<FaRegFolderOpen />}
            propsXS={{ boxShadow: "none !important" }}
          />
        </Grid>
      </Grid>
    </>
  );
};
