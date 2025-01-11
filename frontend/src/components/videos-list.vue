<template>
  <div class="videos-list__content">
    <h2 class="videos-list__content__title">Videos</h2>
    <div class="videos-list__content__header">
      <h3 class="videos-list__content__header__title">
        <div class="videos-list__content__header__bottom">
          <v-btn
            @click="$router.back()"
            class="videos-list__content__header__bottom__back"
            v-if="folderId"
          >
            <v-icon size="sm">mdi-arrow-left</v-icon>
          </v-btn>
          <v-breadcrumbs
            class="videos-list__content__header__bottom__breadcrumbs"
          >
            <v-breadcrumbs-item
              :disabled="item.disabled"
              :key="index"
              :to="item.to"
              class="videos-list__content__header__bottom__breadcrumbs__item"
              v-for="(item, index) in breadcrumbs.items"
            >
              {{ item.title }}/
            </v-breadcrumbs-item>
          </v-breadcrumbs>
        </div>
      </h3>
      <div class="videos-list__content__header__search">
        <input
          @input="fetchListVideosDebounced"
          @keyup.esc="listVideosParams.title = ''"
          placeholder="Search by title..."
          type="text"
          v-model="listVideosParams.title"
        />
      </div>
      <span
        class="videos-list__content__header__subtitle"
        v-if="videos.data.value"
      >
        {{ filteredVideos.length }} video(s) found. ({{ videos.time.value }}ms{{
          videos.cached.value ? " - cached" : ""
        }})
      </span>
      <v-skeleton-loader
        height="14px"
        v-else-if="videos.loading"
        width="128px"
      />
      <span class="videos-list__content__header__subtitle" v-else>
        No videos found.
      </span>
    </div>
    <div
      class="videos-list__content__loading"
      v-if="folders.loading.value || videos.loading.value"
    >
      <v-progress-circular indeterminate></v-progress-circular>
    </div>
    <div
      class="videos-list__content__folders"
      v-if="
        !listVideosParams.title &&
        folders.data.value &&
        folders.data.value.folders.length > 0
      "
    >
      <FolderCard
        :folder="folder"
        :key="folder.id"
        v-for="folder in filteredFolders"
      />
    </div>
    <div
      class="videos-list__content__videos"
      v-if="videos.data.value && videos.data.value.videos.length > 0"
    >
      <VideoCard
        :key="video.id"
        :video="video"
        v-for="video in filteredVideos"
      />
    </div>
    <div class="videos-list__content__pagination" v-if="videos.data.value">
      <v-pagination
        :length="totalPages"
        :total-visible="7"
        @update:model-value="onPageChange"
        rounded="circle"
        v-model="currentPage"
      ></v-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { debounce } from "lodash";

import FolderCard from "./folder-card.vue";
import VideoCard from "./video-card.vue";
import { useListVideos } from "../composables/use-list-videos";
import { useListFolders } from "../composables/use-list-folders";
import { type ListFoldersRequestParams } from "../services/folder.service.types";
import { type ListVideosRequestParams } from "../services/video.service.types";
import { type Folder } from "../models/folder.model";
import { type Video } from "../models/video.model";

type Data = {
  breadcrumbs: {
    items: {
      disabled: boolean;
      title: string;
      to: string;
    }[];
  };
  currentPage: number;
  listFoldersParams: ListFoldersRequestParams;
  listVideosParams: ListVideosRequestParams;
};

export default defineComponent({
  components: {
    FolderCard,
    VideoCard,
  },
  computed: {
    filteredFolders() {
      if (!this.folders.data.value) {
        return [];
      }

      const { folders } = this.folders.data.value;

      return this.folderId
        ? folders
        : folders.filter((folder: Folder) => !folder.parent_folder_id);
    },
    filteredVideos() {
      if (!this.videos.data.value) {
        return [];
      }

      const { title } = this.listVideosParams;
      const { videos } = this.videos.data.value;

      if (title) {
        return videos.filter((video: Video) =>
          video.title.toLowerCase().includes(title.toLowerCase())
        );
      }

      return this.folderId
        ? videos
        : videos.filter((video: Video) => !video.folder_id);
    },
    user() {
      return this.$store.state.userModule.user;
    },
    totalPages() {
      if (!this.videos.data.value) {
        return 0;
      }

      const total = this.videos.data.value.total;

      return Math.ceil(total / this.listVideosParams.limit);
    },
  },
  data() {
    return <Data>{
      breadcrumbs: {
        items: [
          {
            disabled: false,
            title: "Library",
            to: "/videos",
          },
        ],
      },
      currentPage: 1,
      listFoldersParams: {
        parent_folder_id: this.folderId,
      },
      listVideosParams: {
        folder_id: this.folderId,
        limit: 20,
        page: 1,
        root_folder: !this.folderId ? 1 : undefined,
      },
    };
  },
  name: "VideosList",
  methods: {
    fetchListVideosDebounced: debounce(function (this: any) {
      this.videos.fetch(this.listVideosParams);
    }, 300),
    onPageChange(page: number) {
      this.listVideosParams.page = page;
      this.videos.fetch(this.listVideosParams);
    },
  },
  watch: {
    ["folderId"]: {
      async handler(folderId) {
        this.breadcrumbs.items = [
          {
            disabled: false,
            title: "Library",
            to: "/videos",
          },
          ...(folderId
            ? [
                {
                  disabled: true,
                  title: folderId,
                  to: `/folders/${folderId}`,
                },
              ]
            : []),
        ];

        this.listFoldersParams.parent_folder_id = folderId;
        this.listVideosParams.folder_id = folderId;

        await Promise.all([
          this.folders.fetch(this.listFoldersParams),
          this.videos.fetch(this.listVideosParams),
        ]);
      },
      immediate: true,
    },
  },
  props: {
    folderId: {
      required: false,
      type: String,
    },
  },
  setup() {
    const folders = useListFolders();
    const videos = useListVideos();

    return {
      folders,
      videos,
    };
  },
});
</script>

<style lang="scss" scoped>
.videos-list {
  &__content {
    display: flex;
    flex-direction: column;
    gap: 24px;
    &__header {
      display: flex;
      flex-direction: column;
      gap: 4px;
      &__bottom {
        align-items: center;
        display: flex;
        gap: 12px;
        &__back {
          align-items: center;
          border-radius: 50%;
          display: flex;
          height: 24px !important;
          justify-content: center;
          min-width: unset;
          padding: 0;
          width: 24px !important;
        }
        &__breadcrumbs {
          align-items: center;
          display: flex;
          gap: 4px;
          padding: 0;
          &__item {
            padding: 0;
          }
        }
      }
      &__subtitle {
        font-size: 0.875rem;
      }
      &__title {
        font-size: 1rem;
        font-weight: 700;
      }
      &__search {
        margin: 12px 0;
        input {
          width: 100%;
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
      }
    }
    &__folders {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    &__title {
      font-size: 1.25rem;
      font-weight: 700;
    }
    &__videos {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }
    &__pagination {
      display: flex;
      justify-content: center;
      margin-top: 24px;
      :deep(.v-pagination) {
        .v-pagination__list {
          gap: 4px;
        }
        .v-pagination__item {
          border-radius: 50%;
          height: 32px;
          min-width: 32px;
          &--is-active {
            font-weight: bold;
          }
        }
      }
    }
  }
}
</style>
