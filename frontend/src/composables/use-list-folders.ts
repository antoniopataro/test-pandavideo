import { ref } from "vue";
import { folderService } from "../services/folder.service";
import {
  type ListFoldersRequestParams,
  type ListFoldersResponse,
} from "../services/folder.service.types";

export const useListFolders = () => {
  const data = ref<ListFoldersResponse | null>(null);
  const error = ref<Error | null>(null);
  const loading = ref(false);

  const fetch = async (params: ListFoldersRequestParams) => {
    data.value = null;
    error.value = null;
    loading.value = true;

    const listFoldersResponse = await folderService.listFolders(params);

    if (listFoldersResponse.isFailure()) {
      error.value = listFoldersResponse.data;
      loading.value = false;

      return;
    }

    data.value = listFoldersResponse.data;
    loading.value = false;
  };

  return {
    data,
    error,
    fetch,
    loading,
  };
};
