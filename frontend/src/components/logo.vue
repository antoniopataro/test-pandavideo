<template>
  <div class="logo__container">
    <img
      src="../assets/panda-video-logo.svg"
      alt="Panda Video Logo"
      class="logo__logo"
    />
    <h1 class="logo__title">test-pandavideo</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Logo",
});
</script>

<style lang="scss" scoped>
.logo {
  &__container {
    align-items: center;
    display: flex;
    gap: 12px;
    text-decoration: none;
  }
  &__logo {
    height: 32px;
    width: 32px;
  }
  &__title {
    color: #ffffff;
    font-size: 1.5rem;
    font-weight: 700;
  }
}
</style>
