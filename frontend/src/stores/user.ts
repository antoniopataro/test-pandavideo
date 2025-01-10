import { type Module } from "vuex";
import { type User } from "../models/user.model";
import { userHelper } from "../helpers/user.helper";

export type UserState = {
  user: User | null;
};

export const userModule: Module<UserState, unknown> = {
  actions: {
    clearUser({ commit }) {
      commit("CLEAR_USER");
    },
    setUser({ commit }, user) {
      commit("SET_USER", user);
    },
  },
  getters: {
    isLoggedIn: (state) => !!state.user,
  },
  mutations: {
    CLEAR_USER(state) {
      state.user = null;
    },
    SET_USER(state, user) {
      state.user = user;
    },
  },
  namespaced: true,
  state: {
    user: userHelper.getUserFromLocalStorage(),
  },
};
