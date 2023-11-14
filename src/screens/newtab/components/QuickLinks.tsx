import { useState } from "react";
import { IQuickLink } from "@/types";
import { v4 as UUID_V4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTrash,
  faPlus
} from "@fortawesome/free-solid-svg-icons";
import { Button, CircleButton } from "./Buttons";
import InputBox from "./InputBox";

import useHotKeys from "@/features/HotKeys";
import useQuickLinksManager from "@/features/QuickLinksManager";
import {
  useOpenCloseSystem,
  OpenCloseSystem,
} from "@/features/OpenCloseSystem";

function QuickLinkForm({ link }: { link?: IQuickLink }) {
  const { close } = useOpenCloseSystem("quickLinksDialog");
  const { addQuickLink, setQuickLink } = useQuickLinksManager();
  const [title, setTitle] = useState(link?.title || "");
  const [url, setUrl] = useState(link?.url || "");
  const [icon, setIcon] = useState(link?.icon || "");

  const getIconUrl = (): string => {
    if (icon.length > 7) return icon;
    try {
      const urlObj = new URL(url);
      urlObj.pathname = "/favicon.ico";
      return urlObj.href;
    } catch {
      return "/icons/link.png";
    }
  };

  const save = () => {
    if (!url) return;
    const quickLink: IQuickLink = {
      id: link ? link.id : UUID_V4(),
      title,
      url,
      icon: getIconUrl()
    };
    if (link) setQuickLink(quickLink.id, _ => quickLink);
    else addQuickLink(quickLink);
    close();
  };

  useHotKeys(e => e.key === "Escape", close);
  useHotKeys(e => e.key === "s" && e.ctrlKey, save, [link, title, url, icon]);

  return (
    <div
      className="w-1/2 flex flex-col bg-black/60 backdrop-blur p-4 rounded
      text-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      <h1 className="text-xl font-bold text-center m-4">
        {link ? "Edit" : "Add"} Quick Link
      </h1>
      <div className="self-center w-12 h-12 flex place-content-center">
        <img alt="icon not found" src={getIconUrl()} />
      </div>
      <label className="flex flex-col gap-y-2 mb-4">
        Title
        <InputBox
          type="text"
          theme="dark"
          value={title}
          onChange={title => setTitle(title)}
          autoFocus
        />
      </label>
      <label className="flex flex-col gap-y-2 mb-4">
        URL
        <InputBox
          type="url"
          theme="dark"
          value={url}
          onChange={url => setUrl(url)}
        />
      </label>
      <label className="flex flex-col gap-y-2 mb-4">
        Icon URL
        <InputBox
          type="url"
          theme="dark"
          placeholder="optional"
          value={icon}
          onChange={url => setIcon(url)}
        />
      </label>
      <div className="flex flex-row-reverse gap-x-2 mt-4">
        <Button label="Save" style="primary" onClick={save} />
        <Button label="Cancel" style="label" onClick={close} />
      </div>
    </div>
  );
}

function QuickLink({
  link,
  onEditClicked,
  onRemoveClicked
}: {
  link: IQuickLink;
  onEditClicked: () => void;
  onRemoveClicked: () => void;
}) {
  const open = () =>
    browser.tabs.getCurrent()
      .then((tab) => {
        if (!tab || !tab.id) return;
        browser.tabs.update(tab.id, { url: link.url });
      });

  return (
    <div className="group w-20 h-20 overflow-hidden relative m-2">
      <CircleButton
        className="absolute hidden group-hover:flex w-6 h-6"
        onClick={onEditClicked}
      >
        <FontAwesomeIcon icon={faPenToSquare} size="xs" />
      </CircleButton>
      <CircleButton
        className="absolute hidden group-hover:flex right-0 bottom-0 w-6 h-6"
        onClick={onRemoveClicked}
      >
        <FontAwesomeIcon icon={faTrash} size="xs" />
      </CircleButton>
      <CircleButton className="w-full h-full flex-col" onClick={open}>
        <img
          className="h-8 w-8"
          src={link.icon}
          onError={(e: any) => (e.target.src = "/icons/link.png")}
        />
        <span className="text-sm text-center">{link.title}</span>
      </CircleButton>
    </div>
  );
}

function QuickLinks() {
  const { open } = useOpenCloseSystem("quickLinksDialog");
  const { quickLinks, removeQuickLink } = useQuickLinksManager();
  const [link, setLink] = useState<IQuickLink | undefined>();

  const openWith = (link: IQuickLink | undefined = undefined) => {
    setLink(link);
    open();
  };

  return (
    <>
      <OpenCloseSystem systemId="quickLinksDialog" floating>
        <QuickLinkForm link={link} />
      </OpenCloseSystem>
      <div
        className="flex flex-wrap max-w-1/2 max-h-60 overflow-hidden
      overflow-y-auto"
      >
        {quickLinks.map(quickLink => (
          <QuickLink
            key={quickLink.id}
            link={quickLink}
            onEditClicked={() => openWith(quickLink)}
            onRemoveClicked={() => removeQuickLink(quickLink.id)}
          />
        ))}
        <CircleButton className="m-2 w-20 h-20" onClick={() => openWith()}>
          <FontAwesomeIcon icon={faPlus} size="2x" />
        </CircleButton>
      </div>
    </>
  );
}

export default QuickLinks;
