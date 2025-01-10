<template>
  <v-container class="layout__container">
    <div class="layout__header">
      <router-link class="layout__header__left" to="/">
        <Logo />
      </router-link>
      <div class="layout__header__right">
        <v-btn class="layout__header__right__logout-button" @click="onLogout">
          Logout
        </v-btn>
      </div>
    </div>
    <slot></slot>
  </v-container>
</template>
  
  <script lang="ts">
import { defineComponent } from "vue";

import Logo from "../components/logo.vue";
import { userHelper } from "../helpers/user.helper";

export default defineComponent({
  components: {
    Logo,
  },
  name: "PrivateLayout",
  methods: {
    onLogout() {
      userHelper.logout();

      this.$router.push({ name: "Login" });
      this.$store.dispatch("userModule/clearUser", null);
    },
  },
});
</script>
  
  <style lang="scss" scoped>
.layout {
  &__container {
    display: flex;
    flex-direction: column;
    gap: 24px;
    height: 100%;
  }
  &__header {
    align-items: center;
    display: flex;
    justify-content: space-between;
    gap: 24px;
    &__left {
      align-items: center;
      display: flex;
      gap: 12px;
      text-decoration: none;
    }
    &__right {
      &__logout-button {
        font-size: 1rem;
        font-weight: 700;
        height: unset !important;
        letter-spacing: unset !important;
        padding: 15px 16px;
        text-transform: unset;
      }
    }
  }
}
</style>