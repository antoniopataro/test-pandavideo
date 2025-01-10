import { ref } from "vue";
import { videoService } from "../services/video.service";
import {
  type ListVideosRequestParams,
  type ListVideosResponse,
} from "../services/video.service.types";

export const useListVideos = () => {
  const data = ref<ListVideosResponse | null>(null);
  const error = ref<Error | null>(null);
  const loading = ref(false);
  const time = ref(0);

  const fetch = async (params: ListVideosRequestParams) => {
    error.value = null;
    loading.value = true;

    const timeStart = performance.now();
    const listVideosResponse = await videoService.listVideos(params);
    const timeEnd = performance.now();

    if (listVideosResponse.isFailure()) {
      error.value = listVideosResponse.data;
      loading.value = false;

      return;
    }

    data.value = listVideosResponse.data;
    loading.value = false;
    time.value = parseInt((timeEnd - timeStart).toFixed(0), 10);
  };

  return {
    data,
    error,
    fetch,
    loading,
    time,
  };
};
