import {
  Box,
  MenuItem,
  OutlinedInput,
  Select,
  Tooltip,
  Typography,
} from "@mui/material";
import { CustomSelect } from "../../ui";

export const PermanentTooth = ({ numberTooth, flexDir }) => {
  return (
    <Box display="flex" flexDirection={flexDir} rowGap="5px" alignItems="row">
      {/* <Box display="flex" flexDirection="row">
        if(){} */}
      <Select
        size="small"
        sx={{
          backgroundColor: "white",
          width: "50px",
          height: "35px",
          fontWeight: "bold",
        }}
      >
        {["  ", 1, 2, 3, 4].map((recesion) => {
          return (
            <MenuItem
              key={recesion}
              value={recesion}
              sx={{ fontStyle: "italic", fontWeight: "bold" }}
            >
              {recesion}
            </MenuItem>
          );
        })}
      </Select>
      {/* </Box> */}
      <Select
        size="small"
        sx={{
          backgroundColor: "white",
          width: "60px",
          fontWeight: "bold",
          width: "50px",
          height: "35px",
        }}
      >
        {["  ", 1, 2, 3].map((movilidad) => {
          return (
            <MenuItem
              key={movilidad}
              value={movilidad}
              sx={{ fontStyle: "italic", fontWeight: "bold" }}
            >
              {movilidad}
            </MenuItem>
          );
        })}
      </Select>

      <Typography
        sx={{ fontStyle: "italic", fontWeight: "bold", textAlign: "center" }}
      >
        {numberTooth}
      </Typography>

      <Box
        sx={{
          position: "relative",
          width: "50px",
          height: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "primary.main",
        }}
      >
        {/* Centro */}
        {/* <Tooltip title="Oclusal/Incisal" placement="top-start"> */}
        <Box
          component="button"
          sx={{
            position: "absolute",
            width: "30px",
            height: "30px",
            backgroundColor: "myBgColor.main",
            border: "2px solid #602A90 !important",

            cursor: "pointer",
            ":hover": {
              backgroundColor: "rgba(255,255,255,0.5)",
            },
            zIndex: 1,
          }}
          onClick={({}) => {
            console.log("Oclusal/Incisal");
          }}
        />
        {/* </Tooltip> */}

        {/* Cara superior */}
        {/* <Tooltip title="Vestibular" placement="top"> */}
        <Box
          component="button"
          sx={{
            position: "absolute",
            width: "100%",
            height: "50px",
            top: 0,
            clipPath: "polygon(75% 25%, 25% 25%, 0 0, 100% 0)",
            backgroundColor: "myBgColor.main",
            border: "2px solid #602A90  !important",

            cursor: "pointer",
            ":hover": {
              backgroundColor: "rgba(255,255,255,0.5)",
            },
          }}
          onClick={() => {
            console.log("Vestibular");
          }}
        />
        {/* </Tooltip> */}

        {/* Mesial */}
        {/* <Tooltip title="Mesial" placement="right"> */}
        <Box
          component="button"
          sx={{
            position: "absolute",
            width: "50px",
            height: "100%",
            right: 0,
            clipPath: "polygon(75% 71%, 75% 29%, 100% 4%, 100% 96%)",
            backgroundColor: "myBgColor.main",
            border: "2px solid #602A90 !important",

            cursor: "pointer",
            ":hover": {
              backgroundColor: "rgba(255,255,255,0.5)",
            },
          }}
          onClick={() => {
            console.log("Mesial");
          }}
        />
        {/* </Tooltip> */}

        {/* Palatina/Lingual */}
        {/* <Tooltip title="Palatina/Lingual" placement="bottom"> */}
        <Box
          component="button"
          sx={{
            position: "absolute",
            height: "50px",
            width: "100%",
            bottom: 0,
            clipPath: "polygon(25% 75%, 75% 75%, 100% 100%, 0% 100%)",
            backgroundColor: "myBgColor.main",
            border: "2px solid #602A90 !important",

            cursor: "pointer",
            ":hover": {
              backgroundColor: "rgba(255,255,255,0.5)",
            },
          }}
          onClick={() => {
            console.log("Palatina/Lingual");
          }}
        />
        {/* </Tooltip> */}

        {/* Distal */}
        {/* <Tooltip title="Distal" placement="left"> */}
        <Box
          component="button"
          sx={{
            position: "absolute",
            width: "50px",
            height: "100%",
            left: 0,
            clipPath: "polygon(25% 29%, 25% 71%, 0 96%, 0 4%)",
            backgroundColor: "myBgColor.main",
            border: "2px solid #602A90 !important",

            cursor: "pointer",

            ":hover": {
              backgroundColor: "rgba(255,255,255,0.5)",
            },
          }}
          onClick={() => {
            console.log("Distal");
          }}
        />
        {/* </Tooltip> */}
      </Box>
    </Box>
  );
};
