<template>
  <PrivateLayout>
    <div class="video__container" v-if="data">
      <PandaVideoPlayer :src="data.video.video_player" />
      <div class="video__properties-container">
        <div class="video__title-container">
          <div v-if="isEditingTitle" class="video__edit-container">
            <input
              class="video__title-input"
              placeholder="Title..."
              v-model="tempTitle"
            />
            <div class="video__edit-controls">
              <v-btn
                :loading="isSavingTitle"
                :disabled="isSavingDescription"
                icon="mdi-check"
                size="small"
                @click="saveTitle"
              />
              <v-btn
                :disabled="isSavingDescription"
                icon="mdi-close"
                size="small"
                @click="cancelTitleEdit"
              />
            </div>
          </div>
          <h1 @click="startEditingTitle" v-else class="video__title">
            {{ data.video.title }}
          </h1>
        </div>
        <div class="video__description-container">
          <div v-if="isEditingDescription" class="video__edit-container">
            <textarea
              class="video__description-input"
              placeholder="Description..."
              v-model="tempDescription"
            ></textarea>
            <div class="video__edit-controls">
              <v-btn
                :loading="isSavingDescription"
                :disabled="isSavingTitle"
                icon="mdi-check"
                size="small"
                @click="saveDescription"
              />
              <v-btn
                :disabled="isSavingTitle"
                icon="mdi-close"
                size="small"
                @click="cancelDescriptionEdit"
              />
            </div>
          </div>
          <p @click="startEditingDescription" v-else class="video__description">
            {{ data.video.description ?? "No description provided." }}
          </p>
        </div>
      </div>
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

import PandaVideoPlayer from "../components/panda-video-player.vue";
import PrivateLayout from "../layouts/private-layout.vue";
import { videoService } from "../services/video.service";
import { type GetVideoDetailsResponse } from "../services/video.service.types";

type Data = {
  data: GetVideoDetailsResponse | null;
  error: Error | null;
  isEditingDescription: boolean;
  isEditingTitle: boolean;
  isSavingDescription: boolean;
  isSavingTitle: boolean;
  loading: boolean;
  tempDescription: string;
  tempTitle: string;
};

export default defineComponent({
  components: {
    PandaVideoPlayer,
    PrivateLayout,
  },
  data() {
    return <Data>{
      data: null,
      error: null,
      isEditingDescription: false,
      isEditingTitle: false,
      isSavingDescription: false,
      isSavingTitle: false,
      loading: false,
      tempDescription: "",
      tempTitle: "",
    };
  },
  methods: {
    cancelDescriptionEdit() {
      this.isEditingDescription = false;
      this.tempDescription = "";
    },
    cancelTitleEdit() {
      this.isEditingTitle = false;
      this.tempTitle = "";
    },
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
    startEditingDescription() {
      this.tempDescription = this.data?.video.description ?? "";
      this.isEditingDescription = true;
    },
    startEditingTitle() {
      this.tempTitle = this.data?.video.title ?? "";
      this.isEditingTitle = true;
    },
    async saveDescription() {
      this.isSavingDescription = true;

      const response = await videoService.updateVideoProperties(this.id, {
        description: this.tempDescription,
      });

      if (response.isFailure()) {
        this.$store.dispatch("toastModule/showToast", {
          color: "error",
          message: response.data.message,
          timeout: 3000,
        });
      } else {
        this.data!.video = response.data;
        this.isEditingDescription = false;

        this.$store.dispatch("toastModule/showToast", {
          color: "success",
          message: "Description updated successfully.",
          timeout: 3000,
        });
      }

      this.isSavingDescription = false;
    },
    async saveTitle() {
      this.isSavingTitle = true;

      const response = await videoService.updateVideoProperties(this.id, {
        title: this.tempTitle,
      });

      if (response.isFailure()) {
        this.$store.dispatch("toastModule/showToast", {
          color: "error",
          message: response.data.message,
          timeout: 3000,
        });
      } else {
        this.data!.video = response.data;
        this.isEditingTitle = false;

        this.$store.dispatch("toastModule/showToast", {
          color: "success",
          message: "Title updated successfully.",
          timeout: 3000,
        });
      }

      this.isSavingTitle = false;
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
    padding: 8px;
  }
  &__description,
  &__title {
    cursor: pointer;
    &:hover {
      background-color: rgba(0, 0, 0, 0.25);
    }
  }
  &__description-input {
    font-size: 0.875rem;
    min-height: 100px;
    resize: vertical;
  }
  &__description-input,
  &__title-input {
    border-radius: 4px;
    border: 1px solid #ddd;
    font-family: inherit;
    padding: 8px;
    width: 100%;
  }
  &__edit-container {
    align-items: flex-start;
    display: flex;
    gap: 8px;
  }
  &__edit-control {
    display: flex;
  }
  &__edit-controls {
    align-items: center;
    display: flex;
    gap: 4px;
    min-height: 48px;
  }
  &__properties-container {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  &__title {
    padding: 8px;
    font-size: 1.25rem;
    font-weight: 700;
  }
  &__title-input {
    font-size: 1.25rem;
    font-weight: 700;
  }
}
</style>
