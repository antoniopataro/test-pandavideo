<template>
  <PrivateLayout>
    <div class="videos__welcome">
      <h1 class="videos__welcome__title">Welcome back,</h1>
      <span class="videos__welcome__subtitle">
        {{ user ? user.email : "Guest" }}.
      </span>
    </div>
    <div class="videos__content">
      <div class="videos__content__header">
        <h2 class="videos__content__header__title">Videos</h2>
        <v-skeleton-loader height="14px" v-if="loading" width="128px" />
        <span class="videos__content__header__subtitle" v-else>
          {{ data?.videos.length }} video(s) found. ({{ time }}ms)
        </span>
      </div>
      <div
        class="videos__content__videos"
        v-if="data && data.videos.length > 0"
      >
        <VideoCard
          :key="video.id"
          :video="video"
          v-for="video in data.videos"
        />
      </div>
      <div class="videos__content__loading" v-else-if="loading">
        <v-progress-circular indeterminate></v-progress-circular>
      </div>
      <div class="videos__content__empty" v-else>No videos found.</div>
    </div>
  </PrivateLayout>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import VideoCard from "../components/video-card.vue";
import PrivateLayout from "../layouts/private-layout.vue";
import { userHelper } from "../helpers/user.helper";
import { videoService } from "../services/video.service";
import {
  type ListVideosRequestParams,
  type ListVideosResponse,
} from "../services/video.service.types";

type Data = {
  data: ListVideosResponse | null;
  error: Error | null;
  loading: boolean;
  params: ListVideosRequestParams;
  time: number;
};

export default defineComponent({
  components: {
    PrivateLayout,
    VideoCard,
  },
  computed: {
    user() {
      return this.$store.state.userModule.user;
    },
  },
  data() {
    return <Data>{
      data: null,
      error: null,
      loading: false,
      params: {
        limit: 20,
        page: 1,
      },
      time: 0,
    };
  },
  name: "Videos",
  methods: {
    async fetchListVideos() {
      this.error = null;
      this.loading = true;

      const time = Date.now();

      const listVideosResponse = await videoService.listVideos(this.params);

      if (listVideosResponse.isFailure()) {
        const error = listVideosResponse.data;

        this.error = error;
        this.loading = false;

        return;
      }

      this.data = listVideosResponse.data;
      this.loading = false;
      this.time = Date.now() - time;
    },
    onLogout() {
      userHelper.logout();

      this.$router.push({ name: "Login" });
      this.$store.dispatch("userModule/clearUser", null);
    },
  },
  async mounted() {
    this.fetchListVideos();
  },
});
</script>

<style lang="scss" scoped>
.videos {
  &__content {
    display: flex;
    flex-direction: column;
    gap: 24px;
    &__header {
      display: flex;
      flex-direction: column;
      &__subtitle {
        font-size: 0.875rem;
      }
      &__title {
        font-size: 1.25rem;
        font-weight: 700;
      }
    }
  }
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
