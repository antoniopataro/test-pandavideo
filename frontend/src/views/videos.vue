<template>
  <PrivateLayout>
    <div class="videos__welcome">
      <h1 class="videos__welcome__title">Welcome back,</h1>
      <span class="videos__welcome__subtitle">
        {{ user ? user.email : "Guest" }}.
      </span>
    </div>
    <VideosList />
  </PrivateLayout>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import VideosList from "../components/videos-list.vue";
import PrivateLayout from "../layouts/private-layout.vue";

export default defineComponent({
  components: {
    PrivateLayout,
    VideosList,
  },
  computed: {
    user() {
      return this.$store.state.userModule.user;
    },
  },
  name: "Videos",
});
</script>

<style lang="scss" scoped>
.videos {
  &__welcome {
    display: flex;
    flex-direction: column;
    &__title {
      font-size: 1.5rem;
      font-weight: 700;
    }
  }
}
</style>
