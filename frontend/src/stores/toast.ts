import { type Module } from "vuex";

export type ToastState = {
  color: "error" | "success";
  message: string;
  show: boolean;
  timeout: number;
};

export const toastModule: Module<ToastState, unknown> = {
  actions: {
    hideToast({ commit }) {
      commit("HIDE_TOAST");
    },
    showToast({ commit }, payload: Partial<ToastState>) {
      commit("SHOW_TOAST", payload);
    },
  },
  mutations: {
    HIDE_TOAST(state) {
      state.show = false;
    },
    SHOW_TOAST(state, payload: Partial<ToastState>) {
      state.color = payload.color || "error";
      state.message = payload.message || "";
      state.show = true;
      state.timeout = payload.timeout || 3000;
    },
  },
  namespaced: true,
  state: {
    color: "error",
    message: "",
    show: false,
    timeout: 3000,
  },
};
