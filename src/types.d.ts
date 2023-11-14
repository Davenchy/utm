export interface IQuickLink {
  id: string;
  title: string;
  url: string;
  icon?: string;
}

export interface ITodoItem {
  id: string;
  label: string;
  done: boolean;
}

export interface ISessionTab {
  title: string;
  url: string;
  icon: string;
}

export interface ISessions {
  [sessionName: string]: ISessionTab[];
}

export interface IStorageConfig {
  quickLinks: IQuickLink[];
  backgroundImage: string;
  todoItems: ITodoItem[];
  sessions: ISessions;
  activeSession: string;
}

export interface IOpenCloseConfig {
  todo: boolean;
  settings: boolean;
  sessions: boolean;
  todoDialog: boolean;
  quickLinksDialog: boolean;
}
