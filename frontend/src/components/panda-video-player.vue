<template>
  <div class="panda-video-player__container">
    <iframe
      :src="src"
      allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture"
      allowfullscreen="true"
      class="panda-video-player__iframe"
      id="panda-player"
    ></iframe>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    src: {
      required: true,
      type: String,
    },
  },
});
</script>

<style lang="scss" scoped>
.panda-video-player {
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
</style>
