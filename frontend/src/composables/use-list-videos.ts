import { ref } from "vue";
import { videoService } from "../services/video.service";
import {
  type ListVideosRequestParams,
  type ListVideosResponse,
} from "../services/video.service.types";

type Result = {
  cached: boolean;
  data: ListVideosResponse;
  error: Error | null;
  loading: boolean;
  time: number;
};

const cache = new Map<string, Result>();

export const useListVideos = () => {
  const cached = ref<boolean>(false);
  const data = ref<ListVideosResponse | null>(null);
  const error = ref<Error | null>(null);
  const loading = ref(false);
  const time = ref(0);

  const fetch = async (params: ListVideosRequestParams) => {
    const cacheKey = JSON.stringify(params);

    if (cache.has(cacheKey)) {
      const result = cache.get(cacheKey)!;

      cached.value = true;
      data.value = result.data;
      error.value = result.error;
      loading.value = result.loading;
      time.value = result.time;

      return;
    }

    cached.value = false;
    data.value = null;
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

    const result: Result = {
      cached: false,
      data: listVideosResponse.data,
      error: null,
      loading: false,
      time: parseInt((timeEnd - timeStart).toFixed(0), 10),
    };

    cache.set(cacheKey, result);

    data.value = result.data;
    loading.value = result.loading;
    time.value = result.time;
  };

  return {
    cached,
    data,
    error,
    fetch,
    loading,
    time,
  };
};
