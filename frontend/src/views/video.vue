<template>
  <PrivateLayout>
    <div class="video__container" v-if="data">
      <div class="video__player__container">
        <iframe
          :src="data.video.video_player"
          allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture"
          allowfullscreen="true"
          class="video__player__iframe"
          id="panda-player"
        ></iframe>
      </div>
      <h1 class="video__title">{{ data.video.title }}</h1>
      <p class="video__description">
        {{ data.video.description ?? "No description provided." }}
      </p>
    </div>
    <div v-else-if="loading">
      <v-progress-circular indeterminate></v-progress-circular>
    </div>
    <div v-else>No video found.</div>
  </PrivateLayout>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { useRoute } from "vue-router";

import PrivateLayout from "../layouts/private-layout.vue";
import { type GetVideoDetailsResponse } from "../services/video.service.types";
import { videoService } from "../services/video.service";

type Data = {
  data: GetVideoDetailsResponse | null;
  error: Error | null;
  loading: boolean;
};

export default defineComponent({
  components: {
    PrivateLayout,
  },
  data() {
    return <Data>{
      data: null,
      error: null,
      loading: false,
    };
  },
  methods: {
    async fetchGetVideoDetails() {
      this.error = null;
      this.loading = true;

      const getVideoDetailsResponse = await videoService.getVideoDetails(
        this.id
      );

      if (getVideoDetailsResponse.isFailure()) {
        const error = getVideoDetailsResponse.data;

        this.error = error;
        this.loading = false;

        return;
      }

      this.data = getVideoDetailsResponse.data;
      this.loading = false;
    },
  },
  async mounted() {
    this.fetchGetVideoDetails();
  },
  name: "Video",
  setup() {
    const route = useRoute();

    const { id } = route.params as { id: string };

    return {
      id,
    };
  },
});
</script>

<style lang="scss" scoped>
.video {
  &__container {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
  &__description {
    font-size: 0.875rem;
  }
  &__player {
    &__container {
      position: relative;
      padding-top: 56.25%;
    }
    &__iframe {
      border: none;
      height: 100%;
      position: absolute;
      top: 0;
      width: 100%;
    }
  }
  &__title {
    font-size: 1.25rem;
    font-weight: 700;
  }
}
</style>
