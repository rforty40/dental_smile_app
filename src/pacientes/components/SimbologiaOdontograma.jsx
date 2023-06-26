import { useState } from "react";
import { Box, Typography } from "@mui/material";

export const SimbologiaOdontograma = ({
  title,
  content,
  Icono,
  fnSimbOdon,
  classname,
}) => {
  const [clickIcono, setClickIcono] = useState(false);

  const fnClick = () => {
    fnSimbOdon();
    // setClickIcono(true);
    console.log("fncLICK");
  };
  return (
    <>
      <Box
        component="div"
        id={classname}
        display="flex"
        flexDirection="row"
        onClick={fnClick}
        alignItems="center"
        sx={{
          // backgroundColor: clickIcono && "rgba(255,255,255,0.7)",
          cursor: "pointer",
          padding: "5px 15px 5px 5px",
        }}
        columnGap="5px"
      >
        <Icono />
        <Box display="flex" flexDirection="column">
          <Typography color="black" fontWeight="bold">
            {title}
          </Typography>
          <Typography color="grey" fontWeight="bold">
            {content}
          </Typography>
        </Box>
      </Box>
    </>
  );
};
