import { useStorageScope } from "@/shared/storage-manager";
import { INewTabStorageScope } from "@/types";

export const NEW_TAB_STORAGE_SCOPE = "new-tab";
export function useNewTabStorageScope(): INewTabStorageScope {
  return useStorageScope<INewTabStorageScope>(NEW_TAB_STORAGE_SCOPE);
}
