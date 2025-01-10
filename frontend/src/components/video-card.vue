<template>
  <router-link
    :to="{ name: 'Video', params: { id: video.id } }"
    @mouseenter="playPreview"
    @mouseleave="stopPreview"
    class="video-card__link"
  >
    <v-card class="video-card__card">
      <div class="video-card__media">
        <v-img
          :aspect-ratio="16 / 9"
          :class="{ 'video-card__media--hidden': isPreviewPlaying }"
          :src="video.thumbnail"
          cover
          height="192"
        ></v-img>
        <img
          :class="{ 'video-card__preview--visible': isPreviewPlaying }"
          :src="video.preview"
          class="video-card__preview"
          height="192"
        />
      </div>
      <span class="video-card__card__title">{{ video.title }}</span>
    </v-card>
  </router-link>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";

import { type Video } from "../models/video.model";

export default defineComponent({
  name: "VideoCard",
  data() {
    return {
      isPreviewPlaying: false,
    };
  },
  methods: {
    playPreview() {
      if (!this.video.preview) {
        return;
      }

      this.isPreviewPlaying = true;
    },
    stopPreview() {
      if (!this.video.preview) {
        return;
      }

      this.isPreviewPlaying = false;
    },
  },
  props: {
    video: {
      required: true,
      type: Object as PropType<Video>,
    },
  },
});
</script>

<style lang="scss" scoped>
.video-card {
  &__card {
    background-color: transparent;
    box-shadow: unset;
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    &__title {
      font-size: 1rem;
      width: 100%;
    }
  }
  &__link {
    display: flex;
    text-decoration: none;
    max-width: 384px;
    width: 100%;
  }
  &__media {
    height: 192px;
    position: relative;
    &--hidden {
      opacity: 0;
    }
  }
  &__preview {
    height: 100%;
    left: 0;
    object-fit: cover;
    opacity: 0;
    position: absolute;
    top: 0;
    transition: opacity 0.3s ease;
    width: 100%;
    &--visible {
      opacity: 1;
    }
  }
}
</style>
