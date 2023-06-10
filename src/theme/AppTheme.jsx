import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { purpleTheme } from "./";
import { Sidebar, Topbar } from "../ui";
import { useUiStore } from "../hooks";

export const AppTheme = ({ children }) => {
  //

  return (
    <ThemeProvider theme={purpleTheme}>
      <CssBaseline />
      <div className="app">
        <div className="sidebar">
          <Sidebar />
        </div>

        <main className="home-section">{children}</main>
      </div>
    </ThemeProvider>
  );
};
