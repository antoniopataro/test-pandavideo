import { createStore } from "vuex";
import { toastModule, type ToastState } from "./toast";
import { userModule, type UserState } from "./user";

export type State = {
  toastModule: ToastState;
  userModule: UserState;
};

export const store = createStore<State>({
  modules: {
    toastModule,
    userModule,
  },
});
