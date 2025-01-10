<template>
  <PrivateLayout>
    <VideosList :folderId="id" />
  </PrivateLayout>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

import { useRoute } from "vue-router";

import PrivateLayout from "../layouts/private-layout.vue";
import VideosList from "../components/videos-list.vue";

export default defineComponent({
  components: {
    PrivateLayout,
    VideosList,
  },
  name: "Folder",
  setup() {
    const route = useRoute();

    const id = computed(() => route.params.id as string);

    return {
      id,
    };
  },
});
</script>
