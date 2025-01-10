<template>
  <v-snackbar
    :color="color"
    :timeout="timeout"
    location="bottom"
    v-model="show"
  >
    {{ message }}
  </v-snackbar>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { mapActions, mapState } from "vuex";

import { type State } from "../stores";
import { type ToastState } from "../stores/toast";

type ComponentState = {
  color: (state: State) => ToastState["color"];
  message: (state: State) => ToastState["message"];
  timeout: (state: State) => ToastState["timeout"];
};

export default defineComponent({
  computed: {
    ...mapState<State, ComponentState>({
      color: (state) => state.toastModule.color,
      message: (state) => state.toastModule.message,
      timeout: (state) => state.toastModule.timeout,
    }),
    show: {
      get() {
        return this.$store.state.toastModule.show;
      },
      set(value: boolean) {
        if (!value) {
          this.hideToast();
        }
      },
    },
  },
  methods: {
    ...mapActions("toastModule", ["hideToast"]),
  },
});
</script> 