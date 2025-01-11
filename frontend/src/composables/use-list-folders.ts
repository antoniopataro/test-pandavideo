import { ref } from "vue";
import { folderService } from "../services/folder.service";
import {
  type ListFoldersRequestParams,
  type ListFoldersResponse,
} from "../services/folder.service.types";

type Result = {
  data: ListFoldersResponse;
  error: Error | null;
  loading: boolean;
};

const cache = new Map<string, Result>();

export const useListFolders = () => {
  const data = ref<ListFoldersResponse | null>(null);
  const error = ref<Error | null>(null);
  const loading = ref<boolean>(false);

  const fetch = async (params: ListFoldersRequestParams) => {
    const cacheKey = JSON.stringify(params);

    if (cache.has(cacheKey)) {
      const result = cache.get(cacheKey)!;

      data.value = result.data;
      error.value = result.error;
      loading.value = result.loading;

      return;
    }

    data.value = null;
    error.value = null;
    loading.value = true;

    const listFoldersResponse = await folderService.listFolders(params);

    if (listFoldersResponse.isFailure()) {
      error.value = listFoldersResponse.data;
      loading.value = false;

      return;
    }

    const result: Result = {
      data: listFoldersResponse.data,
      error: null,
      loading: false,
    };

    cache.set(cacheKey, result);

    data.value = result.data;
    error.value = result.error;
    loading.value = result.loading;
  };

  return {
    data,
    error,
    fetch,
    loading,
  };
};
