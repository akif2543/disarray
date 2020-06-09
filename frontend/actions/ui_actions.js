export const START_LOADING = "START_LOADING";
export const STOP_LOADING = "STOP_LOADING";
export const OPEN_MODAL = "OPEN_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";
export const OPEN_SETTINGS = "OPEN_SETTINGS";
export const CLOSE_SETTINGS = "CLOSE_SETTINGS";
export const SHOW_SIDEBAR = "SHOW_SIDEBAR";
export const HIDE_SIDEBAR = "HIDE_SIDEBAR";

export const startLoading = () => ({
  type: START_LOADING,
});

export const stopLoading = () => ({
  type: STOP_LOADING,
});

export const openModal = (modal) => ({
  type: OPEN_MODAL,
  modal,
});

export const closeModal = () => ({
  type: CLOSE_MODAL,
});

export const openSettings = (settings) => ({
  type: OPEN_SETTINGS,
  settings,
});

export const closeSettings = () => ({
  type: CLOSE_SETTINGS,
});

export const showSidebar = () => ({
  type: SHOW_SIDEBAR,
});

export const hideSidebar = () => ({
  type: HIDE_SIDEBAR,
});
