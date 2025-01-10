<template>
  <router-link
    :to="{ name: 'Folder', params: { id: folder.id } }"
    class="folder-card__link"
  >
    <v-card class="folder-card__card">
      <v-icon size="sm">mdi-folder</v-icon>
      <span class="folder-card__card__title">
        {{ folder.name }} ({{ folder.videos_count }})
      </span>
    </v-card>
  </router-link>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";

import { type Folder } from "../models/folder.model";

export default defineComponent({
  name: "FolderCard",
  props: {
    folder: {
      required: true,
      type: Object as PropType<Folder>,
    },
  },
});
</script>

<style lang="scss" scoped>
.folder-card {
  &__card {
    align-items: center;
    box-shadow: unset;
    display: flex;
    gap: 8px;
    padding: 16px;
    width: 100%;
    &__title {
      font-size: 1rem;
      width: 100%;
    }
  }
  &__link {
    display: flex;
    text-decoration: none;
    width: 100%;
  }
}
</style>
