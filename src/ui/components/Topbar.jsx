import { Box, Typography } from "@mui/material";

import { useUiStore } from "../../hooks";

export const Topbar = () => {
  //

  const { isSidebarOpen, pageActive } = useUiStore();

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      p="20px"
      alignItems="center"
    >
      <Box
        display={!isSidebarOpen ? "none" : "flex"}
        alignItems="center"
        justifyContent="space-between"
        gap="10px"
      >
        <img
          type="img/svg"
          alt="logo_molar"
          width="45px"
          height="45px"
          src={`assets/icons/logo/newLogoMolar.svg`}
          style={{ borderRadius: "20%" }}
        />
        <Typography
          variant="h3"
          color="primary.main"
          fontFamily="Brush Script MT"
          fontWeight="semibold"
          fontSize="40px"
          className=""
        >
          Dental Smile
        </Typography>
      </Box>

      <Typography
        paddingRight="180px"
        variant="h3"
        color="secondary.main"
        fontWeight="bold"
        fontSize="25px"
        fontStyle="italic"
        sx={{ textShadow: "0px 2px 2px rgba(0,0,0,0.20)  !important" }}
      >
        {pageActive}
      </Typography>

      <Box display="flex" gap="20px">
        {/* <IconButton className="btn-menu" sx={{ color: "black" }}>
          <AdminPanelSettingsOutlined />
        </IconButton> */}
      </Box>
    </Box>
  );
};
