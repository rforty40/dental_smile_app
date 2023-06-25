import { Box } from "@mui/material";
import { PermanentTooth } from "../../components";

export const OdontogramaPage = () => {
  return (
    <Box
      sx={{
        backgroundColor: "rgba(255,255,255,0.7)",
        padding: "20px",
        // display:"flex"
        // f
      }}
    >
      <Box display="flex" flexDirection="row" columnGap="5px" alignItems="row">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((ele) => {
          return (
            <PermanentTooth key={ele} numberTooth={ele} flexDir={"column"} />
          );
        })}
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        columnGap="5px"
        alignItems="row"
        marginTop="15px"
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
      </Box>
    </Box>
  );
};
