<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
    <Toast />
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Toast from "./components/toast.vue";

export default defineComponent({
  components: {
    Toast,
  },
});
</script>
