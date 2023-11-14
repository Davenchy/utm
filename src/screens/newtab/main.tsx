import React from "react";
import ReactDOM from "react-dom/client";
import NewTab from "./NewTab";
import { IOpenCloseConfig, IStorageConfig } from "@/types";
import { OpenCloseSystemProvider } from "@/features/OpenCloseSystem";
import { StorageManagerProvider } from "@/features/StorageManager";

const rootEl = document.getElementById("root");
const storageConfig: IStorageConfig = {
  todoItems: [],
  sessions: {},
  backgroundImage: "",
  quickLinks: [],
  activeSession: ""
};
const openCloseConfig: IOpenCloseConfig = {
  todoDialog: false,
  settings: false,
  todo: false,
  quickLinksDialog: false,
  sessions: false,
  hadith: true,
};

ReactDOM.createRoot(rootEl!).render(
  <React.StrictMode>
    <StorageManagerProvider defaultConfig={storageConfig}>
      <OpenCloseSystemProvider defaultConfig={openCloseConfig}>
        <NewTab />
      </OpenCloseSystemProvider>
    </StorageManagerProvider>
  </React.StrictMode>
);
