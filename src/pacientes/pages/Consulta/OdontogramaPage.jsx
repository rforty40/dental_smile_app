import { useState } from "react";
import { NoteAdd } from "@mui/icons-material";
import { ButtonCustom, CustomTable } from "../../../ui";
import { FormOdontograma } from "../../components";

import { useOdontogramaStore } from "../../../hooks";
import { Box, Typography } from "@mui/material";
import { TbDental } from "react-icons/tb";

const TABLE_HEAD_PIEZAS = [
  {
    id: "pieza",
    label: "Pieza dental",
    alignLeft: true,
  },
  { id: "superficie", label: "Superfice", alignLeft: true },

  // { id: "nota", label: "nota", alignLeft: true },
];

//
//
//
//

export const OdontogramaPage = () => {
  //store
  const { startLoadOdontogramas } = useOdontogramaStore();

  //hook abrir el formulario
  const [stateModalOdonto, setStateModalOdonto] = useState(false);

  const openModalFormOdon = async () => {
    await startLoadOdontogramas();
    setStateModalOdonto(true);
  };

  return (
    <Box
      component="div"
      className="animate__animated animate__fadeInUp animate__faster"
      sx={{ display: "flex", flexDirection: "column" }}
    >
      {" "}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          columnGap: "15px",
          backgroundColor: "primary.main",
          color: "white",
          padding: "10px 20px",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          Odontograma
        </Typography>
        <ButtonCustom
          altura="45px"
          txt_b_size="14px"
          flexDir="column-reverse"
          colorf="transparent"
          colorh="transparent"
          colort="white"
          colorth="celesteNeon.main"
          txt_b="Abrir Odontograma"
          fontW="bold"
          iconB={<TbDental />}
          propsXS={{ boxShadow: "none !important" }}
          onClick={openModalFormOdon}
        />
      </Box>
      <CustomTable
        txt_header=""
        TABLE_HEAD={TABLE_HEAD_PIEZAS}
        DATALIST={[]}
        withToolbar={false}
        withCheckbox={false}
        iconosEnFila={false}
        columnaABuscarPri="enfermedad_diagnosticada"
        bgColorPagination="white"
        bgColorTable="rgba(255,255,255,0.5)"
        // openModalEdit={openModalDiagEdit}
        // funcionBtnTblDelete={handleOpenDialogDelDiag}
      />
      <FormOdontograma
        openModal={stateModalOdonto}
        setOpenModal={setStateModalOdonto}
      />
    </Box>
  );
};
