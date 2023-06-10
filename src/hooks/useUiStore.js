import { useDispatch, useSelector } from "react-redux";
import {
  onChangePage,
  onChangeSidebar,
  onChangeHookTabs,
  onChangeHookTabsCons,
} from "../store";

//
//

export const useUiStore = () => {
  //

  const dispatch = useDispatch();

  const { isSidebarOpen, pageActive, hookTabs, hookTabsCons } = useSelector(
    (state) => state.ui
  );

  const changeSidebar = (flag) => {
    dispatch(onChangeSidebar(flag));
  };

  const changePage = () => {
    const { pathname } = window.location;
    const pathnameCut = pathname.substring(0, 17);
    let pageActive = "";
    if (pathnameCut.includes("agenda")) {
      pageActive = "Agenda";
    } else if (pathnameCut.includes("pacientes")) {
      pageActive = "Pacientes";
    } else {
      pageActive = "Administración";
    }
    dispatch(onChangePage(pageActive));
  };

  const handleChangeTabs = (newValue) => {
    dispatch(onChangeHookTabs(newValue));
    localStorage.setItem("lastTabPaciente", newValue);
  };

  const handleChangeTabsCons = (newValue) => {
    dispatch(onChangeHookTabsCons(newValue));
    localStorage.setItem("lastTabPacienteCons", newValue);
  };
  //
  return {
    //* Propiedades
    isSidebarOpen,
    pageActive,
    hookTabs,
    hookTabsCons,

    //* Métodos
    changeSidebar,
    changePage,
    handleChangeTabs,
    handleChangeTabsCons,
  };
};
