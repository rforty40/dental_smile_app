import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
  name: "ui",

  initialState: {
    pageActive: "",
    isSidebarOpen: false,
    hookTabs: 0,
    hookTabsCons: 0,
  },

  reducers: {
    onChangeSidebar: (state, { payload }) => {
      state.isSidebarOpen = payload;
    },
    onChangePage: (state, { payload }) => {
      state.pageActive = payload;
    },

    onChangeHookTabs: (state, { payload }) => {
      state.hookTabs = payload;
    },

    onChangeHookTabsCons: (state, { payload }) => {
      state.hookTabsCons = payload;
    },
  },
});

export const {
  onChangeSidebar,
  onChangePage,
  onChangeHookTabs,
  onChangeHookTabsCons,
} = uiSlice.actions;
