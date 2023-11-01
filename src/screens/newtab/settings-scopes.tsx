import { useSettingsScope } from "@/shared/settings-manager";
import { INewTabSettingsScope } from "@/types";

export const NEW_TAB_SETTINGS_SCOPE = "new-tab";
export function useNewTabSettingsScope(): INewTabSettingsScope {
  return useSettingsScope<INewTabSettingsScope>(NEW_TAB_SETTINGS_SCOPE);
}
