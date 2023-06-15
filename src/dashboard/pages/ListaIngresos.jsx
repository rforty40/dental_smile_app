import {
  Autocomplete,
  Box,
  Checkbox,
  Link,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  ButtonCustom,
  CustomCollapsibleTable,
  CustomDatePickerAntd,
  CustomRangeDate,
  CustomSelect,
  CustomSelectMultiple,
} from "../../ui";
import { addZeroStr, arrMes } from "../../agenda/helpers/formatedDataCite";

import { FaRegFolderOpen } from "react-icons/fa";
import { useIngresosStore, useUiStore } from "../../hooks";
import { CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material";

const TABLE_HEAD = [
  { id: "fecha", label: "Fecha" },
  { id: "paciente", label: "Paciente" },
  { id: "tipo_consulta", label: "Tipo de consulta" },
  { id: "motivo", label: "Motivo" },
  { id: "problema", label: "Problema" },
  { id: "total", label: "Total" },
];

const TABLE_HEAD_COLLAPSED = [
  { id: "ingreso_por", label: "Ingreso por" },
  { id: "monto", label: "Monto" },
  { id: "nota", label: "Nota" },
  { id: "fecha", label: "Fecha" },
  { id: "fecha_upd", label: "Fecha de actualización" },
];

const mesActual = () => {
  const today = new Date();
  const year = today.getFullYear();
  let mes = today.getMonth() + 1;
  mes = mes.toString().padStart(2, "0");
  // console.log(`${year}${mes}`);
  return `${year}${mes}`;
};

const getParamIngreso1 = (tipIng) => {
  switch (tipIng) {
    case "Procedimiento":
      return "procedimientos";
    case "Tipo de consulta":
      return "tipos_consulta";
    case "Otro motivo":
      return "otro_motivo";
    default:
      break;
  }
};
const getParamIngreso2 = (tipIng) => {
  if (tipIng.includes("Procedimiento") && tipIng.includes("Tipo de consulta")) {
    return "proced_tipcons";
  }
  if (tipIng.includes("Procedimiento") && tipIng.includes("Otro motivo")) {
    return "proced_user";
  }
  if (tipIng.includes("Tipo de consulta") && tipIng.includes("Otro motivo")) {
    return "tipcons_user";
  }
};

//
//
//

export const ListaIngresos = () => {
  //store
  const { startIngresosConsList, ingresosConsList, totalIngCons } =
    useIngresosStore();

  const { handleChangeTabsCons } = useUiStore();

  //rangoDeFechas
  const [stateDatesRange, setStateDatesRange] = useState({
    values: null,
    fechaIni: "_",
    fechaFin: "_",
  });

  //hook date año
  const [statePickerYear, setStatePickerYear] = useState({
    valueYear: null,
    anioStr: "",
  });

  //hook date mes
  const [statePickerMonth, setStatePickerMonth] = useState({
    valueMonth: null,
    mesStr: "",
  });

  //hook tipo de ingreso
  const [tipIngreso, setTipIngreso] = useState([]);
  const [paramTI, setParamTI] = useState("consultas");

  /**********************************TIPO DE INGRESO********************************* */
  const getStylesTipIng = (option) => {
    return {
      fontWeight: tipIngreso.indexOf(option) === -1 ? "normal" : "bold",
    };
  };

  const handleTipIngreso = (event) => {
    const {
      target: { value },
    } = event;
    console.log(value);
    setTipIngreso(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  useEffect(() => {
    switch (tipIngreso.length) {
      case 0:
        // console.log(tipIngreso);
        setParamTI("consultas");
        break;

      case 1:
        // console.log(tipIngreso);
        //   console.log(getParamIngreso1(tipIngreso[0]));
        setParamTI(getParamIngreso1(tipIngreso[0]));
        break;

      case 2:
        // console.log(tipIngreso);
        // console.log(getParamIngreso2(tipIngreso));
        setParamTI(getParamIngreso2(tipIngreso));
        break;

      case 3:
        // console.log(tipIngreso);
        setParamTI("consultas");
        break;

      default:
        break;
    }

    //Limpiar los demas componentes

    setStateDatesRange({ ...stateDatesRange, values: null });
    setStatePickerYear({
      valueYear: null,
      anioStr: "",
    });
    setStatePickerMonth({
      valueMonth: null,
      mesStr: "",
    });
  }, [tipIngreso]);

  /*******************************************RANGO DE FECHA ******************************************************** */

  const onChangeRangeDates = (values, rangeString) => {
    //Limpiar los demas componentes

    setStatePickerYear({
      valueYear: null,
      anioStr: "",
    });
    setStatePickerMonth({
      valueMonth: null,
      mesStr: "",
    });

    //cambiar el rango de fecha
    setStateDatesRange({
      values,
      fechaIni: rangeString[0],
      fechaFin: rangeString[1],
    });

    if (values === null) {
      startIngresosConsList("consultas", "mes", mesActual(), "_");
    }
  };

  useEffect(() => {
    if (stateDatesRange.values !== null) {
      startIngresosConsList(
        "consultas",
        "range",
        stateDatesRange.fechaIni + " 00:00:00",
        stateDatesRange.fechaFin + " 23:59:59"
      );
    }
  }, [stateDatesRange]);

  /*******************************************  AÑO  ******************************************************** */

  const onChangeYear = (date, dateString) => {
    //Limpiar los demas componentes
    setStateDatesRange({ ...stateDatesRange, values: null });
    setStatePickerMonth({
      valueMonth: null,
      mesStr: "",
    });

    //cambiar el año
    setStatePickerYear({
      valueYear: date,
      anioStr: dateString,
    });

    if (date === null) {
      startIngresosConsList("consultas", "mes", mesActual(), "_");
    }
  };

  useEffect(() => {
    if (statePickerYear.valueYear !== null) {
      // console.log(statePickerYear.anioStr);
      startIngresosConsList("consultas", "anio", statePickerYear.anioStr, "_");
    }
  }, [statePickerYear]);

  /*******************************************  MES  ******************************************************** */

  const onChangeMonth = (date, dateString) => {
    //Limpiar los demas componentes

    setStateDatesRange({ ...stateDatesRange, values: null });
    setStatePickerYear({
      valueYear: null,
      anioStr: "",
    });

    //cambiar el mes
    setStatePickerMonth({
      valueMonth: date,
      mesStr: dateString,
    });

    if (date === null) {
      startIngresosConsList("consultas", "mes", mesActual(), "_");
    }
  };

  useEffect(() => {
    if (statePickerMonth.valueMonth !== null) {
      const mesAnio =
        statePickerMonth.mesStr.split(" ")[1] +
        addZeroStr(arrMes.indexOf(statePickerMonth.mesStr.split(" ")[0]) + 1);

      startIngresosConsList("consultas", "mes", mesAnio, "_");
    }
  }, [statePickerMonth]);

  /************************************************ */
  /************************************************ */

  useEffect(() => {
    startIngresosConsList("consultas", "todos", "_", "_");
  }, []);

  const customFormat = (value) => {
    return arrMes[value["$d"].getMonth()] + " " + value["$d"].getFullYear();
  };
  const BtnInFila = ({ infoRow }) => {
    console.log(infoRow);
    return (
      <Link
        component={RouterLink}
        to={`/pacientes/${infoRow.id_paciente}/historial/${infoRow.id}`}
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
          onClick={() => {
            handleChangeTabsCons(3);
          }}
          iconB={<FaRegFolderOpen />}
          propsXS={{ boxShadow: "none !important" }}
        />
      </Link>
    );
  };

  const ComponentBtnTable = ({}) => {
    return (
      <>
        <Box display="flex" flexDirection="row">
          <Typography color="white" fontWeight="bold">
            Total ${totalIngCons}
          </Typography>
        </Box>
      </>
    );
  };

  return (
    <div
      style={{
        height: "100%",
        minHeight: "100vh",
        width: "100%",

        backgroundImage:
          "linear-gradient(rgba(250,250,250, 0.2),rgba(250,250,250, 0.2)) , url(/assets/img/fondos/ingresos.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
      }}
    >
      <Box
        className="box-shadow animate__animated animate__fadeInUp animate__faster"
        padding="20px 20px 10px 20px"
        display="flex"
        flexDirection="column"
        // justifyContent="space-between"
        // alignItems="start"
        rowGap="10px"
        sx={{ backgroundColor: "myBgColor.main" }}
      >
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <Typography
            variant="h5"
            fontStyle="italic"
            fontWeight="bold"
            color="primary.main"
          >
            Lista de ingresos
          </Typography>
          <Box display="flex" flexDirection="row">
            <CustomSelectMultiple
              lblText="Ingresos por:"
              altura="42px"
              ancho="400px"
              listOptions={["Procedimiento", "Tipo de consulta", "Otro motivo"]}
              value={tipIngreso}
              onChange={handleTipIngreso}
              fnGetStyles={getStylesTipIng}
            />
          </Box>
        </Box>
        <Box
          display="flex"
          columnGap="10px"
          flexDirection="row"
          alignSelf="end"
        >
          {/* selector de mes */}
          <CustomDatePickerAntd
            placeholder="Mes/Año"
            value={statePickerMonth.valueMonth}
            onChange={onChangeMonth}
            format={customFormat}
            picker="month"
            sxProps={{ width: "175px" }}
          />

          {/* selector año */}
          <CustomDatePickerAntd
            placeholder="Año"
            value={statePickerYear.valueYear}
            onChange={onChangeYear}
            picker="year"
            sxProps={{ width: "130px" }}
          />

          {/* selector de rango de fechas */}
          <CustomRangeDate
            value={stateDatesRange.values}
            onChange={onChangeRangeDates}
          />
        </Box>
      </Box>

      <Box
        className="box-shadow animate__animated animate__fadeInUp animate__faster"
        margin="30px 30px 0px 30px"
        padding="10px"
        borderRadius="5px"
        // width="90%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{ backgroundColor: "rgba(255,255,255,0.9)" }}
      >
        <CustomCollapsibleTable
          TABLE_HEAD={TABLE_HEAD}
          DATALIST={ingresosConsList}
          withToolbar
          withBoxSearch
          withButton
          withCheckbox={false}
          iconosEnFila
          columnaABuscarPri="fecha"
          searchWhat={"Buscar ..."}
          txt_header={"Lista de ingresos por consulta"}
          dataOmitida={3}
          routePaciente={(row) => `/pacientes/${row.id_paciente}/historial`}
          BtnInFila={BtnInFila}
          titleTablaCollapsed="Pagos por consulta"
          TABLE_HEAD_COLLAPSED={TABLE_HEAD_COLLAPSED}
          propertyCollapsed="pagos"
          btnToolbarTable={ComponentBtnTable}
        />
      </Box>
    </div>
  );
};
