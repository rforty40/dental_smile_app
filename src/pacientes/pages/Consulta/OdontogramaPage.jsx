import { Box, Grid, IconButton, Typography } from "@mui/material";
import {
  PermanentTooth,
  SimbologiaOdontograma,
  TemporalTooth,
} from "../../components";
import { TbMedicalCrossFilled } from "react-icons/tb";
import { useState } from "react";
import { FaMousePointer } from "react-icons/fa";
import {
  IconoBorrar,
  IconoCaries,
  IconoCoronaApli,
  IconoCoronaNece,
  IconoEndodonciaApl,
  IconoEndodonciaNece,
  IconoExtracion,
  IconoObturacion,
  IconoPerdidaCarie,
  IconoPerdidaOtra,
  IconoProteFijaApli,
  IconoProteFijaNece,
  IconoProteRemoApli,
  IconoProteRemoNece,
  IconoProteTotalApli,
  IconoProteTotalNece,
  IconoSellaApli,
  IconoSellaNeces,
} from "../../components/IconosOdontograma";
import { changeSelectedIcon } from "../../helpers";
import { useOdontogramaStore } from "../../../hooks";

export const OdontogramaPage = () => {
  const [clickTools, setClickTools] = useState(false);

  const { changeToolOdonto } = useOdontogramaStore();

  return (
    <>
      <Grid
        container
        sx={{
          display: "grid",
          backgroundColor: "rgba(255,255,255,0.7)",
          padding: "15px",
          gridTemplateColumns: "15% 40% 5% 40%", //"repeat(4, 1fr)",
          gridTemplateRows: "repeat(3, max-content)",
          gridTemplateAreas: `"labels_sup super_der . super_izq" ". piezasTemp_supD . piezasTemp_supI"
        ". piezasTemp_infD . piezasTemp_infI"
      "labels_inf infer_der . infer_izq" 
      `,
          rowGap: "20px",
        }}
      >
        <Grid
          item
          gridArea="labels_sup"
          display="flex"
          flexDirection="column"
          alignContent="space-between"
          justifyContent="space-between"
        >
          <Box display="flex" flexDirection="column" rowGap="20px">
            <Typography sx={{ fontStyle: "italic", fontWeight: "bold" }}>
              Recesión
            </Typography>
            <Typography sx={{ fontStyle: "italic", fontWeight: "bold" }}>
              Movilidad
            </Typography>
          </Box>
          <Typography
            sx={{
              fontStyle: "italic",
              fontWeight: "bold",
              color: "primary.main",
            }}
          >
            Maxilar superior
          </Typography>
        </Grid>

        <Grid
          item
          gridArea="super_der"
          display="flex"
          flexDirection="row"
          columnGap="5px"
          alignItems="row"
        >
          {[18, 17, 16, 15, 14, 13, 12, 11].map((ele) => {
            return (
              <PermanentTooth key={ele} numberTooth={ele} flexDir={"column"} />
            );
          })}
        </Grid>

        <Grid
          item
          gridArea="super_izq"
          display="flex"
          flexDirection="row"
          columnGap="5px"
          alignItems="row"
        >
          {[21, 22, 23, 24, 25, 26, 27, 28].map((ele) => {
            return (
              <PermanentTooth key={ele} numberTooth={ele} flexDir={"column"} />
            );
          })}
        </Grid>

        <Grid
          item
          gridArea="piezasTemp_supD"
          display="flex"
          flexDirection="row"
          columnGap="5px"
          alignItems="row"
          justifyContent="center"
        >
          {[55, 54, 53, 52, 51].map((ele) => {
            return (
              <TemporalTooth key={ele} numberTooth={ele} flexDir={"column"} />
            );
          })}
        </Grid>

        <Grid
          item
          gridArea="piezasTemp_supI"
          display="flex"
          flexDirection="row"
          columnGap="5px"
          alignItems="row"
          justifyContent="center"
        >
          {[61, 62, 63, 64, 65].map((ele) => {
            return (
              <TemporalTooth key={ele} numberTooth={ele} flexDir={"column"} />
            );
          })}
        </Grid>

        <Grid
          item
          gridArea="piezasTemp_infD"
          display="flex"
          flexDirection="row"
          columnGap="5px"
          alignItems="row"
          justifyContent="center"
        >
          {[85, 84, 83, 82, 81].map((ele) => {
            return (
              <TemporalTooth
                key={ele}
                numberTooth={ele}
                flexDir={"column-reverse"}
              />
            );
          })}
        </Grid>

        <Grid
          item
          gridArea="piezasTemp_infI"
          display="flex"
          flexDirection="row"
          columnGap="5px"
          alignItems="row"
          justifyContent="center"
        >
          {[71, 72, 73, 74, 75].map((ele) => {
            return (
              <TemporalTooth
                key={ele}
                numberTooth={ele}
                flexDir={"column-reverse"}
              />
            );
          })}
        </Grid>

        <Grid
          item
          gridArea="labels_inf"
          display="flex"
          flexDirection="column"
          alignContent="space-between"
          justifyContent="space-between"
        >
          <Typography
            sx={{
              fontStyle: "italic",
              fontWeight: "bold",
              color: "primary.main",
            }}
          >
            Maxilar inferior
          </Typography>
          <Box display="flex" flexDirection="column" rowGap="20px">
            <Typography sx={{ fontStyle: "italic", fontWeight: "bold" }}>
              Recesión
            </Typography>
            <Typography sx={{ fontStyle: "italic", fontWeight: "bold" }}>
              Movilidad
            </Typography>
          </Box>
        </Grid>

        <Grid
          item
          gridArea="infer_der"
          display="flex"
          flexDirection="row"
          columnGap="5px"
          alignItems="row"
        >
          {[48, 47, 46, 45, 44, 43, 42, 41].map((ele) => {
            return (
              <PermanentTooth
                key={ele}
                numberTooth={ele}
                flexDir={"column-reverse"}
              />
            );
          })}
        </Grid>

        <Grid
          item
          gridArea="infer_izq"
          display="flex"
          flexDirection="row"
          columnGap="5px"
          alignItems="row"
        >
          {[31, 32, 33, 34, 35, 36, 37, 38].map((ele) => {
            return (
              <PermanentTooth
                key={ele}
                numberTooth={ele}
                flexDir={"column-reverse"}
              />
            );
          })}
        </Grid>
      </Grid>

      <Grid
        className="contenedorIcons"
        component="div"
        display="grid"
        // flexDirection="row"
        // flexWrap="wrap"
        gridTemplateColumns="repeat(5, 1fr)"
        columnGap="10px"
        marginTop="20px"
        onClick={() => {
          changeSelectedIcon();
        }}
        sx={{
          backgroundColor: "rgba(255,255,255,0.6)",

          // backgroundColor: clickTools
          // ? "rgba(255,255,255,0.5)"
          // : "rgba(255,255,255,0.9)",
          padding: "15px",
        }}
      >
        {/* <Box
          position="relative"
          display="flex"
          component="div"
          onClick={() => {
            setClickTools(false);
            console.log("a");
          }}
          alignItems="center"
          sx={{
            cursor: "pointer",
            padding: "5px",
          }}
        >
          <FaMousePointer color="#602A90" fontSize="20px" />
        </Box> */}
        <SimbologiaOdontograma
          classname="carie"
          title={"Carie"}
          content={""}
          Icono={IconoCaries}
          fnSimbOdon={() => {
            changeToolOdonto(1);
          }}
        />
        <SimbologiaOdontograma
          classname="obturacion"
          title={"Obturación"}
          content={""}
          Icono={IconoObturacion}
          fnSimbOdon={() => {
            changeToolOdonto(2);
          }}
        />

        <SimbologiaOdontograma
          classname="sellante_necesario"
          title={"Sellante"}
          content={"Necesario"}
          Icono={IconoSellaNeces}
          fnSimbOdon={() => {
            changeToolOdonto(3);
          }}
        />
        <SimbologiaOdontograma
          classname="sellante_aplicado"
          title={"Sellante"}
          content={"Aplicado"}
          Icono={IconoSellaApli}
          fnSimbOdon={() => {
            changeToolOdonto(4);
          }}
        />
        <SimbologiaOdontograma
          classname="extraccion_necesaria"
          title={"Extracción"}
          content={"Necesaria"}
          Icono={IconoExtracion}
          fnSimbOdon={() => {
            changeToolOdonto(5);
          }}
        />
        <SimbologiaOdontograma
          classname="perdida_caries"
          title={"Pérdida"}
          content={"por caries"}
          Icono={IconoPerdidaCarie}
          fnSimbOdon={() => {
            changeToolOdonto(6);
          }}
        />
        <SimbologiaOdontograma
          classname="perdida_otra"
          title={"Pérdida"}
          content={"por otra causa"}
          Icono={IconoPerdidaOtra}
          fnSimbOdon={() => {
            changeToolOdonto(7);
          }}
        />
        <SimbologiaOdontograma
          classname="endodoncia_necesaria"
          title={"Endodoncia"}
          content={"Necesaria"}
          Icono={IconoEndodonciaNece}
          fnSimbOdon={() => {
            changeToolOdonto(8);
          }}
        />
        <SimbologiaOdontograma
          classname="endodoncia_aplicada"
          title={"Endodoncia"}
          content={"Aplicada"}
          Icono={IconoEndodonciaApl}
          fnSimbOdon={() => {
            changeToolOdonto(9);
          }}
        />
        <SimbologiaOdontograma
          classname="protesis_fija_nece"
          title={"Prótesis fija"}
          content={"Necesaria"}
          Icono={IconoProteFijaNece}
          fnSimbOdon={() => {
            changeToolOdonto(10);
          }}
        />
        <SimbologiaOdontograma
          classname="protesis_fija_apli"
          title={"Prótesis fija"}
          content={"Aplicada"}
          Icono={IconoProteFijaApli}
          fnSimbOdon={() => {
            changeToolOdonto(11);
          }}
        />
        <SimbologiaOdontograma
          classname="protesis_remo_nece"
          title={"Prótesis removible"}
          content={"Necesaria"}
          Icono={IconoProteRemoNece}
          fnSimbOdon={() => {
            changeToolOdonto(12);
          }}
        />
        <SimbologiaOdontograma
          classname="protesis_remo_apli"
          title={"Prótesis removible"}
          content={"Aplicada"}
          Icono={IconoProteRemoApli}
          fnSimbOdon={() => {
            changeToolOdonto(13);
          }}
        />
        <SimbologiaOdontograma
          classname="protesis_total_nece"
          title={"Prótesis total"}
          content={"Necesaria"}
          Icono={IconoProteTotalNece}
          fnSimbOdon={() => {
            changeToolOdonto(14);
          }}
        />
        <SimbologiaOdontograma
          classname="protesis_total_apli"
          title={"Prótesis total"}
          content={"Aplicada"}
          Icono={IconoProteTotalApli}
          fnSimbOdon={() => {
            changeToolOdonto(15);
          }}
        />
        <SimbologiaOdontograma
          classname="corona_necesaria"
          title={"Corona"}
          content={"Necesaria"}
          Icono={IconoCoronaNece}
          fnSimbOdon={() => {
            changeToolOdonto(16);
          }}
        />
        <SimbologiaOdontograma
          classname="corona_aplicada"
          title={"Corona"}
          content={"Aplicada"}
          Icono={IconoCoronaApli}
          fnSimbOdon={() => {
            changeToolOdonto(17);
          }}
        />
        <SimbologiaOdontograma
          classname="borrar_icono"
          title={"Borrar"}
          content={""}
          Icono={IconoBorrar}
          fnSimbOdon={() => {
            changeToolOdonto(18);
          }}
        />
      </Grid>
    </>
  );
};
