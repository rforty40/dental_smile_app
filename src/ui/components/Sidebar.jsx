import { useEffect } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography } from "@mui/material";
import "react-pro-sidebar/dist/css/styles.css";

/*iconos MUI */
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { SideBarItem } from "./SideBarItem";

import { useUiStore } from "../../hooks";

//
//
/**el sidebar se renderiza con cada click */

export const Sidebar = () => {
  //

  const { changeSidebar, isSidebarOpen } = useUiStore();

  //retorno
  // Box --> ProSidebar --> Menu --> MenuItem

  const onClickMenu = () => {
    changeSidebar(!isSidebarOpen);
  };
  useEffect(() => {
    const sidebar = document.querySelector(".sidebar");
    sidebar.classList.toggle("open");
  }, [isSidebarOpen]);
  //
  return (
    <Box
      sx={{
        height: "100%",
        position: "fixed",
        boxShadow: "3px 5px 5px rgba(0, 0, 0, 0.5)",
        "& .pro-sidebar-inner": {
          backgroundImage: `linear-gradient(#f5f7fa,#602a90) !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },

        "& .pro-inner-item": {
          padding: "5px 20px 5px 20px !important",
          backgroundPosition: "center",
        },
        "& .pro-inner-item:hover": {
          color: `${
            !isSidebarOpen ? "white !important" : "#9c27b080 !important"
          }`,
        },
        "& .pro-menu-item.active": {
          backgroundColor: `${
            !isSidebarOpen ? "primary.main" : "transparent !important"
          }`,
          color: `${
            !isSidebarOpen ? "white !important" : "#9c27b0cc !important"
          }`,
          borderRadius: "20px",
        },
      }}
    >
      {/*true(esta contraido) false(esta extendido el sidebar)*/}
      <ProSidebar collapsed={isSidebarOpen}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}

          <MenuItem
            onClick={onClickMenu}
            // si esta contraida se muestra el icono de menu
            icon={isSidebarOpen ? <MenuOutlinedIcon /> : undefined}
            style={{
              className: "btn-menu",
              margin: "10px 0 20px 0",
              color: "black",
            }}
          >
            {/* menu extendido */}
            {!isSidebarOpen && (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                ml="15px"
              >
                <Typography
                  variant="h3"
                  color="primary.main"
                  fontFamily="Brush Script MT"
                  fontWeight="semibold"
                  fontSize="35px"
                  className="text-shadow"
                >
                  Dental Smile
                </Typography>

                <IconButton
                  className="btn-menu"
                  sx={{ marginLeft: "25px" }}
                  onClick={onClickMenu}
                >
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {/* menu extendido */}
          {!isSidebarOpen && (
            <Box mb="40px">
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                mb="20px"
              >
                <img
                  type="img/svg"
                  alt="logo_molar"
                  width="90px"
                  height="90px"
                  src={`/assets/icons/logo/newLogoMolar.svg`}
                  style={{ borderRadius: "20%" }}
                />
              </Box>

              <Box textAlign="center">
                <Typography
                  className="text-shadow"
                  variant="h6"
                  color="primary.main"
                  fontWeight="bold"
                  sx={{
                    m: "0 0 20px 0",
                    lineHeight: "25px",
                  }}
                >
                  Consultorio Odontológico
                  <span
                    style={{
                      fontFamily: "Brush Script MT",
                      fontSize: "30px",
                      fontWeight: "normal",
                    }}
                  >
                    "Dental Smile"
                  </span>
                </Typography>

                <Typography
                  className=""
                  variant="h5"
                  color="primary.main"
                  fontFamily="Brush Script MT"
                  fontWeight="semibold"
                >
                  Od. Xiomara Chávez
                </Typography>
              </Box>
            </Box>
          )}

          {/* los enlances */}
          <Box
            paddingLeft={isSidebarOpen ? undefined : "10%"}
            paddingRight={isSidebarOpen ? undefined : "10%"}
          >
            <SideBarItem
              title={"Agenda"}
              to={"/agenda"}
              icon={<CalendarTodayOutlinedIcon />}
            />
            <SideBarItem
              title={"Pacientes"}
              to={"/pacientes"}
              icon={<PersonOutlinedIcon />}
            />

            <SideBarItem
              title={"Administración"}
              to={"/administracion"}
              icon={<HomeOutlinedIcon />}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};
