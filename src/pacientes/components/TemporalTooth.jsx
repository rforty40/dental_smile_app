import { Box, Typography } from "@mui/material";

export const TemporalTooth = ({ numberTooth, flexDir }) => {
  return (
    <Box
      display="flex"
      flexDirection={flexDir}
      rowGap="3px"
      alignItems="row"
      sx={{}}
    >
      <Typography
        sx={{
          fontStyle: "italic",
          fontWeight: "bold",
          textAlign: "center",
          color: "primary.main",
        }}
      >
        {numberTooth}
      </Typography>

      <Box
        sx={{
          position: "relative",
          width: "54px",
          height: "54px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "primary.main",
          borderRadius: "50%",
          clipPath: "circle(50% at 50% 50%)",
          border: "2px solid #602A90 !important",
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "50px",
            height: "50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            borderRadius: "50%",
            clipPath: "circle(50% at 50% 50%)",
          }}
        >
          {/* Centro */}
          <Box
            component="button"
            sx={{
              position: "absolute",
              width: "30px",
              height: "30px",
              backgroundColor: "myBgColor.main",
              border: "2px solid #602A90 !important",
              borderRadius: "50%",
              clipPath: "circle(50% at 50% 50%)",
              cursor: "pointer",
              ":hover": {
                backgroundColor: "rgba(255,255,255,0.3)",
              },
              zIndex: 2,
            }}
            onClick={({}) => {
              console.log("Oclusal/Incisal");
            }}
          />

          {/* Cara superior */}

          <Box
            component="button"
            sx={{
              position: "absolute",
              width: "100%",
              height: "50px",
              top: 0,
              clipPath: "polygon(75% 25%, 25% 25%, 0 0, 100% 0)",
              backgroundColor: "myBgColor.main",
              // border: "2px solid #602A90  !important",
              border: "none !important",
              cursor: "pointer",
              ":hover": {
                backgroundColor: "rgba(255,255,255,0.3)",
              },
            }}
            onClick={() => {
              console.log("Vestibular");
            }}
          />

          {/* Mesial */}

          <Box
            component="button"
            sx={{
              position: "absolute",
              width: "50px",
              height: "100%",
              right: 0,
              clipPath: "polygon(75% 71%, 75% 29%, 100% 4%, 100% 96%)",
              backgroundColor: "myBgColor.main",
              // border: "2px solid #602A90 !important",
              border: "none !important",
              cursor: "pointer",
              ":hover": {
                backgroundColor: "rgba(255,255,255,0.3)",
              },
            }}
            onClick={() => {
              console.log("Mesial");
            }}
          />

          {/* Palatina/Lingual */}

          <Box
            component="button"
            sx={{
              position: "absolute",
              height: "50px",
              width: "100%",
              bottom: 0,
              clipPath: "polygon(25% 75%, 75% 75%, 100% 100%, 0% 100%)",
              backgroundColor: "myBgColor.main",
              // border: "2px solid #602A90 !important",
              border: "none !important",
              cursor: "pointer",
              ":hover": {
                backgroundColor: "rgba(255,255,255,0.3)",
              },
            }}
            onClick={() => {
              console.log("Palatina/Lingual");
            }}
          />

          {/* Distal */}

          <Box
            component="button"
            sx={{
              position: "absolute",
              width: "50px",
              height: "100%",
              left: 0,
              clipPath: "polygon(25% 29%, 25% 71%, 0 96%, 0 4%)",
              backgroundColor: "myBgColor.main",

              // border: "2px solid #602A90 !important",
              border: "none !important",
              cursor: "pointer",

              ":hover": {
                backgroundColor: "rgba(255,255,255,0.3)",
              },
            }}
            onClick={() => {
              console.log("Distal");
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};
