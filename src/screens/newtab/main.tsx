/**
 * This file contains the main component for the new tab screen.
 * It imports and renders the NewTab component, wrapped in the StorageManagerProvider and OpenCloseSystemProvider components.
 */

import React from "react";
import ReactDOM from "react-dom/client";
import NewTab from "./NewTab";
import { IOpenCloseConfig, IStorageConfig } from "@/types";
import { OpenCloseSystemProvider } from "@/features/OpenCloseSystem";
import { StorageManagerProvider } from "@/features/StorageManager";

/**
 * Get the root div element of the new tab screen where React Components will live.
 */
const rootEl = document.getElementById("root");

/**
 * The default configuration for the storage manager provider.
 */
const storageConfig: IStorageConfig = {
  todoItems: [],
  sessions: {},
  backgroundImage: "",
  quickLinks: [],
  activeSession: ""
};

/**
 * The default configuration for the open-close system provider.
 */
const openCloseConfig: IOpenCloseConfig = {
  todoDialog: false,
  settings: false,
  todo: false,
  quickLinksDialog: false,
  sessions: false,
  hadith: true,
};

/**
 * Renders the NewTab component, wrapped in the StorageManagerProvider and OpenCloseSystemProvider components.
 * @returns {JSX.Element} The NewTab component.
 */
ReactDOM.createRoot(rootEl!).render(
  <React.StrictMode>
    <StorageManagerProvider defaultConfig={storageConfig}>
      <OpenCloseSystemProvider defaultConfig={openCloseConfig}>
        <NewTab />
      </OpenCloseSystemProvider>
    </StorageManagerProvider>
  </React.StrictMode>
);
